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

- Call `DataAccess.InitializeDatabase()` once at app startup (e.g. in the `App` constructor) so the schema exists before any query runs.
- Always use parameterized queries (`Parameters.AddWithValue`) instead of string concatenation to prevent SQL injection.
- `ApplicationData`-based file access (`LocalFolder`) only works for packaged apps running in an app container; unpackaged apps should use `ApplicationDataManager` or direct file I/O instead.
- For an object-relational mapping layer on top of the same SQLite file, use the EF Core SQLite provider instead of raw `Microsoft.Data.Sqlite` (see ef-core-sqlite-provider.md); EF Core's SQLite provider itself is built on `Microsoft.Data.Sqlite`.

## Related

- [EF Core SQLite provider](./ef-core-sqlite-provider.md)
- [Application data storage locations](./application-data-storage.md)
