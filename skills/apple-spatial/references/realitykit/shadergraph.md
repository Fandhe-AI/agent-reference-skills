# ShaderGraph

A class that builds a RealityKit shader graph in code: a named set of typed inputs and outputs plus nodes and edges between them. Node definitions come from a `ShaderGraph.NodeLibrary`.

## Signature / Usage

```swift
final class ShaderGraph

init(named: String, inputs: [ShaderGraph.NodeDefinition.Input], outputs: [ShaderGraph.NodeDefinition.Output]) throws
init(named: String, inputs: [ShaderGraph.NodeDefinition.Input], outputs: [ShaderGraph.NodeDefinition.Output], nodeLibrary: ShaderGraph.NodeLibrary) throws
convenience init(from: Data) throws

func addNode(ShaderGraph.Node) throws -> String
func addEdge(ShaderGraph.Edge) throws
func validate() -> Bool
func encode() throws -> Data
```

## Options / Props

Properties:

| Name | Type | Description |
|------|------|-------------|
| `nodes` | `[String : ShaderGraph.Node]` | All nodes in the graph, keyed by node name |
| `edges` | `[ShaderGraph.Edge]` | Edges of the graph |
| `inputs` | `[ShaderGraph.NodeDefinition.Input]` | The declared input ports of this graph |
| `outputs` | `[ShaderGraph.NodeDefinition.Output]` | The declared output ports of this graph |
| `arguments` | `ShaderGraph.Node` | The virtual node representing this graph's inputs |
| `results` | `ShaderGraph.Node` | The virtual node representing this graph's outputs |
| `functionConstantInputs` | `[String]` | The names of graph inputs whose values are baked in at program compilation time |
| `primvarMappings` | `[String : ShaderGraph.TextureCoordinate]` | Maps primvar names used in this graph to texture coordinate channels |

Methods:

| Name | Signature | Description |
|------|-----------|-------------|
| `addNode(_:)` | `func addNode(ShaderGraph.Node) throws -> String` | Adds a node to the graph and returns its name |
| `removeNode(_:)` | `func removeNode(String) throws` | Removes a node |
| `updateNode(_:forKey:)` | `func updateNode(ShaderGraph.Node, forKey: String) throws` | Replaces the node stored under the given name |
| `addEdge(_:)` | `func addEdge(ShaderGraph.Edge) throws` | Adds an edge to the graph |
| `removeEdge(_:)` | `func removeEdge(ShaderGraph.Edge) throws` | Removes an edge from the graph |
| `connect(_:outputPort:to:inputPort:)` | `func connect(_:outputPort:to:inputPort:)` | Connects a node with a given output to a node with a given input. If `outputPort` is nil, the first output on `outputNode` is used |
| `addConstant(_:)` | `func addConstant(ShaderGraph.Value) throws -> String` | Adds a constant value node |
| `addConstant(_:named:)` | `func addConstant(ShaderGraph.Value, named: String) throws -> String` | Adds a named constant value node |
| `canAddNode(_:)` / `canAddEdge(_:)` | `-> Bool` | Returns whether a node / an edge can be added to the graph |
| `containsEdge(_:)` | `func containsEdge(ShaderGraph.Edge) -> Bool` | Returns whether the graph contains an edge equal to the given edge |
| `validateAddingNode(_:)` / `validateAddingEdge(_:)` | `throws` | Validates that a node / an edge can be added without adding it, throwing a descriptive error if not |
| `replace(nodes:edges:)` | `func replace(nodes: [String : ShaderGraph.Node], edges: [ShaderGraph.Edge]) throws` | Replaces all nodes and edges in the graph |
| `validate()` | `func validate() -> Bool` | Checks whether the graph is well-formed without producing a Metal library |
| `encode()` | `func encode() throws -> Data` | Encodes the graph into a binary representation |
| `subscript(_:)` | `subscript(String) -> ShaderGraph.Node?` | Accesses the node stored under the given name |

Nested types:

| Name | Kind | Description |
|------|------|-------------|
| `Node` | struct | Graph node; `init(name:data:)`, properties `name` and `data`, nested enum `NodeData` |
| `Edge` | struct | "Represents a connection between two nodes in a shader graph."; `init(outputNode:outputPort:inputNode:inputPort:)`, properties `outputNode`, `outputPort`, `inputNode`, `inputPort`, `from`, `to` |
| `NodeDefinition` | struct | "A description of a node type supported by RealityKit, including its inputs, outputs, and platform availability."; properties `name`, `functionalName`, `group`, `inputs`, `outputs`, `availability`; method `isAvailable(on:version:)`; nested `Input`, `Output`, `SemanticType`, `Availability`, `Platform` |
| `NodeLibrary` | class | "A catalog of node definitions supported by RealityKit."; `init(version:)`, `definitions`, `definition(named:)`, `definitions(function:input:)`, `definitions(function:inputs:)`, `definitions(function:output:)`, `makeNode(from:)`, nested `Version` |
| `DataType` | enum | Port data types: `bool`, `int`/`int2`/`int3`/`int4`, `uint`, `uchar`, `half`/`half2`/`half3`/`half4`, `half2x2`/`half3x3`/`half4x4`, `float`/`float2`/`float3`/`float4`, `float2x2`/`float3x3`/`float4x4`, `cgColor3`, `cgColor4`, `string`, `texture`, `surfaceShader`, `geometryModifier`, `postLightingShader` |
| `Value` | enum | A constant value passed to `addConstant` |
| `TextureCoordinate` | enum | Texture coordinate channel used by `primvarMappings` |
| `NodeKey` / `NodeType` / `EdgeType` / `NodeError` / `EdgeError` | typealias | `NodeKey = String`, `EdgeType = ShaderGraph.Edge`; error aliases for node / edge operations |

## Notes

- Introduced in iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+ (platform `introducedAt` of the `ShaderGraph` page and its child pages `Node`, `Edge`, `NodeDefinition`, `NodeLibrary`, `DataType`; no deprecation or beta flag on any of them). The RealityKit framework itself dates back to iOS 13.0 / macOS 10.15 / visionOS 1.0, so this class is new in the 27 SDK.
- The official `ShaderGraph` page has no abstract and no code sample; the Signature / Usage block lists declarations only, taken from the symbol pages. The official page does not show how to turn a `ShaderGraph` into a material.
- This builds a graph programmatically. The existing `ShaderGraphMaterial` (material driven by a Reality Composer Pro shader graph) is listed in the material page; this skill does not document how the two connect because the official pages do not say.
- Where `ComputeNodeGraph` in the compute-graph category describes particle / compute simulation, `ShaderGraph` describes material appearance.
- Source: https://developer.apple.com/documentation/realitykit/shadergraph (fetched 2026-11-14 via the tutorials JSON data endpoint, `/tutorials/data/documentation/realitykit/shadergraph.json` and child JSONs).

## Related

- [Material](./material.md)
- [ComputeNodeGraph](../compute-graph/computenodegraph.md)
