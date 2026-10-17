---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
---

# exhaustive-deps

Validates that dependency arrays for React hooks contain all necessary dependencies.

## Signature / Usage

```js
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // Missing 'count'

// ❌ Incomplete dependencies
useMemo(() => {
  return items.sort(sortOrder);
}, [items]); // Missing 'sortOrder'

// ✅ All dependencies included
useEffect(() => {
  console.log(count);
}, [count]);
```

## Options / Props

Custom effect hooks can be configured using shared ESLint settings (available in `eslint-plugin-react-hooks` 6.1.1 and later):

```js
{
  "settings": {
    "react-hooks": {
      "additionalEffectHooks": "(useMyEffect|useCustomEffect)"
    }
  }
}
```

For backward compatibility, this rule also accepts a rule-level option:

```js
{
  "rules": {
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useMyCustomHook|useAnotherHook)"
    }]
  }
}
```

| Name | Type | Description |
| --- | --- | --- |
| `settings["react-hooks"].additionalEffectHooks` | regex string | Regex pattern matching custom hooks that should be checked for exhaustive dependencies. This configuration is shared across all `react-hooks` rules. |
| `additionalHooks` (rule-level) | regex string | Regex for hooks that should be checked for exhaustive dependencies. If this rule-level option is specified, it takes precedence over the shared `settings` configuration. |

## Notes

- When a value referenced inside `useEffect`, `useMemo`, or `useCallback` isn't included in the dependency array, React won't re-run the effect or recalculate the value when that dependency changes. This causes stale closures where the hook uses outdated values.
- This error often happens when you try to "trick" React about dependencies to control when an effect runs. Effects should synchronize your component with external systems. The dependency array tells React which values the effect uses, so React knows when to re-synchronize. If you find yourself fighting with the linter, you likely need to restructure your code (see Removing Effect Dependencies).
- Adding a function dependency causes infinite loops when the function is recreated on every render. In most cases, you don't need the effect: call the function where the action happens instead (event handler), or derive during render. If you genuinely need the effect, make the dependency stable:

```js
// ✅ useCallback keeps the function reference stable
const logItems = useCallback(() => {
  console.log(items);
}, [items]);

useEffect(() => {
  logItems();
}, [logItems]);

// ✅ Or move the logic straight into the effect
useEffect(() => {
  console.log(items);
}, [items]);
```

- Running an effect only once: either include the dependency (recommended) or use a ref guard if you truly need to run once:

```js
// ✅ Or use a ref guard inside an effect
const sent = useRef(false);

useEffect(() => {
  if (sent.current) {
    return;
  }

  sent.current = true;
  sendAnalytics(userId);
}, [userId]);
```

- This is React's own lint rule; Biome's `useExhaustiveDependencies` (see the biome skill) is a separate implementation.

## Related

- [useEffect](../hooks/useEffect.md)
- [useMemo](../hooks/useMemo.md)
- [useCallback](../hooks/useCallback.md)
- [rules-of-hooks](./lint-rules-of-hooks.md)
