---
source: https://developer.apple.com/documentation/appintents/appentityuielement
---

# AppEntityUIElement

A type that wraps your app entity and adds information to make a custom view's content discoverable by Apple Intelligence.

## Signature / Usage

```swift
struct AppEntityUIElement
```

```swift
init<Entity>(_: Entity, bounds: CGRect, state: AppEntityUIElement.State, subelements: [AppEntityUIElement])
init(identifier: EntityIdentifier, bounds: CGRect, state: AppEntityUIElement.State, subelements: [AppEntityUIElement])
```

```swift
var appEntityUIElementProvider: ((UIView, AppEntityUIElementsContext) -> [AppEntityUIElement])?
```

(The last declaration is `UIView.appEntityUIElementProvider`, from UIKit; shown as referenced by this page.)

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `identifier` | `EntityIdentifier` | The identifier of the app entity that represents the UI element. |
| `bounds` | `CGRect` | The bounds of the content in the view's local coordinate space. |
| `state` | `AppEntityUIElement.State` | The property that indicates if the UI element is selected. |
| `subelements` | `[AppEntityUIElement]` | An array of UI elements that represent subelements in the view hierarchy. |
| `AppEntityUIElement.State` | struct | The current UI state of the entity that's visible onscreen. |

## Notes

- iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, macOS 15.4+, tvOS 18.4+, visionOS 2.4+, watchOS 11.4+
- Use for a custom view where your app manages state for the user interface or uses custom drawing (for example, a custom list or tab implementation that manages selection in the app, or an interface rendered with Metal). Make content discoverable by Apple Intelligence through the view's `appEntityUIElementProvider` property, providing a list of `AppEntityUIElement` instances.
- The provider closure supplies instances that combine the app entity with spatial and state information so the system understands onscreen content.
- `UIView` itself is covered by apple-uikit; this skill covers only the App Intents side.
- Article: "Providing contextual cues to Apple Intelligence and Siri".
- Conforms to `Sendable`, `SendableMetatype`.

## Related

- [AppEntityUIElementsContext](./appentityuielementscontext.md)
- [UIKit data sources](./uikit-appintents-data-sources.md)
