# Windows App SDK Deployment Architecture

High-level architecture and key terms for how apps consume the Windows App SDK runtime: framework-dependent vs. self-contained, and the packages/components involved.

## Signature / Usage

```xml
<!-- Framework-dependent packaged app: PackageReference generates a PackageDependency
     on the Windows App SDK framework package automatically -->
<ItemGroup>
   <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.8.260209005">
       <IncludeAssets>build</IncludeAssets>
   </PackageReference>
</ItemGroup>
```

## Options / Props

| Term | Definition |
| --- | --- |
| Windows App SDK runtime | The MSIX packages (Framework, Main, Singleton, DDLM) required to use the Windows App SDK. |
| Framework package | Contains binaries used at run time; includes the bootstrapper component; follows Semantic Versioning 2.0.0. |
| Main package | Contains background tasks that enable automatic Framework package updates from the Microsoft Store. |
| Singleton package | Long-running process for features not in the Framework package (e.g. push notifications). |
| DDLM (Dynamic Dependency Lifetime Manager) | Prevents OS servicing of the Framework package while a packaged-with-external-location or unpackaged app is using it. |
| Bootstrapper | App-local binary that locates and loads the best-matching Windows App SDK version for packaged-with-external-location/unpackaged apps. |
| Installer | The `.exe` installer that deploys Framework, Main, Singleton, and DDLM packages. |

Deployment method requirements:

| App deployment method | Requirements |
| --- | --- |
| Packaged (MSIX) | Declare Framework package dependency in the package manifest; Deployment API required for Store distribution, recommended otherwise. |
| Packaged with external location or unpackaged | Distribute the runtime via the Installer or by installing MSIX packages directly; initialize access via the Bootstrap API. |

## Notes

- These concepts apply primarily to **framework-dependent** apps. For self-contained deployment, see the self-contained deployment guide.
- MSIX deployment goes through three stages: **Index** (per-machine, parses manifest) → **Stage** (per-machine, extracts payload) → **Register** (per-user). "Install" is informal — the deployment engine has no formal "Install" concept.
- Packaged apps require the VCLibs framework package dependency; unpackaged apps require the Visual C++ Redistributable.

## Related

- [Windows App SDK deployment guide for framework-dependent packaged apps](./windows-app-sdk-deploy-packaged-apps.md)
- [Windows App SDK deployment guide for framework-dependent apps packaged with external location or unpackaged](./windows-app-sdk-deploy-unpackaged-apps.md)
- [Use the Windows App SDK bootstrapper API](./windows-app-sdk-bootstrapper-api.md)
- [Windows App SDK deployment guide for self-contained apps](./windows-app-sdk-self-contained-deploy.md)
