# Date Picker

A calendar-based component for selecting dates, supporting single, multiple, and range selection with day/month/year views.

## Signature / Usage

```tsx
import { DatePicker } from '@ark-ui/react'

export const Basic = () => (
  <DatePicker.Root>
    <DatePicker.Label>Select Date</DatePicker.Label>
    <DatePicker.Control>
      <DatePicker.Input />
      <DatePicker.Trigger>Open</DatePicker.Trigger>
      <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
    </DatePicker.Control>
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.View view="day">
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger>
              <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <DatePicker.Table>
            <DatePicker.TableHead>
              <DatePicker.TableRow>
                {/* week days */}
              </DatePicker.TableRow>
            </DatePicker.TableHead>
            <DatePicker.TableBody>
              {/* weeks */}
              <DatePicker.TableRow>
                <DatePicker.TableCell>
                  <DatePicker.TableCellTrigger>1</DatePicker.TableCellTrigger>
                </DatePicker.TableCell>
              </DatePicker.TableRow>
            </DatePicker.TableBody>
          </DatePicker.Table>
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </DatePicker.Root>
)
```

## Anatomy

| Part | Description |
| --- | --- |
| `Root` | Container element, provides context |
| `Label` | Associated label |
| `Control` | Input wrapper |
| `Input` | Text input field |
| `Trigger` | Opens the calendar popup |
| `ClearTrigger` | Clears the selection |
| `Positioner` | Positioning container for the popup |
| `Content` | Calendar popup wrapper |
| `View` | Calendar display area for a given `view` (`day`/`month`/`year`) |
| `ViewControl` | Navigation controls container |
| `PrevTrigger` / `NextTrigger` | Navigate to previous/next month, year, or decade |
| `ViewTrigger` | Switches between day/month/year views |
| `RangeText` | Displays the visible date range |
| `Table` / `TableHead` / `TableBody` / `TableRow` / `TableCell` | Calendar grid structure |
| `TableHeader` | Individual weekday header cell (`<th>`); distinct from `TableHead`, which is the header row container |
| `TableCellTrigger` | Individual selectable date/month/year cell |
| `MonthSelect` / `YearSelect` | Dropdown navigators |
| `PresetTrigger` | Quick-select preset ranges |
| `WeekNumberCell` / `WeekNumberHeaderCell` | Week number column |
| `ValueText` | Displays the selected value |

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `DateValue[]` | — | Controlled selected date(s) |
| `defaultValue` | `DateValue[]` | — | Initial selected date(s) |
| `onValueChange` | `(details) => void` | — | Selection change callback |
| `view` | `'day' \| 'month' \| 'year'` | — | Controlled calendar view |
| `defaultView` | `'day' \| 'month' \| 'year'` | `'day'` | Initial calendar view |
| `onViewChange` | `(details) => void` | — | View change callback |
| `focusedValue` | `DateValue` | — | Controlled focused date |
| `defaultFocusedValue` | `DateValue` | — | Initial focused date |
| `onFocusChange` | `(details) => void` | — | Focus change callback |
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection behavior |
| `minView` | `'day' \| 'month' \| 'year'` | `'day'` | Minimum view level |
| `maxView` | `'day' \| 'month' \| 'year'` | `'year'` | Maximum view level |
| `min` | `DateValue` | — | Minimum selectable date |
| `max` | `DateValue` | — | Maximum selectable date |
| `maxSelectedDates` | `number` | — | Limit for multiple selection mode |
| `locale` | `string` | `'en-US'` | BCP 47 language tag |
| `startOfWeek` | `number` | — | First day of week (0=Sunday, 1=Monday, ...) |
| `timeZone` | `string` | `'UTC'` | Timezone setting |
| `numOfMonths` | `number` | — | Number of months displayed simultaneously |
| `fixedWeeks` | `boolean` | — | Always render 6 weeks per month |
| `format` | `(date, details) => string` | — | Custom date formatting function |
| `parse` | `(value, details) => DateValue \| undefined` | — | Custom parsing logic |
| `isDateUnavailable` | `(date, locale) => boolean` | — | Marks dates as unavailable |
| `closeOnSelect` | `boolean` | `true` | Auto-close popup after selection |
| `disabled` | `boolean` | — | Disables interaction |
| `readOnly` | `boolean` | — | Read-only mode |
| `invalid` | `boolean` | — | Invalid state |
| `required` | `boolean` | — | Marks field as required |
| `name` | `string` | — | Form submission field name |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `onOpenChange` | `(details) => void` | — | Open state change callback |
| `openOnClick` | `boolean` | `false` | Open popup on input click |
| `showWeekNumbers` | `boolean` | — | Show week number column |
| `outsideDaySelectable` | `boolean` | `false` | Allow selecting adjacent-month dates |
| `inline` | `boolean` | — | Render calendar inline, without popup |
| `positioning` | `PositioningOptions` | — | Popup positioning configuration (Floating UI based) |
| `id` | `string` | — | Unique identifier |
| `ids` | `Partial<Record<string, string>>` | — | Custom IDs for sub-parts |

### Context values

`view`, `selectionMode`, `weeks`, `weekDays`, `visibleRange`, `value`, `valueAsDate`, `valueAsString`, `focusedValue`, `focusedValueAsDate`, `focusedValueAsString`, `focused`, `open`, `disabled`, `invalid`, `readOnly`, `inline` are exposed via context, along with methods `selectToday()`, `setValue()`, `clearValue()`, `setView()`, `goToNext()`, `goToPrev()`, `format()`, `getOffset()`, `getDayTableCellState()`, `getMonthTableCellState()`, `getYearTableCellState()`.

## Notes

- Date values use `@internationalized/date` (`CalendarDate`, `CalendarDateTime`); use `parseDate()` to convert strings to `DateValue`.
- `positioning` follows the shared Floating-UI-based positioning options used across popup components (Combobox, Menu, Select, etc.).
- Data attributes: `[data-scope="date-picker"]`, `[data-part]`, `[data-state="open"|"closed"]`, `[data-disabled]`, `[data-readonly]`, `[data-view]`, `[data-invalid]`.
- Keyboard: Arrow keys navigate dates, Home/End jump to month boundaries, PageUp/PageDown move month, Enter selects, Escape closes.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Date Input](./date-input.md)
- [Timer](./timer.md)
