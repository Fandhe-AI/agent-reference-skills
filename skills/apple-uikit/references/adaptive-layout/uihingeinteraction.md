# UIHingeInteraction

An interaction for observing the hinge state associated with the view's hierarchy. Also covers `UIHinge` (an object encapsulating the state of a single hinge) and its `Status` enumeration.

## Signature / Usage

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    let interaction = UIHingeInteraction { [weak self] _, update in
        guard let self else { return }
        // A nil `hinge` indicates the interaction has left a
        // hierarchy that provides hinge updates.
        guard let hinge = update.hinge else {
            handleHingeUnavailable()
            return
        }

        updateAngleDisplay(with: hinge.angle)
        updateStatusDisplay(with: hinge.status)
    }

    view.addInteraction(interaction)
}
```

```swift
@MainActor class UIHingeInteraction : NSObject, UIInteraction
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| init(updateHandler:) | `init(updateHandler: (UIHingeInteraction, UIHingeInteraction.Update) -> Void)` | Creates a new hinge interaction with the provided update handler. |
| isEnabled | `var isEnabled: Bool` | Whether the interaction is enabled. |
| Update | `@MainActor class UIHingeInteraction.Update` | An update for a `UIHingeInteraction`. |
| Update.hinge | `hinge` (optional `UIHinge`) | The current hinge state for the interaction, or `nil` when the interaction leaves a hierarchy that provides hinge updates. |
| UIHinge | `@MainActor class UIHinge` | Object encapsulating the state of a single hinge. |
| UIHinge.angle | property | The current angle of the hinge, in radians. |
| UIHinge.status | `UIHinge.Status` | The current status of the hinge. |
| UIHinge.Status | `enum Status` with `init?(rawValue: Int)` | Cases: `closed` (the hinge is closed), `partiallyOpen` (partially open), `fullyOpen` (open as far as the device allows), `unknown` (status unknown). |

## Notes

- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, tvOS 27.1+, visionOS 27.1+.
- Add the interaction to a view to receive hinge state updates. The handler is called when the hinge state changes, or when the interaction moves between hierarchies.
- The Objective-C name of `Update` is `UIHingeInteractionUpdate`; the initializer is `initWithUpdateHandler:`.
- `UIHinge` has no separate page in this skill; it is covered here.
- Source: https://developer.apple.com/documentation/uikit/uihingeinteraction , https://developer.apple.com/documentation/uikit/uihinge

## Related

- [UIView.ReservedRegion](./uiview-reservedregion.md)
- [UIArrangementViewController](./uiarrangementviewcontroller.md)
