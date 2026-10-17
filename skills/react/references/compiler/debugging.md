---
source: https://react.dev/learn/react-compiler/debugging
---

# Debugging and Troubleshooting

How to identify and fix issues when using React Compiler: compiler errors vs runtime issues, common breaking patterns, and a debugging workflow.

## Signature / Usage

Use `"use no memo"` to isolate whether an issue is compiler-related:

```js
function ProblematicComponent() {
  "use no memo"; // Skip compilation for this component
  // ... rest of component
}
```

If the issue disappears, it's likely related to a Rules of React violation.

## Notes

- React Compiler is designed to handle code that follows the Rules of React. When it encounters code that might break these rules, it safely skips optimization rather than risk changing your app's behavior.
- **Compiler errors** occur at build time and prevent your code from compiling. These are rare because the compiler is designed to skip problematic code rather than fail.
- **Runtime issues** occur when compiled code behaves differently than expected. Most of the time, if you encounter an issue with React Compiler, it's a runtime issue. It typically happens when your code violates the Rules of React in subtle ways that the compiler couldn't detect, and the compiler mistakenly compiled a component it should have skipped. Focus on finding Rules of React violations not detected by the ESLint rule.
- Common breaking pattern: code written to rely on memoization for correctness (effects over-firing, infinite loops, missing updates). Scenarios: effects that rely on referential equality; dependency arrays that need stable references; conditional logic based on reference checks.
- Compiler build errors that unexpectedly break your build are likely a compiler bug. Report to the react/react repository with the error message, the code that caused the error, and your React and compiler versions.
- Runtime workflow: (1) temporarily disable compilation with `"use no memo"`; you can also try removing manual memoization (useMemo, useCallback, memo) from the component — if the bug still occurs with all memoization removed, you have a Rules of React violation. (2) Fix step by step: identify the root cause (often memoization-for-correctness), test after each fix, remove `"use no memo"` once fixed, verify the component shows the ✨ badge in React DevTools.
- Reporting compiler bugs: verify it's not a Rules of React violation (check with ESLint); create a minimal reproduction; test without the compiler to confirm it only occurs with compilation; file an issue with React and compiler versions, minimal reproduction code, expected vs actual behavior, and any error messages.

## Related

- [Incremental Adoption](./incremental-adoption.md)
- [use no memo](./use-no-memo.md)
- [Installation](./installation.md)
