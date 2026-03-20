# Day.js — Query

There are several methods to query a Day.js object. These methods allow you to compare dates, check date relationships, and validate Day.js instances.

---

## Query (Overview)

The Query section covers the following methods:

- **Is Before** — Compare if a date is before another
- **Is Same** — Check if dates are identical
- **Is After** — Determine if a date is after another
- **Is Same or Before** — Combined comparison check (plugin)
- **Is Same or After** — Combined comparison check (plugin)
- **Is Between** — Verify if a date falls within a range (plugin)
- **Is a Dayjs** — Validate if a variable is a Day.js instance
- **Is Leap Year** — Check leap year status (plugin)

---

## Is Before

This indicates whether the Day.js object is before the other supplied date-time.

### Signature

```javascript
dayjs().isBefore(date, unit?)
```

### Usage

```javascript
dayjs().isBefore(dayjs('2011-01-01')) // default milliseconds
```

### With Granularity

To limit comparison to a specific unit rather than milliseconds, pass a unit as the second parameter. The comparison respects that unit and all units above it in the hierarchy.

```javascript
dayjs().isBefore('2011-01-01', 'month') // compares month and year
```

### Notes

- Units are case-insensitive
- Units support both plural and short forms (e.g. `year` / `years` / `y`)
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is Same

This indicates whether the Day.js object is the same as the other supplied date-time.

### Signature

```javascript
dayjs().isSame(date, unit?)
```

### Usage

```javascript
dayjs().isSame(dayjs('2011-01-01')) // default milliseconds
```

### With Granularity

When a unit is specified, the method matches all units equal to or larger than the specified unit.

```javascript
dayjs().isSame('2011-01-01', 'year')
```

- Specifying `month` checks both month and year
- Specifying `day` checks day, month, and year

### Notes

- Units are case-insensitive
- Units support both plural and abbreviated forms
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is After

This indicates whether the Day.js object is after the other supplied date-time.

### Signature

```javascript
dayjs().isAfter(date, unit?)
```

### Usage

```javascript
dayjs().isAfter(dayjs('2011-01-01')) // default milliseconds
```

### With Granularity

To compare dates at a specific unit level rather than milliseconds, pass a unit as the second parameter. The comparison respects that unit and all units above it in the hierarchy.

```javascript
dayjs().isAfter('2011-01-01', 'month') // compares month and year
```

### Notes

- Units are case-insensitive
- Units support both plural and short forms
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is Same or Before

This indicates whether the Day.js object is the same as or before another supplied date-time.

**Requires the `IsSameOrBefore` plugin.**

### Setup

```javascript
dayjs.extend(isSameOrBefore)
```

### Signature

```javascript
dayjs().isSameOrBefore(date, unit?)
```

### Usage

```javascript
dayjs.extend(isSameOrBefore)
dayjs().isSameOrBefore(dayjs('2011-01-01')) // default milliseconds
```

### With Granularity

```javascript
dayjs().isSameOrBefore('2011-01-01', 'year')
```

### Notes

- Units are case-insensitive and support both plural and abbreviated forms
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is Same or After

This indicates whether the Day.js object is the same as or after another supplied date-time.

**Requires the `IsSameOrAfter` plugin.**

### Setup

```javascript
dayjs.extend(isSameOrAfter)
```

### Signature

```javascript
dayjs().isSameOrAfter(date, unit?)
```

### Usage

```javascript
dayjs.extend(isSameOrAfter)
dayjs().isSameOrAfter(dayjs('2011-01-01')) // default milliseconds
```

### With Granularity

```javascript
dayjs().isSameOrAfter('2011-01-01', 'year')
```

### Notes

- Units are case-insensitive and support both plural and short form variations
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is Between

This indicates whether the Day.js object is between two other supplied date-times.

**Requires the `IsBetween` plugin.**

### Setup

```javascript
dayjs.extend(isBetween)
```

### Signature

```javascript
dayjs().isBetween(dateA, dateB, unit?, inclusivity?)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| dateA | string \| Dayjs | Start of the date range |
| dateB | string \| Dayjs | End of the date range |
| unit | string (optional) | Granularity level for comparison |
| inclusivity | string (optional) | Bracket notation for boundary inclusion (`'()'`, `'[)'`, `'(]'`, `'[]'`) |

### Usage

```javascript
dayjs.extend(isBetween)
dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'))
// default milliseconds
```

### With Unit

To limit comparison granularity, specify a unit as the third argument. The comparison respects the given unit and all units above it.

```javascript
dayjs().isBetween('2010-10-19', '2010-10-25', 'month') // compares month and year
```

### Inclusivity

The fourth parameter uses bracket notation to define boundary inclusion:

- `[` — include the boundary value
- `(` — exclude the boundary value

Both start and end indicators must be provided together.

```javascript
dayjs('2016-10-30').isBetween('2016-01-01', '2016-10-30', null, '[)')
// true — start inclusive, end exclusive
```

| Notation | Meaning |
|----------|---------|
| `'()'` | Exclude both start and end (default) |
| `'[)'` | Include start, exclude end |
| `'(]'` | Exclude start, include end |
| `'[]'` | Include both start and end |

### Notes

- Units are case-insensitive and support plural and abbreviated forms
- Available units: see [List of all available units](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

---

## Is a Dayjs

This indicates whether a variable is a Day.js object or not.

### Signature

```javascript
dayjs.isDayjs(d)
```

### Usage

```javascript
dayjs.isDayjs(dayjs()) // true
dayjs.isDayjs(new Date()) // false
```

### Alternative: instanceof

The `instanceof` operator provides equivalent functionality:

```javascript
dayjs() instanceof dayjs // true
```

---

## Is Leap Year

This indicates whether the Day.js object's year is a leap year or not.

**Requires the `IsLeapYear` plugin.**

### Setup

```javascript
dayjs.extend(isLeapYear)
```

### Signature

```javascript
dayjs().isLeapYear()
```

### Usage

```javascript
dayjs.extend(isLeapYear)

dayjs('2000-01-01').isLeapYear() // true
dayjs('2001-01-01').isLeapYear() // false
```

### Notes

- Returns a boolean: `true` for leap years, `false` otherwise
- Must call `dayjs.extend(isLeapYear)` before using this method
