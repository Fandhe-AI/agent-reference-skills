# Axes

Customize the X and Y axes of Recharts-based chart components using Chakra UI's chart utilities.

## Import

```tsx
import { XAxis, YAxis } from "recharts"
import { useChart } from "@chakra-ui/charts"
```

## Usage

```tsx
const chart = useChart({
  data: [
    { sales: 120, date: "2024-01-01" },
    { sales: 95,  date: "2024-02-01" },
  ],
  series: [{ name: "sales", color: "teal.solid" }],
})

// X-axis with date formatting
<XAxis
  axisLine={false}
  tickLine={false}
  dataKey={chart.key("date")}
  tickFormatter={chart.formatDate({ month: "short" })}
/>

// Y-axis with number formatting
<YAxis
  axisLine={false}
  tickLine={false}
  tickMargin={10}
  stroke={chart.color("border")}
  tickFormatter={(value) => `${value}%`}
/>
```

## Common XAxis Props

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Data key for axis labels (use `chart.key()`) |
| `tickFormatter` | `(value: any) => string` | Formats tick labels |
| `axisLine` | `boolean` | Show/hide the axis line |
| `tickLine` | `boolean` | Show/hide tick lines |
| `stroke` | `string` | Color of the axis line and ticks |
| `tickMargin` | `number` | Space between tick and label |

## Common YAxis Props

| Prop | Type | Description |
|------|------|-------------|
| `domain` | `[min, max]` | Value domain, e.g. `[0, 100]` |
| `tickFormatter` | `(value: any) => string` | Formats tick labels |
| `axisLine` | `boolean` | Show/hide the axis line |
| `tickLine` | `boolean` | Show/hide tick lines |
| `tickMargin` | `number` | Space between tick and label |
| `yAxisId` | `string` | Identifier for biaxial charts |

## Notes

- Axes are provided by Recharts. For the full API, refer to the [Recharts XAxis](https://recharts.org/en-US/api/XAxis) and [YAxis](https://recharts.org/en-US/api/YAxis) documentation.
- Use `chart.color("border")` or `chart.color("border.muted")` for axis stroke colors to support light/dark mode.
- Use `chart.formatDate({ month: "short" })` to produce locale-aware date tick labels.
- Set `axisLine={false}` and `tickLine={false}` for a cleaner look.

## Related

- [useChart](./use-chart.md)
- [Cartesian Grid](./cartesian-grid.md)
- [Area Chart](./area-chart.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
