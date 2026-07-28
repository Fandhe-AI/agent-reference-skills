# Get Started with C++/WinRT

Walks through a simple C++/WinRT console app, and shows how to add C++/WinRT support to a Windows Desktop application project.

## Signature / Usage

```cppwinrt
// pch.h
#pragma once
#include <winrt/Windows.Foundation.Collections.h>
#include <winrt/Windows.Web.Syndication.h>
#include <iostream>

// main.cpp
#include "pch.h"

using namespace winrt;
using namespace Windows::Foundation;
using namespace Windows::Web::Syndication;

int main()
{
    winrt::init_apartment();

    Uri rssFeedUri{ L"https://blogs.windows.com/feed" };
    SyndicationClient syndicationClient;
    SyndicationFeed syndicationFeed = syndicationClient.RetrieveFeedAsync(rssFeedUri).get();
    for (const SyndicationItem syndicationItem : syndicationFeed.Items())
    {
        winrt::hstring titleAsHstring = syndicationItem.Title().Text();
        std::wcout << titleAsHstring.c_str() << std::endl;
    }
}
```

## Notes

- Whenever you use a type from a Windows namespace, `#include` the corresponding `winrt/<Namespace>.h` projection header — the corresponding header has the same name as the type's namespace.
- `winrt::init_apartment()` initializes the calling thread in the Windows Runtime (by default in a multithreaded apartment) and also initializes COM. Call it once, early, before using any WinRT API.
- To add C++/WinRT support to an existing Desktop project: rename the precompiled header to `pch.h`, `#include <winrt/base.h>` in it, set **C++ Language Standard** to C++17, and link `WindowsApp.lib` (via the NuGet package, project link settings, or `#pragma comment(lib, "windowsapp")`).
- C++/WinRT converts error HRESULTs into `winrt::hresult_error` exceptions — you don't need to handle HRESULTs directly (see `error-handling.md`).
- `SyndicationClient::RetrieveFeedAsync` is a blocking call to `.get()` here for illustration; prefer `co_await` on a UI thread (see `async-coroutines.md`).

## Related

- [Overview](./overview.md)
- [Error Handling](./error-handling.md)
- [String Handling](./strings.md)
- [Concurrency and Coroutines](./async-coroutines.md)
