---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-presentation
---

# Presentation domain

Make your presentation app's actions available in the Shortcuts app by adopting schemas for common presentation actions.

## Signature / Usage

```swift
@AppIntent(schema: .presentation.open)
struct OpenPresentationIntent: OpenIntent {
    var target: <#PresentationEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.presentation` domain defines app schemas that provide a structured representation for common presentation actions and content. Xcode generates a template implementation when you type `presentation_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.PresentationIntent`, "Identifies intent schemas in the presentation domain."):

| Name | Type | Description |
| --- | --- | --- |
| `addAudioToSlide` | `var addAudioToSlide: some AppSchemaIntent` | An intent schema that adds an audio clip to a slide. |
| `addCommentToSlide` | `var addCommentToSlide: some AppSchemaIntent` | An intent schema that adds a comment to a slide. |
| `addImageToSlide` | `var addImageToSlide: some AppSchemaIntent` | An intent schema that adds an image to a slide. |
| `addTextBoxToSlide` | `var addTextBoxToSlide: some AppSchemaIntent` | An intent schema that adds a text box to a slide. |
| `addWebVideoToSlide` | `var addWebVideoToSlide: some AppSchemaIntent` | An intent schema that adds a web video to a slide. |
| `create` | `var create: some AppSchemaIntent` | An intent schema that opens the app for composing a new presentation. |
| `createSlide` | `var createSlide: some AppSchemaIntent` | An intent schema that creates a new slide in a presentation document. |
| `deleteSlide` | `var deleteSlide: some AppSchemaIntent` | An intent schema that deletes slides in a presentation. |
| `open` | `var open: some AppSchemaIntent` | An intent schema that opens the app into an existing presentation. |
| `openSlide` | `var openSlide: some AppSchemaIntent` | An intent schema that opens a slide. |
| `setSlideTitle` | `var setSlideTitle: some AppSchemaIntent` | An intent schema that sets the title of the slide. |
| `startPlayback` | `var startPlayback: some AppSchemaIntent` | An intent schema that plays the presentation from the start or selected slide. |
| `stopPlayback` | `var stopPlayback: some AppSchemaIntent` | An intent schema that stops the currently playing presentation. |
| `update` | `var update: some AppSchemaIntent` | An intent schema that renames an existing presentation. |

Content and parameter types (`AppSchema.PresentationEntity`, "Identifies entity schemas in the presentation domain."):

| Name | Type | Description |
| --- | --- | --- |
| `document` | `var document: some AppSchemaEntity` | An entity schema for a document. |
| `slide` | `var slide: some AppSchemaEntity` | An entity schema for a slide. |
| `template` | `var template: some AppSchemaEntity` | An entity schema for a template. |

## Notes

- Platforms (taken from the `open` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `open` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. The domain has no enum schemas and no deprecated schemas listed.
- Applying a schema: `@AppIntent(schema: .presentation.open)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `open` action page, reproduced verbatim.

## Related

- [Spreadsheet domain](./domain-spreadsheet.md)
- [Word processor domain](./domain-word-processor.md)
- [Whiteboard domain](./domain-whiteboard.md)
- [OpenIntent](../intent-types/openintent.md)
