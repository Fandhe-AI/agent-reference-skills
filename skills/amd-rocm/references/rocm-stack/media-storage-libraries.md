# Media and Storage Libraries

Hardware-accelerated media decoding and direct-to-GPU storage I/O libraries in the ROCm stack.

## Signature / Usage

```cmake
# link the HIP runtime that rocDecode/rocJPEG/hipFile build on
find_package(hip REQUIRED)
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

## Related

- [Math and Compute Libraries](./math-compute-libraries.md)
- [Core SDK Overview](./core-sdk-overview.md)
