# hoverEffect(_:)

Applies a visual hover effect to a view when the user's gaze or pointer moves over it.

## Signature / Usage

```swift
nonisolated func hoverEffect(_ effect: HoverEffect = .automatic) -> some View
```

```swift
Button("Tap me") { }
    .hoverEffect(.lift)
```

## Options / Props

`HoverEffect` static properties:

| Value | Description |
|-------|-------------|
| `.automatic` | Platform-chosen effect (default) |
| `.highlight` | Pointer morphs into a platter behind the view with a light source |
| `.lift` | Pointer slides under the view; view scales up and gains a shadow |

Extended variants:

| Modifier | Description |
|----------|-------------|
| `hoverEffect(_:in:isEnabled:)` | Apply effect and optionally add to a `HoverEffectGroup` |
| `hoverEffect(in:isEnabled:body:)` | Describe the effect with a closure |
| `defaultHoverEffect(_:)` | Set default effect for all descendant views |

## Notes

- visionOS 1.0+; iOS 13.4+; iPadOS 13.4+.
- Control the automatic effect's behavior with `.defaultHoverEffect(_:)` on an ancestor view.
- Group coordinated effects with `HoverEffectGroup` so multiple views react together.

## Related

- [glassBackgroundEffect](./glassbackgroundeffect.md)
