# Server Actions / useActionState

Advanced Usage: https://react-hook-form.com/advanced-usage#ServerActionsuseActionState

Next.js Server Actions and React's [`useActionState`](https://react.dev/reference/react/useActionState) work well together, but combining them with React Hook Form can look convoluted if you try to sync state between them with `useEffect`. You don't need to: `useActionState` returns a plain dispatch function, so you can call it directly inside `handleSubmit`, and only after client-side validation has passed. Client-side validation is for UX only: a Server Action can be invoked directly, so the server must validate the data again on its own.

## Signature / Usage

`actions.js`: a Server Action that receives the previous state and the validated form data.

```javascript
"use server"

import { z } from "zod"

const profileSchema = z.object({ name: z.string().min(1) })

export async function updateProfile(previousState, data) {
  const parsed = profileSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Invalid input." }
  }
  try {
    // persist only the explicitly allowed fields
    await db.user.update({ data: { name: parsed.data.name } })
    return { success: true }
  } catch {
    return { success: false, error: "Something went wrong. Please try again." }
  }
}
```

`profile-form.jsx`: `handleSubmit` runs validation first, then calls the action dispatcher (`submitAction`) with the already-parsed data, so there is no need to re-parse `FormData` on the server or bridge state with `useEffect`.

```javascript
"use client"

import { useForm } from "react-hook-form"
import { useActionState, startTransition } from "react"
import { updateProfile } from "./actions"

export default function ProfileForm() {
  const [state, submitAction, isPending] = useActionState(updateProfile, null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit((data) => startTransition(() => submitAction(data)))}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span role="alert">{errors.name.message}</span>}

      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>

      {state?.success && <p>Profile updated.</p>}
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  )
}
```

If the server needs to report field-level errors (for example, "email already in use"), map them onto React Hook Form's error state with `setError`. This is a legitimate use of `useEffect`, since you are synchronizing an external state source (the action's returned `state`) into the form rather than working around missing render-time state:

```javascript
useEffect(() => {
  if (state?.fieldErrors) {
    for (const [name, message] of Object.entries(state.fieldErrors)) {
      setError(name, { type: "server", message })
    }
  }
}, [state, setError])
```

## Notes

- Adapted from the official example (advanced-usage#ServerActionsuseActionState): server-side validation (zod `safeParse`), explicit field selection, and `startTransition` wrapping added.
- `isPending` and `state` come straight from `useActionState` and are read directly in the JSX, so there's nothing to synchronize: `isPending` replaces a manual loading `useState`, and `state.success` / `state.error` replace a manual result `useState`. The client calls the Server Action only once `handleSubmit` has confirmed the form is valid, but that check is a UX aid and does not protect the server; validate again inside the action.
- Server Actions can be invoked directly, so validate again on the server (e.g. `schema.safeParse`) and persist only explicitly selected fields.
- Calling the `useActionState` dispatch outside a transition does not update `isPending`; wrap it as `startTransition(() => submitAction(data))`.
- If you don't need `useActionState`'s pending/result state at all, React Hook Form's own `Form` component can submit directly to a Server Action through its `action` prop, with progressive enhancement handled for you.

## Related

- [useform-form](../api/useform-form.md)
- [useform-seterror](../api/useform-seterror.md)
- [useform-handlesubmit](../api/useform-handlesubmit.md)
