# useForm — trigger

Manually triggers form or input validation. Also useful for dependent validation (input validation depends on another input's value). Returns `Promise<boolean>`: `true` when the targeted field(s) pass validation, `false` otherwise.

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

type FormInputs = {
  firstName: string
  lastName: string
}

export default function App() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>()

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button type="button" onClick={() => trigger("lastName")}>
        Trigger
      </button>
      <button type="button" onClick={() => trigger(["firstName", "lastName"])}>
        Trigger Multiple
      </button>
      <button type="button" onClick={() => trigger()}>
        Trigger All
      </button>
    </form>
  )
}
```

## Options / Props

`trigger: UseFormTrigger`

| Name | Type | Description | Example |
|------|------|-------------|---------|
| `name` | `undefined` | Triggers validation on all fields. | `trigger()` |
| `name` | `string` | Triggers validation on a specific field by name. | `trigger("yourDetails.firstName")` |
| `name` | `string[]` | Triggers validation on multiple fields by name. | `trigger(["yourDetails.lastName"])` |
| `shouldFocus` | `boolean` | Since 7.7.0. Focuses the input when an error is set. Only works when the input's reference is registered; does not work for custom register. | `trigger('name', { shouldFocus: true })` |
| `shouldTouch` | `boolean` | Since 7.87.0. Marks the targeted field(s) as touched, regardless of the validation result. | `trigger('name', { shouldTouch: true })` |

## Notes

- Render-optimization isolation only applies when targeting a single field by passing a `string` name. Passing an array of names, or calling `trigger()` with no arguments, re-renders the entire form state.

## Related

- [useForm — register](./useform-register.md)
- [useForm — setValue](./useform-setvalue.md)
