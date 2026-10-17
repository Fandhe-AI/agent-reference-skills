---
source: https://ui.shadcn.com/docs/components/base/accordion
---

# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Signature / Usage

```bash
npx shadcn@latest add accordion
# manual: npm install @base-ui/react
```

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

Composition: `Accordion` > `AccordionItem` > (`AccordionTrigger`, `AccordionContent`).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `defaultValue` | `string[]` (Base UI) | Item values open initially (array form shown in the docs) |
| `multiple` | `boolean` | Allow multiple items open at the same time |
| `disabled` (on `AccordionItem`) | `boolean` | Disable an individual item |

The docs' API Reference defers to the Base UI documentation: https://base-ui.com/react/components/accordion#api-reference

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Radix variant (https://ui.shadcn.com/docs/components/radix/accordion): installs `radix-ui` and uses `type="single" collapsible` / `type="multiple"` instead of the Base UI `multiple` prop.
- React Aria variant (https://ui.shadcn.com/docs/components/aria/accordion): installs `react-aria-components` and uses `defaultExpandedKeys={["item-1"]}` instead of `defaultValue`.
- Borders: add `border` to `Accordion` and `border-b last:border-b-0` to `AccordionItem`.

## Related

- [Collapsible](./collapsible.md)
- [Tabs](./tabs.md)
