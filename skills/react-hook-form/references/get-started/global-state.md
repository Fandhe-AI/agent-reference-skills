# Integrating with global state

This library doesn't require a state management library, but you can easily integrate with them.

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"
import { connect } from "react-redux"
import updateAction from "./actions"

function App(props) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
  // Submit your data into Redux store
  const onSubmit = (data) => props.updateAction(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  )
}

// Connect your component with redux
export default connect(({ firstName, lastName }) => ({ firstName, lastName }), {
  updateAction,
})(App)
```

## Notes

- Source: https://react-hook-form.com/get-started#Integratingwithglobalstate

## Related

- [useForm — handleSubmit](../api/useform-handlesubmit.md)
