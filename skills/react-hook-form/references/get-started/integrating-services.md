# Integrating with services

To integrate React Hook Form with a service, use the library's built-in submission handling. The `<Form />` component sends form data to an API endpoint or other service.

## Signature / Usage

```javascript
import { Form, useForm } from "react-hook-form"

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

- The official example now imports both `Form` and `useForm` (earlier versions of the page imported only `Form`).
- Source: https://react-hook-form.com/get-started#Integratingwithservices (documentation master c0511c9, fetched 2026-11-14)

## Related

- [useForm — Form](../api/useform-form.md)
