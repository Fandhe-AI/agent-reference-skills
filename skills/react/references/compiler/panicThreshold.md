---
source: https://react.dev/reference/react-compiler/panicThreshold
---

# panicThreshold

The `panicThreshold` option controls how the React Compiler handles errors during compilation: whether they fail the build or skip optimization.

## Signature / Usage

```js
{
  panicThreshold: 'none' // Recommended
}
```

Stricter threshold during development only:

```js
const isDevelopment = process.env.NODE_ENV === 'development';

{
  panicThreshold: isDevelopment ? 'critical_errors' : 'none',
  logger: {
    logEvent(filename, event) {
      if (isDevelopment && event.kind === 'CompileError') {
        // ...
      }
    }
  }
}
```

## Options / Props

Type: `'none' | 'critical_errors' | 'all_errors'`. Default: `'none'`.

| Value | Description |
| --- | --- |
| `'none'` (default, recommended) | Skip components that can't be compiled and continue building |
| `'critical_errors'` | Fail the build only on critical compiler errors |
| `'all_errors'` | Fail the build on any compiler diagnostic |

## Notes

- Production builds should always use `'none'`. This ensures the build never fails due to compiler issues, components that can't be optimized run normally, and maximum components get optimized.
- Build failures prevent your application from building.
- The compiler automatically detects and skips problematic code with `'none'`.
- Higher thresholds are only useful during development for debugging.

## Related

- [Configuration](./configuration.md)
- [logger](./logger.md)
