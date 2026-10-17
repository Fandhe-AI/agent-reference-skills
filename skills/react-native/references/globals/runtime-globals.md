---
source: https://reactnative.dev/docs/0.87/global-__DEV__
---

# Runtime globals

Global variables and objects available in the React Native JavaScript runtime: `__DEV__`, `global`, `self`, `window`, `process`, `navigator`, and `alert`.

## Signature / Usage

```text
You can use the `__DEV__` pseudo-global variable in the codebase to guard development-only blocks of code.

It is inlined during compilation and gets completely stripped out with the `if` blocks it guards in the minified build.
```

### Globals

| Name | Description | Official page |
| --- | --- | --- |
| `__DEV__` | Pseudo-global variable to guard development-only blocks of code. Inlined during compilation and stripped out, together with the `if` blocks it guards, in the minified build. | [global-__DEV__](https://reactnative.dev/docs/0.87/global-__DEV__) |
| `global` | Legacy alias for `globalThis`, as defined in Node.js. The use of `globalThis` is recommended over `global`. | [global-global](https://reactnative.dev/docs/0.87/global-global) |
| `self` | Alias for `globalThis`, as defined in Web specifications. The use of `globalThis` is recommended over `self`. | [global-self](https://reactnative.dev/docs/0.87/global-self) |
| `window` | Alias for `globalThis`, as defined in Web specifications. The use of `globalThis` is recommended over `window`. | [global-window](https://reactnative.dev/docs/0.87/global-window) |
| `process` | The global `process` object, as defined in Node.js. | [global-process](https://reactnative.dev/docs/0.87/global-process) |
| `navigator` | The global `navigator` object, as defined in Web specifications. | [global-navigator](https://reactnative.dev/docs/0.87/global-navigator) |
| `alert` | The global `alert` function, as defined in Web specifications. | [global-alert](https://reactnative.dev/docs/0.87/global-alert) |

## Notes

- `process`: the official page is marked "This page is work in progress."
- `navigator` and `alert`: the official pages are marked work in progress and refer to the MDN documentation (`https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator`, `https://developer.mozilla.org/en-US/docs/Web/API/Window/alert`).
- `self` and `window` link to the MDN pages `https://developer.mozilla.org/en-US/docs/Web/API/Window/self` and `https://developer.mozilla.org/en-US/docs/Web/API/Window/window`; `global`, `self` and `window` all point to `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis`.
- `global` is documented at `https://nodejs.org/api/globals.html#global`.
- `self` is not listed in the sidebar of the 0.87 docs, but the page exists at `https://reactnative.dev/docs/0.87/global-self`.
- The `__DEV__` page title is "✨ __DEV__" in the source.

## Related

- [console](./console.md)
- [Timer globals](./timer-globals.md)
- [Network globals](./network-globals.md)
