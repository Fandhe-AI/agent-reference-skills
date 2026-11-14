# useForm — setValues

Dynamically sets multiple field values at once (Since 7.74.0). Also accepts a callback that receives the current form values.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

const App = () => {
  const { register, setValues } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button
        type="button"
        onClick={() => setValues({ firstName: "Bill", lastName: "Luo" })}
      >
        setValues
      </button>
      <button
        type="button"
        onClick={() =>
          setValues(
            { firstName: "Bill", lastName: "Luo" },
            { shouldValidate: true, shouldDirty: true, shouldTouch: true }
          )
        }
      >
        setValues with validation
      </button>
      <button
        type="button"
        onClick={() => setValues((data) => ({ ...data, firstName: "test" }))}
      >
        setValues with callback
      </button>
    </form>
  )
}
```

## Options / Props

`setValues: UseFormSetValues`

| Name | Type | Description |
|------|------|-------------|
| `value` | `Partial<TFieldValues> \| (formValues: TFieldValues) => TFieldValues` | An object containing the field values to update, or a callback receiving the current form values and returning the next form values. Required. |
| `options.shouldValidate` | `boolean` | Whether to compute if the input is valid (subscribed to `errors`) and if the entire form is valid (subscribed to `isValid`). |
| `options.shouldDirty` | `boolean` | Whether to compute if the input is dirty against `defaultValues` (subscribed to `dirtyFields`) and the entire form (`isDirty`). |
| `options.shouldTouch` | `boolean` | Whether to set the updated inputs to be touched. |
| `options.delayError` | `boolean` | Since 7.82.0. Opt-in flag that delays display of the resulting validation error, using the delay (ms) configured via `useForm({ delayError })`. Only takes effect when `shouldValidate` is also `true`. |

## Notes

- With the callback form, the function receives a snapshot of the current form values and should return the next form values.
- This method does not reset the form. Use `reset` to reinitialize `defaultValues`.
- Unlike calling `setValue` multiple times in sequence, `setValues` batches all updates into a single re-render.
- Source: https://react-hook-form.com/docs/useform/setvalues (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Top-level keys are merged shallowly. `setValues({ address: { city: "Paris" } })` replaces the whole `address` object, so `address.street` is lost. To change one nested value, spread the current values in the callback form:

  ```javascript
  setValues((values) => ({
    ...values,
    address: { ...values.address, city: "Paris" },
  }))
  ```

- Use `setValues` to fill a form from a template or a previous entry, so the user can still see what changed. If the data should become the new defaults, use [reset](./useform-reset.md).

### Troubleshooting

#### A nested sibling value disappears after `setValues`

- Why: Top-level keys are merged shallowly. Updating `{ address: { city: "Paris" } }` replaces the complete `address` object rather than merging its nested properties.
- Fix: Use the callback form and preserve the nested values you are not changing:

```javascript
setValues((values) => ({
  ...values,
  address: { ...values.address, city: "Paris" },
}))
```

For one nested field, `setValue("address.city", "Paris")` ([setValue](./useform-setvalue.md)) is simpler.

#### Errors, touched fields, or dirty state do not change

- Why: `setValues` updates values, but validation and form-state updates are opt-in so a batch update does not do extra work by default.
- Fix: Pass the state updates you need:

```javascript
setValues(values, {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
})
```

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `useFieldArray` not updating rows when using `setValue` or `setValues` (#13842, #13939)"
- "Fix dirty state updates when `setValues` changes field arrays (#13870)"

From the v7.92.0 release notes:

- "Fix `setValues` not updating dirty state for unregistered fields (#13946)"
- "Fix `setValues` ignoring options when values remain unchanged (#13989)"

## Related

- [useForm — setValue](./useform-setvalue.md)
- [useForm — reset](./useform-reset.md)
