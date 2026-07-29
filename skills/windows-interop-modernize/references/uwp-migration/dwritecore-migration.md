# DirectWrite to DWriteCore migration

Migration guidance for text rendering: moving DirectWrite (`dwrite_3.h`) code to DWriteCore, the Windows App SDK's decoupled implementation of the same API surface.

## Signature / Usage

```cpp
// Before: platform DirectWrite
#include <dwrite_3.h>
// DWriteCreateFactory(...);

// After: DWriteCore — same API surface, different header/factory name
#include <dwrite_core.h>
// DWriteCoreCreateFactory(...);
```

## Notes

- Nearly all DirectWrite APIs are unchanged in DWriteCore; the only required change to port existing code is including `dwrite_core.h` instead of `dwrite_3.h` and calling `DWriteCoreCreateFactory` instead of `DWriteCreateFactory`.
- **DWriteCore does not support hardware-accelerated text rendering with Direct2D (D2D)** — it supports software text rendering only. This blocks adoption for apps that require D2D hardware acceleration; check the Windows App SDK release notes, since this limitation may change across releases.
- Sample app: `DWriteCoreGallery`, in the `WindowsAppSDK-Samples` repo, demonstrates the full DWriteCore API surface.
- The full DWriteCore API surface (factory types, interfaces, package/header/lib names) is covered by the windows-app-sdk and windows-graphics-media skills — this page covers only the migration delta.

## Related

- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
