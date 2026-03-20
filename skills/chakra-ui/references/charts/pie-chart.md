# Pie Chart

Display data as segments of a full circular chart, showing proportional distribution.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector } from "recharts"

export const PieChartBasic = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac",     value: 300, color: "orange.solid" },
      { name: "linux",   value: 300, color: "pink.solid" },
      { name: "other",   value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="200px" mx="auto" chart={chart}>
      <PieChart responsive>
        <Pie
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  )
}
```

## Data Shape

```tsx
{ name: string; value: number; color: ChartColor }
```

## Pie Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Key for segment values (use `chart.key()`) |
| `nameKey` | `string` | Key for segment names |
| `outerRadius` | `number \| string` | Outer radius of the pie |
| `innerRadius` | `number \| string` | Inner radius; `0` = solid pie, `>0` = donut |
| `startAngle` | `number` | Starting angle in degrees |
| `endAngle` | `number` | Ending angle in degrees |
| `paddingAngle` | `number` | Gap between segments in degrees |
| `shape` | `(props) => ReactElement` | Custom segment renderer |
| `label` | `boolean \| object \| function` | Show labels on segments |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## Notes

- The key difference between Pie Chart and Donut Chart is `innerRadius`: set it to `0` (or omit it) for a solid pie, or set it to a positive value for a donut.
- Use a custom `shape` prop with `<Sector>` to apply per-segment colors from data.
- Built on Recharts [PieChart](https://recharts.org/en-US/api/PieChart).

## Related

- [useChart](./use-chart.md)
- [Donut Chart](./donut-chart.md)
