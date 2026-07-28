# resources.pri and MakePri.exe

Every app package contains a binary index of its resources built at build time: the Package Resource Index (PRI). A package typically has one `resources.pri` file per language at the package root, automatically loaded when `ResourceManager` is instantiated. `MakePri.exe` is the command-line tool that builds, dumps, and versions PRI files.

## Signature / Usage

```console
:: Generate resources.pri for an unpackaged app
makepri createconfig /cf priconfig.xml /dq lang-en-US /o
makepri new /pr <PROJECTROOT> /cf priconfig.xml /of resources.pri

:: Dump a PRI file's contents to inspect resource URIs
makepri dump /if resources.pri /of resources.pri.xml
```

## Options / Props

| Command | Description |
|------|--------------|
| `createconfig` | Creates a PRI config file (`priconfig.xml`) defining default qualifiers (e.g. `/dq lang-en-US`), used as input to the other commands. |
| `new` | Creates a new PRI file from scratch by indexing all files under `/pr <project root>` per the config file (`/cf`). Key options: `/of` (output path), `/in` (index name, usually the package name), `/mn` (manifest path), `/o` (overwrite). |
| `dump` | Outputs an XML dump of all resources in a PRI file (`/if`), useful for inspecting each resource's `uri`. `/dt` selects `Basic`, `Detailed`, `Schema`, or `Summary` format. |
| `resourcepack` | Creates a PRI file containing additional resource variants (e.g. another language) for an existing base PRI file. |
| `versioned` | Creates a versioned PRI file based on a previous version's PRI/schema. |

## Notes

- `resources.pri` contains actual string resources; embedded binary/file-path resources are indexed directly from project files rather than embedded, so PRI files are data-only (not PE format).
- For **unpackaged apps**, there is no default package view, so pass the `.pri` file path explicitly to `ResourceManager(String)` / `ResourceLoader`, and manually run `makepri new` (with a config that omits the `<packaging>` section) to produce a single `resources.pri`, then copy it next to the `.exe`.
- Use `makepri dump` to find a resource's exact `uri` (e.g. `ms-resource://<GUID>/Resources/Fare/Well`) when in doubt about a segmented or scoped identifier.
- PRI files must be manually rebuilt whenever resources change; a post-build script running MakePri.exe is recommended.

## Related

- [ResourceManager](./resource-manager.md)
- [ResourceQualifiers](./resource-qualifiers.md)
- [Localization](./localize-strings.md)
