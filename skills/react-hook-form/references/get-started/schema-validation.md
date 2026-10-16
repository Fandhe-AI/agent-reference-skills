# Schema Validation

Schema-based form validation: pass a resolver for your `schema` to `useForm` as an optional config. It validates input data against the schema and returns either errors or a valid result.

## Signature / Usage

```bash
npm install @hookform/resolvers yup
```

```javascript
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input {...register("age")} />
      <p>{errors.age?.message}</p>

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Supported libraries include Yup, Zod, Superstruct, Joi, Vest, Class Validator, io-ts, Nope, computed-types, typanion, Ajv, TypeBox, ArkType, Valibot, TypeSchema, effect-ts, VineJS, fluentvalidation-ts, ata-validator, and any library that implements Standard Schema. See the up-to-date list in the `@hookform/resolvers` repo.
- Source: https://react-hook-form.com/get-started#SchemaValidation

## Related

- [useForm](../api/useform.md)
- [useForm — formState](../api/useform-formstate.md)
