# Deployment

| Name | Description | Path |
|------|-------------|------|
| Choose a Distribution Path | Compares Microsoft Store, PWA, MSIX sideload/direct download, external-location packaging, and unpackaged distribution | [choose-distribution-path.md](./choose-distribution-path.md) |
| App Installer File Overview | XML file format that drives sideloaded MSIX install and auto-update | [app-installer-file-overview.md](./app-installer-file-overview.md) |
| App Installer Update Settings | `UpdateSettings`, `OnLaunch`, `HoursBetweenUpdateChecks` and related update-behavior schema | [app-installer-update-settings.md](./app-installer-update-settings.md) |
| Sideloading Prerequisites | Certificate trust and Developer Mode/Sideload apps requirements | [sideloading-prerequisites.md](./sideloading-prerequisites.md) |
| App Installer Troubleshooting | Common `.appinstaller` download/install failure causes and fixes | [app-installer-troubleshooting.md](./app-installer-troubleshooting.md) |
| Windows App SDK Deployment Architecture | Framework/Main/Singleton/DDLM packages, bootstrapper, MSIX pipeline stages | [windows-app-sdk-deployment-architecture.md](./windows-app-sdk-deployment-architecture.md) |
| Windows App SDK: Deploy Framework-Dependent Packaged Apps | Framework package dependency + Deployment API for MSIX-packaged apps | [windows-app-sdk-deploy-packaged-apps.md](./windows-app-sdk-deploy-packaged-apps.md) |
| Windows App SDK: Deploy Unpackaged / Packaged-with-External-Location Apps | Runtime installer options and registration checks for non-MSIX apps | [windows-app-sdk-deploy-unpackaged-apps.md](./windows-app-sdk-deploy-unpackaged-apps.md) |
| Windows App SDK Bootstrapper API | `MddBootstrapInitialize`/`MddBootstrapShutdown` and `WindowsPackageType` auto-init | [windows-app-sdk-bootstrapper-api.md](./windows-app-sdk-bootstrapper-api.md) |
| Windows App SDK: Self-Contained Deployment | `WindowsAppSDKSelfContained`, hybrid CRT, self-contained .NET publish interplay | [windows-app-sdk-self-contained-deploy.md](./windows-app-sdk-self-contained-deploy.md) |
| .NET Deployment Models | Framework-dependent vs self-contained, Trimming, ReadyToRun, single-file, Native AOT | [dotnet-deployment-models.md](./dotnet-deployment-models.md) |
| Gradual Package Rollout | Percentage-based staged rollout of Microsoft Store package updates | [gradual-package-rollout.md](./gradual-package-rollout.md) |
| Enterprise Deployment with Microsoft Intune | LOB app deployment, code signing options, Microsoft Store for Business successor | [enterprise-deployment-intune.md](./enterprise-deployment-intune.md) |
