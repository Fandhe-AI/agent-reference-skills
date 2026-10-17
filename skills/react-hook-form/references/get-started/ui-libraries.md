# Integrating with UI libraries

React Hook Form integrates easily with external UI component libraries. If the component doesn't expose the input's `ref`, use the `Controller` component, which takes care of the registration process.

## Signature / Usage

```tsx
import Select from "react-select"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@mui/material"

interface IFormInput {
  firstName: string
  lastName: string
  iceCreamType: { label: string; value: string }
}

const App = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      iceCreamType: { label: "", value: "" },
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
      />
      <input type="submit" />
    </form>
  )
}
```

## Notes

- Source: https://react-hook-form.com/get-started#IntegratingwithUIlibraries
- MUI `Input` / `Select` forward `ref` to the root element. `register`'s ref callback falls back to the first nested `input` / `select` / `textarea`, so `{...register(...)}` still works. `Controller`'s `field.ref` is only used for focus, so pass it via `inputRef={field.ref}` (as in the official MUI `TextField` example) to keep focus-on-error working.

## Related

- [Integrating Controlled Inputs](./controlled-inputs.md)
- [Controller](../api/controller.md)
