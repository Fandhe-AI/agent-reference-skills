# USDStage

A 3D scene composed from one or more Universal Scene Description (USD) documents.

## Signature / Usage

```swift
struct USDStage

// Creating / opening
init(displayName: String?, loadingPayloads: USDStage.InitialLoadRule)
init(string: String, loadingPayloads: USDStage.InitialLoadRule) throws
init(_: Data, type: UTType, loadingPayloads: USDStage.InitialLoadRule) throws
static func open(_: URL, loadingPayloads: USDStage.InitialLoadRule) throws -> USDStage
static func open(_: FilePath, sessionLayer: USDLayer?, options: USDStage.OpenOptions) throws -> USDStage
static func open(rootLayer: USDLayer, sessionLayer: USDLayer?, options: USDStage.OpenOptions) throws -> USDStage

// Authoring prims
func definePrim(at: USDLayer.Path, type: USDToken) -> USDPrim
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pseudoRoot` | (see page) | Root of the prim hierarchy |
| `defaultPrim` | `USDPrim?` | The prim designated as the default entry point when the stage is referenced |
| `hasDefaultPrim` | `Bool` | True if the root layer has an authored opinion for the default prim layer metadata |
| `rootLayer` | (see page) | The stage's root layer |
| `editTarget` | `USDStage.EditTarget` | The destination for authoring operations |
| `timeCodeRange` / `timeCodesPerSecond` | (see page) | Time-code range and rate |
| `metersPerUnit` | `Double` | Meters represented by one unit in the stage's coordinate system |
| `hasAuthoredMetersPerUnit` | `Bool` | Whether `metersPerUnit` has an authored opinion |
| `upAxis` | (see page) | Stage up axis |
| `static fallbackUpAxis` | `USDToken` | Up axis used when a stage has no authored opinion |
| `descendants` | `[USDPrim]` | Active, loaded, defined, non-abstract descendant prims of the pseudo-root |
| `allDescendants` | `[USDPrim]` | All descendant prims of the pseudo-root |

### Methods by topic

| Topic | Members |
|-------|---------|
| Opening | `open(rootLayer:sessionLayer:options:)`, `open(_:sessionLayer:options:)`, `open(_:loadingPayloads:)`, `OpenOptions`, `InitialLoadRule` |
| Saving and reloading | `save()`, `saveSessionLayers()`, `reload()` |
| Accessing prims and properties | `prim(at:)`, `object(at:)`, `property(at:)`, `attribute(at:)` (returns `USDPrim.Attribute?`), `relationship(at:)`, `Object` |
| Authoring prims | `definePrim(at:type:)` (defines a prim if none exists), `overridePrim(at:)`, `removePrim(at:)` |
| Traversing | `descendants`, `descendants(where:)`, `allDescendants` |
| Managing layers | `muteLayer(_:)`, `unmuteLayer(_:)`, `isLayerMuted(_:)` (layer identifier `String`) |
| Edit target | `editTarget`, `EditTarget` |
| Time codes | `timeCodeRange`, `timeCodesPerSecond`, `TimeCode` |
| Observing changes | `addObserver(for:using:)` -> `USDStage.ObservationToken`, `Notice`, `ObjectsDidChange`, `ObservationToken` |
| Exporting | `exportPackage(to:options:)` (`URL` / `FilePath`, USDZ), `exportPackage(options:)` (returns `Data`), `exportFlattened(to:)` (`URL` / `FilePath`), `ExportOptions` |

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit. Conforms to `Equatable`.
- A stage is a scene graph formed by opening a single document (the root layer) and recursively following its composition rules, so it may incorporate data from more than one source file.
- A stage is a mutable view onto the composed scene graph: a tree of `USDPrim` objects, each with schemas, attributes (possibly animated), and relationships.
- `USDPrim`, `USDPrim.Attribute`, and `USDPrim.Relationship` values are owned by the stage and act as handles; they become invalid if the stage is closed.
- Modifying any value in a stage authors a modification to a `USDLayer` that represents a file or file-like storage.
- A stage may also have a session layer that holds temporary modifications that are not written to any file.

## Related

- [USDPrim](./usdprim.md)
- [USDLayer](./usdlayer.md)
- [USDStageComponent](./usdstagecomponent.md)
- [USDPlayer](./usdplayer.md)
