# useForm — getValues

An optimized helper for reading form values. Unlike `watch`, `getValues` will not trigger re-renders or subscribe to input changes.

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"

type FormInputs = {
  test: string
  test1: string
}

export default function App() {
  const { register, getValues } = useForm<FormInputs>()

  return (
    <form>
      <input {...register("test")} />
      <input {...register("test1")} />

      <button
        type="button"
        onClick={() => {
          const values = getValues() // { test: "test-input", test1: "test1-input" }
          const singleValue = getValues("test") // "test-input"
          const multipleValues = getValues(["test", "test1"]) // ["test-input", "test1-input"]
        }}
      >
        Get Values
      </button>
    </form>
  )
}
```

## Options / Props

`getValues: UseFormGetValues`

| Name | Type | Description |
|------|------|-------------|
| `fieldNames` | `undefined` | Returns the entire form values. |
| `fieldNames` | `string` | Gets the value at path of the form values. |
| `fieldNames` | `string[]` | Returns an array of the value at path of the form values. |
| `config.dirtyFields` | `boolean` | Since 7.63.0. Returns only dirty fields. |
| `config.touchedFields` | `boolean` | Since 7.63.0. Returns only touched fields. |

With `register("root.test1")` and `register("root.test2")`:

| Call | Output |
|------|--------|
| `getValues()` | `{ root: { test1: '', test2: ''} }` |
| `getValues("root")` | `{ test1: '', test2: ''}` |
| `getValues("root.test1")` | `''` |
| `getValues(["root.test1", "root.test2"])` | `['', '']` |
| `getValues(undefined, { dirtyFields: true })` | `{ root: { test1: '' } }` — only fields present in `formState.dirtyFields` |
| `getValues(undefined, { touchedFields: true })` | `{ root: { test1: '' } }` — only fields present in `formState.touchedFields` |

## Notes

- It returns `defaultValues` from `useForm` before the initial render.

## Related

- [useForm — watch](./useform-watch.md)
- [useWatch](./usewatch.md)
