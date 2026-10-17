---
source: https://kotlinlang.org/docs/multiplatform/compose-localization-tests.html
---

# Localization tests

Verify that the correct translated strings display for different locales, and that formatting and layout adapt to each locale.

## Signature / Usage

### Android

Change the system locale via Settings | System | Languages & input | Languages. For automated tests, set it on the emulator with `adb`:

```shell
adb -e shell
setprop persist.sys.locale [BCP-47 language tag];stop;sleep 5;start
```

This restarts the emulator so the app can be relaunched with the new locale. Alternatively, configure the locale programmatically before tests with frameworks like Espresso, for example `LocaleTestRule()`.

### iOS

Change via Settings | General | Language & Region. For XCUITest UI tests, use launch arguments:

```swift
app.launchArguments = [
    "-AppleLanguages", "(es)",
    "-AppleLocale", "es_ES"
]
```

### Desktop

The JVM locale typically defaults to the OS locale. Set the default in test setup or the entry point before the UI is initialized:

```java
java.util.Locale.setDefault(java.util.Locale.forLanguageTag("es-ES"))
```

### Web

Change language in browser preferences for a quick check; use browser automation tools like Selenium or Puppeteer for automated tests; or bypass the read-only `window.navigator.languages` property (see the resource environment page).

## Notes

- The source passes `"es_ES"` to the single-argument `Locale(String)` constructor, which does not parse region or script subtags, so `Locale.forLanguageTag("es-ES")` is used here.
- Key scenarios: custom locale (override programmatically and assert UI, formatted strings, and layouts, including RTL); default resources (set an unsupported locale and verify fallback to the default resources); locale-specific cases (formatting such as `MM/dd/yyyy` vs. `dd/MM/yyyy`, RTL/LTR behavior, and multi-script languages: set the locale to `zh-Hans`, `zh-Hant`, and `zh` and verify each resolves to a resource).
- These are locale-switching techniques per platform, not the Compose UI test API; for `runComposeUiTest` and common Compose testing see this skill's compose-ui testing page and android-testing.

## Related

- [Manage local resource environment](./resource-environment.md)
- [Manage regional formats](./regional-format.md)
- [Working with RTL languages](./rtl-languages.md)
- [Localizing strings](./localize-strings.md)
