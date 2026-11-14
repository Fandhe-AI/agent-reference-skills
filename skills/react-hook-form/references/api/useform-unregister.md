# useForm — unregister

Unregisters a single input or an array of inputs. Since 7.0.0 it takes a second optional argument to keep state after unregistering.

## Signature / Usage

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface IFormInputs {
  firstName: string
  lastName?: string
}

export default function App() {
  const { register, handleSubmit, unregister } = useForm<IFormInputs>()
  const onSubmit = (data: IFormInputs) => console.log(data)

  useEffect(() => {
    register("lastName")
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={() => unregister("lastName")}>
        unregister
      </button>
      <input type="submit" />
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

## Related

- [useForm — register](./useform-register.md)
- [useForm](./useform.md)
