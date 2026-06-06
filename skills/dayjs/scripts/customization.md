# Customization

カスタムロケールの作成と既存ロケールの更新。

## カスタムロケールの作成

```sh
var localeObject = { /* ロケールオブジェクト */ }
dayjs.locale('en-my-settings', localeObject)
```

## 既存ロケールの更新（UpdateLocale プラグイン必須）

```sh
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]
})
```

## 月の省略形を更新

```sh
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  monthsShort: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
})
```

## 曜日名を更新

```sh
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdays: [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]
})
```

## 相対時刻の文字列を更新

```sh
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
})
```

## ロケールファイルのテンプレート（カスタムロケールファイル作成時）

```sh
import dayjs from 'dayjs'

const locale = { /* ロケールオブジェクト */ }

dayjs.locale(locale, null, true)

export default locale
```
