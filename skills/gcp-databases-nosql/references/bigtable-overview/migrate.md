---
source: https://docs.cloud.google.com/bigtable/docs/migrate
---

# Migrate data to Bigtable

Guidelines and links for planning a migration to Bigtable from other database services, covering online replication and offline methods.

## Signature / Usage

### Migration guides by source system

- HBase: online migration with almost no downtime using the Bigtable HBase replication library, or offline migration from an Apache HBase cluster.
- Cassandra: similarities and differences, open-source tooling with Cassandra Query Language (CQL) syntax, and a codelab.
- DynamoDB: comparison guide and a Google-provided migration utility.
- Aerospike: migration tutorial.
- Vertex AI Feature Store (Legacy): migration overview.

### Create the destination instance

Example from the gcloud reference:

```bash
gcloud bigtable instances create my-instance-id \
    --display-name="My Instance" \
    --cluster-config=id=my-cluster-id,zone=us-east1-c
```

## Options / Props

| Source system | Guide | URL |
|---------------|-------|-----|
| HBase (online) | Replicate from HBase to Bigtable | https://docs.cloud.google.com/bigtable/docs/hbase-replication |
| HBase (offline) | Migrating data from HBase to Bigtable offline | https://docs.cloud.google.com/bigtable/docs/migrate-hbase-data-to-bigtable |
| Cassandra | Bigtable for Cassandra users | https://docs.cloud.google.com/bigtable/docs/cloud-bigtable-for-cassandra-users |
| Cassandra | Migrating from Cassandra | https://docs.cloud.google.com/bigtable/docs/migrate-from-cassandra |
| Cassandra | Codelab | https://codelabs.developers.google.com/codelabs/cbt-for-cassandra/index.html#0 |
| DynamoDB | Migrate from DynamoDB to Bigtable | https://docs.cloud.google.com/bigtable/docs/dynamodb-users |
| DynamoDB | Migration utility | https://github.com/GoogleCloudPlatform/professional-services/tree/main/tools/dynamodb-bigtable-migration#bigtable-data-bridge---dynamodb-to-bigtable-migration-utility |
| Aerospike | Migrate from Aerospike to Bigtable | https://docs.cloud.google.com/bigtable/docs/migrate-aerospike-to-bigtable |
| Vertex AI Feature Store (Legacy) | Migrate to Bigtable | https://docs.cloud.google.com/bigtable/docs/migrate-vertex-ai-legacy-bigtable |

## Notes

- For HBase migrations, Google-provided open source tools assist with data migration and validation.
- Next steps named by the source: import and export (https://docs.cloud.google.com/bigtable/docs/import-export) and choosing between SSD and HDD storage.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create (the migrate page has no code block).
- Source: https://docs.cloud.google.com/bigtable/docs/migrate (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [choosing-ssd-hdd.md](./choosing-ssd-hdd.md)
