---
source: https://developer.apple.com/documentation/foundationmodels/generating-swift-data-structures-with-guided-generation
---

# Generating Swift data structures with guided generation

Create robust apps by describing output you want programmatically.

## Signature / Usage

```swift
@Generable(description: "Basic profile information about a cat")
struct CatProfile {
    // A guide isn't necessary for basic fields.
    var name: String

    @Guide(description: "The age of the cat", .range(0...20))
    var age: Int

    @Guide(description: "A one sentence profile about the cat's personality")
    var profile: String
}
```

```swift
// Generate a response using a custom type.
let response = try await session.respond(
    to: "Generate a cute rescue cat",
    generating: CatProfile.self
)
```

Basic types:

```swift
let prompt = "How many tablespoons are in a cup?"
let session = LanguageModelSession(model: .default)

// Generate a response with the type `Float`, instead of `String`.
let response = try await session.respond(to: prompt, generating: Float.self)
```

Dynamic schema at runtime:

```swift
// Create the dynamic schema at runtime.
let menuSchema = DynamicGenerationSchema(
    name: "Menu",
    properties: [
        DynamicGenerationSchema.Property(
            name: "dailySoup",
            schema: DynamicGenerationSchema(
                name: "dailySoup",
                anyOf: ["Tomato", "Chicken Noodle", "Clam Chowder"]
            )
        )

        // Add additional properties.
    ]
)
```

```swift
// Create the schema.
let schema = try GenerationSchema(root: menuSchema, dependencies: [])

// Pass the schema to the model to guide the output.
let response = try await session.respond(
    to: "The prompt you want to make.",
    schema: schema
)
```

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+).
- Guided generation gives strong guarantees that the response is in the format you expect. The framework uses constrained sampling, which prevents malformed output and returns a type you define.
- Supported basic types: `Bool`, `Int`, `Float`, `Double`, `Decimal`, and `Array`.
- Use `Generable(description:)` on structures, actors, and enumerations; use `Guide(description:)` only with stored properties. Keep descriptions short because long ones take context size and add latency.
- The model generates `Generable` properties in the order they are declared.
- `Generable` types can be nested, and enumerations with associated values can be `Generable`; the macro ensures all associated and nested values are themselves generable.
- Creating a `GenerationSchema` from a `DynamicGenerationSchema` can throw if there are conflicting property names, undefined references, or duplicate types.
- A dynamic schema response is a `GeneratedContent`; decode properties with `value(_:forProperty:)`.

## Related

- [Generable](../structured-output/generable.md)
- [Generable macro](../structured-output/generable-macro.md)
- [Guide macro](../structured-output/guide-macro.md)
- [GenerationSchema](../structured-output/generation-schema.md)
- [DynamicGenerationSchema](../structured-output/dynamic-generation-schema.md)
- [Generating content and performing tasks with Foundation Models](./generating-content.md)
