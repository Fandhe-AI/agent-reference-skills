# FormProvider Performance

Advanced Usage: https://react-hook-form.com/advanced-usage/formprovider-performance

[`FormProvider`](../api/formprovider.md) shares the methods returned by `useForm` through [React Context](https://react.dev/learn/passing-data-deeply-with-context), so nested components can call [`useFormContext`](../api/useformcontext.md) instead of receiving props. The context itself is cheap. What decides how often your form re-renders is **where you read form state**.

## Signature / Usage

### How re-renders spread

The component that calls `useForm` (the host) re-renders when a piece of `formState` it reads changes. For example, destructuring `formState: { errors }` re-renders the host whenever an error is added or removed. When the host re-renders:

- every child it renders inline re-renders too, as in any React component, and
- the context value changes, so every component that calls `useFormContext` re-renders, **even inside `memo`**.

If the host does not read `formState`, typing and validation do not re-render it. Only the components that subscribe to the value or state they display update.

### Subscribe in the leaves

Keep the host lean and move every read of form state into the component that renders it:

| To render…                         | Use                                                            |
| ---------------------------------- | -------------------------------------------------------------- |
| A field's current value            | [`useWatch`](../api/usewatch.md) with `name`                       |
| Errors, `isSubmitting`, `isDirty`  | [`useFormState`](../api/useformstate.md), with `name` to narrow it |
| A value inside an event handler    | [`getValues`](../api/useform-getvalues.md), which never subscribes |
| A side effect when a value changes | [`subscribe`](../api/useform-subscribe.md) in an effect            |

```tsx
import { memo } from "react"
import {
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form"

type FormValues = { firstName: string; bio: string }

export default function ProfileForm({
  onSave,
}: {
  onSave: (values: FormValues) => Promise<void>
}) {
  // Don't read formState here. This component and everything that uses the
  // context would re-render on every change you subscribe to.
  const methods = useForm<FormValues>({
    defaultValues: { firstName: "", bio: "" },
    mode: "onChange",
  })

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSave)}>
        <ProfileFields />
        <BioCounter />
        <SubmitButton />
      </form>
    </FormProvider>
  )
}

// Registers inputs only, so it never needs to re-render after mounting.
const ProfileFields = memo(function ProfileFields() {
  const { register } = useFormContext<FormValues>()
  return (
    <>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        {...register("firstName", { required: "Enter your first name." })}
      />
      <label htmlFor="bio">Bio</label>
      <textarea
        id="bio"
        {...register("bio", {
          maxLength: { value: 200, message: "Use 200 characters or fewer." },
        })}
      />
    </>
  )
})

// Re-renders on every keystroke in the bio, and nothing else does.
function BioCounter() {
  const bio = useWatch<FormValues, "bio">({ name: "bio" })
  return <p>{bio.length} / 200</p>
}

// Re-renders only when isSubmitting changes.
function SubmitButton() {
  const { isSubmitting } = useFormState<FormValues>()
  return (
    <button type="submit" disabled={isSubmitting}>
      Save
    </button>
  )
}
```

In this form, typing in the bio re-renders only `BioCounter`, and submitting re-renders only `SubmitButton`. `ProfileForm` and `ProfileFields` render once. If `ProfileForm` read `formState.errors`, the first validation error would re-render all four components.

`memo` on `ProfileFields` stops re-renders that come from a parent re-rendering for other reasons, such as unrelated state. It cannot stop re-renders caused by the context changing, so a lean host matters more than `memo`.

### Show errors without re-rendering the form

Render each error message in its own component that calls `useFormState({ name })`. Only that message re-renders when its field's error changes. See the `FieldMessage` component in [Error messages](https://react-hook-form.com/advanced-usage/error-messages#ReusableMessageComponent).

### Pass props instead of context

For a hot path, you can skip context and pass `register` or `control` down as props. These functions keep the same reference for the life of the form, so a `memo` child that receives only them never re-renders because of the form.

### DevTools

[DevTools](../dev-tools/devtools.md) subscribes to the whole form state and re-renders on every change, which can make a large form feel slow. Remove it before measuring performance.

### Measure first

Use the React DevTools Profiler, or add a temporary `console.count` to a component, before optimizing. Most forms are fast enough without any of these changes. Reach for them when a large form or an expensive component makes typing feel slow.

## Notes

- Source: https://react-hook-form.com/advanced-usage/formprovider-performance (documentation master c0511c9, fetched 2026-11-14)

## Related

- [formprovider](../api/formprovider.md)
- [useform-formstate](../api/useform-formstate.md)
