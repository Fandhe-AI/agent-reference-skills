# MySQL database (MySql.Data)

Steps to read from a MySQL database from a WPF, Windows Forms, or WinUI app using the `MySql.Data` package.

## Signature / Usage

```csharp
using MySql.Data.MySqlClient;

const string M_str_sqlcon = "Server=myServerAddress;Database=myDataBase;IntegratedSecurity=yes;Uid=auth_windows;";
using (var mySqlCn = new MySqlConnection(M_str_sqlcon))
{
    using (var mySqlCmd = new MySqlCommand("select * from table1", mySqlCn))
    {
        mySqlCn.Open();
        using (MySqlDataReader mySqlReader = mySqlCmd.ExecuteReader(CommandBehavior.CloseConnection))
        {
            while (mySqlReader.Read())
            {
                Debug.WriteLine($"{mySqlReader.GetString(0)}:{mySqlReader.GetString(1)}");
            }
        }
    }
}
```

## Options / Props

| Step | Detail |
|------|--------|
| Install package | `Install-Package MySql.Data` (MySQL core class library) |
| Customize | Server address and database name in the connection string |

## Notes

- MySQL Connector/NET version 6.4.4 or later is required to use the `MySql.Data` package with Windows authentication.
- Connection strings and other secrets should not be hard-coded in production; store them in app configuration (e.g. Azure App Configuration).
- The page also shows a GitHub Copilot Chat prompt for generating a MySQL connection string: "Show me how to create a MySQL connection string to a server named myServerAddress and a database called myDatabase. Use Windows authentication."

## Related

- [Data access in Windows apps](./data-access-overview.md)
- [SQL Server database](./sql-server-database.md)
