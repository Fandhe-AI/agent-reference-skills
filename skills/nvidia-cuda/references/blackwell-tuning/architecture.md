# NVIDIA Blackwell GPU Architecture

The Blackwell GPU is NVIDIA's architecture generation following Hopper, exposed to CUDA through compute capability 10.0 and compute capability 12.0. It maintains compatibility with the CUDA programming model used by prior architectures such as Ampere and Hopper.

## Signature / Usage

```sh
# Target Blackwell compute capability 10.0 (e.g. B200) at compile time:
nvcc -gencode=arch=compute_100,code=sm_100 -o app app.cu

# Target Blackwell compute capability 12.0 (e.g. RTX 50-series):
nvcc -gencode=arch=compute_120,code=sm_120 -o app app.cu
```

## Notes

- Applications that follow the best practices established for Ampere and Hopper should typically see speedups on Blackwell GPUs without any code changes, since the CUDA programming model itself is unchanged.
- Revision history: Version 1.0, Initial Public Release — support added for compute capability 10.0 and compute capability 12.0.
- Scope boundary with the `dgx-spark` skill: this category covers architecture-generation tuning guidance (compute capability 10.0 / 12.0 characteristics that apply across the Blackwell product line). Real-SKU hardware specs, power envelopes, and I/O figures for the GB10-based DGX Spark device are covered by the `dgx-spark` skill's hardware category, not here.

## Related

- [CUDA Best Practices and Application Compatibility](./best-practices.md)
- [Streaming Multiprocessor](./streaming-multiprocessor.md)
- [Memory System](./memory-system.md)
- [Fifth-Generation NVLink](./nvlink.md)
