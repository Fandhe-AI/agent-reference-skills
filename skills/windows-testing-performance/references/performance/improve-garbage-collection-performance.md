# Improve garbage collection performance in WinUI apps

Best practices for reducing .NET garbage collector memory consumption and collection time in WinUI apps (`Microsoft.UI.Xaml`, Windows App SDK, C#).

## Signature / Usage

```csharp
// Induce a collection only after measuring; avoid forcing GC in general.
GC.Collect(2); // generation to collect: 0, 1, or 2
```

## Options / Props

| Generation | Contents | Collection frequency |
|------------|----------|----------------------|
| Generation 0 | Newly allocated (short-lived) objects, unless >= 85 KB | Most frequent |
| Generation 1 | Objects that survived generation 0 | Less frequent; also collects generation 0 |
| Generation 2 | Long-lived objects, including the large object heap (LOH, objects >= 85 KB) | Least frequent, can be a background collection |

## Notes

- Apps with a managed heap under 100 MB should focus on reducing memory consumption; apps with a heap over 100 MB should focus on reducing collection time (background generation 2 collection helps but pauses can still be user-perceivable above 100 MB).
- Avoid objects with medium-length lifetimes (e.g. items recycled while scrolling a list) — they get promoted to the expensive generation 2. Pre-allocate/reuse objects instead.
- Keep temporary buffers under 85 KB to avoid the large object heap; use a buffer pool for large, short-lived allocations.
- Set `GCCollectionMode.Optimized` if inducing collections to avoid unnecessary CPU use.
- Applies to `System.GC` / `.NET` garbage collection in WinUI/Windows App SDK apps, not to WPF or WinForms specifically (though the underlying .NET GC behavior is shared across those UI frameworks).

## Related

- [Disk use and memory improvements](./disk-memory.md)
- [Optimize file access](./optimize-file-access.md)
