# useForm — resetField

Resets an individual field's state.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    resetField,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  })
  const handleClick = () => resetField("firstName")

  return (
    <form>
      <input {...register("firstName", { required: true })} />

      <p>{isDirty && "dirty"}</p>
      <p>{isValid && "valid"}</p>

      <button type="button" onClick={handleClick}>
        Reset
      </button>
    </form>
  )
}
```

With options:

```javascript
resetField("firstName", { keepError: true })
resetField("firstName", { keepTouched: true })
resetField("firstName", { keepDirty: true })
resetField("firstName", { defaultValue: "New" })
```

## Options / Props

`resetField: UseFormResetField`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Registered field name. |
| `options.keepError` | `boolean` | When `true`, field error is retained. |
| `options.keepDirty` | `boolean` | When `true`, `dirtyFields` is retained. |
| `options.keepTouched` | `boolean` | When `true`, `touchedFields` state is unchanged. |
| `options.defaultValue` | `unknown` | When not provided, the field reverts to its defaultValue. When provided, the field is updated with the supplied value and its `defaultValue` is updated to it. Only non-`undefined` values are supported. |

## Notes

- With default options, `isValid` is reevaluated unless `keepError: true` is passed, and `isDirty` is reevaluated unless `keepDirty: true` is passed.
- The name must match a registered field name: `resetField("test")` after `register("test")` works; `resetField("non-existent-name")` fails because the input is not found.
- Source: https://react-hook-form.com/docs/useform/resetfield (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Use `resetField` for a per-field "Undo" or "Cancel" button in an inline editor. Only that field's value and state change.
- After you save one field, call `resetField(name, { defaultValue: savedValue })`. The saved value becomes the new default, so the field is no longer dirty.
- To reset many fields at the same time, use [reset](./useform-reset.md) with the `keep*` options. One call is easier to follow than many `resetField` calls.

### Troubleshooting

#### `resetField` goes back to an empty value instead of the saved one

- Why: `resetField` restores the field's default value. If you loaded or saved the value with `setValue`, the default value never changed.
- Fix: Pass the saved value as the new default: `resetField("name", { defaultValue: savedValue })`. To load data for the whole form, use `values` (see [useForm](./useform.md)) or `reset(data)` ([reset](./useform-reset.md)).

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix dirty state tracking and `resetField()` with falsy values (#13868, #13900)"

## Related

- [useForm — reset](./useform-reset.md)
- [useForm — resetDefaultValues](./useform-resetdefaultvalues.md)
