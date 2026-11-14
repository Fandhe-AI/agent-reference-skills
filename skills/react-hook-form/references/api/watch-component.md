# Watch

Component (Since 7.65.0) providing the same functionality as `useWatch`: use `<Watch />` directly in JSX to subscribe to and render form values.

## Signature / Usage

```tsx
import { useForm, Watch } from "react-hook-form"

const App = () => {
  const { register, control } = useForm()

  return (
    <div>
      <form>
        <input {...register("foo")} />
        <input {...register("bar")} />
      </form>
      {/* re-render only when value of `foo` changes */}
      <Watch
        control={control}
        name={["foo"]}
        render={([foo]) => <span>{foo}</span>}
      />
    </div>
  )
}
```

## Options / Props

`Watch: WatchProps`

| Name | Type | Description |
|------|------|-------------|
| `name` | `string \| string[] \| undefined` | Name of the field(s) to subscribe to. The deprecated `names` prop is still accepted for backwards compatibility but will be removed in a future major version; use `name`. |
| `control` | `Object` | `control` object from `useForm`. Optional with `FormProvider`. |
| `compute` | `function` | Subscribe to selective and computed form values. |
| `defaultValue` | `unknown` | Fallback value returned before the form has mounted and no current value exists yet. |
| `disabled` | `boolean = false` | Option to disable the subscription. |
| `exact` | `boolean = false` | Exact name matching. When `false`, fires when the subscribed name is a prefix of the changed field name or vice versa. Since 7.81.0, when `true`, fires when the subscribed field or an ancestor path is updated, but not when a nested child path changes. |
| `render` | `Function` | Subscribes to the specified form field(s) and re-renders its child function whenever the values change. |
- Show and hide fields without re-rendering the whole form:

  ```javascript
  <Watch
    control={control}
    name="hasPhone"
    render={(hasPhone) => hasPhone && <input {...register("phone")} />}
  />
  ```

- Use `compute` to re-render only when a derived value changes. For example, with `name="items"`, `compute={(items = []) => items.length}` re-renders only when the number of items changes.
- `Watch` is a component, so you can render it conditionally or inside a list. Hooks such as `useWatch` cannot be called that way.
- Source: https://react-hook-form.com/docs/usewatch/watch (documentation master c0511c9, fetched 2026-11-14)

### Troubleshooting

#### `Watch` cannot find the form control

- Why: The component has no `control` prop and is not rendered inside the matching [`FormProvider`](./formprovider.md).
- Fix: Pass `control` from the same `useForm` instance that owns the fields, or render `Watch` under `<FormProvider {...methods}>`.

#### The rendered value is `undefined` on the first render

- Why: The watched field has not registered yet and no initial value is available.
- Fix: Set the field in `defaultValues` on `useForm`, or pass `defaultValue` to `Watch`:

```javascript
<Watch
  control={control}
  name="email"
  defaultValue=""
  render={(email) => <span>{email}</span>}
/>
```

## Related

- [useWatch](./usewatch.md)
- [useForm — watch](./useform-watch.md)
