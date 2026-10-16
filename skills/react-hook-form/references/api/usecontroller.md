# useController

Custom hook that powers `Controller`. It shares the same props and methods as `Controller` and is useful for creating reusable controlled inputs.

## Signature / Usage

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

## Options / Props

`useController: (UseControllerProps) => UseControllerReturn`

Arguments:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `FieldPath` | Yes | Unique name of your input. Reactive: the controller re-subscribes when this changes. |
| `control` | `Control` | No | `control` object from `useForm`. Optional when using `FormProvider`. |
| `rules` | `Object` | No | Validation rules in the same format as `register`: `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `validate`. |
| `shouldUnregister` | `boolean = false` | No | Input is unregistered after unmount and defaultValues are removed. Avoid with `useFieldArray`. |
| `disabled` | `boolean = false` | No | Since 7.46.0. `disabled` is returned from `field`. Controlled input is disabled and its value is omitted from the submission data. |
| `defaultValue` | `unknown` | No | Cannot be `undefined`. Set at field level or in `useForm`'s `defaultValues` (skip this prop if using `defaultValues`). Provide `defaultValues` to `useForm` if the form invokes `reset` with default values. If `field.value` is `undefined` on first render, the input starts uncontrolled and React warns when it later becomes controlled. |
| `exact` | `boolean = true` | No | Since 7.68.0. Exact match for input name subscriptions. Since 7.81.0, with `true` the field is also updated when one of its ancestor paths is set (`setValue("users.0", { name: "Jane" })` updates `"users.0.name"`), but not when a nested child path changes. Pass `false` to also receive nested updates. |

Return:

| Object | Name | Type | Description |
|--------|------|------|-------------|
| `field` | `onChange` | `(value: any) => void` | Sends the input's value to the library. Assign to the input's `onChange`; value must not be `undefined`. Avoid manually invoking `setValue` or other field-update APIs. |
| `field` | `onBlur` | `() => void` | Sends the input's blur event to the library. |
| `field` | `value` | `unknown` | The current value of the controlled component. |
| `field` | `disabled` | `boolean` | The disabled state of the input. |
| `field` | `name` | `string` | Input's name being registered. |
| `field` | `ref` | `React.Ref` | Assign to the component's input ref to allow focusing the error input. |
| `fieldState` | `invalid` | `boolean` | Invalid state for current input. |
| `fieldState` | `isTouched` | `boolean` | Touched state for current controlled input. |
| `fieldState` | `isDirty` | `boolean` | Dirty state for current controlled input. |
| `fieldState` | `error` | `object` | Since 7.0.0. Error for this specific input. |
| `formState` | (same as `useForm` formState) | | `isDirty`, `dirtyFields`, `touchedFields`, `defaultValues` (7.37.0), `isSubmitted`, `isSubmitSuccessful`, `isSubmitting`, `isLoading` (7.41.0), `submitCount`, `isValid`, `isValidating`, `validatingFields` (7.51.0), `errors`, `disabled` (7.48.0), `isReady` (7.56.0). |

## Notes

- This differs from `useWatch` and `useFormState`, which both default `exact` to `false`.
- Each prop's responsibility with external controlled components (MUI, AntD, Chakra UI): `onChange` sends data back to hook form, `onBlur` reports interaction, `value` sets initial/updated value, `ref` allows focusing on error (only works if the component forwards refs, or exposes an equivalent like MUI's `inputRef`; otherwise omit `ref` and handle focus manually), `name` gives a unique name.
- It's fine to host your own state combined with `useController`:

  ```javascript
  const { field } = useController({ name: "test" })
  const [value, setValue] = useState(field.value)

  onChange={(event) => {
    field.onChange(parseInt(event.target.value)) // data sent back to hook form
    setValue(event.target.value) // UI state
  }}
  ```

- Do not `register` the input again: `<input {...field} />` is correct; `<input {...field} {...register('test')} />` doubles up the registration.
- Use a single `useController` call per component (each call creates its own subscription). For multiple fields, rename the destructured `field` (`const { field: input } = useController(...)`) or use `Controller`.

## Related

- [Controller](./controller.md)
- [useForm — control](./useform-control.md)
- [useFormState](./useformstate.md)
