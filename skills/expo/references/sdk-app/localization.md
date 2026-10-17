---
source: https://docs.expo.dev/versions/v58.0.0/sdk/localization/
---

# Localization

`expo-localization` provides access to the device's locale and calendar data and helps localize an app for specific regions, languages, or cultures. Pair it with a localization library such as `lingui-js`, `react-i18next`, `react-intl`, `i18n-js`, or `react-native-intlayer`.

## Signature / Usage

```sh
npx expo install expo-localization
```

```jsx
import { getLocales, getCalendars } from 'expo-localization';
```

Config plugin (settings that need a new app binary):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-localization",
        {
          "supportsRTL": true,
          "forcesRTL": false,
          "supportedLocales": ["en", "ja"]
        }
      ]
    ]
  }
}
```

Example `getLocales()` result:

```js
[{
  "languageTag": "pl-PL",
  "languageCode": "pl",
  "textDirection": "ltr",
  "digitGroupingSeparator": " ",
  "decimalSeparator": ",",
  "measurementSystem": "metric",
  "currencyCode": "PLN",
  "currencySymbol": "zł",
  "regionCode": "PL",
  "temperatureUnit": "celsius"
}]
```

Example `getCalendars()` result:

```js
[{
  "calendar": "gregory",
  "timeZone": "Europe/Warsaw",
  "uses24hourClock": true,
  "firstWeekday": 1
}]
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `supportsRTL` | `true` | Whether the app allows RTL layout. When enabled, the app renders in RTL for RTL device languages, following React Native's `I18nManager`. |
| `forcesRTL` | `false` | Whether to force RTL layout regardless of the device language. |
| `supportedLocales` | `undefined` | Locales the app supports, used to enable per-app language selection in system settings. A single array shared by both platforms, or platform-specific `ios` and `android` arrays. |

### Hooks and methods

Supported platforms: Android, iOS, tvOS, Web.

| Name | Returns | Description |
| --- | --- | --- |
| `useCalendars()` | `[Calendar, ...Calendar[]]` | Hook returning the user's preferred calendars (at least 1 element; currently always a single element). Re-renders with a new list if OS settings change. |
| `useLocales()` | `[Locale, ...Locale[]]` | Hook returning the user's locales in the order defined in device settings (at least 1 element). On web, currency and measurement systems are `null`. Re-renders if OS settings change. |
| `Localization.getCalendars()` | `[Calendar, ...Calendar[]]` | Non-hook equivalent of `useCalendars()`. |
| `Localization.getLocales()` | `[Locale, ...Locale[]]` | Non-hook equivalent of `useLocales()`. |

### Calendar

| Property | Type | Description |
| --- | --- | --- |
| `calendar` | `CalendarIdentifier \| null` | Calendar identifier, one of the Unicode calendar types. On Android limited to the device's available calendar types. On iOS calendar identifiers are mapped to Unicode types and never contain `'dangi'` or `'islamic-rgsa'`. |
| `firstWeekday` | `Weekday \| null` | First day of the week; for most calendars Sunday is `1` and Saturday `7`. Can be null on browsers without `weekInfo` support in the `Intl` API. |
| `timeZone` | `string \| null` | Time zone, for example `'America/Los_Angeles'`, `'Europe/Warsaw'`, `'GMT+1'`. Can be `null` on Web. |
| `uses24hourClock` | `boolean \| null` | True when device settings use 24-hour time. Can be null on browsers without `hourCycle` support in `Intl`. |

### Locale

| Property | Type | Description |
| --- | --- | --- |
| `currencyCode` | `string \| null` | Currency code. On iOS, from the `Region` setting under Language & Region, not the current locale. On Android, the currency specific to the locale in the list. `null` on Web. |
| `currencySymbol` | `string \| null` | Symbol for `currencyCode` (`'$'`, `'€'`, `'zł'`). |
| `decimalSeparator` | `string \| null` | Decimal separator (`'.'`, `','`). |
| `digitGroupingSeparator` | `string \| null` | Digit grouping separator. |
| `languageCode` | `string \| null` | IETF BCP 47 language tag without region code (`'en'`, `'es'`, `'pl'`). |
| `languageCurrencyCode` | `string \| null` | On iOS, currency code for the current locale in the list, not the device region. On Android equal to `currencyCode`. `null` on Web. Prefer `currencyCode`. |
| `languageCurrencySymbol` | `string \| null` | Symbol for `languageCurrencyCode`. Prefer `currencySymbol`. |
| `languageRegionCode` | `string \| null` | Region code for the preferred language (`en-CA` -> `CA`); same as `regionCode` when the language is not region-specific. Prefer `regionCode`. |
| `languageScriptCode` | `string \| null` | ISO 15924 4-letter script code (`'Latn'`, `'Hans'`, `'Hebr'`); may be `null` on Android and Web. |
| `languageTag` | `string` | IETF BCP 47 language tag with region code (`'en-US'`, `'es-419'`, `'pl-PL'`). |
| `measurementSystem` | `'metric' \| 'us' \| 'uk' \| null` | `null` on Web (not exposed; ask the user if possible). |
| `regionCode` | `string \| null` | Region from Region settings on iOS/Android, parsed from locale on Web (can be `null` on Web). |
| `temperatureUnit` | `'celsius' \| 'fahrenheit' \| null` | `null` if the region code is unknown. |
| `textDirection` | `'ltr' \| 'rtl'` | Text direction for the locale. |

### Enums

`CalendarIdentifier` (`GREGORIAN` is an alias of `GREGORY`, both `"gregory"`): `BUDDHIST = "buddhist"`, `CHINESE = "chinese"`, `COPTIC = "coptic"`, `DANGI = "dangi"`, `ETHIOAA = "ethioaa"`, `ETHIOPIC = "ethiopic"`, `GREGORIAN = "gregory"`, `GREGORY = "gregory"`, `HEBREW = "hebrew"`, `INDIAN = "indian"`, `ISLAMIC = "islamic"`, `ISLAMIC_CIVIL = "islamic-civil"`, `ISLAMIC_RGSA = "islamic-rgsa"`, `ISLAMIC_TBLA = "islamic-tbla"`, `ISLAMIC_UMALQURA = "islamic-umalqura"`, `ISO8601 = "iso8601"`, `JAPANESE = "japanese"`, `PERSIAN = "persian"`, `ROC = "roc"`.

`Weekday`: `SUNDAY = 1`, `MONDAY = 2`, `TUESDAY = 3`, `WEDNESDAY = 4`, `THURSDAY = 5`, `FRIDAY = 6`, `SATURDAY = 7`.

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- On iOS, `getLocales()` / `getCalendars()` results stay the same while the app runs. On Android, the user can change locale preferences in Settings without restarting the app; rerun the methods when the app returns to the foreground (detect with `AppState`).
- RTL support and further usage: see the Localization guide on docs.expo.dev.
- Existing React Native app: install `expo` first; without CNG, configure the library manually.
- Source: `sdk-58` branch `packages/expo-localization`; modificationDate September 15, 2026.

## Related

- [Expo](./expo.md)
- [Constants](./constants.md)
