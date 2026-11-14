# useForm — getFieldState

Returns individual field state (Since 7.25.0). Useful for retrieving nested field state in a type-safe way.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    getFieldState,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
    },
  })

  // you can invoke before render or within the render function
  const fieldState = getFieldState("firstName")

  return (
    <form>
      <input {...register("firstName", { required: true })} />{" "}
      <p>{getFieldState("firstName").isDirty && "dirty"}</p>{" "}
      <p>{getFieldState("firstName").isTouched && "touched"}</p>
      <button
        type="button"
        onClick={() => console.log(getFieldState("firstName"))}
      >
        field state
      </button>
    </form>
  )
}
```

## Options / Props

`getFieldState: UseFormGetFieldState`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Registered field name. |
| `formState` | `object` | Optional. Only required if `formState` has not been read from or subscribed to via `useForm`, `useFormContext` or `useFormState`. |

Return:

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | Field is modified. Condition: subscribe to `dirtyFields`. |
| `isTouched` | `boolean` | Field has received a focus and blur event. Condition: subscribe to `touchedFields`. |
| `invalid` | `boolean` | Field is not valid. Condition: subscribe to `errors`. |
| `isValidating` | `boolean` | Since 7.51.0. Field is currently being validated. Condition: subscribe to `isValidating`. |
| `error` | `undefined \| FieldError` | Field error object. Condition: subscribe to `errors`. |

## Notes

- The name must match a registered field name: `getFieldState("test")` after `register("test")` returns state; `getFieldState("non-existent-name")` returns default/false state.
- `getFieldState` works by subscribing to form state updates. Subscribe at `useForm`, `useFormContext` or `useFormState` and the second argument is no longer required:

  ```javascript
  const { register, formState: { isDirty } } = useForm()
  register("test")
  getFieldState("test") // ✅
  ```

- When form state subscription is not set up, pass the entire `formState` as the second argument:

  ```javascript
  const { register } = useForm()
  register("test")
  const { isDirty } = getFieldState("test") // ❌ formState isDirty is not subscribed at useForm
  const { register, formState } = useForm()
  const { isDirty } = getFieldState("test", formState) // ✅ formState.isDirty subscribed
  ```
- Source: https://react-hook-form.com/docs/useform/getfieldstate (documentation master c0511c9, fetched 2026-11-14)

### Tips

- In a reusable field component, subscribe to only that field with `useFormState({ name })`, and pass the result to `getFieldState`. The component then re-renders only when that field's state changes:

```javascript
function FieldError({ name }) {
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name })
  const { error, isTouched } = getFieldState(name, formState)

  return isTouched && error ? <p role="alert">{error.message}</p> : null
}
```

- `getFieldState` is typed against your form values, so a misspelled nested path is a type error. Reading `errors.some.deep.path` by hand is not checked in the same way.

### Troubleshooting

#### `isDirty`, `isTouched`, and `invalid` are always `false`

- Why: The field name may not be registered, or the component has not subscribed to the matching form-state properties. `getFieldState` reads state; it does not create every subscription by itself.
- Fix: Check that the name exactly matches a registered field. Then read the required state from `formState`, or pass a scoped `useFormState` result:

```javascript
const formState = useFormState({ control, name: "email" })
const emailState = getFieldState("email", formState)
```

#### A field state is stale inside an event handler

- Why: The component never subscribed to the state being read. Reading `getFieldState` only inside a click handler does not cause the component to re-render when that state changes.
- Fix: For reactive UI, call `useFormState({ name })` during render and pass its result to `getFieldState`. For a one-time read, call `getFieldState` in the handler after the operation that updates the field.

## Related

- [useForm — formState](./useform-formstate.md)
- [useFormState](./useformstate.md)
