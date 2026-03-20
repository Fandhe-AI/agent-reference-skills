# Button

A versatile button component with multiple variants, sizes, and loading states. Also exports `IconButton` and `ButtonGroup`.

## Import

```tsx
import { Button, IconButton, ButtonGroup } from "@chakra-ui/react"
```

## Usage

```tsx
<Button>Click me</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"solid" \| "subtle" \| "surface" \| "outline" \| "ghost" \| "plain"` | `"solid"` | Visual style |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Button size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `loading` | `boolean` | `false` | Shows a loading spinner |
| `loadingText` | `React.ReactNode` | — | Text shown while loading |
| `spinner` | `React.ReactNode` | — | Custom spinner element |
| `spinnerPlacement` | `"start" \| "end"` | `"start"` | Spinner position |
| `disabled` | `boolean` | — | Disables the button |
| `as` | `React.ElementType` | `button` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

```tsx
<Button variant="solid">Solid</Button>
<Button variant="subtle">Subtle</Button>
<Button variant="surface">Surface</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="plain">Plain</Button>
```

## Notes

- Use `asChild` to render as an anchor: `<Button asChild><a href="/">Home</a></Button>`
- `loading` prop disables the button automatically while showing a spinner
- Use `ButtonGroup` with `attached` for connected button groups
- Add icons before/after the label text directly as children

## Related

- [IconButton](./icon-button.md)
- [CloseButton](./close-button.md)
- [DownloadTrigger](./download-trigger.md)
