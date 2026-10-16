# Media and Storage Libraries

Hardware-accelerated media decoding, computer vision (the "Media and vision libraries" category, formerly "Media libraries"), and direct-to-GPU storage I/O libraries in the ROCm stack.

## Signature / Usage

```cmake
# link the HIP runtime that rocDecode/rocJPEG/hipFile build on
find_package(hip REQUIRED)
# then link the specific library needed, e.g.:
#   find_package(rocdecode REQUIRED) -> rocDecCreateDecoder(...)  video decoding
#   find_package(rocjpeg REQUIRED)   -> rocJpegDecode(...)        JPEG decoding
#   find_package(hipfile REQUIRED)   -> hipFileRead(...)          direct-to-GPU storage I/O
#   RPP (Linux)                      -> CMake package name not given in the fetched docs; see the RPP install page
```

## Options / Props

| Library | Category | Role |
| --- | --- | --- |
| rocDecode | Media | High-performance SDK for access to video decoding features on AMD GPUs |
| rocJPEG | Media | Library for decoding JPEG images on AMD GPUs |
| RPP | Media (vision) | Computer vision library for AMD processors with HIP or CPU backends (new in 10.1.0; Linux, Instinct and Radeon) |
| hipFile | Storage | AMD's Infinity Storage library that provides direct-to-GPU I/O for the ROCm platform |

## Notes

- ROCm Core SDK 10.1.0 (rocDecode 1.10.0, rocJPEG 1.10.0, RPP 3.2.0, hipFile 0.5.0)
- AMD documents "Media and vision libraries" (renamed from "Media libraries") and "Storage libraries" as two separate top-level categories; they are combined onto one page here because each currently has a small number of components (3 and 1 respectively)
- RPP (ROCm Performance Primitives) provides GPU-accelerated 2D image and 3D image (voxel) augmentations and other primitives for AI training and inference data pipelines. Package `amdrocm-rpp`
- hipFile 0.5.0 (10.1.0): `hipFileReadAsync()` / `hipFileWriteAsync()` support the fastpath backend (no host bounce-buffer copies; async fastpath operations do not yet retry on the fallback backend if the fastpath fails); Batch I/O API operations are fully supported using an internal thread pool; the stats API `hipFileGetStatsL1/L2/L3()` returns progressively detailed I/O statistics (L1 basic counts, L2 adds I/O size histograms, L3 adds per-GPU breakdowns)
- hipFile is a `hip*` prefixed marshalling library, AMD's counterpart to NVIDIA's cuFile / GPUDirect Storage — similar direct-to-GPU storage I/O role but a separate implementation. The CUDA-side cuFile API belongs to the `nvidia-cuda` skill, not this one

## Related

- [Math and Compute Libraries](./math-compute-libraries.md)
- [Core SDK Overview](./core-sdk-overview.md)
