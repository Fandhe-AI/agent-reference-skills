# FormState

Renderless component (Since 7.68.0) providing the same functionality as `useFormState`: use `<FormState />` directly in JSX to subscribe to and render form state.

## Signature / Usage

```tsx
import { useForm, FormState } from "react-hook-form"

const App = () => {
  const { register, control } = useForm()

  return (
    <div>
      <form>
        <input {...register("foo", { min: 3 })} />
        <input {...register("bar")} />
        {/* re-render only when form state of `foo` changes */}
        <FormState
          control={control}
          name="foo"
          render={({ errors }) => <span>{errors.foo?.message}</span>}
        />
      </form>
    </div>
  )
}
```

## Options / Props

`FormState: FormStateProps`

| Name | Type | Description |
|------|------|-------------|
| `control` | `Object` | `control` object from `useForm`. Optional with `FormProvider`. |
| `name` | `string \| string[]` | A single input name, an array of them, or omit to subscribe to all inputs' formState updates. |
| `disabled` | `boolean = false` | Option to disable the subscription. |
| `exact` | `boolean = false` | Exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name or vice versa. Since 7.81.0, when `true`, fires when the subscribed field or an ancestor path is updated, but not when a nested child path changes. |
| `render` | `Function` | Subscribes to form state of the specified field(s) and re-renders its child function whenever the form state changes. |

## Notes

- This component was previously documented as `FormStateSubscribe`; renamed to `FormState` on the official page as of 2026-08-01.

## Related

- [useFormState](./useformstate.md)
- [useForm — formState](./useform-formstate.md)
