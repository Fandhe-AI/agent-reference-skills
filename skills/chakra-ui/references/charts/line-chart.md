# Line Chart

Display data points connected by straight line segments, showing trends and patterns in continuous data over time or sequences.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

export const LineChartBasic = () => {
  const chart = useChart({
    data: [
      { sale: 10, month: "January" },
      { sale: 95, month: "February" },
      { sale: 87, month: "March" },
      { sale: 88, month: "May" },
      { sale: 65, month: "June" },
      { sale: 90, month: "August" },
    ],
    series: [{ name: "sale", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <LineChart data={chart.data} responsive>
        <CartesianGrid stroke={chart.color("border")} vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
          stroke={chart.color("border")}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          stroke={chart.color("border")}
        />
        <Tooltip
          animationDuration={100}
          cursor={false}
          content={<Chart.Tooltip />}
        />
        {chart.series.map((item) => (
          <Line
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </Chart.Root>
  )
}
```

## Chart.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<T>` | Chart instance from `useChart` |
| `maxH` | `string` | Max height token |

## Line Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Data key (use `chart.key(name)`) |
| `stroke` | `string` | Line color (use `chart.color(token)`) |
| `strokeWidth` | `number` | Line thickness in pixels |
| `strokeDasharray` | `string` | Dash pattern for dashed lines |
| `dot` | `boolean \| object` | Show/configure data point dots |
| `type` | `string` | Interpolation type (e.g. `"monotone"`, `"linear"`) |
| `connectNulls` | `boolean` | Connect line across null/undefined values |
| `yAxisId` | `string` | Y-axis identifier for biaxial charts |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## Notes

- Set `dot={false}` for a clean line without data point markers.
- For multiple series on separate Y-axes, assign different `yAxisId` values and render two `<YAxis>` components.
- Built on Recharts [LineChart](https://recharts.org/en-US/api/LineChart).

## Related

- [useChart](./use-chart.md)
- [Axes](./axes.md)
- [Cartesian Grid](./cartesian-grid.md)
- [Area Chart](./area-chart.md)
- [Sparkline](./sparkline.md)
