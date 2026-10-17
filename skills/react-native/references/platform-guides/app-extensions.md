---
source: https://reactnative.dev/docs/0.87/app-extensions
---

# App Extensions

App extensions let you provide custom functionality and content outside of your main app. This guide briefly covers how you may take advantage of app extensions on iOS with React Native, focusing on memory limits.

## Signature / Usage

The page contains no code. The memory limits it states:

```text
Today widget:              16 MB
Custom Keyboard extension: 48 MB
Share extension:          120 MB
```

## Notes

- Extensions are loaded outside the regular app sandbox, so several are likely loaded simultaneously and each has small memory usage limits. Test on an actual device: extensions often work in the iOS Simulator but fail to load on real devices.
- Today widget: the memory limit is 16 MB. React Native Today widget implementations may work unreliably because memory usage tends to be too high. An extension exceeding the limit yields the message 'Unable to Load'.
- Debug-configured builds are more likely to exceed the memory limits, while release-configured builds don't fail right away; the release build is likely very close to the 16 MB limit and common operations such as fetching data from an API can push it over. Use Xcode's Instruments to analyze real-world memory usage.
- Other app extensions have greater limits (Custom Keyboard 48 MB, Share 120 MB), so implementing them with React Native is more viable. The docs cite community proofs of concept: react-native-today-widget and react-native-ios-share-extension.
- The different extension types are covered in Apple's App Extension Programming Guide. For native iOS extension development see the apple-uikit and apple-swift skills; this page is React Native specific guidance.

## Related

- [Publishing to Apple App Store](./publishing-to-app-store.md)
- [Profiling](../debugging-performance/profiling.md)
