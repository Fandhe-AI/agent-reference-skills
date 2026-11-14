# useForm — setValue

Dynamically sets the value of a registered field and provides options to validate and update the form state, while attempting to avoid unnecessary re-renders.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

const App = () => {
  const { register, setValue } = useForm({
    defaultValues: { firstName: "" },
  })

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <button type="button" onClick={() => setValue("firstName", "Bill")}>setValue</button>
      <button
        type="button"
        onClick={() =>
          setValue("firstName", "Luo", {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      >
        setValue options
      </button>
    </form>
  )
}
```

Delay error:

```javascript
const { setValue } = useForm({ delayError: 500 })

setValue("firstName", "Bill", {
  delayError: true, // opt in to the 500ms delay configured above
  shouldValidate: true,
})
```

## Options / Props

`setValue: UseFormSetValue`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Target a single field or field array by name. |
| `value` | `unknown` | The value for the field. Required and cannot be `undefined`. |
| `options.shouldValidate` | `boolean` | Whether to compute if the input is valid (subscribed to `errors`) and if the entire form is valid (subscribed to `isValid`). Only recomputes validity for the specified field, not the entire form's `errors`. |
| `options.shouldDirty` | `boolean` | Whether to compute if the input is dirty against `defaultValues` (subscribed to `dirtyFields`) and the entire form (`isDirty`). Updates `dirtyFields` at the specified field level. |
| `options.shouldTouch` | `boolean` | Since 7.8.0. Whether to set the input itself to be touched. |
| `options.delayError` | `boolean` | Since 7.82.0. Opt-in flag that delays display of the resulting validation error, using the delay (ms) configured via `useForm({ delayError })`. Only takes effect when `shouldValidate` is also `true`. |

## Notes

- Adapted from the official example: initial value moved into `defaultValues` (the official example passes `firstName` directly to `useForm`, which is not a `useForm` option).
- Adapted from the official example: `type="button"` added to the buttons, since buttons inside a form default to `type="submit"`.
- `shouldDirty` only guarantees that the target field is marked in `dirtyFields` immediately. Because `isDirty` compares current values against `defaultValues`, a later update to any field can trigger a `dirtyFields` recompute that also surfaces other fields whose value already differs from their default, including ones last written with `shouldDirty: false`.
- `replace` / `update` from `useFieldArray` unmount and remount the targeted field array; `setValue("array.0.test1", "1")` directly updates the input value.
- Target the field's name rather than a nested object as the second argument:

  ```javascript
  setValue("yourDetails.firstName", "value") // performant
  setValue("yourDetails", { firstName: "value" }) // less performant

  register("nestedValue", { value: { test: "data" } }) // register a nested value input
  setValue("nestedValue.test", "updatedData") // failed to find the relevant field
  setValue("nestedValue", { test: "updatedData" }) // setValue finds the input and updates it
  ```

- Register the input's name before invoking `setValue`. To update an entire `FieldArray`, make sure the `useFieldArray` hook executes first. Prefer `replace` from `useFieldArray` for updating an entire field array; this `setValue` usage may become discouraged in a future version.

  ```javascript
  setValue("fieldArray", [{ test: "1" }, { test: "2" }]) // works, but prefer replace()
  setValue("notRegisteredInput", "value") // works on unregistered input; prefer registering
  // implicitly registers a single input (without register being invoked)
  setValue("resultSingleNestedField", { test: "1", test2: "2" })

  register("notRegisteredInput.test")
  register("notRegisteredInput.test2")
  setValue("notRegisteredInput", { test: "1", test2: "2" }) // sugar syntax to setValue twice
  ```
- By default, `setValue` only updates the value and notifies [watch](./useform-watch.md), [useWatch](./usewatch.md) and [subscribe](./useform-subscribe.md). It does **not** validate the field (even after the form has been submitted) or mark it as dirty or touched. Pass the options you need:

  ```javascript
  setValue("firstName", "Bill", {
    shouldValidate: true, // update errors and isValid
    shouldDirty: true, // update dirtyFields and isDirty
    shouldTouch: true, // update touchedFields
  })
  ```

- Source: https://react-hook-form.com/docs/useform/setvalue (documentation master c0511c9, fetched 2026-11-14)

### Tips

- When a value comes from the user through a custom widget, such as a map picker or a rich-text editor, pass `{ shouldDirty: true, shouldTouch: true, shouldValidate: true }`. The field then behaves the same as a native input that the user typed in.
- To update several fields at once, use [setValues](./useform-setvalues.md). It updates them with a single re-render, while calling `setValue` many times can cause more renders.
- Do not call `setValue` during render. Call it in an event handler or an effect.

### Troubleshooting

#### `isDirty` and errors don't change after `setValue`

- Why: By default, `setValue` only updates the value. It does not validate the field or mark it as dirty or touched.
- Fix: Pass the options you need:

```javascript
setValue("email", value, {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
})
```

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `useFieldArray` not updating rows when using `setValue` or `setValues` (#13842, #13939)"
- "Fix `setValue` handling null-prototype objects (#13916)"

From the v7.92.0 release notes:

- "Fix `setValue` not selecting checkbox options with empty string values (#13950)"

## Related

- [useForm — setValues](./useform-setvalues.md)
- [useForm — register](./useform-register.md)
- [useFieldArray](./usefieldarray.md)
