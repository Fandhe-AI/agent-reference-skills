# Installation

Install the Chakra UI Charts package and its peer dependency recharts.

## Install

```bash
npm i @chakra-ui/charts recharts
```

## Basic Setup

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export const MyChart = () => {
  const chart = useChart({
    data: [
      { value: 60, category: "A" },
      { value: 45, category: "B" },
    ],
    series: [{ name: "value", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} responsive>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key("category")} />
        <YAxis axisLine={false} tickLine={false} />
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

## Notes

- Charts are built on top of [Recharts](https://recharts.org). For advanced usage, refer to the Recharts documentation.
- The `Chart` namespace component (`Chart.Root`, `Chart.Tooltip`, `Chart.Legend`, etc.) integrates with Chakra UI's theming system.
- Charts automatically support light/dark mode through Chakra UI's color tokens.

## Related

- [useChart](./use-chart.md)
- [Area Chart](./area-chart.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
