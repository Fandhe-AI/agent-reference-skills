# createFormControl

Creates the entire form state subscription and lets you subscribe to updates with or without a React component (Since 7.55.0). Usable without the React Context API.

## Signature / Usage

```javascript
const { formControl, control, handleSubmit, register } = createFormControl({
  mode: "onChange",
  defaultValues: {
    firstName: "Bill",
  },
})

function App() {
  useForm({
    formControl,
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} />
      <FormState />
      <ControlledInput />
    </form>
  )
}

function FormState() {
  const { isDirty } = useFormState({
    control, // no longer need context api
  })

  return isDirty ? <p>Form is dirty.</p> : null
}

function ControlledInput() {
  const { field } = useController({
    control, // no longer need context api
    name: "firstName",
  })

  return <input {...field} />
}
```

Subscribe outside React:

```javascript
const { formControl, register } = createFormControl(props)

formControl.subscribe({
  formState: {
    isDirty: true,
    values: true,
  },
  callback: (formState) => {
    if (formState.isDirty) {
      // do something here
    }
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...props` | `Object` | `UseFormProps` |

Returns:

| Name | Type | Description |
|------|------|-------------|
| `formControl` | `Object` | Control object for the `useForm` hook. |
| `control` | `Object` | Control object for `useController`, `useFormState`, `useWatch`. |
| `subscribe` | `Function` | Subscribe for form state updates without rendering. |
| `...returns` | `Functions` | `useForm` return methods. |

## Notes

- This function is completely optional; consider using it instead of the `useFormContext` API. Useful to subscribe to `formState` while skipping React re-renders.
- Use either this API or the Context API: `<FormProvider {...props} />` is not needed; use methods directly, e.g. `<input {...props.register('name')} />`.

## Related

- [useForm — subscribe](./useform-subscribe.md)
- [useForm](./useform.md)
- [FormProvider](./formprovider.md)
