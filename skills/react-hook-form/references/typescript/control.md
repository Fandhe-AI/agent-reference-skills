# Control

The `Control` type is the type of the `control` object returned by `useForm`, passed to child components such as `useWatch`, `Controller`, and `useFieldArray`.

## Signature / Usage

```tsx
import { useForm, useWatch, Control } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
}

function IsolateReRender({ control }: { control: Control<FormValues> }) {
  const firstName = useWatch({
    control,
    name: "firstName",
    defaultValue: "default",
  })

  return <div>{firstName}</div>
}

export default function App() {
  const { register, control, handleSubmit } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <IsolateReRender control={control} />

      <input type="submit" />
    </form>
  )
}
```

## Related

- [UseFormReturn / UseFormProps / ValidateForm](./use-form-return-props.md)
