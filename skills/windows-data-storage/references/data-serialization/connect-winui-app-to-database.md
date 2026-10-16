# Connect a WinUI app to a database

Guidance for line-of-business apps that store data on the device, call an enterprise service, or combine both for offline use. Keep database code outside the UI layer so it can be tested, failures handled consistently, and providers changed without rewriting the view.

## Signature / Usage

```csharp
public sealed class TaskDbContext : DbContext
{
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        string folder = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "DatabaseAccess");
        Directory.CreateDirectory(folder);

        string databasePath = Path.Combine(folder, "tasks.db");
        options.UseSqlite($"Data Source={databasePath}");
    }
}

public async Task<List<TaskItem>> GetAllAsync()
{
    await using var db = new TaskDbContext();
    return await db.Tasks
        .AsNoTracking()
        .OrderBy(task => task.DueDate)
        .ToListAsync();
}
```

## Options / Props

| Scenario | Starting point |
|----------|----------------|
| Local settings, records, or cache | SQLite, optionally through EF Core |
| Enterprise data shared by multiple users | An authenticated HTTPS API that owns database access |
| Direct access in a controlled environment | A supported database client or EF Core provider, with authentication and authorization reviewed for that environment |
| Read-only service data | `HttpClient` and JSON deserialization, with a local cache if offline access is required |

## Notes

- Don't embed a shared database password or privileged connection string in a desktop app; a user can inspect files and application memory on a device they control.
- EF Core's provider model supports SQL Server, SQLite, PostgreSQL, MySQL, MariaDB, Oracle, and others; migrations, SQL features, and type behavior can differ by provider. Install the provider package, e.g. `dotnet add package Microsoft.EntityFrameworkCore.Sqlite`.
- The example context stores its database under the current user's local application-data folder, which works for packaged and unpackaged desktop apps. Don't write a database into the installed application directory.
- `Database.EnsureCreatedAsync()` suits a prototype or a recreatable database; it bypasses migrations. Use EF Core migrations to preserve data across schema versions, test upgrades from every supported deployed version, and define a recovery strategy.
- Use asynchronous database and network APIs; don't block the UI thread with `.Result`, `.Wait()`, or synchronous network calls. Async APIs don't guarantee background-thread execution for every provider. Update an `ObservableCollection<T>` on the UI thread; use `DispatcherQueue` only when control returns on another thread.
- Create a short-lived `DbContext` per unit of work; `DbContext` isn't thread-safe.
- Offline synchronization is an application protocol, not an EF Core feature. Define stable record identifiers and a server version or change token, which operations can be queued offline, conflict detection and resolution, how authorization changes affect cached data, and encryption, retention, and sign-out behavior for sensitive local records.
- Prefer user identity, managed authentication, and short-lived tokens over stored passwords. Don't put secrets in source code or checked-in configuration; if a credential must be retained, use a Windows credential-protection API (Credential Locker) and verify behavior for your deployment model rather than assuming credentials roam between devices.

## Related

- [Data access in Windows apps](./data-access-overview.md)
- [EF Core SQLite provider](./ef-core-sqlite-provider.md)
- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
