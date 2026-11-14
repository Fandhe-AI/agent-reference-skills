# useForm — unregister

Unregisters a single input or an array of inputs. Since 7.0.0 it takes a second optional argument to keep state after unregistering.

## Signature / Usage

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormInputs = {
  name: string
  addPhone: boolean
  phone?: string
}

export default function App() {
  const { register, handleSubmit, unregister, watch } = useForm<FormInputs>({
    defaultValues: { name: "", addPhone: false, phone: "" },
  })
  const addPhone = watch("addPhone")
  const onSubmit = (data: FormInputs) => console.log(data)

  useEffect(() => {
    // the phone input is already unmounted here, so the field stays removed
    if (!addPhone) unregister("phone")
  }, [addPhone, unregister])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />

      <label>
        <input type="checkbox" {...register("addPhone")} />
        Add a phone number
      </label>

      {addPhone && <input {...register("phone")} placeholder="Phone" />}

      <button type="submit">Submit</button>
    </form>
  )
}
```

## Options / Props

`unregister: UseFormUnregister`

With `register('yourDetails.firstName')` and `register('yourDetails.lastName')`:

| Type | Call | Resulting value |
|------|------|-----------------|
| `string` | `unregister("yourDetails")` | `{}` |
| `string` | `unregister("yourDetails.firstName")` | `{ lastName: '' }` |
| `string[]` | `unregister(["yourDetails.lastName"])` | `{ firstName: '' }` |

Options:

| Name | Type | Description |
|------|------|-------------|
| `keepDirty` | `boolean` | `isDirty` and `dirtyFields` remain during this action. Does not guarantee the next user input will not update `isDirty`, because `isDirty` is measured against `defaultValues`. |
| `keepTouched` | `boolean` | `touchedFields` no longer removes that input after unregister. |
| `keepIsValid` | `boolean` | `isValid` remains during this action. For schema validation, adjust the schema according to the unregister. |
| `keepError` | `boolean` | `errors` will not be updated. |
| `keepValue` | `boolean` | Input's current `value` will not be updated. |
| `keepDefaultValue` | `boolean` | Input's `defaultValue` defined in `useForm` remains. Only has an effect when the form's top-level `shouldUnregister` is `false` (the default); no-op when `shouldUnregister: true`. |
| `keepIsValidating` | `boolean` | Since 7.51.0. `validatingFields`/`isValidating` state for the unregistered field is retained rather than cleared. |

## Notes

- This method removes the input reference and its value, so built-in validation rules are removed as well.
- Unregistering an input does not affect schema validation (e.g. a yup `firstName: yup.string().required()` still applies).
- Make sure to unmount the input that has the `register` callback, or it will be registered again:

  ```javascript
  const [show, setShow] = useState(true)

  const onClick = () => {
    unregister("test")
    setShow(false) // make sure to unmount that input so register not invoked again.
  }

  {show && <input {...register("test")} />}
  ```
- Source: https://react-hook-form.com/docs/useform/unregister (documentation master c0511c9, fetched 2026-11-14)

### Tips

- For fields that show and hide, try the `shouldUnregister: true` option (on `useForm`, see [useForm](./useform.md), or on `register`, see [register](./useform-register.md)) before you call `unregister` by hand. The field is removed when its input unmounts.
- With a resolver, `unregister` does not change the schema. Make the schema conditional instead, for example with a discriminated union or `.optional()`, so hidden fields are not validated.

### Troubleshooting

#### The field comes back right after `unregister`

- Why: The input is still rendered. On the next render, its `register` call registers the field again, with the value still in the input.
- Fix: Remove the input from the page first, then call `unregister`. Or use the `shouldUnregister: true` option, which unregisters the field automatically when its input unmounts.

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix stale asynchronous validation results after `reset()` and `unregister()` (#13908, #13912, #13934)"
- "Fix `unregister` retaining validation rules when using `keepValue` (#13891)"

From the v7.92.0 release notes:

- "Fix `unregister` retaining descendant registrations when removing a parent (#13976)"

## Related

- [useForm — register](./useform-register.md)
- [useForm](./useform.md)
