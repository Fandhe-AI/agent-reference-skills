---
source: https://react.dev/reference/react/act
---

# act

`act` is a test helper to apply pending React updates before making assertions.

## Signature / Usage

```js
await act(async actFn)
```

```js
it ('renders with button disabled', async () => {
  await act(async () => {
    root.render(<TestComponent />)
  });
  expect(container.querySelector('button')).toBeDisabled();
});
```

Returns: `act` does not return anything.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `actFn` | async function | An async function wrapping renders or interactions for components being tested. Any updates triggered within the `actFn` are added to an internal act queue, which are then flushed together to process and apply any changes to the DOM. Since it is async, React will also run any code that crosses an async boundary, and flush any updates scheduled. |

## Notes

- Import from `react`: `import {act} from 'react';`. The name `act` comes from the Arrange-Act-Assert pattern.
- We recommend using `act` with `await` and an `async` function. Although the sync version works in many cases, it doesn't work in all cases and due to the way React schedules updates internally, it's difficult to predict when you can use the sync version. We will deprecate and remove the sync version in the future.
- Dispatching DOM events only works when the DOM container is added to the document.
- Using `act` requires setting `global.IS_REACT_ACT_ENVIRONMENT=true` in your test environment; otherwise you will see "Warning: The current testing environment is not configured to support act(...)". In testing frameworks like React Testing Library, `IS_REACT_ACT_ENVIRONMENT` is already set for you.
- Migration (18 → 19): `act` moved from `react-dom/test-utils` to the `react` package. Replace `import {act} from 'react-dom/test-utils'` with `import {act} from 'react';`. All other `test-utils` functions have been removed.

```js
global.IS_REACT_ACT_ENVIRONMENT=true
```

## Related

- [createRoot](../dom-apis/createRoot.md)
- React 19 Upgrade Guide
