---
source: https://v2.tauri.app/reference/config/#bundleconfig
---

# BundleConfig

Configuration for tauri-bundler (`bundle` in `tauri.conf.json`), plus `BundleTarget`, `BundleType`, `BundleResources`, `FileAssociation` (with `AssociationExt`, `BundleTypeRole`, `HandlerRank`, `ExportedFileAssociation`), `Updater`, `V1Compatible`.

## Signature / Usage

```json
{
  "bundle": {
    "resources": {
      "/absolute/path/to/textfile.txt": "resources/textfile.txt",
      "relative/path/to/jsonfile.json": "resources/jsonfile.json",
      "resources/": "",
      "docs/**/*md": "website-docs/"
    }
  }
}
```

## Options / Props

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `active` | boolean | `false` | Whether Tauri should bundle your application or just output the executable. |
| `targets` | BundleTarget | `"all"` | The bundle targets, currently supports ["deb", "rpm", "appimage", "nsis", "msi", "app", "dmg"] or "all". |
| `createUpdaterArtifacts` | Updater | `false` | Produce updaters and their signatures or not. |
| `publisher` | string \| null | — | The application's publisher. Defaults to the second element in the identifier string. Currently maps to the Manufacturer property of the Windows Installer and the Maintainer field of debian packages if the Cargo.toml does not have the authors field. |
| `homepage` | string \| null | — | A url to the home page of your application. If unset, falls back to `homepage` in `Cargo.toml`. Supported bundle targets: `deb`, `rpm`, `nsis` and `msi`. |
| `icon` | string[] | `[]` | The app's icons. |
| `resources` | BundleResources \| null | — | App resources to bundle. Each resource is a path to a file or directory; glob patterns are supported. |
| `copyright` | string \| null | — | A copyright string associated with your application. |
| `license` | string \| null | — | The package's license identifier to be included in the appropriate bundles. Defaults to the license from `Cargo.toml`. |
| `licenseFile` | string \| null | — | The path to the license file to be included in the appropriate bundles. |
| `category` | string \| null | — | The application kind. One of: Business, DeveloperTool, Education, Entertainment, Finance, Game, ActionGame, AdventureGame, ArcadeGame, BoardGame, CardGame, CasinoGame, DiceGame, EducationalGame, FamilyGame, KidsGame, MusicGame, PuzzleGame, RacingGame, RolePlayingGame, SimulationGame, SportsGame, StrategyGame, TriviaGame, WordGame, GraphicsAndDesign, HealthcareAndFitness, Lifestyle, Medical, Music, News, Photography, Productivity, Reference, SocialNetworking, Sports, Travel, Utility, Video, Weather. |
| `fileAssociations` | FileAssociation[] \| null | — | File types to associate with the application. |
| `shortDescription` | string \| null | — | A short description of your application. |
| `longDescription` | string \| null | — | A longer, multi-line description of the application. |
| `useLocalToolsDir` | boolean | `false` | Whether to use the project's `target` directory for caching build tools (e.g., Wix and NSIS). If true, tools are cached in `target/.tauri/`; if false, in the current user's platform-specific cache directory. Can be appropriate when building as a Windows System user (e.g., AWS EC2 workloads). |
| `externalBin` | string[] \| null | — | Absolute or relative paths to binaries to embed with your application. Tauri looks for system-specific binaries following `binary-name{-target-triple}{.system-extension}`, e.g. `my-binary-x86_64-pc-windows-msvc.exe`, `my-binary-x86_64-apple-darwin`, `my-binary-x86_64-unknown-linux-gnu`; provide binaries for all targeted platforms. |
| `windows` | WindowsConfig | see bundle-windows | Configuration for the Windows bundles. |
| `linux` | LinuxConfig | see bundle-linux | Configuration for the Linux bundles. |
| `macOS` | MacConfig | see bundle-macos | Configuration for the macOS bundles. |
| `iOS` | IosConfig | `{"minimumSystemVersion": "15.0"}` | iOS configuration. |
| `android` | AndroidConfig | `{"autoIncrementVersionCode": false, "minSdkVersion": 24}` | Android configuration. |

