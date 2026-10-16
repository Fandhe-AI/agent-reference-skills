# Diagnostics

Commands to check the state of Windows ML execution providers (EPs).

Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/versioning (retrieved 2026-10-16)

## Check installed EP package versions

```sh
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

Lists the names and versions of the Windows ML EP packages installed on the development machine, using PowerShell. If the QNN EP is installed, a package such as `MicrosoftCorporationII.WinML.Qualcomm.QNN.EP.1.8` is printed.

> **Note**: The command above is a PowerShell cmdlet. Run it in a PowerShell session (it does not work in bash / zsh).
