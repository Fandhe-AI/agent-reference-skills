# Run Scripts with the Package Support Framework

Use the Package Support Framework (PSF) to run one PowerShell script before and one after a packaged application executable, for example to configure a database, set up a VPN, mount a drive, run a license check, or create a shortcut.

## Signature / Usage

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

```json
{
  "applications": [
    {
      "id": "Sample",
      "executable": "Sample.exe",
      "workingDirectory": "",
      "stopOnScriptError": false,
      "startScript":
      {
        "scriptPath": "RunMePlease.ps1",
        "scriptArguments": "\\\"First argument\\\" secondArgument",
        "runInVirtualEnvironment": true,
        "showWindow": true,
        "waitForScriptToFinish": false
      },
      "endScript":
      {
        "scriptPath": "RunMeAfter.ps1",
        "scriptArguments": "ThisIsMe.txt"
      }
    }
  ]
}
```

## Options / Props

| Key name | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `scriptPath` | string | Yes | N/A | Path with name and extension; relative to the working directory if specified, otherwise the package root |
| `scriptArguments` | string | No | empty | Space-delimited arguments, same format as a PowerShell script call |
| `runInVirtualEnvironment` | boolean | No | true | Run in the same virtual environment as the packaged app |
| `runOnce` | boolean | No | true | Run once per user, per version |
| `showWindow` | boolean | No | false | Show the PowerShell window |
| `stopOnScriptError` | boolean | No | false | Exit the app if the starting script fails |
| `waitForScriptToFinish` | boolean | No | true | App waits for the starting script before starting |
| `timeout` | DWORD | No | INFINITE | Maximum run time; the script is stopped when it elapses |

## Notes

- `startScript` runs before the executable; `endScript` runs after. The ending script ignores `waitForScriptToFinish` and `stopOnScriptError`. Each application executable can have its own scripts.
- Setting `stopOnScriptError: true` together with `waitForScriptToFinish: false` is not supported; PSF returns `ERROR_BAD_CONFIGURATION`.
- The execution policy must be set for both the 64-bit (`%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe`) and 32-bit (`%SystemRoot%\SysWOW64\WindowsPowerShell\v1.0\powershell.exe`) PowerShell on a 64-bit machine.
- Include `StartingScriptWrapper.ps1` (from the PSF NuGet package or GitHub releases) in the same folder as the executable.
- Shortcut-creation walkthrough (Contoso Expenses, MSIX Packaging Tool): define an `AppExecutionAlias` (`uap3:Extension Category="windows.appExecutionAlias"` with `desktop:ExecutionAlias Alias="contosoexpenses.exe"`) so the shortcut does not depend on the versioned install path; shortcut Target/Start in point to `%localappdata%\Microsoft\WindowsApps`; copy PSF launcher/runtime files (`PSFLauncher32.exe` / `PSFRuntime32.dll` or 64-bit) to the package root, set the manifest `Executable` to `PSFLauncher32.exe`, and add this `config.json` with a `createshortcut.ps1` start script:

```json
{
  "applications": [
    {
      "id": "App",
      "executable": "ContosoExpenses\\ContosoExpenses.exe",
      "workingDirectory": "ContosoExpenses\\",
      "startScript":
      {
        "scriptPath": "createshortcut.ps1",
        "runInVirtualEnvironment": false,
        "waitForScriptToFinish": true,
        "showWindow": false,
        "runOnce": true
      }
    }
  ]
}
```

```powershell
Copy-Item "Contoso Expenses.lnk" "$env:USERPROFILE\desktop\Contoso Expenses.lnk"
Copy-Item "contoso.ico" $env:APPDATA\contoso.ico
```

- Only create desktop shortcuts when absolutely necessary. Place the `.lnk`, icon, `StartingScriptWrapper.ps1`, and `createshortcut.ps1` in the working-directory folder.
- Sources: https://learn.microsoft.com/en-us/windows/msix/psf/run-scripts-with-package-support-framework, last updated 05/25/2021 (ms.date); https://learn.microsoft.com/en-us/windows/msix/psf/create-shortcut-with-script-package-support-framework, last updated 04/14/2021 (ms.date).

## Related

- [Package Support Framework](./package-support-framework.md)
- [PSF Fixes: Working Directory, Write Permission, Launch Parameters](./psf-common-fixes.md)
- [Apply Package Support Framework in Visual Studio](./psf-visual-studio.md)
- [Create a PSF Fixup](./create-psf-fixup.md)
