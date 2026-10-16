# LocaleDependentSpeechModule

A module that requires locale-specific assets.

## Signature / Usage

```swift
protocol LocaleDependentSpeechModule : SpeechModule
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static supportedLocales` | `[Locale]` | The set of all possible asset locales that the module supports. (required) |
| `static supportedLocale(equivalentTo:)` | `async -> Locale?` | A locale from the module's supported locales equivalent to the given locale. (required) |
| `selectedLocales` | `[Locale]` | The set of asset locales specified by the module's configuration. (required) |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Conforming types: `SpeechTranscriber`, `DictationTranscriber`. Locale reservations in `AssetInventory` apply only to modules conforming to this protocol.

## Related

- [SpeechModule](./speechmodule.md)
- [AssetInventory](./assetinventory.md)
- [SpeechTranscriber](./speechtranscriber.md)
- [DictationTranscriber](./dictationtranscriber.md)
