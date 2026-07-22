# Forms

Guide to building forms with Ark UI, covering native form integration, the `Field` component, and integration with React Hook Form and TanStack Form.

## Signature / Usage

```tsx
import { Field } from '@ark-ui/react/field'

<Field.Root invalid required>
  <Field.Label>Email</Field.Label>
  <Field.Input name="email" />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
  <Field.ErrorText>Email is required</Field.ErrorText>
</Field.Root>
```

```tsx
// React Hook Form: forward the field ref for focus management
import { Controller } from 'react-hook-form'

<Controller
  name="country"
  control={control}
  render={({ field }) => (
    <Select.Root {...field} />
  )}
/>
```

## Notes

- Form components automatically integrate with `Field` through context, inheriting `disabled`, `invalid`, `required`, and `readOnly` states.
- Use `Field.Label` for accessible input labels and `Field.HelperText` for extra instructions; both are wired via `aria-describedby` automatically.
- Use `Field.ErrorText` together with the `invalid` prop for clear, actionable validation messages.
- Indicate required inputs with the `required` prop and optionally `Field.RequiredIndicator`.
- Include the `HiddenInput` part in a form control so native form reset events sync back into Ark UI component state.
- `Fieldset` provides shared context for grouped controls such as checkbox groups and radio groups.
- React Hook Form: use `register()` for simple native inputs and `Controller` for complex components, forwarding the field's `ref` for correct focus management.
- TanStack Form: use `form.Field` to get built-in state management, validation, and error handling wired to Ark UI components.

## Related

- [Component State](./component-state.md)
- [Refs](./ref.md)
