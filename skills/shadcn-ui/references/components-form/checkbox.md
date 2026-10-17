---
source: https://ui.shadcn.com/docs/components/base/checkbox
---

# Checkbox

A control that allows the user to toggle between checked and not checked.

## Signature / Usage

```bash
npx shadcn@latest add checkbox
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

```tsx
<Checkbox />
```

Controlled state:

```tsx
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

With a label (use `Field` and `FieldLabel`):

```tsx
<Field orientation="horizontal">
  <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
  <FieldLabel htmlFor="terms-checkbox-basic">
    Accept terms and conditions
  </FieldLabel>
</Field>
```

## Notes

- Use `defaultChecked` for uncontrolled checkboxes, or `checked` and `onCheckedChange` to control the state.
- Set `aria-invalid` on the checkbox and `data-invalid` on the `Field` wrapper for invalid styles; use `disabled` plus `data-disabled` on `Field` for disabled styles.
- The docs page has no props table; see the Base UI Checkbox API reference: https://base-ui.com/react/components/checkbox#api-reference
- Radix variant (https://ui.shadcn.com/docs/components/radix/checkbox) installs `radix-ui` and links to Radix Checkbox docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/checkbox.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Radio Group](./radio-group.md)
- [Switch](./switch.md)
