---
source: https://react.dev/reference/react-dom/components/input
---

# `<input>`

The built-in browser `<input>` component lets you render different kinds of form inputs.

## Signature / Usage

```js
<input name="myInput" />
```

Controlled input:

```js
function Form() {
  const [firstName, setFirstName] = useState(''); // Declare a state variable...
  // ...
  return (
    <input
      value={firstName} // ...force the input's value to match the state variable...
      onChange={e => setFirstName(e.target.value)} // ... and update the state variable on any edits!
    />
  );
}
```

Reading values when submitting a form (uncontrolled inputs):

```js
function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  // You can pass formData as a fetch body directly:
  fetch('/some-api', { method: form.method, body: formData });

  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson);
}
```

## Options / Props

`<input>` supports all [common element props](./common.md).

Controlled inputs (pass one of these; you must also pass `onChange`):

| Name | Type | Description |
| --- | --- | --- |
| checked | boolean | For a checkbox input or a radio button, controls whether it is selected. |
| value | string | For a text input, controls its text. (For a radio button, specifies its form data.) |

Uncontrolled inputs only:

| Name | Type | Description |
| --- | --- | --- |
| defaultChecked | boolean | Specifies the initial value for `type="checkbox"` and `type="radio"` inputs. |
| defaultValue | string | Specifies the initial value for a text input. |

Both controlled and uncontrolled:

| Name | Type | Description |
| --- | --- | --- |
| accept | string | Specifies which filetypes are accepted by a `type="file"` input. |
| alt | string | Specifies the alternative image text for a `type="image"` input. |
| capture | string | Specifies the media (microphone, video, or camera) captured by a `type="file"` input. |
| autoComplete | string | Specifies one of the possible autocomplete behaviors. |
| autoFocus | boolean | If `true`, React will focus the element on mount. |
| dirname | string | Specifies the form field name for the element's directionality. |
| disabled | boolean | If `true`, the input will not be interactive and will appear dimmed. |
| children | — | `<input>` does not accept children. |
| form | string | Specifies the `id` of the `<form>` this input belongs to. If omitted, it's the closest parent form. |
| formAction | string or function | Overrides the parent `<form action>` for `type="submit"` and `type="image"`. When a URL is passed, the form behaves like a standard HTML form. When a function is passed, the function handles the form submission. |
| formEnctype | string | Overrides the parent `<form enctype>` for `type="submit"` and `type="image"`. |
| formMethod | string | Overrides the parent `<form method>` for `type="submit"` and `type="image"`. |
| formNoValidate | boolean | Overrides the parent `<form noValidate>` for `type="submit"` and `type="image"`. |
| formTarget | string | Overrides the parent `<form target>` for `type="submit"` and `type="image"`. |
| height | string | Specifies the image height for `type="image"`. |
| list | string | Specifies the `id` of the `<datalist>` with the autocomplete options. |
| max | number or string | Specifies the maximum value of numerical and datetime inputs. |
| maxLength | number | Specifies the maximum length of text and other inputs. |
| min | number or string | Specifies the minimum value of numerical and datetime inputs. |
| minLength | number | Specifies the minimum length of text and other inputs. |
| multiple | boolean | Specifies whether multiple values are allowed for `type="file"` and `type="email"`. |
| name | string | Specifies the name for this input that's submitted with the form. |
| onChange | function | Required for controlled inputs. Fires immediately when the input's value is changed by the user (on every keystroke). Behaves like the browser `input` event. |
| onChangeCapture | function | A version of `onChange` that fires in the capture phase. |
| onInput | function | Fires immediately when the value is changed by the user. In React it is idiomatic to use `onChange` instead. |
| onInputCapture | function | A version of `onInput` that fires in the capture phase. |
| onInvalid | function | Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles. |
| onInvalidCapture | function | A version of `onInvalid` that fires in the capture phase. |
| onSelect | function | Fires after the selection inside the `<input>` changes. React extends it to also fire for empty selection and on edits. |
| onSelectCapture | function | A version of `onSelect` that fires in the capture phase. |
| pattern | string | Specifies the pattern that the `value` must match. |
| placeholder | string | Displayed in a dimmed color when the input value is empty. |
| readOnly | boolean | If `true`, the input is not editable by the user. |
| required | boolean | If `true`, the value must be provided for the form to submit. |
| size | number | Similar to setting width, but the unit depends on the control. |
| src | string | Specifies the image source for a `type="image"` input. |
| step | number or `'any'` | A positive number or the `'any'` string. Specifies the distance between valid values. |
| type | string | One of the input types. |
| width | string | Specifies the image width for a `type="image"` input. |

## Notes

- Type column corrected: the source docs say 'A string' for formNoValidate / 'A number' for max/min, but these are boolean HTML attributes and max/min also accept date/time strings (matches @types/react).
- Checkboxes need `checked` (or `defaultChecked`), not `value` (or `defaultValue`). Read `e.target.checked` rather than `e.target.value` for checkboxes.
- If a text input receives a string `value` prop, it will be treated as controlled. If a checkbox or a radio button receives a boolean `checked` prop, it will be treated as controlled.
- An input can't be both controlled and uncontrolled at the same time, and cannot switch between being controlled or uncontrolled over its lifetime.
- Every controlled input needs an `onChange` event handler that synchronously updates its backing value.
- The `value` you pass to controlled components should not be `undefined` or `null`. Initialize state to an empty string (`''`) if the initial value should be empty.
- If you pass `value` without `onChange`, it will be impossible to type into the input; React logs "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`." (same for `checked` / `defaultChecked`).
- Caret jumps to the beginning on every keystroke: update state to `e.target.value` (or `e.target.checked`) synchronously during `onChange`, and ensure the input is not removed and re-added on each keystroke (e.g. a changing `key` or nested component function definitions).
- Error "A component is changing an uncontrolled input to be controlled": `value` must remain a string throughout its lifetime; use `''` initially or `value={someValue ?? ''}`. For checkboxes `checked` must always be a boolean.
- Give a `name` to every `<input>`; it is used as a key in the form data.
- By default, a `<button>` inside a `<form>` without a `type` attribute will submit it. Use `<button type="button">` in custom Button components and `<button type="submit">` explicitly for submit buttons.
- To associate a label, nest `<input>` in a `<label>`, or pass the same ID to `<input id>` and `<label htmlFor>` (generate IDs with `useId`).
- If re-rendering on every keystroke is slow, move the input state into its own component; if re-rendering cannot be avoided, `useDeferredValue` keeps the controlled input responsive.

## Related

- [form](./form.md)
- [select](./select.md)
- [textarea](./textarea.md)
- [Common components](./common.md)
