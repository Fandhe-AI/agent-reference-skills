---
source: https://www.electronjs.org/docs/latest/tutorial/distribution-overview
---

# Distribution Overview

Once your app is ready for production, there are a couple steps you need to take before you can deliver it to your users: packaging, code signing, publishing, and updating.

## Signature / Usage

```text
Packaging     -> package all resources and assets into an executable and rebrand it (Electron Forge or manual)
Code signing  -> certify the app was created by you; avoids OS security checks
Publishing    -> upload installers online, or upload to an OS app store (separate build step)
Updating      -> autoUpdater delivers updates without manual downloads
```

## Packaging

To distribute your app with Electron, you need to package all your resources and assets into an executable and rebrand it. You can use specialized tooling like Electron Forge or do it manually. See [application-distribution.md](./application-distribution.md).

## Code signing

Code signing is a security technology that you use to certify that an app was created by you. You should sign your application so it does not trigger the security checks of your user's operating system. See [code-signing.md](./code-signing.md).

## Publishing

Once your app is packaged and signed, you can freely distribute your app directly to users by uploading your installers online.

To reach more users, you can also upload your app to each operating system's digital distribution platform (i.e. app store). These require another build step aside from your direct download app:

- [Mac App Store](./mac-app-store-submission-guide.md)
- [Windows Store](./windows-store-guide.md)
- [Snapcraft (Linux)](./snapcraft.md)

## Updating

Electron's auto-updater allows you to deliver application updates to users without forcing them to manually download new versions of your application. See [updates.md](./updates.md).

## Related

- [Application Packaging](./application-distribution.md)
- [Code Signing](./code-signing.md)
- [Updating Applications](./updates.md)
- [autoUpdater](./auto-updater.md)
