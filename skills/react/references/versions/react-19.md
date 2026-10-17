---
source: https://react.dev/blog/2024/12/05/react-19
---

# React v19

React 19 stable was released on npm on December 5, 2024. The post gives an overview of new features (Actions, new hooks and APIs, static APIs, Server Components) and improvements. Additions since the April RC: pre-warming for suspended trees and the React DOM static APIs.

## Signature / Usage

Actions with `useActionState` and `<form>`:

```js
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

## Options / Props

### What's new

| Feature | Summary |
| --- | --- |
| Actions | Async functions in transitions handle pending state, errors, forms and optimistic updates automatically |
| `useActionState` | Accepts a function (the Action) and returns `[error/result, wrappedAction, isPending]`. Previously `ReactDOM.useFormState` in Canary; renamed and `useFormState` deprecated |
| `<form>` Actions | Functions can be passed to `action` and `formAction` of `<form>`, `<input>`, `<button>`. Uncontrolled forms reset automatically on success; call `requestFormReset` to reset manually |
| `useFormStatus` (`react-dom`) | Reads the status of the parent `<form>` as if it were a Context provider: `const {pending} = useFormStatus();` |
| `useOptimistic` | `const [optimisticName, setOptimisticName] = useOptimistic(currentName);` shows the optimistic value while the request runs, then reverts to `currentName` |
| `use` | Reads a promise (suspends until resolved) or Context in render; unlike hooks, can be called conditionally |
| `react-dom/static` | `prerender` and `prerenderToNodeStream`: wait for data to load before returning static HTML; no streaming of content as it loads |
| Server Components | All Server Components features from Canary are included; stable |
| Server Actions | Defined with the `"use server"` directive; Client Components call async functions executed on the server |

### Improvements

| Improvement | Summary |
| --- | --- |
| `ref` as a prop | Function components receive `ref` as a prop; `forwardRef` no longer needed (to be deprecated and removed in future versions). Refs passed to classes are not passed as props |
| Hydration error diffs | A single message with a diff of the mismatch instead of multiple errors |
| `<Context>` as a provider | Render `<Context value=...>` instead of `<Context.Provider>`; `<Context.Provider>` to be deprecated in future versions |
| Ref cleanup functions | `ref` callbacks may return a cleanup function; React skips the call with `null` on unmount when one is returned |
| `useDeferredValue` initial value | `useDeferredValue(deferredValue, '')` returns the initial value on first render, then schedules a re-render with the deferred value |
| Document metadata | `<title>`, `<link>`, `<meta>` rendered in components are hoisted to `<head>` |
| Stylesheets | `<link rel="stylesheet" precedence="default">` / `<style>`: React manages insertion order and waits for load; deduplicated |
| Async scripts | `<script async={true} src="...">` can be rendered anywhere and is deduplicated |
| Preloading APIs | `prefetchDNS`, `preconnect`, `preload`, `preinit` from `react-dom` |
| Third-party scripts and extensions | Unexpected tags in `<head>` and `<body>` are skipped during hydration; third-party stylesheets are left in place on full re-render |
| Error reporting | Single error logged with all info; new root options `onCaughtError`, `onUncaughtError` complementing `onRecoverableError` |
| Custom Elements | Full support, passes Custom Elements Everywhere. SSR: primitive props (`string`, `number`, `true`) render as attributes; `object`, `symbol`, `function`, `false` are omitted. Client: props matching a property on the instance are assigned as properties, otherwise attributes |

## Notes

- `use` does not support promises created in render: React warns "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
- There is no directive for Server Components; `"use server"` is for Server Actions only.
- While Server Components in React 19 are stable and will not break between minor versions, the underlying APIs used to implement a React Server Components bundler or framework do not follow semver and may break between minors in React 19.x. Bundlers and frameworks should pin a specific React version or use Canary.
- Libraries can target React 19 as a peer dependency with a `react-server` export condition.
- A metadata library may still be wanted for features such as route-based overriding of generic metadata.
- Server Components / Server Functions: this is the React-level behavior. For framework-specific handling see nextjs-app, tanstack-start and react-router.
- Form Actions (`<form action>`, `useActionState`, `useFormStatus`) are React DOM built-ins, distinct from react-hook-form's `useForm` and from the `<Form>` components of react-router and nextjs-app.

## Related

- [React 19 Upgrade Guide](./react-19-upgrade-guide.md)
- [React 19.2](./react-19-2.md)
- [React 19.3](./react-19-3.md)
- [useActionState](../hooks/useActionState.md)
- [useOptimistic](../hooks/useOptimistic.md)
- [use](../apis/use.md)
- [prerender](../dom-server/prerender.md)
