# Tutorial: Bootstrapper API in an Unpackaged App

Step-by-step tutorial configuring a C# or C++ console/desktop app (packaged with external location, or unpackaged) to explicitly call the bootstrapper API and use Windows App SDK features such as `ResourceManager`.

## Signature / Usage

```csharp
using System;
using Microsoft.Windows.ApplicationModel.DynamicDependency;

class Program
{
    static void Main(string[] args)
    {
        Bootstrap.Initialize(0x00010005); // Windows App SDK 1.5
        Console.WriteLine("Hello, World!");
        Bootstrap.Shutdown();
    }
}
```

```cpp
#include <iostream>
#include <windows.h>
#include <MddBootstrap.h>

int main()
{
    const UINT32 majorMinorVersion{ 0x00010005 };
    PCWSTR versionTag{ L"" };
    const PACKAGE_VERSION minVersion{};

    const HRESULT hr{ MddBootstrapInitialize(majorMinorVersion, versionTag, minVersion) };
    if (FAILED(hr)) { return hr; }

    std::cout << "Hello, World!\n";
    MddBootstrapShutdown();
}
```

## Options / Props

| Parameter | Description |
|---|---|
| `majorMinorVersion` | Hex-encoded major.minor version of the Windows App SDK, e.g. `0x00010005` = 1.5, `0x00010006` = 1.6. |
| `versionTag` | Optional version tag string (empty for stable). |
| `minVersion` | Minimum acceptable `PACKAGE_VERSION`. |

## Notes

- The dynamic dependencies and bootstrapper APIs fail when called from an elevated process — don't launch Visual Studio elevated when testing.
- This is the *explicit* alternative to auto-initialization (`WindowsPackageType=None`); use it for advanced needs like custom error handling or targeting a specific Windows App SDK version.
- WinUI doesn't support the `AnyCPU` platform — set the solution platform to x64 (or another concrete architecture) explicitly.
- For WPF projects, see "Use the Windows App SDK in an existing project" instead of this tutorial.

## Related

- [Use the Windows App SDK Runtime (Bootstrapper API)](./use-windows-app-sdk-run-time.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
