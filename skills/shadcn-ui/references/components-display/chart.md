---
source: https://ui.shadcn.com/docs/components/base/chart
---

# Chart

Beautiful charts built using Recharts. Copy and paste into your apps.

## Signature / Usage

```bash
npx shadcn@latest add chart
```

Manual install dependency:

```bash
npm install recharts
```

Add the chart colors to your CSS:

```css
@layer base {
  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}
```

First chart:

```tsx
"use client"

import { Bar, BarChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
} satisfies ChartConfig

export function ChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

Tooltip and legend:

```tsx
import {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

<ChartTooltip content={<ChartTooltipContent />} />
<ChartLegend content={<ChartLegendContent nameKey="browser" />} />
```

## Notes

- Recharts is used directly and is not wrapped; you compose charts from Recharts components and bring in `ChartTooltip` etc. only where needed.
- Set a `min-h-[VALUE]` (or height / `aspect-*`) on `ChartContainer`; it is required for the chart to be responsive.
- `accessibilityLayer` on the chart adds keyboard access and screen reader support.
- Updating to Recharts v3: use `var(--chart-1)` instead of `hsl(var(--chart-1))`; use `ChartTooltip.defaultIndex` for initial tooltip state only; remove `layout` from `<Bar>` when `<BarChart>` already defines it.
- Legend colors are referenced automatically from the chart config; use `nameKey` on `ChartLegendContent` for custom names.
- Radix variant: https://ui.shadcn.com/docs/components/radix/chart ; React Aria variant: https://ui.shadcn.com/docs/components/aria/chart
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [card](./card.md)
- [table](./table.md)
