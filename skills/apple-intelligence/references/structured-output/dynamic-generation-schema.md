---
source: https://developer.apple.com/documentation/foundationmodels/dynamicgenerationschema, https://developer.apple.com/documentation/foundationmodels/dynamicgenerationschema/property
---

# DynamicGenerationSchema

The dynamic counterpart to the generation schema type that you use to construct schemas at runtime. An individual schema may reference other schemas by name, and references are resolved when converting a set of dynamic schemas into a `GenerationSchema`.

## Signature / Usage

```swift
struct DynamicGenerationSchema
```

Initializers:

```swift
init(arrayOf itemSchema: DynamicGenerationSchema, minimumElements: Int? = nil, maximumElements: Int? = nil)
init(name: String, description: String? = nil, anyOf choices: [DynamicGenerationSchema])
init(name: String, description: String? = nil, properties: [DynamicGenerationSchema.Property])
init(name: String, description: String? = nil, representNilExplicitlyInGeneratedContent explicitNil: Bool, properties: [DynamicGenerationSchema.Property])
init(referenceTo name: String)
init<Value>(type: Value.Type, guides: [GenerationGuide<Value>] = []) where Value : Generable
```

Null schema:

```swift
static var null: DynamicGenerationSchema { get }
```

## Options / Props

| Name | Description |
| --- | --- |
| init(arrayOf:minimumElements:maximumElements:) | Creates an array schema. |
| init(name:description:anyOf:) | Creates an any-of schema. |
| init(name:description:properties:) | Creates an object schema. |
| init(name:description:representNilExplicitlyInGeneratedContent:properties:) | Creates an object schema. |
| init(referenceTo:) | Creates a reference schema. |
| init(type:guides:) | Creates a schema from a generable type and guides. |
| null | A schema that represents a null value. |
| DynamicGenerationSchema.Property | A property that belongs to a dynamic generation schema. |

### DynamicGenerationSchema.Property

```swift
struct Property
```

Fields are named members of object types. Fields are strongly typed and have optional descriptions. Member (label form only; the full signature was not available in the fetched source): `init(name:description:schema:isOptional:)` - Creates a property referencing a dynamic schema.

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- Convert with `GenerationSchema.init(root:dependencies:)`, which throws `GenerationSchema.SchemaError` for duplicate property or type names, empty `anyOf` choices, or undefined references.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [GenerationSchema](./generation-schema.md)
- [Generable](./generable.md)
- [GenerationGuide](./generation-guide.md)
