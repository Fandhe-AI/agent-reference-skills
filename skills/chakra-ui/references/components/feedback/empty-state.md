# EmptyState

A component that provides a placeholder UI when there is no data to display.

## Import

```tsx
import { EmptyState } from "@chakra-ui/react"
```

## Usage

```tsx
<EmptyState.Root>
  <EmptyState.Content>
    <EmptyState.Indicator>
      <LuShoppingCart />
    </EmptyState.Indicator>
    <VStack textAlign="center">
      <EmptyState.Title>Your cart is empty</EmptyState.Title>
      <EmptyState.Description>
        Explore our products and add items to your cart
      </EmptyState.Description>
    </VStack>
  </EmptyState.Content>
</EmptyState.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `EmptyState.Content` is the centering wrapper; always required
- `EmptyState.Indicator` holds an icon or illustration
- `EmptyState.Title` and `EmptyState.Description` provide the text content
- Actionable elements (buttons, lists) can be placed inside `EmptyState.Content` after the text

## Related

- [Skeleton](./skeleton.md)
