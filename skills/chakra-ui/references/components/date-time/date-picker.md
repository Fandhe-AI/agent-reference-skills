# DatePicker

A date picker component with a popover calendar. Composed of `DatePicker.Root`, `DatePicker.Control`, `DatePicker.Input`, `DatePicker.Trigger`, `DatePicker.Positioner`, `DatePicker.Content`, `DatePicker.View`, `DatePicker.ViewControl`, `DatePicker.Table`, and more.

## Import

```tsx
import { DatePicker } from "@chakra-ui/react"
```

## Usage

```tsx
<DatePicker.Root>
  <DatePicker.Label>Select Date</DatePicker.Label>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.Trigger />
    <DatePicker.ClearTrigger />
  </DatePicker.Control>
  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.View view="day">
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger />
          <DatePicker.ViewTrigger />
          <DatePicker.NextTrigger />
        </DatePicker.ViewControl>
        <DatePicker.Table>
          <DatePicker.TableHead>
            <DatePicker.TableRow>
              {/* Day headers */}
            </DatePicker.TableRow>
          </DatePicker.TableHead>
          <DatePicker.TableBody>
            {/* Day cells */}
          </DatePicker.TableBody>
        </DatePicker.Table>
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Component size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `selectionMode` | `"single" \| "multiple" \| "range"` | `"single"` | Date selection mode |
| `value` | `DateValue[]` | — | Controlled selected date(s) |
| `defaultValue` | `DateValue[]` | — | Initial selected date(s) (uncontrolled) |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state (uncontrolled) |
| `min` | `DateValue` | — | Minimum selectable date |
| `max` | `DateValue` | — | Maximum selectable date |
| `disabled` | `boolean` | — | Disables the date picker |
| `readOnly` | `boolean` | — | Makes the date picker read-only |
| `locale` | `string` | `"en-US"` | BCP 47 locale string |
| `timeZone` | `string` | `"UTC"` | Time zone |
| `closeOnSelect` | `boolean` | `true` | Closes after date selection |
| `fixedWeeks` | `boolean` | — | Always show 6 weeks in the calendar |
| `numOfMonths` | `number` | — | Number of months to display |
| `inline` | `boolean` | — | Renders calendar inline (no popover) |
| `defaultView` | `"day" \| "month" \| "year"` | `"day"` | Default calendar view |
| `isDateUnavailable` | `(date, locale) => boolean` | — | Function to mark dates unavailable |
| `onValueChange` | `(details) => void` | — | Called when value changes |
| `onOpenChange` | `(details) => void` | — | Called when open state changes |
| `onViewChange` | `(details) => void` | — | Called when view changes |
| `format` | `(date, details) => string` | — | Custom date format function |
| `parse` | `(value, details) => DateValue` | — | Custom date parse function |

## Notes

- Uses `@internationalized/date` `DateValue` type for date values
- `selectionMode="range"` enables date range selection
- Use `DatePicker.PresetTrigger` for quick date presets (today, last week, etc.)
- `inline` prop renders without the popover trigger, useful for dedicated date picker UIs
- `lazyMount` and `unmountOnExit` control popover mounting behavior

## Related

- [Calendar](./calendar.md)
