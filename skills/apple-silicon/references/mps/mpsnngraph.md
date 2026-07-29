# MPSNNGraph

An optimized representation of a graph of neural-network image and filter nodes. `MPSNNGraph` is the older (pre-MPSGraph), node-based way to build and run an inference/training graph out of `MPSCNN*` layers: nodes (`MPSNNImageNode`, `MPSCNNConvolutionNode`, etc.) are wired together and compiled into a single optimized `MPSNNGraph`.

## Signature / Usage

```swift
let inputNode = MPSNNImageNode(handle: nil)
let convNode = MPSCNNConvolutionNode(source: inputNode, weights: dataSource)
let graph = MPSNNGraph(device: device, resultImage: convNode.resultImage, resultImageIsNeeded: true)

let output = graph!.encode(to: commandBuffer, sourceImages: [inputImage])
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `resultImage` / `resultImages` | `MPSNNImageNode` | — | Output node(s) the compiled graph produces |
| `resultImageIsNeeded` | `Bool` | `true` | Whether the destination image must be materialized (vs. only intermediate state) |
| `MPSNNImageNode` | class | — | Placeholder node representing an `MPSImage` flowing through the graph |
| `MPSNNFilterNode` | class | — | Base class for layer nodes (e.g. `MPSCNNConvolutionNode`) wired between image nodes |

## Notes

- `encode(to:sourceImages:)` and the batch variant (`encodeBatch(to:sourceImages:)`) encode the whole compiled graph in one call, versus manually chaining individual `MPSCNNKernel` subclasses.
- Available since iOS/tvOS 11.0, macOS 10.13, visionOS 1.0.
- MPSGraph (see `mpsgraph.md`) is the newer, tensor-based successor recommended for new work; `MPSNNGraph` remains for existing node-based CNN pipelines built on `cnn-kernels`.
- This is a graph-execution layer distinct from Core ML's model-loading/inference API (apple-ml skill) — `MPSNNGraph` composes MPS kernels directly rather than loading a `.mlmodel`.

## Related

- [cnn-kernels](./cnn-kernels.md)
- [mpsgraph](./mpsgraph.md)
- [MPSImage](./mpsimage.md)
