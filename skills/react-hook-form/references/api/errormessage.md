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
- `as` only wraps the message text and does not receive other props. To add a class name, an `id` for `aria-describedby`, or `role="alert"`, use `render`:

  ```javascript
  <ErrorMessage
    name="email"
    render={({ message }) => (
      <p id="email-error" role="alert" className="field-error">
        {message}
      </p>
    )}
  />
  ```

- Each `ErrorMessage` subscribes only to the errors for its `name`, so you can use many of them without re-rendering the whole form.
- Use `name="root.server"` to show the error set by the [`Form`](./useform-form.md) component, or any root error you set with [`setError`](./useform-seterror.md).
- Source: https://react-hook-form.com/docs/useformstate/errormessage (documentation master c0511c9, fetched 2026-11-14)

### Troubleshooting

#### The field is invalid but `ErrorMessage` renders nothing

- Why: The validation rule may not include a message. For example, `required: true` creates an error without display text, so the default renderer has nothing to show.
- Fix: Give each rule a message, or use `render` to provide a fallback:

```javascript
<input {...register("email", { required: "Email is required" })} />
<ErrorMessage
  name="email"
  render={({ message }) => <p role="alert">{message || "Invalid value"}</p>}
/>
```

#### `messages` is `undefined` in the render prop

- Why: React Hook Form stores all failed rules in `messages` only when the form uses `criteriaMode: "all"`. The default mode keeps the first relevant error.
- Fix: Initialize the form with `useForm({ criteriaMode: "all" })`, or render the single `message` value instead.

#### `ErrorMessage` cannot find the form control

- Why: No `control` prop was passed and the component is outside a [`FormProvider`](./formprovider.md).
- Fix: Pass `control` from `useForm`, or place `ErrorMessage` inside `<FormProvider {...methods}>`.

## Related

- [useForm — formState](./useform-formstate.md)
- [FormProvider](./formprovider.md)
