# csharp-winrt

| Name | Description | Path |
|------|-------------|------|
| C#/WinRT Overview | cswinrt toolkit, projection assemblies, NuGet package, common errors | [overview.md](./overview.md) |
| Microsoft.Windows.SDK.NET.Ref and TargetFramework | TFM configuration (`net8.0-windows10.0.19041.0`), SupportedOSPlatformVersion | [sdk-net-ref-targetframework.md](./sdk-net-ref-targetframework.md) |
| Calling Asynchronous WinRT APIs from .NET | `await` on `IAsyncOperation`, `AsTask`, `AsAsyncAction`/`AsAsyncOperation` | [async-operations.md](./async-operations.md) |
| .NET Mappings of WinRT Types | WinRT-to-.NET type mapping tables (Windows SDK and WinUI) | [net-mappings-of-winrt-types.md](./net-mappings-of-winrt-types.md) |
| WinRT.Interop: Retrieving and Passing a Window Handle | `WindowNative.GetWindowHandle`, `InitializeWithWindow.Initialize` | [window-handle-interop.md](./window-handle-interop.md) |
| COM Interop with ComImport and ComWrappers | `[ComImport]`, `.As<T>()`, `Marshal.GetObjectForIUnknown`, `ComWrappers` | [com-interop.md](./com-interop.md) |
| Authoring WinRT Components with C#/WinRT | `CsWinRTComponent`, generating and consuming a `.winmd` | [authoring-winrt-components.md](./authoring-winrt-components.md) |
| AOT and Trimming with C#/WinRT | `PublishAot`, partial classes, rooting types, trim warnings | [aot-trimming.md](./aot-trimming.md) |
| System.Runtime.InteropServices.WindowsRuntime Removal | .NET 5 breaking change, migration to TFM/C#/WinRT | [dotnet-winrt-removal.md](./dotnet-winrt-removal.md) |
| Detecting WinRT API Availability | `ApiInformation.IsApiContractPresent`, `IsTypePresent` | [api-availability-checks.md](./api-availability-checks.md) |
| WinRT APIs Not Supported in Desktop Apps | Unsupported classes, package-identity-required APIs, alternatives | [winrt-api-desktop-support.md](./winrt-api-desktop-support.md) |
