---
source: https://reactnative.dev/docs/0.87/navigation
---

# Navigating Between Screens

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by what is known as a navigator. This guide points to React Navigation, the community solution, and to react-native-navigation for native navigation.

## Signature / Usage

```shell
npm install @react-navigation/native @react-navigation/native-stack
```

```tsx
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

```tsx
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}
```

```tsx
export default function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

Peer dependencies (Expo managed project vs bare React Native project):

```shell
npx expo install react-native-screens react-native-safe-area-context
```

```shell
npm install react-native-screens react-native-safe-area-context
```

For iOS with a bare React Native project, install the pods:

```shell
cd ios
pod install
cd ..
```

Starter template with Expo:

```shell
npx create-expo-app@latest --template react-navigation/template
```

## Notes

- React Navigation is a standalone community library, not part of `react-native`. If you're integrating React Native into an app that already manages navigation natively, or looking for an alternative, react-native-navigation (wix) provides native navigation on both platforms.
- Each screen definition needs a `screen` property that is a React component or another navigator; screen options such as the title go in `options`. Inside a screen component, `useNavigation` returns the `navigation` object.
- The `native-stack` navigator uses the native APIs: `UINavigationController` on iOS and `Fragment` on Android, so navigation built with `createNativeStackNavigator` behaves the same and has similar performance characteristics as apps built natively on top of those APIs.
- React Navigation also has packages for other navigators such as tabs and drawer.
- Distinct from web routers (react-router, tanstack-router) and from android-navigation (Jetpack Navigation); the Expo file-based router (Expo Router) belongs to the Expo SDK docs, not to `react-native`.

## Related

- [Handling Touches](./handling-touches.md)
