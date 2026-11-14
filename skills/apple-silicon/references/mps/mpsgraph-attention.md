# mpsgraph-attention

`MPSGraph.scaledDotProductAttention(query:key:value:descriptor:name:)` (iOS / macOS 27.0+) builds a scaled dot product attention (SDPA) operation, configured through `MPSGraphSDPADescriptor` instead of one API method per feature combination (mask, causal masking, attention sinks).

## Signature / Usage

Adapted (not in the official docs): graph construction assembled from the declared signatures; `graph`, `queryTensor`, `keyTensor`, `valueTensor`, and `headDimension` are assumed to exist.

```swift
let descriptor = MPSGraphSDPADescriptor(scale: 1.0 / Float(headDimension).squareRoot())
descriptor.isCausal = true

let attention = graph.scaledDotProductAttention(query: queryTensor,
                                                key: keyTensor,
                                                value: valueTensor,
                                                descriptor: descriptor,
                                                name: "attention")
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MPSGraphSDPADescriptor(scale:)` | `convenience init(scale: Float)` | Creates a descriptor with the given scale; all other properties default (no mask, `isCausal` false, no sinks) |
| `scale` | `Float` | Scale applied to the query-key matrix multiply before softmax, typically `1/sqrt(headDimension)` |
| `maskTensor` | `MPSGraphTensor?` | Optional additive mask applied to the scaled QK^T scores before softmax; must be broadcast-compatible with shape `[batch, heads, T_q, T_kv]`. Mutually exclusive with `isCausal` |
| `isCausal` | `Bool` | When true, a causal (lower-triangular) mask is applied so each query position attends only to key positions at or before it. Mutually exclusive with `maskTensor` |
| `sinksTensor` | `MPSGraphTensor?` | Optional attention-sinks tensor of shape `[nHeads]`; each element seeds the online-softmax accumulator for the matching query head with a virtual token logit, so real-token attention weights sum to less than one |

## Notes

- Part of the `MetalPerformanceShadersGraph` framework (see `mpsgraph.md`); distinct from MLX's `mx.fast.scaled_dot_product_attention` (see `mlx/` references).
- Source (retrieved 2026-11-14; DocC JSON, `introducedAt` 27.0, no beta flag): https://developer.apple.com/documentation/metalperformanceshadersgraph/mpsgraphsdpadescriptor, https://developer.apple.com/documentation/metalperformanceshadersgraph/mpsgraph/scaleddotproductattention(query:key:value:descriptor:name:)

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsgraph-operations](./mpsgraph-operations.md)
- [mpsgraph-tensor](./mpsgraph-tensor.md)
