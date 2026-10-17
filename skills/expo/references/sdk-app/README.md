# sdk-app

| Name | Description | Path |
|------|-------------|------|
| Android App Links | Configure Android App Links to open your Expo app from a standard web URL: add `intentFilters` with `autoVerify` to the app config and set up two-way association between the website and the native app. | [android-app-links.md](./android-app-links.md) |
| Application | `expo-application` provides information about the native application's ID, app name, and build version at runtime. | [application.md](./application.md) |
| Asset | `expo-asset` provides an interface to Expo's asset system: files that live alongside the app source and are needed at runtime (images, fonts, sounds), referenced with `require('path/to/file')`. | [asset.md](./asset.md) |
| Constants | `expo-constants` provides system information that remains constant throughout the lifetime of the app's installation. | [constants.md](./constants.md) |
| DevClient | `expo-dev-client` adds development tools to debug builds: a configurable launcher UI, improved debugging tools (such as inspecting network requests) and an extensible developer menu. Debug builds that include it are called development builds. | [dev-client.md](./dev-client.md) |
| Expo | Set of common methods and types for Expo and related packages (`expo` package: `registerRootComponent`, `expo/fetch`, event emitters, shared objects, native module helpers, permission types). | [expo.md](./expo.md) |
| Expo Fingerprint | `@expo/fingerprint` generates a fingerprint (hash) of a React Native project to determine compatibility between the native layer and JavaScript layer. By default it hashes app dependencies, custom native code, native project files, and configuration. | [fingerprint.md](./fingerprint.md) |
| Font | `expo-font` loads fonts from the web (or embeds them at build time) and uses them in React Native components. | [font.md](./font.md) |
| Haptics | `expo-haptics` provides haptic (touch) feedback: Android via the Vibrator system service, iOS 10+ via the Taptic Engine, and web via the Web Vibration API. | [haptics.md](./haptics.md) |
| iOS Universal Links | Configure iOS Universal Links to open your Expo app from a standard web URL: host an apple-app-site-association (AASA) file on the website and add `ios.associatedDomains` to the app config. | [ios-universal-links.md](./ios-universal-links.md) |
| KeepAwake | `expo-keep-awake` provides a React hook that prevents the screen from sleeping and functions to enable this behavior imperatively. | [keep-awake.md](./keep-awake.md) |
| Linking into your app | Handle an incoming URL in a React Native and Expo app by creating a deep link with a custom scheme. | [linking-into-your-app.md](./linking-into-your-app.md) |
| Overview of linking, deep links, Android App Links, and iOS Universal Links | Linking lets your app interact with incoming and outgoing URLs: a URL opens the app and takes the user to a specific screen (route). | [linking-overview.md](./linking-overview.md) |
| Linking | `expo-linking` provides utilities for interacting with other installed apps using deep links, and helpers for constructing and parsing deep links into your app. It extends React Native's `Linking`. | [linking.md](./linking.md) |
| Localization | `expo-localization` provides access to the device's locale and calendar data and helps localize an app for specific regions, languages, or cultures. Pair it with a localization library such as `lingui-js`, `react-i18next`, `react-intl`, `i18n-js`, or `react-native-intlayer`. | [localization.md](./localization.md) |
| NavigationBar | `expo-navigation-bar` provides a component and an imperative API for controlling the app's navigation bar on Android: change the color of its buttons or hide it. | [navigation-bar.md](./navigation-bar.md) |
| ScreenOrientation | `expo-screen-orientation` lets you get, lock, and observe the screen orientation (the orientation in which graphics are painted, not the physical device orientation). | [screen-orientation.md](./screen-orientation.md) |
| SecureStore | `expo-secure-store` encrypts and securely stores key-value pairs locally on the device. Each Expo project has a separate storage system with no access to other projects' storage. | [securestore.md](./securestore.md) |
| SplashScreen | `expo-splash-screen` provides control over the native splash screen. By default it hides automatically when the app is ready; visibility can also be controlled manually. | [splash-screen.md](./splash-screen.md) |
| StatusBar | `expo-status-bar` provides a component and imperative interface to control the app status bar: change its text color, hide it, and animate these changes. Built on top of React Native's `StatusBar` with defaults that work better for Expo users. | [status-bar.md](./status-bar.md) |
| SystemUI | `expo-system-ui` interacts with UI elements outside of the React tree: the root view background color, and locking the user interface style globally on Android. | [system-ui.md](./system-ui.md) |
