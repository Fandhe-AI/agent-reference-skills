# Parse Plugins

## ArraySupport

Extends `dayjs()` and `dayjs.utc` to accept an array argument.

```javascript
var arraySupport = require('dayjs/plugin/arraySupport')
// import arraySupport from 'dayjs/plugin/arraySupport'
dayjs.extend(arraySupport)

// [year, month, day, hour, minute, second, millisecond]
dayjs([2010, 1, 14, 15, 25, 50, 125])
dayjs.utc([2010, 1, 14, 15, 25, 50, 125])
```

---

## ObjectSupport

Extends `dayjs()`, `dayjs.utc`, `dayjs().set`, `dayjs().add`, and `dayjs().subtract` to accept object arguments.

```javascript
var objectSupport = require('dayjs/plugin/objectSupport')
// import objectSupport from 'dayjs/plugin/objectSupport'
dayjs.extend(objectSupport)

// Constructor
dayjs({ year: 2010, month: 1, day: 12 })
dayjs.utc({ year: 2010, month: 1, day: 12 })

// Setter
dayjs().set({ year: 2010, month: 1, day: 12 })

// Add / Subtract
dayjs().add({ M: 1 })
dayjs().subtract({ month: 1 })
```

---

## BigIntSupport

Extends `dayjs()` and `dayjs.unix()` to accept `BigInt` arguments.

```javascript
var bigIntSupport = require('dayjs/plugin/bigIntSupport')
// import bigIntSupport from 'dayjs/plugin/bigIntSupport'
dayjs.extend(bigIntSupport)

// BigInt milliseconds
dayjs(BigInt(1666310421101))

// BigInt Unix seconds
dayjs.unix(BigInt(1666311003))
```

---

## PreParsePostFormat

Allows locale definitions to pre-process input strings before parsing and post-process output strings after formatting. Mirrors moment.js locale behavior.

**Requirements:** The `localeData` plugin must be loaded before this plugin. Also affects the RelativeTime plugin by design.

```javascript
import dayjs from 'dayjs'
import preParsePostFormat from 'dayjs/plugin/preParsePostFormat'
dayjs.extend(preParsePostFormat)

// Arabic locale example
const symbolMap = {
  1: '١', 2: '٢', 3: '٣', 4: '٤', 5: '٥',
  6: '٦', 7: '٧', 8: '٨', 9: '٩', 0: '٠'
}
const numberMap = {
  '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5',
  '٦': '6', '٧': '7', '٨': '8', '٩': '9', '٠': '0'
}

const locale = {
  name: 'ar',
  preparse(string) {
    return string
      .replace(/[١٢٣٤٥٦٧٨٩٠]/g, match => numberMap[match])
      .replace(/،/g, ',')
  },
  postformat(string) {
    return string
      .replace(/\d/g, match => symbolMap[match])
      .replace(/,/g, '،')
  }
}
```

`preparse` converts locale-specific input (e.g., Arabic numerals) to standard form before parsing. `postformat` converts output back to locale-specific form for display.
