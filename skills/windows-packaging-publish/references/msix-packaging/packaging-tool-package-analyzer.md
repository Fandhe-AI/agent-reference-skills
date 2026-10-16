# Analyze and Resolve Runtime Issues (Package Analyzer)

Package Analyzer in the MSIX Packaging Tool analyzes runtime trace logs of an MSIX package and suggests remediations for post-conversion issues. Selected fixes are applied when the package is saved.

## Signature / Usage

Workflow (UI steps from the page):

```text
1. Package Editor > browse to the MSIX package
2. Sign the package with a certificate, then open the "Package Analyzer" tab
3. Click "Analyze Package"; exercise the application's features
4. Click "Stop Analysis"; review suggested remediations (uncheck any not needed)
5. Click "Save" -> a new package with the selected fixes is created
```

## Options / Props

Supported fixes (Preview):

| Fix |
|-----|
| RegLegacyFixups (PSF) |
| Installed location Virtualization |
| SearchPathOverride |

## Notes

- The page states these fixes are supported in Preview and are being extended.
- The package must be signed with a certificate before the Package Analyzer tab can be used.
- Source: https://learn.microsoft.com/en-us/windows/msix/packaging-tool/package-analyzer, last updated 10/06/2023 (ms.date).

## Related

- [MSIX Packaging Tool Package Editor](./packaging-tool-package-editor.md)
- [Automated PSF Config Generation](./psf-mpt-integration.md)
- [Package Support Framework](./package-support-framework.md)
