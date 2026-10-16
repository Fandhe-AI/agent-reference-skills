# MSIX and CI/CD Pipelines (Azure DevOps MSIX Packaging Extension, YAML)

Build, sign, and distribute MSIX in Azure Pipelines, either with the MSIX Packaging Azure DevOps extension or a hand-written YAML pipeline using MSBuild and SignTool. Includes `.appinstaller` handling and current distribution-feature status.

## Signature / Usage

Extension tasks in YAML (agent must be Windows):

```yaml
steps:
- task: MSIX.msix-ci-automation-task-dev.msix-packaging.MsixPackaging@1
  displayName: 'MSIX build and package'
  inputs:
    outputPath: '$(Build.ArtifactStagingDirectory)\MyApp.msix'
    solution: MyUWPApp.sln
    buildPlatform: x64
    updateAppVersion: true
    manifestFile: MyUWPApp/Package.appxmanifest
    appVersion: 2.0.0.0
    appPackageDistributionMode: SideloadOnly
    msbuildArchitecture: x64

- task: MSIX.msix-ci-automation-task-dev.msix-signing.MsixSigning@1
  displayName: 'Sign MSIX package'
  inputs:
    certificateType: base64
    encodedCertificate: '$(kvtestcert)'

- task: MSIX.msix-ci-automation-task-dev.app-installer-file.AppInstallerFile@1
  displayName: 'Create App Installer file'
  inputs:
    package: '$(Build.ArtifactStagingDirectory)\MyApp.msix'
    outputPath: '$(Build.ArtifactStagingDirectory)\MyApp.appinstaller'
    uri: 'https://myuwpapp-demo.azurewebsites.net/MyApp.appinstaller'
    mainItemUri: 'https://myuwpapp-demo.azurewebsites.net/MyApp.msix'
    showPromptWhenUpdating: true
    updateBlocksActivation: true

- task: MSIX.msix-ci-automation-task-dev.msix-app-attach.MsixAppAttach@1
  displayName: 'Create package for MSIX app attach'
  inputs:
    package: '$(Build.ArtifactStagingDirectory)\MyApp.msix'
    vhdxOutputPath: '$(Build.ArtifactStagingDirectory)\MyApp.vhdx'

- task: MSIX.msix-ci-automation-task-dev.avd-app-attach-publish.AVDAppAttachPublish@0
  displayName: 'Publish MSIX app attach package to AVD'
  inputs:
    vhdxPath: '$(Build.ArtifactStagingDirectory)/App.vhdx'
    connectedServiceNameARM: '<service-connection-id>'
    resourceGroupName: 'appattach-test-rg'
    storageAccount: 'appattachteststorage'
    fileShare: 'appattach-test-fs'
    hostPool: 'appattach-hostpool'
    workSpace: 'appattach-test-ws'
    applicationGroup: 'appattach-test-ag-rail'
```

Hand-written YAML pipeline (MSBuild + SignTool):

```yml
pool:
  vmImage: windows-2019

variables:
  buildPlatform: 'x86'
  buildConfiguration: 'release'
  major: 1
  minor: 0
  build: 0
  revision: $[counter('rev', 0)]

steps:
- powershell: |
     [xml]$manifest= get-content ".\Msix\Package.appxmanifest"
     $manifest.Package.Identity.Version = "$(major).$(minor).$(build).$(revision)"
     $manifest.save("Msix/Package.appxmanifest")
  displayName: 'Version Package Manifest'

- task: MSBuild@1
  inputs:
    solution: Msix/Msix.wapproj
    platform: $(buildPlatform)
    configuration: $(buildConfiguration)
    msbuildArguments: '/p:OutputPath=NonPackagedApp
     /p:UapAppxPackageBuildMode=SideLoadOnly  /p:AppxBundle=Never /p:AppxPackageOutput=$(Build.ArtifactStagingDirectory)\MsixDesktopApp.msix /p:AppxPackageSigningEnabled=false'
  displayName: 'Package the App'

- task: DownloadSecureFile@1
  inputs:
    secureFile: 'certificate.pfx'
  displayName: 'Download Secure PFX File'

- script: '"C:\Program Files (x86)\Windows Kits\10\bin\10.0.17763.0\x86\signtool" sign /fd SHA256 /f "$(Agent.TempDirectory)/certificate.pfx" /p <password> "$(Build.ArtifactStagingDirectory)/MsixDesktopApp.msix"'
  displayName: 'Sign MSIX Package'

- task: PublishBuildArtifacts@1
  displayName: 'Publish Artifact: drop'
```

## Options / Props

MSBuild arguments:

