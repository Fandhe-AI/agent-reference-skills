# Cartesian Grid

Customize the background grid of Recharts cartesian charts (AreaChart, BarChart, LineChart, ScatterChart).

## Import

```tsx
import { CartesianGrid } from "recharts"
import { useChart } from "@chakra-ui/charts"
```

## Usage

```tsx
const chart = useChart({ data, series })

<CartesianGrid
  stroke={chart.color("border.muted")}
  vertical={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stroke` | `string` | — | Color of the grid lines |
| `strokeDasharray` | `string` | — | Dash pattern, e.g. `"3 3"` |
| `horizontal` | `boolean` | `true` | Show horizontal grid lines |
| `vertical` | `boolean` | `true` | Show vertical grid lines |
| `fill` | `string` | — | Background fill color |
| `fillOpacity` | `number` | — | Opacity of the background fill |

## Notes

- `CartesianGrid` is a Recharts component. For the full API, refer to the [Recharts CartesianGrid](https://recharts.org/en-US/api/CartesianGrid) documentation.
- Use `chart.color("border.muted")` for the stroke to automatically adapt to light/dark mode.
- Setting `vertical={false}` is a common pattern to show only horizontal lines for a cleaner chart.

## Related

- [useChart](./use-chart.md)
- [Axes](./axes.md)
- [Area Chart](./area-chart.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
