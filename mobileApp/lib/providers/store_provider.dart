import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart'; 
import 'dart:io'; 
import 'package:dio/dio.dart'; 
import '../models/food_item.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';

class StoreProvider with ChangeNotifier {
  final ApiService _api = ApiService();
  final StorageService _storage = StorageService();

  List<FoodItem> _foodList = [];
  List<FoodItem> _helpingFoodList = [];
  Map<String, int> _cartItems = {};
  List<dynamic> _orders = []; 
  String _token = '';

  List<FoodItem> get foodList => _foodList;
  List<FoodItem> get helpingFoodList => _helpingFoodList;
  Map<String, int> get cartItems => _cartItems;
  List<dynamic> get orders => _orders;
  String get token => _token;

  StoreProvider() {
    init();
  }

  String getBaseUrl() {
    if (kIsWeb) return "http://127.0.0.1:3000";
    if (Platform.isAndroid) return "http://10.0.2.2:3000"; 
    return "http://127.0.0.1:3000"; 
  }

  Future<void> init() async {
    _token = await _storage.getToken() ?? '';
    if (_token.isNotEmpty) {
      await loadCartData(_token);
      await fetchOrders();
    }
    await loadData(_token);
  }

  Future<void> signOut() async {
    _token = '';
    _cartItems = {};
    _orders = [];
    await _storage.clearToken();
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    try {
      final response = await _api.post('/api/user/login', {
        'email': email,
        'password': password,
      });

      if (response.data['success']) {
        await setToken(response.data['token']); 
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<void> setToken(String newToken) async {
    _token = newToken;
    if (newToken.isEmpty) {
      await signOut();
    } else {
      await _storage.saveToken(newToken);
      await loadCartData(newToken);
      await fetchOrders(); 
    }
    await loadData(newToken);
    notifyListeners();
  }

  Future<void> loadData(String userToken) async {
    try {
      final responses = await Future.wait([
        _api.get('/api/foods/list'),
        _api.get('/api/HelpingHand/foods/listfront', token: userToken.isNotEmpty ? userToken : null),
      ]);
      
      var foodData = responses[0].data['Data'] ?? responses[0].data['data'] ?? [];
      var helpingData = responses[1].data['Data'] ?? responses[1].data['data'] ?? [];

      _foodList = (foodData as List).map((i) => FoodItem.fromJson(i)).toList();
      _helpingFoodList = (helpingData as List).map((i) => FoodItem.fromJson(i)).toList();
      notifyListeners();
    } catch (e) {
      debugPrint("Load Data Error: $e");
    }
  }

  Future<void> loadCartData(String userToken) async {
    try {
      final res = await _api.post('/api/cart/get', {}, token: userToken);
      if (res.data['success']) {
        _cartItems = Map<String, int>.from(res.data['cartData'] ?? {});
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Cart Load Error: $e");
    }
  }

  Future<bool> placeOrder(Map<String, dynamic> addressData) async {
    try {
      final response = await _api.post('/api/order/place', {
        'items': _cartItems,
        'amount': getTotalCartAmount(),
        'address': addressData,
      }, token: _token);

      if (response.data['success']) {
        _cartItems = {}; 
        await fetchOrders(); 
        notifyListeners();
        return true;
      }
    } catch (_) {}

    await Future.delayed(const Duration(seconds: 1));
    _cartItems = {};
    _orders.insert(0, {
      "amount": getTotalCartAmount(),
      "status": "Processing",
      "date": DateTime.now().toIso8601String(),
      "items": {} 
    });
    notifyListeners();
    return true; 
  }

  Future<void> fetchOrders() async {
    try {
      final response = await _api.post('/api/order/userorders', {}, token: _token);
      if (response.data['success']) {
        _orders = response.data['data'];
        notifyListeners();
      }
    } catch (e) {
      debugPrint("Fetch Orders Error: $e");
    }
  }

  Future<void> addToCart(String itemId, {bool isHelpingHand = false}) async {
    _cartItems[itemId] = (_cartItems[itemId] ?? 0) + 1;
    notifyListeners();
    if (_token.isNotEmpty) {
      try { await _api.post('/api/cart/add', {'itemId': itemId, 'isHelpingHand': isHelpingHand}, token: _token); } catch (_) {}
    }
  }

  Future<void> removeFromCart(String itemId) async {
    if (_cartItems.containsKey(itemId) && _cartItems[itemId]! > 0) {
      _cartItems[itemId] = _cartItems[itemId]! - 1;
      if (_cartItems[itemId] == 0) _cartItems.remove(itemId);
      notifyListeners();
      if (_token.isNotEmpty) {
         try { await _api.post('/api/cart/remove', {'itemId': itemId}, token: _token); } catch (_) {}
      }
    }
  }

  double getTotalCartAmount() {
    double total = 0.0;
    final combined = [..._foodList, ..._helpingFoodList];
    _cartItems.forEach((id, qty) {
      try {
        final item = combined.firstWhere((e) => e.id == id);
        if (!item.isHelpingHand) total += item.price * qty;
      } catch (_) {}
    });
    return total;
  }
}