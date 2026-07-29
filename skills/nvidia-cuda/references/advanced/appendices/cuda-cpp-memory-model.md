# CUDA C++ Memory Model

Extends standard C++'s memory model with **thread scopes** (system, device, block, thread) reflecting that synchronization cost grows as participating threads are physically further apart, plus scope-dependent atomicity guarantees and data-race rules built on `cuda::atomic_ref`/`cuda::atomic`.

## Signature / Usage

```cpp
x = 42;
cuda::atomic_ref<int, cuda::thread_scope_device> flag(f);
flag.store(1, cuda::memory_order_release);
```

## Options / Props

| Scope | Description |
| --- | --- |
| `cuda::thread_scope_thread` | Synchronization visible only to the issuing thread. |
| `cuda::thread_scope_block` | Synchronization visible to all threads in the same thread block (and cluster, for cluster-scoped variants). |
| `cuda::thread_scope_device` | Synchronization visible to all threads on the same GPU device. |
| `cuda::thread_scope_system` | Synchronization visible system-wide, including the host and other devices. |
| `cuda::atomic_ref<T, Scope>` | Non-owning atomic view over an existing object, parameterized by thread scope. |

## Notes

- Synchronization cost grows with scope distance: block-scoped synchronization is cheaper than device-scoped, which is cheaper than system-scoped — choose the narrowest scope that is correct for the data being shared.
- System-scope atomic operations require specific hardware/software support flags (`pageableMemoryAccess`, `concurrentManagedAccess`, `hostNativeAtomicSupported`) — an operation requested at system scope is not guaranteed atomic on all platforms without these.
- A data race occurs when two conflicting concurrent operations on the same memory location lack synchronization at a scope inclusive of both threads — the standard requires such conflicting operations to be synchronized "as if they were atomic operations," or the behavior is undefined.
- The message-passing pattern (one thread writes data then releases a flag; another acquires the flag then reads the data) is the canonical example motivating scoped atomics: the flag's release/acquire pair establishes the happens-before relationship needed to avoid a data race on `x`.

## Related

- [Advanced Kernel Programming](../core/advanced-kernel-programming.md)
- [CUDA C++ Execution model](./cuda-cpp-execution-model.md)
