# App data versioning and migration

How to version the format of an app's application data so future app versions can change that format without breaking compatibility with data written by older app versions.

## Signature / Usage

```csharp
await Windows.Storage.ApplicationData.Current.SetVersionAsync(
    2,
    (Windows.Storage.SetVersionRequest request) =>
    {
        // Inspect request.CurrentVersion, request.DesiredVersion
        // and migrate LocalFolder / LocalSettings data to the new format.
    });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Version | `uint` (read-only) | Current version number of the application data in the store. |
| SetVersionAsync | `IAsyncAction SetVersionAsync(uint32_t desiredVersion, ApplicationDataSetVersionHandler handler)` | Sets the data store's version, invoking `handler` synchronously to perform the migration. |

## Notes

- App checks `ApplicationData.Version` against the version it expects; if the stored version is lower, it should migrate the data to the new format and then call `SetVersionAsync` with the new desired version.
- The `ApplicationDataSetVersionHandler` callback is where migration logic (converting file formats, renaming/restructuring settings, etc.) runs.
- Versioning is optional — only needed when you plan to change the on-disk/registry format of local or roaming data across app updates.

## Related

- [ApplicationData](./application-data.md)
- [ApplicationDataContainer](./application-data-container.md)
