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

- Outside a `FormProvider`, `useFormContext()` returns `null` even though its return type isn't nullable, so destructuring it throws `Cannot destructure property 'register' of ... as it is null`.
- To avoid repeating your form type, wrap it in a typed hook. The generic is only a type assertion; it isn't checked against the form the provider actually holds.

```tsx
export const useProfileForm = () => useFormContext<ProfileFormValues>()
```

- Source: https://react-hook-form.com/docs/useformcontext (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Wrap components that use `useFormContext` in a small test helper, so you can render them alone in unit tests:

```tsx
import { render } from "@testing-library/react"

function renderWithForm(ui: React.ReactElement, defaultValues = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm({ defaultValues })
    return <FormProvider {...methods}>{children}</FormProvider>
  }
  return render(ui, { wrapper: Wrapper })
}
```

- `useFormContext` couples a component to one form shape. For an input that you reuse in many forms, take `name` (and optionally `control`) as props and use [`useController`](./usecontroller.md), or look at [`useLens`](./uselens.md).
- Use the context only for the methods you need. For example, `const { register } = useFormContext()` in a leaf input. Read state with [`useFormState`](./useformstate.md) and values with [`useWatch`](./usewatch.md).

### Troubleshooting

#### `Cannot destructure property 'register' of 'useFormContext(...)' as it is null`

- Why: `useFormContext()` returns `null` outside a [`FormProvider`](./formprovider.md). The exact wording depends on your bundler, but the message always ends in `as it is null`.
- Fix: Render the component inside a `FormProvider` that receives the whole `useForm` return value:

```javascript
const methods = useForm()

<FormProvider {...methods}>
  <NestedInput />
</FormProvider>
```

#### `handleSubmit is not a function` (or another method is `undefined`)

- Why: Only some methods were passed to `FormProvider`, for example `<FormProvider register={register}>`. `useFormContext()` returns exactly what the provider received, so the other methods are missing.
- Fix: Spread the whole `useForm` return value: `<FormProvider {...methods}>`.

#### A field inside a nested `FormProvider` is missing from the submitted data

- Why: `useFormContext` uses the nearest `FormProvider`. When one provider is rendered inside another, fields under the inner one register with the inner form, and the outer form's `handleSubmit` never sees them.
- Fix: Use one `FormProvider` per form. To show two forms on one page, render the providers next to each other, not one inside the other.

## Related

- [FormProvider](./formprovider.md)
- [useFormState](./useformstate.md)
