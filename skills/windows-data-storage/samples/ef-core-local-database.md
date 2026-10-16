---
source: https://learn.microsoft.com/en-us/windows/apps/get-started/line-of-business/connect-to-a-database
fetched: 2026-10-16
---

# EF Core Local Database

Use EF Core with SQLite for a per-user local database, queried with a short-lived `DbContext`.

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

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

Create the schema once at startup, before the first query (for example, awaited in `App.OnLaunched`). Prototype or recreatable database:

```csharp
await using (var db = new TaskDbContext())
{
    await db.Database.EnsureCreatedAsync();
}
```

Persistent data (migrations; requires the `Microsoft.EntityFrameworkCore.Design` package for the `dotnet ef` tooling):

```bash
dotnet ef migrations add InitialCreate
```

```csharp
await using (var db = new TaskDbContext())
{
    await db.Database.MigrateAsync();
}
```

## Notes

- `TaskItem` (with a `DueDate` property) is an app-defined entity; the source does not show its definition.
- The source describes `EnsureCreatedAsync` and migrations only in prose; the two startup snippets above are added here so a new `tasks.db` has its tables before `GetAllAsync` runs.
- Don't mix `EnsureCreatedAsync()` and `MigrateAsync()` on the same database. `EnsureCreatedAsync()` suits a prototype or a recreatable database and bypasses migrations. Use EF Core migrations when existing data must survive schema changes, and test upgrades from every supported deployed version.
- The context stores the database under `LocalApplicationData`, which works for packaged and unpackaged desktop apps. Don't write a database into the installed application directory.
- Offline sync is an application protocol, not an EF Core feature: define stable record identifiers and a server version or change token, which operations can be queued offline, and conflict resolution. Create a short-lived `DbContext` per unit of work (not thread-safe) and don't block the UI thread with `.Result` or `.Wait()`.
- For learning, prototypes, and controlled environments. For shared production data, use an authenticated service layer.
