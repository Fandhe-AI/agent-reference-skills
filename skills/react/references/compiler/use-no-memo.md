---
source: https://react.dev/reference/react-compiler/directives/use-no-memo
---

# use no memo

`"use no memo"` prevents a function from being optimized by React Compiler.

## Signature / Usage

```js
function MyComponent() {
  "use no memo";
  // ...
}
```

The directive can also be placed at the top of a file to affect all functions in that module; the function-level directive overrides the module-level one:

```js
"use no memo";

// All functions in this file will be skipped by the compiler
```

## Notes

- When a function contains `"use no memo"`, the compiler skips it entirely, leaving it exactly as written. Useful as a temporary escape hatch when debugging or with code that doesn't work correctly with the compiler (for example, third-party library integration).
- It must be at the very beginning of a function body, before any imports or other code (comments are OK).
- The directive must be written with double or single quotes, not backticks, and must exactly match `"use no memo"` or its alias `"use no forget"`.
- It takes precedence over all compilation modes and other directives (skipped in `all` mode and in `infer` mode even if heuristics would optimize it).
- It's intended as a temporary debugging tool, not a permanent solution. Always document why (for example, a TODO comment with an issue reference).
- A directive placed after other code (for example after `const data = getData();`) is "too late" and does not prevent compilation.

## Related

- [use memo](./use-memo.md)
- [Directives](./directives.md)
- [Debugging and Troubleshooting](./debugging.md)
