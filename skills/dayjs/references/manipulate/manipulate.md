# Day.js — Manipulate

Once you have a Day.js object, you may want to manipulate it in some way. Day.js supports method chaining for manipulation operations.

```javascript
dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString()
```

---

## Add

Returns a cloned Day.js object with a specified amount of time added. The original object remains unchanged.

```javascript
const a = dayjs()
const b = a.add(7, 'day')
// a -> original value, unchanged
// b -> manipulation result
```

### Units

| Unit | Shorthand | Description |
|------|-----------|-------------|
| `day` | `d` | Day |
| `week` | `w` | Week |
| `month` | `M` | Month |
| `quarter` | `Q` | Quarter (requires QuarterOfYear plugin) |
| `year` | `y` | Year |
| `hour` | `h` | Hour |
| `minute` | `m` | Minute |
| `second` | `s` | Second |
| `millisecond` | `ms` | Millisecond |

Units are case-insensitive and support plural and short forms. Short forms are case-sensitive.

### Alternative Syntax Using Durations

```javascript
result = dayjs().add(dayjs.duration({'days' : 1}))
```

### Notes

- Decimal values for days and weeks are rounded to the nearest integer before adding.
- Quarter support requires the QuarterOfYear plugin.

---

## Subtract

Returns a cloned Day.js object with a specified amount of time subtracted. The original object remains unchanged.

```javascript
dayjs().subtract(7, 'year')
```

Accepts the same units as `add()`. Units are case-insensitive and support plural and short forms. Decimal values for days and weeks are rounded to the nearest integer before subtracting.

---

## Start of Unit of Time

Returns a cloned Day.js object set to the start of a unit of time.

```javascript
dayjs().startOf('year')
```

### Units

| Unit | Shorthand | Description |
|------|-----------|-------------|
| `year` | `y` | January 1st, 00:00 this year |
| `quarter` | `Q` | Beginning of current quarter, 1st day of months, 00:00 (requires QuarterOfYear plugin) |
| `month` | `M` | First day of this month, 00:00 |
| `week` | `w` | First day of this week, 00:00 (locale aware) |
| `isoWeek` | — | First day of week per ISO 8601, 00:00 (requires IsoWeek plugin) |
| `date` | `D` | 00:00 today |
| `day` | `d` | 00:00 today |
| `hour` | `h` | Current time with 0 mins, 0 secs, 0 ms |
| `minute` | `m` | Current time with 0 seconds, 0 ms |
| `second` | `s` | Current time with 0 milliseconds |

Units are case-insensitive and support plural and short forms.

---

## End of Unit of Time

Returns a cloned Day.js object set to the end of a unit of time. The original object remains unchanged.

```javascript
dayjs().endOf('month')
```

Accepts the same units as `startOf()`. Units are case-insensitive and support plural and short forms.

---

## Local

Returns a Day.js object configured to use local time rather than UTC. Requires the UTC plugin.

```javascript
dayjs.extend(utc)

var a = dayjs.utc()
a.format()        // 2019-03-06T00:00:00Z
a.local().format() // 2019-03-06T08:00:00+08:00
```

### Notes

- Converts a UTC-based Day.js object to display in the local timezone.

---

## UTC

Returns a Day.js object with a flag to use UTC time. Requires the UTC plugin.

```javascript
dayjs.extend(utc)
```

### Standard UTC Conversion

```javascript
var a = dayjs()
a.format()       // 2019-03-06T08:00:00+08:00
a.utc().format() // 2019-03-06T00:00:00Z
```

### UTC with Time Preservation

Passing `true` changes the timezone to UTC without altering the current time value:

```javascript
dayjs('2016-05-03 22:15:01').utc(true).format()
// 2016-05-03T22:15:01Z
```

### Notes

- Passing `true` reinterprets the existing time value as UTC rather than converting it.

---

## UTC Offset

Gets or sets the UTC offset in minutes. Requires the UTC plugin when setting.

### Getting UTC Offset

```javascript
dayjs().utcOffset() // returns offset in minutes
```

### Setting UTC Offset

```javascript
dayjs.extend(utc)

dayjs().utcOffset(120) // set offset to +02:00
```

When the input value is between -16 and 16, it is interpreted as hours rather than minutes:

```javascript
dayjs().utcOffset(8)   // interpreted as 8 hours (+08:00)
dayjs().utcOffset(480) // 480 minutes = 8 hours (+08:00)
```

### Preserving Local Time

Pass `true` as the second parameter to keep the same local time while changing the offset:

```javascript
dayjs.utc('2000-01-01T06:01:02Z').utcOffset(1, true).format()
// 2000-01-01T06:01:02+01:00
```

### Notes

- The offset remains fixed and does not automatically adjust for daylight saving time rules.
