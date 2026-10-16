# Set up CI for WinUI with GitHub Actions (single-project MSIX, Store bundle)

Build, sign, and package a single-project MSIX WinUI app with GitHub Actions, produce a Microsoft Store upload bundle, or build unpackaged. Also shows the equivalent Azure Pipelines YAML and plain MSBuild arguments.

## Signature / Usage

Encode the signing certificate and store it as the `BASE64_ENCODED_PFX` repository secret:

```powershell
$pfx_cert = Get-Content 'App1_TemporaryKey.pfx' -AsByteStream
[System.Convert]::ToBase64String($pfx_cert) | Out-File 'App1_TemporaryKey_Base64.txt'
```

Workflow core steps (the source page shows the full workflow with `strategy.matrix` of `Release` and `x64`/`x86`, `runs-on: windows-latest`, `actions/checkout@v4`, `actions/setup-dotnet@v4` with `8.0.x`, `microsoft/setup-msbuild@v2`):

```yaml
- name: Restore the application
  run: msbuild $env:Solution_Name /t:Restore /p:Configuration=$env:Configuration
  env:
    Configuration: ${{ matrix.configuration }}

- name: Decode the pfx
  run: |
    $pfx_cert_byte = [System.Convert]::FromBase64String("${{ secrets.BASE64_ENCODED_PFX }}")
    $certificatePath = "GitHubActionsWorkflow.pfx"
    [IO.File]::WriteAllBytes("$certificatePath", $pfx_cert_byte)

- name: Create the app package
  run: msbuild $env:Solution_Name /p:Configuration=$env:Configuration /p:Platform=$env:Platform /p:UapAppxPackageBuildMode=$env:Appx_Package_Build_Mode /p:AppxBundle=$env:Appx_Bundle /p:PackageCertificateKeyFile=GitHubActionsWorkflow.pfx /p:AppxPackageDir="$env:Appx_Package_Dir" /p:GenerateAppxPackageOnBuild=true
  env:
    Appx_Bundle: Never
    Appx_Package_Build_Mode: SideloadOnly
    Appx_Package_Dir: Packages\
    Configuration: ${{ matrix.configuration }}
    Platform: ${{ matrix.platform }}

- name: Remove the pfx
  run: Remove-Item -path GitHubActionsWorkflow.pfx
```

Microsoft Store x86 + x64 bundle from the command line:

```powershell
msbuild YourSolution.sln `
/p:Configuration=Release `
/p:Platform=x86 `
/p:AppxBundlePlatforms="x86|x64" `
/p:AppxBundle=Always `
/p:UapAppxPackageBuildMode=StoreUpload `
/p:AppxPackageDir="Packages\" `
/p:AppxPackageSigningEnabled=false `
/p:GenerateAppxPackageOnBuild=true
```

## Options / Props

| MSBuild property | Purpose |
|------------------|---------|
| `AppxPackageDir` | Output folder for packages |
| `UapAppxPackageBuildMode=SideloadOnly` | Sideloading packages |
| `UapAppxPackageBuildMode=StoreUpload` | Creates the `.msixupload` file |
| `AppxBundle=Never` / `Always` | Separate packages (matrix per platform) / bundle |
| `AppxBundlePlatforms` | Architectures in the bundle, e.g. `x86|x64` |
| `Platform=x86` | Selects the solution configuration that invokes the packaging target |
| `AppxPackageSigningEnabled=false` | Store signs the package after submission, so signing is disabled |
| `PackageCertificateKeyFile` | Path to the decoded `.pfx` |
| `GenerateAppxPackageOnBuild=true` | Generates the MSIX package on build |

## Notes

- Prerequisite: a single-project MSIX WinUI app (or migrate to it) and a GitHub repository.
- MSIX apps must be signed to install. A test certificate can be created in Visual Studio (Package and Publish > Create App Packages > Create...; leave password blank), producing a `.pfx` in the project. Do not commit certificates; use GitHub secrets.
- If the build output does not land in a folder containing the solution, replace `env.Solution_Name` with `github.workspace` in the artifact upload path.
- Before uploading a `.msixupload`, ensure the manifest package identity matches the identity Partner Center assigns.
- Unpackaged builds: use `msbuild $env:Solution_Name /t:Publish` (workflow "WinUI unpackaged app") or `dotnet publish` instead of the `/p:Appx*` arguments.
- Azure Pipelines equivalent: `UseDotNet@2`, `NuGetToolInstaller@1`, `NuGetCommand@2` restore, `VSBuild@1` with `/p:AppxBundlePlatforms="$(buildPlatform)" /p:AppxPackageDir="$(Build.ArtifactStagingDirectory)\AppxPackages\\" /p:AppxBundle=Never /p:UapAppxPackageBuildMode=SideloadOnly /p:GenerateAppInstallerFile=false`, then `PublishBuildArtifacts@1`. Sign using Azure Pipelines Secure Files with `DownloadSecureFile`; never store certificates or passwords in source control.
- The page's workflow YAML indentation is flattened in the source text; reconstruct nesting when copying.

## Related

- [MSIX and CI/CD Pipelines](./msix-packaging-extension.md)
- [Single-Project MSIX](./single-project-msix.md)
- [Unsigned Package](./unsigned-package.md)
