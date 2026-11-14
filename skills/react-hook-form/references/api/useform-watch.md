# useForm — watch

Watches specified inputs and returns their values. Useful for rendering input values and determining what to render based on conditions.

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

interface IFormInputs {
  name: string
  showAge: boolean
  age: number
}

function App() {
  const { register, watch, handleSubmit } = useForm<IFormInputs>()
  const watchShowAge = watch("showAge", false) // you can supply default value as second argument
  const watchAllFields = watch() // when you pass nothing as an argument, you are watching everything
  const watchFields = watch(["showAge", "age"]) // you can also target specific fields by their names

  const onSubmit = (data: IFormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true, maxLength: 50 })} />
      <input type="checkbox" {...register("showAge")} />
      {/* based on yes selection to display Age Input*/}
      {watchShowAge && <input type="number" {...register("age", { min: 50 })} />}
      <input type="submit" />
    </form>
  )
}
```

## Options / Props

`watch: UseFormWatch` has four overloads:

| Overload | Returns | Description |
|----------|---------|-------------|
| `watch(name: string, defaultValue?: unknown)` | `unknown` | Subscribe to a single field's value and re-render when it changes. `defaultValue` is optional. |
| `watch(names: string[], defaultValue?: {[key:string]: unknown})` | `unknown[]` | Subscribe to an array of fields; e.g. `const [name, name1] = watch(["name", "name1"])`. |
| `watch()` | `{[key:string]: unknown}` | Watch the entire form based on `onChange`, triggering re-renders at the `useForm` level. |
| `watch(callback: (data, { name, type }) => void, defaultValues?: {[key:string]: unknown})` | `{ unsubscribe: () => void }` | Deprecated: consider `subscribe`. Subscribe to field updates without triggering a re-render. |

Callback arguments: `type` indicates the originating DOM event (typed as `EventType`); it is `'change'` when a user updates a field and `undefined` when triggered programmatically (e.g. `setValue`, `reset`, after `unregister`).

## Notes

- Callback overload `watch(callback)` is deprecated since subscribe is available; consider using or migrating to `subscribe`.
- When `defaultValue` is not defined, the first render of `watch` returns `undefined` because it is called before `register`. Provide `defaultValues` to `useForm` to avoid this, or set an inline `defaultValue` as the second argument.
- When both `defaultValue` and `defaultValues` are supplied, `defaultValues` takes precedence; the inline `defaultValue` is only a fallback when no value exists for that field.
- This API triggers a re-render at the root of your application or form. Consider using a callback or `useWatch` if you experience performance issues.
- The `watch` result is optimized for the render phase rather than `useEffect` dependencies. To detect value updates, use an external custom hook for value comparison.
- With `useFieldArray`, `watch("test")` returns the array of field values.

## Related

- [useWatch](./usewatch.md)
- [useForm — subscribe](./useform-subscribe.md)
- [useForm — getValues](./useform-getvalues.md)
