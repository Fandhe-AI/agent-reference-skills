# CUDA C++ Execution model

Extends standard C++ forward-progress guarantees to distinguish host threads (parallel forward progress if the host itself provides it) from device threads, which have weaker guarantees: progress of one thread in a cluster requires eventual progress of all threads in that cluster, and device threads cannot rely on `std::this_thread::yield()`, trivial infinite loops, or plain volatile/atomic operations on automatic-storage objects for forward progress.

## Signature / Usage

```cuda
__global__ void hello_world() { __syncthreads(); }

int main() {
    hello_world<<<1,2>>>();
    return (int)cudaDeviceSynchronize();
}
```

## Options / Props

| Thread kind | Forward progress guarantee |
| --- | --- |
| Host threads | Parallel forward progress if the host execution environment provides it; may assume threads eventually terminate, yield, perform I/O, access volatile data, or synchronize atomically. |
| Device threads | Once a device thread makes progress, all threads within its thread-block cluster must eventually make progress; cannot assume progress from `std::this_thread::yield()`, trivial infinite loops, or volatile/atomic operations alone. |
| CUDA APIs | Must either return or ensure device thread progress; a query function (e.g. one that can return `cudaErrorNotReady`) cannot do so indefinitely without advancing at least one device thread. |

## Notes

- Dependencies created through CUDA streams, events, and kernel launch ordering are what let host code rely on device threads eventually completing — `cudaDeviceSynchronize()` in the example above guarantees the launched kernel's threads (and their `__syncthreads()`) have progressed to completion before returning.
- Because device threads' progress guarantee is scoped to the thread-block cluster, code must not assume a thread in one block progresses independently of threads in other blocks within the same cluster — this interacts with cluster-scoped synchronization primitives (`cuda::barrier` at cluster scope, cluster launch control).

## Related

- [CUDA C++ Memory Model](./cuda-cpp-memory-model.md)
- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
- [Work Stealing with Cluster Launch Control](../features/cluster-launch-control.md)
