# Accordion

A collapsible component for displaying content in a vertical stack, where items can be expanded or collapsed to reveal or hide content.

## Signature / Usage

```tsx
import { Accordion } from '@ark-ui/react/accordion'

<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      Trigger
      <Accordion.ItemIndicator>+</Accordion.ItemIndicator>
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>Content</Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

## Anatomy

- `Accordion.Root` — container element (`<div>`)
- `Accordion.Item` — individual accordion section
- `Accordion.ItemTrigger` — clickable header (renders `<button>`)
- `Accordion.ItemIndicator` — visual indicator (e.g. arrow/chevron)
- `Accordion.ItemContent` — expandable content area

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `asChild` | `boolean` | Use the provided child element as the default rendered element |
| `collapsible` | `boolean` (default: `false`) | Whether an accordion item can be closed after expansion |
| `defaultValue` | `string[]` | Initial value of expanded items (uncontrolled) |
| `disabled` | `boolean` | Whether accordion items are disabled |
| `id` | `string` | Unique machine identifier |
| `ids` | `Partial<object>` | Custom element IDs for composition |
| `lazyMount` | `boolean` (default: `false`) | Defer content rendering until expanded |
| `multiple` | `boolean` (default: `false`) | Allow multiple simultaneously expanded items |
| `onFocusChange` | `function` | Callback when the focused item changes |
| `onValueChange` | `function` | Callback when expansion state changes |
| `orientation` | `'horizontal' \| 'vertical'` (default: `'vertical'`) | Layout direction |
| `unmountOnExit` | `boolean` (default: `false`) | Remove content from the DOM when collapsed |
| `value` | `string[]` | Controlled expanded items value |

## Notes

- Alternative control via `RootProvider` + `useAccordion` hook, instead of `Accordion.Root` directly.
- Provides CSS variables (`--height`, `--width`) for expand/collapse animations, combined with `[data-state='open']` data attributes.
- Complies with the WAI-ARIA Accordion pattern (Space/Enter to toggle, Arrow keys / Home / End for focus movement).
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Collapsible](./collapsible.md)
- [Tabs](./tabs.md)
