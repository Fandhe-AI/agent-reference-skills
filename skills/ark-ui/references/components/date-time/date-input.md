# Date Input

A segment-based date input that allows users to enter dates by navigating individual date parts (day, month, year, hour, minute, second).

## Signature / Usage

```tsx
import { DateInput } from '@ark-ui/react'

export const Basic = () => (
  <DateInput.Root>
    <DateInput.Label>Select Date</DateInput.Label>
    <DateInput.Control>
      <DateInput.SegmentGroup>
        <DateInput.Segment type="day" />
        <DateInput.Segment type="month" />
        <DateInput.Segment type="year" />
      </DateInput.SegmentGroup>
    </DateInput.Control>
    <DateInput.HiddenInput />
  </DateInput.Root>
)
```

## Anatomy

| Part | Description |
| --- | --- |
| `Root` | Container element, provides context |
| `Label` | Associated label |
| `Control` | Wrapper around the segment group |
| `SegmentGroup` | Groups individual date segments |
| `Segment` | A single editable date/time part (`day`, `month`, `year`, `hour`, `minute`, `second`, etc.) |
| `HiddenInput` | Native hidden input for form submission |

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `DateValue \| DateValue[]` | — | Controlled selected date(s) |
| `defaultValue` | `DateValue \| DateValue[]` | — | Initial date, typically created with `parseDate()` |
| `onValueChange` | `(details) => void` | — | Callback when the date changes |
| `min` | `DateValue` | — | Minimum selectable date |
| `max` | `DateValue` | — | Maximum selectable date |
| `granularity` | `'day' \| 'hour' \| 'minute' \| 'second'` | `'day'` | Controls which segments are displayed |
| `locale` | `string` | `'en-US'` | Language and regional formatting |
| `disabled` | `boolean` | — | Prevents user interaction |
| `readOnly` | `boolean` | — | Non-editable but focusable |
| `invalid` | `boolean` | — | Indicates error state |
| `selectionMode` | `'single' \| 'range'` | `'single'` | Set to `range` for date range input |
| `shouldForceLeadingZeros` | `boolean` | — | Pad numeric segments with leading zeros |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Set to `rtl` for right-to-left support |
| `hourCycle` | `12 \| 24` | — | Switch between 12/24 hour formats |
| `placeholder` | `string` | — | Custom placeholder text |
| `name` | `string` | — | Form field name |

## Notes

- Follows the Spinbutton WAI-ARIA design pattern for accessibility.
- Date values use `@internationalized/date`; `defaultValue` is typically built with `parseDate()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Date Picker](./date-picker.md)
