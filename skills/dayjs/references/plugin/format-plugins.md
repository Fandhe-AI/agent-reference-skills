# Format Plugins

## AdvancedFormat

Extends Day.js's `format` API with additional formatting tokens.

```javascript
var advancedFormat = require('dayjs/plugin/advancedFormat')
// import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

dayjs().format('Q Do k kk X x')
```

### Additional Format Tokens

| Token | Output | Description |
|-------|--------|-------------|
| `Q` | 1-4 | Quarter |
| `Do` | 1st 2nd ... 31st | Day of Month with ordinal |
| `k` | 1-24 | Hour beginning at 1 |
| `kk` | 01-24 | Hour 2-digits beginning at 1 |
| `X` | 1360013296 | Unix Timestamp in seconds |
| `x` | 1360013296123 | Unix Timestamp in milliseconds |
| `w` | 1 2 ... 52 53 | Week of year *(requires WeekOfYear)* |
| `ww` | 01 02 ... 52 53 | Week of year 2-digits *(requires WeekOfYear)* |
| `W` | 1 2 ... 52 53 | ISO Week of year *(requires IsoWeek)* |
| `WW` | 01 02 ... 52 53 | ISO Week of year 2-digits *(requires IsoWeek)* |
| `wo` | 1st 2nd ... 53rd | Week of year with ordinal *(requires WeekOfYear)* |
| `gggg` | 2017 | Week Year *(requires WeekYear)* |
| `GGGG` | 2017 | ISO Week Year *(requires IsoWeek)* |
| `z` | EST | Abbreviated named offset *(requires Timezone)* |
| `zzz` | Eastern Standard Time | Unabbreviated named offset *(requires Timezone)* |

---

## LocalizedFormat

Extends `format` API to support locale-aware format tokens (e.g., `L`, `LT`, `LLL`).

```javascript
var localizedFormat = require('dayjs/plugin/localizedFormat')
// import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

dayjs().format('L LT')
```

For the full list of localized format tokens, refer to the [display/format localized formats reference](../display/format.md).

---

## CustomParseFormat

Extends the `dayjs()` constructor to parse custom date string formats.

```javascript
var customParseFormat = require('dayjs/plugin/customParseFormat')
// import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
```

### Usage

```javascript
// Custom format
dayjs('05/02/69 1:02:03 PM -05:00', 'MM/DD/YY H:mm:ss A Z')
// => 1969-05-02T18:02:03.000Z

// Locale-specific parsing
dayjs('2018 Enero 15', 'YYYY MMMM DD', 'es')
// => 2018-01-15T00:00:00.000Z

// Strict mode
dayjs('1970-00-00', 'YYYY-MM-DD', true)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| date string | string | Input date string to parse |
| format | string | Format token string describing the input |
| locale | string | (optional) Locale for month/weekday name parsing |
| strict | boolean | (optional) Reject invalid dates when `true` |
