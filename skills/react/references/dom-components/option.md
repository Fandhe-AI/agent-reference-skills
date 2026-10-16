---
source: https://react.dev/reference/react-dom/components/option
---

# `<option>`

The built-in browser `<option>` component lets you render an option inside a `<select>` box.

## Signature / Usage

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

## Options / Props

`<option>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| disabled | boolean | If `true`, the option will not be selectable and will appear dimmed. |
| label | string | Specifies the meaning of the option. If not specified, the text inside the option is used. |
| value | any | The value to be used when submitting the parent `<select>` in a form if this option is selected. |

## Notes

- React does not support the `selected` attribute on `<option>`. Instead, pass this option's `value` to the parent `<select defaultValue>` for an uncontrolled select box, or `<select value>` for a controlled select.

## Related

- [select](./select.md)
- [Common components](./common.md)
