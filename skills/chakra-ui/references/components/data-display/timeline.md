# Timeline

A vertical list component for displaying a sequence of events in chronological order.

## Import

```tsx
import { Timeline } from "@chakra-ui/react"
```

## Usage

```tsx
<Timeline.Root maxW="400px">
  <Timeline.Item>
    <Timeline.Connector>
      <Timeline.Separator />
      <Timeline.Indicator>
        <LuCheck />
      </Timeline.Indicator>
    </Timeline.Connector>
    <Timeline.Content>
      <Timeline.Title>Order Confirmed</Timeline.Title>
      <Timeline.Description>18th May 2021</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"subtle" \| "solid" \| "outline" \| "plain"` | `"solid"` | Visual variant for indicators |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size of the component |
| `showLastSeparator` | `"true" \| "false"` | `false` | Whether to show the separator after the last item |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"solid"` (default), `"subtle"`, `"outline"`, `"plain"`
- **size**: `"sm"`, `"md"` (default), `"lg"`, `"xl"`

## Notes

- Each `Timeline.Item` contains a `Timeline.Connector` (separator + indicator) and `Timeline.Content`
- `Timeline.Connector` must wrap both `Timeline.Separator` (the line) and `Timeline.Indicator` (the dot/icon)
- `Timeline.Indicator` can contain icons, avatars, or numbers
- For alternating layouts, add a `Timeline.Content` before the `Timeline.Connector` with `flex="1"` on both content areas
- `Timeline.Title` and `Timeline.Description` are optional semantic sub-components inside `Timeline.Content`

## Related

- [Steps](../disclosure/steps.md)
