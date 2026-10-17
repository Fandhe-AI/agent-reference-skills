---
source: https://developer.apple.com/documentation/foundationmodels/generationschema, https://developer.apple.com/documentation/foundationmodels/generationschema/property, https://developer.apple.com/documentation/foundationmodels/generationschema/schemaerror
---

# GenerationSchema

A type that describes the properties of an object and any guides on their values. Generation schemas guide the output of a language model to deterministically ensure the output is in the desired format.

## Signature / Usage

```swift
struct GenerationSchema
```

Initializers:

```swift
init(root: DynamicGenerationSchema, dependencies: [DynamicGenerationSchema]) throws
init(type: any Generable.Type, description: String? = nil, anyOf choices: [String])
init(type: any Generable.Type, description: String? = nil, properties: [GenerationSchema.Property])
init(type: any Generable.Type, description: String? = nil, representNilExplicitlyInGeneratedContent explicitNil: Bool, properties: [GenerationSchema.Property])
```

Instance property:

```swift
var name: String { get }
```

## Options / Props

| Name | Description |
| --- | --- |
| init(root:dependencies:) | Creates a schema by providing an array of dynamic schemas. |
| init(type:description:anyOf:) | Creates a schema for a string enumeration. |
| init(type:description:properties:) | Creates a schema by providing an array of properties. |
| init(type:description:representNilExplicitlyInGeneratedContent:properties:) | Creates a schema by providing an array of properties. |
| name | The name of this generation schema. |
| GenerationSchema.Property | A named, strongly typed member of an object type with an optional description and guides. |
| GenerationSchema.SchemaError | An error that occurs when there is a problem creating a generation schema. |

### GenerationSchema.Property

```swift
struct Property
```

Member (label form only; the full signature was not available in the fetched source): `init(name:description:type:guides:)` - Creates a property that contains a string type. Conforms to `Sendable` and `SendableMetatype`.

### GenerationSchema.SchemaError

```swift
@nonexhaustive enum SchemaError
```

| Case | Description |
| --- | --- |
| duplicateProperty(schema:property:context:) | An attempt to construct a dynamic schema with properties that have conflicting names. |
| duplicateType(schema:type:context:) | An attempt to construct a schema from dynamic schemas in which two or more of the subschemas have the same type name. |
| emptyTypeChoices(schema:context:) | An attempt to construct an anyOf schema with an empty array of type choices. |
| undefinedReferences(schema:references:context:) | An attempt to construct a schema from dynamic schemas in which one of those schemas references an undefined schema. |
| Context | The context in which the error occurred. |
| errorDescription | A string representation of the error description. |
| recoverySuggestion | A suggestion that indicates how to handle the error. |

`SchemaError` provides `LocalizedError` implementations.

## Notes

- Availability (`GenerationSchema`, `Property`, `SchemaError`): iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- `@Generable` types get their `generationSchema` automatically; use `GenerationSchema` directly, or build one at runtime from `DynamicGenerationSchema`.
- Distinct from JSON Schema definitions used by cloud structured-output and tool-calling APIs (openai-api-core, openai-agents, anthropic-api-tools-mcp).
- Source fetched 2026-10-16 (no version in URL).

## Related

- [DynamicGenerationSchema](./dynamic-generation-schema.md)
- [Generable](./generable.md)
- [GeneratedContent](./generated-content.md)
- [GenerationGuide](./generation-guide.md)
