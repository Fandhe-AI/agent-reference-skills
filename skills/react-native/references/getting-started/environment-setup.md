---
source: https://reactnative.dev/docs/0.87/environment-setup
---

# Get Started with React Native

Entry point for starting a new project: React Native recommends using a Framework such as Expo; building without a Framework is also possible.

## Signature / Usage

```shell
npx create-expo-app@latest
```

## Notes

- Platforms: android, ios, tv, web (platform-support badge on the Expo section).
- React Native allows developers who know React to create native apps. At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.
- The best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps. You can also use React Native without a Framework, however most developers benefit from using a React Native Framework like Expo (https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.
- "Can I use React Native without a Framework?" Yes. However, if you are building a new app with React Native, a Framework is recommended: you spend time writing your app instead of writing an entire Framework yourself. Without a Framework you either write your own solutions for core features (navigation, accessing native APIs, native dependencies) or piece together pre-existing libraries, which takes real work both when starting and when maintaining the app.
- If your app has unusual constraints not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio and Xcode: see `set-up-your-environment` and `getting-started-without-a-framework`.
- Expo is a production-grade React Native Framework providing developer tooling such as file-based routing and a standard library of native modules. It is free and open source (GitHub: https://github.com/expo, Discord: https://chat.expo.dev); the Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK. Expo Application Services (EAS) is an optional set of services that complements Expo in each step of the development process.
- After creating the app, continue with Expo's getting started guide: https://docs.expo.dev/get-started/set-up-your-environment
- Expo itself (Expo SDK, Expo Router, EAS, create-expo-app) is outside this skill; this skill covers `react-native` itself.

## Related

- [Set Up Your Environment](./set-up-your-environment.md)
- [Get Started Without a Framework](./getting-started-without-a-framework.md)
