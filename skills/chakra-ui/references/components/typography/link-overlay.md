# LinkOverlay

Stretches a link to cover a container element, making an entire area clickable while preserving inner links.

## Import

```tsx
import { LinkBox, LinkOverlay } from "@chakra-ui/react"
```

## Usage

```tsx
<LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
  <Heading size="lg" my="2">
    <LinkOverlay href="#">Article Title</LinkOverlay>
  </Heading>
  <Text color="fg.muted">Description text here.</Text>
  {/* Inner links still work */}
  <Link href="#inner-link" variant="underline" colorPalette="teal">
    Inner Link
  </Link>
</LinkBox>
```

## Props

### LinkBox

Standard HTML element props + Chakra style props. Establishes the clickable region.

### LinkOverlay

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | Navigation destination |
| `isExternal` | `boolean` | Opens in new tab |

## Notes

- `LinkBox` provides the positioning context; `LinkOverlay` stretches to fill it
- Inner `<Link>` elements within `LinkBox` remain clickable (higher z-index)
- Useful for card components and list items
- `LinkOverlay` should be placed on the primary/title link of the container

## Related

- [Link](./link.md)
