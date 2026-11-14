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

- Spread the whole `useForm` return value: `<FormProvider {...methods}>`. If you pass only some methods, child components that call [`useFormContext`](./useformcontext.md) get an object with missing methods.
- Inside a `FormProvider`, hooks such as [`useController`](./usecontroller.md), [`useWatch`](./usewatch.md), [`useFormState`](./useformstate.md), and [`useFieldArray`](./usefieldarray.md) can leave out `control`. They read it from context.
- To have two forms on one page, render two `FormProvider`s next to each other, not one inside the other.
- To share a form without React context, see [`createFormControl`](./createformcontrol.md).
- Source: https://react-hook-form.com/docs/formprovider (documentation master c0511c9, fetched 2026-11-14)

### Troubleshooting

#### `handleSubmit is not a function` (or another method is `undefined`)

- Why: Only some methods were passed to `FormProvider`, for example `<FormProvider register={register}>`. `useFormContext()` returns exactly what the provider received, so the other methods are missing.
- Fix: Spread the whole `useForm` return value: `<FormProvider {...methods}>`.

#### A field inside a nested `FormProvider` is missing from the submitted data

- Why: `useFormContext` uses the nearest `FormProvider`. When one provider is rendered inside another, fields under the inner one register with the inner form, and the outer form's `handleSubmit` never sees them.
- Fix: Use one `FormProvider` per form. To show two forms on one page, render the providers next to each other, not one inside the other.

## Related

- [useFormContext](./useformcontext.md)
- [useForm](./useform.md)
