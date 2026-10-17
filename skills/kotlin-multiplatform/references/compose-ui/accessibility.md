---
source: https://kotlinlang.org/docs/multiplatform/compose-accessibility.html
---

# Accessibility

Compose Multiplatform provides semantic properties, accessibility APIs and support for assistive technologies (screen readers, keyboard navigation), enabling applications that meet the European Accessibility Act (EAA) and WCAG requirements.

## Signature / Usage

Semantic properties form the semantic tree; assistive technologies traverse it instead of the entire UI tree.

```kotlin
Modifier.semantics { contentDescription = "Description of the image" }
Modifier.semantics { role = Role.Button }
Modifier.semantics { stateDescription = if (isChecked) "Checked" else "Unchecked" }
Modifier.testTag("my_unique_element_id")
```

Traversal order, prioritizing a floating action button:

```kotlin
@Composable
fun FloatingBox() {
    Box(
        modifier =
        Modifier.semantics {
            isTraversalGroup = true
            // Sets a negative index to prioritize over elements with the default index
            traversalIndex = -1f
        }
    ) {
        FloatingActionButton(onClick = {}) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Icon of floating action button"
            )
        }
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| contentDescription | — | Textual label that screen readers announce; primary accessibility API for non-textual or ambiguous elements such as `IconButton` and `FloatingActionButton` |
| role | — | Functional type of the component (button, checkbox, image) |
| stateDescription | — | Current state of an interactive element |
| testTag | — | Unique identifier for UI testing with Espresso on Android or XCUITest on iOS; also for debugging or automation |
| traversalIndex | Float | Default `0f`; the lower the value, the earlier the content is read |
| isTraversalGroup | — | Groups elements for correct navigation between traversal groups |

## Notes

- By default screen readers follow layout order left to right and top to bottom; define traversal properties for complex layouts (tables, nested scrollable or zoomable views).
- The full list of semantics properties is in the Jetpack Compose `SemanticsProperties` API reference.
- Platform-specific accessibility is on compose-ios/ios-accessibility.md (high-contrast theme, XCTest, trackpad and keyboard control; tree synchronization option for Compose Multiplatform 1.7.3 and earlier) and compose-desktop/desktop-accessibility.md (Windows enablement, macOS and Windows tools).
- Distance line: the common semantics API is documented by android-compose-ui; iOS VoiceOver / UIAccessibility belong to apple-uikit / apple-swiftui.

## Related

- [Support for iOS accessibility features](../compose-ios/ios-accessibility.md)
- [Support for desktop accessibility features](../compose-desktop/desktop-accessibility.md)
