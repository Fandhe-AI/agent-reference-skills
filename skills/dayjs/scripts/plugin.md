# Plugin

プラグインの読み込みと有効化。

## プラグインの読み込み（CommonJS）

```sh
var AdvancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(AdvancedFormat)
```

## プラグインの読み込み（ES Modules）

```sh
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(AdvancedFormat)
```

## Timezone プラグインのセットアップ（UTC プラグインと合わせて使用）

```sh
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
```

Timezone プラグインは UTC プラグインに依存する。両方を必ずロードする。

## TypeScript でのプラグイン読み込み

```sh
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'

dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')
```

## ブラウザ — CDN でプラグインを読み込む（jsDelivr）

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/advancedFormat.js"></script>
<script>
  dayjs.extend(window.dayjs_plugin_advancedFormat)
</script>
```
