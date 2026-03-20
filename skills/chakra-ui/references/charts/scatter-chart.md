# Scatter Chart

Display the relationship between two numerical variables as a collection of points plotted on X and Y axes.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"

export const ScatterChartBasic = () => {
  const chart = useChart({
    data: [
      { temperature: 14.2, sales: 215 },
      { temperature: 16.4, sales: 325 },
      { temperature: 18.5, sales: 406 },
      { temperature: 22.1, sales: 522 },
      { temperature: 25.1, sales: 614 },
      { temperature: 23.4, sales: 544 },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <ScatterChart responsive>
        <XAxis
          type="number"
          dataKey={chart.key("temperature")}
          stroke={chart.color("border")}
          tickFormatter={(value) => `${value}°C`}
          domain={[10, "dataMax + 3"]}
        />
        <YAxis
          type="number"
          dataKey={chart.key("sales")}
          stroke={chart.color("border")}
        />
        {chart.series.map((series, index) => (
          <Scatter
            name={series.name?.toString()}
            key={index}
            data={chart.data}
            fill={chart.color(series.color)}
            isAnimationActive={false}
          />
        ))}
      </ScatterChart>
    </Chart.Root>
  )
}
```

## Scatter Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `data` | `object[]` | Data points array (use `chart.data`) |
| `name` | `string` | Series name for tooltip/legend |
| `fill` | `string` | Dot fill color (use `chart.color(token)`) |
| `line` | `boolean \| object` | Connect dots with a line |
| `shape` | `string \| ReactElement` | Custom dot shape |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## XAxis / YAxis for Scatter

Both axes require `type="number"` for scatter charts, and the `dataKey` on each axis maps to the respective variable:

```tsx
<XAxis type="number" dataKey={chart.key("temperature")} />
<YAxis type="number" dataKey={chart.key("sales")} />
```

## Notes

- Unlike other cartesian charts, `<Scatter>` receives `data` directly rather than getting it from the parent chart.
- Set `type="number"` on both `XAxis` and `YAxis` for continuous numeric scales.
- Use `domain` on axes to control the visible range, e.g. `[10, "dataMax + 3"]`.
- Built on Recharts [ScatterChart](https://recharts.org/en-US/api/ScatterChart).

## Related

- [useChart](./use-chart.md)
- [Axes](./axes.md)
- [Cartesian Grid](./cartesian-grid.md)
- [Line Chart](./line-chart.md)
