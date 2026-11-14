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

## Related

- [useForm — formState](./useform-formstate.md)
- [useFormState](./useformstate.md)
