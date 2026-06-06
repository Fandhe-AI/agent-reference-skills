# Dynamic Field Array

Manage a dynamic list of fields (add, remove, reorder) with `useFieldArray`.

```tsx
import { useForm, useFieldArray } from "react-hook-form"

type FormValues = {
  items: { name: string; quantity: number }[]
}

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      items: [{ name: "", quantity: 1 }],
    },
  })

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "items",
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`items.${index}.name`, { required: true })}
            placeholder="Item name"
          />
          <input
            type="number"
            {...register(`items.${index}.quantity`, { valueAsNumber: true, min: 1 })}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
          {index > 0 && (
            <button type="button" onClick={() => swap(index, index - 1)}>
              Move up
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={() => append({ name: "", quantity: 1 })}>
        Add item
      </button>
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- Always use `field.id` as the React `key`, not the array index — this preserves component identity during reorders
- `defaultValues` must include the array field; omitting it can cause uncontrolled-to-controlled warnings
- Pass a complete object to `append`/`prepend`/`insert` — partial objects with missing keys are not supported
- `remove([0, 2])` deletes multiple indices at once; calling `remove` twice in one event handler may not work as expected
