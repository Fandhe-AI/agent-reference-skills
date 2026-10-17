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

## Related

- [useForm — reset](./useform-reset.md)
- [useForm — resetDefaultValues](./useform-resetdefaultvalues.md)
