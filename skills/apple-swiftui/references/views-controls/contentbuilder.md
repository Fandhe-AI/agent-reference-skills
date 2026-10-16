# ContentBuilder

A custom parameter attribute that constructs views and other content types from closures; a type alias for `ViewBuilder` and the unified replacement for type-specific builders.

## Signature / Usage

```swift
typealias ContentBuilder = ViewBuilder
```

```swift
func contextMenu<MenuItems: View>(
    @ContentBuilder menuItems: () -> MenuItems
) -> some View

@ContentBuilder
var editingToolbarItems: some ToolbarContent {
    ForEach(EditingOptions.toolbarItems, id: \.self) { editingOption in
        ToolbarItem {
            Button(editingOption.title) {
                editingOption.action()
            }
        }
    }
}
```

## Notes

- Metadata lists iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+ as the OS floor. Using the type-agnostic behavior requires building with Xcode 27 or later; the OS floor and the build-tool requirement are separate.
- With Xcode 27 and later, for any version of SwiftUI, `ViewBuilder` closures also construct type-agnostic content and do not restrict closure types to `View` conformance. Mark closures with `ContentBuilder` to indicate where your code expects this behavior.
- `ContentBuilder` serves as the unified replacement for type-specific builders such as `ToolbarContentBuilder` and `CommandsBuilder`. Those two builders are not marked deprecated on their pages (`ToolbarContentBuilder`: iOS 14.0+; `CommandsBuilder`: iOS 14.0+ / macOS 11.0+, no tvOS or watchOS).
- `ContentBuilder` does not enforce protocol conformance in its build functions; type safety comes from conditional conformances on the produced content types. For example, `TupleContent` conditionally conforms to content types based on the types of its items.
- As a result, one shared set of initializers on `Group`, `ForEach`, and `Section` serves all content types, instead of a separate overloaded initializer per builder.
- Source: https://developer.apple.com/documentation/swiftui/contentbuilder

## Related

- [ForEach](./foreach.md)
- [Section](./section.md)
