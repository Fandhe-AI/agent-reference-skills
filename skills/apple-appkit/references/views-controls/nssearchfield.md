# NSSearchField

A text field optimized for performing text-based searches.

## Signature / Usage

```swift
class NSSearchField : NSTextField
```

```swift
var delegate: (any NSSearchFieldDelegate)? { get set }
var searchMenuTemplate: NSMenu? { get set }
var recentSearches: [String] { get set }
var maximumRecents: Int { get set }
var recentsAutosaveName: NSSearchField.RecentsAutosaveName? { get set }
var sendsSearchStringImmediately: Bool { get set }
var sendsWholeSearchString: Bool { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `(any NSSearchFieldDelegate)?` | The delegate for the search field, or `nil` if the search field doesn't have a delegate. |
| `searchMenuTemplate` | `NSMenu?` | The menu object used to dynamically construct the search field's pop-up icon menu. |
| `sendsSearchStringImmediately` | `Bool` | Whether the cell calls its action method immediately when an appropriate action occurs. |
| `sendsWholeSearchString` | `Bool` | Whether the cell calls its search action method when the user clicks the search button or presses Return, or after each keystroke. |
| `recentSearches` | `[String]` | The list of recent search strings for the control. |
| `maximumRecents` | `Int` | The maximum number of search strings that can appear in the search menu. |
| `recentsAutosaveName` | `NSSearchField.RecentsAutosaveName?` | The name under which the search field automatically archives the list of recent search strings. |
| `cancelButtonBounds` | `NSRect` | The rectangle for the cancel button within the bounds of the search field. |
| `searchButtonBounds` | `NSRect` | The rectangle for the search button within the bounds of the search field. |
| `searchTextBounds` | `NSRect` | The rectangle for the search text within the bounds of the search field. |
| `NSSearchField.clearRecentsMenuItemTag` | `Int` (class var) | The menu item for clearing the current set of recent string searches in the menu. |
| `NSSearchField.noRecentsMenuItemTag` | `Int` (class var) | The menu item that describes a lack of recent search strings. |
| `NSSearchField.recentsMenuItemTag` | `Int` (class var) | The location of recent search strings in the "recents" menu group. |
| `NSSearchField.recentsTitleMenuItemTag` | `Int` (class var) | The menu item that provides the title of the menu group for recent search strings. |

## Notes

- Platform: macOS (the symbol page lists no introduced version).
- Provides a customized text field for entering search data, with a search button, a cancel button, and a pop-up icon menu listing recent search strings and custom search categories.
- An `NSSearchField` wraps an `NSSearchFieldCell`, which provides access to most search field attributes and a comprehensive programmatic interface; the docs point to `NSSearchFieldCell` for implementation details.
- `NSSearchFieldDelegate` is the protocol a delegate uses to determine when a search started or ended.
- Deprecated: `centersPlaceholder` (`Bool`), `rectForCancelButton(whenCentered:)`, `rectForSearchButton(whenCentered:)`, `rectForSearchText(whenCentered:)`. Use `cancelButtonBounds` / `searchButtonBounds` / `searchTextBounds` instead.
- Distinct from SwiftUI `searchable` (see apple-swiftui).
- Source: https://developer.apple.com/documentation/appkit/nssearchfield

## Related

- [NSTextField](./nstextfield.md)
- [NSControl](./nscontrol.md)
