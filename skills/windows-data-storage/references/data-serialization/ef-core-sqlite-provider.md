# EF Core SQLite provider

The Entity Framework Core database provider that allows EF Core to target SQLite. It is maintained as part of the Entity Framework Core project and is built on top of `Microsoft.Data.Sqlite`. Use it when you want an object-relational mapper (change tracking, LINQ queries, migrations) over a local SQLite database instead of writing raw ADO.NET commands.

## Signature / Usage

```csharp
// Install: dotnet add package Microsoft.EntityFrameworkCore.Sqlite

using Microsoft.EntityFrameworkCore;
using Windows.Storage;

public class AppDbContext : DbContext
{
    public DbSet<Note> Notes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        string dbPath = System.IO.Path.Combine(
            ApplicationData.Current.LocalFolder.Path, "notes.db");
        options.UseSqlite($"Data Source={dbPath}");
    }
}

public class Note
{
    public int Id { get; set; }
    public string Text { get; set; }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Microsoft.EntityFrameworkCore.Sqlite` | NuGet package | Installs the EF Core SQLite provider. |
| `DbContextOptionsBuilder.UseSqlite(connectionString)` | extension method | Configures the `DbContext` to use SQLite with the given connection string. |
| `DbContext.SaveChanges()` / `SaveChangesAsync()` | method | Persists tracked entity changes to the SQLite file. |
| `Database.Migrate()` / `EnsureCreated()` | method | Applies EF Core migrations, or creates the schema directly without migrations. |

## Notes

- Supported database engine: SQLite 3.46.1 onward.
- Use `Entity Framework Core` when you want change tracking, LINQ-to-Entities queries, and migrations; use plain `Microsoft.Data.Sqlite` for lightweight direct ADO.NET access (see sqlite-data-access.md) when an ORM's overhead is unnecessary.
- The connection string points at a file path; place the `.db` file under `ApplicationData.Current.LocalFolder` (or `LocalCacheFolder` for regenerable data) for packaged Windows apps.
- Per "Connect a WinUI app to a database": a context that stores its database under `Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData)` works for both packaged and unpackaged desktop apps (unlike `ApplicationData.Current.LocalFolder`, which is for packaged apps). "Don't write a database into the installed application directory."
- `Database.EnsureCreatedAsync()` "bypasses migrations and isn't suitable for evolving a production schema in place". Use EF Core migrations when data must survive schema changes, test upgrades from every supported deployed version, and define a recovery strategy for migration failures.
- `DbContext` isn't thread-safe: create a short-lived `DbContext` per unit of work. Use async APIs and don't block the UI thread with `.Result` or `.Wait()`.
- Keep provider package versions on a supported servicing release. The EF Core provider model supports SQL Server, SQLite, PostgreSQL, MySQL, MariaDB, Oracle, and other databases; migrations, SQL features, and type behavior can differ by provider.
- See the SQLite provider's limitations page (`/ef/core/providers/sqlite/limitations`) for known gaps versus other relational providers (e.g. limited `ALTER TABLE` support, some LINQ translations).

## Related

- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
- [Application data storage locations](./application-data-storage.md)
- [Connect a WinUI app to a database](./connect-winui-app-to-database.md)
