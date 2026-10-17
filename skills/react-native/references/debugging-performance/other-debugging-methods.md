---
source: https://reactnative.dev/docs/0.87/other-debugging-methods
---

# Other Debugging Methods

Legacy JavaScript debugging methods: Safari Developer Tools (direct JSC debugging) and the removed Remote JavaScript Debugging.

## Signature / Usage

```text
Safari > Settings... > Advanced > "Show features for web developers"
Develop menu > <your device> > "JSContext"
Physical devices only: Settings app > Safari > Advanced > "Web Inspector" on
```

## Notes

- For a new React Native or Expo app, React Native DevTools is recommended instead.
- Safari Developer Tools debug the iOS app when JavaScriptCore (JSC) is the runtime. Selecting the "JSContext" item opens Safari's Web Inspector (Console and Sources panels similar to Chrome DevTools).
- Source maps may not be enabled by default for Safari debugging; the original page links a guide and video to enable them.
- Every app reload creates a new JSContext; choosing "Automatically Show Web Inspectors for JSContexts" avoids selecting the latest one manually.
- Remote JavaScript Debugging: removed as of React Native 0.79. On an older version, use the docs for your version.

## Related

- [React Native DevTools](./react-native-devtools.md)
- [Debugging Basics](./debugging.md)
