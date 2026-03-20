# Bar List

Display categorical data with horizontal bars, showing comparisons between different categories or items.

## Import

```tsx
import { BarList, type BarListData, useChart } from "@chakra-ui/charts"
```

## Usage

```tsx
"use client"

import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

export const BarListBasic = () => {
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Google",  value: 1200000 },
      { name: "Direct",  value: 100000 },
      { name: "Bing",    value: 200000 },
      { name: "Yahoo",   value: 20000 },
      { name: "ChatGPT", value: 1345000 },
      { name: "Github",  value: 100000 },
      { name: "Yandex",  value: 100000 },
    ],
    series: [{ name: "name", color: "teal.subtle" }],
  })

  return (
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Bar />
        <BarList.Value />
      </BarList.Content>
    </BarList.Root>
  )
}
```

## BarListData

```tsx
interface BarListData {
  name: string
  value: number
  href?: string
}
```

## Components

| Component | Description |
|-----------|-------------|
| `BarList.Root` | Container; accepts `chart` and optional `barSize` token |
| `BarList.Content` | Flex layout wrapper for bar rows |
| `BarList.Bar` | Renders each horizontal bar with proportional width; accepts `tooltip` prop |
| `BarList.Value` | Right-aligned column showing formatted values |
| `BarList.Label` | Section header; accepts `title` and `titleAlignment` props |
| `BarList.Tooltip` | Positioned tooltip shown on bar hover |

## BarList.Root Props

| Prop | Type | Description |
|------|------|-------------|
| `chart` | `UseChartReturn<BarListData>` | Chart instance from `useChart` |
| `barSize` | `string` | Height token for individual bars (default: `"2.5rem"`) |

## BarList.Bar Props

| Prop | Type | Description |
|------|------|-------------|
| `tooltip` | `boolean \| ((item: BarListData) => React.ReactNode)` | Show tooltip on hover |

## BarList.Label Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Column header text |
| `titleAlignment` | `"start" \| "end"` | Alignment of the header text |

## Notes

- Data is typed with `BarListData` (`name`, `value`, optional `href`).
- Bar widths are calculated automatically using `chart.getValuePercent()`.
- `sort` in `useChart` can pre-sort data descending by value.
- Values are formatted using compact notation (`chart.formatNumber({ notation: "compact" })`).

## Related

- [useChart](./use-chart.md)
- [Bar Chart](./bar-chart.md)
- [Bar Segment](./bar-segment.md)
