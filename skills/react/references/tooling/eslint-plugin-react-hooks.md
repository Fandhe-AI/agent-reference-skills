---
source: https://react.dev/reference/eslint-plugin-react-hooks
---

# eslint-plugin-react-hooks

`eslint-plugin-react-hooks` provides ESLint rules to enforce the Rules of React.

## Signature / Usage

```js
// Rules from the `recommended` preset (react-hooks/<rule-name>)
exhaustive-deps
rules-of-hooks
component-hook-factories
config
error-boundaries
gating
globals
immutability
incompatible-library
preserve-manual-memoization
purity
refs
set-state-in-effect
set-state-in-render
static-components
unsupported-syntax
use-memo
```

This plugin helps you catch violations of React's rules at build time, ensuring your components and hooks follow React's rules for correctness and performance. The lints cover both fundamental React patterns (exhaustive-deps and rules-of-hooks) and issues flagged by React Compiler. React Compiler diagnostics are automatically surfaced by this ESLint plugin, and can be used even if your app hasn't adopted the compiler yet.

## Options / Props

These rules are included in the `recommended` preset in `eslint-plugin-react-hooks`:

| Rule | Description |
| --- | --- |
| [`exhaustive-deps`](./lint-exhaustive-deps.md) | Validates that dependency arrays for React hooks contain all necessary dependencies |
| [`rules-of-hooks`](./lint-rules-of-hooks.md) | Validates that components and hooks follow the Rules of Hooks |
| [`component-hook-factories`](./lint-component-hook-factories.md) | Validates higher order functions defining nested components or hooks |
| [`config`](./lint-config.md) | Validates the compiler configuration options |
| [`error-boundaries`](./lint-error-boundaries.md) | Validates usage of Error Boundaries instead of try/catch for child errors |
| [`gating`](./lint-gating.md) | Validates configuration of gating mode |
| [`globals`](./lint-globals.md) | Validates against assignment/mutation of globals during render |
| [`immutability`](./lint-immutability.md) | Validates against mutating props, state, and other immutable values |
| [`incompatible-library`](./lint-incompatible-library.md) | Validates against usage of libraries which are incompatible with memoization |
| [`preserve-manual-memoization`](./lint-preserve-manual-memoization.md) | Validates that existing manual memoization is preserved by the compiler |
| [`purity`](./lint-purity.md) | Validates that components/hooks are pure by checking known-impure functions |
| [`refs`](./lint-refs.md) | Validates correct usage of refs, not reading/writing during render |
| [`set-state-in-effect`](./lint-set-state-in-effect.md) | Validates against calling setState synchronously in an effect |
| [`set-state-in-render`](./lint-set-state-in-render.md) | Validates against setting state during render |
| [`static-components`](./lint-static-components.md) | Validates that components are static, not recreated every render |
| [`unsupported-syntax`](./lint-unsupported-syntax.md) | Validates against syntax that React Compiler does not support |
| [`use-memo`](./lint-use-memo.md) | Validates usage of the `useMemo` hook without a return value |

## Notes

- When the compiler reports a diagnostic, it means that the compiler was able to statically detect a pattern that is not supported or breaks the Rules of React. When it detects this, it **automatically** skips over those components and hooks, while keeping the rest of your app compiled. This ensures optimal coverage of safe optimizations that won't break your app.
- What this means for linting, is that you don't need to fix all violations immediately. Address them at your own pace to gradually increase the number of optimized components.
- The official docs page is marked `version: rc` in its frontmatter.

## Related

- [rules-of-hooks](./lint-rules-of-hooks.md)
- [exhaustive-deps](./lint-exhaustive-deps.md)
