# MongoDB database (MongoDB.Driver)

Steps to connect a WPF, Windows Forms, or WinUI app directly to a MongoDB database using the official `MongoDB.Driver` package.

## Signature / Usage

```csharp
using MongoDB.Bson;
using MongoDB.Driver;

var client = new MongoClient("mongodb://10.xxx.xx.xxx:27017");
IMongoDatabase database = client.GetDatabase("foo");
IMongoCollection<BsonDocument> collection = database.GetCollection<BsonDocument>("bar");
var document = new BsonDocument
{
     { "name","MongoDB"},
     { "type","Database"},
     { "count",1},
     { "info",new BsonDocument { { "x", 203 }, { "y", 102 } }}
};
collection.InsertOne(document);
long count = collection.CountDocuments(document);
Console.WriteLine(count);
IFindFluent<BsonDocument, BsonDocument> document1 = collection.Find(document);
Console.WriteLine(document1.ToString());
```

## Options / Props

| Step | Detail |
|------|--------|
| Install package | `Install-Package MongoDB.Driver` (official driver for MongoDB) |
| Customize | IP address and database name; 27017 is the default MongoDB port |

## Notes

- In production, store connection information such as server address and database name in app configuration (e.g. Azure App Configuration) rather than hard-coding it.

## Related

- [Data access in Windows apps](./data-access-overview.md)
- [SQL Server database](./sql-server-database.md)
- [MySQL database](./mysql-database.md)
