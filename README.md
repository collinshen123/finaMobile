# Fina Money Mobile App

This is a mobile application for [Fina Money](https://www.fina.money/) built with [**React Native**](https://reactnative.dev), bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **React Native development environment** - Complete the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide
  - **For iOS**: Xcode (Mac only) and CocoaPods
  - **For Android**: Android Studio and Android SDK

## Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/collinshen123/finaMobile.git
cd finaMobile
```

### Step 2: Install Dependencies
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Install iOS Dependencies (Mac only)

For iOS, you need to install CocoaPods dependencies. The first time you create a new project, run the Ruby bundler to install CocoaPods itself:
```bash
bundle install
```

Then, and every time you update your native dependencies, run:
```bash
cd ios
bundle exec pod install
cd ..
```

For more information, visit the [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

### Step 4: Start Metro

Metro is the JavaScript build tool for React Native. Start the Metro dev server by running:
```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 5: Build and Run Your App

With Metro running, open a new terminal window/pane from the root of your React Native project.

#### For Android
```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS
```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.

> **Note**: You can also build the app directly from Android Studio or Xcode.

## Development

### Making Changes

Open `App.tsx` in your text editor of choice and make changes. When you save, your app will automatically update via [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

### Force Reload

When you want to forcefully reload (e.g., to reset the app state):

- **Android**: Press <kbd>R</kbd> twice or select **"Reload"** from the **Dev Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows/Linux or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS)
- **iOS**: Press <kbd>R</kbd> in iOS Simulator

## Building for Production

### Android APK

To create a release APK for sharing:
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

Users can install this APK directly on Android devices (requires enabling "Install from Unknown Sources").

### iOS

For iOS distribution, you'll need an Apple Developer account ($99/year) to use TestFlight or the App Store.

## Troubleshooting

If you encounter issues:

- **Reset Metro cache**: `npm start -- --reset-cache`
- **Clean Android build**: Delete `android/app/build/` folder and rebuild
- **Clean iOS build**: Clean build folder in Xcode (<kbd>Cmd ⌘</kbd> + <kbd>Shift</kbd> + <kbd>K</kbd>)
- **Reinstall dependencies**: Delete `node_modules/` and run `npm install` again
- **iOS Pods issues**: Delete `ios/Pods/` and `ios/Podfile.lock`, then run `pod install` again

For more help, see the official [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Project Structure
```
├── App.tsx                 # Main application component
├── android/               # Android native code
├── ios/                   # iOS native code
├── node_modules/          # Dependencies
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## Features

- WebView-based app loading Fina Money web application
- Google Sign-In integration for authentication
- Cross-platform support (iOS and Android)
- Error handling with retry functionality

## Learn More

To learn more about React Native, check out these resources:

- [React Native Website](https://reactnative.dev) - Learn more about React Native
- [Getting Started](https://reactnative.dev/docs/environment-setup) - Environment setup overview
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - Guided tour of React Native basics
- [React Native Blog](https://reactnative.dev/blog) - Latest official blog posts
- [React Native GitHub](https://github.com/facebook/react-native) - Open source repository

## Contributing

If you want to add this React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).