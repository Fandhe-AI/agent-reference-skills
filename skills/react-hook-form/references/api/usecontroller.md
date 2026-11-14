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
| `field` | `onChange` | `(value: any) => void` | Sends the input's value to the library. Assign to the input's `onChange`; value must not be `undefined`. Avoid manually invoking `setValue` or other field-update APIs. It accepts either a change event or a value: given an event, it reads `target.checked` for checkboxes, `target.files` for file inputs and `target.value` otherwise. Any object with a `target` property is treated as an event. |
| `field` | `onBlur` | `() => void` | Sends the input's blur event to the library. |
| `field` | `value` | `unknown` | The current value of the controlled component. |
| `field` | `disabled` | `boolean` | The disabled state of the input. |
| `field` | `name` | `string` | Input's name being registered. |
| `field` | `ref` | `React.Ref` | Assign to the component's input ref to allow focusing the error input. |
| `fieldState` | `invalid` | `boolean` | Invalid state for current input. |
| `fieldState` | `isTouched` | `boolean` | Touched state for current controlled input. |
| `fieldState` | `isDirty` | `boolean` | Dirty state for current controlled input. |
| `fieldState` | `isValidating` | `boolean` | Validating state for current controlled input. |
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
    // data sent back to hook form; empty input becomes null instead of NaN
    field.onChange(event.target.value === "" ? null : event.target.valueAsNumber)
    setValue(event.target.value) // UI state
  }}
  ```

- Focusing components that don't forward a DOM ref: `field.ref` accepts any object with a `focus` method (and optionally `select`), so you can point it at the component's own focus API:

  ```javascript
  <DatePicker
    {...field}
    ref={(instance) =>
      field.ref(instance && { focus: () => instance.focusInput() })
    }
  />
  ```

- Do not `register` the input again: `<input {...field} />` is correct; `<input {...field} {...register('test')} />` doubles up the registration.
- Use a single `useController` call per component (each call creates its own subscription). For multiple fields, rename the destructured `field` (`const { field: input } = useController(...)`) or use `Controller`.

- Source: https://react-hook-form.com/docs/usecontroller (documentation master c0511c9, fetched 2026-11-14)

### Reusable typed input

A generic component built on `useController` works with any form, and TypeScript still checks that `name` is a field of the form that `control` belongs to.

```tsx
import {
  useForm,
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form"

function TextInput<T extends FieldValues>(props: UseControllerProps<T>) {
  const { field, fieldState } = useController(props)

  return (
    <div>
      <input {...field} value={field.value ?? ""} />
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </div>
  )
}

type FormValues = { firstName: string; lastName: string }

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { firstName: "", lastName: "" },
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <TextInput
        control={control}
        name="firstName"
        rules={{ required: "Required" }}
      />
      <TextInput control={control} name="lastName" />
      <input type="submit" />
    </form>
  )
}
```

### Troubleshooting

#### `A component is changing an uncontrolled input to be controlled`

- Why: The field has no default value, so `field.value` is `undefined` on the first render. When the user types, the value becomes a string, and React warns that the input changed from uncontrolled to controlled.
- Fix: Give the field a default value in `useForm`, even if it is just `""`. You can also pass `defaultValue` to `useController`.

```javascript
useForm({ defaultValues: { firstName: "" } })
```

#### Changing `defaultValue` does not update the input

- Why: The `defaultValue` option of `useController` is only read when the field first registers. Changing it later does not update the field.
- Fix: Use `reset` or `setValue` to change the value after the first render, or pass data that loads later to [`values`](./useform.md) on `useForm`.

#### `Cannot read properties of null (reading '_names')`

- Why: `useController` could not find a form: no `control` was passed and the component is not inside a [`FormProvider`](./formprovider.md).
- Fix: Pass `control` from `useForm`, or wrap the tree in `<FormProvider {...methods}>`. See [`control`](./useform-control.md).

### Changes since v7.90

- v7.91.0: "Fix `Controller` validation using stale DOM values (#13880)"
- v7.92.0: "Fix `useController` reading stale `shouldUnregister` options (#13956, #13996)"
- v7.92.0: "Fix `useController` dirty tracking with controller-level `defaultValue` (#14001)"
- v7.92.0: "Fix `useFormState` and `Controller` unnecessarily cloning form state during mount and unmount (#13945)"

## Related

- [Controller](./controller.md)
- [useForm — control](./useform-control.md)
- [useFormState](./useformstate.md)
