# Automated PSF Config Generation (MSIX Packaging Tool)

The MSIX Packaging Tool can apply Package Support Framework (PSF) fixups and generate the PSF `config.json` automatically, avoiding manual configuration errors.

## Signature / Usage

```text
1. Launch the MSIX Packaging Tool > Package Editor > "PSF Fixups" tab
2. Select the Application ID from the manifest (executable path is filled in automatically)
3. Select the Fixup and fill in the mandatory parameters in the right pane
4. "Preview config.json" to review, then "Save" to apply the fixups
```

## Options / Props

Supported PSF features in the tool:

| Category | Options |
|----------|---------|
| Application fixups | Working Directory, Command Line Arguments |
| PowerShell Start/End Script | Run a script at app start/end |
| File Redirection Fixup | Package Relative, Package Drive Relative, Known Folder |
| Reg Legacy Fixup | ModifyKeyAccess, FakeDelete, DeletionMarker, Redirect |
| Environment Variable Fixup | Environment variable settings |
| Dynamic Library Fixup | DLL loading settings |

## Notes

- Requires the MSIX Packaging Tool from the Microsoft Store.
- Source: https://learn.microsoft.com/en-us/windows/msix/psf/psf-integration-with-mpt, last updated 10/06/2023 (ms.date).

## Related

- [Package Support Framework](./package-support-framework.md)
- [Create a PSF Fixup](./create-psf-fixup.md)
- [MSIX Packaging Tool Package Analyzer](./packaging-tool-package-analyzer.md)
- [PSF Fixes: Working Directory, Write Permission, Launch Parameters](./psf-common-fixes.md)
