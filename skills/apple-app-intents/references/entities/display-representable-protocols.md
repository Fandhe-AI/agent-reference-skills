---
source: https://developer.apple.com/documentation/appintents/displayrepresentable
---

# DisplayRepresentable family (DisplayRepresentable / InstanceDisplayRepresentable / TypeDisplayRepresentable / StaticDisplayRepresentable / CaseDisplayRepresentable)

Protocols that provide the visual representation of a type, of an instance, or of the cases of an enumeration. `DisplayRepresentable`: "An interface for providing a dynamic visual representation of a specific type and instances of that type."

## Signature / Usage

```swift
protocol DisplayRepresentable : InstanceDisplayRepresentable, TypeDisplayRepresentable

protocol InstanceDisplayRepresentable : CustomLocalizedStringResourceConvertible

protocol TypeDisplayRepresentable

protocol StaticDisplayRepresentable : CaseDisplayRepresentable, TypeDisplayRepresentable

protocol CaseDisplayRepresentable : CustomLocalizedStringResourceConvertible, CaseIterable, Hashable
```

```swift
var displayRepresentation: DisplayRepresentation
static var typeDisplayRepresentation: TypeDisplayRepresentation
static var caseDisplayRepresentations: [Self : DisplayRepresentation]
```

## Options / Props

| Protocol | Member | Declaration | Description |
| --- | --- | --- | --- |
| `DisplayRepresentable` | (none saved) | | Combines `InstanceDisplayRepresentable` and `TypeDisplayRepresentable`. |
| `InstanceDisplayRepresentable` | `displayRepresentation` | `var displayRepresentation: DisplayRepresentation` (required; 2 default implementations) | The visual elements to display when presenting an instance of the type. |
| `InstanceDisplayRepresentable` | `localizedStringResource` | `var localizedStringResource: LocalizedStringResource` | A resource that helps provide a description of this instance. |
| `TypeDisplayRepresentable` | `typeDisplayRepresentation` | `static var typeDisplayRepresentation: TypeDisplayRepresentation` (required; 4 default implementations) | A short, localized, human-readable name for the type. |
| `StaticDisplayRepresentable` | (none saved) | | An interface for providing a static visual representation of a specific type. Combines `CaseDisplayRepresentable` and `TypeDisplayRepresentable`. |
| `CaseDisplayRepresentable` | `caseDisplayRepresentations` | `static var caseDisplayRepresentations: [Self : DisplayRepresentation]` (required; 2 default implementations) | A dictionary that maps each value to the visual elements that represent it. |
| `CaseDisplayRepresentable` | `localizedStringResource` | `var localizedStringResource: LocalizedStringResource` (second overload available when `Self` conforms to `InstanceDisplayRepresentable`) | A resource that helps provide a description of this instance. |

## Notes

- All five: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Which protocol to use:
  - `AppEntity` is `DisplayRepresentable` (instance + type), so entities supply `displayRepresentation` and `typeDisplayRepresentation`.
  - `AppEnum` is `StaticDisplayRepresentable` (cases + type; `AppEnum` is among the "Inherited By" types of `StaticDisplayRepresentable`), so enums supply `caseDisplayRepresentations` and `typeDisplayRepresentation`.
  - `AppUnionValue` is `TypeDisplayRepresentable`; its `Cases` enum is `AppEnum` via `AppUnionValueCasesProviding`.
- `DisplayRepresentable` conforming types: `IntentCurrencyAmount`, `IntentFile`, `IntentPaymentMethod`, `IntentPerson`, `SystemShortcut`. `StaticDisplayRepresentable` / `CaseDisplayRepresentable` conforming types: `StringSearchScope`, `VideoCategory`.
- `InstanceDisplayRepresentable` is also inherited by `SetFocusFilterIntent` and `StartWorkoutIntent` (per its relationships list).
- The saved JSON for these five pages has no overview text or code listing.

## Related

- [DisplayRepresentation](./displayrepresentation.md)
- [TypeDisplayRepresentation](./typedisplayrepresentation.md)
- [AppEntity](./appentity.md)
- [AppEnum](./appenum.md)
- [AppValue / AnyIntentValue](./appvalue.md)
