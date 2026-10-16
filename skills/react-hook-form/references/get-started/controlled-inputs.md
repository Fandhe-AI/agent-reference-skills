# Integrating Controlled Inputs

This library embraces uncontrolled components and native HTML inputs. For external controlled components such as shadcn/ui, React-Select, AntD and MUI, use the `Controller` wrapper component (Component API) or `useController` (Hooks API), while still having the freedom to use a custom register.

## Signature / Usage

Component API:

```tsx
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Checkbox } from "@mui/material"

interface IFormInputs {
  MyCheckbox: boolean
}

function App() {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
      MyCheckbox: false,
    },
  })
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="MyCheckbox"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
            name={field.name}
            inputRef={field.ref}
          />
        )}
      />
      <input type="submit" />
    </form>
  )
}
```

Hooks API:

```tsx
import { useForm, useController, UseControllerProps } from "react-hook-form"

type FormValues = {
  FirstName: string
}

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props)

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  )
}

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit" />
    </form>
  )
}
```

## Notes

- The official page also shows a shadcn/ui variant using `Form`, `FormField`, `FormControl` from `@/components/ui/form` with `zodResolver(FormSchema)` and `z.output<typeof FormSchema>`. It requires `npm install @hookform/resolvers zod`.
- If you hit `Cannot find module '@hookform/resolvers/zod'` (or `zod/v4/core`), it is almost always a version mismatch. Using Zod v4 requires `@hookform/resolvers` 5.1.0 or newer (https://github.com/react-hook-form/resolvers/releases/tag/v5.1.0); Zod v3 also works with earlier resolvers versions. Separately, `tsconfig.json` needs `"moduleResolution": "bundler"` (or `"node16"`/`"nodenext"`) so the package's subpath exports resolve. See react-hook-form/resolvers#839.
- The official page states `@hookform/resolvers` ^3.10 for Zod v4, but the resolvers release notes show Zod 4 support landed in v5.1.0.
- Differs from the official example: `checked` / `onChange` / `inputRef` wired explicitly so reset and defaultValues reflect in the MUI Checkbox.
- Source: https://react-hook-form.com/get-started#IntegratingControlledInputs

## Related

- [Controller](../api/controller.md)
- [useController](../api/usecontroller.md)
- [Integrating with UI libraries](./ui-libraries.md)
