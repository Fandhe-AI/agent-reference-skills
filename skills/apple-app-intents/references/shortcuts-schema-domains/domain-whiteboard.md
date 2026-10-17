---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-whiteboard
---

# Whiteboard domain

Make your whiteboard app's actions available in the Shortcuts app by adopting schemas for common whiteboard actions.

## Signature / Usage

```swift
@AppIntent(schema: .whiteboard.openBoard)
struct OpenCanvasBoardIntent: OpenIntent {
    var target: <#CanvasEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.whiteboard` domain defines app schemas that provide a structured representation for common whiteboard actions and content. Xcode generates a template implementation when you type `whiteboard_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.WhiteboardIntent`, "Identifies intent schemas in the whiteboard domain."):

| Name | Type | Description |
| --- | --- | --- |
| `createBoard` | `var createBoard: some AppSchemaIntent` | An intent schema that creates a new board. |
| `createItem` | `var createItem: some AppSchemaIntent` | An intent schema that adds an item to a board. |
| `deleteBoard` | `var deleteBoard: some AppSchemaIntent` | An intent schema that deletes one or more boards. |
| `deleteItem` | `var deleteItem: some AppSchemaIntent` | An intent schema that deletes the selected canvas items. |
| `openBoard` | `var openBoard: some AppSchemaIntent` | An intent schema that opens an existing board. |
| `updateBoard` | `var updateBoard: some AppSchemaIntent` | An intent schema that renames a board. |
| `updateItem` | `var updateItem: some AppSchemaIntent` | An intent schema that updates a board item. |

Content and parameter types (`AppSchema.WhiteboardEntity`, "Identifies entity schemas in the whiteboard domain."):

| Name | Type | Description |
| --- | --- | --- |
| `board` | `var board: some AppSchemaEntity` | An entity schema for a board. |
| `item` | `var item: some AppSchemaEntity` | An entity schema for an item. |

Types for static parameters (`AppSchema.WhiteboardEnum`, "Identifies enum schemas in the whiteboard domain."):

| Name | Type | Description |
| --- | --- | --- |
| `color` | `var color: some AppSchemaEnum` | An enum schema for a color parameter. |
| `itemType` | `var itemType: some AppSchemaEnum` | An enum schema for an item type parameter. |

## Notes

- Platforms (taken from the `openBoard` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `openBoard` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category. No deprecated schemas are listed.
- Applying a schema: `@AppIntent(schema: .whiteboard.openBoard)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `openBoard` action page, reproduced verbatim.

## Related

- [Presentation domain](./domain-presentation.md)
- [Spreadsheet domain](./domain-spreadsheet.md)
- [OpenIntent](../intent-types/openintent.md)
