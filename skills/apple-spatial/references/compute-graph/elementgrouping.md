# ElementGrouping

An enumeration of how elements are grouped in a Compute Graph simulation.

## Signature / Usage

```swift
enum ElementGrouping
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ungrouped` | case | No abstract on the official page |
| `grouped` | case | No abstract on the official page |
| `strips` | case | No abstract on the official page |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro.
- Conforms to `CaseIterable`, `Copyable`, `Decodable`, `Encodable`, `Equatable`, `Escapable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`.
- The `group` node namespace is "Available only when the simulation uses a grouped or strips element grouping." `ComputeNodeGraph.Topology.strip` requires a simulation with a grouping of `strips`.
- Source: https://developer.apple.com/documentation/computegraph/elementgrouping (fetched 2026-10).

## Related

- [CoordinateSpace / Sorting / Topology](./simulation-options.md)
- [ComputeGraphSimulation](./computegraphsimulation.md)
