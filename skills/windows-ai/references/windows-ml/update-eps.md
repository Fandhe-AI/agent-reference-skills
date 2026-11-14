# Update execution providers in Windows ML

After an execution provider (EP) is installed, Windows ML automatically updates it; compatible updates reach your app without any app-side action.

## Signature / Usage

Adapted (not in the official docs): the page contains no code; the following shows how to check the installed EP version after an automatic update.

```powershell
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

## Notes

- Compatible updates are made available to your app automatically, so apps benefit from performance improvements and support for new operators without requiring changes to your app.
- There is currently no way for your app to programmatically install an updated EP. The updated EP is installed automatically by Windows ML.
- The release history of EPs is on the [Windows ML Execution Provider Releases](https://github.com/microsoft/WindowsML/wiki/Windows-ML-Execution-Provider-Releases) wiki page.
- To check what version of an EP a device has, see [Check EP versions](./check-ep-versions.md).
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/update-execution-providers (retrieved 2026-11-14)

## Related

- [Check EP versions](./check-ep-versions.md)
- [Install execution providers](./install-execution-providers.md)
- [Windows ML execution providers](./supported-execution-providers.md)
