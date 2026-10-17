---
source: https://developer.apple.com/documentation/foundationmodels/generationid
---

# GenerationID

A unique identifier that is stable for the duration of a response, but not across responses.

## Signature / Usage

```swift
struct GenerationID
```

The framework guarantees a `GenerationID` to be both present and stable when you receive it from a `LanguageModelSession`. When you create an instance of `GenerationID` there is no guarantee an identifier is present or stable.

```swift
@Generable struct Person: Equatable {
    var id: GenerationID
    var name: String
}

struct PeopleView: View {
    @State private var session = LanguageModelSession()
    @State private var people = [Person.PartiallyGenerated]()

    var body: some View {
        // A person's name changes as the response is generated,
        // and two people can have the same name, so it is not suitable
        // for use as an id.
        //
        // `GenerationID` receives special treatment and is guaranteed
        // to be both present and stable.
        List {
            ForEach(people) { person in
                Text("Name: \(person.name)")
            }
        }
        .task {
            do {
                for try! await people in stream.streamResponse(
                    to: "Who were the first 3 presidents of the US?",
                    generating: [Person].self
                ) {
                    withAnimation {
                        self.people = people
                }
            } catch {
                // Handle the thrown error.
            }
        }
    }
}
```

## Options / Props

| Name | Description |
| --- | --- |
| init() | Creates a unique identifier. |

## Notes

- Availability: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+, watchOS 27.0+.
- The example is copied verbatim from the source page, including its original syntax (for example `stream` is not declared and the braces are not balanced); treat it as illustrative, not compilable.
- `GeneratedContent.id` is the `GenerationID?` carried by generated content.
- Source fetched 2026-10-16 (no version in URL).

## Related

- [GeneratedContent](./generated-content.md)
- [Generable](./generable.md)
