# Integrating with services

To integrate React Hook Form with a service, use the library's built-in submission handling. The `<Form />` component sends form data to an API endpoint or other service.

## Signature / Usage

```javascript
import { Form } from "react-hook-form"

function App() {
  const { register, control } = useForm()

  return (
    <Form
      action="/api/save" // Send post request with the FormData
      // encType={'application/json'} you can also switch to json object
      onSuccess={() => {
        alert("Your application is updated.")
      }}
      onError={() => {
        alert("Submission has failed.")
      }}
      control={control}
    >
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button>Submit</button>
    </Form>
  )
}
```

## Notes

- Source: https://react-hook-form.com/get-started#Integratingwithservices

## Related

- [useForm — Form](../api/useform-form.md)
