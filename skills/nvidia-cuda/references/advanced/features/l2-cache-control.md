# L2 Cache Control

Sets aside a portion of the GPU's L2 cache for repeatedly-accessed ("persisting") global memory regions via a stream or kernel-node attribute (`accessPolicyWindow`), improving bandwidth/latency for data reused across many kernel launches.

## Signature / Usage

```cuda
cudaStreamAttrValue stream_attribute;
stream_attribute.accessPolicyWindow.base_ptr = reinterpret_cast<void*>(ptr);
stream_attribute.accessPolicyWindow.num_bytes = num_bytes;
stream_attribute.accessPolicyWindow.hitRatio = 0.6;
stream_attribute.accessPolicyWindow.hitProp = cudaAccessPropertyPersisting;
stream_attribute.accessPolicyWindow.missProp = cudaAccessPropertyStreaming;
cudaStreamSetAttribute(stream, cudaStreamAttributeAccessPolicyWindow, &stream_attribute);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaDeviceSetLimit` / `cudaDeviceGetLimit` with `cudaLimitPersistingL2CacheSize` | Sets/queries how much of the L2 cache is set aside for persisting accesses. |
| `cudaStreamSetAttribute` with `cudaStreamAttributeAccessPolicyWindow` | Applies an `accessPolicyWindow` to all kernels launched on a stream. |
| `cudaGraphKernelNodeSetAttribute` | Applies an `accessPolicyWindow` to an individual kernel node in a CUDA Graph. |
| `accessPolicyWindow.base_ptr` / `num_bytes` | The global memory address range the policy applies to. |
| `accessPolicyWindow.hitRatio` | Fraction of accesses to the window treated with `hitProp` (persisting) vs. `missProp` (streaming), used to fit the window into the set-aside size probabilistically. |
| `accessPolicyWindow.hitProp` / `missProp` | `cudaAccessPropertyPersisting`, `cudaAccessPropertyStreaming`, or `cudaAccessPropertyNormal`. |
| `cudaCtxResetPersistingL2Cache` | Resets all persisting lines in L2 back to normal, releasing the persisting reservation. |
| `cudaGetDeviceProperties` fields `l2CacheSize`, `persistingL2CacheMaxSize`, `accessPolicyMaxWindowSize` | Query total L2 size, maximum settable persisting size, and maximum access-policy-window size. |

## Notes

- The set-aside persisting cache is shared across concurrent kernels/streams competing for the same set-aside region — over-subscribing it with too many overlapping persisting windows can cause thrashing; `hitRatio` is one tool to manage this.
- Call `cudaCtxResetPersistingL2Cache()` when persisting data is no longer needed, otherwise the set-aside region continues occupying L2 capacity.
- Persisting access policy can be set at stream granularity (all kernels on that stream) or per kernel-node granularity within a CUDA Graph.

## Related

- [Memory Synchronization Domains](./memory-sync-domains.md)
- [CUDA Graphs](./cuda-graphs.md)
