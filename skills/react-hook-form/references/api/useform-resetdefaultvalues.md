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
- Do not call `resetDefaultValues` inside a `subscribe` callback; it updates subscribed state and can re-trigger the callback in an infinite loop (carried over from the previous version of this page; not stated in the official docs).
- Source: https://react-hook-form.com/docs/useform/resetdefaultvalues (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Use `resetDefaultValues` for an autosave form. After each save, move the baseline to the saved values, so `isDirty` shows only the changes that have not been saved yet. The user can keep typing, and the inputs are not touched.
- Pass the values that were actually saved, for example the server response, and not the current form values. If the user typed while the request was in flight, those changes then stay dirty.
- To also clear errors, touched fields, and submission state, use [reset](./useform-reset.md) instead.

### Troubleshooting

#### The inputs do not change after `resetDefaultValues`

- Why: This method changes only the baseline used for dirty comparison. It deliberately preserves the current values so edits made while a save request is in flight are not lost.
- Fix: Use `reset(values)` ([reset](./useform-reset.md)) when you want to replace both the current values and the default values. Use `resetDefaultValues(values)` only when the inputs should stay untouched.

#### `isDirty` is still `true` after a successful save

- Why: The current values differ from the new baseline. This commonly happens when the user types while the request is in flight, or when only part of the saved object is passed to `resetDefaultValues`.
- Fix: Pass the complete values that the server actually saved. If the user made newer edits during the request, leave `isDirty` as `true`, because those edits have not been saved yet.

## Related

- [useForm — reset](./useform-reset.md)
- [useForm — resetField](./useform-resetfield.md)
