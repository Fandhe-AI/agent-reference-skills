# SQLite data access (Microsoft.Data.Sqlite)

`Microsoft.Data.Sqlite` is a lightweight ADO.NET provider for SQLite. It provides an intuitive wrapper around the low-level native SQLite API and implements the common ADO.NET abstractions (`SqliteConnection`, `SqliteCommand`, `SqliteDataReader`). It is the recommended way to embed a local SQLite database directly (without an ORM) in a Windows app.

## Signature / Usage

```csharp
using Microsoft.Data.Sqlite;
using Windows.Storage;

public static class DataAccess
{
    public async static void InitializeDatabase()
    {
        await ApplicationData.Current.LocalFolder
                .CreateFileAsync("sqliteSample.db", CreationCollisionOption.OpenIfExists);
        string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, "sqliteSample.db");

        using (var db = new SqliteConnection($"Filename={dbpath}"))
        {
            db.Open();
            var createTable = new SqliteCommand(
                "CREATE TABLE IF NOT EXISTS MyTable (Primary_Key INTEGER PRIMARY KEY, Text_Entry NVARCHAR(2048) NULL)",
                db);
            createTable.ExecuteReader();
        }
    }

    public static void AddData(string inputText)
    {
        string dbpath = Path.Combine(ApplicationData.Current.LocalFolder.Path, "sqliteSample.db");
        using (var db = new SqliteConnection($"Filename={dbpath}"))
        {
            db.Open();
            var insertCommand = new SqliteCommand { Connection = db };
            // Parameterized query prevents SQL injection
            insertCommand.CommandText = "INSERT INTO MyTable VALUES (NULL, @Entry);";
            insertCommand.Parameters.AddWithValue("@Entry", inputText);
            insertCommand.ExecuteReader();
        }
    }
}
```

## Options / Props

| Step | API | Description |
|------|-----|-------------|
| 1. Install | NuGet package `Microsoft.Data.Sqlite` | Add via `dotnet add package Microsoft.Data.Sqlite` or the Visual Studio NuGet UI. All supported Windows versions ship a SQLite binary the app can rely on, so packaging the library yourself is unnecessary. |
| 2. Locate DB file | `ApplicationData.Current.LocalFolder` | Create/open the `.db` file under the app's local data store (see application-data-storage.md). |
| 3. Create file | `StorageFolder.CreateFileAsync(name, CreationCollisionOption.OpenIfExists)` | Ensures the database file exists before opening a connection. |
| 4. Connect | `new SqliteConnection($"Filename={dbpath}")` | Connection string points at the absolute file path; call `.Open()` before use. |
| 5. Execute | `SqliteCommand` / `SqliteCommand.ExecuteReader()` | Runs DDL/DML; use `Parameters.AddWithValue` for parameterized queries to avoid SQL injection. |
| 6. Read | `SqliteDataReader.Read()` / `GetString(int)` / `GetDateTime(int)` / `GetBoolean(int)` | Advances through result rows and reads typed column values by ordinal. |

## Notes

- Call `DataAccess.InitializeDatabase()` once at app startup (the tutorial does so in the `App` constructor). Because it is `async void`, the caller cannot await it, so a query can run before the table exists; return `Task` and await completion before querying (see `samples/sqlite-local-database.md`).
- Always use parameterized queries (`Parameters.AddWithValue`) instead of string concatenation to prevent SQL injection. The tutorial states: "Never concatenate user input into a SQL query string. Always use parameters."
- Prerequisite in the tutorial: Visual Studio 2026 or later with the WinUI application development workload.
- "In a production application, connection information such as the database filename should be stored in app configuration rather than hard-coded."
- Scope: SQLite is for on-device storage. The data-access overview advises: "For enterprise line-of-business apps that access shared data, prefer an authenticated service layer that owns database access ... Don't embed shared database credentials or privileged connection strings in a desktop client."
- `ApplicationData`-based file access (`LocalFolder`) only works for packaged apps running in an app container. Packaged apps outside an app container (full trust) access `ApplicationData` members via `Windows.Management.Core.ApplicationDataManager`, per the tutorial. Unpackaged apps "do not have access to the system-managed app data stores and should use alternative storage mechanisms such as direct file I/O or registry access" (https://learn.microsoft.com/en-us/windows/apps/develop/data/store-and-retrieve-app-data), so build the database path with `System.IO` instead.
- For an object-relational mapping layer on top of the same SQLite file, use the EF Core SQLite provider instead of raw `Microsoft.Data.Sqlite` (see ef-core-sqlite-provider.md); EF Core's SQLite provider itself is built on `Microsoft.Data.Sqlite`.

## Related

- [EF Core SQLite provider](./ef-core-sqlite-provider.md)
- [Application data storage locations](./application-data-storage.md)
- [Data access overview](./data-access-overview.md)
- [Connect a WinUI app to a database](./connect-winui-app-to-database.md)
- [SQL Server (Microsoft.Data.SqlClient)](./sql-server-database.md)
