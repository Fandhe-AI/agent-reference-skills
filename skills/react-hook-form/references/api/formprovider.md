# FormProvider

Hosts the context object and allows consuming components to subscribe to context and use `useForm` props and methods.

## Signature / Usage

```javascript
import { useEffect } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"

export default function App() {
  const methods = useForm()

  const onSubmit = (data) => console.log(data)
  const { register, reset } = methods

  useEffect(() => {
    reset({
      name: "data",
    })
  }, [reset]) // never put `methods` as a dependency

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input {...register("name")} />
        <input type="submit" />
      </form>
    </FormProvider>
  )
}

function NestedInput() {
  const { register } = useFormContext() // retrieve all hook methods

  return <input {...register("test")} />
}
```

## Options / Props

`FormProvider: FormProviderProps`

| Name | Type | Description |
|------|------|-------------|
| `...props` | `Object` | `FormProvider` requires all `useForm` methods. |

## Notes

- Avoid nesting `FormProvider` components. React context does not merge, so any `useFormContext()` call inside the inner `FormProvider`'s subtree only sees the innermost form's methods and state, which can silently break field registration or validation.
- Since 7.44.0, `FormProviderProps` accepts a `TTransformedValues` generic (`FormProviderProps<TFieldValues, TContext, TTransformedValues>`) to type a resolver's transformed output.

## Related

- [useFormContext](./useformcontext.md)
- [useForm](./useform.md)
