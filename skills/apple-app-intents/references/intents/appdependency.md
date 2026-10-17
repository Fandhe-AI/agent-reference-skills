---
source: https://developer.apple.com/documentation/appintents/appdependency
---

# AppDependency

A property wrapper that resolves a registered dependency at runtime.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
@propertyWrapper final class AppDependency<Value> where Value : Sendable
```

```swift
convenience init(key: AnyHashable?, manager: AppDependencyManager)
convenience init(key: AnyHashable?, manager: AppDependencyManager, default: () async throws -> Value)
convenience init(key: AnyHashable?, manager: AppDependencyManager, default: @autoclosure () -> Value)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `wrappedValue` | `var wrappedValue: Value` | The resolved dependency. |
| `projectedValue` | `var projectedValue: AppDependency<Value>` | The wrapper itself. |
| `init(key:manager:)` | `convenience init(key: AnyHashable?, manager: AppDependencyManager)` | Resolves a dependency from the given manager. |
| `init(key:manager:default:)` | two overloads (async throwing closure / autoclosure) | Same, with a default value when no dependency is registered (the page gives no abstract; this reading follows the `default` parameter name). |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Conforms to `Sendable`, `SendableMetatype`. Referenced from the articles "Responding to the Action button on Apple Watch Ultra" and "Displaying static and interactive snippets".

## Related

- [AppDependencyManager](./appdependencymanager.md)
- [AppIntent](./appintent.md)
