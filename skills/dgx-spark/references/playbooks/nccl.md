# NCCL for Two Sparks

Build and validate NVIDIA Collective Communication Library (NCCL) v2.28.9-1 with Blackwell support for high-bandwidth GPU communication across two DGX Spark systems.

## Signature / Usage

```bash
git clone --branch v2.28.9-1 https://github.com/NVIDIA/nccl
make -j src.build NVCC_GENCODE="-gencode=arch=compute_121,code=sm_121"
git clone https://github.com/NVIDIA/nccl-tests && make MPI=1
./build/all_gather_perf -b 8 -e 128M -f 2 -g 1
```

## Notes

- Requires two DGX Spark systems with network connectivity already configured, NVIDIA driver, CUDA toolkit, sudo
- No AI model/container involved; validates infrastructure via `all_gather` performance test
- Duration: 30 minutes; Risk: Medium

## Related

- [Connect Two Sparks](./connect-two-sparks.md)
- [Multi Sparks Through Switch](./multi-sparks-through-switch.md)
