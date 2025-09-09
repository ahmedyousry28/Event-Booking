# 🎉 Event Booking App

> **Note**: I developed a custom Node.js backend server instead of using mockAPI to have full control over the data structure and customize it according to the app requirements.

A modern React Native mobile application for browsing and booking events with user authentication and personalized dashboard.

## 📱 Features

- **User Authentication** - Sign up & Login with secure JWT tokens
- **Event Listings** - Browse events with images, dates, prices, and locations
- **Event Details** - Comprehensive event information with registration capability
- **User Dashboard** - Track registered events and manage bookings
- **Search** - Search for specific event by name or date
- **Responsive Design** - Optimized for various screen sizes
- **State Management** - Redux implementation for efficient data flow
- **Error Handling** - User-friendly error messages and API failure handling

## 🚀 Quick Access

| Resource | Link |
|----------|------|
| 📺 **Demo Video** | [![Demo Video](https://img.shields.io/badge/Watch-Demo-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1AzlME1zAQJHpxOH_ek6WOVTO7HOIYcM6/view?usp=sharing) |
| 📱 **Download APK** | [![Download APK](https://img.shields.io/badge/Download-APK-green?style=for-the-badge&logo=android)](https://drive.google.com/file/d/1TmRmvsayIYQ_KtJVGszPvuf0jYKQJ17X/view?usp=drive_link) |
| 🔧 **Test Backend** | [![Test API](https://img.shields.io/badge/Test-Backend-blue?style=for-the-badge&logo=postman)](https://event-booking-production.up.railway.app/) |

## 🛠️ Tech Stack

- **Frontend**: React Native, React Navigation, Redux
- **Backend**: Node.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Styling**: Nativewind, React Native StyleSheet
- **Icons**: React Native Vector Icons


## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedyousry28/event-booking-app.git
   cd event-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure environment**
   - Create `.env` file in root directory
   - Add your API base URL:
   ```
   EXPO_PUBLIC_API = https://event-booking-production.up.railway.app/api/
   ```


### 🚀 Running the App
```bash
npm run start
# or
npx expo start
```

## 📱 App Screens

1. **Authentication Screen** - Sign up/Login
2. **Events List** - Browse (all - coming soon - completed) events
3. **Event Details** - Detailed event information
3. **Search** - Search by name or date of event
4. **User Dashboard** - Registered events management and Favourite events
5. **profile** - show details of credentials and logout button

## 🎯 Key Implementation Details

- **Custom Backend**: Built my own REST API for complete control over data structure
- **Redux State Management**: Centralized state for authentication and event data
- **Navigation**: Stack and Tab navigation using React Navigation v6
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Adaptive layouts for different screen sizes





⭐ **developed by Ahmed Yousry**
