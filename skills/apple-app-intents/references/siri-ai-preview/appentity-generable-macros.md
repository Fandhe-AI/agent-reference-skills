---
source: https://developer.apple.com/documentation/appintents/appentity(_:)
---

# AppEntity(_:) macro, AppEntity(_:schema:) macro and AppEntityTraits

Marks a transient entity whose values the model can generate on its own; the schema overload does the same for a transient entity that conforms to a schema.

## Signature / Usage

```swift
@attached(extension, conformances: GenerableEntity) macro AppEntity(_ traits: AppEntityTraits)
```

```swift
@attached(memberAttribute) @attached(extension, conformances: GenerableEntity, AppEntity, AssistantSchemaEntity, FileEntity, UniqueAppEntity, URLRepresentableEntity, names: named(__appSchemaEntity)) macro AppEntity<T>(_ traits: AppEntityTraits, schema: T) where T : AppSchemaEntity
```

```swift
struct AppEntityTraits
```

```swift
@AppEntity(.generable)
struct FlightSearch: TransientAppEntity { ... }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `AppEntity(_:)` | `macro AppEntity(_ traits: AppEntityTraits)` | Apply to a structure or class that conforms to `TransientAppEntity`. Adds a `GenerableEntity` conformance, using the availability declared on the type, or the availability of `GenerableEntity` when the type declares none. |
| `AppEntity(_:schema:)` | `macro AppEntity<T>(_ traits: AppEntityTraits, schema: T) where T : AppSchemaEntity` | Use in place of `@AppEntity(schema:)`; adds everything that macro adds, plus `GenerableEntity`. |
| `AppEntityTraits` | `struct AppEntityTraits` | The roles an app entity takes on, passed to `@AppEntity`. Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `SetAlgebra`, `Sendable`, `SendableMetatype`. |
| `AppEntityTraits.generable` | `static let generable: AppEntityTraits` | The model can generate values of the entity on its own; adds a `GenerableEntity` conformance. |
| `AppEntity.authenticationPolicy` | `static var authenticationPolicy: IntentAuthenticationPolicy { get }` | The minimum policy for each of the entity's properties; a property's own policy can make it stricter, a weaker one is raised to this policy. Default: `IntentAuthenticationPolicy.alwaysAllowed`. iOS 27.3+ (beta), all platforms listed on its page. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, visionOS 27.3+
- `AppEntityTraits` is read by the macro as written, so list traits directly. A set holds each trait at most once.
- Not the same as the older `AppEntity(schema:)` macro; see app-schemas/appentity-schema-macro.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/appentity(_:) , https://developer.apple.com/documentation/appintents/appentity(_:schema:) , https://developer.apple.com/documentation/appintents/appentitytraits , https://developer.apple.com/documentation/appintents/appentitytraits/generable and https://developer.apple.com/documentation/appintents/appentity/authenticationpolicy (fetched 2026-11-14)

## Related

- [GenerableEntity](./generableentity.md)
- [AppIntent(_:) / AppIntent(_:schema:) / AppIntentTraits](./appintent-tool-macros.md)
- [AppEntity](../entities/appentity.md)
- [AppEntity(schema:)](../app-schemas/appentity-schema-macro.md)
