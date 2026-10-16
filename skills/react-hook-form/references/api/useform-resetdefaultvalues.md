# useForm — resetDefaultValues

Updates `defaultValues` and recomputes `dirtyFields`/`isDirty` against the new baseline without modifying the current form values (Since 7.77.0).

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

interface FormValues {
  firstName: string
  lastName: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    resetDefaultValues,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "" },
  })

  const onSubmit = async (data: FormValues) => {
    await saveToServer(data)
    // Advance the baseline to the submitted values.
    // isDirty will now only be true if the user edits after this point.
    resetDefaultValues(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="submit" disabled={!isDirty}>
        Save
      </button>
    </form>
  )
}
```

With options:

```javascript
resetDefaultValues(serverValues, {
  keepDirty: true, // preserve existing dirty tracking
  keepIsValid: true, // skip re-validation
})
```

## Options / Props

`resetDefaultValues: UseFormResetDefaultValues`

| Name | Type | Description |
|------|------|-------------|
| `values` | `object` | The new default values to establish as the baseline. Recommended to provide the full object. |
| `options.keepDirty` | `boolean` | When `true`, existing `dirtyFields` state is preserved as-is rather than recomputed against the new baseline. |
| `options.keepIsValid` | `boolean` | When `true`, validation is not re-run after the baseline update and `isValid` remains unchanged. |

## Notes

- Useful when a form disables submission while `!isDirty`: after a successful async submission, advance the baseline so only post-submit edits are dirty.
- Current form values (what the user typed) are never modified by this method; only the internal baseline used to compute dirty state changes.
- `dirtyFields` and `isDirty` are recomputed against the new baseline unless `keepDirty` is set.

## Related

- [useForm — reset](./useform-reset.md)
- [useForm — resetField](./useform-resetfield.md)
