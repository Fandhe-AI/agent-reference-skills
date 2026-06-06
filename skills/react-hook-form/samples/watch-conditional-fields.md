# Watch and Conditional Fields

Show or hide fields based on the current value of another field using `watch`.

```tsx
import { useForm } from "react-hook-form"

type FormValues = {
  deliveryMethod: "ship" | "pickup"
  address: string
  pickupLocation: string
}

export default function OrderForm() {
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { deliveryMethod: "ship", address: "", pickupLocation: "" },
  })

  const deliveryMethod = watch("deliveryMethod")

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <fieldset>
        <legend>Delivery method</legend>
        <label>
          <input {...register("deliveryMethod")} type="radio" value="ship" /> Ship
        </label>
        <label>
          <input {...register("deliveryMethod")} type="radio" value="pickup" /> Pick up
        </label>
      </fieldset>

      {deliveryMethod === "ship" && (
        <input {...register("address", { required: true })} placeholder="Shipping address" />
      )}

      {deliveryMethod === "pickup" && (
        <input {...register("pickupLocation", { required: true })} placeholder="Pickup location" />
      )}

      <button type="submit">Place order</button>
    </form>
  )
}
```

## Notes

- `watch` returns the live field value and triggers a re-render on every change
- Always set `defaultValues` so `watch` returns a defined value on the first render
- For performance-sensitive trees, use `useWatch` (scoped to a subtree) instead of `watch` at the root
- Fields hidden via conditional rendering remain registered unless `shouldUnregister: true` is set on `useForm` or the individual field
