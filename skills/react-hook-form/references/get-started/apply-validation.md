# Apply validation

React Hook Form makes form validation easy by aligning with the existing HTML standard for form validation.

## Signature / Usage

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
  firstName: string
  lastName: string
  age: number
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      <input type="number" {...register("age", { min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  )
}
```

## Options / Props

Supported validation rules:

| Rule | Description |
|------|-------------|
| `required` | The input must have a value |
| `min` | Minimum value |
| `max` | Maximum value |
| `minLength` | Minimum length |
| `maxLength` | Maximum length |
| `pattern` | Regex pattern |
| `validate` | Custom validation function |

## Notes

- Details on each rule are in the `register` API page.
- Native inputs return strings; use `valueAsNumber` (input) or `setValueAs` (select) when the field type is `number`.
- Source: https://react-hook-form.com/get-started#Applyvalidation

## Related

- [useForm — register](../api/useform-register.md)
- [Handle errors](./handle-errors.md)
