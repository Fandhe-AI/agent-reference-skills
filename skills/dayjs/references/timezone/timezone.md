# Time Zone

Day.js provides time zone support through the Internationalization API in supported environments. This approach eliminates the need to bundle extra timezone data.

**Requirement:** The `Timezone` plugin must be extended. Available time zone names are listed in the [IANA database](https://www.iana.org/time-zones). For unsupported environments, a [polyfill](https://github.com/formatjs/date-time-format-timezone) is recommended.

## Setup

```javascript
dayjs.extend(utc)
dayjs.extend(timezone)
```

## Parsing in Zone

Parse a date-time string within a specified timezone and obtain a Day.js object instance.

```javascript
dayjs.tz("2013-11-18T11:55:20", "America/Toronto") // '2013-11-18T11:55:20-05:00'
```

### Parsing with Format

If you know the input string's format, pass it as the second argument. Requires the [`CustomParseFormat`](https://day.js.org/docs/en/plugin/custom-parse-format) plugin.

```javascript
dayjs.extend(customParseFormat)
dayjs.tz("12-25-1995", "MM-DD-YYYY", "America/Toronto")
```

## Converting to Zone

Change the time zone, update the offset, and return a Day.js object instance.

```javascript
// Assumes execution in 'Europe/Berlin' timezone (UTC+01:00)
dayjs("2013-11-18T11:55:20")                          // '2013-11-18T11:55:20+01:00'
dayjs("2013-11-18T11:55:20").tz("America/Toronto")    // '2013-11-18T05:55:20-05:00'
```

### Preserving Local Time

Pass `true` as the second argument to keep the local time display and only update the timezone offset.

```javascript
dayjs("2013-11-18T11:55:20").tz("America/Toronto", true) // '2013-11-18T11:55:20-05:00'
```

| Parameter | Type | Description |
|-----------|------|-------------|
| timezone | string | Target timezone identifier (e.g., `"America/Toronto"`) |
| keepLocalTime | boolean | When `true`, preserves the local time and updates only the offset. Default: `false` |

## Guessing User Timezone

Return the user's time zone as a string.

```javascript
dayjs.tz.guess() // e.g. "America/Chicago"
```

## Set Default Timezone

Change the default timezone from the local timezone to a custom one.

```javascript
dayjs.tz.setDefault("America/New_York")

dayjs.tz("2014-06-01 12:00")               // 2014-06-01T12:00:00-04:00 (uses default)
dayjs.tz("2014-06-01 12:00", "Asia/Tokyo") // 2014-06-01T12:00:00+09:00 (overrides default)

dayjs.tz.setDefault() // Reset to local timezone
```

**Note:** `dayjs.tz.setDefault` does not affect existing Day.js objects created before the call. Only newly created instances use the updated default.
