# Cosmos DB database (Microsoft.Azure.Cosmos)

Steps to work with an Azure Cosmos DB for NoSQL database from a WPF, Windows Forms, or WinUI app, with a sample that creates a container, writes an item, and queries it.

## Signature / Usage

```csharp
using Microsoft.Azure.Cosmos;

public async Task CosmosSample(string endpoint, string authKey)
{
    // CONNECT
    var client = new CosmosClient(
        accountEndpoint: endpoint,
        authKeyOrResourceToken: authKey
    );
    Database database = client.GetDatabase("sample_customers");
    ContainerProperties properties = new(
        id: "customers",
        partitionKeyPath: "/location"
    );
    Container container = await database.CreateContainerIfNotExistsAsync(properties);

    // WRITE DATA
    string customerId = "1234";
    string state = "WA";
    var customer = new
    {
        id = customerId,
        name = "John Doe",
        location = state
    };
    var createResponse = await container.CreateItemAsync(customer);
    Console.WriteLine($"[Status code: {createResponse.StatusCode}]\t{customerId}");

    // READ DATA
    string sql = "SELECT * FROM customers c WHERE c.id = @id";
    var query = new QueryDefinition(
        query: sql
    ).WithParameter("@id", customerId);
    using var feed = container.GetItemQueryIterator<dynamic>(queryDefinition: query);
    var queryResponse = await feed.ReadNextAsync();
    Console.WriteLine($"[Status code: {queryResponse.StatusCode}]\t{customerId}");
}
```

## Options / Props

| Step | Detail |
|------|--------|
| Install package | `Install-Package Microsoft.Azure.Cosmos` (Azure Cosmos DB for NoSQL client library for .NET) |
| Prerequisite | A Cosmos DB for NoSQL account created in Azure, plus a database named `sample_customers` (or your own name) — `GetDatabase` only returns a reference and does not create the database |
| Customize | Endpoint, auth key, and database name depend on your Cosmos DB instance |

## Notes

- `client.GetDatabase(...)` returns a proxy to an existing database and does not create it; on a new account, create the database first (for example in the Azure portal) or use `await client.CreateDatabaseIfNotExistsAsync("sample_customers")`, otherwise `CreateContainerIfNotExistsAsync` fails because the database does not exist.
- `CosmosClient` implements `IDisposable` and is meant to be created once and reused for the lifetime of the app (receive it via DI or a parameter; the owner disposes it at shutdown). Creating a client per call, as this single-shot demo does, should be limited to demos.
- Build the project after installing the package and confirm no errors.
- For a complete example including required Cosmos DB setup, see the official "Develop a .NET console application with Azure Cosmos DB for NoSQL" tutorial.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/data-access/cosmos-db-data-access

## Related

- [Data access in Windows apps](./data-access-overview.md)
- [MySQL database](./mysql-database.md)
