# DateInput

Used to enter a specific date using segmented keyboard input. Composed of `DateInput.Root`, `DateInput.Label`, `DateInput.Control`, `DateInput.SegmentGroup`, `DateInput.Segment`, and `DateInput.HiddenInput`.

## Usage

```tsx
import { DateInput, useDateInput } from "@chakra-ui/react"

const dateInput = useDateInput()

<DateInput.RootProvider value={dateInput}>
  <DateInput.Label />
  <DateInput.Control>
    <DateInput.SegmentGroup>
      {dateInput.getSegments().map((segment, index) => (
        <DateInput.Segment key={index} segment={segment} />
      ))}
    </DateInput.SegmentGroup>
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.RootProvider>
```

Shortcut: `DateInput.Segments` renders a segment group containing every segment produced by the current `granularity` and `formatter`.

```tsx
<DateInput.Root maxW="sm">
  <DateInput.Label>Date of birth</DateInput.Label>
  <DateInput.Control>
    <DateInput.Segments />
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
```

Time-only input via `granularity` and `formatter`:

```tsx
const formatter = new DateFormatter("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
})

<DateInput.Root granularity="minute" formatter={formatter} maxW="sm">
  <DateInput.Label>Appointment time</DateInput.Label>
  <DateInput.Control>
    <DateInput.Segments />
  </DateInput.Control>
  <DateInput.HiddenInput />
</DateInput.Root>
```

## Options / Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Component size |
| `variant` | `"outline" \| "subtle" \| "flushed"` | `"outline"` | Component variant |
| `colorPalette` | `"gray" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "blue" \| "cyan" \| "purple" \| "pink"` | `"gray"` | Color palette |
| `selectionMode` | `SelectionMode` (`"single"` \| `"range"`) | `"single"` | `single` - one date; `range` - start and end dates |
| `value` | `DateValue[]` | — | Controlled selected date(s) |
| `defaultValue` | `DateValue[]` | — | Initial selected date(s) (uncontrolled) |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Called when the value changes |
| `placeholderValue` | `DateValue` | — | Controlled placeholder date |
| `defaultPlaceholderValue` | `DateValue` | — | Initial placeholder date |
| `onPlaceholderChange` | `(details: PlaceholderChangeDetails) => void` | — | Called when the placeholder changes |
| `onFocusChange` | `(details: FocusChangeDetails) => void` | — | Called when the input gains or loses focus |
| `min` | `DateValue` | — | Minimum date |
| `max` | `DateValue` | — | Maximum date |
| `isDateUnavailable` | `(date: DateValue, locale: string) => boolean` | — | Marks a date unavailable; a committed match makes the input invalid |
| `granularity` | `DateGranularity` | `"day"` | Smallest unit displayed |
| `formatter` | `DateFormatter` | — | Date formatter to use |
| `format` | `(date: DateValue, details: FormatDateDetails) => string` | — | Converts a `DateValue` to a string |
| `allSegments` | `Partial<{ year, month, day, hour, minute, second, dayPeriod, era, literal, timeZoneName, weekday, unknown, fractionalSecond: boolean }>` | — | Computed segments map for the formatter |
| `shouldForceLeadingZeros` | `boolean` | `false` | Always show leading zeros in month, day, and hour fields |
| `hourCycle` | `HourCycle` | — | 12-hour or 24-hour time; locale default otherwise |
| `hideTimeZone` | `boolean` | `false` | Hide the time zone segment for a `ZonedDateTime` value |
| `timeZone` | `string` | `"UTC"` | Time zone to use |
| `locale` | `string` | `"en-US"` | BCP 47 locale |
| `createCalendar` | `(identifier: CalendarIdentifier) => Calendar` | — | Creates a calendar for non-Gregorian calendars (Persian, Islamic, Buddhist) |
| `translations` | `IntlTranslations` | — | Localized messages |
| `dir` | `"ltr" \| "rtl"` | `"ltr"` | Text direction |
| `disabled` | `boolean` | — | Disables the input |
| `readOnly` | `boolean` | — | Read-only |
| `required` | `boolean` | — | Required |
| `invalid` | `boolean` | — | Invalid state |
| `name` | `string` | — | `name` attribute of the hidden input |
| `form` | `string` | — | `form` attribute of the hidden input |
| `id` | `string` | — | Unique identifier of the machine |
| `ids` | `Partial<{ root, label(index), control, segmentGroup(index), hiddenInput(index) }>` | — | Element ids, useful for composition |
| `getRootNode` | `() => ShadowRoot \| Node \| Document` | — | Root node for custom environments (iframes, Electron) |

`DateInput.Segments`, `DateInput.SegmentGroup`, and `DateInput.HiddenInput` accept `index?: number` (the date index when `selectionMode` is `range`). `DateInput.Segment` requires `segment: DateSegment`. `DateInput.RootProvider` requires `value: DateInputApi`.

## Notes

- Source: https://chakra-ui.com/docs/components/date-input (docs source: https://github.com/chakra-ui/chakra-ui/blob/2e7517745cff2fcde0b8012f136cf99611ff262a/apps/www/content/docs/components/date-input.mdx, tag @chakra-ui/react@3.37.0)
- The first Usage example passes the return value of `useDateInput` to `DateInput.RootProvider`, so that `getSegments()` and the `Segment` context share the same state. Use `DateInput.Segments` when no customization is needed
- The Props table above applies to `DateInput.Root`
- Date values use objects from `@internationalized/date` (timezone-safe, locale-aware); the docs state this will be replaced by the Temporal API when widely supported in browsers
- `selectionMode="range"`: pass `index` to `DateInput.Segments` and `DateInput.HiddenInput` to target each date in the range
- `min` / `max` restrict accepted dates; `granularity` set to `hour`, `minute` or `second` shows a time alongside the date
- Time-only input: combine `granularity` and `formatter`
- A `ZonedDateTime` value renders a time zone segment; use `hourCycle` and `hideTimeZone` to adjust
- Compose with `DatePicker` via the `useDateInput` hook and `DateInput.RootProvider`; `useDateInputContext` with `clearValue` renders a clear trigger
- Wrap in `LocaleProvider` to set locale and text direction together, or pass `dir="rtl"` alone
- Added in Chakra UI 3.37.0
- This is the Chakra UI styled component imported from `@chakra-ui/react`; it is built on the Ark UI `DateInput` (`@ark-ui/react`). Do not mix the two import paths or their unstyled/styled props

## Related

- [DatePicker](./date-picker.md)
