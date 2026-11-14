# useForm — control

An object containing methods for registering components into React Hook Form.

## Signature / Usage

A complete form where a reusable input component receives `control` as a prop. The parent owns the form; the child only connects to it.

```tsx
import {
  useForm,
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

type FormValues = {
  firstName: string
  email: string
}

type TextInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
}

function TextInput<T extends FieldValues>({
  control,
  name,
  label,
}: TextInputProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { required: `${label} is required` },
  })

  return (
    <label>
      {label}
      <input {...field} aria-invalid={fieldState.invalid} />
      {fieldState.error && <p role="alert">{fieldState.error.message}</p>}
    </label>
  )
}

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { firstName: "", email: "" },
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput control={control} name="firstName" label="First name" />
      <TextInput control={control} name="email" label="Email" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Options / Props

`control: Control`

Pass it to `Controller`, `useController`, `useWatch`, `useFieldArray`, `useFormState`, or `FormProvider` so those APIs connect to the same form instance. It is optional wherever the component is already inside a `FormProvider`.

## Notes

- Do not access any of the properties inside this object directly; it is for internal use only.
- `FormProvider` does not take `control` alone: it requires all `useForm` methods, so spread them as `<FormProvider {...methods}>` (which includes `control`), not `<FormProvider control={control}>`. See [FormProvider](./formprovider.md).
- Source: https://react-hook-form.com/docs/useform/control (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Think of `control` as an internal object that you only pass along. Give it to the APIs listed above, and do not read its properties or call its methods yourself. They are not part of the public API and can change in any release.
- Inside a [FormProvider](./formprovider.md), you usually do not need `control` at all. Hooks such as [useController](./usecontroller.md), [useWatch](./usewatch.md), and [useFormState](./useformstate.md) read it from context.
- If you pass `control` as a prop, type it as `Control<FormValues>`, or make the component generic to reuse it across forms. See the `Control<FormValues>` troubleshooting entry below if the types don't line up.

### Troubleshooting

#### `Cannot read properties of null (reading '_names')`

- Why: `useController` or `Controller` could not find a form. The component is rendered outside a [FormProvider](./formprovider.md) and no `control` prop was passed. Hooks such as `useWatch` fail the same way, with a different property name in the message.
- Fix: Pass `control` from `useForm`, or wrap the tree in `<FormProvider {...methods}>`.

#### A field is missing from the submitted data

- Why: The field is connected to a different form than the one that submits. Usually `useForm` was called twice, once in the parent and again in a child, and the field received the child's `control` while the parent's `handleSubmit` runs.
- Fix: Call `useForm` once and pass that `control` down, or use `FormProvider`.

#### `Type 'Control<FormValues>' is not assignable to type 'Control<FieldValues>'`

- Why: `Control` is tied to one exact form shape. A prop typed as `Control<FieldValues>`, or as a smaller shape such as `Control<{ email: string }>`, does not accept the `control` of a larger form.
- Fix: For a component used by one form, type the prop as `Control<FormValues>`. For a component reused across forms, make it generic, as `TextInput` does in the example above. `name` is then checked against the form that owns `control`:

```tsx
function TextInput<T extends FieldValues>(props: {
  control: Control<T>
  name: FieldPath<T>
}) {
  // ...
}
```

## Related

- [Controller](./controller.md)
- [useController](./usecontroller.md)
- [useWatch](./usewatch.md)
- [useFieldArray](./usefieldarray.md)
- [useFormState](./useformstate.md)
- [FormProvider](./formprovider.md)
