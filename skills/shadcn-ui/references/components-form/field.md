---
source: https://ui.shadcn.com/docs/components/base/field
---

# Field

Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

## Signature / Usage

```bash
npx shadcn@latest add field
```

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
```

```tsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

Composition:

```text
FieldSet
├── FieldLegend
├── FieldDescription
└── FieldGroup
    ├── Field
    │   ├── FieldLabel
    │   ├── Input / Textarea / Switch / Select
    │   ├── FieldDescription
    │   └── FieldError
    └── Field
        ├── FieldLabel
        └── Input / Textarea / Switch / Select
```

Validation state:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid />
  <FieldError>Enter a valid email address.</FieldError>
</Field>
```

## Options / Props

| Component | Prop | Type | Default |
| --- | --- | --- | --- |
| `FieldSet` | `className` | `string` | |
| `FieldLegend` | `variant` | `"legend" \| "label"` | `"legend"` |
| `FieldLegend` | `className` | `string` | |
| `FieldGroup` | `className` | `string` | |
| `Field` | `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `Field` | `className` | `string` | |
| `Field` | `data-invalid` | `boolean` | |
| `FieldContent` | `className` | `string` | |
| `FieldLabel` | `className` | `string` | |
| `FieldTitle` | `className` | `string` | |
| `FieldDescription` | `className` | `string` | |
| `FieldSeparator` | `className` | `string` | |
| `FieldError` | `errors` | `Array<{ message?: string } \| undefined>` | |
| `FieldError` | `className` | `string` | |

## Notes

- `Field` outputs `role="group"`; `FieldSet` and `FieldLegend` keep related controls grouped for keyboard and assistive tech users.
- `FieldContent` is a flex column grouping label and description; not required if you have no description. `FieldTitle` renders a title with label styling inside `FieldContent`.
- `FieldLegend` `label` variant applies label sizing and alignment; handy for nested `FieldSet`.
- `orientation="responsive"` gives automatic column layouts inside container-aware parents; apply `@container/field-group` classes on `FieldGroup` to switch orientations at breakpoints.
- Add `data-invalid` to `Field` for the error state and `aria-invalid` on the control for assistive technologies. Render `FieldError` right after the control or inside `FieldContent`.
- `FieldError` accepts children or an `errors` array (for example from `react-hook-form`); multiple messages render as a list. It also accepts `issues` from any Standard Schema validator (Zod, Valibot, ArkType).
- See the Forms docs for building forms with `Field` and React Hook Form, TanStack Form, or Formisch (`/docs/forms`).
- RHF API is in skill react-hook-form, schema libraries in skill zod, Server Actions in skill nextjs-app.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/field and https://ui.shadcn.com/docs/components/aria/field.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Input](./input.md)
- [Label](./label.md)
- [Checkbox](./checkbox.md)
