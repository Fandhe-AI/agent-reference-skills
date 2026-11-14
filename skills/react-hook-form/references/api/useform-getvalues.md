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
- `getValues` returns the raw field values. The data passed to your `handleSubmit` callback can differ: with a resolver (see [useForm](./useform.md)) it's the resolver's output (with any transforms or coercion applied), and disabled fields are left out.
- `getValues` doesn't subscribe to changes, so it won't re-render your component. To render a value, use [useWatch](./usewatch.md) or [watch](./useform-watch.md).
- Source: https://react-hook-form.com/docs/useform/getvalues (documentation master c0511c9, fetched 2026-11-14)

### Types

```tsx
import { useForm } from "react-hook-form"

// Flat input values
type Inputs = {
  key1: string
  key2: number
  key3: boolean
  key4: Date
}

function FlatForm() {
  const { register, getValues } = useForm<Inputs>()

  getValues()

  return <form />
}

// Nested input values
type Inputs1 = {
  key1: string
  key2: number
  key3: {
    key1: number
    key2: boolean
  }
  key4: string[]
}

function NestedForm() {
  const { register, getValues } = useForm<Inputs1>()

  getValues()
  // function getValues(): Inputs1
  getValues("key1")
  // function getValues<"key1">(name: "key1"): string
  getValues("key2")
  // function getValues<"key2">(name: "key2"): number
  getValues("key3.key1")
  // function getValues<"key3.key1">(name: "key3.key1"): number
  getValues("key3.key2")
  // function getValues<"key3.key2">(name: "key3.key2"): boolean
  getValues("key4")
  // function getValues<"key4">(name: "key4"): string[]
  getValues(["key1", "key3.key2"])
  // function getValues<["key1", "key3.key2"]>(names: readonly ["key1", "key3.key2"]): [string, boolean]
}
```

### Tips

- To compare fields inside a validation rule, use the second argument of `validate` instead of `getValues`. It gets the current form values:

```javascript
register("confirmPassword", {
  validate: (value, formValues) =>
    value === formValues.password || "Passwords do not match",
})
```

- Do not mutate the object that `getValues` returns. Nested objects are shared with the form's internal state, so changing them can change form values without updating the form state. Copy the value first, or use [setValue](./useform-setvalue.md).
- Use `getValues` in event handlers, for example to build a preview or to save a draft on click. In those places you need the latest values once, not a subscription.

### Troubleshooting

#### A value shown with `getValues` doesn't update as the user types

- Why: `getValues` reads the current values once and does not subscribe to changes, so the component does not re-render when the input changes.
- Fix: To render a value, use [useWatch](./usewatch.md) (or [watch](./useform-watch.md)), which re-renders when the value changes. Keep `getValues` for event handlers.

### Changes since v7.90

From the v7.91.0 release notes:

- "Avoid unnecessary copies when calling `getValues()` (#13894)"

## Related

- [useForm — setValue](./useform-setvalue.md)
- [useForm — watch](./useform-watch.md)
- [useWatch](./usewatch.md)
