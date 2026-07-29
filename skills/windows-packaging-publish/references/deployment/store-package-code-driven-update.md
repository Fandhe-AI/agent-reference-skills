# Code-Driven Store Package Updates

`Windows.Services.Store.StoreContext` methods that let an app check for, download, and install its own Microsoft Store package/dependency updates from running code, instead of relying solely on the Store app's own update schedule.

## Signature / Usage

```csharp
using Windows.Services.Store;

private async void GetEasyUpdates()
{
    StoreContext updateManager = StoreContext.GetDefault();
    IReadOnlyList<StorePackageUpdate> updates =
        await updateManager.GetAppAndOptionalStorePackageUpdatesAsync();

    if (updates.Count > 0)
    {
        IAsyncOperationWithProgress<StorePackageUpdateResult, StorePackageUpdateStatus> downloadOperation =
            updateManager.RequestDownloadAndInstallStorePackageUpdatesAsync(updates);
        StorePackageUpdateResult result = await downloadOperation.AsTask();
    }
}
```

## Options / Props

| API | Kind | Description |
| --- | --- | --- |
| `StoreContext.GetAppAndOptionalStorePackageUpdatesAsync()` | method | Returns the list of `StorePackageUpdate` (main package + optional/dependency packages) available for the current app |
| `StoreContext.RequestDownloadAndInstallStorePackageUpdatesAsync(updates)` | method | Downloads and installs the given updates in one step, showing the system's permission/progress UI; returns `StorePackageUpdateResult` |
| `StoreContext.RequestDownloadStorePackageUpdatesAsync(updates)` | method | Downloads only, exposing a `Progress` callback for a custom UI; install is a separate later step |
| `StorePackageUpdate.Mandatory` | property | `true` when the update was marked mandatory in Partner Center; app code checks this to force install |
| `StorePackageUpdateResult.OverallState` | property | `StorePackageUpdateState` (e.g. `Completed`) reported after a download/install operation finishes |

## Notes

- Two update strategies: the **simple** one-call path (`RequestDownloadAndInstallStorePackageUpdatesAsync`) lets the system prompt the user and apply the update immediately; the **fine-controlled** path splits download (`RequestDownloadStorePackageUpdatesAsync`, with progress reporting) from install so the app can defer installing until the user/app is ready.
- Making an update mandatory requires two parts: app code that checks `StorePackageUpdate.Mandatory` and shows a custom dialog forcing install (or degrading/terminating the app if declined), **and** selecting **Make this update mandatory** on the package in Partner Center — code alone does not make an update mandatory.
- If a device comes back online after a mandatory update was superseded by a later non-mandatory one, the non-mandatory update still reports as mandatory because of the missed update before it.
- Requires Windows 10 version 1607 (build 14393) or later and applies to Store-distributed (not sideloaded) packages.
- Distinct from `package-uninstall-update.md`, which covers uninstall/update mechanics by packaging model (`PackageManager`); this page covers the `StoreContext` API surface an app calls to trigger/check its own Store update in code.

## Related

- [StoreContext](../store-publish/store-context.md)
- [Package Uninstall and Update Behavior](../package-identity/package-uninstall-update.md)
- [Gradual Package Rollout](./gradual-package-rollout.md)