### Supporting types

| Type | Definition |
| --- | --- |
| BundleTarget | Targets to bundle; each value is case insensitive. `"all"`, a list of `BundleType`, or a single `BundleType`. |
| BundleType | `deb` (.deb), `rpm` (.rpm), `appimage` (.appimage), `msi` (.msi), `nsis` (.exe), `app` (.app), `dmg` (.dmg). |
| BundleResources | A list of paths to include (`string[]`) or a map of source to target paths (`object` of string to string). |
| Updater | `"v1Compatible"` (generates legacy zipped v1 compatible updaters) or `boolean` (produce updaters and their signatures or not). |
| V1Compatible | The single string value `"v1Compatible"`. |

### FileAssociation

Required: `ext`. `additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `ext` | string[] (AssociationExt) | — | File extensions to associate with this app, e.g. `png`. A leading `.` is automatically stripped. |
| `contentTypes` | string[] \| null | — | Declare support to a file with the given content type. Maps to `LSItemContentTypes` on macOS. Allows supporting any format declared by another application that conforms to this type. |
| `name` | string \| null | — | The name. Maps to `CFBundleTypeName` on macOS. Default to `ext[0]`. |
| `description` | string \| null | — | The association description. Windows-only; displayed on the `Type` column in Windows Explorer. |
| `role` | BundleTypeRole | `"Editor"` | The app's role with respect to the type. Maps to `CFBundleTypeRole` on macOS. Values: `Editor`, `Viewer`, `Shell`, `QLGenerator`, `None`. |
| `mimeType` | string \| null | — | The mime-type of the association, e.g. `image/png`. Linux: `MimeType=` in the `.desktop` file. macOS / iOS: `public.mime-type` in `UTTypeTagSpecification` of the `UTExportedTypeDeclarations` entry in `Info.plist`. Android: `android:mimeType` in the `<data>` element of an `<intent-filter>`. |
| `rank` | HandlerRank | `"Default"` | The ranking of this app among apps that declare themselves editors or viewers of the file type. Maps to `LSHandlerRank` on macOS. Values: `Default` (opener; used if no rank specified), `Owner` (primary creator), `Alternate` (secondary viewer), `None` (never selected but accepts drops). |
| `exportedType` | ExportedFileAssociation \| null | — | The exported type definition. Maps to a `UTExportedTypeDeclarations` entry on macOS. Define this if the file is a custom file type defined by your application. `{ identifier: string (required, UTTypeIdentifier), conformsTo?: string[] \| null (UTTypeConformsTo, e.g. public.data, public.image, public.json, public.database) }`. |
| `androidIntentActionFilters` | AndroidIntentAction[] \| null | — | Intent action filters for this file association; by default all filters are used. Values: `send` (ACTION_SEND), `sendMultiple` (ACTION_SEND_MULTIPLE), `view` (ACTION_VIEW). |

## Notes

- `resources` as a list: bundled files go to `$RESOURCES/` with the original directory structure preserved, e.g. `./path/to/some-file.txt` -> `$RESOURCE/path/to/some-file.txt`. As a map: with a glob pattern the original directory structure is not preserved; everything is copied to the target directory directly. See https://v2.tauri.app/develop/resources/.
- Example list form from the schema docs: `"resources": ["./path/to/some-file.txt", "/absolute/path/to/textfile.txt", "../relative/path/to/jsonfile.json", "some-folder/", "resources/**/*.md"]`.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.BundleConfig` and referenced types).

## Related

- [Configuration (root Config)](./overview.md)
- [Windows bundles](./bundle-windows.md)
- [macOS bundles](./bundle-macos.md)
- [Linux bundles](./bundle-linux.md)
- [Android / iOS](./bundle-mobile.md)
- [BuildConfig](./build-config.md)
