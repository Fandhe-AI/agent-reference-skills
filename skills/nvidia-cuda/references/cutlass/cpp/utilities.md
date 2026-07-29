# Utilities

## Signature / Usage

```cpp
// tools/util/include/cutlass/util/
cutlass::HostTensor<ElementT, LayoutT> tensor({rows, cols});
tensor.sync_device();
auto* dptr = tensor.device_data();
auto  href = tensor.host_ref();

cutlass::DeviceAllocation<ElementT> device_buf(count);

cutlass::reference::host::TensorFillRandomUniform(tensor.host_view(), seed, max, min, bits);
```

```bash
# synclog: instrument async-kernel synchronization timing
nvcc -DCUTLASS_ENABLE_SYNCLOG=1 ...
```

## Options / Props

| Utility | Description |
| --- | --- |
| `HostTensor<T, Layout>` | Manages memory in both host and device space; `host_data()`/`host_ref()`/`host_view()`, `device_data()`/`device_ref()`/`device_view()`, `sync_device()` |
| `DeviceAllocation<T>` | Device-only smart-pointer allocation with automatic deallocation |
| `TensorFill()` | Uniform element initialization |
| `TensorFillRandomUniform()` | Random uniform fill (device path uses CURAND) |
| `TensorFillRandomGaussian()` | Random Gaussian fill (device path uses CURAND); all three fill functions accept an optional "bits right of binary decimal" parameter for fixed-point precision |
| `tensor_view_io.h` | `std::ostream::operator<<()` printing support |
| Reference GEMM | Mixed-precision reference implementation across all data types/layouts |
| `synclog` | Experimental debug tool; enabled via `-DCUTLASS_ENABLE_SYNCLOG=1`; reports thread/block coordinates and synchronization-event timing for async kernels |

## Notes

- These utilities prioritize flexibility over runtime efficiency — they are for testing/reference use, not production kernels.

## Related

- [CUTLASS 2.x](./cutlass-2x.md)
- [Profiler](./profiler.md)
