---
source: https://react.dev/reference/react/lazy
---

# lazy

`lazy` lets you defer loading component's code until it is rendered for the first time.

## Signature / Usage

```js
const SomeComponent = lazy(load)
```

```js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

Wrap the lazy component or any of its parents into a `<Suspense>` boundary to display a loading indicator while it's loading:

```js
<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```

Returns: a React component you can render in your tree. While the code for the lazy component is still loading, attempting to render it will suspend.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `load` | function | Receives no parameters. Returns a Promise or another thenable (a Promise-like object with a `then` method). React will not call `load` until the first time you attempt to render the returned component. It needs to eventually resolve to an object whose `.default` property is a valid React component type, such as a function, `memo`, or a `forwardRef` component. |

## Notes

- After React first calls `load`, it waits for it to resolve, then renders the resolved value's `.default` as a React component. Both the returned Promise and the resolved value are cached, so React will not call `load` more than once.
- If the Promise rejects, React will `throw` the rejection reason for the nearest Error Boundary to handle.
- Dynamic `import()` might require support from your bundler or framework. The imported component must be exported as the `default` export.
- Do not declare `lazy` components inside other components (this causes all state to be reset on re-renders). Declare them at the top level of your module.
- Data-loading Suspense patterns in frameworks and routers (loaders, `useSuspenseQuery`) belong to react-router / tanstack-router / tanstack-query skills.

## Related

- [Suspense](../components/Suspense.md)
- [memo](./memo.md)
- [forwardRef](../legacy/forwardRef.md)
