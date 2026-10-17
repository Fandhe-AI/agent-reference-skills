---
source: https://ui.shadcn.com/docs/components/base/label
---

# Label

Renders an accessible label associated with controls.

## Signature / Usage

```bash
npx shadcn@latest add label
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Label } from "@/components/ui/label"
```

```tsx
<Label htmlFor="email">Your email address</Label>
```

In form fields prefer `Field`:

```tsx
<Field>
  <FieldLabel htmlFor="email">Your email address</FieldLabel>
  <Input id="email" />
</Field>
```

## Notes

- For form fields, use the `Field` component, which includes built-in `FieldLabel`, `FieldDescription`, and `FieldError`.
- The docs page has no props table; see the Base UI Label API reference: https://base-ui.com/react/components/label#api-reference
- Radix variant (https://ui.shadcn.com/docs/components/radix/label) installs `radix-ui` and links to Radix Label docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/label.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Checkbox](./checkbox.md)
