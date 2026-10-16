---
source: https://docs.flutter.dev/data-and-backend/state-mgmt/options
---

# Approaches to state management

Overview of built-in approaches and community packages for managing state in Flutter apps, with pointers to learning resources.

## Signature / Usage

Built-in approaches named on the page:

```text
setState
ValueNotifier and InheritedNotifier
InheritedWidget and InheritedModel
```

## Options / Props

| Approach | Description |
|----------|-------------|
| `setState` | The low-level approach to use for widget-specific, ephemeral state. |
| `ValueNotifier` and `InheritedNotifier` | An approach using only Flutter provided APIs to update state and notify the UI of changes. |
| `InheritedWidget` and `InheritedModel` | The low-level approach used to communicate between ancestors and children in the widget tree. This is what `package:provider` and many other approaches use under the hood. |
| Community-provided packages | Packages that often reduce boilerplate, provide specialized debugging tools, and help enable a clearer and consistent application architecture. Explore the `state-management` topic on pub.dev (`https://pub.dev/packages?q=topic%3Astate-management`). |

## Notes

- "State management is a complex topic." Resources listed under General overview: Introduction to state management, the Google I/O 2019 video "Pragmatic State Management in Flutter", and Flutter Architecture Samples by Brian Egan (`fluttersamples.com`).
- The best package choice depends on app complexity, team preferences, and the specific problems to solve.
- If you've developed a state management package, consider adding the `state-management` topic and publishing it to pub.dev.
- Flutter state management is distinct from the android-architecture skill's guidance.

## Related

- [Simple app state management](./simple-app-state.md)
- [Differentiate between ephemeral state and app state](./ephemeral-vs-app-state.md)
- [State management](./state-intro.md)
