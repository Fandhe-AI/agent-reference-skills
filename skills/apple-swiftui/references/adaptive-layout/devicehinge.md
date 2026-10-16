# DeviceHinge / onHingeChange(isEnabled:_:)

A type encapsulating the state of a single hinge, delivered through `onHingeChange` as part of a `DeviceHingeContext`.

## Signature / Usage

```swift
@State private var hinge: DeviceHinge? = nil

var body: some View {
    VStack {
        if let hinge {
            AngleDisplayView(angle: hinge.angle)
            StatusDisplayView(status: hinge.status)
        } else {
            ContentUnavailableView(
                "Hinge Unavailable",
                systemImage: "rectangle.split.2x1")
        }
    }
    .onHingeChange { _, newContext in
        hinge = newContext.hinge
    }
}
```

```swift
nonisolated func onHingeChange(isEnabled: Bool = true, _ action: @escaping (DeviceHingeContext, DeviceHingeContext) -> Void) -> some View
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeviceHinge.angle` | `Angle` | Current angle of the hinge |
| `DeviceHinge.status` | `DeviceHinge.Status` | Current status of the hinge: `.closed`, `.partiallyOpen`, `.fullyOpen` |
| `DeviceHingeContext.hinge` | `DeviceHinge?` | The current hinge of the device |
| `isEnabled` | `Bool` | Whether the action is active (default `true`) |
| `action` | `(DeviceHingeContext, DeviceHingeContext) -> Void` | Called when the hinge context changes; the closure receives two `DeviceHingeContext` values (the example names them `_, newContext`) |

## Notes

- Available: iOS 27.1+ (and iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.1+)
- The status is determined by the system from the current angle and device orientation
- `DeviceHinge` conforms to `Equatable`, `Hashable`, `Sendable`; `DeviceHingeContext` to `Equatable`, `Sendable`
- `DeviceHingeContext.hinge` is optional; show a fallback when the device has no hinge
- Source: https://developer.apple.com/documentation/swiftui/devicehinge

## Related

- [ReservedRegion](./reservedregion.md)
- [ArrangementView](./arrangementview.md)
