# Area Chart

Display quantitative data by filling the area between the line and axis, showing trends and patterns over time.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts"

export const AreaChartBasic = () => {
  const chart = useChart({
    data: [
      { windows: 186, mac: 80, linux: 120, month: "January" },
      { windows: 165, mac: 95, linux: 110, month: "February" },
      { windows: 190, mac: 87, linux: 125, month: "March" },
      { windows: 195, mac: 88, linux: 130, month: "May" },
      { windows: 182, mac: 98, linux: 122, month: "June" },
    ],
    series: [
      { name: "windows", color: "teal.solid" },
      { name: "mac", color: "purple.solid" },
      { name: "linux", color: "blue.solid" },
    ],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <AreaChart data={chart.data} responsive>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey={chart.key("month")}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip />}
        />
        <Legend content={<Chart.Legend />} />
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            stackId="a"
          />
        ))}
      </AreaChart>
    </Chart.Root>
  )
}
```

## Chart.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<T>` | Chart instance from `useChart` |
| `maxH` | `string` | Max height token (e.g. `"sm"`, `"md"`) |
| `width` | `string \| number` | Fixed width |
| `height` | `string \| number` | Fixed height |

## Area Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Data key (use `chart.key(name)`) |
| `fill` | `string` | Fill color (use `chart.color(token)`) |
| `fillOpacity` | `number` | Opacity of the filled area |
| `stroke` | `string` | Line stroke color |
| `strokeWidth` | `number` | Line stroke width |
| `stackId` | `string` | Stack group; same id = stacked areas |
| `type` | `string` | Interpolation type, e.g. `"monotone"` |
| `dot` | `boolean \| object` | Show/configure data point dots |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## Notes

- Use `stackId="a"` on all `<Area>` elements to create a stacked area chart.
- Use `Chart.Tooltip` and `Chart.Legend` for themed tooltip and legend.
- For gradient fills, use `Chart.Gradient` inside an SVG `<defs>` block and reference its `id` in the `fill` prop.
- Built on Recharts [AreaChart](https://recharts.org/en-US/api/AreaChart).

## Related

- [useChart](./use-chart.md)
- [Axes](./axes.md)
- [Cartesian Grid](./cartesian-grid.md)
- [Line Chart](./line-chart.md)
- [Sparkline](./sparkline.md)
