---
source: https://developers.cloudflare.com/durable-objects/api/webgpu/
---

# WebGPU

The WebGPU API gives Durable Objects direct GPU access from JavaScript, in local development only. It is not available in Workers, and Durable Objects relying on it cannot be deployed to Cloudflare.

## Signature / Usage

Snippet adapted: the official page labels this block `plaintext` and shows only the TOML-style key; the Wrangler setting is:

```toml
compatibility_flags = ["experimental", "webgpu"]
```

## Options / Props

### Supported subset

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navigator.gpu` | API | — | Supported |
| `GPU.requestAdapter` | API | — | Supported |
| `GPUAdapterInfo`, `GPUAdapter` | API | — | Supported |
| `GPUBindGroupLayout`, `GPUBindGroup` | API | — | Supported |
| `GPUBuffer` | API | — | Supported |
| `GPUCommandBuffer`, `GPUCommandEncoder` | API | — | Supported |
| `GPUComputePassEncoder`, `GPUComputePipeline`, `GPUComputePipelineError` | API | — | Supported |
| `GPUDevice`, `GPUDeviceLostInfo` | API | — | Supported |
| `GPUOutOfMemoryError`, `GPUValidationError`, `GPUInternalError`, `GPUUncapturedErrorEvent` | API | — | Supported |
| `GPUPipelineLayout`, `GPUQuerySet`, `GPUQueue`, `GPUSampler` | API | — | Supported |
| `GPUCompilationMessage`, `GPUShaderModule` | API | — | Supported (the source also lists `GPUShaderModule` as unsupported) |
| `GPUSupportedFeatures`, `GPUSupportedLimits` | API | — | Supported |
| `GPUMapMode`, `GPUShaderStage` | API | — | Supported |

### Not yet supported

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `GPU.getPreferredCanvasFormat` | API | — | Not supported |
| `GPURenderBundle`, `GPURenderBundleEncoder` | API | — | Not supported |
| `GPURenderPassEncoder`, `GPURenderPipeline` | API | — | Not supported |
| `GPUTexture`, `GPUTextureView`, `GPUExternalTexture` | API | — | Not supported |

## Notes

- The page's two tables both list `GPUShaderModule` (supported and unsupported); the source does not resolve this.
- Enable the `experimental` and `webgpu` compatibility flags in the Wrangler configuration of the Durable Object (compatibility flags and local development are covered by the cloudflare-wrangler skill).
- For ML on Cloudflare's GPUs use Workers AI (cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/)
- Example from the source: https://github.com/cloudflare/workers-wonnx/ (image classification via WebGPU with the wonnx runtime).

## Related

- [Durable Object base class](./base-class.md)
- [Limits](./limits.md)
