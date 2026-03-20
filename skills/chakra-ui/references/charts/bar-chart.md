# Bar Chart

Display categorical data using rectangular bars of varying heights or lengths.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export const BarChartBasic = () => {
  const chart = useChart({
    data: [
      { allocation: 60, type: "Stock" },
      { allocation: 45, type: "Crypto" },
      { allocation: 12, type: "ETF" },
      { allocation: 4,  type: "Cash" },
    ],
    series: [{ name: "allocation", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} responsive>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("type")} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  )
}
```

## Chart.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<T>` | Chart instance from `useChart` |
| `maxH` | `string` | Max height token (e.g. `"sm"`, `"md"`) |

## Bar Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Data key (use `chart.key(name)`) |
| `fill` | `string` | Bar fill color (use `chart.color(token)`) |
| `stackId` | `string` | Stack group for stacked bars |
| `radius` | `number \| [number,number,number,number]` | Corner radius |
| `barSize` | `number` | Fixed bar width in pixels |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |
| `label` | `boolean \| object` | Show value labels on bars |

## Notes

- For horizontal bars, swap `XAxis` and `YAxis` and add `layout="horizontal"` to `<BarChart>`.
- For stacked bars, add the same `stackId` to all `<Bar>` elements.
- Built on Recharts [BarChart](https://recharts.org/en-US/api/BarChart).

## Related

- [useChart](./use-chart.md)
- [Axes](./axes.md)
- [Cartesian Grid](./cartesian-grid.md)
- [Bar List](./bar-list.md)
- [Bar Segment](./bar-segment.md)
