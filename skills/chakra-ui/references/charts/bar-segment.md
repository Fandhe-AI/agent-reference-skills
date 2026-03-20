# Bar Segment

Display data as segments within a single horizontal bar, showing proportions and part-to-whole relationships between values.

## Import

```tsx
import { BarSegment, useChart } from "@chakra-ui/charts"
```

## Usage

```tsx
"use client"

import { BarSegment, useChart } from "@chakra-ui/charts"

export const BarSegmentBasic = () => {
  const chart = useChart({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google", value: 500000, color: "teal.solid" },
      { name: "Direct", value: 100000, color: "blue.solid" },
      { name: "Bing",   value: 200000, color: "orange.solid" },
      { name: "Yandex", value: 100000, color: "purple.solid" },
    ],
  })

  return (
    <BarSegment.Root chart={chart}>
      <BarSegment.Content>
        <BarSegment.Value />
        <BarSegment.Bar />
        <BarSegment.Label />
      </BarSegment.Content>
    </BarSegment.Root>
  )
}
```

## With Tooltip and Legend

```tsx
<BarSegment.Root chart={chart}>
  <BarSegment.Content>
    <BarSegment.Bar tooltip />
  </BarSegment.Content>
  <BarSegment.Legend showPercent />
</BarSegment.Root>
```

## Data Shape

Each item in `data` must include `name`, `value`, and `color`:

```tsx
{ name: string; value: number; color: ChartColor }
```

## Components

| Component | Description |
|-----------|-------------|
| `BarSegment.Root` | Container; accepts `chart` and optional `barSize` token |
| `BarSegment.Content` | Horizontal bar container; handles mouse leave |
| `BarSegment.Bar` | Colored segment proportional to value; accepts `tooltip` prop |
| `BarSegment.Value` | Displays formatted value above each segment |
| `BarSegment.Label` | Displays the name below each segment |
| `BarSegment.Legend` | Color swatch list; accepts `showPercent` and `showValue` props |
| `BarSegment.Reference` | Absolute-positioned reference line with label |
| `BarSegment.Tooltip` | Context-aware popup on segment hover |

## BarSegment.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<T>` | Chart instance from `useChart` |
| `barSize` | `string` | Height token for the bar (default: `"2.5rem"`) |

## BarSegment.Bar Props

| Prop | Type | Description |
|------|------|-------------|
| `tooltip` | `boolean` | Show tooltip on hover |

## BarSegment.Legend Props

| Prop | Type | Description |
|------|------|-------------|
| `showPercent` | `boolean` | Show percentage alongside each legend item |
| `showValue` | `boolean` | Show raw value alongside each legend item |

## Notes

- Segment widths are calculated using `chart.getValuePercent()` against the `value` key.
- Each data item must include a `color` field referencing a Chakra color token.
- `BarSegment.Reference` renders an absolute-positioned vertical line at a given position.

## Related

- [useChart](./use-chart.md)
- [Bar Chart](./bar-chart.md)
- [Bar List](./bar-list.md)
