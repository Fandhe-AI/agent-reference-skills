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
    // return subscribe({ callback: ({ values }) => console.log(values) });
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
| `name` | `undefined` | Subscribe to the entire form: `subscribe({ formState: { values: true }, callback })`. |
| `name` | `string` | Subscribe to a single field by name: `subscribe({ name: 'firstName', formState: { values: true }, callback })`. |
| `name` | `string[]` | Subscribe to multiple fields by name: `subscribe({ name: ['firstName', 'lastName'], formState: { values: true }, callback })`. |
| `formState` | `Partial<ReadFormState>` | Pick which `formState` to subscribe to: `values`, `isDirty`, `dirtyFields`, `touchedFields`, `isValid`, `errors`, `validatingFields`, `isValidating`. |
| `callback` | `Function` | Runs whenever any of the picked `formState` changes. It receives the full form state, plus `values` (the latest form values), `name` (the field that changed, if any) and `type` (the event, such as `change` or `blur`). |
| `exact` | `boolean = false` | Enable exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name, or vice versa. Since 7.81.0, when `true`, fires when the subscribed field itself or one of its ancestor paths is updated, but not when a nested child path changes (`"users.0.name"` is updated when `"users"` is set, while `"users"` is not updated when `"users.0.name"` changes). |

Return:

| Type | Description |
|------|-------------|
| `() => void` | A function that ends the subscription. Call it when the component unmounts, for example by returning it from `useEffect`. |

## Notes

- Source: https://react-hook-form.com/docs/useform/subscribe (documentation master c0511c9, fetched 2026-11-14)
- To be notified of value changes, pick `formState: { values: true }`; a subscription that omits it is not notified when only values change. The `subscribe({ callback })` form in the first row is written with `values: true` here for that reason.

- Shares the same functionality as `createFormControl.subscribe`; the key difference is that `createFormControl` can be initialized outside of a React component.
- `callback` is required by the `UseFormSubscribe` type (`payload.callback`).
- Do not call state-updating methods such as `setValue` or `reset` inside the subscribe callback; updating subscribed state re-triggers the callback and can cause an infinite loop (carried over from the previous version of this page; not stated in the official docs).
- Dedicated to subscribing to form state without render; use it instead of the `watch` callback function.

### Autosave a draft

Because `subscribe` doesn't re-render, it suits side effects like saving a draft while the user types:

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormValues = { title: string; body: string }

export default function App() {
  const { register, subscribe } = useForm<FormValues>({
    defaultValues: { title: "", body: "" },
  })

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          localStorage.setItem("draft", JSON.stringify(values))
        }, 500)
      },
    })

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [subscribe])

  return (
    <form>
      <input {...register("title")} />
      <textarea {...register("body")} />
    </form>
  )
}
```

### Tips

- Pick only the `formState` keys you need. The callback runs for each update to any of them, so a smaller selection means less work.
- Pass `name` to limit the subscription to one part of the form, such as `subscribe({ name: "shipping", ... })`.
- The callback can run on every key press. Debounce expensive work, such as saving to the server:

  ```javascript
  useEffect(() => {
    const save = debounce((values) => api.saveDraft(values), 500)
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => save(values),
    })
    return () => {
      unsubscribe()
      save.cancel()
    }
  }, [subscribe])
  ```

### Troubleshooting

#### The callback does not receive value changes

- Why: `subscribe` only listens to the form-state properties selected in `formState`. Without `values: true`, changes to input values alone do not trigger a values subscription.
- Fix: Select values explicitly, and optionally limit the work to a field or section:

```javascript
return subscribe({
  name: "shipping",
  formState: { values: true },
  callback: ({ values }) => save(values.shipping),
})
```

#### The callback runs multiple times for one change

- Why: A new subscription is being created on each render, or an effect creates one without removing the previous subscription.
- Fix: Create the subscription in an effect and return the unsubscribe function:

```javascript
useEffect(
  () =>
    subscribe({
      formState: { values: true },
      callback: ({ values }) => console.log(values),
    }),
  [subscribe]
)
```

## Related

- [createFormControl](./createformcontrol.md)
- [useForm — watch](./useform-watch.md)
- [useForm — formState](./useform-formstate.md)
