# Set up a C++ project for the Windows ML Runtime API

Configure a native C++ project to use the experimental Windows ML Runtime API and create an `IWinMLRuntime` instance.

## Signature / Usage

Add this property group near the top of the `.vcxproj`, before the first `Microsoft.Cpp.*` import:

```xml
<PropertyGroup Label="NuGet">
  <RestoreProjectStyle>PackageReference</RestoreProjectStyle>
  <NuGetTargetMoniker>native,Version=v0.0</NuGetTargetMoniker>
  <NuGetTargetPlatformIdentifier>Windows</NuGetTargetPlatformIdentifier>
  <NuGetTargetPlatformVersion>$(WindowsTargetPlatformVersion)</NuGetTargetPlatformVersion>
</PropertyGroup>
```

Initialize the Runtime:

```cpp
#include <Windows.h>
#include <winrt/base.h>

#include <WinMLRuntime.h>

#pragma comment(lib, "windowsapp.lib")

int wmain()
{
    winrt::com_ptr<IWinMLRuntime> runtime;
    winrt::check_hresult(WinMLCreateRuntime(
        __uuidof(IWinMLRuntime),
        runtime.put_void()));

    return 0;
}
```

## Notes

- Experimental and **not supported** for production; do not publish to the Microsoft Store.
- Prerequisites: a Windows version supported by the `Microsoft.Windows.AI.MachineLearning` package; Visual Studio 2022 or later with **Desktop development with C++**; a native C++ console project; the experimental NuGet package `2.7.2021-experimental` of `Microsoft.Windows.AI.MachineLearning`; for the doc samples, C++20 (`/std:c++20`) and the `Microsoft.Windows.CppWinRT` package.
- C++20 and C++/WinRT are requirements of the documentation samples, not of the Runtime API, which is a native COM-style ABI also consumable from C or C++ via raw COM, WRL, WIL, or another COM helper.
- The Windows ML package supplies the Runtime headers, import libraries, and self-contained DLLs.
- The CPU execution target is the baseline; GPU and NPU availability depends on device, platform capabilities, and installed execution backend.
- Build for the architecture matching the package assets (for example `Release|x64`); a successful build confirms NuGet restore found the headers and import library and copied the DLLs beside the executable.

## Related

- [Windows ML Runtime API overview](./runtime-overview.md)
- [Run a model with the Windows ML Runtime API](./runtime-tutorial.md)
- [Windows ML Runtime API concepts](./runtime-concepts.md)
