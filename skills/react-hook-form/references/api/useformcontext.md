# useFormContext

Custom hook to access the form context. Intended for deeply nested structures where passing the context as a prop is inconvenient. Accepts no arguments and returns all `useForm` methods and props.

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

`useFormContext: () => UseFormReturn`

Supports a third generic since 7.44.0: `useFormContext<TFieldValues, TContext, TTransformedValues>()`, to type the resolver's transformed output separately from the raw form values and context type.

## Notes

- The form must be wrapped with `FormProvider` for `useFormContext` to work.
- To subscribe to form state values like `errors`, `isDirty`, or `dirtyFields` inside a `FormProvider` tree, use `useFormState` instead of destructuring `formState` from `useFormContext()`. `formState` is wrapped in a Proxy that only tracks fields read during render; destructuring and reading later (e.g. in a callback), or reading conditionally, does not register a subscription.

## Related

- [FormProvider](./formprovider.md)
- [useFormState](./useformstate.md)
