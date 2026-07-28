# Windows App Certification Kit (WACK)

The Windows App Certification Kit validates that a Windows app is ready for [Windows Certification](https://learn.microsoft.com/en-us/windows/win32/win_cert/windows-certification-portal) or Microsoft Store publication. It is included in the Windows SDK and is run via the `appcert.exe` command-line tool or its interactive UI.

## Signature / Usage

```bat
:: Run from an elevated command prompt, in the kit's install directory
:: default: C:\Program Files (x86)\Windows Kits\10\App Certification Kit\

appcert.exe reset
appcert.exe test -packagefullname [package full name] -reportoutputpath [report file name]

:: or, for an app that is not yet installed (the kit opens the package itself)
appcert.exe reset
appcert.exe test -appxpackagepath [package path] -reportoutputpath [report file name]

:: command-line help
appcert.exe /?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `reset` | command | Resets kit state before a new test run |
| `test -packagefullname <name>` | command | Tests an app package already installed on the test computer |
| `test -appxpackagepath <path>` | command | Tests an app package not yet installed; the kit opens it directly |
| `-reportoutputpath <file>` | option | Path for the generated HTML/XML report |

## Notes

- Must be run within the context of an **active user session**; it can be launched from a service but cannot run in Session0.
- Prerequisites: Windows 10 (or later), the Windows App Certification Kit installed (Windows SDK), the device enabled for development, and the target app already deployed to the test computer.
- The interactive UI (Start menu > **Windows App Cert Kit**) lets you pick the app, select applicable tests (irrelevant tests for the current environment are grayed out), and saves an HTML + XML report to the folder you specify.
- From Visual Studio, WACK can be run automatically as part of creating an app package (see **Packaging UWP apps**).
- Performance test thresholds are calibrated against a low-power reference computer (e.g. Intel Atom, 1366x768, rotational HDD) — test on comparable hardware to match Microsoft Store certification results.
- Tests for **Desktop Bridge apps** are included in the kit; the App Prelaunch Validation test is no longer supported.
- Known issue: if an installer leaves processes/windows running after it exits, the kit can appear stuck on "Process Install Trace Files" — manually close any leftover installer processes/windows to unblock it.

## Related

- [WACK Test Categories](./wack-test-categories.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
