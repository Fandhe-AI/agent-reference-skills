# Controller

Wrapper component for working with external controlled components such as React-Select, AntD and MUI.

## Signature / Usage

```tsx
import ReactDatePicker from "react-datepicker"
import { useForm, Controller } from "react-hook-form"

type FormValues = {
  ReactDatepicker: Date | null
}

export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { ReactDatepicker: null },
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            onChange={onChange} // send the value to hook form
            onBlur={onBlur} // notify when the input is touched or blurred
            selected={value}
          />
        )}
      />

      <input type="submit" />
    </form>
  )
}
```

React Native:

```javascript
<Controller
  control={control}
  rules={{ required: true }}
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
  )}
  name="firstName"
/>
```

## Options / Props

`Controller: ControllerProps`

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `FieldPath` | Yes | Unique name of your input. |
| `control` | `Control` | No | `control` object from `useForm`. Optional when using `FormProvider`. |
| `render` | `Function` | Yes | A render prop returning a React element. Provides `field` (`onChange`, `onBlur`, `name`, `ref`, `value`), `fieldState`, and `formState` objects. |
| `rules` | `Object` | No | Validation rules in the same format as `register` options: required, min, max, minLength, maxLength, pattern, validate. |
| `shouldUnregister` | `boolean = false` | No | Input is unregistered after unmount and defaultValues are removed. Avoid with `useFieldArray`. |
| `disabled` | `boolean = false` | No | Since 7.46.0. `disabled` is returned from `field`. Controlled input is disabled and its value is omitted from the submission data. |
| `defaultValue` | `unknown` | No | Cannot be `undefined`. Set at field level or `useForm`'s `defaultValues`. Provide `useForm` `defaultValues` if the form invokes `reset` with default values. Calling `onChange` with `undefined` is not valid; use `null` or an empty string. If `field.value` is `undefined` on first render the input starts uncontrolled and React warns later. |
| `exact` | `boolean = true` | No | Since 7.68.0. Exact match for input name subscriptions. Since 7.81.0, with `true` the field is also updated when an ancestor path is set, but not when a nested child path changes. |

Render props return the same `field` / `fieldState` / `formState` objects documented in `useController`:

| Object | Properties |
|--------|------------|
| `field` | `onChange` (`(value: any) => void`, value must not be `undefined`; accepts either a change event or a value: given an event it reads `target.checked` for checkboxes, `target.files` for file inputs and `target.value` otherwise, and any object with a `target` property is treated as an event), `onBlur`, `value`, `disabled`, `name`, `ref` |
| `fieldState` | `invalid`, `isTouched`, `isDirty`, `isValidating`, `error` (since 7.0.0) |
| `formState` | `isDirty`, `dirtyFields`, `touchedFields`, `defaultValues` (7.37.0), `isSubmitted`, `isSubmitSuccessful`, `isSubmitting`, `isLoading` (7.41.0), `submitCount`, `isValid`, `isValidating`, `validatingFields` (7.51.0), `errors`, `disabled` (7.48.0), `isReady` (7.56.0) |

## Notes

- `render` is required (the official props table marks it as required).
- To simply control a field's value from outside the form, `Controller` is not necessary; use the `values` option of `useForm`.
- `ref` only enables focus-on-error if the target component forwards refs (`React.forwardRef`) or exposes an equivalent like MUI's `inputRef`.
- Do not `register` the input again inside `Controller` (`<input {...field} {...register('test')} />` doubles up registration).
- Transform the value sent to hook form during `onChange`:

  For number inputs, map an empty input to `null` instead of `NaN`, and render `null` as an empty string. `rules` doesn't support `valueAsNumber`, so convert the value yourself.

  ```javascript
  <Controller
    name="age"
    render={({ field }) => (
      <input
        {...field}
        type="number"
        value={field.value ?? ""}
        onChange={(e) =>
          field.onChange(e.target.value === "" ? null : e.target.valueAsNumber)
        }
      />
    )}
  />
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

- Source: https://react-hook-form.com/docs/usecontroller/controller (documentation master c0511c9, fetched 2026-11-14)

### Troubleshooting

#### `A component is changing an uncontrolled input to be controlled`

- Why: The field has no default value, so `field.value` is `undefined` on the first render. When the user types, the value becomes a string, and React warns that the input changed from uncontrolled to controlled.
- Fix: Give the field a default value in `useForm`, even if it is just `""`. You can also pass `defaultValue` to `Controller`.

```javascript
useForm({ defaultValues: { firstName: "" } })
```

#### Changing the `defaultValue` prop does not update the input

- Why: The `defaultValue` prop of `Controller` is only read when the field first registers. Changing it later does not update the field.
- Fix: Use `reset` or `setValue` to change the value after the first render, or pass data that loads later to [`values`](./useform.md) on `useForm`.

### Changes since v7.90

- v7.91.0: "Fix `Controller` validation using stale DOM values (#13880)"
- v7.92.0: "Fix `useController` reading stale `shouldUnregister` options (#13956, #13996)"
- v7.92.0: "Fix `useController` dirty tracking with controller-level `defaultValue` (#14001)"
- v7.92.0: "Fix `useFormState` and `Controller` unnecessarily cloning form state during mount and unmount (#13945)"

## Related

- [useController](./usecontroller.md)
- [useForm — control](./useform-control.md)
- [useForm — formState](./useform-formstate.md)
