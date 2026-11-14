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

## Related

- [useForm — setValue](./useform-setvalue.md)
- [useForm — reset](./useform-reset.md)
