---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-books
---

# Books domain

Make your ebook reader's actions available in the Shortcuts app by adopting schemas for common reading actions.

## Signature / Usage

```swift
@AppIntent(schema: .books.openBook)
struct OpenBookIntent: OpenIntent {
    var target: <#BookEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}
```

The `.books` domain defines app schemas that provide a structured representation for common reading actions and content. Xcode generates a template implementation when you type `books_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.BooksIntent`, "Identifies intent schemas in the books domain."):

| Name | Type | Description |
| --- | --- | --- |
| `navigatePage` | `var navigatePage: some AppSchemaIntent` | An intent schema that navigates to the next or previous page. |
| `openBook` | `var openBook: some AppSchemaIntent` | An intent schema that opens the specified book. |
| `updateCharacterSpacing` | `var updateCharacterSpacing: some AppSchemaIntent` | An intent schema that updates the character spacing for a book. |
| `updateFontSize` | `var updateFontSize: some AppSchemaIntent` | An intent schema that updates the font size for a book. |
| `updateLineSpacing` | `var updateLineSpacing: some AppSchemaIntent` | An intent schema that updates the line spacing for a book. |
| `updateSettings` | `var updateSettings: some AppSchemaIntent` | An intent schema that updates the settings for a book. |
| `updateWordSpacing` | `var updateWordSpacing: some AppSchemaIntent` | An intent schema that updates the word spacing for a book. |

Content and parameter types (`AppSchema.BooksEntity`, "Identifies entity schemas in the books domain."):

| Name | Type | Description |
| --- | --- | --- |
| `audiobook` | `var audiobook: some AppSchemaEntity` | An entity schema for an audiobook. |
| `book` | `var book: some AppSchemaEntity` | An entity schema for a book. |
| `settings` | `var settings: some AppSchemaEntity` | An entity schema for settings. |

Types for static parameters (`AppSchema.BooksEnum`, "Identifies enum schemas in the books domain."):

| Name | Type | Description |
| --- | --- | --- |
| `contentType` | `var contentType: some AppSchemaEnum` | An enum schema for a content type parameter. |
| `font` | `var font: some AppSchemaEnum` | An enum schema for a font parameter. |
| `fontSize` | `var fontSize: some AppSchemaEnum` | An enum schema for a font size parameter. |
| `navigationDirection` | `var navigationDirection: some AppSchemaEnum` | An enum schema for a navigation direction parameter. |
| `pageNavigationSetting` | `var pageNavigationSetting: some AppSchemaEnum` | An enum schema for a page navigation setting parameter. |
| `relativeCharacterSpacingChange` | `var relativeCharacterSpacingChange: some AppSchemaEnum` | An enum schema for a relative character spacing change parameter. |
| `relativeFontChange` | `var relativeFontChange: some AppSchemaEnum` | An enum schema for a relative font change parameter. |
| `relativeLineSpacingChange` | `var relativeLineSpacingChange: some AppSchemaEnum` | An enum schema for a relative line spacing change parameter. |
| `relativeWordSpacingChange` | `var relativeWordSpacingChange: some AppSchemaEnum` | An enum schema for a relative word spacing change parameter. |
| `theme` | `var theme: some AppSchemaEnum` | An enum schema for a theme parameter. |

Deprecated schemas (marked deprecated in the domain's topic list; no replacement stated on the page):

| Name | Type | Description |
| --- | --- | --- |
| `playAudiobook` | `var playAudiobook: some AppSchemaIntent` | An intent schema that plays an audiobook. |
| `search` | `var search: some AppSchemaIntent` | An intent schema that opens the app and searches for the given term. |

## Notes

- Platforms (taken from the `openBook` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `openBook` is Shortcuts.
- This is one of the Shortcuts-specific domains. The primary domains that do target Apple Intelligence and Siri live in the `app-schemas` category, which is a separate set of schemas.
- Applying a schema: `@AppIntent(schema: .books.openBook)` generates the properties and protocol conformance the schema requires for the intent implementation.
- Snippet source: the example code on the `openBook` action page, reproduced verbatim (placeholders in `<# #>` are Xcode placeholders).

## Related

- [Browser domain](./domain-browser.md)
- [Files domain](./domain-files.md)
- [Reader domain](./domain-reader.md)
- [OpenIntent](../intent-types/openintent.md)
