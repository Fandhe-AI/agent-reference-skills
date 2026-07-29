# NVIDIA Blackwell GPU Architecture

The Blackwell GPU is NVIDIA's architecture generation following Hopper, exposed to CUDA through compute capability 10.0 and compute capability 12.0. It maintains compatibility with the CUDA programming model used by prior architectures such as Ampere and Hopper.

## Notes

- Applications that follow the best practices established for Ampere and Hopper should typically see speedups on Blackwell GPUs without any code changes, since the CUDA programming model itself is unchanged.
- This page has no code examples in the source documentation; `## Signature / Usage` is omitted accordingly.
- Revision history: Version 1.0, Initial Public Release — support added for compute capability 10.0 and compute capability 12.0.
- Document version: NVIDIA Blackwell Tuning Guide, revision 1.0 (`https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html`, CUDA docs build v13.3).
- Scope boundary with the `dgx-spark` skill: this category covers architecture-generation tuning guidance (compute capability 10.0 / 12.0 characteristics that apply across the Blackwell product line). Real-SKU hardware specs, power envelopes, and I/O figures for the GB10-based DGX Spark device are covered by the `dgx-spark` skill's hardware category, not here.

## Related

- [CUDA Best Practices and Application Compatibility](./best-practices.md)
- [Streaming Multiprocessor](./streaming-multiprocessor.md)
- [Memory System](./memory-system.md)
- [Fifth-Generation NVLink](./nvlink.md)
