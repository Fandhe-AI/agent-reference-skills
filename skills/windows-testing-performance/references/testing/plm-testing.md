# Testing and Debugging Process Lifecycle Management (PLM)

UWP apps run in an app container subject to Process Lifecycle Management (PLM): the Runtime Broker service can suspend, resume, or terminate them at any time. Dedicated tools let you force these transitions on demand to test and debug the code that handles them, rather than waiting for the OS to trigger them naturally.

## Signature / Usage

```cmd
:: Disable PLM for a package so the debugger has time to attach before Runtime Broker
:: terminates the app (requires the FULL package name, not the short/family name/AUMID)
plmdebug /enableDebug <PackageFullName>

:: Force the app through PLM state transitions on demand (must be paired with /enableDebug first)
plmdebug /suspend <PackageFullName>
plmdebug /resume <PackageFullName>
plmdebug /terminate <PackageFullName>

:: ...later, always pair /enableDebug with:
plmdebug /disableDebug <PackageFullName>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| **Lifecycle Events** toolbar | Visual Studio debugger | Appears while running/debugging a UWP project; forces the app into suspend/resume/terminate states interactively |
| `plmdebug /enableDebug <Package> [DebuggerCommandLine]` | CLI (`PLMDebug.exe`, ships with Windows SDK, in `Debuggers\x64`) | Increments the debug reference count, exempting the package from PLM policy so Runtime Broker won't terminate it before a debugger attaches; optionally takes an absolute path to a debugger to auto-launch on activation. Must precede any of `/suspend`, `/resume`, or `/terminate` |
| `plmdebug /disableDebug <Package>` | CLI | Decrements the debug reference count; every `/enableDebug` call must be paired with a matching `/disableDebug` |
| `plmdebug /suspend <Package>` | CLI | Suspends the package, invoking the app's suspend handler for debugging |
| `plmdebug /resume <Package>` | CLI | Resumes a suspended package |
| `plmdebug /terminate <Package>` | CLI | Terminates the package |
| `plmdebug /forceterminate <Package>` | CLI | Forces termination of the package |
| `plmdebug /cleanterminate <Package>` | CLI | Suspends and then terminates the package |
| `plmdebug /query [Package]` | CLI | Displays the running state (Terminated/Suspended/Running) for an installed package, or for all installed packages if `Package` is omitted |
| `plmdebug /enumerateBgTasks <Package>` | CLI | Lists the background task IDs registered for the package |
| `plmdebug /activateBgTask "{TaskId}"` | CLI | Activates a background task by its registration GUID (wrapped in braces and quotes); not all background tasks can be activated this way |
| `Get-AppxPackage` | PowerShell | Retrieves the full package name (`PackageFullName`) required by `plmdebug`, if not already shown in the Visual Studio deployment output |

## Notes

- `Package` accepts either the full package name or the process ID of an already-running app.
- Suspend, resume, and terminate operations affect the entire package (all currently running apps in it), not a single process.
- `plmdebug`'s debugger-launch argument only accepts an absolute path, and tools like `VSJITDebugger.exe` need the target PID up front — since the PID isn't known before activation, a small wrapper (find the process by name, then launch `vsjitdebugger.exe -p <pid>`) is the common workaround for auto-attaching at startup.
- This is distinct from ordinary unit/UI testing coverage elsewhere in this category — it specifically targets suspend/resume/terminate transitions, not functional correctness.

## Related

- [Unit Testing WinUI 3 Apps](./unit-testing-winui3.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
