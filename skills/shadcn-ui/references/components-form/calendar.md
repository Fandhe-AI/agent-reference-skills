---
source: https://ui.shadcn.com/docs/components/base/calendar
---

# Calendar

A calendar component that allows users to select a date or a range of dates.

## Signature / Usage

```bash
npx shadcn@latest add calendar
```

Manual installation (also requires the `Button` component):

```bash
npm install react-day-picker date-fns
```

```tsx
import { Calendar } from "@/components/ui/calendar"
```

```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
```

RTL (pass `locale` and `dir`):

```tsx
import { arSA } from "react-day-picker/locale"

;<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>
```

Persian / Hijri / Jalali calendar: edit `components/ui/calendar.tsx`:

```diff
- import { DayPicker } from "react-day-picker"
+ import { DayPicker } from "react-day-picker/persian"
```

## Notes

- Built on top of React DayPicker (https://react-day-picker.js.org); all props are DayPicker props. The docs page has no props table of its own.
- You can build a date picker from `Calendar` and `Popover`; see Date Picker.
- Changelog (RTL support): when upgrading an older `Calendar`, import the `Locale` type from `react-day-picker`, add a `locale` prop to `Calendar`, pass it to `DayPicker` (`formatMonthDropdown` uses `locale?.code`), and add `locale` to `CalendarDayButton`.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/calendar and https://ui.shadcn.com/docs/components/aria/calendar.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Date Picker](./date-picker.md)
- [Button](./button.md)
