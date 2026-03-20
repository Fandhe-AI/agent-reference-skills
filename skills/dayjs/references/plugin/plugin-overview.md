# Plugin Overview

Day.js ships without plugins by default. Plugins are independent modules that extend Day.js functionality and can be loaded selectively.

## Plugin Architecture

A plugin is a function that receives three parameters:

```javascript
export default (option, dayjsClass, dayjsFactory) => {
  // Extend dayjs() instances
  dayjsClass.prototype.isSameOrBefore = function(arguments) {}

  // Extend dayjs static methods
  dayjsFactory.utc = arguments => {}

  // Override existing APIs
  const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function(arguments) {
    const result = oldFormat.bind(this)(arguments)
    // return modified result
  }
}
```

| Parameter | Description |
|-----------|-------------|
| `option` | Configuration settings passed to the plugin |
| `dayjsClass` | The Day.js class — use for prototype extensions |
| `dayjsFactory` | The Day.js factory function — use for static method additions |

## Loading in Node.js

```javascript
// CommonJS
var AdvancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(AdvancedFormat)

// ES 2015
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(AdvancedFormat)
```

## Loading in the Browser

### From local path

```html
<script src="path/to/dayjs/plugin/advancedFormat"></script>
<script>
  dayjs.extend(window.dayjs_plugin_advancedFormat)
</script>
```

### From CDN (jsDelivr)

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/utc.js"></script>
<script>dayjs.extend(window.dayjs_plugin_utc)</script>
```

Browser plugins are exposed as `window.dayjs_plugin_[PLUGINNAME]`. The script must be loaded before calling `dayjs.extend()`.
