import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/store_provider.dart'; 

class PlaceOrderScreen extends StatefulWidget {
  const PlaceOrderScreen({super.key});

  @override
  State<PlaceOrderScreen> createState() => _PlaceOrderScreenState();
}

class _PlaceOrderScreenState extends State<PlaceOrderScreen> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _streetController = TextEditingController();
  final _cityController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _isLoading = false;

  void _submitOrder() async {
    setState(() => _isLoading = true);
    final store = context.read<StoreProvider>();
    
    Map<String, dynamic> addressData = {
      "firstName": _firstNameController.text,
      "lastName": _lastNameController.text,
      "email": _emailController.text,
      "street": _streetController.text,
      "city": _cityController.text,
      "phone": _phoneController.text,
    };

    bool success = await store.placeOrder(addressData);

    if (!mounted) return;
    setState(() => _isLoading = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Order Placed Successfully!"), backgroundColor: Colors.green));
      Navigator.popUntil(context, (route) => route.isFirst); 
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Failed to place order."), backgroundColor: Colors.red));
    }
  }

  Widget _buildField(TextEditingController controller, String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
          fillColor: Colors.grey[100],
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Delivery Details", style: TextStyle(color: Colors.black)), backgroundColor: Colors.white, iconTheme: const IconThemeData(color: Colors.black)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            _buildField(_firstNameController, "First Name"),
            _buildField(_lastNameController, "Last Name"),
            _buildField(_emailController, "Email"),
            _buildField(_streetController, "Street"),
            _buildField(_cityController, "City"),
            _buildField(_phoneController, "Phone"),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : _submitOrder,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFFF6600),
                minimumSize: const Size.fromHeight(55),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
              ),
              child: _isLoading 
                ? const CircularProgressIndicator(color: Colors.white) 
                : const Text("PLACE ORDER", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}