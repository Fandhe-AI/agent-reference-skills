---
source: https://developer.apple.com/documentation/appintents/appshortcutparameterpresentation
---

# AppShortcutParameterPresentation (Summary / Title)

Describes the presentation of an App Shortcut for the provided parameter. This page also covers `AppShortcutParameterPresentationSummary`, `AppShortcutParameterPresentationSummaryString`, and the deprecated `AppShortcutParameterPresentationTitle` / `AppShortcutParameterPresentationTitleString`.

## Signature / Usage

```swift
struct AppShortcutParameterPresentation<Intent, Value, Parameter, ParameterKeyPath> where Intent : AppIntent, Value : _IntentValue, Value : Sendable, Parameter : IntentParameter<Value>, ParameterKeyPath : KeyPath<Intent, Parameter>

init(for: ParameterKeyPath, summary: AppShortcutParameterPresentationSummary<Intent, Value, Parameter, ParameterKeyPath>, optionsCollections: () -> some AppShortcutOptionsCollectionSpecification<Value.UnwrappedType>)
```

```swift
struct AppShortcutParameterPresentationSummary<Intent, Value, Parameter, ParameterKeyPath> // same generic constraints

init(_: AppShortcutParameterPresentationSummaryString<Intent, Value, Parameter, ParameterKeyPath>, table: StaticString?)
```

Summary overview: make sure to provide a summary string that includes the parameter in the interpolation; for example, `"Call \(\.$person)"`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| for | ParameterKeyPath | Key path to the intent parameter |
| summary | AppShortcutParameterPresentationSummary | The summary of the presentation of an App Shortcut parameter |
| optionsCollections | () -> some AppShortcutOptionsCollectionSpecification<Value.UnwrappedType> | Options for the parameter |
| table | StaticString? | Optional strings table for `AppShortcutParameterPresentationSummary.init` |

## Notes

- `AppShortcutParameterPresentation`, `AppShortcutParameterPresentationSummary`: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+; visionOS is listed without an introduced version.
- `AppShortcutParameterPresentationSummaryString` has no abstract on the symbol reference.
- Deprecated: `AppShortcutParameterPresentationTitle` (“A struct that represents the title of the presentation of an App Shortcut.”) and `AppShortcutParameterPresentationTitleString` are marked deprecated. Replacement per the deprecation summary: “Please use init(for:summary:optionsCollections:)”. Its initializer `init(specific:generic:table:)` takes a specific title string (including the parameter in the interpolation, e.g. `"Call \(\.$person)"`) and a generic title (e.g. `"Call Person..."`), with an optional strings table.

## Related

- [AppShortcut](./appshortcut.md)
- [AppShortcutOptionsCollection](./appshortcutoptionscollection.md)
