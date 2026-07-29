# BlobStoreManager and Shared Datasets

System service (API 30+) for sharing large, cache-like datasets across apps: one app contributes a blob keyed by its content hash, and any app that already knows the same `BlobHandle` can read the cached copy instead of re-downloading it.

## Signature / Usage

```kotlin
val blobStoreManager = getSystemService(Context.BLOB_STORE_SERVICE) as BlobStoreManager

val blobHandle = BlobHandle.createWithSha256(
    sha256DigestBytes,
    "Sample photos",                                        // user-visible label
    System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1),  // expiry time
    "photoTrainingDataset"                                   // tag
)

// Read an existing blob
val input = ParcelFileDescriptor.AutoCloseInputStream(blobStoreManager.openBlob(blobHandle))

// Contribute a new blob
val sessionId = blobStoreManager.createSession(blobHandle)
blobStoreManager.openSession(sessionId).use { session ->
    val output = ParcelFileDescriptor.AutoCloseOutputStream(session.openWrite(0, dataSize))
    writeDataset(output)
    session.allowSameSignatureAccess()
    session.commit(mainExecutor) { /* handle result */ }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `BlobHandle.createWithSha256(digest, label, expiryTimeMillis, tag)` | static method | — | Identifies a shared blob by its content SHA-256 hash plus a user-visible label, expiry time, and app-chosen tag. |
| `BlobStoreManager.openBlob(blobHandle)` | method | — | Opens a readable `ParcelFileDescriptor` for an already-cached blob matching the handle. |
| `BlobStoreManager.createSession(blobHandle)` / `openSession(sessionId)` | methods | — | Starts (or resumes) a write session for contributing a new blob. |
| `Session.openWrite(offsetBytes, lengthBytes)` | method | — | Returns a writable `ParcelFileDescriptor` for the blob's data. |
| `Session.allowPackageAccess(packageName, certificate)` | method | — | Grants read access to one specific app. |
| `Session.allowSameSignatureAccess()` | method | — | Grants read access to apps signed with the same certificate. |
| `Session.allowPublicAccess()` | method | — | Grants read access to any app on the device. |
| `Session.commit(executor, callback)` | method | — | Finalizes the session, applying the access grants and making the blob available via `openBlob`. |

## Notes

- Intended for large, re-downloadable datasets (ML models, media libraries, reference data) — not for private per-app persistence, which belongs in app-specific storage or a `ContentProvider`.
- At least one `allow*Access()` call is required before `commit()`, or no other app can read the blob back.
- No manifest permission is required for ordinary use (`openBlob`, `createSession`, `allow*Access`, `commit`). `ACCESS_BLOBS_ACROSS_USERS` is a separate signature/privileged permission needed only to access blobs contributed by another user profile on the device, not for normal same-user sharing.

## Related

- [App-specific storage](./app-specific-storage.md)
- [FileProvider and file sharing](./file-provider.md)
