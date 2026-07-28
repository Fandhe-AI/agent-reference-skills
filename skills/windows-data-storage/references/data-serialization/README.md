# data-serialization

| Name | Description | Path |
|------|-------------|------|
| JsonObject | WinRT JSON object DOM type; name/value pairs, `Parse`/`TryParse`, `Stringify`. | [json-object.md](./json-object.md) |
| JsonArray | WinRT JSON array DOM type; enumerable, `Parse`/`TryParse`, `Stringify`. | [json-array.md](./json-array.md) |
| JsonValue | WinRT JSON primitive/value wrapper; `CreateStringValue`/`CreateNumberValue`/`CreateBooleanValue`, `Parse`/`TryParse`. | [json-value.md](./json-value.md) |
| XmlDocument | WinRT XML DOM document; `LoadXml`, `LoadFromFileAsync`, `SaveToFileAsync`, XPath `SelectNodes`. | [xml-document.md](./xml-document.md) |
| Windows.Data.Json vs System.Text.Json | When to use the WinRT JSON DOM vs the .NET `System.Text.Json` serializer. | [json-vs-system-text-json.md](./json-vs-system-text-json.md) |
| SQLite data access (Microsoft.Data.Sqlite) | Embedding a local SQLite database via the ADO.NET provider: connect, query, insert. | [sqlite-data-access.md](./sqlite-data-access.md) |
| EF Core SQLite provider | Object-relational mapping over SQLite via `Microsoft.EntityFrameworkCore.Sqlite`. | [ef-core-sqlite-provider.md](./ef-core-sqlite-provider.md) |
| Application data storage locations | `ApplicationData.LocalFolder`/`LocalCacheFolder`/`TemporaryFolder`/`RoamingFolder`/`LocalSettings` — where to place files and DBs. | [application-data-storage.md](./application-data-storage.md) |
| Large data handling and caching strategy | Strategy for caching large/regenerable data using `LocalCacheFolder`/`TemporaryFolder`. | [caching-strategy.md](./caching-strategy.md) |
| StorageFileQueryResult | Enumerates files matched by a `StorageFolder` query, optionally indexer-backed. | [storage-file-query-result.md](./storage-file-query-result.md) |
| QueryOptions | Configures file/folder query filters, sort order, and indexer usage. | [query-options.md](./query-options.md) |
| CommonFileQuery | Enum of predefined sort/scan modes for file queries (`OrderByName`, `OrderByDate`, ...). | [common-file-query.md](./common-file-query.md) |
