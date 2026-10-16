# Version Adaptive Apps

How to use new Windows 10 SDK APIs while keeping a UWP app compatible with earlier Windows 10 versions: set Target and Minimum versions, check for APIs at runtime, and test on both ends of the range.

## Signature / Usage

```csharp
bool isScannerDeviceContract_1_Present =
    Windows.Foundation.Metadata.ApiInformation.IsApiContractPresent
        ("Windows.Devices.Scanners.ScannerDeviceContract", 1);
```

Delay-loaded Win32 APIs in Store apps (which cannot call LoadLibrary) can be probed with `QueryOptionalDelayLoadedAPI`:

```cpp
#include <windows.h>
#include <commdlg.h>
#include <libloaderapi2.h>
#include <stdio.h>

EXTERN_C IMAGE_DOS_HEADER __ImageBase;
#define HMODULE_THISCOMPONENT reinterpret_cast<HMODULE>(&__ImageBase)

int __cdecl main(int argc, char** argv)
{
    if (QueryOptionalDelayLoadedAPI(HMODULE_THISCOMPONENT,
          "comdlg32.dll", "GetOpenFileNameW", 0))
    {
        printf("GetOpenFileNameW can be called!\n");
    }
    return 0;
}
```

## Options / Props

Visual Studio project targeting (Project -> Properties -> Application tab -> Targeting):

| Name | Type | Description |
|------|------|-------------|
| Target | SDK version | SDK version Visual Studio compiles app code and runs all tools against; all its APIs and resources are available at compile time. Default is the highest installed SDK. |
| Minimum | SDK version | SDK version supporting the earliest OS the app can run on (and will be deployed to by the store); app markup is compiled against it. Default is the lowest installed SDK. |

SDK build numbers:

| Friendly name | Version | OS/SDK build |
|---------------|---------|--------------|
| RTM | 1507 | 10240 |
| November Update | 1511 | 10586 |
| Anniversary Update | 1607 | 14393 |
| Creators Update | 1703 | 15063 |
| Fall Creators Update | 1709 | 16299 |
| April 2018 Update | 1803 | 17134 |
| October 2018 Update | 1809 | 17763 |
| May 2019 Update | 1903 | 18362 |

## Notes

- Three steps: configure Target/Minimum in the Visual Studio project, perform runtime API checks, then test on the Minimum and Target OS versions.
- At runtime the app runs against the deployed OS, so calling APIs or using resources absent from that version throws exceptions.
- Visual Studio does not warn about API compatibility. Testing on all OS versions between and including Minimum and Target is the developer's responsibility; testing on the Minimum version is expected to cover versions in between.
- Visual Studio 2015 Update 2 or later prompts for Target and Minimum on new projects; choices are limited to installed SDK versions. If a Preview SDK is installed and you write production code, change Target from the Preview SDK to the latest official SDK.
- Every Windows Runtime API since Windows 10 belongs to an API contract. A platform implementing any API in a contract must implement all of it, so one `IsApiContractPresent` check covers the whole contract. This checks device capabilities rather than a specific device or OS.
- `Windows.Foundation.UniversalApiContract` is the largest and most commonly used contract.
- `ApiInformation` also offers `IsTypePresent`, `IsEventPresent`, `IsMethodPresent` and `IsPropertyPresent` for finer-grained checks.
- Conditional XAML (using `IsApiContractPresent` in markup) requires a Minimum Version of build 15063 (Creators Update) or later.
- For an undocumented Preview SDK, contract support is listed in `Platform.xml` under `%ProgramFiles(x86)%\Windows Kits\10\Platforms\<platform>\<SDK version>\Platform.xml` (the source page writes the prefix as `\(Program Files (x86))\`).
- Not every conditional code path can be exercised on one device; deploy to a remote device or VM running the minimum supported OS.
- Source page dated 07/14/2025 (windows-dev-docs commit a3812316d9d6678be4e526ffb4b1c4f3958d956d).
- Details of `ApiInformation` (`IsApiContractPresent` / `IsTypePresent` etc.) in C#/WinRT are covered by the windows-interop-modernize skill (csharp-winrt/api-availability-checks.md).

## Related

- [Testing troubleshooting](./testing-troubleshooting.md)
- [Device Portal](./device-portal.md)
- [CI testing](./ci-testing.md)
