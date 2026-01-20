import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/store_provider.dart'; 
import '../models/food_item.dart'; 
import 'place_order_screen.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = context.watch<StoreProvider>();
    const String baseUrl = "http://127.0.0.1:3000";
    
    final allItems = [...?store.foodList, ...?store.helpingFoodList];

    return Scaffold(
      backgroundColor: const Color(0xFFF8F8F8),
      appBar: AppBar(
        title: const Text("My Cart", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: store.cartItems.isEmpty
          ? const Center(child: Text("Your cart is empty", style: TextStyle(color: Colors.grey)))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: store.cartItems.length,
                    itemBuilder: (context, index) {
                      String itemId = store.cartItems.keys.elementAt(index);
                      int quantity = store.cartItems[itemId]!;
                      
                      final item = allItems.firstWhere(
                        (element) => element.id == itemId,
                        orElse: () => FoodItem(id: '', name: 'Unknown', price: 0, description: '', image: '', category: ''),
                      );

                      if (item.id.isEmpty) return const SizedBox.shrink();

                      return Container(
                        margin: const EdgeInsets.only(bottom: 16),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10)],
                        ),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(15),
                              child: Image.network(
                                "$baseUrl/images/${item.image}",
                                width: 80, height: 80, fit: BoxFit.cover,
                                errorBuilder: (c, e, s) => const Icon(Icons.fastfood, size: 40),
                              ),
                            ),
                            const SizedBox(width: 15),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 17)),
                                  const SizedBox(height: 5),
                                  Text("Rs. ${item.price}", style: const TextStyle(color: Color(0xFFFF6600), fontWeight: FontWeight.bold, fontSize: 16)),
                                ],
                              ),
                            ),
                            Container(
                              decoration: BoxDecoration(color: Colors.grey[100], borderRadius: BorderRadius.circular(15)),
                              child: Row(
                                children: [
                                  IconButton(icon: const Icon(Icons.remove, size: 18), onPressed: () => store.removeFromCart(itemId)),
                                  Text("$quantity", style: const TextStyle(fontWeight: FontWeight.bold)),
                                  IconButton(icon: const Icon(Icons.add, size: 18), onPressed: () => store.addToCart(itemId)),
                                ],
                              ),
                            )
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(25),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(topLeft: Radius.circular(35), topRight: Radius.circular(35)),
                    boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 15)],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text("Total Amount", style: TextStyle(fontSize: 18, color: Colors.grey)),
                          Text("Rs. ${store.getTotalCartAmount().toStringAsFixed(2)}",
                              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color(0xFFFF6600))),
                        ],
                      ),
                      const SizedBox(height: 20),
                      SizedBox(
                        width: double.infinity,
                        height: 60,
                        child: ElevatedButton(
                          onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const PlaceOrderScreen())),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFFF6600),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                            elevation: 0,
                          ),
                          child: const Text("CHECKOUT", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
    );
  }
}