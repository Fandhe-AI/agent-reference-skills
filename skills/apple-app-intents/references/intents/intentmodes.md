---
source: https://developer.apple.com/documentation/appintents/intentmodes
---

# IntentModes

A set of options you use to configure the runtime behavior of an app intent.

## Signature / Usage

```swift
struct IntentModes
```

```swift
static var supportedModes: IntentModes
```

(`supportedModes` is the `AppIntent` property you assign an `IntentModes` value to; the page shows no further code listing.)

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `background` | `static var background: IntentModes` | A value that indicates the action can run in the background. |
| `foreground` | `static var foreground: IntentModes` | A value that indicates the action needs to run in the foreground. |
| `foreground(_:)` | `static func foreground(IntentModes.ForegroundMode) -> IntentModes` | Creates and returns a foreground mode with a specified behavior. |
| `ForegroundMode` | `struct ForegroundMode` | A type that defines the available foreground behaviors for an app intent. |
| `Current` | `struct Current` | The current runtime behavior of an app intent (type of `IntentSystemContext.currentMode`). |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- Assign to `AppIntent.supportedModes`. Modes state whether the app must run in the foreground or background; `foreground` requires the intent code to run in a foreground process.
- At runtime, `systemContext` of the intent also reports whether the process is in the foreground or background; see `IntentModes.Current`.
- Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `Hashable`, `OptionSet`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `SetAlgebra`.

## Related

- [AppIntent](./appintent.md)
- [IntentSystemContext](./intentsystemcontext.md)
- [IntentDescription](./intentdescription.md)
- [IntentDeprecation](./intentdeprecation.md)
- [IntentProjection](./intentprojection.md)
