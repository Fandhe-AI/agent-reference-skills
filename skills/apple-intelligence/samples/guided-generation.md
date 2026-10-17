---
source: https://developer.apple.com/documentation/foundationmodels/generating-swift-data-structures-with-guided-generation
---

# Guided Generation

Describe the output as a `@Generable` Swift type, or as a runtime `DynamicGenerationSchema`, so the model returns structured values instead of raw strings.

```swift
let prompt = "How many tablespoons are in a cup?"
let session = LanguageModelSession(model: .default)

// Generate a response with the type `Float`, instead of `String`.
let response = try await session.respond(to: prompt, generating: Float.self)
```

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

Define a schema at runtime when it is not known at compile time:

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

- Use `@Generable(description:)` on structures, actors, and enumerations; use `@Guide(description:)` only on stored properties.
- The model generates `Generable` properties in the order they are declared. Keep descriptions short because they consume context size.
- Creating a `GenerationSchema` can throw on conflicting property names, undefined references, or duplicate types.
- A runtime-schema response is a `GeneratedContent`; decode a property with `value(_:forProperty:)`.
