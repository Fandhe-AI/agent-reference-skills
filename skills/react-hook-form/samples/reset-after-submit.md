# Reset Form After Submission

Clear all field values and form state after a successful submit using `reset`.

```tsx
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  title: string
  body: string
}

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues: { title: "", body: "" },
  })

  // Reset after a confirmed successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const onSubmit = async (data: FormValues) => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title", { required: "Title is required" })} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register("body")} placeholder="Body" />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting…" : "Post"}
      </button>
    </form>
  )
}
```

## Notes

- Call `reset` inside a `useEffect` watching `isSubmitSuccessful`, not inside `onSubmit` itself — this ensures the state transition completes before the reset
- `reset()` with no arguments restores all fields to `defaultValues` and clears errors and dirty/touched state
- `reset(newValues)` also updates the stored `defaultValues`; subsequent `isDirty` comparisons will use the new baseline
- To reset only specific state (e.g., keep current values, clear errors only), pass `reset(undefined, { keepValues: true, keepErrors: false })`
