# DeploymentManager

Static class providing access to deployment information and initialization for the Windows App SDK runtime, used by framework-dependent packaged apps.

## Signature / Usage

```csharp
using Microsoft.Windows.ApplicationModel.WindowsAppRuntime;

public static class DeploymentManager
{
    public static DeploymentResult GetStatus();
    public static DeploymentResult Initialize();
    public static DeploymentResult Initialize(DeploymentInitializeOptions options);
    public static DeploymentResult Repair();
}
```

## Options / Props

| Member | Description |
|---|---|
| `GetStatus()` | Returns the current deployment status of the loaded Windows App SDK runtime; use to determine whether install work is needed before using Windows App SDK features. |
| `Initialize()` | Checks the status of the runtime referenced by the current package and attempts to register any missing packages. Call once (no more than once) at app startup. |
| `Initialize(DeploymentInitializeOptions)` | Same as `Initialize()`, applying the supplied options. |
| `Repair()` | Attempts to repair the runtime regardless of state; call only when deployment status isn't OK, since it always performs a repair. Derives version/channel/architecture from the current Framework package. |

## Notes

- Namespace: `Microsoft.Windows.ApplicationModel.WindowsAppRuntime`. Package: Windows App SDK runtime API. Distinct from any unrelated `DeploymentManager` types in other frameworks.
- Your app should call `DeploymentManager.Initialize` during startup — see the Deployment Overview's "Initialize the Windows App SDK" guidance to determine if this explicit call is necessary (it may already be handled by the `WindowsAppSdkDeploymentManagerInitialize` auto-initializer).
- Available starting Windows App SDK 1.0 through 2.0 (moniker range `windows-app-sdk-1.0` .. `windows-app-sdk-2.0`).

## Related

- [DeploymentResult](./deploymentresult.md)
- [Deployment Guide for Packaged Apps](./deploy-packaged-apps.md)
- [Project Properties and Auto-Initializers](./project-properties.md)
