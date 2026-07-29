# Create a Package Support Framework Fixup

When none of the Package Support Framework's built-in fixups solves a compatibility issue, you can author a new one from scratch: write a replacement function for each failing API call, declare it with `DECLARE_FIXUP`, and optionally read `config.json` values through `FixupQueryCurrentDllConfig`.

## Signature / Usage

```c
// At the top of each .cpp file that will contain replacement functions
#define FIXUP_DEFINE_EXPORTS
#include <fixup_framework.h>

auto MessageBoxWImpl = &::MessageBoxW;
int WINAPI MessageBoxWFixup(
    _In_opt_ HWND hwnd,
    _In_opt_ LPCWSTR,
    _In_opt_ LPCWSTR caption,
    _In_ UINT type)
{
    return MessageBoxWImpl(hwnd, L"SUCCESS: This worked", caption, type);
}

DECLARE_FIXUP(MessageBoxWImpl, MessageBoxWFixup);
```

```c
// Reading fixup-specific config.json data
if (auto configRoot = ::FixupQueryCurrentDllConfig())
{
    auto& config = configRoot->as_object();
    if (auto enabledValue = config.try_get("enabled"))
    {
        g_enabled = enabledValue->as_boolean().get();
    }
}
```

## Options / Props

| Piece | Purpose |
|-------|---------|
| `FIXUP_DEFINE_EXPORTS` + `fixup_framework.h` | Must appear (in that order) at the top of every `.cpp` file that defines replacement functions |
| `DECLARE_FIXUP(original, replacement)` | Maps the original API's function pointer to your replacement so the runtime manager calls it instead |
| `reentrancy_guard` | Type you add to a replacement function to prevent infinite recursive calls (e.g. a `CreateFile` replacement that internally calls `CopyFile`, which itself calls `CreateFile`) |
| `FixupQueryCurrentDllConfig` | Parses the fixup's `config.json` block into a JSON object your fixup can read at startup |
| Fixup metadata XML | Per-fixup file declaring `Version` (MAJOR.MINOR.PATCH, SemVer2), minimum Windows platform, `Description`, and `WhenToUse` heuristics |

## Notes

- Identify which API calls actually fail inside the MSIX container (Process Monitor is the standard tool for this) before writing a replacement function.
- This page covers authoring a brand-new fixup DLL; using an existing fixup (`FileRedirectionFixup.dll`, `TraceFixup.dll`, ...) via `config.json` is covered on Package Support Framework instead.
- Reference implementations and the fixup metadata schema are published in the `microsoft/MSIX-PackageSupportFramework` GitHub repository (`Authoring.md`, `MetadataSchema.xsd`).

## Related

- [Package Support Framework](./package-support-framework.md)
