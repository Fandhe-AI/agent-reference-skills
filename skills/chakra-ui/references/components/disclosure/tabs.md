# Tabs

A set of layered sections of content, known as tab panels, that display one panel at a time.

## Import

```tsx
import { Tabs } from "@chakra-ui/react"
```

## Usage

```tsx
<Tabs.Root defaultValue="members">
  <Tabs.List>
    <Tabs.Trigger value="members">Members</Tabs.Trigger>
    <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="members">Manage your team members</Tabs.Content>
  <Tabs.Content value="projects">Manage your projects</Tabs.Content>
  <Tabs.Content value="settings">Manage settings</Tabs.Content>
</Tabs.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled selected tab value |
| `defaultValue` | `string` | — | Initial selected tab (uncontrolled) |
| `orientation` | `'horizontal' \| 'vertical'` | `"horizontal"` | Tab orientation |
| `activationMode` | `'manual' \| 'automatic'` | `"automatic"` | How tabs activate (click vs focus) |
| `lazyMount` | `boolean` | `false` | Whether to enable lazy mounting |
| `unmountOnExit` | `boolean` | `false` | Whether to unmount panels on exit |
| `loopFocus` | `boolean` | `true` | Whether keyboard focus loops |
| `deselectable` | `boolean` | — | Whether active tab can be deselected |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Callback when selected tab changes |
| `variant` | `"line" \| "subtle" \| "enclosed" \| "outline" \| "plain"` | `"line"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `fitted` | `"true" \| "false"` | — | Whether tabs fill available width |
| `justify` | `"start" \| "center" \| "end"` | — | Tab list alignment |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

### Tabs.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Value identifying this tab |
| `disabled` | `boolean` | — | Whether the tab is disabled |

### Tabs.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Value of the tab this panel belongs to |

## Variants / Sizes

- **variant**: `"line"` (default), `"subtle"`, `"enclosed"`, `"outline"`, `"plain"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `Tabs.ContentGroup` wraps multiple `Tabs.Content` panels for animation use cases
- `Tabs.Indicator` adds an animated sliding indicator line (use with `variant="plain"`)
- `activationMode="manual"` requires pressing Enter to activate a focused tab
- Use `useTabs()` hook with `Tabs.RootProvider` for external state control

## Related

- [Accordion](./accordion.md)
