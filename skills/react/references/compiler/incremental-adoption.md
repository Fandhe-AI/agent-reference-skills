---
source: https://react.dev/learn/react-compiler/incremental-adoption
---

# Incremental Adoption

React Compiler can be adopted incrementally, trying it on specific parts of a codebase first. Three approaches: Babel overrides, opt-in with `"use memo"`, and runtime gating.

## Signature / Usage

Directory-based adoption with Babel `overrides`:

```js
// babel.config.js
module.exports = {
  plugins: [
    // Global plugins that apply to all files
  ],
  overrides: [
    {
      test: ['./src/modern/**/*.js', './src/modern/**/*.jsx', './src/modern/**/*.ts', './src/modern/**/*.tsx'],
      plugins: [
        'babel-plugin-react-compiler'
      ]
    }
  ]
};
```

Expanding coverage, with a different plugin set for legacy code:

```js
// babel.config.js
module.exports = {
  plugins: [
    // Global plugins
  ],
  overrides: [
    {
      test: [
        './src/modern/**/*.js', './src/modern/**/*.jsx', './src/modern/**/*.ts', './src/modern/**/*.tsx',
        './src/features/**/*.js', './src/features/**/*.jsx', './src/features/**/*.ts', './src/features/**/*.tsx',
      ],
      plugins: [
        'babel-plugin-react-compiler'
      ]
    },
    {
      test: ['./src/legacy/**/*.js', './src/legacy/**/*.jsx', './src/legacy/**/*.ts', './src/legacy/**/*.tsx'],
      plugins: [
        // Different plugins for legacy code
      ]
    }
  ]
};
```

Per-override compiler options:

```js
// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: ['./src/experimental/**/*.js', './src/experimental/**/*.jsx', './src/experimental/**/*.ts', './src/experimental/**/*.tsx'],
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    }
  ]
};
```

Opt-in mode with `"use memo"`:

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation',
    }],
  ],
};
```

```js
function TodoList({ todos }) {
  "use memo"; // Opt this component into compilation

  const sortedTodos = todos.slice().sort();

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function useSortedData(data) {
  "use memo"; // Opt this hook into compilation

  return data.slice().sort();
}
```

Runtime feature flags with gating:

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        source: 'ReactCompilerFeatureFlags',
        importSpecifierName: 'isCompilerEnabled',
      },
    }],
  ],
};
```

```js
// ReactCompilerFeatureFlags.js
export function isCompilerEnabled() {
  // Use your feature flag system
  return getFeatureFlag('react-compiler-enabled');
}
```

## Notes

- Incremental adoption lets you test the compiler on small parts of the app, address Rules of React violations systematically as coverage expands, and run A/B tests to measure real-world impact.
- With `compilationMode: 'annotation'` you must add `"use memo"` to every component and every custom hook you want optimized, and remember to add it to new components.
- Gating: the compiler wraps optimized code in a runtime check. If the gate returns `true`, the optimized version runs; otherwise the original code runs.
- Troubleshooting adoption: use `"use no memo"` to temporarily exclude problematic components; check the debugging guide; fix Rules of React violations identified by the ESLint plugin; consider `compilationMode: 'annotation'` for more gradual adoption.

- Corrected from the source: react.dev writes `test: './src/**/*.{js,jsx,ts,tsx}'`, but Babel string patterns only support `*`, `**` and single-extension `*.ext` (no brace expansion), so the examples here list each extension explicitly.

## Related

- [compilationMode](./compilationMode.md)
- [gating](./gating.md)
- [Directives](./directives.md)
- [use memo](./use-memo.md)
- [use no memo](./use-no-memo.md)
- [Debugging and Troubleshooting](./debugging.md)
- [Configuration](./configuration.md)
