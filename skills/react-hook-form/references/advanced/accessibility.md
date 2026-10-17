# Accessibility (A11y)

Advanced Usage: https://react-hook-form.com/advanced-usage#AccessibilityA11y

React Hook Form has support for native form validation, which allows you to validate inputs with your own rules. Since most of us have to build forms with custom designs and layouts, it is our responsibility to make sure those are accessible (A11y). The following example leverages [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA).

## Signature / Usage

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>

      {/* use aria-invalid to indicate that the field contains an error */}
      <input
        id="name"
        aria-invalid={errors.name ? "true" : "false"}
        {...register("name", { required: true, maxLength: 30 })}
      />

      {/* use role="alert" to announce the error message */}
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.name && errors.name.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Use `aria-invalid` to indicate that the field contains an error, and `role="alert"` to announce the error message.
- After this improvement, the screen reader will say: "Name, edit, invalid entry, This is required."

## Related

- [useform-register](../api/useform-register.md)
- [faqs](../faqs/faqs.md)
