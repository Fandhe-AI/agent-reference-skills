---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
---

# error-boundaries

Validates usage of Error Boundaries instead of try/catch for errors in child components.

## Signature / Usage

```js
// ❌ Try/catch won't catch render errors
function Parent() {
  try {
    return <ChildComponent />; // If this throws, catch won't help
  } catch (error) {
    return <div>Error occurred</div>;
  }
}

// ✅ Using error boundary
function Parent() {
  return (
    <ErrorBoundary>
      <ChildComponent />
    </ErrorBoundary>
  );
}
```

## Notes

- Try/catch blocks can't catch errors that happen during React's rendering process. Errors thrown in rendering methods or hooks bubble up through the component tree. Only Error Boundaries can catch these errors.
- Why is the linter telling me not to wrap `use` in `try`/`catch`? When `use` reads a pending promise it throws an internal Suspense signal, and a rejected promise throws its reason. A surrounding `catch` intercepts these, which breaks Suspense (React reports "Suspense Exception: This is not a real error!") and hides the rejection from Error Boundaries. Let Suspense and Error Boundaries handle them.
- The source says the catch block would never run; corrected here — the catch can run and swallow React's suspension signal (see `use`).

```js
// ❌ Try/catch around `use` hook
function Component({promise}) {
  try {
    const data = use(promise); // ❌ catch intercepts the Suspense signal / rejection meant for React
    return <div>{data}</div>;
  } catch (error) {
    return <div>Failed to load</div>; // Breaks Suspense; use an Error Boundary instead
  }
}

// ✅ Error boundary catches `use` errors
function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent promise={fetchData()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Related

- [Component (error boundaries)](../legacy/Component.md)
- [use](../apis/use.md)
- [Suspense](../components/Suspense.md)
