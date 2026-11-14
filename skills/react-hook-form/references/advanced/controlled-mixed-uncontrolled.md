# Controlled and uncontrolled inputs

Advanced Usage: https://react-hook-form.com/advanced-usage/controlled-and-uncontrolled

Use native inputs and controlled UI components in the same form. Uncontrolled inputs hold their own value in the DOM, like a native `<input>`, and connect with `register`; this is the fastest option because typing does not re-render React. Controlled components take `value` and `onChange` props and hold no value of their own, like many UI library selects, date pickers, and sliders; connect them with `Controller` or `useController`. Both kinds store their values in the same form, and validation, `handleSubmit`, `reset`, and `formState` work the same way for both.

## Signature / Usage

`StarRating` is a controlled component: it takes a number and reports a number, with no input element. `RatingField` connects it with `useController`, and the title and review use `register`:

```tsx
import {
  useController,
  useForm,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

// A controlled component, like many UI library inputs: value + onChange, no input ref.
function StarRating({
  value,
  onChange,
  onBlur,
  label,
  invalid,
}: {
  value: number
  onChange: (value: number) => void
  onBlur: () => void
  label: string
  invalid: boolean
}) {
  return (
    <div role="radiogroup" aria-label={label} aria-invalid={invalid}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} stars`}
          onClick={() => onChange(star)}
          onBlur={onBlur}
        >
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  )
}

// A typed adapter: works with any form that has a number field.
function RatingField<T extends FieldValues>({
  control,
  name,
  label,
}: {
  control: Control<T>
  name: FieldPath<T>
  label: string
}) {
  const { field, fieldState } = useController({
    control,
    name,
    rules: { validate: (value) => value > 0 || "Choose a rating." },
  })

  return (
    <>
      <StarRating
        label={label}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        invalid={fieldState.invalid}
      />
      {fieldState.error && <p role="alert">{fieldState.error.message}</p>}
    </>
  )
}

type ReviewValues = { title: string; rating: number; body: string }

const defaultValues: ReviewValues = { title: "", rating: 0, body: "" }

export default function ReviewForm({
  onSubmit,
}: {
  onSubmit: (values: ReviewValues) => void
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewValues>({ defaultValues })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        {...register("title", { required: "Enter a title." })}
      />
      {errors.title && <p role="alert">{errors.title.message}</p>}

      <RatingField control={control} name="rating" label="Rating" />

      <label htmlFor="body">Review</label>
      <textarea id="body" {...register("body")} />

      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>
      <button type="submit">Post review</button>
    </form>
  )
}
```

## Options / Props

### Which one to use

| The component… | Use |
| --- | --- |
| Is a native `input`, `select`, or `textarea` | `register` |
| Forwards its `ref` to a native input and fires change events | `register` |
| Exposes the native input under another prop, such as `inputRef` | `register`, passing `ref` to that prop |
| Only accepts `value` and `onChange` | `Controller` or `useController` |
| Calls `onChange` with a value instead of an event | `Controller` or `useController`. `field.onChange` accepts either |

If a component forwards `ref` to something other than the input, such as a wrapper `div`, `register` can't read or focus the input. Pass the ref to the right element:

```tsx
const { ref, ...field } = register("email")

<TextField inputRef={ref} {...field} />
```

## Notes

- Source: https://react-hook-form.com/advanced-usage/controlled-and-uncontrolled (documentation master c0511c9, fetched 2026-11-14)
- The star-rating example (verbatim) uses buttons with `role="radio"` but implements no arrow-key navigation or roving `tabIndex`; for reusable code prefer native `input type="radio"` or add that keyboard handling.
- `useController` returns `field` (`value`, `onChange`, `onBlur`, `name`, `ref`) and `fieldState` (`invalid`, `error`, `isTouched`, `isDirty`). Pass `onBlur` through so touched state and `mode: "onBlur"` work.
- `RatingField` is generic over the form type, so it can be reused in any form, and `name` is checked against that form.
- `reset(defaultValues)` clears both kinds of input. Controlled components update because their `value` comes from the form.
- Changing the rating re-renders `RatingField`, not the whole form. `ReviewForm` re-renders only when an error appears or clears, because it reads `formState.errors`.

### Pass the ref for focus

When validation fails, React Hook Form focuses the first invalid field through its `ref`. For a controlled component, pass `field.ref` to the element that should receive focus, for example the first star button or the component's `inputRef` prop. Without it, the error still shows, but focus doesn't move.

### Things to watch

- **One owner per field.** Don't combine `register` and `Controller` for the same name, and don't keep a copy of the value in `useState`. The form is the source of truth.
- **Default values.** Set them in `useForm`'s `defaultValues`. A controlled component needs a defined initial value, such as `""` or `0`, to avoid React's warning about switching from uncontrolled to controlled.
- **Registering without an input.** If a value has no input at all, you can `register` the name without spreading the result, and update it with `setValue`. Pass `{ shouldValidate: true, shouldDirty: true }` so validation and dirty state update like a real input. In most cases `useController` is simpler.
- **Library guides.** See [shadcn/ui](https://react-hook-form.com/integrations/shadcn-ui) for a component library integration, and the `Controller` reference for its props.

## Related

- [controller](../api/controller.md)
- [usecontroller](../api/usecontroller.md)
- [useform-register](../api/useform-register.md)
- [useform-setvalue](../api/useform-setvalue.md)
