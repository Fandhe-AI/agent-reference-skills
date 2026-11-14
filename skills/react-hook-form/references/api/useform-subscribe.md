# useForm — subscribe

Subscribes to `formState` changes and value updates outside the render cycle (Since 7.55.0). You can subscribe to individual fields or the entire form, avoiding unnecessary re-renders.

## Signature / Usage

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormInputs = {
  firstName: string
  lastName: string
}

export default function App() {
  const { register, subscribe } = useForm<FormInputs>()

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values)
      },
    })

    return () => callback()

    // You can also just return the subscribe
    // return subscribe({ formState: { values: true }, callback: ({ values }) => console.log(values) })
  }, [subscribe])

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
    </form>
  )
}
```

## Options / Props

`subscribe: UseFormSubscribe`

| Name | Type | Description |
|------|------|-------------|
| `name` | `undefined` | Omit `name` to subscribe to the entire form (`callback` is still required). |
| `name` | `string` | Subscribe to a single field by name: `subscribe({ name: 'firstName', formState: { values: true }, callback })`. |
| `name` | `string[]` | Subscribe to multiple fields by name: `subscribe({ name: ['firstName', 'lastName'], formState: { values: true }, callback })`. |
| `formState` | `Partial<ReadFormState>` | Pick which `formState` to subscribe to: `values`, `isDirty`, `dirtyFields`, `touchedFields`, `isValid`, `errors`, `validatingFields`, `isValidating`. |
| `callback` | `Function` | The callback function for the subscription, e.g. `({ values }) => {}`. |
| `exact` | `boolean = false` | Enable exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name, or vice versa. Since 7.81.0, when `true`, fires when the subscribed field itself or one of its ancestor paths is updated, but not when a nested child path changes (`"users.0.name"` is updated when `"users"` is set, while `"users"` is not updated when `"users.0.name"` changes). |

## Notes

- Shares the same functionality as `createFormControl.subscribe`; the key difference is that `createFormControl` can be initialized outside of a React component.
- `callback` is required by the `UseFormSubscribe` type (`payload.callback`); the bare `subscribe()` forms in the official table only illustrate the `name` option.
- The official commented example reads `return subscribe();`, which omits the required `callback`; it is shown here with a `callback` added.
- Do not call state-updating methods such as `setValue` or `reset` inside the subscribe callback; updating subscribed state re-triggers the callback and can cause an infinite loop (carried over from the previous version of this page; not stated in the official docs).
- Dedicated to subscribing to form state without render; use it instead of the `watch` callback function.

## Related

- [createFormControl](./createformcontrol.md)
- [useForm — watch](./useform-watch.md)
- [useForm — formState](./useform-formstate.md)
