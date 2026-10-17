# Detecting Package Identity

A process is packaged when it has package identity and unpackaged when it does not. The distinction applies to processes (background tasks, out-of-process servers and other processes can also have identity), not only to applications. Detect it with Task Manager, the Win32 `GetCurrentPackageFullName` function (`appmodel.h`), or managed code via P/Invoke.

## Signature / Usage

Call `GetCurrentPackageFullName` without a buffer:

- `ERROR_INSUFFICIENT_BUFFER` means the process has package identity.
- `APPMODEL_ERROR_NO_PACKAGE` means the process does not have package identity.
- Any other value is an error that the app should handle.

```cpp
#include <Windows.h>
#include <appmodel.h>

LONG IsPackagedProcess(bool* isPackaged)
{
    if (isPackaged == nullptr)
    {
        return ERROR_INVALID_PARAMETER;
    }

    *isPackaged = false;
    UINT32 length = 0;
    const LONG result = GetCurrentPackageFullName(&length, nullptr);

    if (result == ERROR_INSUFFICIENT_BUFFER)
    {
        *isPackaged = true;
        return ERROR_SUCCESS;
    }

    if (result == APPMODEL_ERROR_NO_PACKAGE)
    {
        return ERROR_SUCCESS;
    }

    return result;
}
```

Managed code (platform invocation):

```csharp
using System;
using System.ComponentModel;
using System.Runtime.InteropServices;

internal static class PackageIdentity
{
    private const int ErrorInsufficientBuffer = 122;
    private const int AppModelErrorNoPackage = 15700;

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
    private static extern int GetCurrentPackageFullName(
        ref int packageFullNameLength,
        IntPtr packageFullName);

    public static bool IsPackagedProcess()
    {
        var length = 0;
        var result = GetCurrentPackageFullName(ref length, IntPtr.Zero);

        return result switch
        {
            ErrorInsufficientBuffer => true,
            AppModelErrorNoPackage => false,
            _ => throw new Win32Exception(result),
        };
    }
}
```

## Options / Props

| Return code | Meaning |
|------|-------------|
| `ERROR_INSUFFICIENT_BUFFER` (122; first call, no buffer) | Process has package identity; `length` receives the required buffer size if the package full name is also needed |
| `APPMODEL_ERROR_NO_PACKAGE` (15700) | Process has no package identity (unpackaged) |
| Any other value | Error; do not treat it as "unpackaged" |

## Notes

- Check in Task Manager without changing the app: open Task Manager, select Details, right-click a column heading, select Select columns, then select Package name. The field is blank for an unpackaged process; for a packaged process it normally contains the package's localized display name. Display names are not guaranteed to be unique, and Task Manager may show an `ms-resource:` reference if it cannot resolve the localized resource.
- Package identity can come from a package that contains the application files or from a package with external location. Detecting identity therefore does not tell you where the application files are stored or which packaging model the app uses.
- The check does not need the package full name. If you also need the identity value, allocate a buffer of the returned length and call `GetCurrentPackageFullName` again.
- Use the check before using a feature that requires package identity, selecting an update mechanism, or choosing a storage location.
- Removed (2026-09-30 source revision): the earlier statement that success implies Windows 10 version 1709 (build 16299) or later "with full MSIX support", and the reference to community helper libraries such as DesktopBridgeHelpers for .NET, are no longer in the official page; the .NET sample is now the P/Invoke code above.

## Related

- [Package Identity Overview](./package-identity-overview.md)
- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Packaged vs Unpackaged Behavior](./packaged-vs-unpackaged-behavior.md)
