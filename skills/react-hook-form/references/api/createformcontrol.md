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
- Create the control once. Passing a new instance to `useForm({ formControl })` re-initializes the form. A control created at module scope is a single form shared by every component that uses it and, during server rendering, by every request. For one form per component instance, create it lazily:

  ```tsx
  const [form] = useState(() => createFormControl({ defaultValues }))
  const { register } = useForm({ formControl: form.formControl })
  ```

- Source: https://react-hook-form.com/docs/createFormControl (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Use the returned `handleSubmit`, `setValue`, `reset`, and other methods anywhere that can import the control, such as a toolbar button that is outside the form's component tree.
- To sync form values to an external store, call `subscribe` and pick only the state you need. Call the returned function to unsubscribe when you no longer need updates:

  ```javascript
  const unsubscribe = formControl.subscribe({
    formState: { values: true },
    callback: ({ values }) => store.setDraft(values),
  })
  ```

- In tests, you can create a control, render your form with it, and then call methods like `setValue` or `trigger` directly, without simulating every user event.

### Troubleshooting

#### Two forms unexpectedly share values and errors

- Why: They use the same `createFormControl` instance. A control created at module scope is a singleton, so every component—and every server request—can share its state.
- Fix: Create one stable control per form instance. Do not recreate it on every render, and avoid a module-scoped control during server rendering.

```javascript
const [form] = useState(() =>
  createFormControl({ defaultValues: { name: "" } })
)
```

#### Form state changes but the React UI does not update

- Why: Calling methods on a standalone control updates the form, but React components only re-render for state they subscribe to.
- Fix: Connect the control with `useForm({ formControl })`, and read reactive state with `useFormState({ control })` or values with `useWatch({ control })`. Use `formControl.subscribe` only for side effects that do not render UI.

## Related

- [useForm — subscribe](./useform-subscribe.md)
- [useForm](./useform.md)
- [FormProvider](./formprovider.md)
