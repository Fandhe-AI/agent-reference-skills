# Guidance for App Package Management (MSIX / MSI-EXE / PWA)

How an app's packages are made available to customers, and how to handle removing packages or unpublishing.

## Signature / Usage

MSI/EXE — replace packages while updating:

```text
Manage Packages page -> delete the package that is no longer required -> add a new package if required
  -> click "Save all" to upload the changes.
```

PWA — make an app unavailable to new customers:

```text
App overview page -> Store presence card -> toggle button -> confirm.
To offer it again: "Make product available" banner on the App overview page, or the same toggle.
```

## Options / Props

| Topic | MSIX | MSI/EXE | PWA |
|---|---|---|---|
| OS versions and package distribution | Store provides the best available match among runnable packages | n/a | Same as MSIX |
| Package granularity | Per device family | One package per architecture + language combination (e.g. only one for x64 + English) | Per device family |
| Remove all packages of a device family | Confirmation prompt on Packages page; new customers can't acquire on that family | n/a | Same as MSIX |
| Unpublish via Store presence toggle | Not described | Not described | Described |

## Notes

- Later OS versions can generally run packages targeting previous OS versions for the same device family; Windows 11 devices can run all previous supported OS versions (per device family).
- Removing all packages for a device family: existing customers on that device type can still use the app and get later updates; you can publish another update to restore the family.
- PWA unpublish: within a few hours the app is no longer visible and new customers can't get it (except with a promotional code on Windows 10/11). This overrides submission visibility settings and equals "Make this product available but not discoverable in the Store" with **Stop acquisition**, without creating a submission. Existing customers can still use and re-download it.
- To stop offering on one OS version only, create a new submission and remove all packages for that OS version.
- Sources: https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/app-package-management, last updated 2022-10-30 (ms.date); https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msi/app-package-management, last updated 2022-10-30 (ms.date); https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/pwa/app-package-management, last updated 2022-10-30 (ms.date).

## Related

- [Upload App Packages](./upload-app-packages.md)
- [Remove App and Add-on](./remove-app-and-addon.md)
- [Visibility Options](./visibility-options.md)
- [Publish an App Update](./publish-app-update.md)
