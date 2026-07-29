# RuntimeCompatibilityOptions and DeploymentInitializeOptions

`RuntimeCompatibilityOptions` lets an app pin the Windows App SDK runtime to a specific servicing patch level, or temporarily disable specific behavior changes shipped in a servicing release, without switching away from framework-dependent deployment. `DeploymentInitializeOptions` configures the separate `DeploymentManager.Initialize` call.

## Signature / Usage

```csharp
using Microsoft.Windows.ApplicationModel.WindowsAppRuntime;

void ApplyRuntimeCompatibilityOptions()
{
    var compatibilityOptions = new RuntimeCompatibilityOptions();
    compatibilityOptions.PatchLevel1 = new WindowsAppRuntimeVersion(1, 7, 3);
    compatibilityOptions.PatchLevel2 = new WindowsAppRuntimeVersion(1, 8, 2);
    compatibilityOptions.DisabledChanges.Add(RuntimeCompatibilityChange.SampleApiCrashFix);
    compatibilityOptions.Apply();
}
```

```xml
<!-- Equivalent, set in the project file instead of calling the API directly -->
<PropertyGroup>
  <WindowsAppSDKRuntimePatchLevel1>1.7.3</WindowsAppSDKRuntimePatchLevel1>
  <WindowsAppSDKRuntimePatchLevel2>1.8.2</WindowsAppSDKRuntimePatchLevel2>
  <WindowsAppSDKDisabledChanges>SampleApiCrashFix, OtherSampleApiCrashFix</WindowsAppSDKDisabledChanges>
</PropertyGroup>
```

## Options / Props

| Member | Type | Description |
|---|---|---|
| `RuntimeCompatibilityOptions()` | constructor | Creates a new, default `RuntimeCompatibilityOptions` object. |
| `PatchLevel1` / `PatchLevel2` | `WindowsAppRuntimeVersion` | Optional patch level(s) to use when the runtime's major.minor version matches. `PatchLevel2` is a convenience for apps mid-transition between two Windows App SDK versions; setting both to the same major.minor version errors on `Apply()`. |
| `DisabledChanges` | `IList<RuntimeCompatibilityChange>` | Optional list of specific servicing changes to disable; see Notes. |
| `Apply()` | method | Applies the compatibility options to the runtime. Must be called early in the process, before any other Windows App SDK API, or right after runtime initialization. |
| `WindowsAppSDKRuntimePatchLevel1` / `2` | MSBuild property | Project-file equivalent of `PatchLevel1`/`PatchLevel2`, applied automatically at the correct time. |
| `WindowsAppSDKDisabledChanges` | MSBuild property | Comma-separated list of `RuntimeCompatibilityChange` names, project-file equivalent of `DisabledChanges`. |
| `DeploymentInitializeOptions()` | constructor | Creates a new instance, passed to `DeploymentManager.Initialize(DeploymentInitializeOptions)`. |
| `DeploymentInitializeOptions.ForceDeployment` | `bool` | Whether the Windows App SDK *Main*/*Singleton* package processes are shut down forcibly if in use, when registering packages. |
| `DeploymentInitializeOptions.OnErrorShowUI` | `bool` | Whether UI is displayed if an error occurs during initialization. |

## Notes

- Namespace: `Microsoft.Windows.ApplicationModel.WindowsAppRuntime`. `RuntimeCompatibilityOptions` (and the `RuntimeCompatibilityChange` enum) is available starting Windows App SDK 1.7 through 2.0 (moniker range `windows-app-sdk-1.7` .. `windows-app-sdk-2.0`). `DeploymentInitializeOptions` is available starting Windows App SDK 1.1 through 2.0 (moniker range `windows-app-sdk-1.1` .. `windows-app-sdk-2.0`) — an independently versioned, unrelated type that happens to share this page's topic.
- By default all servicing changes are enabled and the runtime uses the latest patch level; `RuntimeCompatibilityOptions` is set-only (it configures behavior, it cannot be queried back).
- If no `PatchLevel1`/`PatchLevel2` is specified, or neither matches the runtime's major.minor version, the runtime uses the latest patch level (i.e. behaves as if the API weren't used).
- `RuntimeCompatibilityChange` is a large enum (~120 named constants, one per fix/behavior change, e.g. `FixRandomUIFreezeInDispatcher`, `DeploymentManager_PackageDowngradeFix`) — `None` (value `0`) is documented "don't use this value". The [Windows App SDK stable channel release notes](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel) name each disableable change per release; look up the specific constant there rather than in this page.
- `DeploymentInitializeOptions` is the type referenced by `DeploymentManager.Initialize(DeploymentInitializeOptions options)`.

## Related

- [RuntimeInfo, ReleaseInfo, and WindowsAppRuntimeVersion](./runtimeinfo.md)
- [DeploymentManager](./deploymentmanager.md)
