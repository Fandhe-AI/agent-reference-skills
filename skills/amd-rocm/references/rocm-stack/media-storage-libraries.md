# Media and Storage Libraries

Hardware-accelerated media decoding and direct-to-GPU storage I/O libraries in the ROCm stack.

## Signature / Usage

```cmake
# link the HIP runtime that rocDecode/rocJPEG/hipFile build on
find_package(hip REQUIRED)
# then link the specific library needed, e.g.:
#   find_package(rocdecode REQUIRED) -> rocDecCreateDecoder(...)  video decoding
#   find_package(rocjpeg REQUIRED)   -> rocJpegDecode(...)        JPEG decoding
#   find_package(hipfile REQUIRED)   -> hipFileRead(...)          direct-to-GPU storage I/O
```

## Options / Props

| Library | Category | Role |
| --- | --- | --- |
| rocDecode | Media | High-performance SDK for access to video decoding features on AMD GPUs |
| rocJPEG | Media | Library for decoding JPEG images on AMD GPUs |
| hipFile | Storage | AMD's Infinity Storage library that provides direct-to-GPU I/O for the ROCm platform |

## Notes

- ROCm 7.14.0
- AMD documents Media Libraries and Storage as two separate top-level categories; they are combined onto one page here because each currently has a small number of components (2 and 1 respectively)
- hipFile is a `hip*` prefixed marshalling library, AMD's counterpart to NVIDIA's cuFile / GPUDirect Storage — similar direct-to-GPU storage I/O role but a separate implementation. The CUDA-side cuFile API belongs to the `nvidia-cuda` skill, not this one

## Related

- [Math and Compute Libraries](./math-compute-libraries.md)
- [Core SDK Overview](./core-sdk-overview.md)
