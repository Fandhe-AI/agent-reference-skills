# MSIX Packaging Tool Command-Line Conversion and Conversion Templates

The MSIX Packaging Tool has a command-line interface for automating installer-to-MSIX conversion and bulk conversions. It is driven by a conversion template XML file.

## Signature / Usage

Run in an administrator Command Prompt (`MsixPackagingTool.exe` is an app execution alias):

```console
MsixPackagingTool.exe create-package --template c:\users\documents\ConversionTemplate.xml -v

MSIXPackagingTool.exe create-package --template c:\users\documents\ConversionTemplate.xml --virtualMachinePassword pswd112893
```

Minimal conversion template (sample from the page; `xmlns:V2`-`V5` are needed only when using features from those schemas):

```xml
<MsixPackagingToolTemplate
    xmlns="http://schemas.microsoft.com/appx/msixpackagingtool/template/2018"
    xmlns:V2="http://schemas.microsoft.com/msix/msixpackagingtool/template/1904"
    xmlns:V3="http://schemas.microsoft.com/msix/msixpackagingtool/template/1907"
    xmlns:V4="http://schemas.microsoft.com/msix/msixpackagingtool/template/1910"
    xmlns:V5="http://schemas.microsoft.com/msix/msixpackagingtool/template/2001">
    <Settings
        AllowTelemetry="true"
        ApplyAllPrepareComputerFixes="true"
        GenerateCommandLineFile="true"
        AllowPromptForPassword="false"
        EnforceMicrosoftStoreVersioningRequirements="false"
        v2:ServerPortNumber="1599"
        v5:AddPackageIntegrity="true">
    </Settings>
    <SaveLocation
        PackagePath="C:\users\user\Desktop\MyPackage.msix"
        TemplatePath="C:\users\user\Desktop\MyTemplate.xml" />
    <Installer
        Path="C:\MyAppInstaller.msi"
        InstallLocation="C:\Program Files\MyAppInstallLocation" />
    <PackageInformation
        PackageName="MyAppPackageName"
        PackageDisplayName="MyApp Display Name"
        PublisherName="CN=MyPublisher"
        PublisherDisplayName="MyPublisher Display Name"
        Version="1.1.0.0">
    </PackageInformation>
</MsixPackagingToolTemplate>
```

## Options / Props

Command-line parameters (case sensitive):

| Parameter | Description |
|-----------|-------------|
| `-? --help` | Show help information |
| `--template` | Required. Path to the conversion template XML |
| `--virtualMachinePassword` | Optional. VM password; template must contain a `VirtualMachine` element and `Settings::AllowPromptForPassword` must not be true |
| `--machinePassword` | Optional. Remote machine password; template must contain `RemoteMachine` or `VirtualMachine` and `AllowPromptForPassword` must not be true |
| `--resume` | Optional. Resume conversion after a reboot |
| `-v --verbose` | Optional. Verbose logs to the console |

Template parameters:

| Element / attribute | Description |
|---------------------|-------------|
| `Settings::AllowTelemetry` | Enables telemetry logging for this invocation |
| `Settings::ApplyAllPrepareComputerFixes` | Applies all recommended prepare-computer fixes; cannot be set when other attributes are used |
| `Settings::GenerateCommandLineFile` | Copies the template to the SaveLocation directory for reuse |
| `Settings::AllowPromptForPassword` | Prompt for VM / signing certificate passwords if not specified |
| `Settings::EnforceMicrosoftStoreVersioningRequirements` | Enforce the Store / Store for Business versioning scheme |
| `Settings::ServerPortNumber` | Remote machine connection port (template schema v2) |
| `Settings::AddPackageIntegrity` | Adds Package Integrity to every generated MSIX (schema v5) |
| `ValidInstallerExitCodes::ValidInstallerExitCode` (`Reboot`) | Declare unfamiliar exit codes; `Reboot` triggers a reboot during conversion (v2; Reboot is v3) |
| `ExclusionItems::FileExclusion / RegistryExclusion` (`ExcludePath`) | Files / registry keys to exclude; all FileExclusion before any RegistryExclusion |
| `PrepareComputer::DisableDefragService / DisableWindowsSearchService / DisableSmsHostService / DisableWindowsUpdateService` | Disable the service during conversion; `false` overrides `ApplyAllPrepareComputerFixes` |
| `SaveLocation::PackagePath / TemplatePath` | Output paths; package defaults to the Desktop folder |
| `Installer::Path / Arguments / InstallLocation / IsUnattendedInstallWithoutArgument` | Installer path and options. MSI runs silently with `/qn /norestart INSTALLSTARTMENUSHORTCUTS=1 DISABLEADVTSHORTCUTS=1`; `.exe` installers need silent arguments |
| `VirtualMachine::Name / Username` | Run the conversion on a local VM |
| `RemoteMachine::ComputerName / Username / EnableAutoLogon` | Run on a remote machine (v2; `EnableAutoLogon` v3) |
| `PackageInformation::PackageName / PackageDisplayName / PublisherName / PublisherDisplayName / Version` | Package identity values |
| `PackageInformation::PackageDescription` | Optional description (v4) |
| `PackageInformation::MainPackageNameForModificationPackage` | Main package identity name when creating a modification package |
| `SigningInformation::DeviceGuardSigning` (`TokenFile`, `TimestampUrl`) | Device Guard signing (v4); token is an Azure AD access token in JSON |
| `Applications::Application` (`Id`, `DisplayName`, `ExecutableName`, `Description`) | Application entries; matched by `ExecutableName`, ignored if not detected |
| `Capabilities::Capability` (`Name`) | Extra capabilities; `runFullTrust` is added by default |

## Notes

- Generate a template from the tool: in Settings enable "Generate a command line file with each package", then run the Application Package workflow with an installer (an `.exe` needs a silent flag). The template is saved beside the MSIX unless a separate location is set on the Create package page.
- App-V 5.x conversion is supported through the command line, including capabilities.
- `Application::Id` is the package-relative app identifier: alphanumeric fields separated by periods, each starting with an ASCII letter; reserved names such as `CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9` are not allowed as field values.
- Sample PowerShell and Bash scripts for packaging, signing, managing and distributing MSIX are in the `Scripts` folder of the MSIX Toolkit (GitHub).
- Source pages last updated 02/11/2019 and 01/28/2020 (ms.date).

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [MSIX Packaging Tool Conversion Environment](./packaging-tool-environment.md)
- [MSIX Toolkit](./msix-toolkit.md)
- [Modification Packages](./modification-packages.md)
