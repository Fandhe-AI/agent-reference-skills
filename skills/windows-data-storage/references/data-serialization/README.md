# data-serialization

| Name | Description | Path |
|------|-------------|------|
| Application data storage locations (ApplicationData) | `ApplicationData` provides access to the per-user application data store: local, roaming, and temporary files and settings. | [application-data-storage.md](./application-data-storage.md) |
| Large data handling and caching strategy | Guidance for storing large or regenerable data sets (downloaded images, parsed API responses, computed indexes) without bloating cloud backups or exhausting user disk space, using `ApplicationData.LocalCacheFolder` and `ApplicationData.TemporaryFolder`. | [caching-strategy.md](./caching-strategy.md) |
| CommonFileQuery | Enum specifying how to sort files in query results and whether the query is shallow (current folder only) or deep (recursive through subfolders). | [common-file-query.md](./common-file-query.md) |
| Connect a WinUI app to a database | Guidance for line-of-business apps that store data on the device, call an enterprise service, or combine both for offline use. | [connect-winui-app-to-database.md](./connect-winui-app-to-database.md) |
| Cosmos DB database (Microsoft.Azure.Cosmos) | Steps to work with an Azure Cosmos DB for NoSQL database from a WPF, Windows Forms, or WinUI app, with a sample that creates a container, writes an item, and queries it. | [cosmos-db-data-access.md](./cosmos-db-data-access.md) |
| Data access in Windows apps | Overview of storing and retrieving data in a Windows app: a local SQLite database on the device, or a database client library when the app runs in a controlled environment where direct database access is acceptable. | [data-access-overview.md](./data-access-overview.md) |
| EF Core SQLite provider | The Entity Framework Core database provider that allows EF Core to target SQLite. | [ef-core-sqlite-provider.md](./ef-core-sqlite-provider.md) |
| JsonArray | Represents a JSON array. | [json-array.md](./json-array.md) |
| JsonObject | Represents a JSON object containing a collection of name and `JsonValue` pairs. | [json-object.md](./json-object.md) |
| JsonValue | Implements the `IJsonValue` interface which represents a single JSON value. | [json-value.md](./json-value.md) |
| Windows.Data.Json vs System.Text.Json | Guidance on choosing between the WinRT `Windows.Data.Json` namespace and the .NET `System.Text.Json` namespace for JSON handling in a Windows app. | [json-vs-system-text-json.md](./json-vs-system-text-json.md) |
| MongoDB database (MongoDB.Driver) | Steps to connect a WPF, Windows Forms, or WinUI app directly to a MongoDB database using the official `MongoDB.Driver` package. | [mongodb-database.md](./mongodb-database.md) |
| MySQL database (MySql.Data) | Steps to read from a MySQL database from a WPF, Windows Forms, or WinUI app using the `MySql.Data` package. | [mysql-database.md](./mysql-database.md) |
| QueryOptions | Specifies the parameters of a search query for enumerating the contents of storage folders: filters, sort order, folder depth, and whether the Windows Search indexer or the raw file system is used to produce results. | [query-options.md](./query-options.md) |
| SQL Server database (Microsoft.Data.SqlClient) | Tutorial for connecting a Windows App SDK app directly to a SQL Server database and storing/retrieving data with classes in the `Microsoft.Data.SqlClient` namespace. | [sql-server-database.md](./sql-server-database.md) |
| SQLite data access (Microsoft.Data.Sqlite) | `Microsoft.Data.Sqlite` is a lightweight ADO.NET provider for SQLite. | [sqlite-data-access.md](./sqlite-data-access.md) |
| StorageFileQueryResult | Provides access to the results of a query of the files in the location represented by a `StorageFolder` object. | [storage-file-query-result.md](./storage-file-query-result.md) |
| StorageFolderQueryResult / StorageItemQueryResult | Sibling result types to `StorageFileQueryResult`, returned by `StorageFolder.CreateFolderQueryWithOptions()` (folders/file groups only) and `StorageFolder.CreateItemQueryWithOptions()` (mixed files and folders). | [storage-folder-item-query-result.md](./storage-folder-item-query-result.md) |
| XmlDocument | Represents the top level of an XML source, implementing `IXmlNode`, `IXmlNodeSelector`, and `IXmlNodeSerializer`. | [xml-document.md](./xml-document.md) |
</content>
