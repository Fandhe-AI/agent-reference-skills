# ComputeNodeGraph.Library

A class defining a library of node definitions that can be added to a ComputeNodeGraph.

## Signature / Usage

```swift
final class Library
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init()` | initializer | Creates a new empty library |
| `init?(bundle:)` | `convenience init?(bundle: Bundle)` | Creates a library from the Metal default library in the given bundle, if available |
| `init(from:bundleIdentifier:)` | `convenience init(from: any MTLLibrary, bundleIdentifier: String?)` | Creates a library by extracting node definitions from a Metal library |
| `definitions` | `[ComputeNodeGraph.NodeDefinition]` | The collection of all node definitions available in this library |
| `definition(named:in:)` | `(String, in: String?) -> NodeDefinition?` | Returns the first node definition with the given name, or `nil` if none is found |
| `definition(stage:)` | `(ComputeNodeGraph.Stage) -> NodeDefinition?` | Returns a definition for the given stage |
| `definitionsMatching(input:)` | `(ValueType) -> [NodeDefinition]` | Returns all definitions that have at least one input matching the given value type |
| `definitionsMatching(inputs:)` | `([ValueType]) -> [NodeDefinition]` | Returns all definitions whose user-editable inputs, in order, match the given value types |
| `definitionsMatching(output:)` | `(ValueType) -> [NodeDefinition]` | Returns all definitions that have at least one output matching the given value type |
| `merge(contentsOf:)` | `(Library)` | Merges nodes from the specified library into this library |
| `shared` | `static let shared: Library` | Shared library (no abstract on the official page) |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro. Conforms to `Sendable`, `SendableMetatype`.
- A Library contains definitions and also stores `MTLFunction` implementations for built-in nodes; you can construct new libraries containing nodes you provide.
- Nodes are functions implemented in the Metal Shading Language and annotated with the `[[stitchable]]` attribute.
- Part of Compute Graph (RealityKit particle / compute-simulation node graph), distinct from `MPSGraph` in the apple-silicon skill.
- Source: https://developer.apple.com/documentation/computegraph/computenodegraph/library (fetched 2026-10).

## Related

- [ComputeNodeGraph](./computenodegraph.md)
- [ComputeNodeGraph.PipelinesDescriptor](./computenodegraph-pipelinesdescriptor.md)
