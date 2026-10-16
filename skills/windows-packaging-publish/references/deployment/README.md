# deployment

| Name | Description | Path |
|------|-------------|------|
| App Installer (the App): Install UI and Updating App Installer | Built-in Windows application for installing MSIX packages | [app-installer-app.md](./app-installer-app.md) |
| Auto-update and Repair Apps (App Installer) | Auto-update and repair settings for developers and IT pros | [app-installer-auto-update-repair.md](./app-installer-auto-update-repair.md) |
| App Installer Authentication Manager | Desktop App Installer on Windows 11 supports OAuth 2.0 authentication | [app-installer-authentication-manager.md](./app-installer-authentication-manager.md) |
| Create Custom App Installer UX | Customize the App Installer install experience for your MSIX app | [app-installer-custom-ux.md](./app-installer-custom-ux.md) |
| Use an Embedded App Installer File to Update Your App | Embed an `.appinstaller` file in the package and point the manifest at it | [app-installer-embedded-file.md](./app-installer-embedded-file.md) |
| App Installer File APIs and Known API Issues | `PackageManager` and `Package` classes in the Windows SDK, with known API issues | [app-installer-file-apis.md](./app-installer-file-apis.md) |
| Create an App Installer File (Visual Studio or Manually) | Create a `.appinstaller` XML file with Visual Studio or manually | [app-installer-file-create.md](./app-installer-file-create.md) |
| App Installer File Overview | The `.appinstaller` XML file that specifies the source of an MSIX app | [app-installer-file-overview.md](./app-installer-file-overview.md) |
| App Installer Security Features | Security features introduced in App Installer build 1.24.1981 | [app-installer-security-features.md](./app-installer-security-features.md) |
| App Installer Troubleshooting | Common causes of App Installer download and install failures | [app-installer-troubleshooting.md](./app-installer-troubleshooting.md) |
| App Installer Update Settings | Configures how and when App Installer checks for and applies updates | [app-installer-update-settings.md](./app-installer-update-settings.md) |
| Choose a Distribution Path | Compares available Windows app distribution paths | [choose-distribution-path.md](./choose-distribution-path.md) |
| Deploy MSIX with Microsoft Configuration Manager | Microsoft Configuration Manager (ConfigMgr) deploys MSIX-packaged apps | [configmgr-deployment.md](./configmgr-deployment.md) |
| Current Status of Windows App Distribution Features | Documents Windows app distribution features that have changed | [distribution-feature-status.md](./distribution-feature-status.md) |
| Install Earlier Versions of an MSIX App Package | An earlier version of an MSIX app package can be installed (downgrade) | [downgrade-msix-app.md](./downgrade-msix-app.md) |
| .NET Deployment Models | .NET publishing modes: framework-dependent vs. self-contained | [dotnet-deployment-models.md](./dotnet-deployment-models.md) |
| Enterprise Deployment with Microsoft Intune | Deploys MSIX-packaged apps to managed Windows devices with Microsoft Intune | [enterprise-deployment-intune.md](./enterprise-deployment-intune.md) |
| Enterprise IT-Admin Deployment Tools | Tools for IT pros to manage MSIX rollout to managed devices outside the Store | [enterprise-deployment-tools.md](./enterprise-deployment-tools.md) |
| Gradual Package Rollout | Rolls out updated packages from a Store submission to a subset of customers | [gradual-package-rollout.md](./gradual-package-rollout.md) |
| MSIX Group Policy Settings | How Group Policy applies to packaged apps and MSIX-converted apps | [group-policy-msix.md](./group-policy-msix.md) |
| Pass Installation Parameters to Your App via App Installer | Query string parameters in the download/install URI are passed to the app | [install-parameters.md](./install-parameters.md) |
| Troubleshoot Runtime Issues in an MSIX Container | Use `Invoke-CommandInDesktopPackage` to run tools inside an MSIX container | [msix-container-runtime-troubleshooting.md](./msix-container-runtime-troubleshooting.md) |
| MSIX Core (Windows 10 1703 and Earlier) | Open source project that brings MSIX installation to Windows 10 1703 and earlier | [msix-core.md](./msix-core.md) |
| Deploy with MSIX Core (Configuration Manager, Troubleshooting) | Install, query, and remove MSIX packages on down-level Windows | [msix-core-deployment.md](./msix-core-deployment.md) |
| MSIX Troubleshooting Guide (Installation, Signing, Deployment Validation) | Common MSIX installation, signing, App Installer delivery, and dependency problems | [msix-troubleshooting-guide.md](./msix-troubleshooting-guide.md) |
| Update Non-Store Published Apps from Your Code | MSIX apps shipped outside the Store can check for updates from code | [non-store-code-driven-update.md](./non-store-code-driven-update.md) |
| Asset Packages and Package Folding | Hard-links asset package files into an app's package | [package-folding.md](./package-folding.md) |
| Package Registration and Lifetime | Removing an MSIX package for a user does not always delete it immediately | [package-lifetime.md](./package-lifetime.md) |
| Package Storage Volumes | A Windows-managed installation store for staged packages | [package-volumes.md](./package-volumes.md) |
| Managing MSIX with PowerShell (Appx Cmdlets) | PowerShell cmdlets for managing `.appx` and `.msix` packages | [powershell-msix-cmdlets.md](./powershell-msix-cmdlets.md) |
| Preinstalling Packaged Apps | Install a packaged app for all users with DISM and provisioning packages | [preinstalled-apps.md](./preinstalled-apps.md) |
| Reset and Repair MSIX Apps | App Reset and Repair can be performed by the device user | [reset-and-repair.md](./reset-and-repair.md) |
| MSIX Shared Package Container | Enterprise-only feature that creates a shared runtime container | [shared-package-container.md](./shared-package-container.md) |
| Sideloading Prerequisites | Requirements a device must meet before it can sideload MSIX apps | [sideloading-prerequisites.md](./sideloading-prerequisites.md) |
| Code-Driven Store Package Updates | `Windows.Services.Store.StoreContext` methods that let an app check for updates | [store-package-code-driven-update.md](./store-package-code-driven-update.md) |
| Tamper Protection (Package Integrity Check) | Runtime check of an MSIX package's entire contents | [tamper-protection.md](./tamper-protection.md) |
| Unpackage a WinUI App | Ship a WinUI 3 app without MSIX (enterprise or folder-based deployment) | [unpackage-winui-app.md](./unpackage-winui-app.md) |
| Distribute MSIX Through the Web with App Installer (Azure / IIS / AWS) | App Installer can install an app directly from a web server | [web-install-app-installer.md](./web-install-app-installer.md) |
| Windows App SDK Bootstrapper API | Initializes access to the Windows App SDK runtime | [windows-app-sdk-bootstrapper-api.md](./windows-app-sdk-bootstrapper-api.md) |
| Windows App SDK Deployment Overview (Framework-dependent vs Self-contained, ARM64 / Arm64EC) | Windows App SDK can be deployed framework-dependent (default) or self-contained | [windows-app-sdk-deploy-overview.md](./windows-app-sdk-deploy-overview.md) |
| Windows App SDK: Deploy Framework-Dependent Packaged Apps | Deployment guidance for MSIX-packaged framework-dependent apps | [windows-app-sdk-deploy-packaged-apps.md](./windows-app-sdk-deploy-packaged-apps.md) |
| Windows App SDK: Deploy Unpackaged / Packaged-with-External-Location Apps | Deployment guidance for unpackaged or external-location desktop apps | [windows-app-sdk-deploy-unpackaged-apps.md](./windows-app-sdk-deploy-unpackaged-apps.md) |
| Windows App SDK Deployment Architecture | High-level architecture and key terms for how apps consume the Windows App SDK | [windows-app-sdk-deployment-architecture.md](./windows-app-sdk-deployment-architecture.md) |
| Windows App SDK Project Properties (Auto-initializers, MSBuild) | Project file properties (`.csproj` / `.vcxproj`) for auto-initializers and MSBuild | [windows-app-sdk-project-properties.md](./windows-app-sdk-project-properties.md) |
| Windows App SDK: Check for / Remove Runtime Versions | Verifies installed Windows App SDK runtime versions, and removes them | [windows-app-sdk-runtime-version-management.md](./windows-app-sdk-runtime-version-management.md) |
| Windows App SDK: Self-Contained Deployment | Switches a Windows App SDK project from framework-dependent to self-contained | [windows-app-sdk-self-contained-deploy.md](./windows-app-sdk-self-contained-deploy.md) |
