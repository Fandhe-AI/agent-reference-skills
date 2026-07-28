# Rich activation (ActivationRegistrationManager)

Rich activation brings UWP-style activation kinds (file, protocol, startup task) to unpackaged Windows App SDK apps. `ActivationRegistrationManager` provides static methods to register and unregister for these activation kinds at runtime.

## Signature / Usage

```cpp
void RegisterForActivation()
{
    hstring myFileTypes[3] = { L".foo", L".foo2", L".foo3" };
    hstring verbs[2] = { L"view", L"edit" };
    ActivationRegistrationManager::RegisterForFileTypeActivation(
        myFileTypes, szExePathAndIconIndex, L"Contoso File Types", verbs, szExePath);

    ActivationRegistrationManager::RegisterForProtocolActivation(
        L"foo", szExePathAndIconIndex, L"Contoso Foo Protocol", szExePath);

    ActivationRegistrationManager::RegisterForStartupActivation(
        L"ContosoStartupId", szExePath);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RegisterForFileTypeActivation(string[] fileTypes, string logo, string displayName, string[] verbs, string exePath)` | static method | Registers the app to activate when a file of the given extension(s) is opened via `ShellExecute`, `Launcher.LaunchFileAsync`, or the command line. Re-registering the same file type with a different verb set overwrites the previous verbs. |
| `RegisterForProtocolActivation(string scheme, string logo, string displayName, string exePath)` | static method | Registers the app to activate when a URI of the given scheme is executed via `ShellExecute`, `Launcher.LaunchUriAsync`, or the command line. |
| `RegisterForStartupActivation(string taskId, string exePath)` | static method | Registers the app to activate at Windows sign-in, via registry key or a shortcut in a well-known startup folder. Pass an empty `exePath` to default to the current executable. |
| `UnregisterForFileTypeActivation(string[] fileTypes, string exePath)` | static method | Unregisters a previously registered file type association. |
| `UnregisterForProtocolActivation(string scheme, string exePath)` | static method | Unregisters a previously registered protocol scheme. |
| `UnregisterForStartupActivation(string taskId)` | static method | Unregisters a startup activation; must use the same `taskId` used at registration. |

## Notes

- Package: `Microsoft.Windows.AppLifecycle` (Windows App SDK).
- Registrations are per-user; apps installed for multiple users must re-register for each user.
- Unpackaged apps that use this API register dynamically (in addition to, or instead of, writing registry keys directly); packaged apps instead declare activation kinds in their application manifest.
- Unpackaged apps must call `MddBootstrapInitialize` before using any Windows App SDK framework API, including `ActivationRegistrationManager`, and `MddBootstrapShutdown` on exit.
- Once registered, retrieve the resulting rich activation payload via `AppInstance.GetActivatedEventArgs()` and inspect `AppActivationArguments.Kind` / `.Data`.

## Related

- [AppInstance](./app-instance.md)
- [AppActivationArguments and ExtendedActivationKind](./app-activation-arguments.md)
