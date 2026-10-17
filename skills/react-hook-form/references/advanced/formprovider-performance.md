# FormProvider Performance

Advanced Usage: https://react-hook-form.com/advanced-usage#FormProviderPerformance

React Hook Form's FormProvider is built upon [React's Context](https://react.dev/learn/passing-data-deeply-with-context) API. It solves the problem where data is passed through the component tree without having to pass props down manually at every level. This also causes the component tree to trigger a re-render when React Hook Form triggers a state update; however, you can still optimize your application if required, as shown in the example below.

## Signature / Usage

```javascript
import { memo } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"

// we can use memo to prevent re-renders except when the isDirty state changes
const NestedInput = memo(
  ({ register, formState: { isDirty } }) => (
    <div>
      <input {...register("test")} />
      {isDirty && <p>This field is dirty</p>}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
)

export const NestedInputContainer = ({ children }) => {
  const methods = useFormContext()

  return <NestedInput {...methods} />
}

export default function App() {
  const methods = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(methods.formState.isDirty) // make sure `formState` is read before rendering to enable the Proxy

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInputContainer />
        <input type="submit" />
      </form>
    </FormProvider>
  )
}
```

## Notes

- Using React Hook Form's Devtools alongside FormProvider can cause performance issues in some situations. Before diving deep in performance optimizations, consider this bottleneck first.
- Make sure `formState` is read before rendering to enable the Proxy.

## Related

- [formprovider](../api/formprovider.md)
- [useform-formstate](../api/useform-formstate.md)
