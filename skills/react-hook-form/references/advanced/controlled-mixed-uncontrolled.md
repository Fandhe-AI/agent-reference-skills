# Controlled mixed with Uncontrolled Components

Advanced Usage: https://react-hook-form.com/advanced-usage#ControlledmixedwithUncontrolledComponents

React Hook Form embraces uncontrolled components but is also compatible with controlled components. Some components in UI libraries like [MUI](https://github.com/mui/material-ui) and [Antd](https://github.com/ant-design/ant-design) (e.g. `Select`, `Checkbox`) do not expose a native input ref and must be wrapped with `Controller`. Simpler components like `Input` forward the ref and can be used directly with `{...register}`. React Hook Form also optimizes re-rendering for controlled components. Here is an example that combines both patterns with validation.

## Signature / Usage

Controller:

```javascript
import { Input, Select, MenuItem } from "@mui/material"
import { useForm, Controller } from "react-hook-form"

const defaultValues = {
  select: 10,
  input: "",
}

function App() {
  const { handleSubmit, reset, control, register } = useForm({
    defaultValues,
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Controller's own defaultValue is ignored here — useForm's defaultValues takes precedence for the same field */}
      <Controller
        render={({ field }) => (
          <Select {...field}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
          </Select>
        )}
        control={control}
        name="select"
      />

      <Input {...register("input")} />

      <button type="button" onClick={() => reset({ ...defaultValues })}>
        Reset
      </button>
      <input type="submit" />
    </form>
  )
}
```

Custom Register:

```javascript
import { useEffect } from "react"
import { Input, Select, MenuItem } from "@mui/material"
import { useForm } from "react-hook-form"

const defaultValues = {
  select: "",
  input: "",
}

function App() {
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues,
  })
  const selectValue = watch("select")
  const onSubmit = (data) => console.log(data)

  useEffect(() => {
    register("select")
  }, [register])

  const handleChange = (e) => setValue("select", e.target.value)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select value={selectValue} onChange={handleChange}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Input {...register("input")} />

      <button type="button" onClick={() => reset({ ...defaultValues })}>
        Reset
      </button>
      <input type="submit" />
    </form>
  )
}
```

## Notes

- For the same field, `Controller`'s own `defaultValue` is ignored and `useForm`'s `defaultValues` takes precedence.
- MUI `Input` / `Select` forward `ref` to the root element, but `register`'s ref callback falls back to the first nested `input` / `select` / `textarea`, so the `{...register(...)}` examples work. When using `Controller` with MUI, pass `field.ref` via `inputRef={field.ref}` to keep focus-on-error working.

## Related

- [controller](../api/controller.md)
- [usecontroller](../api/usecontroller.md)
