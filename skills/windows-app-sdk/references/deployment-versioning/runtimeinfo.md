# RuntimeInfo, ReleaseInfo, and WindowsAppRuntimeVersion

Static classes that report version info for the currently-loaded Windows App SDK runtime (`RuntimeInfo`) and for a specific Windows App SDK release (`ReleaseInfo`), plus the `WindowsAppRuntimeVersion` struct used to identify a major.minor.patch release when configuring runtime compatibility.

## Signature / Usage

```csharp
using Microsoft.Windows.ApplicationModel.WindowsAppRuntime;

public static class RuntimeInfo
{
    public static string AsString { get; }
    public static PackageVersion Version { get; }
}

public static class ReleaseInfo
{
    public static string AsString { get; }
    public static ushort Major { get; }
    public static ushort Minor { get; }
    public static ushort Patch { get; }
    public static string VersionTag { get; }
}

public struct WindowsAppRuntimeVersion
{
    public uint Major;
    public uint Minor;
    public uint Patch;
}
```

## Options / Props

| Member | Type | Description |
|---|---|---|
| `RuntimeInfo.AsString` | `string` | The loaded Windows App SDK runtime's version info formatted as a string. |
| `RuntimeInfo.Version` | `PackageVersion` (`Windows.ApplicationModel.PackageVersion`) | The version of the Windows App SDK runtime currently loaded. |
| `ReleaseInfo.AsString` | `string` | The current Windows App SDK release's version info formatted as a string. |
| `ReleaseInfo.Major` / `Minor` / `Patch` | `ushort` | The major/minor/patch version of the Windows App SDK release. |
| `ReleaseInfo.VersionTag` | `string` | The release's version tag, e.g. `"preview2"`; empty string for a stable release. |
| `WindowsAppRuntimeVersion.Major` / `Minor` / `Patch` | `uint` | Fields identifying a Windows App SDK release, used to construct a patch-level value (see `RuntimeCompatibilityOptions`). |

## Notes

- Namespace: `Microsoft.Windows.ApplicationModel.WindowsAppRuntime`. Available starting Windows App SDK 1.7 through 2.0 (moniker range `windows-app-sdk-1.7` .. `windows-app-sdk-2.0`).
- `RuntimeInfo` and `ReleaseInfo` differ in representation, not in what they identify: `RuntimeInfo` exposes the version as a single `PackageVersion` (via `Version`) plus a formatted `AsString`, while `ReleaseInfo` exposes the same release discretely as `Major`/`Minor`/`Patch`/`VersionTag` plus its own `AsString`.
- `WindowsAppRuntimeVersion` is a plain major/minor/patch struct (not tied to a loaded runtime); it's the type used to set `RuntimeCompatibilityOptions.PatchLevel1`/`PatchLevel2`.

## Related

- [DeploymentManager](./deploymentmanager.md)
- [RuntimeCompatibilityOptions and DeploymentInitializeOptions](./runtimecompatibilityoptions.md)
