import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/store_provider.dart';

class MyOrdersScreen extends StatelessWidget {
  const MyOrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final store = context.watch<StoreProvider>();
    final orders = store.orders;

    return Scaffold(
      appBar: AppBar(
        title: const Text("My Orders", style: TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        iconTheme: const IconThemeData(color: Colors.black),
        elevation: 0,
      ),
      body: orders.isEmpty
          ? const Center(child: Text("No orders found", style: TextStyle(color: Colors.grey)))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final order = orders[index];
                final amount = order['amount'] ?? 0;
                final status = order['status'] ?? "Pending";
                final dateStr = order['date'] ?? DateTime.now().toString();
                
                return Container(
                  margin: const EdgeInsets.only(bottom: 15),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text("Order #${index + 1}", style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                            decoration: BoxDecoration(
                              color: status == "Delivered" ? Colors.green[100] : Colors.orange[100],
                              borderRadius: BorderRadius.circular(20)
                            ),
                            child: Text(status, style: TextStyle(
                              color: status == "Delivered" ? Colors.green[800] : Colors.orange[800], 
                              fontWeight: FontWeight.bold, fontSize: 12
                            )),
                          )
                        ],
                      ),
                      const Divider(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(dateStr.toString().substring(0, 10), style: const TextStyle(color: Colors.grey)),
                          Text("Rs. $amount", style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Color(0xFFFF6600))),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}