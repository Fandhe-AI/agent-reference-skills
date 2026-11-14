# useForm — trigger

Manually triggers form or input validation. Also useful for dependent validation (input validation depends on another input's value). Returns `Promise<boolean>`: `true` when the targeted field(s) pass validation, `false` otherwise.

## Signature / Usage

```tsx
import { useState } from "react"
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
  } = useForm<FormInputs>({
    defaultValues: { firstName: "", lastName: "" },
  })
  const [status, setStatus] = useState("")

  const check = async (names?: keyof FormInputs | (keyof FormInputs)[]) => {
    const isValid = await trigger(names, { shouldFocus: true })
    setStatus(isValid ? "All checked fields are valid" : "Fix the errors above")
  }

  return (
    <form>
      <input
        {...register("firstName", { required: "First name is required" })}
        placeholder="First name"
      />
      {errors.firstName && <p role="alert">{errors.firstName.message}</p>}

      <input
        {...register("lastName", { required: "Last name is required" })}
        placeholder="Last name"
      />
      {errors.lastName && <p role="alert">{errors.lastName.message}</p>}

      <button type="button" onClick={() => check("lastName")}>
        Trigger
      </button>
      <button type="button" onClick={() => check(["firstName", "lastName"])}>
        Trigger Multiple
      </button>
      <button type="button" onClick={() => check()}>
        Trigger All
      </button>
      <p>{status}</p>
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
- Source: https://react-hook-form.com/docs/useform/trigger (documentation master c0511c9, fetched 2026-11-14)

### Tips

- In a multi-step form, validate only the current step's fields before going to the next step:

  ```javascript
  const onNext = async () => {
    const isStepValid = await trigger(["firstName", "lastName"], {
      shouldFocus: true,
    })
    if (isStepValid) setStep((step) => step + 1)
  }
  ```

- For fields that depend on each other, such as `password` and `confirmPassword`, use the `deps` option of `register` (see [register](./useform-register.md)). You do not need to call `trigger` in an `onChange`.
- Use `trigger("name", { shouldTouch: true })` to show an error for a field that the user skipped, without changing its value.

### Troubleshooting

#### `if (!trigger("email"))` never runs

- Why: `trigger` returns a `Promise<boolean>`, not a boolean. A promise is always truthy, so `!trigger(...)` is always `false`.
- Fix: Await the result:

```javascript
const isValid = await trigger("email")
if (!isValid) return
```

#### `trigger` returns `true` for a field that should fail

- Why: `trigger` only validates fields that are registered. A field whose input is not rendered (for example, a step of a wizard that is not on screen) or a misspelled name has no rules to check, so it passes.
- Fix: Check that the field's input is rendered and the name matches its `register` call. To validate fields that are not on screen, use a `resolver` (see [useForm](./useform.md)), which checks all values against the schema.

### Changes since v7.90

From the v7.92.0 release notes:

- "Fix `trigger` losing nested field array root errors (#13975)"
- "Fix `trigger` not marking nested fields as touched when `shouldTouch` targets a parent (#13978)"

## Related

- [useForm — register](./useform-register.md)
- [useForm — setValue](./useform-setvalue.md)
