# C++/WinRT Overview

C++/WinRT is a standard C++17 language projection for Windows Runtime (WinRT) APIs, implemented as a header-file-based library. It's Microsoft's recommended replacement for C++/CX and the Windows Runtime C++ Template Library (WRL).

## Signature / Usage

```cppwinrt
#include <winrt/Windows.Foundation.h>

using namespace winrt;
using namespace Windows::Foundation;

int main()
{
    winrt::init_apartment();
    Uri contosoUri{ L"http://www.contoso.com" };
}
```

## Notes

- With C++/WinRT you can both *consume* and *author* Windows Runtime APIs using standard C++17, without COM-style programming.
- The Windows SDK includes C++/WinRT (since 10.0.17134.0 / Windows 10 version 1803). The **Microsoft.Windows.CppWinRT** NuGet package provides the `cppwinrt.exe` tool and MSBuild support.
- Three main scenarios: consuming Windows APIs and types, authoring Windows APIs and types, and XAML applications (a combination of consuming and authoring).
- C++/WinRT projects require `/std:c++17`, `/bigobj`, and (for coroutines) `/await`.
- Distinct from C++/CX (`ref class`, hat `^` references, `ref new`) — see `move-to-winrt-from-cx.md` for the mapping between the two projections.
- This skill's guidance targets both UWP (`Windows.UI.Xaml`) and WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml`) code paths; substitute namespaces as noted per page.

## Related

- [Get Started](./get-started.md)
- [Move to C++/WinRT from C++/CX](./move-to-winrt-from-cx.md)
- [Consume APIs](./consume-apis.md)
- [Author APIs](./author-apis.md)
