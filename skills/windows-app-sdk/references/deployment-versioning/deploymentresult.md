# DeploymentResult

Sealed class returned by `DeploymentManager` methods, providing deployment status and error information for the Windows App SDK runtime referenced by the current package.

## Signature / Usage

```csharp
namespace Microsoft.Windows.ApplicationModel.WindowsAppRuntime
{
    public sealed class DeploymentResult
    {
        public DeploymentResult(DeploymentStatus status, HResult extendedError);
        public HResult ExtendedError { get; }
        public DeploymentStatus Status { get; }
    }
}
```

## Options / Props

| Member | Description |
|---|---|
| `Status` | Gets the deployment status of the Windows App SDK runtime currently loaded (`DeploymentStatus` enum). |
| `ExtendedError` | Gets the first encountered error, if any, from initializing the runtime or getting its status (`HResult`). |
| Constructor `DeploymentResult(DeploymentStatus, HResult)` | Initializes a new instance directly. |

## Notes

- Namespace: `Microsoft.Windows.ApplicationModel.WindowsAppRuntime`. This is the Windows App SDK runtime deployment API, unrelated to any similarly-named types in other frameworks.
- Returned by `DeploymentManager.GetStatus()`, `Initialize()`, and `Repair()`.

## Related

- [DeploymentManager](./deploymentmanager.md)
- [Deployment Guide for Packaged Apps](./deploy-packaged-apps.md)
