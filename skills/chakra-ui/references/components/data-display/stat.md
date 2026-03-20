# Stat

A component for displaying a statistic with an optional label, trend indicator, and help text.

## Import

```tsx
import { Stat } from "@chakra-ui/react"
```

## Usage

```tsx
<Stat.Root>
  <Stat.Label>Unique visitors</Stat.Label>
  <HStack>
    <Stat.ValueText>
      <FormatNumber value={8456.4} style="currency" currency="USD" />
    </Stat.ValueText>
    <Badge colorPalette="green" gap="0">
      <Stat.UpIndicator />
      12%
    </Badge>
  </HStack>
  <Stat.HelpText>since last month</Stat.HelpText>
</Stat.Root>
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

- `Stat.Label` is the metric name; `Stat.ValueText` is the main number
- `Stat.UpIndicator` / `Stat.DownIndicator` are arrow icons for trend direction — wrap in a `Badge` to add color
- `Stat.ValueUnit` renders a smaller unit label (e.g. "hr", "min") inline with the value
- `Stat.HelpText` provides secondary context below the value
- Use `FormatNumber` from Chakra UI for locale-aware number formatting
- `StatGroup` (non-compound) lays out multiple stats in a responsive row

## Related

- [DataList](./data-list.md)
- [Progress](../feedback/progress.md)
