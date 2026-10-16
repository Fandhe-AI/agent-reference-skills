# Controller

Wrapper component for working with external controlled components such as React-Select, AntD and MUI.

## Signature / Usage

```tsx
import ReactDatePicker from "react-datepicker"
import { useForm, Controller } from "react-hook-form"

type FormValues = {
  ReactDatepicker: Date | null
}

function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { ReactDatepicker: null },
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
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
| `field` | `onChange` (`(value: any) => void`, value must not be `undefined`), `onBlur`, `value`, `disabled`, `name`, `ref` |
| `fieldState` | `invalid`, `isTouched`, `isDirty`, `error` (since 7.0.0) |
| `formState` | `isDirty`, `dirtyFields`, `touchedFields`, `defaultValues` (7.37.0), `isSubmitted`, `isSubmitSuccessful`, `isSubmitting`, `isLoading` (7.41.0), `submitCount`, `isValid`, `isValidating`, `validatingFields` (7.51.0), `errors`, `disabled` (7.48.0), `isReady` (7.56.0) |

## Notes

- `render` is required by the `ControllerProps` type (v7.90.0 `src/types/controller.ts`) although the official props table leaves Required blank.
- Differs from the official example: field typed as `Date | null` (with `defaultValues: { ReactDatepicker: null }`) to match react-datepicker `selected`.
- To simply control a field's value from outside the form, `Controller` is not necessary; use the `values` option of `useForm`.
- `ref` only enables focus-on-error if the target component forwards refs (`React.forwardRef`) or exposes an equivalent like MUI's `inputRef`.
- Do not `register` the input again inside `Controller` (`<input {...field} {...register('test')} />` doubles up registration).
- Transform the value sent to hook form during `onChange`:

  ```javascript
  <Controller
    name="test"
    render={({ field }) => (
      <input {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
    )}
  />
  ```

## Related

- [useController](./usecontroller.md)
- [useForm — control](./useform-control.md)
- [useForm — formState](./useform-formstate.md)
