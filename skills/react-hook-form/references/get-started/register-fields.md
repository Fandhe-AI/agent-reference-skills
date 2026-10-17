# Register fields

One of the key concepts in React Hook Form is to `register` your component into the hook. This makes its value available for both form validation and submission.

## Signature / Usage

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string
  gender: GenderEnum
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("firstName")} />
      <label>Gender Selection</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  )
}
```

## Notes

- Each field is required to have a `name` as a key for the registration process.
- Source: https://react-hook-form.com/get-started#Registerfields

## Related

- [Apply validation](./apply-validation.md)
- [useForm — register](../api/useform-register.md)
