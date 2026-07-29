# Unified Memory

Single virtual address space shared by CPU and GPU (`cudaMallocManaged`), with hints (`cudaMemAdvise`), prefetching (`cudaMemPrefetchAsync`), stream association, and attribute queries for performance tuning.

## Signature / Usage

```cuda
void test_managed() {
  const char test_string[] = "Hello World";
  char* data;
  cudaMallocManaged(&data, sizeof(test_string));
  strncpy(data, test_string, sizeof(test_string));
  kernel<<<1, 1>>>("managed", data);
  cudaDeviceSynchronize();
  cudaFree(data);
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaMallocManaged` | Allocates memory accessible from both CPU and GPU; pages migrate on first touch by default. |
| `cudaMemPrefetchAsync` | Asynchronously migrates a managed memory range to a target `cudaMemLocation` (device or host) ahead of use, avoiding page-fault-driven migration. |
| `cudaMemAdvise` | Attaches a usage hint to a managed memory range. Advice values: `cudaMemAdviseSetReadMostly` (mostly read, occasionally written), `cudaMemAdviseSetPreferredLocation` (preferred physical residency), `cudaMemAdviseSetAccessedBy` (frequently accessed by a given location, enabling direct remote mapping instead of migration). |
| `cudaStreamAttachMemAsync` | Associates a managed allocation with a specific stream (or `cudaMemAttachHost`) for finer-grained multithreaded control over when migration is allowed. |
| `cudaMemRangeGetAttribute(s)` | Queries managed-memory attributes: `cudaMemRangeAttributeReadMostly`, `_PreferredLocation`, `_AccessedBy`, `_LastPrefetchLocation` (and `*Type`/`*Id` variants). |
| `cudaMemDiscardBatchAsync` / `cudaMemDiscardAndPrefetchBatchAsync` | Discards managed memory contents in batch, optionally combined with a prefetch, to avoid unnecessary migration of soon-to-be-overwritten data. |

## Notes

- On devices with full Unified Memory support, page migration is driven by first-touch/access unless overridden by `cudaMemAdvise`; on devices with only "CUDA Managed Memory" support, pages are not demand-paged and behave more like explicitly migrated allocations.
- `cudaMemAdviseSetAccessedBy` avoids migration entirely by letting the remote processor access the data directly (subject to `cudaMemLocationTypeHost` / `cudaMemLocationTypeDevice` mapping support), which is preferable to frequent migration for data written repeatedly from one side.
- `cudaStreamAttachMemAsync` with `cudaMemAttachHost` keeps a managed allocation host-visible until explicitly reattached to a stream, useful for multithreaded host programs that must avoid a GPU kernel touching data still being written by the CPU.
- Windows, WSL, and Tegra have distinct Unified Memory support characteristics from Linux with full hardware coherency support — consult the official page for the current per-platform capability matrix before relying on demand paging behavior.
- GPU memory oversubscription (allocating more managed memory than physical GPU memory) is supported on devices with full Unified Memory support, relying on migration/eviction rather than failing the allocation.

## Related

- [Stream-Ordered Memory Allocator](./stream-ordered-memory-allocation.md)
- [Extended GPU Memory](./extended-gpu-memory.md)
- [Virtual Memory Management](./virtual-memory-management.md)
