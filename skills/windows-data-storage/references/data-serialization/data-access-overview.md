# Data access in Windows apps

Overview of storing and retrieving data in a Windows app: a local SQLite database on the device, or a database client library when the app runs in a controlled environment where direct database access is acceptable.

## Signature / Usage

```text
dotnet add package Microsoft.EntityFrameworkCore.Sqlite   # local SQLite via EF Core
Install-Package Microsoft.Data.SqlClient                  # SQL Server
Install-Package Microsoft.Azure.Cosmos                    # Cosmos DB
Install-Package MySql.Data                                # MySQL
Install-Package MongoDB.Driver                            # MongoDB
```

## Options / Props

| Topic | Description |
|-------|-------------|
| Use a SQLite database on Windows | SQLite is a server-less, embedded database engine; light-weight storage on the user's device. |
| Use a SQL Server database in a Windows app | Direct connection with classes in the `Microsoft.Data.SqlClient` namespace. Use direct database access only when it fits your deployment and security model. |
| Use a Cosmos DB database in a Windows app | Cloud-based document database; test the connection programmatically. |
| Use a MySQL database in a Windows app | Open source, cross-platform relational database. |
| Use a MongoDB database in a Windows app | Cross-platform document database; test the connection programmatically. |

## Notes

- For enterprise line-of-business apps that access shared data, prefer an authenticated service layer that owns database access. A service boundary centralizes authorization, validation, auditing, versioning, and credential protection.
- Don't embed shared database credentials or privileged connection strings in a desktop client.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/data-access/

## Related

- [Connect a WinUI app to a database](./connect-winui-app-to-database.md)
- [SQL Server database](./sql-server-database.md)
- [Cosmos DB data access](./cosmos-db-data-access.md)
- [MySQL database](./mysql-database.md)
- [MongoDB database](./mongodb-database.md)
- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
