---
source: https://docs.cloud.google.com/firestore/native/docs/overview
---

# Firestore overview

Firestore is an enterprise-grade, fully-managed document database from Google Cloud with multi-region data replication, advanced query capabilities, and ACID compliant transactions. It has a 99.999% availability SLA and disaster recovery features such as managed backups. It offers idiomatic client libraries and a MongoDB-compatible API, and optionally integrates with the Firebase platform.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/firestore/native/docs/data-model (Node.js document reference; the overview page itself has no code).

```javascript
const alovelaceDocumentRef = db.collection('users').doc('alovelace');
```

## Options / Props

### Key capabilities

| Capability | Description |
|---|---|
| Serverless infrastructure | Pay-per-use model. No pre-provisioning of resources; auto scales to match load. |
| Virtually unlimited scale | Scales compute and storage on demand without configuring capacity, sharding or provisioning storage \& I/O. |
| High availability | 99.99% availability for regional and 99.999% for multi-regional deployments. Automatic multi-region replication, strongly-consistent queries, atomic batch operations, transaction support. |
| Low latency | Single digit millisecond read latency. |
| Security and monitoring | IAM, VPC Service Controls (VPC-SC), Access Transparency, Access Approval, Cloud Monitoring, Cloud Logging, and Database Center for fleet-wide visibility. |

### Choosing an interface

| Goal | Use | Start |
|---|---|---|
| Enterprise-grade serverless document database | Firestore database with Firestore client libraries, Google Cloud CLI, Google Cloud console | https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library |
| Migrate a MongoDB application | Firestore with MongoDB compatibility; MongoDB client libraries and tools (`mongosh`, `mongoimport`, Compass). Wire-compatible APIs allow lift-and-shift. | https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/supported-features-80 |
| Web / mobile app with a zero-config backend (BaaS) | Firestore integrated with the Firebase platform (Firebase SDKs and console) | https://firebase.google.com/docs/firestore |
| Port a legacy Datastore app | Firestore with Datastore compatibility and the Datastore client libraries | https://docs.cloud.google.com/datastore/docs/store-query-data |

## Notes

- Datastore compatibility is an API layer on top of Firestore with the same availability, performance, consistency and scalability; beyond better App Engine integration it offers no benefit over using Firestore directly.
- If enterprise architecture and governance require fine-grained control over the stack, the source recommends working directly with individual Google Cloud products such as Firestore rather than Firebase.
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Firebase client-side setup is out of scope of this skill.
- Source: https://docs.cloud.google.com/firestore/native/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/firestore/native/docs/data-model (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [editions-overview.md](./editions-overview.md)
- [firestore-or-datastore.md](./firestore-or-datastore.md)
- [data-model.md](./data-model.md)
