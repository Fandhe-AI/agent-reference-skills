---
source: https://ui.shadcn.com/docs/components/base/collapsible
---

# Collapsible

An interactive component which expands/collapses a panel.

## Signature / Usage

```bash
npx shadcn@latest add collapsible
# manual: npm install @base-ui/react
```

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```

Controlled state with `open` and `onOpenChange`:

```tsx
const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | Called when the open state changes |
| `render` (on `CollapsibleTrigger`) | element | Render the trigger as another element, e.g. `render={<Button variant="ghost" />}` |

The docs' API Reference defers to Base UI: https://base-ui.com/react/components/collapsible#api-reference

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Radix variant (https://ui.shadcn.com/docs/components/radix/collapsible): installs `radix-ui` and uses `<CollapsibleTrigger asChild>` instead of `render`.
- React Aria variant: https://ui.shadcn.com/docs/components/aria/collapsible (installs `react-aria-components`).
- Nested collapsibles build a file tree; in a conversation that is the AI Elements File Tree pattern (docs/ai-elements/base/file-tree).

## Related

- [Accordion](./accordion.md)
- [Sidebar](./sidebar.md)
