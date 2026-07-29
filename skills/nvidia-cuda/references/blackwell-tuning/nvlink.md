# Fifth-Generation NVLink

B200 GPUs implement fifth-generation NVLink with higher bandwidth, additional links per GPU, and improved error detection versus prior generations.

## Signature / Usage

```cuda
// Enable peer access between two NVLink-connected GPUs; once enabled,
// peer memory transfers are transparently routed over NVLink when available.
int canAccess = 0;
cudaDeviceCanAccessPeer(&canAccess, /* device */ 0, /* peerDevice */ 1);
if (canAccess) {
    cudaSetDevice(0);
    cudaDeviceEnablePeerAccess(/* peerDevice */ 1, /* flags */ 0);
}
```

## Options / Props

| Name | Description |
|------|-------------|
| Fifth-generation NVLink | NVLink generation on B200 GPUs; higher bandwidth and more links per GPU than the previous generation, plus improved error detection |
| Transparent routing | Transfers between NVLink-connected endpoints are automatically routed through NVLink rather than PCIe — no code change needed to benefit from it |
| `cudaDeviceEnablePeerAccess()` | Still required to enable direct peer-to-peer GPU memory access/transfers over NVLink |
| `cudaDeviceCanAccessPeer()` | Queries whether peer access between two devices is possible before enabling it |

## Notes

- NVLink transport is transparent to CUDA: once peer access is enabled, memory transfers between peer GPUs use NVLink automatically when available, without additional API calls beyond the standard peer-access APIs.
- Document version: NVIDIA Blackwell Tuning Guide, revision 1.0 (`https://docs.nvidia.com/cuda/blackwell-tuning-guide/index.html`, CUDA docs build v13.3).

## Related

- [NVIDIA Blackwell GPU Architecture](./architecture.md)
- [Memory System](./memory-system.md)
