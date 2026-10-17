---
source: https://react.dev/reference/react-compiler/configuration
---

# Configuration

All configuration options available in React Compiler. For most apps, the default options work out of the box.

## Signature / Usage

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler', {
        // compiler options
      }
    ]
  ]
};
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `compilationMode` | `'infer' \| 'syntax' \| 'annotation' \| 'all'` | Strategy for selecting functions to compile (all functions, only annotated ones, or intelligent detection). |
| `target` | `'17' \| '18' \| '19'` | React version the compiled output targets. React 17/18 also require the `react-compiler-runtime` package. |
| `panicThreshold` | `'none' \| 'critical_errors' \| 'all_errors'` | Whether to fail the build or skip problematic components. `'none'` recommended for production. |
| `logger` | `{ logEvent(filename, event) } \| null` | Custom logging for compilation events. |
| `gating` | `{ source: string; importSpecifierName: string } \| null` | Runtime feature flags for A/B testing or gradual rollouts. |

Examples per option:

```js
{
  compilationMode: 'annotation' // Only compile "use memo" functions
}
```

```js
// For React 18 projects
{
  target: '18' // Also requires react-compiler-runtime package
}
```

```js
// Recommended for production
{
  panicThreshold: 'none' // Skip components with errors instead of failing the build
}
```

```js
{
  logger: {
    logEvent(filename, event) {
      if (event.kind === 'CompileSuccess') {
        console.log('Compiled:', filename);
      }
    }
  }
}
```

```js
{
  gating: {
    source: 'my-feature-flags',
    importSpecifierName: 'isCompilerEnabled'
  }
}
```

## Notes

- Default configuration: for most React 19 applications, the compiler works without configuration (`plugins: ['babel-plugin-react-compiler']`).
- React 17/18 projects need the runtime package and target configuration: `npm install react-compiler-runtime@latest` and `{ target: '18' }` (or `'17'`).
- Incremental adoption: start with `compilationMode: 'annotation'` (only compile `"use memo"` functions).

## Related

- [compilationMode](./compilationMode.md)
- [target](./target.md)
- [panicThreshold](./panicThreshold.md)
- [logger](./logger.md)
- [gating](./gating.md)
- [Directives](./directives.md)
