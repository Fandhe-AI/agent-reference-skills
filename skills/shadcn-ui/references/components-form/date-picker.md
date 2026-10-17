---
source: https://ui.shadcn.com/docs/components/base/date-picker
---

# Date Picker

A date picker component with range and presets.

## Signature / Usage

Built from the `Popover` and `Calendar` components; install both:

```bash
npx shadcn@latest add popover calendar
```

```tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          />
        }
      >
        <CalendarIcon />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
```

Composition:

```text
Popover
├── PopoverTrigger
└── PopoverContent
    └── Calendar
```

## Notes

- There is no `DatePicker` root component; it is a composition of `Popover` and `Calendar`. Installation instructions are those of the Popover and Calendar pages.
- Examples on the docs page: basic, range picker (`mode="range"` with `numberOfMonths={2}`, `DateRange` from `react-day-picker`), and date of birth (dropdown caption layout).
- Base UI uses the `render` prop on `PopoverTrigger`; the Radix variant (https://ui.shadcn.com/docs/components/radix/date-picker) uses `asChild`. React Aria variant: https://ui.shadcn.com/docs/components/aria/date-picker.
- See React DayPicker (https://react-day-picker.js.org) for calendar options.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Calendar](./calendar.md)
- [Field](./field.md)
