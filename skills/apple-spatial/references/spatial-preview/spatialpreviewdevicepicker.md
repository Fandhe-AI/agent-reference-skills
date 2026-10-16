# SpatialPreviewDevicePicker

Presents nearby companion devices and allows the user to make a selection.

## Signature / Usage

```swift
@MainActor @preconcurrency struct SpatialPreviewDevicePicker
```

```swift
init(isPresented: Binding<Bool>, onSelect: (SpatialPreviewEndpoint) -> Void)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isPresented` | `Binding<Bool>` | Controls whether the picker is presented |
| `onSelect` | `(SpatialPreviewEndpoint) -> Void` | Called with the endpoint the user chose |

## Notes

- Available: macOS 27.0+. Module `SpatialPreview` (related module `SwiftUI`).
- A SwiftUI `View` that presents nearby companion devices and calls its closure with the chosen `SpatialPreviewEndpoint`; use it when you want to let someone select a device interactively.
- Conforms to `View`, `Sendable`, `SendableMetatype`.
- `ConnectedSpatialEndpointObserver` is the alternative for a device already connected via Mac Virtual Display.

## Related

- [SpatialPreviewEndpoint](./spatialpreviewendpoint.md)
- [ConnectedSpatialEndpointObserver](./connectedspatialendpointobserver.md)