| Argument | Value | Description |
|----------|-------|-------------|
| `AppxPackageDir` | `$(Build.ArtifactStagingDirectory)\AppxPackages` | Folder for generated artifacts |
| `AppxBundlePlatforms` | `$(Build.BuildPlatform)` | Platforms to include in the bundle |
| `AppxBundle` | `Always` | Creates an `.msixbundle` / `.appxbundle` |
| `UapAppxPackageBuildMode` | `StoreUpload` | `.msixupload` / `.appxupload` plus the `_Test` folder for sideloading |
| `UapAppxPackageBuildMode` | `CI` | `.msixupload` / `.appxupload` only |
| `UapAppxPackageBuildMode` | `SideloadOnly` | `_Test` folder for sideloading only |
| `AppxPackageSigningEnabled` | `true` | Enable package signing |
| `PackageCertificateThumbprint` | thumbprint | Must match the signing certificate or be an empty string |
| `PackageCertificateKeyFile` | path | Certificate path (from secure file metadata) |
| `PackageCertificatePassword` | password | Private-key password; store in Azure Key Vault linked to a variable group |

Extension tasks:

| Task | Purpose |
|------|---------|
| MSIX build and package | Build and package with MSBuild or package existing binaries; optional bundle (`.msixbundle` output name), version override in the output only, distribution mode (Store / non-Store). Requires a Windows Application Packaging Project (needs `Package.appxmanifest`) |
| MSIX package signing | Signs all files matching the path with SignTool; certificate from the Secure Files library or base64 string (e.g. Azure Key Vault); optional timestamp server |
| App installer file for MSIX | Create or update a `.appinstaller` (version `major.minor.build.revision`, URI, main package URI, update-on-launch settings) |
| Create package for MSIX app attach | Produces a VHDX (`vhdxOutputPath`, size in MB) |
| Publish MSIX app attach package to AVD | Uploads the VHDX to a storage account / file share and attaches to host pool, workspace, application group |

## Notes

- The source page breaks the signtool `script:` line right after `$(` in `$(Build.ArtifactStagingDirectory)`; a folded multi-line scalar would turn that into `$( Build...`, so the macro is kept on one line here.

- Do not commit certificates; use Azure DevOps Secure files (enable "Authorize for use in all pipelines"). A password is supported only for the private key, not for a password-protected certificate file. Visual Studio 2019+ no longer generates a temporary certificate in MSIX projects.
- Set `PackageCertificateThumbprint` to an empty string when signing from a file; a mismatched thumbprint fails with `Certificate does not match supplied signing thumbprint`.
- The extension runs only on Windows agents (source UI steps use `windows-2019`). Its source is part of the MSIX SDK open source project.
- `.appinstaller` for non-Store distribution: add it to the packaging project (Package Action `Content`, Copy to Output Directory `Copy if newer`) and update the root and `MainPackage` `Version` with a PowerShell step; during release rewrite both `Uri` attributes. To generate a versioned `.appinstaller` and HTML page, pass `/p:GenerateAppInstallerFile=True /p:AppInstallerUri=... /p:AppInstallerCheckForUpdateFrequency=OnApplicationRun /p:AppInstallerUpdateFrequency=1`.
- Current status (page "Last reviewed: August 2026"): the `ms-appinstaller:?source=` protocol has been disabled by default since App Installer 1.21.3421.0 (December 12, 2023); enterprises can re-enable it with Group Policy `EnableMSAppInstallerProtocol` set to Enabled (DesktopAppInstaller CSP); link directly to the `.appinstaller` file or publish to the Store instead.
- Current status: Visual Studio generates `.appinstaller` with the 2017/2 schema, which silently ignores `ShowPrompt`, `UpdateBlocksActivation`, and `HoursBetweenUpdateChecks`; change `xmlns` to `http://schemas.microsoft.com/appx/appinstaller/2021` to use them.
- Current status: the `MsixPackaging@1` task uses MSBuild 4.8.4161.0 (not 16+) and was built against Node 16 (end-of-life September 2023), which can break modern pipelines; use MSBuild directly or GitHub Actions with `microsoft/setup-msbuild`.
- Current status: since 2024 EV code-signing certificates no longer grant instant SmartScreen reputation; reputation accumulates from file hash and publisher certificate.
- The page's file-share publishing example embeds a storage account key in a `net use` command; do not copy secrets into pipeline files, use secret variables.
- Sources: https://learn.microsoft.com/en-us/windows/msix/desktop/msix-packaging-extension, last updated 11/5/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/desktop/azure-dev-ops, last updated 07/02/2026 (ms.date); https://learn.microsoft.com/en-us/windows/msix/desktop/cicd-overview, last updated 01/11/2021 (ms.date); https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status, last updated 2026-08-24 (ms.date; reviewed August 2026).

## Related

- [MSIX Packaging Tool Command-Line Conversion and Conversion Templates](./packaging-tool-command-line.md)
- [Set up CI for WinUI with GitHub Actions](./github-actions-winui-ci.md)
- [MSIX App Attach](./msix-app-attach.md)
- [Unsigned Package](./unsigned-package.md)
