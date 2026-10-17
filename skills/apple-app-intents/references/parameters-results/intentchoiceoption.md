---
source: https://developer.apple.com/documentation/appintents/intentchoiceoption
---

# IntentChoiceOption

A structure representing an entry in a list of options for a person to choose from before an app intent resumes its action.

## Signature / Usage

```swift
struct IntentChoiceOption
```

Each option includes display text and an optional style that influences its visual presentation. For example, an option for deleting a file might use a text and style to communicate its destructive action.

```swift
init(title: LocalizedStringResource, style: IntentChoiceOption.Style)
```

## Options / Props

| Name | Declaration | Description |
|------|-------------|-------------|
| `Style` | `struct Style` | Defines the visual style and semantic meaning of an `IntentChoiceOption`. |
| `cancel` | `static var cancel: IntentChoiceOption` | A system-provided option that cancel the app intent. |
| `init(title:style:)` | see above | Creates a new option for a person to choose to continue an app intent. |
| `style` | `let style: IntentChoiceOption.Style` | The style applied to the option, affecting its visual appearance in the system UI. |
| `title` | `let title: LocalizedStringResource` | The localized text displayed for this option. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+.
- Conforms to `Equatable`.

## Related

- [ConfirmationConditions](./confirmationconditions.md)
- [IntentParameter](./intentparameter.md)
