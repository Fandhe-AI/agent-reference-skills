# Schema Validation

Schema validation is supported through the `resolver` option. A resolver runs your schema against the complete form data and returns typed values or validation errors.

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
- For complete TypeScript examples with Zod and Yup, see the React Hook Form integration guides (https://react-hook-form.com/integrations).
- Source: https://react-hook-form.com/get-started#SchemaValidation (documentation master c0511c9, fetched 2026-11-14)

## Related

- [useForm](../api/useform.md)
- [useForm — formState](../api/useform-formstate.md)
