# Tabs

A flexible navigation tool with various modes and features, enabling organized content switching across multiple sections.

## Signature / Usage

```tsx
import { Tabs } from '@ark-ui/react/tabs'

<Tabs.Root defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="tab-1">Content 1</Tabs.Content>
  <Tabs.Content value="tab-2">Content 2</Tabs.Content>
</Tabs.Root>
```

## Anatomy

- `Tabs.Root` — container element
- `Tabs.List` — tab trigger group
- `Tabs.Trigger` — individual selectable tab
- `Tabs.Indicator` — visual selection indicator
- `Tabs.Content` — associated content panel

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `activationMode` | `'manual' \| 'automatic'` | `'automatic'` | Controls tab selection behavior on focus |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |
| `value` | `string` | — | Controlled selected tab value |
| `defaultValue` | `string` | — | Initial tab selection |
| `lazyMount` | `boolean` | `false` | Renders tab content only when activated |
| `unmountOnExit` | `boolean` | `false` | Removes content when a tab is deselected |
| `loopFocus` | `boolean` | `true` | Navigation wraps between first/last tabs |
| `deselectable` | `boolean` | — | Allows deselecting the active tab |
| `onValueChange` | `function` | — | Fires when the selection changes |

## Notes

- `useTabs` hook (with `RootProvider`) exposes methods: `setValue()` / `clearValue()`, `selectNext()` / `selectPrev()`, `setIndicatorRect()`, `getTriggerState()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Toggle Group](./toggle-group.md)
