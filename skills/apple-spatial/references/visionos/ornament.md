# ornament(visibility:attachmentAnchor:contentAlignment:ornament:)

Presents an ornament — a UI element positioned at a specified location relative to a view, floating outside the window's 2D bounds.

## Signature / Usage

```swift
nonisolated func ornament<Content>(
    visibility: Visibility = .automatic,
    attachmentAnchor: OrnamentAttachmentAnchor,
    contentAlignment: Alignment3D = .back,
    @ContentBuilder ornament: () -> Content
) -> some View where Content: View
```

```swift
Text("Main content")
    .ornament(attachmentAnchor: .scene(.bottom)) {
        HStack {
            Button("Play") { }
            Button("Pause") { }
        }
        .glassBackgroundEffect()
    }
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `visibility` | `Visibility` | `.automatic` | When the ornament is visible |
| `attachmentAnchor` | `OrnamentAttachmentAnchor` | — | Where to anchor the ornament relative to the scene |
| `contentAlignment` | `Alignment3D` | `.back` | Alignment of the ornament with its anchor |
| `ornament` | `() -> Content` | — | View builder for ornament content |

Common `OrnamentAttachmentAnchor` values: `.scene(.bottom)`, `.scene(.top)`, `.scene(.leading)`, `.scene(.trailing)`.

## Notes

- visionOS 1.0+.
- Ornaments float outside the window plane in 3D space; they are ideal for persistent controls (e.g., playback toolbars).
- Apply `.glassBackgroundEffect()` to ornament content for the standard visionOS material.

## Related

- [glassBackgroundEffect](./glassbackgroundeffect.md)
