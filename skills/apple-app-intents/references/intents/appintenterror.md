---
source: https://developer.apple.com/documentation/appintents/appintenterror
---

# AppIntentError

An error that indicates a problem occurred while performing an app intent.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
struct AppIntentError
```

```swift
init(description: LocalizedStringResource)
init(predefinedError: AppIntentError, description: LocalizedStringResource)
init(wrapping: some CustomAppIntentErrorConvertible)
init(wrapping: some CustomLocalizedStringResourceConvertible & Error)
static var restartPerform: AppIntentError
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(description:)` | `init(description: LocalizedStringResource)` | Creates an error with a localized description. |
| `init(predefinedError:description:)` | `init(predefinedError: AppIntentError, description: LocalizedStringResource)` | Creates an error from a predefined error with a custom localized description. |
| `init(wrapping:)` | `init(wrapping: some CustomAppIntentErrorConvertible)` | Creates an error from a custom app intent convertible value. |
| `init(wrapping:)` | `init(wrapping: some CustomLocalizedStringResourceConvertible & Error)` | Creates an error by wrapping an existing localized error. |
| `restartPerform` | `static var restartPerform: AppIntentError` | Listed under "Getting the error codes"; no abstract on the page. |
| `PermissionRequired` | `enum PermissionRequired` | Errors that indicate the app doesn't have the required permission to perform an action. |
| `UserActionRequired` | `enum UserActionRequired` | Errors that represent a state where a person needs to respond to successfully complete the action. |
| `Unrecoverable` | `enum Unrecoverable` | Unknown or unrecoverable errors that might have occurred due to either a system or user error. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Throw an `AppIntentError` when an intent fails; Apple Intelligence, Siri, and Shortcuts use the structured information to decide the response (prompting a person, retrying, or reporting the failure).
- Three ways to create one: predefined errors (`PermissionRequired`, `UserActionRequired`, `Unrecoverable`); wrapping a custom error that conforms to `CustomLocalizedStringResourceConvertible` via `init(wrapping:)`; or a description string via `init(description:)`.
- Recommended for most apps: define an error enumeration conforming to `CustomLocalizedStringResourceConvertible` and throw it from `perform()`; the framework wraps conforming errors into an `AppIntentError` with your localized description.
- Conforms to `Copyable`, `CustomLocalizedStringResourceConvertible`, `CustomStringConvertible`, `Equatable`, `Error`, `Escapable`, `Sendable`, `SendableMetatype`.
- `AppIntent.needsToContinueInForegroundError(_:alwaysConfirm:)` returns an `AppIntentError`.

## Related

- [CustomAppIntentErrorConvertible](./customappintenterrorconvertible.md)
- [AppIntent](./appintent.md)
