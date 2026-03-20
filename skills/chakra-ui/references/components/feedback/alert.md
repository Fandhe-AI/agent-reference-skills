# Alert

A component used to display a brief, important message in a way that attracts the user's attention.

## Import

```tsx
import { Alert } from "@chakra-ui/react"
```

## Usage

```tsx
<Alert.Root status="error">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Invalid Fields</Alert.Title>
    <Alert.Description>
      Your form has some errors. Please fix them and try again.
    </Alert.Description>
  </Alert.Content>
</Alert.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `"info" \| "warning" \| "success" \| "error" \| "neutral"` | `"info"` | The status of the alert |
| `variant` | `"subtle" \| "surface" \| "outline" \| "solid"` | `"subtle"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `inline` | `"true" \| "false"` | `false` | Whether to display inline |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"subtle"` (default), `"surface"`, `"outline"`, `"solid"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `Alert.Indicator` renders the status icon; place a custom icon inside it to override
- `Alert.Content` wraps `Alert.Title` and `Alert.Description` for two-line layouts
- Without `Alert.Content`, place `Alert.Title` directly as a flex child
- Use `colorPalette` to override the color implied by `status`

## Related

- [Status](./status.md)
- [Toast](./toast.md)
