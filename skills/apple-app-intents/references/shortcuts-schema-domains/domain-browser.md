---
source: https://developer.apple.com/documentation/appintents/app-schema-domain-browser
---

# Browser domain

Make your web browser's actions available in the Shortcuts app by adopting schemas for common browsing actions.

## Signature / Usage

```swift
@AppIntent(schema: .browser.createTab)
struct CreateTabIntent {
    var url: URL?
    var isPrivate: Bool

    func perform() async throws -> some ReturnsValue<<#TabEntity#>> {
        <#code#>
    }
}
```

The `.browser` domain defines app schemas that provide a structured representation for common browsing actions and content. Xcode generates a template implementation when you type `browser_` and select a schema from the suggestions list.

## Options / Props

Actions (`AppSchema.BrowserIntent`, "Identifies intent schemas in the browser domain."):

| Name | Type | Description |
| --- | --- | --- |
| `bookmarkTab` | `var bookmarkTab: some AppSchemaIntent` | An intent schema that creates a new bookmark for this tab. |
| `bookmarkURL` | `var bookmarkURL: some AppSchemaIntent` | An intent schema that creates a new bookmark for a given URL. |
| `clearHistory` | `var clearHistory: some AppSchemaIntent` | An intent schema that clears history, and related cookies and other website data. |
| `closeTabs` | `var closeTabs: some AppSchemaIntent` | An intent schema that closes the selected tabs. |
| `closeWindows` | `var closeWindows: some AppSchemaIntent` | An intent schema that closes the selected windows. |
| `createTab` | `var createTab: some AppSchemaIntent` | An intent schema that creates a new tab with a URL loaded, or blank if omitted. |
| `createWindow` | `var createWindow: some AppSchemaIntent` | An intent schema that creates a new browser window. |
| `deleteBookmarks` | `var deleteBookmarks: some AppSchemaIntent` | An intent schema that deletes the selected bookmarks. |
| `findOnPage` | `var findOnPage: some AppSchemaIntent` | An intent schema that finds the given text on the selected tab. |
| `openBookmark` | `var openBookmark: some AppSchemaIntent` | An intent schema that opens the specified bookmark. |
| `openURLInTab` | `var openURLInTab: some AppSchemaIntent` | An intent schema that navigates a tab to the given URL. |
| `switchTab` | `var switchTab: some AppSchemaIntent` | An intent schema that switches to an existing tab. |

Content and parameter types (`AppSchema.BrowserEntity`, "Identifies entity schemas in the browser domain."):

| Name | Type | Description |
| --- | --- | --- |
| `bookmark` | `var bookmark: some AppSchemaEntity` | An entity schema for a bookmark. |
| `readingListItem` | `var readingListItem: some AppSchemaEntity` | An entity schema for a reading list item. |
| `tab` | `var tab: some AppSchemaEntity` | An entity schema for a tab. |
| `tabGroup` | `var tabGroup: some AppSchemaEntity` | An entity schema for a tab group. |
| `window` | `var window: some AppSchemaEntity` | An entity schema for a window. |

Types for static parameters (`AppSchema.BrowserEnum`, "Identifies enum schemas in the browser domain."):

| Name | Type | Description |
| --- | --- | --- |
| `clearHistoryTimeFrame` | `var clearHistoryTimeFrame: some AppSchemaEnum` | An enum schema for a clear history time frame parameter. |

Deprecated schemas (marked deprecated in the domain's topic list; no replacement stated on the page):

| Name | Type | Description |
| --- | --- | --- |
| `search` | `var search: some AppSchemaIntent` | An intent schema that searches for the given string on the web. |

## Notes

- Platforms (taken from the `createTab` action page; the domain page itself lists none): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+.
- Schemas in this domain don't make your conforming types discoverable by Apple Intelligence and Siri. The supported system experience for `createTab` is Shortcuts.
- This is one of the Shortcuts-specific domains; the primary Apple Intelligence / Siri domains live in the `app-schemas` category.
- Applying a schema: `@AppIntent(schema: .browser.createTab)` generates the properties and protocol conformance the schema requires for the intent implementation.
- This domain describes your own app's browsing actions as App Intents; it is not the WebKit or Safari extension API surface.
- Snippet source: the example code on the `createTab` action page, reproduced verbatim.

## Related

- [Books domain](./domain-books.md)
- [Files domain](./domain-files.md)
- [Reader domain](./domain-reader.md)
