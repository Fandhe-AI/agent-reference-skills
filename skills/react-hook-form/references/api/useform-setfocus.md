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
- Source: https://react-hook-form.com/docs/useform/setfocus (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Focus the first field when the form opens:

  ```javascript
  useEffect(() => {
    setFocus("firstName")
  }, [setFocus])
  ```

- You do not need `setFocus` to focus the first invalid field on submit. `shouldFocusError` (see [useForm](./useform.md)) does this by default.
- For a component that does not forward a DOM ref, give `field.ref` an object with a `focus` method. See the Tips section of [useController](./usecontroller.md).

### Troubleshooting

#### `setFocus` does nothing

- Why: React Hook Form can only focus a mounted field whose DOM ref was received through `register` or `field.ref`. A custom input that drops the ref, or a field that is not currently rendered, has no focusable element.
- Fix: Forward the ref to the actual input. With `Controller`, pass `field.ref` to the component's ref prop (for example, `inputRef`), and call `setFocus` only after the field is mounted.

#### Focusing immediately after `reset` does not work

- Why: `reset` updates the form and its field references. In the same call stack, the target input may not have registered its ref again yet.
- Fix: Focus after React has committed the reset, for example from an effect that runs when the reset state changes. Avoid calling `reset()` and `setFocus()` back-to-back.

### Changes since v7.90

From the v7.92.0 release notes:

- "Fix focusing disabled radio and checkbox inputs (#13960, #13968, #13977)"

## Related

- [useForm — register](./useform-register.md)
- [useForm — reset](./useform-reset.md)
