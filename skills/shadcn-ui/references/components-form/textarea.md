---
source: https://ui.shadcn.com/docs/components/base/textarea
---

# Textarea

Displays a form textarea or a component that looks like a textarea.

## Signature / Usage

```bash
npx shadcn@latest add textarea
```

```tsx
import { Textarea } from "@/components/ui/textarea"
```

```tsx
<Textarea />
```

With a label and description:

```tsx
<Field>
  <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
  <FieldDescription>Enter your message below.</FieldDescription>
  <Textarea id="textarea-message" placeholder="Type your message here." />
</Field>
```

## Notes

- The docs page has no API Reference table; the component is a styled `<textarea>` taking native props.
- Use `disabled` on the textarea and `data-disabled` on `Field` for the disabled state; `aria-invalid` on the textarea and `data-invalid` on `Field` for the invalid state.
- Pair with `Button` for a textarea with a submit button. For RTL see the RTL configuration guide (`/docs/rtl`).
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/textarea and https://ui.shadcn.com/docs/components/aria/textarea.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Input](./input.md)
- [Input Group](./input-group.md)
