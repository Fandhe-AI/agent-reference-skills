---
source: https://ui.shadcn.com/docs/components/base/input
---

# Input

A text input component for forms and user data entry with built-in styling and accessibility features.

## Signature / Usage

```bash
npx shadcn@latest add input
```

```tsx
import { Input } from "@/components/ui/input"
```

```tsx
<Input />
```

With a label and description:

```tsx
<Field>
  <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
  <Input
    id="input-field-username"
    type="text"
    placeholder="Enter your username"
  />
  <FieldDescription>
    Choose a unique username for your account.
  </FieldDescription>
</Field>
```

Invalid state:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
  <Input id="input-invalid" placeholder="Error" aria-invalid />
</Field>
```

## Notes

- The docs page has no API Reference table; the component is a styled `<input>` and takes native input props (`type`, `placeholder`, `disabled`, `required`, `aria-invalid`, ...), for example `type="file"` for a file input.
- Use `disabled` on the input and `data-disabled` on `Field` to style the disabled state; use `aria-invalid` on the input and `data-invalid` on `Field` for the invalid state.
- Use `Field` with `orientation="horizontal"` for an inline input, for example paired with a `Button` for search. Use `FieldGroup` for multiple fields and to build forms.
- To add icons, text, or buttons inside an input, use `InputGroup`; to add buttons next to an input, use `ButtonGroup`.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/input and https://ui.shadcn.com/docs/components/aria/input.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Input Group](./input-group.md)
- [Textarea](./textarea.md)
