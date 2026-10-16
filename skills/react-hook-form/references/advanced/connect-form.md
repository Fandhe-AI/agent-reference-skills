# Connect Form

Advanced Usage: https://react-hook-form.com/advanced-usage#ConnectForm

When we are building forms, there are times when our input lives inside deeply nested component trees; that's when FormContext comes in handy. However, we can further improve the developer experience by creating a `ConnectForm` component and leveraging React's [renderProps](https://legacy.reactjs.org/docs/render-props.html). The benefit is that you can connect your inputs to React Hook Form much more easily.

## Signature / Usage

```javascript
import { FormProvider, useForm, useFormContext } from "react-hook-form"

export const ConnectForm = ({ children }) => {
  const methods = useFormContext()

  return children(methods)
}

export const DeepNest = () => (
  <ConnectForm>
    {({ register }) => <input {...register("deepNestedInput")} />}
  </ConnectForm>
)

export const App = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <form>
        <DeepNest />
      </form>
    </FormProvider>
  )
}
```

## Related

- [formprovider](../api/formprovider.md)
- [useformcontext](../api/useformcontext.md)
