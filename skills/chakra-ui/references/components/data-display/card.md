# Card

A flexible container component for grouping related content and actions.

## Import

```tsx
import { Card } from "@chakra-ui/react"
```

## Usage

```tsx
<Card.Root maxW="sm">
  <Card.Header>
    <Card.Title>Sign up</Card.Title>
    <Card.Description>Fill in the form below to create an account</Card.Description>
  </Card.Header>
  <Card.Body>
    {/* content */}
  </Card.Body>
  <Card.Footer justifyContent="flex-end">
    <Button variant="outline">Cancel</Button>
    <Button>Sign in</Button>
  </Card.Footer>
</Card.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"elevated" \| "outline" \| "subtle"` | `"outline"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size (controls padding) |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"outline"` (default), `"elevated"`, `"subtle"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `Card.Header`, `Card.Body`, `Card.Footer` are optional layout slots
- `Card.Title` and `Card.Description` provide semantic heading/text within the card
- For horizontal layouts, use `flexDirection="row"` on `Card.Root` and place an `Image` alongside a `Card.Body`

## Related

- [Avatar](./avatar.md)
