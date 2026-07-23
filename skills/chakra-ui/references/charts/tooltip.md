# Tooltip (Charts)

Render a themed tooltip for Recharts-based chart components using Chakra UI's chart utilities.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Tooltip } from "recharts"
```

## Usage

```tsx
const chart = useChart({ data, series })

<Tooltip
  cursor={false}
  animationDuration={100}
  content={<Chart.Tooltip />}
/>

// hide the series label / total, use dashed indicators
<Tooltip content={<Chart.Tooltip hideLabel indicator="dashed" />} />
```

## Props

### Chart.Tooltip

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hideLabel` | `boolean` | — | Hide the tooltip's label (usually the x-axis value) |
| `hideIndicator` | `boolean` | — | Hide the color indicator next to each series value |
| `hideSeriesLabel` | `boolean` | — | Hide the series name next to each value |
| `showTotal` | `boolean` | — | Show the sum of all series values in the tooltip |
| `fitContent` | `boolean` | — | Size the tooltip to its content instead of a fixed width |
| `nameKey` | `string` | — | Key used to resolve the display name of each series |
| `indicator` | `"line" \| "dot" \| "dashed"` | — | Shape of the color indicator |
| `formatter` | `(value, name) => ReactNode \| [ReactNode, ReactNode]` | — | Custom formatter for a value (and optionally its name) |
| `render` | `(item: Payload) => ReactNode` | — | Fully custom render function for a tooltip entry |

## Notes

- Extends Recharts' `TooltipContentProps` and is passed via the `content` prop of Recharts' `<Tooltip>`, not rendered directly.
- To fully replace the tooltip, write a custom component that accepts `TooltipProps` (`active`, `payload`, `label`) instead of using `Chart.Tooltip`.
- Set `cursor={false}` on `<Tooltip>` to remove the default hover-highlight overlay behind the cursor.
- This is the chart tooltip from `@chakra-ui/charts`, distinct from the general-purpose UI `Tooltip` documented at [components/overlays/tooltip.md](../components/overlays/tooltip.md) (`@chakra-ui/react`); the two are not interchangeable.
- Built on Recharts [Tooltip](https://recharts.org/en-US/api/Tooltip); refer to it for props not covered above.

## Related

- [useChart](./use-chart.md)
- [Legend](./legend.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
