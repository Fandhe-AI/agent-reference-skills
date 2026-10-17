---
source: https://developer.apple.com/documentation/appintents/appdependencymanager
---

# AppDependencyManager

An object that manages the registration and initialization of an app intent's dependencies.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
final class AppDependencyManager
```

```swift
static let shared: AppDependencyManager

func add<Dependency>(key: AnyHashable?, dependency: @autoclosure () -> Dependency)
func add<Dependency>(key: AnyHashable?, dependency: @autoclosure () -> () throws -> Dependency)
func add<Dependency>(key: AnyHashable?, dependency: () async throws -> Dependency)
```

(As the fragments list them, the three `add(key:dependency:)` overloads take an autoclosure, an autoclosure of a throwing closure, and an async throwing closure respectively.)

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `shared` | `static let shared: AppDependencyManager` | The shared manager instance (no abstract on the page). |
| `init()` | `init()` | Can be used to initialize a standalone `AppDependencyManager` for dependency injection during testing. |
| `add(key:dependency:)` | see above (3 overloads) | Registers a dependency, optionally under a key. |
| `Error` | `enum Error` (`AppDependencyManager.Error`) | Error type; cases are not listed in the saved page. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Pairs with the `@Dependency` property wrapper used inside an `AppIntent` (see the `AppIntent` example) and with the `AppDependency` property wrapper.
- Referenced from the articles "Creating your first app intent" and "Responding to the Action button on Apple Watch Ultra".

## Related

- [AppDependency](./appdependency.md)
- [AppIntent](./appintent.md)
- [AppIntentsPackage](./appintentspackage.md)
