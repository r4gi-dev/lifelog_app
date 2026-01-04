# LifeLog App 📱

LifeLog is a personal life logging application built with **React Native (Expo)**. It allows you to track your daily activities, schedules, and photos in a unified, chronological timeline.

## ✨ Features

- **🏠 Home Dashboard**: Get a quick overview of your weekly activity and recent highlights.
- **📅 Unified Timeline**: View tasks, schedules, and photos in a single, chronological list.
- **✍️ Easy Logging**: Quickly add new entries:
  - **Task**: To-do items or completed activities.
  - **Schedule**: Future appointments or events.
  - **Photo**: Capture moments directly within the app.
- **🎨 Modern UI/UX**:
  - "Soft Modern" design system.
  - **Dark Mode** support (System, Light, Dark options).
  - Smooth animations and haptic feedback.
- **🔒 Private & Offline**: All data is stored locally on your device. No internet connection required.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (Managed Workflow)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Persistence**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Icons**: SF Symbols (iOS) / Material Icons (Android) via `IconSymbol` wrapper

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/lifelog-app.git
    cd lifelog-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:
    ```bash
    npx expo start -c
    ```

### Running on Device

- **Android**: Press `a` in the terminal (requires Android Emulator or connected device).
- **iOS**: Press `i` in the terminal (requires iOS Simulator or macOS).
- **Physical Device**: Scan the QR code displayed in the terminal using the Expo Go app.

## 📂 Project Structure

```text
lifelog_app/
├── app/                 # Expo Router screens
│   ├── (tabs)/          # Main tab navigation
│   │   ├── index.tsx    # Home Dashboard
│   │   ├── timeline.tsx # Timeline View
│   │   ├── add.tsx      # Add Log Screen
│   │   └── settings.tsx # Settings Screen
│   ├── _layout.tsx      # Root layout
│   └── ...
├── components/          # Reusable UI components
├── constants/           # Theme colors and config
├── hooks/               # Custom hooks (e.g., useColorScheme)
├── store/               # State management (Zustand)
└── assets/              # Images and fonts
```

## 🤝 Contributing

We welcome contributions; please submit a pull request.

## 📄 License

This project is licensed under the MIT License.
