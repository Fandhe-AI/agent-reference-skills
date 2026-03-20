# Query Plugins

## IsBetween

Returns a `boolean` indicating if a date falls between two other dates.

```javascript
var isBetween = require('dayjs/plugin/isBetween')
// import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
```

### API

```javascript
dayjs(date).isBetween(start, end, granularity?, inclusivity?)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `start` | Dayjs / string | Start date boundary |
| `end` | Dayjs / string | End date boundary |
| `granularity` | string | (optional) Precision: `'year'`, `'month'`, `'day'`, etc. |
| `inclusivity` | string | (optional) Boundary inclusion: `'()'`, `'[]'`, `'[)'`, `'(]'` |

### Inclusivity Options

| Value | Meaning |
|-------|---------|
| `'()'` | Exclude both start and end (default) |
| `'[]'` | Include both start and end |
| `'[)'` | Include start, exclude end |
| `'(]'` | Exclude start, include end |

### Examples

```javascript
dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'), 'year')
dayjs('2016-10-30').isBetween('2016-01-01', '2016-10-30', 'day', '[)')
```

---

## IsLeapYear

Returns a `boolean` indicating whether the year is a leap year.

```javascript
var isLeapYear = require('dayjs/plugin/isLeapYear')
// import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(isLeapYear)

dayjs('2000-01-01').isLeapYear() // true
```

---

## IsSameOrAfter

Returns a `boolean` indicating if a date is the same as or after another date.

```javascript
var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

dayjs('2010-10-20').isSameOrAfter('2010-10-19', 'year')
```

| Parameter | Type | Description |
|-----------|------|-------------|
| date | Dayjs / string | Date to compare against |
| unit | string | (optional) Unit of time for comparison granularity |

---

## IsSameOrBefore

Returns a `boolean` indicating if a date is the same as or before another date.

```javascript
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

dayjs('2010-10-20').isSameOrBefore('2010-10-19', 'year')
```

| Parameter | Type | Description |
|-----------|------|-------------|
| date | Dayjs / string | Date to compare against |
| unit | string | (optional) Unit of time for comparison granularity |

---

## IsToday

Returns a `boolean` indicating whether the Day.js object is today.

```javascript
var isToday = require('dayjs/plugin/isToday')
// import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

dayjs().isToday() // true
```

---

## IsTomorrow

Returns a `boolean` indicating whether the Day.js object is tomorrow.

```javascript
var isTomorrow = require('dayjs/plugin/isTomorrow')
// import isTomorrow from 'dayjs/plugin/isTomorrow'
dayjs.extend(isTomorrow)

dayjs().add(1, 'day').isTomorrow() // true
```

---

## IsYesterday

Returns a `boolean` indicating whether the Day.js object is yesterday.

```javascript
var isYesterday = require('dayjs/plugin/isYesterday')
// import isYesterday from 'dayjs/plugin/isYesterday'
dayjs.extend(isYesterday)

dayjs().add(-1, 'day').isYesterday() // true
```
