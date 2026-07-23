# Legend

Render a themed legend for Recharts-based chart components using Chakra UI's chart utilities.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Legend } from "recharts"
```

## Usage

```tsx
const chart = useChart({ data, series })

<Legend content={<Chart.Legend />} />

// interactive legend — toggles or highlights series on hover/click
<Legend content={<Chart.Legend interaction="hover" />} />
```

## Props

### Chart.Legend

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | — | Optional heading rendered above the legend items |
| `nameKey` | `string` | — | Key used to resolve the display name of each series |
| `interaction` | `"hover" \| "click"` | — | Enables highlighting (`hover`) or toggling (`click`) of series |
| `payload` | `LegendPayload[]` | — | Override the legend entries; defaults to the payload provided by Recharts |


## Notes

- Extends Recharts' `LegendProps`, so positioning props such as `layout`, `verticalAlign`, and `align` are also supported.
- `Chart.Legend` is rendered via Recharts' `content` prop on `<Legend>`; it is not a drop-in replacement for `<Legend>` itself.
- Set `interaction="click"` to let users toggle series visibility, or `interaction="hover"` to dim non-hovered series.
- For layout, pass Recharts' own `layout` / `verticalAlign` / `align` props directly to `<Legend>`.
- Built on Recharts [Legend](https://recharts.org/en-US/api/Legend); refer to it for props not covered above.

## Related

- [useChart](./use-chart.md)
- [Tooltip](./tooltip.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
