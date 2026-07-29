# C#/WinRT

| Name | Description | Path |
| --- | --- | --- |
| AOT and Trimming with C#/WinRT | C#/WinRT supports .NET Native AOT publishing building on top of IL trimming support. | [aot-trimming.md](./aot-trimming.md) |
| Detecting WinRT API Availability (ApiInformation) | ApiInformation lets you detect whether a WinRT API contract, type, or member is present at runtime. | [api-availability-checks.md](./api-availability-checks.md) |
| Calling Asynchronous WinRT APIs from .NET | WinRT asynchronous methods return IAsyncAction/IAsyncOperation instead of .NET Task. | [async-operations.md](./async-operations.md) |
| Authoring WinRT Components with C#/WinRT | Lets .NET developers author their own WinRT components producing a .winmd file. | [authoring-winrt-components.md](./authoring-winrt-components.md) |
| COM Interop with ComImport and ComWrappers | Interop with plain IUnknown-based COM interfaces and WinRT IInspectable-based interfaces. | [com-interop.md](./com-interop.md) |
| System.Runtime.InteropServices.WindowsRuntime Removal | .NET 5 breaking change removing built-in support for consuming WinRT APIs via WinMD files. | [dotnet-winrt-removal.md](./dotnet-winrt-removal.md) |
| .NET Mappings of WinRT Types | C#/WinRT maps certain WinRT types to .NET equivalents in desktop apps targeting .NET 6+. | [net-mappings-of-winrt-types.md](./net-mappings-of-winrt-types.md) |
| Generate a C# Projection from a C++/WinRT Component | Using cswinrt.exe to generate a C# projection assembly from an existing C++/WinRT component. | [net-projection-from-cppwinrt-component.md](./net-projection-from-cppwinrt-component.md) |
| C#/WinRT Overview | A NuGet-packaged toolkit providing Windows Runtime projection support for C#. | [overview.md](./overview.md) |
| Microsoft.Windows.SDK.NET.Ref and TargetFramework | .NET 6+ desktop apps specify a Windows OS version-specific TFM to call WinRT APIs. | [sdk-net-ref-targetframework.md](./sdk-net-ref-targetframework.md) |
| WinRT.Interop: Retrieving and Passing a Window Handle (HWND) | WindowNative and InitializeWithWindow for passing HWND to WinRT objects in desktop apps. | [window-handle-interop.md](./window-handle-interop.md) |
| WinRT APIs Not Supported in Desktop Apps | APIs with UWP-only UI dependencies and APIs requiring package identity are not supported. | [winrt-api-desktop-support.md](./winrt-api-desktop-support.md) |
