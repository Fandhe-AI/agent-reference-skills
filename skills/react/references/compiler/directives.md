---
source: https://react.dev/reference/react-compiler/directives
---

# Directives

React Compiler directives are special string literals that control whether specific functions are compiled.

## Signature / Usage

```js
function MyComponent() {
  "use memo"; // Opt this component into compilation
  return <div>{/* ... */}</div>;
}
```

Module-level directive (top of file, affects all functions in the module):

```js
// At the very top of the file
"use memo";

// All functions in this file will be compiled
function Component1() {
  return <div>Compiled</div>;
}

// Can be overridden at function level
function Component3() {
  "use no memo"; // This overrides the module directive
  return <div>Not compiled</div>;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `"use memo"` | directive | Force compilation. Use when in `annotation` mode or to override `infer` mode heuristics. |
| `"use no memo"` | directive | Prevent compilation. Use for debugging issues or working with incompatible code. |

## Notes

- Directives are string literals placed at the beginning of a function body or at the top of a module.
- Interaction with `compilationMode`: `annotation` mode compiles only functions with `"use memo"`; `infer` mode lets the compiler decide and directives override decisions; `all` mode compiles everything and `"use no memo"` can exclude specific functions.
- Directives are escape hatches. Prefer project-level configuration, document why a directive is used, and plan removal of opt-out directives (add a TODO comment, create a tracking issue, fix the underlying problem, remove the directive).
- Common issues: directive ignored (check placement — must be first — and spelling); compilation still happens (check `ignoreUseNoForget` setting); module directive not working (ensure it's before all imports).

## Related

- [use memo](./use-memo.md)
- [use no memo](./use-no-memo.md)
- [compilationMode](./compilationMode.md)
- [Configuration](./configuration.md)
