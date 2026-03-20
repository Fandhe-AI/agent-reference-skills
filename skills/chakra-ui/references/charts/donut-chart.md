# Donut Chart

Display data as segments of a circular chart with a hollow center (donut shape).

## Import

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector, Tooltip } from "recharts"
```

## Usage

```tsx
"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Pie, PieChart, Sector, Tooltip } from "recharts"

export const DonutChartBasic = () => {
  const chart = useChart({
    data: [
      { name: "windows", value: 400, color: "blue.solid" },
      { name: "mac",     value: 300, color: "orange.solid" },
      { name: "linux",   value: 300, color: "pink.solid" },
      { name: "other",   value: 200, color: "green.solid" },
    ],
  })

  return (
    <Chart.Root boxSize="200px" chart={chart} mx="auto">
      <PieChart responsive>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={80}
          outerRadius={100}
          isAnimationActive={false}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          shape={(props) => (
            <Sector {...props} fill={chart.color(props.payload!.color)} />
          )}
        />
      </PieChart>
    </Chart.Root>
  )
}
```

## With Centered Text

```tsx
<PieChart responsive>
  <Pie
    innerRadius={80}
    outerRadius={100}
    data={chart.data}
    dataKey={chart.key("value")}
    nameKey="name"
    shape={(props) => (
      <Sector {...props} fill={chart.color(props.payload!.color)} />
    )}
  >
    <Label
      content={
        <Chart.RadialText
          viewBox={viewBox}
          title={chart.getTotal("value")}
          description="Total"
        />
      }
    />
  </Pie>
</PieChart>
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
| `innerRadius` | `number \| string` | Inner radius; creates the donut hole |
| `outerRadius` | `number \| string` | Outer radius of the donut |
| `startAngle` | `number` | Starting angle in degrees (default: `0`) |
| `endAngle` | `number` | Ending angle in degrees (default: `360`) |
| `paddingAngle` | `number` | Gap between segments in degrees |
| `shape` | `(props) => ReactElement` | Custom segment renderer |
| `isAnimationActive` | `boolean` | Enable/disable entry animation |

## Chart.RadialText Props

| Prop | Type | Description |
|------|------|-------------|
| `viewBox` | `ViewBox` | Passed from recharts Label `content` callback |
| `title` | `React.ReactNode` | Large center text |
| `description` | `React.ReactNode` | Smaller description below title |
| `gap` | `number` | Vertical gap between title and description |
| `fontSize` | `string` | Font size for the title |

## Notes

- The donut hole is created by setting `innerRadius` greater than `0`.
- Use a custom `shape` prop with `<Sector>` to apply per-segment colors from data.
- `Chart.RadialText` renders a centered label inside the donut hole.
- Built on Recharts [PieChart](https://recharts.org/en-US/api/PieChart).

## Related

- [useChart](./use-chart.md)
- [Pie Chart](./pie-chart.md)
