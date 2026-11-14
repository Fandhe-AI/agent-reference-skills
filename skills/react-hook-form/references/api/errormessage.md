# ErrorMessage

Simple component (Since 7.88.0) to render the associated input's error message. Reads from the `control` prop when supplied, otherwise from the nearest `FormProvider`.

## Signature / Usage

```tsx
import { useForm, ErrorMessage } from "react-hook-form"

interface FormInputs {
  singleErrorInput: string
}

export default function App() {
  const { register, control, handleSubmit } = useForm<FormInputs>()
  const onSubmit = (data: FormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("singleErrorInput", { required: "This is required." })}
      />
      <ErrorMessage control={control} name="singleErrorInput" />

      <ErrorMessage
        control={control}
        name="singleErrorInput"
        render={({ message }) => <p>{message}</p>}
      />

      <input type="submit" />
    </form>
  )
}
```

Multiple messages (`criteriaMode: "all"`):

```tsx
<ErrorMessage
  control={control}
  name="multipleErrorInput"
  render={({ messages }) =>
    messages &&
    Object.entries(messages).map(([type, message]) => (
      <p key={type}>{message}</p>
    ))
  }
/>
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Name of the field, or a global error path (`root` or `root.*`). |
| `control` | `Control` | No | `control` object from `useForm`. Optional with `FormProvider`. |
| `as` | `React.ElementType` | No | Wrapper component or HTML tag, e.g. `as="span"` or `as={Text}`. |
| `render` | `({ message: string, messages?: Object}) => React.ReactNode` | No | Render prop for rendering the error message or messages. Set `criteriaMode` to `'all'` to use `messages`. |

## Notes

- Inside a `FormProvider` tree, `control` can be omitted: `<ErrorMessage name="singleErrorInput" />`.

## Related

- [useForm — formState](./useform-formstate.md)
- [FormProvider](./formprovider.md)
