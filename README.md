
## University Canteen Ordering System

# A Flutter-based mobile ordering system designed to streamline the experience between customers and local kitchens. This project focuses on a clean UI and a predictable state management flow using Provider.

# 📱 Features
- User Accounts: Full Sign In and Sign Out flow with persistent token storage.

- Smart Menu: Browse food items with real-time price calculation.

- Cart Logic: Add, remove, and adjust quantities with a synchronized subtotal.

- Checkout Flow: Simple delivery form with validation.

- Order History: A dedicated page to track previous purchases and their status.

- Fail-Safe Mode: If the backend API isn't reachable or a route is missing, the app uses a simulation layer to complete the order locally. This ensures the UI flow can always be demonstrated.

# 🛠️ Tech Stack
- Frontend: Flutter & Dart

- State Management: Provider

- Networking: Dio (with custom interceptors for auth tokens)

- Backend: Node.js / Express (running on localhost:3000)

- Database: MongoDB

# 🏃‍♂️ Getting Started
- 1. Backend Setup
-   Navigate to the backend directory.

-   Install dependencies: npm install.

-  Start the server: npm start.

- 2. Frontend Setup
-    Ensure your Flutter environment is set up for Windows or Android.

- Run flutter pub get.

-  Launch the app: flutter clean
- flutter pub get
- flutter run -d windows

# 🧠 Project Challenges & Solutions
- 404 Route Handling: During development, we encountered several API routing issues. To solve this, I implemented a robust placeOrder function in the StoreProvider that attempts multiple URI patterns and falls - back to a simulated success state if the server is unresponsive.

- Localhost Connectivity: Mapping 127.0.0.1 for Windows vs 10.0.2.2 for Android was handled via a dynamic getBaseUrl() helper to ensure the app works across different platforms without manual code changes.

# 🔮 Roadmap
- [ ] Integration with a real-time notification system (Firebase).

- [ ] Search and Filter functionality for the menu.

- [ ] User profile editing (Update address/phone).

# Sample Output

<img width="380" height="875" alt="image" src="https://github.com/user-attachments/assets/10080f35-6d11-42b4-bcec-d8848cbac3cc" />

<img width="372" height="877" alt="image" src="https://github.com/user-attachments/assets/9bbd72fd-1ff4-4033-a657-3ee2bd0f98d2" />

<img width="386" height="892" alt="image" src="https://github.com/user-attachments/assets/44684feb-84b2-4eac-af7f-4c43dd6762bf" />

<img width="375" height="896" alt="image" src="https://github.com/user-attachments/assets/f94ebdd3-322f-485f-b768-f5fc5d0eef48" />



# Connect with Me
https://github.com/HAMYL-Aththnayaka
