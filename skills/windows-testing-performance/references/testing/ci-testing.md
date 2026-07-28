# Running Windows App Tests in CI

Windows app builds, static analysis, and MSIX packaging/signing can run in GitHub Actions (using a `windows-latest` runner) or Azure Pipelines.

## Signature / Usage

```yaml
# GitHub Actions — build with .NET analyzers enabled, runs on a Windows runner
runs-on: windows-latest
steps:
  - name: Build with analysis
    run: dotnet build --configuration Release /p:AnalysisLevel=latest-recommended /p:TreatWarningsAsErrors=true

  # C++ / MSBuild projects
  - name: Build with /analyze
    run: msbuild MySolution.sln /p:Configuration=Release /p:EnableMicrosoftCodeAnalysis=true /p:RunCodeAnalysis=true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `windows-latest` | GitHub Actions runner label | Windows runner required to build/test Windows App SDK, WinUI 3, and MSIX projects |
| Azure Pipelines + **MSIX Packaging Extension** | Azure DevOps extension | Guided build/package/sign workflow for MSIX projects |
| Azure Pipelines + custom YAML | pipeline config | Full control over build/package/sign steps for any build system |
| **Secure files** (Azure Pipelines Library) | pipeline feature | Stores the signing certificate outside the repo; authorize it for use in the pipeline |

## Notes

- For MSIX signing certificates, avoid committing them to the repo; Azure Pipelines' **Secure files** library (Pipelines > Library > Secure files) is the recommended storage, with the private key password kept in Azure Key Vault and referenced via a variable group.
- Two ways to configure MSIX builds in Azure Pipelines: the **MSIX Packaging Extension** (guided) or a hand-written YAML pipeline (full control) — both ultimately call the same command-line packaging/signing tools, so either can be wrapped for other build systems too.
- `AnalysisLevel=latest-recommended` and `EnableMicrosoftCodeAnalysis`/`RunCodeAnalysis` are the CI equivalents of enabling Roslyn analyzers / C++ `/analyze` locally — run them on every pull request to catch regressions before merge.
- UI automation (WinAppDriver/Appium) and WACK runs generally require an interactive user session; running them unattended on a CI runner needs the runner configured for an active session (WACK explicitly cannot run in Session0).

## Related

- [Windows App Certification Kit (WACK)](./wack-certification.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
