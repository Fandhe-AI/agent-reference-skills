---
source: https://react.dev/reference/react-dom/components/textarea
---

# `<textarea>`

The built-in browser `<textarea>` component lets you render a multiline text input.

## Signature / Usage

```js
<textarea name="postContent" />
```

Controlled text area:

```js
function NewPost() {
  const [postContent, setPostContent] = useState(''); // Declare a state variable...
  // ...
  return (
    <textarea
      value={postContent} // ...force the input's value to match the state variable...
      onChange={e => setPostContent(e.target.value)} // ... and update the state variable on any edits!
    />
  );
}
```

Initial value for an uncontrolled text area:

```js
<textarea
  name="postContent"
  defaultValue="I really enjoyed biking yesterday!"
  rows={4}
  cols={40}
/>
```

## Options / Props

`<textarea>` supports all [common element props](./common.md).

| Name | Type | Description |
| --- | --- | --- |
| value | string | Controls the text inside the text area. When you pass `value`, you must also pass an `onChange` handler. |
| defaultValue | string | Uncontrolled text areas: specifies the initial value. |
| autoComplete | `'on'` or `'off'` | Specifies the autocomplete behavior. |
| autoFocus | boolean | If `true`, React will focus the element on mount. |
| children | — | `<textarea>` does not accept children. To set the initial value, use `defaultValue`. |
| cols | number | Specifies the default width in average character widths. Defaults to `20`. |
| disabled | boolean | If `true`, the input will not be interactive and will appear dimmed. |
| form | string | Specifies the `id` of the `<form>` this input belongs to. If omitted, it's the closest parent form. |
| maxLength | number | Specifies the maximum length of text. |
| minLength | number | Specifies the minimum length of text. |
| name | string | Specifies the name for this input that's submitted with the form. |
| onChange | function | Required for controlled text areas. Fires immediately when the input's value is changed by the user (on every keystroke). Behaves like the browser `input` event. |
| onChangeCapture | function | A version of `onChange` that fires in the capture phase. |
| onInput | function | Fires immediately when the value is changed by the user. In React it is idiomatic to use `onChange` instead. |
| onInputCapture | function | A version of `onInput` that fires in the capture phase. |
| onInvalid | function | Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles. |
| onInvalidCapture | function | A version of `onInvalid` that fires in the capture phase. |
| onSelect | function | Fires after the selection inside the `<textarea>` changes. React extends it to also fire for empty selection and on edits. |
| onSelectCapture | function | A version of `onSelect` that fires in the capture phase. |
| placeholder | string | Displayed in a dimmed color when the text area value is empty. |
| readOnly | boolean | If `true`, the text area is not editable by the user. |
| required | boolean | If `true`, the value must be provided for the form to submit. |
| rows | number | Specifies the default height in average character heights. Defaults to `2`. |
| wrap | `'hard'`, `'soft'`, or `'off'` | Specifies how the text should be wrapped when submitting a form. |

## Notes

- Passing children like `<textarea>something</textarea>` is not allowed. Use `defaultValue` for initial content.
- If a text area receives a string `value` prop, it will be treated as controlled.
- A text area can't be both controlled and uncontrolled at the same time, and cannot switch between being controlled or uncontrolled over its lifetime.
- Every controlled text area needs an `onChange` event handler that synchronously updates its backing value.
- If you pass `value` without `onChange`, it will be impossible to type into the text area; React logs "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
- Caret jumps to the beginning on every keystroke: in a controlled text area you must update state to `e.target.value` synchronously during `onChange` (not to a transformed value and not asynchronously), and the text area must not be removed and re-added on each keystroke (e.g. a changing `key` or nested component definitions).
- Error "A component is changing an uncontrolled input to be controlled": a `value` must remain a string throughout its lifetime, never `null` or `undefined`; use `''` initially or `value={someValue ?? ''}`.
- Give a `name` to your `<textarea>`; it is used as a key in the form data.
- By default, any `<button>` inside a `<form>` will submit it. Use `<button type="button">` in custom Button components and `<button type="submit">` explicitly for submit buttons.

## Related

- [input](./input.md)
- [select](./select.md)
- [form](./form.md)
