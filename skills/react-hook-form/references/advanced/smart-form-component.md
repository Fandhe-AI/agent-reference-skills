# Smart Form Component

Advanced Usage: https://react-hook-form.com/advanced-usage#SmartFormComponent

The idea here is that you can easily compose your form using input components. We are going to create a `Form` component to automatically collect form data.

## Signature / Usage

```javascript
import { Form, Input, Select } from "./Components"

export default function App() {
  const onSubmit = (data) => console.log(data)

  return (
    <Form onSubmit={onSubmit}>
      <Input name="firstName" />
      <Input name="lastName" />
      <Select name="gender" options={["female", "male", "other"]} />

      {/* not routed through the custom Input — it has no `name`, so `Form` won't inject `register` for it */}
      <input type="submit" value="Submit" />
    </Form>
  )
}
```

`Form`: The `Form` component's responsibility is to inject all `react-hook-form` methods into the child component.

```javascript
import { Children, createElement, isValidElement } from "react"
import { useForm } from "react-hook-form"

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Children.map(children, (child) => {
        return isValidElement(child) && child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </form>
  )
}
```

`Input` / `Select`: The responsibility of these input components is to register themselves with `react-hook-form`.

```javascript
export function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
```

## Notes

- With the `Form` component injecting `react-hook-form`'s `props` into the child component, you can easily create and compose complex forms in your app.
- A child element without `name` does not receive an injected `register`.
- Adapted from the official example: an `isValidElement` guard is added so that null / boolean / string children (e.g. `{show && <Input />}`) are passed through instead of throwing.

## Related

- [useform-register](../api/useform-register.md)
- [connect-form](./connect-form.md)
