# Globalization and localization

Overview and checklist for designing and developing a Windows app so it functions correctly across languages, regions, and cultures.

## Signature / Usage

Three related concepts:

- **Globalization** — designing/developing the app to function correctly across languages, regions, cultures without culture-specific code changes (culture-aware date/time/number formatting, sorting, etc.).
- **Localizability** — preparing the app so it can be localized without functional defects, mainly by separating executable code from localizable resources (strings, images).
- **Localization** — adapting resources (translating strings, adjusting images, tailoring content) for specific markets/languages/regions.

## Options / Props

| Recommendation | Description |
|------|-------------|
| Culture-aware string comparison | Don't change case before comparing; see .NET string-usage recommendations |
| Culture-aware collation | Don't assume alphabetical sorting; let Windows handle sorting or account for target-market sorting methods |
| Culture-aware formatting | Format numbers, dates, times, addresses, phone numbers via `Windows.Globalization` APIs; see [Globalize your date/time/number formats](./date-time-number-formats.md) |
| International units/currency | Support metric/imperial and correct currency via `GeographicRegion.CurrenciesInUse` |
| Unicode encoding | Use UTF-16 (Windows Runtime APIs) / UTF-8 consistently |
| International paper sizes | Support common international sizes for print features |
| Keyboard/IME language | Record `Language.CurrentInputMethodLanguageTag` for text input so later display uses appropriate formatting |
| Language vs. region | Don't infer region from language or vice versa — they are independent (e.g. `en-GB`) |
| Text length & font sizing | Design UI controls to dynamically size to content; other languages can require significantly longer strings and larger minimum font sizes |
| RTL mirroring | Support mirrored reading order and layout for right-to-left languages; see [Adjust layout and fonts, and support RTL](./rtl-layout.md) |

## Notes

- The Resource Management System (MRT Core) handles BCP-47 language-tag matching between available app resources and the user's preferred languages — avoid writing custom matching logic.
- Common characters in other languages (e.g. diacritics like Å, Ņ) and East Asian scripts require extra vertical space; use standard font sizes and line heights.

## Related

- [Adjust layout and fonts, and support RTL](./rtl-layout.md)
- [Design your app for bidirectional text](./bidirectional-text.md)
- [Globalize your date/time/number formats](./date-time-number-formats.md)
