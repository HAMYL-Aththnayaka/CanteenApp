import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/store_provider.dart';
import 'cart_screen.dart';
import 'my_orders_screen.dart';
import 'dart:io'; 
import 'package:flutter/foundation.dart'; 

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = context.watch<StoreProvider>();
    
    String baseUrl = kIsWeb 
        ? "http://127.0.0.1:3000" 
        : (Platform.isAndroid ? "http://10.0.2.2:3000" : "http://127.0.0.1:3000");

    return Scaffold(
      backgroundColor: const Color(0xFFF8F8F8),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(color: Color(0xFFFF6600)),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Icon(Icons.person_pin, size: 60, color: Colors.white),
                  SizedBox(height: 10),
                  Text("Welcome User", style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.list_alt),
              title: const Text('My Orders'),
              onTap: () {
                Navigator.pop(context); 
                Navigator.push(context, MaterialPageRoute(builder: (context) => const MyOrdersScreen()));
              },
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.logout, color: Colors.red),
              title: const Text('Sign Out', style: TextStyle(color: Colors.red)),
              onTap: () {
                Navigator.pop(context);
                store.signOut(); 
              },
            ),
          ],
        ),
      ),
      appBar: AppBar(
        title: const Text("Uni Bites", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_bag_outlined, color: Colors.black),
            onPressed: () => Navigator.push(
              context, 
              MaterialPageRoute(builder: (context) => const CartScreen())
            ),
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: Text("Popular Dishes", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 15),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 1, 
                childAspectRatio: 0.85, 
                mainAxisSpacing: 25,
              ),
              itemCount: store.foodList.length,
              itemBuilder: (context, index) {
                final item = store.foodList[index];
                int qty = store.cartItems[item.id] ?? 0;

                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 20, offset: const Offset(0, 10))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
                          child: Image.network(
                            "$baseUrl/images/${item.image}",
                            width: double.infinity, fit: BoxFit.cover,
                            errorBuilder: (c, e, s) => Container(color: Colors.grey[200], child: const Icon(Icons.fastfood)),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Flexible(
                                  child: Text(item.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold), overflow: TextOverflow.ellipsis),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(color: Colors.orange.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                                  child: const Row(children: [Icon(Icons.star, color: Colors.orange, size: 14), Text(" 4.8")]),
                                )
                              ],
                            ),
                            const SizedBox(height: 5),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text("Rs. ${item.price.toStringAsFixed(0)}", style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
                                Container(
                                  height: 35,
                                  decoration: BoxDecoration(color: const Color(0xFFFF6600), borderRadius: BorderRadius.circular(20)),
                                  child: Row(
                                    children: [
                                      IconButton(icon: const Icon(Icons.remove, color: Colors.white, size: 16), onPressed: () => store.removeFromCart(item.id)),
                                      Text("$qty", style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                                      IconButton(icon: const Icon(Icons.add, color: Colors.white, size: 16), onPressed: () => store.addToCart(item.id)),
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ],
                        ),
                      )
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}