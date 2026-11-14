# useFormState

Custom hook to subscribe to each form state and isolate re-renders at the custom hook level. It has its own scope for form state subscription, so it does not affect other `useFormState` or `useForm` hooks. Can reduce re-render impact on large and complex forms.

## Signature / Usage

```javascript
import { useForm, useFormState } from "react-hook-form"

function Child({ control }) {
  const { dirtyFields } = useFormState({ control })

  return dirtyFields.firstName ? <p>Field is dirty.</p> : null
}

export default function App() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "firstName",
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <Child control={control} />

      <input type="submit" />
    </form>
  )
}
```

## Options / Props

`useFormState: (UseFormStateProps) => FormState`

| Name | Type | Description |
|------|------|-------------|
| `control` | `Object` | `control` object from `useForm`. Optional with `FormProvider`. |
| `name` | `string \| string[]` | Since 7.4.0. A single input name, an array of them, or omit to subscribe to all inputs' formState updates. |
| `disabled` | `boolean = false` | Since 7.13.0. Option to disable the subscription. |
| `exact` | `boolean = false` | Since 7.20.0. Exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name or vice versa (`"users"` receives updates for `"users.0.name"`). Since 7.81.0, when `true`, fires when the subscribed field or one of its ancestor paths is updated, but not when a nested child path changes. |

Return (`FormState`):

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | `true` after the user modifies any input. Provide all inputs' `defaultValues` at `useForm`. File-type inputs must be managed at the app level. Does not support custom objects, classes, or File objects. |
| `dirtyFields` | `object` | User-modified fields. May not match `isDirty` (e.g. adding or removing entries in a field array can change `isDirty` without any field in `dirtyFields` being dirty). |
| `touchedFields` | `object` | All the inputs the user has interacted with. |
| `defaultValues` | `object` | Since 7.37.0. Value set at `useForm`'s `defaultValues` or updated via `reset`. |
| `isSubmitted` | `boolean` | `true` after submit until `reset`. |
| `isSubmitSuccessful` | `boolean` | Form was successfully submitted without any runtime error. |
| `isSubmitting` | `boolean` | `true` while being submitted. |
| `isLoading` | `boolean` | Since 7.41.0. `true` while loading async default values (only applicable to async `defaultValues`). |
| `submitCount` | `number` | The number of times the form was submitted. |
| `isValid` | `boolean` | `true` if the form has no errors. `setError` immediately forces it to `false`; overwritten on next validation. Without a `resolver` or a `mode` other than `onSubmit`, it does not reflect actual validity until validation has run at least once (e.g. `trigger()` or a submit attempt). |
| `isValidating` | `boolean` | `true` during validation. |
| `validatingFields` | `object` | Since 7.51.0. Fields undergoing asynchronous validation. |
| `errors` | `object` | Field errors. See `ErrorMessage`. |
| `disabled` | `boolean` | Since 7.48.0. `true` if the form is disabled via the `disabled` prop in `useForm`. |
| `isReady` | `boolean` | Since 7.56.0. `true` when `formState` subscription setup is ready. |

## Notes

- Returned `formState` is wrapped with a Proxy; destructure or read it before rendering to enable the subscription: `const { isDirty } = useFormState()` works, `const formState = useFormState()` does not (should destructure).
- Put `useFormState` in the leaf component that shows the state, such as a submit button or an error summary. Only that component re-renders:

  ```javascript
  function SubmitButton({ control }) {
    const { isDirty, isSubmitting } = useFormState({ control })
    return <button disabled={!isDirty || isSubmitting}>Save</button>
  }
  ```

- Pass `name` to scope the subscription to one field or one section. Use it with [`getFieldState`](./useform-getfieldstate.md) to read that field's `error`, `isDirty`, and `isTouched`.
- You can call `useFormState` more than once in the same component. Each call has its own subscription and does not affect the others.
- Source: https://react-hook-form.com/docs/useformstate (documentation master c0511c9, fetched 2026-11-14)

### Submit button in a `FormProvider`

A shared submit button can read `isSubmitting` and `isValid` with `useFormState`. Only the button re-renders when they change. Reading `formState` from `useFormContext()` here instead is a common source of buttons that don't update (see the rules on [`useFormContext`](./useformcontext.md)).

```tsx
import {
  useForm,
  FormProvider,
  useFormState,
  useFormContext,
} from "react-hook-form"

function SubmitButton() {
  const { isSubmitting, isValid } = useFormState()

  return (
    <button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "Saving…" : "Save"}
    </button>
  )
}

function NameInput() {
  const { register } = useFormContext<{ name: string }>()
  return <input {...register("name", { required: true })} />
}

export default function App() {
  const methods = useForm<{ name: string }>({ defaultValues: { name: "" } })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (data) => {
          await fetch("/api", { method: "POST", body: JSON.stringify(data) })
        })}
      >
        <NameInput />
        <SubmitButton />
      </form>
    </FormProvider>
  )
}
```

### Troubleshooting

#### `Cannot read properties of null (reading '_formState')`

- Why: `useFormState` could not find a form: no `control` was passed and the component is not inside a [`FormProvider`](./formprovider.md).
- Fix: Pass `control` from `useForm`, or render the component inside `<FormProvider {...methods}>`.

### Changes since v7.90

- v7.91.0: "Fix form state subscriptions and validity updates (#13866, #13877, #13906)"
- v7.92.0: "Fix `useFormState` and `Controller` unnecessarily cloning form state during mount and unmount (#13945)"

## Related

- [FormState](./formstatesubscribe.md)
- [ErrorMessage](./errormessage.md)
- [useForm — formState](./useform-formstate.md)
