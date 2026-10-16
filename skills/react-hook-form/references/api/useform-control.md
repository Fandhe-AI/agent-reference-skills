# useForm — control

An object containing methods for registering components into React Hook Form.

## Signature / Usage

```tsx
import { useForm, Controller } from "react-hook-form"

type FormInputs = {
  firstName: string
}

function App() {
  const { control, handleSubmit } = useForm<FormInputs>()
  const onSubmit = (data: FormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <input {...field} />}
        name="firstName"
        control={control}
        defaultValue=""
      />

      <input type="submit" />
    </form>
  )
}
```

## Options / Props

`control: Control`

Pass it to `Controller`, `useController`, `useWatch`, `useFieldArray`, `useFormState`, or `FormProvider` so those APIs connect to the same form instance. It is optional wherever the component is already inside a `FormProvider`.

## Notes

- Do not access any of the properties inside this object directly; it is for internal use only.

## Related

- [Controller](./controller.md)
- [useController](./usecontroller.md)
- [useWatch](./usewatch.md)
- [useFieldArray](./usefieldarray.md)
- [useFormState](./useformstate.md)
- [FormProvider](./formprovider.md)
