# Testing and Debugging Process Lifecycle Management (PLM)

UWP apps run in an app container subject to Process Lifecycle Management (PLM): the Runtime Broker service can suspend, resume, or terminate them at any time. Dedicated tools let you force these transitions on demand to test and debug the code that handles them, rather than waiting for the OS to trigger them naturally.

## Signature / Usage

```cmd
:: Disable PLM for a package so the debugger has time to attach before Runtime Broker
:: terminates the app (requires the FULL package name, not the short/family name/AUMID)
plmdebug /enableDebug <PackageFullName>

:: ...later, always pair with:
plmdebug /disableDebug <PackageFullName>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| **Lifecycle Events** toolbar | Visual Studio debugger | Appears while running/debugging a UWP project; forces the app into suspend/resume/terminate states interactively |
| `plmdebug /enableDebug <PackageFullName>` | CLI (`PLMDebug.exe`, ships with Windows SDK, in `Debuggers\x64`) | Disables PLM for the package so Runtime Broker won't terminate it before a debugger attaches; optionally takes an absolute path to a debugger to auto-launch on activation |
| `plmdebug /disableDebug <PackageFullName>` | CLI | Re-enables PLM; every `/enableDebug` call must be paired with a matching `/disableDebug` |
| `Get-AppxPackage` | PowerShell | Retrieves the full package name (`PackageFullName`) required by `plmdebug`, if not already shown in the Visual Studio deployment output |

## Notes

- `plmdebug`'s debugger-launch argument only accepts an absolute path, and tools like `VSJITDebugger.exe` need the target PID up front — since the PID isn't known before activation, a small wrapper (find the process by name, then launch `vsjitdebugger.exe -p <pid>`) is the common workaround for auto-attaching at startup.
- This is distinct from ordinary unit/UI testing coverage elsewhere in this category — it specifically targets suspend/resume/terminate transitions, not functional correctness.

## Related

- [Unit Testing WinUI 3 Apps](./unit-testing-winui3.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
