# Threading Libraries (hipThreads)

hipThreads is a C++-style concurrency library for AMD GPUs. It implements `std::thread`-like primitives that run inside GPU kernels, so existing `std::thread` CPU code can be ported to the GPU with minimal changes. It is built on HIP and libhipcxx.

## Signature / Usage

```cmake
find_package(hipthreads REQUIRED)

target_link_libraries(<your_target> hipthreads::hipthreads)
```

```cpp
#include <hip/thread>
#include <hip/mutex>
#include <hip/condition_variable>
```

If hipThreads was installed in its default location under the ROCm installation, `ROCM_PATH` must point to the ROCm root before building. Otherwise pass `CMAKE_PREFIX_PATH` pointing to the hipThreads root directory.

## Options / Props

`std::` to `hip::` mapping (replace the `std::` qualifier with `hip::` and add `__device__` / `__host__ __device__` to GPU callables):

| C++ standard | hipThreads | Header |
| --- | --- | --- |
| `std::thread` | `hip::wthread` | `<hip/thread>` |
| `std::thread::id` | `hip::wthread::id` | `<hip/thread>` |
| `std::this_thread::get_id` | `hip::this_thread::get_id` | `<hip/thread>` |
| `std::this_thread::yield` | `hip::this_thread::pseudo_yield` | `<hip/thread>` |
| `std::this_thread::sleep_for` | `hip::this_thread::sleep_for` | `<hip/thread>` |
| (no equivalent) | `hip::this_thread::get_fiber_id` | `<hip/thread>` |
| `std::mutex` | `hip::spin_mutex` (also `hip::pseudo_mutex`) | `<hip/mutex>`, `<hip/pseudo_mutex>` |
| `std::lock_guard` | `hip::lock_guard` | `<hip/mutex>` |
| `std::unique_lock` | `hip::unique_lock` | `<hip/mutex>` |
| `std::condition_variable_any` | `hip::condition_variable_any` (also `hip::spin_condition_variable`, `hip::pseudo_condition_variable`) | `<hip/condition_variable>`, `<hip/pseudo_condition_variable>` |

Environment variables:

| Name | Description |
| --- | --- |
| `HIPTHREADS_VCORES_PER_WGP` | Scheduler virtual cores (vcores) per workgroup processor (WGP). Positive integer; non-numeric, zero, or empty values are ignored. Default `16`, or `-DHIPTHREADS_DEFAULT_VCORES_PER_WGP` when built from source. Overrides the compile-time value; must be set before launching the application |
| `HIPTHREADS_TEST_TIMEOUT` | Seconds a single test can run before termination (test suite, lit). Fractional allowed; `0` disables. Default `30` |
| `ROCM_PATH` | ROCm install root. Default `/opt/rocm` on Linux; falls back to `HIP_PATH` on Windows |
| `HIP_PATH` | Windows HIP install root, used when `ROCM_PATH` is unset (configuration fails when neither is set on Windows) |
| `HIPTHREADS_SOURCE_DIR` | hipThreads source root. Default: auto-detected from `test/lit.cfg` |
| `HIPTHREADS_BUILD_DIR` | Build directory holding built tests and the `hipthreads` library. Default `HIPTHREADS_SOURCE_DIR/build` |
| `HIP_ARCHITECTURES` | GPU target. Defaults to `gfx906` on Windows if unset; autodetected on Linux |

## Notes

- Install: hipThreads is included with the ROCm Core SDK on Linux and Windows. Standalone on Linux: `amdrocm-threads<dev/devel><rocm_version>-<llvm_target>` (`-dev` on Debian-based, `-devel` on RPM-based), e.g. `sudo apt install amdrocm-threads-dev`, `sudo dnf install amdrocm-threads-devel`, `sudo zypper install amdrocm-threads-devel`
- Execution model: a single persistent scheduler kernel is launched on a dedicated stream when the first `hip::wthread` is created and persists until the last one is destroyed. Each `hip::wthread` construction submits a work item to the scheduler, which dispatches it to a vcore; joining waits for the work item without tearing down the kernel. A logical thread runs as fibers (one per hardware lane) in lockstep within a wavefront
- Scheduling is cooperative: `hip::this_thread::pseudo_yield` runs the next work item nested inside the current one. There is no preemption or hardware blocking; `condition_variable` spins and yields rather than blocks
- Concurrency: `hardware_concurrency() = multiprocessorCount * vcoresPerWgp`. Tune with the `HIPTHREADS_DEFAULT_VCORES_PER_WGP` CMake option (compile time) or `HIPTHREADS_VCORES_PER_WGP` (runtime). Setting it too high can reduce performance
- Synchronous HIP calls (`hipDeviceSynchronize`, synchronous `hipMemcpy`, `thrust::copy`) deadlock while any `hip::wthread` is alive. Use `hipMemcpyAsync` / `hipMemsetAsync`, or scope the `hip::wthread` objects in a `{ ... }` block so they are joined first
- Callables must be `__device__` extended lambdas. Host construction copies callable and arguments bitwise: they must be `TriviallyCopyable`, no `std::vector`, raw pointers must point to GPU-accessible memory. Device construction requires trivially destructible callables; do not capture by reference stack variables or `__shared__` addresses
- More threads than `hardware_concurrency()` queue until a slot frees; mutually dependent threads above that count can deadlock
- Yield-loops deadlock unconditionally; prefer `hip::spin_mutex` / `hip::spin_condition_variable` over `pseudo_` variants when a yield-loop is possible (`spin_` variants busy-wait; `pseudo_` variants busy-wait but periodically call `pseudo_yield`)
- A `hip::wthread` with static storage duration is undefined behavior. Constructing one inside a `__host__ __device__` function callable from the host is unsupported; use separate host-only and device-only functions
- Not provided in this release: `std::recursive_mutex`, `timed_mutex`, `recursive_timed_mutex` and timed locking; `shared_mutex` / `shared_lock`; `scoped_lock`, variadic `std::lock` / `try_lock`; `std::condition_variable` bound to `unique_lock<mutex>` (use `hip::condition_variable_any`) and `notify_all_at_thread_exit`; `jthread` / `stop_token`; `future` / `promise` / `packaged_task` / `async`; `latch` / `barrier` / `semaphore`; `thread_local` and exception propagation across threads
- Source: `rocm.docs.amd.com/projects/hipThreads/en/docs-10.1.0/` (ROCm/rocm-libraries `projects/hipthreads/docs`, commit `39d8d60365d2272a5366f76ccb3bfba24b219eaf`: https://github.com/ROCm/rocm-libraries/tree/39d8d60365d2272a5366f76ccb3bfba24b219eaf/projects/hipthreads/docs). The C++ API reference page is not covered here

## Related

- [libhipcxx](./libhipcxx.md)
- [Core SDK Overview](./core-sdk-overview.md)
- [Math and Compute Libraries](./math-compute-libraries.md)
