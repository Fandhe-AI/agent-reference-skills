# useWatch

Behaves similarly to the `watch` API, but isolates re-rendering at the custom hook level, which can improve performance.

## Signature / Usage

```tsx
import { useForm, useWatch, Control } from "react-hook-form"

interface FormInputs {
  firstName: string
  lastName: string
}

function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
  const firstName = useWatch({
    control,
    name: "firstName", // without name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "default", // default value before the render
  })

  return <p>Watch: {firstName}</p> // only re-render at the custom hook level, when firstName changes
}

function App() {
  const { register, control, handleSubmit } = useForm<FormInputs>()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />

      <FirstNameWatched control={control} />
    </form>
  )
}
```

## Options / Props

`useWatch: (UseWatchProps) => object`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string \| string[] \| undefined` | Name of the field. Reactive: changing it updates the subscription. |
| `control` | `Object` | `control` object from `useForm`. Optional with `FormProvider`. |
| `compute` | `function` | Since 7.61.0. Subscribe to selective and computed form values, e.g. `useWatch({ name: 'test', compute: (data: string) => data.length ? data : '' })`, or `useWatch({ compute: (data: FormValue) => data.test?.length ? data.test : '' })` for the entire form. |
| `defaultValue` | `unknown` | Fallback value returned before the form has mounted and no current value exists yet. Once mounted, the actual current form value takes precedence. |
| `disabled` | `boolean = false` | Since 7.13.0. Option to disable the subscription. |
| `exact` | `boolean = false` | Since 7.20.0. Exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name or vice versa. Since 7.81.0, when `true`, fires when the subscribed field or an ancestor path is updated, but not when a nested child path changes. |

Return:

| Example | Return |
|---------|--------|
| `useWatch({ name: 'inputName' })` | `unknown` |
| `useWatch({ name: ['inputName1'] })` | `unknown[]` |
| `useWatch()` | `{[key:string]: unknown}` |

## Notes

- On initial render, `useWatch` returns the current form value if available. `defaultValue` (or `defaultValues` from `useForm`) is only a fallback before the form has mounted.
- The only difference between `useWatch` and `watch` is at the root (`useForm`) level or the custom hook level.
- Execution order matters: updating a form value before the subscription is in place means the update is ignored (`setValue("test", "data")` before `useWatch({ name: "test" })` is not received). Workaround custom hook:

  ```javascript
  const useFormValues = () => {
    const { getValues } = useFormContext()

    return {
      ...useWatch(), // subscribe to form value updates
      ...getValues(), // always merge with latest form values
    }
  }
  ```

- The result is optimized for the render phase instead of `useEffect` dependencies; use an external custom hook for value comparison to detect updates.

## Related

- [Watch](./watch-component.md)
- [useForm — watch](./useform-watch.md)
- [useForm — control](./useform-control.md)
