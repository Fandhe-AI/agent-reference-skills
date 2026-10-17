---
source: https://ui.shadcn.com/docs/components/base/button
---

# Button

Displays a button or a component that looks like a button.

## Signature / Usage

```bash
npx shadcn@latest add button
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Button } from "@/components/ui/button"
```

```tsx
<Button variant="outline">Button</Button>
```

Icon with correct spacing (use `data-icon="inline-start"` or `data-icon="inline-end"`):

```tsx
<Button variant="outline">
  <IconGitBranch data-icon="inline-start" /> New Branch
</Button>
```

Keep `cursor: pointer` (Tailwind v4 uses `cursor: default` for buttons):

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Options / Props

| Name | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"` | `"default"` |
| `size` | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |

## Notes

- The same cursor behavior can be enabled during project setup with `npx shadcn@latest init --pointer`.
- Render a `<Spinner />` inside a disabled button for a loading state, also with `data-icon`.
- Use `ButtonGroup` to group buttons (see Button Group page).
- Radix variant (https://ui.shadcn.com/docs/components/radix/button) installs `radix-ui` and uses the `asChild` prop to make another component look like a button; Base UI uses the `render` prop on triggers. React Aria variant: https://ui.shadcn.com/docs/components/aria/button.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Button Group](./button-group.md)
- [Input Group](./input-group.md)
