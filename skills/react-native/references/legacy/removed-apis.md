---
source: https://reactnative.dev/docs/0.87/alertios
---

# Removed APIs

Ten APIs that were removed from React Native; their docs pages remain as stubs pointing to a replacement. This page aggregates them.

## Signature / Usage

Verbatim stub text of the first entry (`AlertIOS`); the other nine stubs differ only in the replacement line shown in the table:

```text
Removed from React Native
Use Alert instead.
```

| API | Original replacement guidance | Source |
| --- | --- | --- |
| AlertIOS | Use `Alert` instead. | https://reactnative.dev/docs/0.87/alertios |
| AsyncStorage | Use one of the community packages instead (search: storage). | https://reactnative.dev/docs/0.87/asyncstorage |
| CheckBox | Use one of the community packages instead (search: checkbox). | https://reactnative.dev/docs/0.87/checkbox |
| Clipboard | Use one of the community packages instead (search: clipboard). | https://reactnative.dev/docs/0.87/clipboard |
| DatePickerAndroid | Use one of the community packages instead (search: datepicker). | https://reactnative.dev/docs/0.87/datepickerandroid |
| DatePickerIOS | Use one of the community packages instead (search: datepicker). | https://reactnative.dev/docs/0.87/datepickerios |
| ImagePickerIOS | Use one of the community packages instead (search: image picker). | https://reactnative.dev/docs/0.87/imagepickerios |
| SegmentedControlIOS | Use one of the community packages instead (search: segmentedcontrol). | https://reactnative.dev/docs/0.87/segmentedcontrolios |
| StatusBarIOS | Use `StatusBar` for mutating the status bar. | https://reactnative.dev/docs/0.87/statusbarios |
| TimePickerAndroid | Use one of the community packages instead (search: timepicker). | https://reactnative.dev/docs/0.87/timepickerandroid |

## Notes

- All ten pages are marked "Removed from React Native" (title prefix in the source). No API surface is documented for them.
- "Community packages" links point to reactnative.directory searches with the term shown in parentheses; the docs name no specific package.
- Replacements that exist in core: `Alert` (see `apis/alert.md`) and `StatusBar` (see `components/statusbar.md`).

## Related

- [alert.md](../apis/alert.md)
- [statusbar.md](../components/statusbar.md)
- [progressbarandroid.md](./progressbarandroid.md)
- [pushnotificationios.md](./pushnotificationios.md)
