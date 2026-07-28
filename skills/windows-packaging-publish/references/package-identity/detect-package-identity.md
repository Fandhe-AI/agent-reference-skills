# Detecting Package Identity

At runtime, an app can determine whether its process has package identity (i.e. whether it is running as MSIX or was granted identity via a sparse/external-location package) by calling the Win32 `GetCurrentPackageFullName` function (`appmodel.h`, `kernel32.dll`) with a null buffer.

## Signature / Usage

```cpp
#include <Windows.h>
#include <appmodel.h>

UINT32 length = 0;
LONG rc = GetCurrentPackageFullName(&length, NULL);
if (rc != ERROR_INSUFFICIENT_BUFFER)
{
    if (rc == APPMODEL_ERROR_NO_PACKAGE)
        wprintf(L"Process has no package identity\n");
    else
        wprintf(L"Error %d in GetCurrentPackageFullName\n", rc);
}
else
{
    PWSTR fullName = (PWSTR)malloc(length * sizeof(*fullName));
    rc = GetCurrentPackageFullName(&length, fullName);
    if (rc == ERROR_SUCCESS)
        wprintf(L"%s\n", fullName); // PackageFullName
    free(fullName);
}
```

## Options / Props

| Return code | Meaning |
|------|-------------|
| `ERROR_INSUFFICIENT_BUFFER` (first call, buffer NULL) | Process **has** package identity; `length` receives the required buffer size for a second call to retrieve the `PackageFullName`. |
| `APPMODEL_ERROR_NO_PACKAGE` | Process **has no** package identity (unpackaged). |
| `ERROR_SUCCESS` (second call with allocated buffer) | `PackageFullName` string written to the buffer. |

## Notes

- If the function ultimately succeeds, the app is packaged in MSIX (or granted identity via external-location/sparse packaging) and running on Windows 10 version 1709 (build 16299) or later with full MSIX support.
- In managed (.NET Framework) code, call `GetCurrentPackageFullName` via P/Invoke; community helper libraries (e.g. DesktopBridgeHelpers) wrap this for convenience.
- This is the canonical way to branch app behavior (e.g. update-check logic, feature availability) based on whether the current process has package identity.

## Related

- [Package Identity Overview](./package-identity-overview.md)
- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Packaged vs Unpackaged Behavior](./packaged-vs-unpackaged-behavior.md)
