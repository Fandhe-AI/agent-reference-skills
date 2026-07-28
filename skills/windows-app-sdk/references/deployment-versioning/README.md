# Deployment & Versioning

| Name | Description | Path |
|------|-------------|------|
| Deployment Architecture | Runtime packages (Framework/Main/Singleton/DDLM), MSIX deployment pipeline stages | [deployment-architecture.md](./deployment-architecture.md) |
| Deployment Overview | Framework-dependent vs self-contained trade-offs, initialization matrix, x64/ARM64 considerations | [deploy-overview.md](./deploy-overview.md) |
| Deployment Guide for Packaged Apps | Framework package dependency + Deployment API for packaged (MSIX) apps | [deploy-packaged-apps.md](./deploy-packaged-apps.md) |
| Deployment Guide for Unpackaged Apps | Installer vs direct MSIX deployment for unpackaged/packaged-with-external-location apps | [deploy-unpackaged-apps.md](./deploy-unpackaged-apps.md) |
| Self-Contained Deployment | `WindowsAppSDKSelfContained` property, bundling the runtime into build output | [deploy-self-contained-apps.md](./deploy-self-contained-apps.md) |
| Release Channels | Stable / Preview / Experimental channels, support and servicing lifecycle | [release-channels.md](./release-channels.md) |
| Downloads | Runtime installer/redistributable/NuGet download locations per channel | [downloads.md](./downloads.md) |
| System Requirements | Minimum OS, Windows SDK, and dev tool requirements | [system-requirements.md](./system-requirements.md) |
| Project Properties and Auto-Initializers | `WindowsAppSDKSelfContained`, `WindowsPackageType`, and other deployment MSBuild properties | [project-properties.md](./project-properties.md) |
| Use the Windows App SDK Runtime (Bootstrapper API) | `MddBootstrapInitialize`/`Bootstrap.Initialize`, auto-initialization via `WindowsPackageType=None` | [use-windows-app-sdk-run-time.md](./use-windows-app-sdk-run-time.md) |
| Tutorial: Bootstrapper API in an Unpackaged App | Step-by-step C#/C++ bootstrapper API tutorial | [tutorial-unpackaged-deployment.md](./tutorial-unpackaged-deployment.md) |
| DeploymentManager | `GetStatus`, `Initialize`, `Repair` static methods for the Deployment API | [deploymentmanager.md](./deploymentmanager.md) |
| DeploymentResult | `Status` / `ExtendedError` result type returned by `DeploymentManager` | [deploymentresult.md](./deploymentresult.md) |
