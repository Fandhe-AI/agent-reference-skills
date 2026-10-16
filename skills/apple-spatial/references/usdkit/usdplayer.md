# USDPlayer

Drives timeline playback of a USD stage and produces per-frame render data.

## Signature / Usage

```swift
final class USDPlayer

convenience init(stage: USDStage)                          // Metal-enabled player
convenience init(stage: USDStage, gpuFamily: MTLGPUFamily) // Metal-less player
func update(timeCode: USDStage.TimeCode) -> sending USDPlayer.FrameUpdate?
func importCustomIBLTexture(data: Data) throws -> USDPlayer.TextureData
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FrameUpdate` | struct | Snapshot of all mesh, material, texture, and deformation changes from the last update |
| `MeshData` / `MeshID` | struct | Mesh geometry data from a USD mesh prim / resource identifier |
| `MaterialData` / `MaterialID` | struct | Material data from a USD material prim / resource identifier |
| `TextureData` / `TextureID` | struct | Texture data from a texture asset referenced by a material prim / resource identifier |
| `TextureLevelInfo` | struct | Byte-layout descriptor for a single mip level within a `TextureData` |
| `DeformationData` / `DeformationID` | struct | Deformation data for a single deformable mesh / resource identifier |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit (related module: RealityKit).
- `update(timeCode:)` updates the stage to the time code and returns a `FrameUpdate` describing all scene changes, or `nil`.
- `importCustomIBLTexture(data:)` imports a custom IBL (image-based lighting) texture.
- Source: https://developer.apple.com/documentation/usdkit/usdplayer (fetched 2026-10 from the DocC JSON).

## Related

- [USDStageComponent](./usdstagecomponent.md)
- [USDStage](./usdstage.md)
