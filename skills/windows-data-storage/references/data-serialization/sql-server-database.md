# SQL Server database (Microsoft.Data.SqlClient)

Tutorial for connecting a Windows App SDK app directly to a SQL Server database and storing/retrieving data with classes in the `Microsoft.Data.SqlClient` namespace. Intended for learning, prototypes, and controlled environments.

## Signature / Usage

```csharp
using Microsoft.Data.SqlClient;

public async Task<ObservableCollection<Product>> GetProductsAsync(string connectionString)
{
    const string GetProductsQuery = "select ProductID, ProductName, QuantityPerUnit," +
       " UnitPrice, UnitsInStock, Products.CategoryID " +
       " from Products inner join Categories on Products.CategoryID = Categories.CategoryID " +
       " where Discontinued = 0";

    var products = new ObservableCollection<Product>();
    try
    {
        using (var conn = new SqlConnection(connectionString))
        {
            await conn.OpenAsync();
            if (conn.State == System.Data.ConnectionState.Open)
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = GetProductsQuery;
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var product = new Product();
                            product.ProductID = reader.GetInt32(0);
                            product.ProductName = reader.GetString(1);
                            product.QuantityPerUnit = reader.GetString(2);
                            product.UnitPrice = reader.GetDecimal(3);
                            product.UnitsInStock = reader.GetInt16(4);
                            product.CategoryId = reader.GetInt32(5);
                            products.Add(product);
                        }
                    }
                }
            }
        }
        return products;
    }
    catch (Exception eSql)
    {
        Debug.WriteLine($"Exception: {eSql.Message}");
    }
    return null;
}
```

## Options / Props

| Step | Detail |
|------|--------|
| Install package | `Install-Package Microsoft.Data.SqlClient` (Package Manager Console) |
| Capability: Enterprise Authentication | Select in `Package.appxmanifest` Capabilities tab when using Windows Authentication |
| Capabilities: network | Also select Internet (Client & Server), Internet (Client), and Private Networks (Client & Server), regardless of Windows Authentication |
| Connection string (sample) | `Data Source=.\SQLEXPRESS;Initial Catalog=NORTHWIND;Integrated Security=SSPI;Encrypt=True;TrustServerCertificate=True` exposed as `App.ConnectionString` |
| Bind to UI | `InventoryList.ItemsSource = await GetProductsAsync((App.Current as App).ConnectionString);` inside an async method (e.g. `LoadProductsAsync`) started after `InitializeComponent()`, with a `ListView` whose `DataTemplate` uses `x:Bind` to a `Product` class implementing `INotifyPropertyChanged` |

## Notes

- The official tutorial calls the synchronous `GetProducts` from the `MainWindow` constructor; this page shows an async version (`OpenAsync` / `ExecuteReaderAsync` / `ReadAsync`) to avoid blocking the UI thread until the connection timeout.
- For enterprise line-of-business apps using shared production data, prefer an authenticated service layer that owns database access (see connect-winui-app-to-database.md).
- Connection strings and other secrets must never be hard-coded in production; store them in app configuration (e.g. Azure App Configuration).
- The sample connection string trusts the local SQL Server Express certificate for development. In production, install a verifiable server certificate and set `TrustServerCertificate=False`.
- The sample uses the Northwind sample database (scripts for Northwind and pubs are in the SQL Server Samples GitHub repository); the default instance name `SQLEXPRESS` is assumed.
- Trouble connecting: enable TCP/IP for SQL Server (Computer Management console) and make sure the SQL Server Browser service is running.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/data-access/sql-server-database

## Related

- [Data access in Windows apps](./data-access-overview.md)
- [Connect a WinUI app to a database](./connect-winui-app-to-database.md)
- [SQLite data access (Microsoft.Data.Sqlite)](./sqlite-data-access.md)
