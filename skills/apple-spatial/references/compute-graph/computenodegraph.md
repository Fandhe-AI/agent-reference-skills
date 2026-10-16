# ComputeNodeGraph

A directed graph of typed nodes and edges that describes a particle or compute simulation for RealityKit. It is the first step of the Compute Graph compilation pipeline.

## Signature / Usage

```swift
struct ComputeNodeGraph

// Pipeline described by the framework overview:
// ComputeNodeGraph -> ComputeNodeGraph.Assembly -> ComputeNodeGraph.Pipelines -> ComputeGraphSimulation
let pipelines = try await ComputeNodeGraph.Pipelines(graph)   // init(_:) async throws
```

## Options / Props

Members (declarations from the symbol page):

| Name | Type | Description |
|------|------|-------------|
| `init()` | initializer | Creates an empty graph |
| `init(data:)` | `init(data: Data) throws` | Creates a graph by decoding a computegraph |
| `nodes` | `[ComputeNodeGraph.NodeID : ComputeNodeGraph.Node]` | Nodes keyed by node ID |
| `edges` | `[ComputeNodeGraph.Edge]` | Edges between node ports |
| `addNode(_:)` | `func addNode(_: Node) throws -> NodeID` | Adds a node to the graph |
| `removeNode(_:)` | `func removeNode(_: NodeID) throws` | Removes a node from the graph |
| `updateNode(_:forKey:)` | `func updateNode(_: Node, forKey: NodeID) throws` | Updates an existing node in the graph |
| `addEdge(_:)` | `func addEdge(_: Edge) throws` | Adds an edge |
| `removeEdge(_:)` | `func removeEdge(_: Edge) -> Bool` | Removes an edge from the graph |
| `canAddNode(_:)` / `canAddEdge(_:)` | `-> Bool` | Returns whether the node / edge can be added |
| `contains(node:)` / `contains(edge:)` | `-> Bool` | Returns whether the graph contains the node key / edge |
| `replaceAll(nodes:edges:)` | `throws` | Replaces all nodes and edges with the provided collections |
| `data(using:)` | `func data(using: Format) throws -> Data` | Returns the graph encoded in the specified format |
| `subscript(_:)` | `NodeID -> Node?` | Accesses the node associated with the given key |

Nested types: `Assembly`, `Pipelines`, `PipelinesDescriptor`, `Library`, `LibraryReference`, `NodeDefinition`, `Node`, `Edge`, `Port`, `PortDefinition`, `DataType`, `ValueType`, `ArrayDefinition`, `PointerDefinition`, `StateDefinition`, `StateType`, `StructureDefinition`, `StructureLayout`, `SamplerSettings`, `SwizzleChannels`, `Scope`, `Stage`, `Metadata`, `Format`, `Topology`, `NodeID` (type alias).

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+; also listed for Reality Composer Pro. Conforms to `Equatable`, `Sendable`, `SendableMetatype`.
- Compute Graph is RealityKit's particle and compute-simulation node graph (programmable, node-based GPU simulation authored in Reality Composer Pro). It is distinct from `MPSGraph` (Metal Performance Shaders Graph) in the apple-silicon skill, which is a general tensor/ML compute graph.
- Where ShaderGraph builds material appearance with a node-based editor, Compute Graph provides the same graph-driven, connection-based authoring for simulation behavior.
- Three-step pipeline: describe the simulation as a `ComputeNodeGraph`; produce a `ComputeNodeGraph.Assembly` that resolves the buffer, uniform, and texture layout; compile the assembly into `ComputeNodeGraph.Pipelines` (GPU shader code). One set of pipelines can back multiple `ComputeGraphSimulation` instances running concurrently.
- `Assembly`: "Fully assembled configuration of compute graph nodes."
- `NodeDefinition`: no abstract on the official page. `LibraryReference`: "A Metal library and an optional bundle identifier that locates shader functions."
- `SamplerSettings`, `SwizzleChannels`, `StructureLayout`: no abstract on the official page; listed under "Graph resources" (the first two) and "Geometry and simulation inputs" (`StructureLayout`).
- Other nested abstracts: `Stage` is "An execution context within a compute node graph that groups related nodes into a processing phase."; `Format` is "A serialization format used to encode a compute node graph."; `StateDefinition` is "A declaration of a named state value and where it lives in the simulation."; `StateType` is "The shape of a value stored in a compute graph's state."; `StructureDefinition` is "A named structure type, pairing a type name with its in-memory layout."; `Scope` is "A scope is a named region of memory, indicating where a value lives".
- Custom Metal Shading Language functions are supplied through a `Library` alongside the framework's built-in node namespaces.
- Source: https://developer.apple.com/documentation/computegraph/computenodegraph (fetched 2026-10 via the tutorials JSON data endpoint).

## Related

- [ComputeNodeGraph.Library](./computenodegraph-library.md)
- [ComputeNodeGraph.Pipelines](./computenodegraph-pipelines.md)
- [ComputeNodeGraph.PipelinesDescriptor](./computenodegraph-pipelinesdescriptor.md)
- [ComputeGraphSimulation](./computegraphsimulation.md)
- [CoordinateSpace / Sorting / Topology](./simulation-options.md)
