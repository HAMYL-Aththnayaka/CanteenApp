import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/store_provider.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = context.watch<StoreProvider>();

    return Scaffold(
      backgroundColor: const Color(0xFFF8F8F8),
      appBar: AppBar(
        title: const Text("My Orders", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: store.orders.isEmpty
          ? const Center(child: Text("No orders found", style: TextStyle(color: Colors.grey)))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: store.orders.length,
              itemBuilder: (context, index) {
                final order = store.orders[index];
                return Container(
                  margin: const EdgeInsets.only(bottom: 15),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(15),
                    title: Text("Order #${order['_id'].toString().substring(0, 8)}", 
                        style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(height: 5),
                        Text("Status: ${order['status']}", 
                            style: TextStyle(color: order['status'] == 'Delivered' ? Colors.green : Colors.orange)),
                        Text("Items: ${order['items'].length}"),
                      ],
                    ),
                    trailing: Text("Rs. ${order['amount']}", 
                        style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFFF6600), fontSize: 16)),
                  ),
                );
              },
            ),
    );
  }
}