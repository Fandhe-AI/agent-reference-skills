# Integrating an existing form

Integrating an existing form is simple. The important step is to register the component's ref and assign the relevant props to your input.

## Signature / Usage

```tsx
import { forwardRef } from "react"
import {
  FieldPath,
  useForm,
  UseFormRegister,
  SubmitHandler,
} from "react-hook-form"

interface IFormValues {
  "First Name": string
  Age: number
}

type InputProps = {
  label: FieldPath<IFormValues>
  register: UseFormRegister<IFormValues>
  required: boolean
}

// The following component is an example of your existing Input Component
const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
)

// you can use forwardRef to pass the ref too
const Select = forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
))

const App = () => {
  const { register, handleSubmit } = useForm<IFormValues>()

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="First Name" register={register} required />
      <Select label="Age" {...register("Age")} />
      <input type="submit" />
    </form>
  )
}
```

## Notes

- Native inputs return strings; use `valueAsNumber` (input) or `setValueAs` (select) when the field type is `number`.
- Source: https://react-hook-form.com/get-started#Integratinganexistingform

## Related

- [Integrating with UI libraries](./ui-libraries.md)
- [useForm — register](../api/useform-register.md)
