# Package Manifest Schema (AppxManifest.xml)

The package manifest is an XML document that contains the info the system needs to deploy, display, or update a Windows app: package identity, dependencies, required capabilities, visual elements, and extensibility points. Every app package must include exactly one `AppxManifest.xml`.

## Signature / Usage

```xml
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10">

  <Identity Name="Contoso.MyApp"
            Publisher="CN=Contoso Corporation, O=Contoso Corporation, L=Redmond, S=Washington, C=US"
            Version="1.0.0.0" />

  <Properties>
    <DisplayName>My App</DisplayName>
    <PublisherDisplayName>Contoso Corporation</PublisherDisplayName>
    <Logo>images\storeLogo.png</Logo>
  </Properties>

  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.19041.0" />
  </Dependencies>

  <Capabilities>
    <Capability Name="internetClient" />
  </Capabilities>

  <Applications>
    <Application Id="App" Executable="MyApp.exe" EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements
        DisplayName="My App"
        Description="My App description"
        BackgroundColor="#464646"
        Square150x150Logo="images\squareTile.png"
        Square44x44Logo="images\smallTile.png" />
    </Application>
  </Applications>

  <Extensions>
    <!-- Extension elements go here -->
  </Extensions>
</Package>
```

## Options / Props

### `Package` (root element)

Child elements: `Identity`, `Properties`, `Resources?`, `Dependencies`, `Capabilities?`, `Applications?`, `Extensions?`. `IgnorableNamespaces` is the only attribute.

### `Identity`

| Attribute | Description | Required |
|-----------|-------------|----------|
| `Name` | Case-sensitive contents identifier of the package (not shown to users) | Yes |
| `Publisher` | Must match the publisher subject of the certificate used to sign the package | Yes |
| `Version` | Quad notation `major.minor.build.revision` | Yes |
| `ProcessorArchitecture` | `x86`, `x64`, `arm`, `arm64`, `x86a64`, or `neutral` | No |
| `ResourceId` | Publisher-specified string describing the UI resource type in the package | No |

### `Properties`

Child elements include `DisplayName`, `PublisherDisplayName`, `Description?`, `Logo`, `Framework?`, `ResourcePackage?`, `rescap6:ModificationPackage?` (declares a modification package), `uap10:AllowExternalContent?` (packaging with external location), `uap10:PackageIntegrity?`, `uap13:AutoUpdate?`.

### `Dependencies`

Declares other packages a package depends on. Key children: `TargetDeviceFamily{1,128}` (identifies the targeted device family, e.g. `Windows.Desktop`), `PackageDependency` (dependency on a framework package), `uap4:MainPackageDependency` (used by optional/modification packages to bind to a main package), `uap5:DriverDependency`, `uap7:OSPackageDependency`. If a dependency cannot be resolved, package deployment fails.

### `Applications` / `Application`

`Applications` holds `Application{1,100}` (a package with multiple apps won't pass Store certification). Key `Application` attributes:

| Attribute | Description |
|-----------|-------------|
| `Id` | Unique identifier of the app within the package (package-relative app ID, PRAID) |
| `Executable` | Default launch executable (must end with `.exe`) |
| `EntryPoint` | Activatable class ID, e.g. `Windows.FullTrustApplication` for a packaged Win32 app |
| `uap10:RuntimeBehavior` | `windowsApp`, `packagedClassicApp`, or `win32App` |
| `uap10:TrustLevel` | `appContainer` or `mediumIL` |

Child elements: `uap:VisualElements` (via `VisualElementsChoice`), `uap:ApplicationContentUriRules?`, `Extensions?`, `uap7:Properties?`.

### `uap:VisualElements`

Describes tile, logo images, text and background colors, and splash/lock-screen appearance.

| Attribute | Description | Required |
|-----------|-------------|----------|
| `DisplayName` | Friendly app name shown to users (localizable) | Yes |
| `Description` | App description | Yes |
| `BackgroundColor` | Tile/app background color (named color or hex) | Yes |
| `Square150x150Logo` | Medium tile / Task Switcher image | Yes |
| `Square44x44Logo` | Small tile / All Apps List image | Yes |
| `AppListEntry` | `default` or `none` | No |

Child elements: `uap:DefaultTile?`, `uap:LockScreen?`, `uap:SplashScreen?`, `uap:InitialRotationPreference?`.

### `Capabilities`

Declares access to protected user resources. Children: `Capability` (e.g. `internetClient`, `internetClientServer`, `privateNetworkClientServer`), `uap:Capability` (e.g. `documentsLibrary`, `picturesLibrary`, `enterpriseAuthentication`), `DeviceCapability` (e.g. webcam, microphone). If a capability isn't declared, the app can't access the associated resource.

### `Extensions`

Declares one or more extensibility points for the package or application. Each `Extension` element has a required `Category` attribute (for example `windows.activatableClass.inProcessServer`, `windows.protocol`, `windows.fileTypeAssociation`, `windows.backgroundTasks`).

## Notes

- The manifest is digitally signed as part of signing the app package; after signing, you can't modify it without invalidating the signature.
- `uap:VisualElements` is scoped to `AppxManifest.xml` (MSIX/UWP packaging) — do not confuse with unrelated `VisualElement` types in other UI frameworks.
- `MainPackageDependency` is the mechanism used by both modification packages and optional packages to bind to a main package (see Modification Packages / Optional Packages).

## Related

- [MSIX Package Structure](./package-structure.md)
- [Package Asset Requirements](./package-asset-requirements.md)
- [Modification Packages](./modification-packages.md)
- [Optional Packages](./optional-packages.md)
- [Package Extensions How-To Guide](./package-extensions-guide.md)
