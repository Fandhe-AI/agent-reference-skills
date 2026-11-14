# Kbd

Represents keyboard input or a keyboard shortcut key.

## Import

```tsx
import { Kbd } from "@chakra-ui/react"
```

## Usage

```tsx
<Kbd>Shift + Tab</Kbd>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"raised" \| "outline" \| "subtle" \| "plain"` | `"raised"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Font size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `kbd` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

### KbdGroup (added in 3.38.0)

Verbatim from the official `kbd-with-group` example:

```tsx
import { Kbd, KbdGroup, Stack } from "@chakra-ui/react"

export const KbdWithGroup = () => {
  return (
    <Stack gap="4" align="flex-start">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup size="sm" variant="subtle">
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>Shift</Kbd>
        <span>+</span>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Stack>
  )
}
```

## Variants / Sizes

- `variant="raised"` — 3D raised appearance (default)
- `variant="outline"` — border only
- `variant="subtle"` — light background
- `variant="plain"` — no decoration

## Notes

- Renders as `<kbd>` element for semantic correctness
- Use multiple `Kbd` components for key combinations: `<Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>`
- `KbdGroup` groups the keys of a shortcut; its `size` and `variant` apply to every `Kbd` inside (3.38.0). Single keys like `K` now render square (3.38.0)
- Source: https://chakra-ui.com/docs/components/kbd (docs source: https://github.com/chakra-ui/chakra-ui/blob/f0387b6e832a41663eb7186a375db7879337724e/apps/www/content/docs/components/kbd.mdx, tag @chakra-ui/react@3.38.0, retrieved 2026-11-14)
- Common modifier keys: `⌘`, `⌥`, `⇧`, `⌃`

## Related

- [Command](../overlays/command.md)
- [Code](./code.md)
- [Text](./text.md)
