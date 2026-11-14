# useForm — reset

Resets the entire form state, fields reference, and subscriptions. Optional arguments allow partial form state reset.

## Signature / Usage

```javascript
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit, reset } = useForm()
  const resetAsyncForm = useCallback(async () => {
    const response = await fetch("./api/formValues.json")
    const result = await response.json() // result: { firstName: 'test', lastName: 'test2' }
    reset(result) // asynchronously reset your form values
  }, [reset])

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  return (
    <form onSubmit={handleSubmit((data) => {})}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />

      <input
        type="button"
        onClick={() => {
          reset({ firstName: "bill" }, { keepErrors: true, keepDirty: true })
        }}
      />

      <button
        type="button"
        onClick={() => {
          reset((formValues) => ({ ...formValues, lastName: "test" }))
        }}
      >
        Reset partial
      </button>
    </form>
  )
}
```

Reset after successful submit (reset in `useEffect` as execution order matters):

```javascript
useEffect(() => {
  if (formState.isSubmitSuccessful) {
    reset({ something: "" })
  }
}, [formState.isSubmitSuccessful, reset])
```

## Options / Props

`reset: UseFormReset`

| Name | Type | Description |
|------|------|-------------|
| `values` | `object \| (values: Object) => Object` | Optional object to reset form values; provide the entire `defaultValues` when supplied. Since 7.36.0 also accepts a callback that receives the current form values and returns the next values. |
| `options.keepErrors` | `boolean` | All errors remain. Not guaranteed after further user actions. |
| `options.keepDirty` | `boolean` | `dirtyFields` remains, and `isDirty` temporarily remains until further user action. Does not reflect input values, only dirty fields state. |
| `options.keepDirtyValues` | `boolean` | Since 7.31.0. `dirtyFields` and `isDirty` remain, and only non-dirty fields are updated to the newly provided values. `dirtyFields` formState must be subscribed. |
| `options.keepValues` | `boolean` | Form input values are unchanged. |
| `options.keepDefaultValues` | `boolean` | Keep the same defaultValues initialised via `useForm`. `isDirty` and `dirtyFields` are recomputed by comparing new values against the original `defaultValues`. |
| `options.keepIsSubmitted` | `boolean` | `isSubmitted` state is unchanged. |
| `options.keepIsSubmitSuccessful` | `boolean` | Since 7.47.0. `isSubmitSuccessful` state is unchanged. |
| `options.keepTouched` | `boolean` | `isTouched` state is unchanged. |
| `options.keepIsValidating` | `boolean` | Since 7.51.0. `isValidating`/`validatingFields` state is unchanged rather than cleared. |
| `options.keepIsValid` | `boolean` | `isValid` temporarily persists until additional user actions. |
| `options.keepSubmitCount` | `boolean` | `submitCount` state is unchanged. |
| `options.keepFieldsRef` | `boolean` | Since 7.60.0. Preserve the internal field references (registered inputs); reset values without unmounting and remounting inputs. |

## Notes

- Adapted from the official example: `type="button"` added to the "Reset partial" button, since buttons inside a form default to `type="submit"`.
- Always provide `defaultValues` when resetting a form so all inputs, especially controlled components, are restored correctly.
- Calling `reset` with `values` updates the form's `defaultValues` unless `options.keepDefaultValues` is set. A later `reset()` or `reset({})` resets to the last `values` provided instead of the initial `defaultValues`.
- With `Controller`, pass values to `reset({ firstName: "bill", lastName: "luo" })`.
- With `useFieldArray`, call `reset({ names: [...] })` in `useEffect` to replace the array.
- Avoid calling `reset` inside `onSubmit`. `handleSubmit` updates `isSubmitted`, `isSubmitSuccessful` and `submitCount` after your handler finishes, so a `reset` there clears the values but not the submission state. Reset in a `useEffect` when `formState.isSubmitSuccessful` becomes `true` instead (the official "Submit with Reset" example).
- Source: https://react-hook-form.com/docs/useform/reset (documentation master c0511c9, fetched 2026-11-14)

### Tips

- For a "Discard changes" button, call `reset()` with no arguments. The form goes back to the last default values.
- After a successful save, call `reset(savedData)` so the saved data becomes the new baseline and `isDirty` goes back to `false`. If you only want to move the dirty baseline and keep errors, touched fields, and submission state, use [resetDefaultValues](./useform-resetdefaultvalues.md).
- When the server sends fresh data while the user is editing, use `reset(newData, { keepDirtyValues: true })`. Fields the user changed keep their values, and the other fields are updated.
- To load data once from an API, use `useForm({ values })` instead of `reset` in a `useEffect`. See `values` in [useForm](./useform.md).

### Troubleshooting

#### `reset()` clears the form instead of going back to the loaded data

- Why: `reset()` with no arguments goes back to the default values. If you loaded the data with `setValue`, the default values never changed, so the form is reset to the original empty values.
- Fix: Load the data with `reset(data)` or `values` (see [useForm](./useform.md)). The loaded data then becomes the default values, and a later `reset()` returns to it.

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix stale asynchronous validation results after `reset()` and `unregister()` (#13908, #13912, #13934)"
- "Fix `isValid` not updating correctly after `reset()` and subsequent changes (#13847, #13930)"
- "Fix `useFieldArray` losing validation rules after `reset()` (#13940)"

From the v7.92.0 release notes:

- "Fix `reset` not updating `isValid` after cancelling pending validation (#13994)"
- "Fix repeated `reset()` calls and error focusing with `keepFieldsRef` and memoized inputs (#14023)"
- "Fix `handleSubmit` incorrectly updating form state after `reset()` during asynchronous callbacks (#13991)"

## Related

- [useForm — resetField](./useform-resetfield.md)
- [useForm — resetDefaultValues](./useform-resetdefaultvalues.md)
- [useForm — setFocus](./useform-setfocus.md)
