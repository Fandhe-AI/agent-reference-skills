# Localization and RTL support

Separating localizable content from code via locale-qualified resource directories, RTL layout attributes, per-app language preferences, and pseudolocale testing.

## Signature / Usage

```
res/
    values/          strings.xml            (default, required)
    values-fr/       strings.xml            (French)
    values-ja/       strings.xml            (Japanese; missing keys fall back to values/)
```

```xml
<!-- AndroidManifest.xml -->
<application android:supportsRtl="true"
             android:localeConfig="@xml/locale_config" ... />
```

```xml
<!-- res/xml/locale_config.xml -->
<locale-config xmlns:android="http://schemas.android.com/apk/res/android">
    <locale android:name="en-US"/>
    <locale android:name="ja"/>
</locale-config>
```

```kotlin
AppCompatDelegate.setApplicationLocales(LocaleListCompat.forLanguageTags("ja"))
```

## Options / Props

| Item | Description |
|------|--------------|
| `res/values/` | Required default resource set; the app crashes on unsupported locales if a string is missing here. |
| `res/values-<lang>[-r<REGION>]/` | Locale-specific override, e.g. `values-fr/`, `values-en-rGB/`; modern BCP-47 form `values-b+es+419/` recommended for API 24+. |
| `android:supportsRtl` (`<application>`) | Enables RTL layout mirroring; requires `targetSdkVersion` ≥17 for the RTL APIs to activate. |
| `start`/`end` attributes | RTL-aware replacements for `left`/`right` (e.g. `layout_marginStart`, `paddingEnd`) and for Compose `Modifier.padding(start = ...)`. |
| `android:localeConfig` (`<application>`) | Points at an XML resource declaring the locales the app supports for per-app language switching (API 33+, or via AndroidX on older versions). |
| `AppCompatDelegate.setApplicationLocales()` | Runtime API to switch the app's language independent of system locale. |

## Notes

- MCC/MNC and language/region qualifiers outrank other configuration qualifiers in resource-selection precedence.
- On Android 7.0+ (API 24+), if no exact locale match exists, the system searches sibling dialects of the closest matching parent language before falling back to the default resource set.
- Never hard-code numbers/dates as strings; use locale-aware formatters, since some locales (e.g. Arabic) use native digit glyphs.
- Wrap non-translatable placeholders/codes in `<xliff:g>` tags inside string resources so translators leave them untouched.
- Test with pseudolocales and Compose `@Preview(locale = "ar")` (RTL) / `@Preview(locale = "fr")`, and by switching the emulator locale via `adb shell setprop persist.sys.locale <tag>;stop;sleep 5;start`.
- Runtime language switching for API ≤32 requires enabling `androidx.appcompat.app.AppLocalesMetadataHolderService` with `autoStoreLocales` meta-data in the manifest for auto-persistence.

## Related

- [resource qualifiers](./resource-qualifiers.md)
- [string resources](./string-resources.md)
