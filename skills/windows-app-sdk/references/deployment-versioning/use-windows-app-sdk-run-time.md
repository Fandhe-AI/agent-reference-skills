# Use the Windows App SDK Runtime (Bootstrapper API)

How packaged-with-external-location and unpackaged apps initialize the Windows App SDK runtime at startup, via automatic initialization (`WindowsPackageType=None`) or by calling the Bootstrapper API explicitly.

## Signature / Usage

```cpp
#include <MddBootstrap.h>

const UINT32 majorMinorVersion{ 0x00010005 };  // e.g. version 1.5
PCWSTR versionTag{ L"" };
const PACKAGE_VERSION minVersion{};

const HRESULT hr{ MddBootstrapInitialize(majorMinorVersion, versionTag, minVersion) };
if (FAILED(hr)) { /* handle error */ }

// ... use Windows App SDK features ...

MddBootstrapShutdown();
```

```csharp
using Microsoft.Windows.ApplicationModel.DynamicDependency;

Bootstrap.Initialize(0x00010005); // version 1.5
// ... use Windows App SDK features ...
Bootstrap.Shutdown();
```

## Options / Props

| API | Description |
|---|---|
| `MddBootstrapInitialize` (C/C++, `mddbootstrap.h`) | Initializes the process to use the best-matching Windows App SDK Framework package version; also initializes the DDLM. Must be one of the first calls in app startup. |
| `MddBootstrapInitialize2` | Available from version 1.1; extended-criteria variant of `MddBootstrapInitialize`. |
| `MddBootstrapShutdown` | Reverses `MddBootstrapInitialize`; also shuts down the DDLM. |
| `Bootstrap.Initialize` / `TryInitialize` / `Shutdown` (`Microsoft.WindowsAppRuntime.Bootstrap.Net.dll`) | .NET wrapper around the C/C++ bootstrapper functions for common scenarios. |
| `<WindowsPackageType>None</WindowsPackageType>` | Simplest option: auto-generates the bootstrapper call via an auto-initializer, no manual code needed. |

### `WindowsAppSDKBootstrapAutoInitializeOptions_*` properties

| Property | Effect |
|---|---|
| `..._Default` | Use default options. |
| `..._None` | Use no options. |
| `..._OnError_DebugBreak` | Call `DebugBreak()` on error. |
| `..._OnError_DebugBreak_IfDebuggerAttached` | `DebugBreak()` on error, only if a debugger is attached. |
| `..._OnError_FailFast` | Fail-fast on error. |
| `..._OnNoMatch_ShowUI` | Prompt the user to acquire the runtime if no match is found. |
| `..._OnPackageIdentity_NoOp` | Succeed as a no-op if called in a process that already has package identity. |

## Notes

- Your app must initialize the Windows App SDK runtime before using any other Windows App SDK feature (WinUI 3, App Lifecycle, MRT Core, DWriteCore).
- `WindowsAppSdkBootstrapInitialize=false` opts out of the auto-initializer so you can call the bootstrapper API yourself.
- Include a side-by-side application manifest declaring `maxversiontested`/`supportedOS` to avoid the Windows App SDK defaulting to Windows 8 compatibility behavior (potential crashes) for packaged-with-external-location/unpackaged apps.
- A C++ wrapper for the bootstrapper API is available from version 1.1 (Bootstrapper C++ API).

## Related

- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
- [Tutorial: Bootstrapper API in an Unpackaged App](./tutorial-unpackaged-deployment.md)
- [Project Properties and Auto-Initializers](./project-properties.md)
