# Installation & Example

Installing React Hook Form takes a single command. A minimal form uses `register`, `handleSubmit`, `watch`, and `formState.errors`.

## Signature / Usage

```bash
npm install react-hook-form
```

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing its name

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```

## Notes

- The official page also shows the JS version of the same example (no type annotations, `useForm()`).
- Source: https://react-hook-form.com/get-started#Quickstart

## Related

- [Register fields](./register-fields.md)
- [Apply validation](./apply-validation.md)
