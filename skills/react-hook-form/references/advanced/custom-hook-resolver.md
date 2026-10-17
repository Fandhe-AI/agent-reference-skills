# Custom Hook with Resolver

Advanced Usage: https://react-hook-form.com/advanced-usage#CustomHookwithResolver

You can build a custom hook as a resolver. A custom hook can easily integrate with Yup/Joi/Superstruct as a validation method to be used inside a validation resolver.

- Define a memoized validation schema (or define it outside your component if you don't have any dependencies)
- Use the custom hook, by passing the validation schema
- Pass the validation resolver to the useForm hook

## Signature / Usage

```javascript
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
})

export default function App() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register } = useForm({ resolver })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  )
}
```

## Notes

- This hook uses `currentError.path` (e.g. `"user.name"`) as a flat key, so it is intended for flat schemas only. With nested schemas (objects / arrays) `errors` is not hierarchical, which does not satisfy the `useForm` resolver contract (errors keys must be hierarchical).
- For nested schemas use `yupResolver` from `@hookform/resolvers/yup`, or convert flat errors into a hierarchy with `toNestErrors` from `@hookform/resolvers`.

## Related

- [useform](../api/useform.md)
