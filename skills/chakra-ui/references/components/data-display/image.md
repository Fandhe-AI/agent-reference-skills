# Image

A styled wrapper for the HTML `<img>` element with layout and fit utilities.

## Import

```tsx
import { Image } from "@chakra-ui/react"
```

## Usage

```tsx
<Image rounded="md" src="https://i.pravatar.cc/300" alt="Profile photo" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fit` | `SystemStyleObject["objectFit"]` | — | Maps to CSS `object-fit` (e.g. `"cover"`, `"contain"`) |
| `align` | `SystemStyleObject["objectPosition"]` | — | Maps to CSS `object-position` |

## Notes

- `Image` is a simple styled `<img>` — all standard HTML image attributes (`src`, `alt`, `width`, `height`, etc.) are valid
- Use `aspectRatio` and `width` together to maintain a fixed aspect ratio
- Use `boxSize` for equal width/height, `borderRadius="full"` for circular images
- For lazy loading, use the native `loading="lazy"` prop

## Related

- [Avatar](./avatar.md)
- [Card](./card.md)
