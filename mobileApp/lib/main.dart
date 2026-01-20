import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/store_provider.dart';
import 'views/home_screen.dart';
import 'views/login_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => StoreProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final store = context.watch<StoreProvider>();

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Uni Bites',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        useMaterial3: false,
      ),
      home: store.token.isEmpty ? const LoginScreen() : const HomeScreen(),
    );
  }
}