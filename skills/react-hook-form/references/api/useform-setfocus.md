# useForm — setFocus

Programmatically focus on an input. Make sure the input's ref is registered into the hook form.

## Signature / Usage

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  firstName: string
}

export default function App() {
  const { register, handleSubmit, setFocus } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => console.log(data)

  useEffect(() => {
    setFocus("firstName")
  }, [setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <input type="submit" />
    </form>
  )
}
```

## Options / Props

`setFocus: UseFormSetFocus`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | An input field name to focus |
| `options.shouldSelect` | `boolean` | Since 7.27.0. Whether to select the input content on focus |

## Notes

- This API invokes the focus method from the ref, so it is important to provide `ref` during `register`.
- Avoid calling `setFocus` right after `reset`, as all input references will be removed by the `reset` API.

## Related

- [useForm — register](./useform-register.md)
- [useForm — reset](./useform-reset.md)
