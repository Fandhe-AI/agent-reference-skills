---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
---

# incompatible-library

Validates against usage of libraries which are incompatible with memoization (manual or automatic).

## Signature / Usage

```js
// Example of how memoization breaks with these libraries
function Form() {
  const { watch } = useForm();

  // ❌ This value will never update, even when 'name' field changes
  const name = useMemo(() => watch('name'), [watch]);

  return <div>Name: {name}</div>; // UI appears "frozen"
}
```

```js
// ❌ react-hook-form `watch`
function Component() {
  const {watch} = useForm();
  const value = watch('field'); // Interior mutability
  return <div>{value}</div>;
}

// ❌ TanStack Table `useReactTable`
function Component({data}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // table instance uses interior mutability
  return <Table table={table} />;
}

// ✅ For react-hook-form, use `useWatch`:
function Component() {
  const {register, control} = useForm();
  const watchedValue = useWatch({
    control,
    name: 'field'
  });

  return (
    <>
      <input {...register('field')} />
      <div>Current value: {watchedValue}</div>
    </>
  );
}
```

## Notes

- These libraries were designed before React's memoization rules were fully documented. They made the correct choices at the time to optimize for ergonomic ways to keep components just the right amount of reactive as app state changes. While these legacy patterns worked, we have since discovered that it's incompatible with React's programming model. We will continue working with library authors to migrate these libraries to use patterns that follow the Rules of React.
- When the linter detects usages of these APIs from a known list, it flags them under this rule. This means that React Compiler can automatically skip over components that use these incompatible APIs, in order to avoid breaking your app.
- React Compiler automatically memoizes values following the Rules of React. If something breaks with manual `useMemo`, it will also break the compiler's automatic optimization.
- Designing APIs: one incompatible pattern is "interior mutability" (an object or function keeps its own hidden state that changes over time, even though the reference to it stays the same). As a rule of thumb, think about whether `useMemo` would break the API. Instead, design APIs that return immutable state and use explicit update functions:

```js
// ✅ Good: Return immutable state that changes reference when updated
function Component() {
  const { field, updateField } = useLibrary();
  // this is always safe to memo
  const greeting = useMemo(() => `Hello, ${field.name}!`, [field.name]);

  return (
    <div>
      <input
        value={field.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <p>{greeting}</p>
    </div>
  );
}
```

- Pitfall (MobX): patterns like `observer` also break memoization assumptions, but the linter does not yet detect them. If you rely on MobX and find that your app doesn't work with React Compiler, you may need to use the `"use no memo" directive`.
- Some other libraries do not yet have alternative APIs that are compatible with React's memoization model. If the linter doesn't automatically skip over your components or hooks that call these APIs, file an issue so it can be added to the linter.
- The examples name react-hook-form (`watch` / `useWatch`) and TanStack Table (`useReactTable`); see the react-hook-form and tanstack-table skills for those libraries' own APIs.

## Related

- [preserve-manual-memoization](./lint-preserve-manual-memoization.md)
- [use no memo](../compiler/use-no-memo.md)
