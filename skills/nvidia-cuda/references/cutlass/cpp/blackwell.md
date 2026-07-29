# Blackwell

## Signature / Usage

Index page for Blackwell (SM100/SM120)-specific CUTLASS documentation.

```text
media/docs/cpp/blackwell.html
├── blackwell_functionality.html            → SM100 GEMM: tcgen05.mma, tile shapes, epilogues, block-scaled kernels
├── blackwell_cluster_launch_control.html   → dynamic tile scheduling via CLC
└── (dependent_kernel_launch.html)          → Programmatic Dependent Launch, referenced from this page
```

## Notes

- This is a navigation/index page; content lives in the linked pages. This CUTLASS-specific Blackwell material describes GEMM kernel construction (`tcgen05.mma` dispatch policies, tile scheduling), which is a different concern from this skill's `advanced` category, whose Blackwell content is architecture-level CUDA C++ tuning guidance rather than CUTLASS kernel templates.

## Related

- [Blackwell SM100 GEMM](./blackwell-sm100-gemm.md)
- [Blackwell Cluster Launch Control](./blackwell-cluster-launch-control.md)
- [Dependent Kernel Launch](./dependent-kernel-launch.md)
