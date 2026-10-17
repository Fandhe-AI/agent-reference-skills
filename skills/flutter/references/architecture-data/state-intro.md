---
source: https://docs.flutter.dev/data-and-backend/state-mgmt/intro
---

# State management

Introduction to the state management section: how to structure an app to manage the state of data flowing through it and share state between screens.

## Signature / Usage

Page-order of the state management section (links in the page's prev/next chain):

```text
State management (intro)
-> Start thinking declaratively (/data-and-backend/state-mgmt/declarative)
-> Ephemeral versus app state (/data-and-backend/state-mgmt/ephemeral-vs-app)
-> Simple app state management (/data-and-backend/state-mgmt/simple)
-> List of approaches (/data-and-backend/state-mgmt/options)
```

## Notes

- As you explore Flutter, there comes a time when you need to share application state between screens, across your app. There are many approaches and many questions to think about; the following pages teach the basics of dealing with state in Flutter apps.
- If you are already familiar with state management in reactive apps you can skip this section, though the list of different approaches may be worth reviewing.
- If your app's state is lost on a restart, see Restore state on Android and Restore state on iOS (platform-integration pages).
- Flutter state management (Dart widgets, `ChangeNotifier`) is distinct from the android-architecture skill's ViewModel / state holder guidance.

## Related

- [Start thinking declaratively](./state-declarative.md)
- [Approaches to state management](./state-management-options.md)
- [Guide to app architecture](./architecture-guide.md)
