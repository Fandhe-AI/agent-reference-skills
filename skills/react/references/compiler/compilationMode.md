---
source: https://react.dev/reference/react-compiler/compilationMode
---

# compilationMode

The `compilationMode` option controls how the React Compiler selects which functions to compile.

## Signature / Usage

```js
{
  compilationMode: 'infer' // or 'annotation', 'syntax', 'all'
}
```

## Options / Props

Type: `'infer' | 'syntax' | 'annotation' | 'all'`. Default: `'infer'`.

| Value | Description |
| --- | --- |
| `'infer'` (default) | Intelligent heuristics: functions explicitly annotated with `"use memo"`, and functions named like components (PascalCase) or hooks (`use` prefix) AND that create JSX and/or call other hooks. |
| `'annotation'` | Only compile functions explicitly marked with the `"use memo"` directive. Ideal for incremental adoption. |
| `'syntax'` | Only compile components and hooks that use Flow's component and hook syntax. |
| `'all'` | Compile all top-level functions. Not recommended as it may compile non-React functions. |

Compiled in `'infer'` mode:

```js
// ✅ Compiled: Named like a component + returns JSX
function Button(props) {
  return <button>{props.label}</button>;
}

// ✅ Compiled: Named like a hook + calls hooks
function useCounter() {
  const [count, setCount] = useState(0);
  return [count, setCount];
}

// ✅ Compiled: Explicit directive
function expensiveCalculation(data) {
  "use memo";
  return data.reduce(/* ... */);
}

// ❌ Not compiled: Not a component/hook pattern
function calculateTotal(items) {
  return items.reduce((a, b) => a + b, 0);
}
```

Annotation mode:

```js
{
  compilationMode: 'annotation'
}

// Only this function will be compiled
function ExpensiveList(props) {
  "use memo";
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

Flow syntax mode:

```js
// Compiled: Flow component syntax
component Button(label: string) {
  return <button>{label}</button>;
}

// Compiled: Flow hook syntax
hook useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  return [count, setCount];
}
```

## Notes

- The `'infer'` mode requires functions to follow React naming conventions to be detected. A lowercase component name (`button`) or a "hook" that neither creates JSX nor calls hooks (`useData` returning `window.localStorage.getItem('data')`) is not compiled.
- Using `'all'` mode may negatively impact performance by compiling utility functions.
- The `'syntax'` mode requires Flow and won't work with TypeScript.
- Regardless of mode, functions with the `"use no memo"` directive are always skipped.

## Related

- [Configuration](./configuration.md)
- [use memo](./use-memo.md)
- [use no memo](./use-no-memo.md)
- [Incremental Adoption](./incremental-adoption.md)
