# Sparkline

A small, compact chart without axes or labels that shows the general shape of data variation, typically used inline with text or inside dashboard cards.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Area, AreaChart } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Area, AreaChart } from "recharts"

export const SparklineBasic = () => {
  const chart = useChart({
    data: [
      { value: 10 },
      { value: 16 },
      { value: 19 },
      { value: 15 },
      { value: 12 },
      { value: 15 },
      { value: 10 },
      { value: 18 },
    ],
    series: [{ name: "value", color: "teal.solid" }],
  })

  return (
    <Chart.Root width="28" height="12" chart={chart}>
      <AreaChart data={chart.data} responsive>
        {chart.series.map((item) => (
          <Area
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
            stroke={chart.color(item.color)}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </Chart.Root>
  )
}
```

## Bar Sparkline

A sparkline can also use `BarChart` for a bar-based compact chart:

```tsx
import { Bar, BarChart } from "recharts"

<Chart.Root width="28" height="12" chart={chart}>
  <BarChart data={chart.data} responsive>
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
```

## Chart.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<T>` | Chart instance from `useChart` |
| `width` | `string \| number` | Fixed width (e.g. `"28"` maps to Chakra size token) |
| `height` | `string \| number` | Fixed height (e.g. `"12"` maps to Chakra size token) |

## Notes

- Sparklines intentionally omit axes, grid, tooltip, and legend components.
- Use `Chart.Root` with fixed `width` and `height` (Chakra size tokens) rather than `maxH` for inline use.
- The underlying chart type can be `AreaChart`, `BarChart`, or `LineChart` depending on the desired visual.
- Suitable for embedding in tables, stat cards, or any space-constrained context.

## Related

- [useChart](./use-chart.md)
- [Area Chart](./area-chart.md)
- [Line Chart](./line-chart.md)
- [Bar Chart](./bar-chart.md)
