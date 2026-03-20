# Radar Chart

Display multivariate data as a two-dimensional chart on axes starting from the same point, useful for comparing multiple categories.

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"

export const RadarChartBasic = () => {
  const chart = useChart({
    data: [
      { windows: 110, month: "January" },
      { windows: 130, month: "February" },
      { windows: 110, month: "March" },
      { windows: 90,  month: "May" },
      { windows: 75,  month: "June" },
    ],
    series: [{ name: "windows", color: "teal.solid" }],
  })

  return (
    <Chart.Root maxW="sm" chart={chart} mx="auto">
      <RadarChart data={chart.data} responsive>
        <PolarGrid stroke={chart.color("border")} />
        <PolarAngleAxis dataKey={chart.key("month")} />
        <PolarRadiusAxis />
        {chart.series.map((item) => (
          <Radar
            isAnimationActive={false}
            key={item.name}
            name={item.name}
            dataKey={chart.key(item.name)}
            stroke={chart.color(item.color)}
            fill={chart.color(item.color)}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </Chart.Root>
  )
}
```

## Radar Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Data key (use `chart.key(name)`) |
| `name` | `string` | Series name for tooltip/legend |
| `stroke` | `string` | Outline color (use `chart.color(token)`) |
| `fill` | `string` | Fill color (use `chart.color(token)`) |
| `fillOpacity` | `number` | Opacity of the filled polygon |
| `dot` | `boolean \| object` | Show data point dots |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## PolarGrid Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `stroke` | `string` | Grid line color |
| `gridType` | `"polygon" \| "circle"` | Shape of grid lines |

## PolarAngleAxis Props (Recharts)

| Prop | Type | Description |
|------|------|-------------|
| `dataKey` | `string` | Key for axis labels (use `chart.key()`) |
| `tick` | `boolean \| object` | Configure tick styling |

## Notes

- `PolarAngleAxis` defines the category labels around the perimeter.
- `PolarRadiusAxis` renders the radial scale lines; hide it with `tick={false}` for a cleaner look.
- Multiple `<Radar>` elements can be rendered for comparative visualization.
- Built on Recharts [RadarChart](https://recharts.org/en-US/api/RadarChart).

## Related

- [useChart](./use-chart.md)
- [Area Chart](./area-chart.md)
- [Line Chart](./line-chart.md)
