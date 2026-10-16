---
source: https://react.dev/reference/react-dom/components/progress
---

# `<progress>`

The built-in browser `<progress>` component lets you render a progress indicator.

## Signature / Usage

```js
<progress value={0.5} />
```

Controlling a progress indicator:

```js
export default function App() {
  return (
    <>
      <progress value={0} />
      <progress value={0.5} />
      <progress value={0.7} />
      <progress value={75} max={100} />
      <progress value={1} />
      <progress value={null} />
    </>
  );
}
```

## Options / Props

`<progress>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| max | number | Specifies the maximum `value`. Defaults to `1`. |
| value | number or null | A number between `0` and `max`, or `null` for indeterminate progress. Specifies how much was done. |

## Notes

- If you don't pass a `max` value, it is assumed to be `1` by default.
- If the operation is not ongoing, pass `value={null}` to put the progress indicator into an indeterminate state.

## Related

- [Common components](./common.md)
