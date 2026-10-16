# useForm — register

Registers an input or select element and applies validation rules. Validation rules are based on the HTML standard and also allow custom validation methods.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        {...register("firstName", { required: true })}
        placeholder="First name"
      />

      <input
        {...register("lastName", { minLength: 2 })}
        placeholder="Last name"
      />

      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input {...register("checkbox")} type="checkbox" value="A" />
      <input {...register("checkbox")} type="checkbox" value="B" />

      <input {...register("radio")} type="radio" value="A" />
      <input {...register("radio")} type="radio" value="B" />

      <input type="submit" />
    </form>
  )
}
```

Destructuring assignment (equivalent to `<input {...register('firstName')} />`):

```javascript
const { onChange, onBlur, name, ref } = register("firstName")

<input onChange={onChange} onBlur={onBlur} name={name} ref={ref} />
```

## Options / Props

`register: UseFormRegister` — arguments:

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Input's name. |
| `options` | `RegisterOptions` | Input's behavior. |

Return:

| Name | Type | Description |
|------|------|-------------|
| `ref` | `React.Ref` | React element ref used to connect hook form to the input. |
| `name` | `string` | Input's name being registered. |
| `onChange` | `ChangeHandler` | `onChange` prop to subscribe to the input change event. |
| `onBlur` | `ChangeHandler` | `onBlur` prop to subscribe to the input blur event. |
| `min` | `string \| number` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `min` rule if set (otherwise `undefined`). |
| `max` | `string \| number` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `max` rule if set. |
| `maxLength` | `number` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `maxLength` rule if set. |
| `minLength` | `number` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `minLength` rule if set. |
| `pattern` | `string` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `pattern` rule if set. |
| `required` | `boolean` | Since 7.21.0. Present only when `progressive` is `true`; reflects the `required` rule if set (otherwise `false`). |
| `disabled` | `boolean` | Since 7.21.0. Optional. Present when the `disabled` option is set. |

Options (`RegisterOptions`). Rules `required`, `maxLength`, `minLength`, `max`, `min`, `pattern` also accept `{ value, message }` (or a `string` message for `required`) for a custom error message:

| Name | Type | Description |
|------|------|-------------|
| `required` | `boolean` | The input must have a value before the form can be submitted. Aligns with the web constraint API; for object or array input types, use `validate` instead. |
| `maxLength` | `number` | The maximum length of the value to accept. |
| `minLength` | `number` | The minimum length of the value to accept. |
| `max` | `number` | The maximum value to accept. |
| `min` | `number` | The minimum value to accept. |
| `pattern` | `RegExp` | The regex pattern for the input. A `RegExp` with the `/g` flag keeps track of the last index where a match occurred. |
| `validate` | `Function \| Record<string, Function>` | Executed on its own without depending on other rules. Receives the field value (and, since 7.42.0, optionally the full form values as a second argument). Return `true` or `undefined` for valid; a `string` for invalid (used as the error message); `false` for invalid with a generic error. Pass an object of named functions to run multiple independent validations. |
| `valueAsNumber` | `boolean` | Returns `Number`; `NaN` if something goes wrong. Runs before validation. Only applies to number input. Does not transform `defaultValue` or `defaultValues`. |
| `valueAsDate` | `boolean` | Returns `Date`; `Invalid Date` if something goes wrong. Runs before validation. Does not transform `defaultValue` or `defaultValues`. |
| `setValueAs` | `<T>(value: any) => T` | Return input value by running through the function. Runs before validation; ignored if `valueAsNumber` or `valueAsDate` is true. Only applies to text input. Does not transform `defaultValue` or `defaultValues`. |
| `disabled` | `boolean = false` | Since 7.13.0. `true` makes the input value `undefined` and the control disabled; also omits built-in validation rules. |
| `onChange` | `(e: SyntheticEvent) => void` | Since 7.16.0. Invoked in the change event. |
| `onBlur` | `(e: SyntheticEvent) => void` | Since 7.16.0. Invoked in the blur event. |
| `value` | `unknown` | Since 7.8.0. Sets the value for the registered input. Use inside `useEffect` or invoke once; each re-run overwrites the input value. |
| `shouldUnregister` | `boolean` | Input is unregistered after unmount and `defaultValues` are removed as well. Avoid with `useFieldArray`. |
| `deps` | `string \| string[]` | Since 7.14.0. When this field's own validation runs (via its registered `onChange`/`onBlur`), the listed fields are also re-validated. Calling `trigger()` manually does not honor `deps`. |

## Notes

- Submitted values: `register("firstName")` gives `{ firstName: value }`; `register("name.firstName")` gives `{ name: { firstName: value } }`; `register("name.firstName.0")` gives `{ name: { firstName: [ value ] } }`.
- These are validation rules, not native HTML attributes. They run based on the form's `mode` and don't block typing. To forward `required`, `min`, `max`, `minLength`, `maxLength`, `pattern` as native attributes, set `progressive` to `true` on `useForm`.
- Name is required and must be unique (except for native radio and checkbox inputs).
- Names must not start with a number or use numbers as standalone keys, and should avoid special characters. Only dot syntax is supported: `register("test.0.firstName")` works, `register("test[0].firstName")` does not.
- Disabled inputs return `undefined` as their form value. To prevent edits while preserving the value, use `readOnly` or disable the entire `fieldset`.
- Changing an input's `name` on each render re-registers it as a new field; keep names stable.
- Input values and references are not automatically removed on unmount. Use `unregister` to remove them explicitly.
- Calling `register` again on the same name merges the new options into the existing ones; options cannot be removed with `undefined` or `{}`. Use e.g. `register('test', { required: false })`.
- Avoid the keywords `ref` and `_f` as names (conflict with type checks).
- Custom Register: register inputs with `useEffect` as virtual inputs, then update the value with `setValue`:

  ```javascript
  register("firstName", { required: true, minLength: 8 })
  <TextInput onTextChange={(value) => setValue("firstName", value)} />
  ```

- For custom components that do not expose `ref` correctly (`innerRef`, `inputRef`):

  ```javascript
  const firstName = register("firstName", { required: true })
  <TextInput
    name={firstName.name}
    onChange={firstName.onChange}
    onBlur={firstName.onBlur}
    inputRef={firstName.ref}
  />
  ```

- For controlled components, use `useController` / `Controller`.

## Related

- [useForm — unregister](./useform-unregister.md)
- [useForm — setValue](./useform-setvalue.md)
- [useController](./usecontroller.md)
- [useForm](./useform.md)
