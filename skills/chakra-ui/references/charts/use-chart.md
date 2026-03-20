# useChart

A hook that provides utilities to manage and format data for charts, including series management, data aggregation, number/date formatting, and design token access.

## Import

```tsx
import { useChart } from "@chakra-ui/charts"
```

## Signature

```tsx
function useChart<T = any>(props: UseChartProps<T>): UseChartReturn<T>
```

## Usage

```tsx
const chart = useChart({
  data: [
    { windows: 186, mac: 80, linux: 120, month: "January" },
    { windows: 165, mac: 95, linux: 110, month: "February" },
  ],
  series: [
    { name: "windows", color: "teal.solid" },
    { name: "mac", color: "purple.solid" },
    { name: "linux", color: "blue.solid" },
  ],
  sort: { by: "windows", direction: "desc" },
})
```

## UseChartProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | — | Array of data objects to visualize |
| `series` | `SeriesItem<T>[]` | `[]` | Series configuration with name and color |
| `sort` | `{ by: keyof T; direction: "asc" \| "desc" }` | — | Optional sort configuration |

## SeriesItem

| Prop | Type | Description |
|------|------|-------------|
| `name` | `keyof T` | Data key for this series |
| `color` | `ChartColor` | Chakra color token or CSS color |
| `icon` | `React.ReactNode` | Optional icon for legend |
| `label` | `React.ReactNode` | Optional custom label |
| `stackId` | `string` | Stack group identifier for stacked charts |
| `yAxisId` | `string` | Y-axis identifier for biaxial charts |
| `strokeDasharray` | `string` | SVG stroke-dasharray for dashed lines |
| `id` | `string` | Unique identifier |

## Return Value (UseChartReturn)

### Series & Data

| Method/Property | Description |
|-----------------|-------------|
| `data` | The (optionally sorted) data array |
| `series` | The series configuration array |
| `key(name)` | Returns a typesafe data key accessor |
| `getKey(seriesName)` | Returns a typesafe accessor for a given series item |

### Aggregation

| Method | Description |
|--------|-------------|
| `getTotal(key)` | Sum of all values for the given key |
| `getMin(key)` | Minimum value in the dataset for the given key |
| `getMax(key)` | Maximum value in the dataset for the given key |
| `getValuePercent(key, value)` | Percentage of value relative to the dataset total |

### Formatting

| Method | Description |
|--------|-------------|
| `formatNumber(options)` | Formats numbers using `Intl.NumberFormat` options |
| `formatDate(options)` | Formats date strings using locale and `Intl.DateTimeFormat` options |

### Design Tokens

| Method | Description |
|--------|-------------|
| `color(token)` | Resolves a Chakra UI color token to a CSS value |
| `size(token)` | Resolves a Chakra UI size token |
| `spacing(token)` | Resolves a Chakra UI spacing token |

### State

| Property/Method | Description |
|-----------------|-------------|
| `highlightedSeries` | Currently highlighted series name (for legend interactions) |
| `setHighlightedSeries(name)` | Sets the highlighted series |

## Notes

- `chart.key(name)` should be used instead of raw string keys to maintain type safety.
- `chart.color(token)` resolves Chakra color tokens like `"teal.solid"` or `"border.muted"` at runtime.
- Pass the `chart` instance to `Chart.Root` via the `chart` prop to share context with child components.

## Related

- [Installation](./installation.md)
- [Area Chart](./area-chart.md)
- [Bar Chart](./bar-chart.md)
- [Line Chart](./line-chart.md)
