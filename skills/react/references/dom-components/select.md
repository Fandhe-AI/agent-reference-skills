---
source: https://react.dev/reference/react-dom/components/select
---

# `<select>`

The built-in browser `<select>` component lets you render a select box with options.

## Signature / Usage

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

Controlled select box:

```js
function FruitPicker() {
  const [selectedFruit, setSelectedFruit] = useState('orange'); // Declare a state variable...
  // ...
  return (
    <select
      value={selectedFruit} // ...force the select's value to match the state variable...
      onChange={e => setSelectedFruit(e.target.value)} // ... and update the state variable on any change!
    >
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
  );
}
```

Multiple selection with initial values (`defaultValue` must be an array):

```js
<select name="selectedFruit" defaultValue={['orange', 'banana']} multiple={true}>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
</select>
```

## Options / Props

`<select>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| value | string or string[] | Controls which option is selected (array for `multiple={true}`). Every value string must match the `value` of some nested `<option>`. When you pass `value`, you must also pass an `onChange` handler. |
| defaultValue | string or string[] | Uncontrolled select boxes: specifies the initially selected option (array for `multiple={true}`). |
| autoComplete | string | Specifies one of the possible autocomplete behaviors. |
| autoFocus | boolean | If `true`, React will focus the element on mount. |
| children | node | `<select>` accepts `<option>`, `<optgroup>`, and `<datalist>` components as children. Your own components are allowed as long as they eventually render one of these; each rendered `<option>` must have a `value`. |
| disabled | boolean | If `true`, the select box will not be interactive and will appear dimmed. |
| form | string | Specifies the `id` of the `<form>` this select box belongs to. If omitted, it's the closest parent form. |
| multiple | boolean | If `true`, the browser allows multiple selection. |
| name | string | Specifies the name for this select box that's submitted with the form. |
| onChange | function | Required for controlled select boxes. Fires immediately when the user picks a different option. Behaves like the browser `input` event. |
| onChangeCapture | function | A version of `onChange` that fires in the capture phase. |
| onInput | function | Fires immediately when the value is changed by the user. In React it is idiomatic to use `onChange` instead. |
| onInputCapture | function | A version of `onInput` that fires in the capture phase. |
| onInvalid | function | Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles. |
| onInvalidCapture | function | A version of `onInvalid` that fires in the capture phase. |
| required | boolean | If `true`, the value must be provided for the form to submit. |
| size | number | For `multiple={true}` selects, specifies the preferred number of initially visible items. |

## Notes

- Unlike in HTML, passing a `selected` attribute to `<option>` is not supported. Instead, use `<select defaultValue>` for uncontrolled select boxes and `<select value>` for controlled select boxes.
- If a select box receives a `value` prop, it will be treated as controlled.
- A select box can't be both controlled and uncontrolled at the same time, and cannot switch between being controlled or uncontrolled over its lifetime.
- Every controlled select box needs an `onChange` event handler that synchronously updates its backing value.
- If you pass `value` without `onChange`, it will be impossible to select an option: React reverts the select box to the `value` you specified.
- Give a `name` to your `<select>`; it is used as a key in the form data. With `<select multiple={true}>`, the `FormData` includes each selected value as a separate name-value pair (`Object.fromEntries(formData.entries())` does not include multiple select values).
- By default, any `<button>` inside a `<form>` will submit it. Use `<button type="button">` in custom Button components and `<button type="submit">` explicitly for submit buttons.
- To associate a label, nest `<select>` in a `<label>`, or pass the same ID to `<select id>` and `<label htmlFor>` (generate IDs with `useId`).

## Related

- [option](./option.md)
- [input](./input.md)
- [textarea](./textarea.md)
- [form](./form.md)
