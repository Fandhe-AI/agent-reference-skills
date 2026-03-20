# Theme

Forces a scoped section of the component tree to render in a specific color mode (light or dark), independent of the application-level color mode.

## Import

```tsx
import { Theme } from "@chakra-ui/react"
```

## Usage

```tsx
<Stack align="flex-start">
  <Button variant="surface" colorPalette="teal">Auto Button</Button>
  <Theme p="4" appearance="dark" colorPalette="teal">
    <Button variant="surface">Dark Button</Button>
  </Theme>
  <Theme p="4" appearance="light" colorPalette="teal">
    <Button variant="surface">Light Button</Button>
  </Theme>
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | `"light" \| "dark"` | — | Forces the specified color mode for all child components |
| `hasBackground` | `boolean` | — | Whether to apply a background color matching the appearance |
| `colorPalette` | `string` | — | Sets a default color palette for child components |
| `children` | `ReactNode` | — | Content to render within the theme context |

## Variants / Sizes

```tsx
{/* Nested themes */}
<Theme appearance="dark" colorPalette="red">
  <Box p="8">
    Hello Dark
    <Theme appearance="light" colorPalette="pink">
      <Box p="8">Hello Light</Box>
    </Theme>
  </Box>
</Theme>

{/* Inside a Portal (use hasBackground={false} to avoid double background) */}
<Popover.Content asChild>
  <Theme hasBackground={false} appearance="dark" colorPalette="teal">
    <Popover.Body>...</Popover.Body>
  </Theme>
</Popover.Content>
```

## Notes

- `Theme` overrides color mode CSS variables for its subtree via data attributes; child components automatically inherit the forced appearance
- When used inside a `Portal`, set `hasBackground={false}` to prevent a redundant background from being applied on the portaled container
- `Theme` components can be nested to override a parent `Theme`

## Related

- [Portal](./portal.md)
