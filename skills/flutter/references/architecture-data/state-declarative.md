---
source: https://docs.flutter.dev/data-and-backend/state-mgmt/declarative
---

# Start thinking declaratively

Flutter is declarative: it builds its UI to reflect the current state of the app, so you change the state and the UI rebuilds from scratch.

## Signature / Usage

The relationship, as described in the page's diagram (alt text):

```text
UI = f(state)
'UI' is the layout on the screen. 'f' is your build methods. 'state' is the application state.
```

## Notes

- Coming from an imperative framework (such as Android SDK or iOS UIKit), you need to start thinking about app development from a new perspective. In Flutter it's okay to rebuild parts of your UI from scratch instead of modifying it; Flutter is fast enough to do that, even on every frame if needed.
- When app state changes (e.g. the user flips a switch in settings), you change the state and that triggers a redraw. There is no imperative changing of the UI itself (like `widget.setText`).
- Benefit: there is only one code path for any state of the UI; you describe what the UI should look like for any given state, once.
- Read more in the Introduction to declarative UI (fundamentals).

## Related

- [State management](./state-intro.md)
- [Differentiate between ephemeral state and app state](./ephemeral-vs-app-state.md)
- [Common architecture concepts](./architecture-concepts.md)
