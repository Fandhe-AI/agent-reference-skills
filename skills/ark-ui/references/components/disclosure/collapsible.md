# Collapsible

An interactive component that can be expanded or collapsed, providing a togglable content panel controlled via a trigger button.

## Signature / Usage

```tsx
import { Collapsible } from '@ark-ui/react/collapsible'

<Collapsible.Root>
  <Collapsible.Trigger>Toggle</Collapsible.Trigger>
  <Collapsible.Indicator>+</Collapsible.Indicator>
  <Collapsible.Content>Content</Collapsible.Content>
</Collapsible.Root>
```

## Anatomy

- `Collapsible.Root` — container wrapper
- `Collapsible.Trigger` — button that toggles the state
- `Collapsible.Indicator` — visual element (typically rotates based on state)
- `Collapsible.Content` — the collapsible panel

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Controlled open state |
| `defaultOpen` | `boolean` | Initial uncontrolled state |
| `disabled` | `boolean` | Prevents toggling |
| `collapsedHeight` / `collapsedWidth` | `string \| number` | Partial collapse dimensions |
| `lazyMount` | `boolean` | Delays content mounting until opened |
| `unmountOnExit` | `boolean` | Removes content from the DOM when closed |
| `onOpenChange` | `function` | Fires when the open state changes |

## Notes

- Distinguishes between `open` (intended state) and `visible` (animation-aware state) to properly handle exit animations.
- Content automatically becomes inert to prevent keyboard navigation to hidden content when collapsed.
- Exposes `--height`, `--width`, `--collapsed-height`, `--collapsed-width` CSS variables for custom animations.
- Supports nested/hierarchical Collapsible structures.
- Supports `RootProvider` + `useCollapsible` hook for external state control.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Accordion](./accordion.md)
