# Managing model specialization and caching

Configure model specialization, manage cached assets, and reduce your app's storage footprint.

## Signature / Usage

```swift
func loadModel(from modelURL: URL) async throws -> AIModel {
    // The default cache stores all specialized assets for your app bundle.
    let cache = AIModelCache.default

    // A non-`nil` result means the model was previously specialized and cached.
    if let model = try cache.model(for: modelURL, options: .default) {
        return model
    }

    // This call performs specialization, caches the result, and returns the model.
    return try await AIModel(contentsOf: modelURL, options: .default)
}
```

Specialize before loading (for example after a download), with a persistent cache policy:

```swift
try await AIModel.specialize(
    contentsOf: modelURL,
    options: .default,
    cachePolicy: .persistent
)
```

Share a cache across an app group:

```swift
guard let groupCache = AIModelCache(appGroup: groupIdentifier) else {
    fatalError("Invalid group identifier or entitlement.")
}

try await AIModel.specialize(
    contentsOf: sharedModelURL,
    options: .default,
    cache: groupCache,
    cachePolicy: .persistent
)
```

Keep working after deleting the source model, via a bookmark:

```swift
let model = try await AIModel.specialize(contentsOf: llmURL, options: .default, cachePolicy: .persistent)
let bookmarkData = model.bookmarkData
UserDefaults.standard.set(bookmarkData, forKey: "llm.bookmark")

// Later launch:
if let bookmarkData = UserDefaults.standard.data(forKey: "llm.bookmark") {
    if let model = try AIModel(resolvingBookmark: bookmarkData) {
        // Use the model.
    }
}
```

## Options / Props

Cache removal conditions:

| Condition | Description |
|-----------|-------------|
| OS update | Specialized assets are tied to the OS version; the system always invalidates them on OS update, regardless of policy |
| Source model change | Under the default policy, if the source `.aimodel` file is modified or deleted, cached assets derived from it become invalid. With `.persistent`, assets survive source deletion, but they can no longer be found by URL; load them through bookmark data instead. |
| Storage pressure | The system can reclaim space by deleting assets marked as purgeable (default policy; purgeable assets) |

Deletion APIs:

| Method | Description |
|--------|-------------|
| `deleteEntries(for:)` | Ignores any `SpecializationOptions` and deletes all cache entries for a specific `.aimodel` |
| `deleteEntry(for:options:)` | Deletes a single entry for a specific `.aimodel` and `SpecializationOptions` combination |
| `deleteAll()` | Deletes all entries in the entire cache |

## Notes

- On `AIModel` load, Core AI specializes the portable `.aimodel` for the current device (producing executable code tied to the hardware and OS version) and caches the result; later loads with the same model and options use the cache.
- `AIModelCache.model(for:options:)` checks for a cached specialization but does not perform specialization; it returns `nil` if none exists.
- Default options let the system pick the CPU / GPU / Neural Engine combination that minimizes inference latency. `.cpuOnly` or `init(preferredComputeUnitKind:)` are for advanced cases (for example a small background model avoiding foreground GPU contention); test before overriding. Check `ComputeUnitKind.availableKinds`.
- `expectFrequentReshapes = true` skips per-shape optimization for dynamic-shape models (for example an LLM whose sequence grows one token at a time); Core AI then runs the generic dynamic version of the function. Examples live in `https://github.com/apple/coreai-models`.
- `AIModel.specialize(...)` controls when specialization happens, not how much work it does; calling it repeatedly with the same URL and options returns the cached result. It differs from ahead-of-time compilation, where most heavy computation happens at build time on your Mac.
- Default cache policy lets the system reclaim storage under storage pressure and source model changes. Use `.persistent` if your app deletes the source model file. `.persistent` is not available on tvOS; use the default policy there.
- If an `AIModel` instance still uses a cache entry, deletion is deferred until that instance is deallocated.
- App group caches require the App Groups entitlement (`com.apple.security.application-groups`).
- The source `.aimodel` plus the options index the cache, so deleting the source file breaks `AIModel(contentsOf:options:)` and `model(for:options:)`; use bookmark data instead. A bookmark does not prevent removal: if the system purges the assets, you delete them, or an OS update invalidates them, resolving fails and you must download and specialize again.
- Source: https://developer.apple.com/documentation/coreai/managing-model-specialization-and-caching

## Related

- [AIModel](./aimodel.md)
- [AIModelCache](./aimodelcache.md)
- [SpecializationOptions](./specializationoptions.md)
- [ComputeUnitKind](./computeunitkind.md)
- [Compiling Core AI models ahead of time](./compiling-core-ai-models-ahead-of-time.md)
