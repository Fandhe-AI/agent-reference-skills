# Schema Validation with Zod

Integrate a Zod schema via `@hookform/resolvers` to centralize validation logic.

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number({ invalid_type_error: "Age must be a number" }).min(18, "Must be 18 or older"),
})

type Schema = z.infer<typeof schema>

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        type="number"
        {...register("age", { valueAsNumber: true })}
        placeholder="Age"
      />
      {errors.age && <p>{errors.age.message}</p>}

      <input type="submit" />
    </form>
  )
}
```

## Notes

- Install dependencies: `npm install @hookform/resolvers zod`
- `z.infer<typeof schema>` derives the TypeScript type from the schema — no manual type duplication
- Use `valueAsNumber: true` in `register` options so numeric inputs deliver `number` instead of `string`
- The same pattern works with Yup (`yupResolver`), Joi (`joiResolver`), and others from `@hookform/resolvers`
