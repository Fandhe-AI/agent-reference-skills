# .NET Deployment Models

.NET publishing modes — framework-dependent vs. self-contained — plus the Trimming and ReadyToRun optimizations that apply to Windows app deployment output size and startup performance.

## Signature / Usage

```dotnetcli
# Framework-dependent (default)
dotnet publish -c Release [-r <RID>]

# Self-contained
dotnet publish -c Release -r <RID> --self-contained true

# Self-contained + trimmed + ReadyToRun
dotnet publish -c Release -r <RID> --self-contained true -p:PublishTrimmed=true -p:PublishReadyToRun=true
```

## Options / Props

| Mode / Option | Description |
| --- | --- |
| Framework-dependent | Smaller deployment; target environment must already have the matching .NET runtime installed; rolls forward to the latest installed patch. |
| Self-contained (SCD) | Bundles the .NET runtime with the app; larger deployment; does not roll forward — the app controls its exact runtime version. |
| `-p:PublishTrimmed=true` | Removes unused IL from self-contained deployments to reduce size (see .NET trimming docs). |
| `-p:PublishReadyToRun=true` | Ahead-of-time (AOT) compiles assemblies to native code alongside IL, improving cold-start performance at the cost of larger binaries; works with both framework-dependent and self-contained modes. |
| `-p:PublishSingleFile=true` | Bundles all dependent files into a single executable; OS/architecture specific. |
| `-p:PublishAot=true` | Native AOT — compiles directly to native code with no JIT/runtime dependency; self-contained only; not all .NET features are supported. |

## Notes

- For the Windows App SDK, self-contained C# apps additionally need `<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>` in the project file — .NET self-contained publish alone is not sufficient.
- By default, `PublishSingleFile` leaves the native Windows App SDK runtime files as separate files for WinUI 3 apps. For unpackaged, self-contained apps (Windows App SDK 1.5+) with the required properties (`EnableMsixTooling`, `WindowsPackageType=None`, `IncludeAllContentForSelfExtract`, etc.), a single-file EXE is supported; dependencies are extracted to a temp directory at first launch. See [Unpackage a WinUI App](./unpackage-winui-app.md).
- Trimming and Native AOT can break reflection-heavy code; test thoroughly after enabling.

## Related

- [Windows App SDK deployment guide for self-contained apps](./windows-app-sdk-self-contained-deploy.md)
- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [Unpackage a WinUI App](./unpackage-winui-app.md)
