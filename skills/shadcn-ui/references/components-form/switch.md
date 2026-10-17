---
source: https://ui.shadcn.com/docs/components/base/switch
---

# Switch

A control that allows the user to toggle between checked and not checked.

## Signature / Usage

```bash
npx shadcn@latest add switch
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Switch } from "@/components/ui/switch"
```

```tsx
<Switch />
```

With a label and description:

```tsx
<Field orientation="horizontal" className="max-w-sm">
  <FieldContent>
    <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
    <FieldDescription>
      Focus is shared across devices, and turns off when you leave the app.
    </FieldDescription>
  </FieldContent>
  <Switch id="switch-focus-mode" />
</Field>
```

## Notes

- The docs page has no props table; see the Base UI Switch API reference: https://base-ui.com/react/components/switch#api-reference
- Wrap the entire `Field` in `FieldLabel` for a clickable choice-card pattern.
- Radix variant (https://ui.shadcn.com/docs/components/radix/switch) installs `radix-ui` and links to Radix Switch docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/switch.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Checkbox](./checkbox.md)
- [Field](./field.md)
