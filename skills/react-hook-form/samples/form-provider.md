# FormProvider and useFormContext

Share form methods across a deep component tree without prop drilling.

```tsx
import { useForm, FormProvider, useFormContext } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

// Child components consume the context
function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext<FormValues>()
  return (
    <section>
      <input {...register("firstName", { required: "Required" })} placeholder="First name" />
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <input {...register("lastName", { required: "Required" })} placeholder="Last name" />
      {errors.lastName && <p>{errors.lastName.message}</p>}
    </section>
  )
}

function ContactInfo() {
  const { register } = useFormContext<FormValues>()
  return <input {...register("email")} placeholder="Email" />
}

function SubmitButton() {
  const { formState: { isSubmitting, isValid } } = useFormContext<FormValues>()
  return (
    <button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "Submitting…" : "Submit"}
    </button>
  )
}

// Root component wraps with FormProvider
export default function App() {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "", email: "" },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <PersonalInfo />
        <ContactInfo />
        <SubmitButton />
      </form>
    </FormProvider>
  )
}
```

## Notes

- Pass all methods with `{...methods}` spread — passing only individual props breaks `useFormContext`
- Do not nest `FormProvider` components; context collision causes unpredictable behavior
- When listing `reset` or other methods in `useEffect` dependencies, reference the specific method rather than the full `methods` object
- `useFormContext` throws if called outside a `FormProvider`
