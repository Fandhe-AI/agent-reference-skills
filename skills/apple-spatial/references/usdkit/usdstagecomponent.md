# USDStageComponent

A component that renders a USD stage as RealityKit entities.

## Signature / Usage

```swift
struct USDStageComponent: Component

// Automatic mode: renders internally, waits for the first render
init(_: USDStage, timeCode: USDStage.TimeCode, allowsHitTesting: Bool) async

// Manual mode: you call render(_:to:at:)
init(allowsHitTesting: Bool)
static func render(_: USDStage, to: Entity, at: USDStage.TimeCode) async -> USDStageComponent.RenderResult
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stage` | `USDStage?` | Stage currently rendered; `nil` in manual mode before any render |
| `timeCode` | `USDStage.TimeCode` | Time code to render at |
| `allowsHitTesting` | `Bool` (`let`) | Whether rendered entities support hit testing; set at initialization only |
| `rendersAutomatically` | `Bool` (`let`) | `true` = automatic mode; `false` = manual mode |

### Type methods

| Method | Description |
|--------|-------------|
| `render(_:to:at:)` | Renders a USD stage to an entity in manual mode; returns `RenderResult` |
| `waitForRenderCompletion(on:)` | `async`; waits for automatic rendering on an `Entity` to complete |
| `coordinateSpace(on:at:timeCode:)` | Returns `some CoordinateSpace3DFloat` anchored to the closest rendered ancestor of a `USDLayer.Path` |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit (related module: RealityKit). Conforms to `Component`, `Copyable`, `Decodable`, `Encodable`, `Equatable`, `Escapable`.
- Attach the component to an entity to render USD content as child entities. Manual mode gives control of when rendering occurs; automatic mode updates when the stage or time code changes.
- This is a USDKit-module RealityKit component, distinct from loading USDZ through `Entity(named:)` in RealityKit.

## Related

- [USDStage](./usdstage.md)
- [USDPlayer](./usdplayer.md)
- [USDRenderError](./usdrendererror.md)
