---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/overview
---

# Firestore with MongoDB compatibility overview

Firestore with MongoDB compatibility lets you use existing MongoDB application code, drivers, tools, and the open-source ecosystem of MongoDB integrations with Firestore. It is available as part of Firestore Enterprise edition. Data is stored in documents (fields mapping to values) held in collections, and queried with a standard MongoDB driver or the MongoDB Query Language (MQL).

## Signature / Usage

### Insert and read a document (mongosh)

```javascript
db.pages.insertOne({ message: "Hello World!"})
db.pages.find({})
exit
```

## Options / Props

| Capability | Description |
| --- | --- |
| MongoDB compatibility | MongoDB compatible API; use Firestore as the database for existing MongoDB applications. |
| Serverless | Pay-per-use; no pre-provisioning; auto scales to match load. |
| Virtually unlimited scale | Compute and storage scale on demand without configuring capacity, sharding or provisioning storage and I/O. |
| High availability | 99.99% availability for regional and 99.999% for multi-regional deployments; automatic multi-region replication, strongly-consistent queries, atomic batch operations, transaction support. |
| Read latency | Single digit millisecond read latency. |
| Security and monitoring | IAM, VPC Service Controls (VPC-SC), Access Transparency, Access Approval, Cloud Monitoring, Cloud Logging, Database Center. |

## Notes

- Requires Firestore Enterprise edition.
- Integrated with Identity and Access Management (IAM), Cloud Monitoring, and Cloud Audit Logs.
- Distinct from Google Cloud's other Firestore modes (Native mode, Datastore mode), from Supabase Postgres (`supabase`) and from Cloudflare KV / D1 (`cloudflare-storage`). Firebase client-side setup is out of scope.
- Snippet taken from https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/create-and-query-database (the overview page itself has no code).
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/create-and-query-database

## Related

- [create-and-query-database.md](./create-and-query-database.md)
- [connect.md](./connect.md)
- [behavior-differences.md](./behavior-differences.md)
- [supported-data-types-drivers.md](./supported-data-types-drivers.md)
