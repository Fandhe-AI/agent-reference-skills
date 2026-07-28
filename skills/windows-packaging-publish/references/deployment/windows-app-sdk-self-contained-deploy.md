# Windows App SDK: Self-Contained Deployment

Switches a Windows App SDK project from the default framework-dependent model to self-contained, bundling the Windows App SDK runtime with the app instead of requiring it on the target machine.

## Signature / Usage

```xml
<PropertyGroup>
  <WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>
</PropertyGroup>
```

## Options / Props

| Setting | Applies to | Description |
| --- | --- | --- |
| `<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>` | App project (and Windows Application Packaging Project, if used) | Extracts the Windows App SDK Framework package contents into the build output and deploys them with the app. Should **not** be set in library projects. |
| .NET self-contained publish | C# apps | Must also [publish as self-contained](https://learn.microsoft.com/en-us/dotnet/core/deploying/#publish-self-contained) to be fully self-contained; `dotnet publish` cannot produce a single-file EXE for WinUI 3 apps (native runtime files stay separate). |
| Hybrid CRT | C++ apps | Must use the hybrid CRT (import `HybridCRT.props`) to be fully self-contained; packaged apps must also set `<UseCrtSDKReferenceStaticWarning>false</UseCrtSDKReferenceStaticWarning>`. |
| `WindowsAppSdkUndockedRegFreeWinRTInitialize` | Unpackaged self-contained apps | Controls automatic *UndockedRegFreeWinRT* support; defaults to `true` when self-contained, `WindowsPackageType=None`, and `OutputType` is `Exe`/`WinExe`. |

## Notes

- If the app is packaged (MSIX), the Windows App SDK dependencies are bundled inside the MSIX package; deployment still requires registering the package as usual.
- If packaged with external location or unpackaged, the dependencies are copied next to the `.exe` and can be xcopy-deployed or bundled into a custom installer.
- A small number of APIs (e.g. `PushNotificationManager`, `AppNotificationManager`) depend on the Singleton package regardless of self-contained status — check `IsSupported` at runtime, deploy the MSIX packages separately, or avoid the API.

## Related

- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [.NET deployment models](./dotnet-deployment-models.md)
