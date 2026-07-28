# AppContainer and packaged-app security boundaries

AppContainer is the process-isolation sandbox that packaged Windows apps run in: the app's process and its child processes can access only the resources explicitly granted to them (via declared capabilities), with file system and registry access virtualized per app.

## Signature / Usage

```xml
<!-- App package manifest: uap10:RuntimeBehavior controls the process model -->
<Application uap10:RuntimeBehavior="windowsApp" ... />        <!-- UWP app: always AppContainer -->
<Application uap10:RuntimeBehavior="packagedClassicApp" ... /> <!-- WinUI/Desktop Bridge, packaged -->
<Application uap10:RuntimeBehavior="win32App" ... />            <!-- packaged, Medium IL -->
```

## Options / Props

| Concept | Description |
|---------|-------------|
| AppContainer | Lightweight sandbox; app process + child processes are isolated via file system/registry virtualization and can access only explicitly granted resources. Compromise of the app cannot escalate outside its assigned resources. |
| Medium IL | Non-AppContainer process integrity level; a packaged or unpackaged app that does *not* run sandboxed. |
| Package identity | Runtime identity (`[User SID] + [App PFN]`) required for extensibility features (background tasks, notifications, share targets) and for Credential Locker / key-credential scoping. Only packaged apps have package identity. |
| Win32 app isolation | Windows 11 24H2+ feature that extends AppContainer-style sandboxing and brokered access to unpackaged Win32 apps. |

## Notes

- UWP apps are always packaged and always run in an AppContainer; this configuration cannot be changed. Desktop apps (WPF, WinForms, WinUI 3, Win32) can independently choose packaged-vs-unpackaged and AppContainer-vs-Medium-IL.
- Credential storage APIs are scoped by this boundary: `PasswordVault` limits AppContainer apps to their own locker, while non-AppContainer (Medium IL) desktop apps can see all users' lockers on the device, including those written by AppContainer apps.
- App capabilities (see `app-capabilities`) are the mechanism by which an AppContainer app is granted access beyond its default sandboxed resource set.

## Related

- [app-capabilities](./app-capabilities.md)
- [PasswordVault](./password-vault.md)
