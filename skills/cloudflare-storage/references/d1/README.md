# d1

| Name | Description | Path |
| --- | --- | --- |
| Cloudflare D1 | Serverless SQLite-semantics database overview | [overview.md](./overview.md) |
| Getting started | Create a database, bind it to a Worker, query it | [get-started.md](./get-started.md) |
| Workers Binding API | Query D1 from a Worker; TypeScript support and type conversion | [worker-binding-api.md](./worker-binding-api.md) |
| D1Database | `prepare`, `batch`, `exec`, `dump`, `withSession` and D1DatabaseSession | [d1-database.md](./d1-database.md) |
| Prepared statement methods | `bind`, `run`, `raw`, `first` | [prepared-statements.md](./prepared-statements.md) |
| Return objects | `D1Result` and `D1ExecResult` shapes | [return-objects.md](./return-objects.md) |
| SQL statements | Supported SQL, SQLite extensions and PRAGMAs | [sql-statements.md](./sql-statements.md) |
| Define foreign keys | Foreign key constraints, actions, deferring | [foreign-keys.md](./foreign-keys.md) |
| Query JSON | SQLite JSON functions and operators | [query-json.md](./query-json.md) |
| Generated columns | VIRTUAL and STORED generated columns | [generated-columns.md](./generated-columns.md) |
| Wrangler commands | `wrangler d1` commands and flags | [wrangler-commands.md](./wrangler-commands.md) |
| Query a database | Binding API, REST API and Wrangler ways to query | [query-d1.md](./query-d1.md) |
| Import and export data | Import SQL files, convert SQLite dumps, export | [import-export-data.md](./import-export-data.md) |
| Local development | `wrangler dev`, Miniflare, `unstable_dev` testing | [local-development.md](./local-development.md) |
| Remote development | Develop against D1 in the dashboard playground | [remote-development.md](./remote-development.md) |
| Global read replication | Read replicas and the Sessions API | [read-replication.md](./read-replication.md) |
| Retry queries | Retry transient errors with backoff | [retry-queries.md](./retry-queries.md) |
| Use indexes | Create, test and design indexes | [use-indexes.md](./use-indexes.md) |
| Data location | Location hints and jurisdictions | [data-location.md](./data-location.md) |
| Environments | Per-environment D1 bindings in Wrangler config | [environments.md](./environments.md) |
| Migrations | SQL migration files and Wrangler migration config | [migrations.md](./migrations.md) |
| Time Travel and backups | Point-in-time recovery with bookmarks | [time-travel.md](./time-travel.md) |
| Backups (Legacy) | Snapshot backups for alpha databases | [backups-legacy.md](./backups-legacy.md) |
| Debug D1 | Error list, automatic retries, binding timeouts | [debug-d1.md](./debug-d1.md) |
| Metrics and analytics | Dashboard metrics, GraphQL API, `d1 insights` | [metrics-analytics.md](./metrics-analytics.md) |
| Find slow and expensive queries | Locate costly queries and fix with index, cache, batch | [find-expensive-queries.md](./find-expensive-queries.md) |
| Billing | Billable usage metrics and notifications | [billing.md](./billing.md) |
| Audit Logs | Logged D1 configuration operations | [audit-logs.md](./audit-logs.md) |
| Pricing | Rows read/written, storage and database pricing | [pricing.md](./pricing.md) |
| Limits | Account and database limits, throughput guidance | [limits.md](./limits.md) |
| Release notes | D1 changes over time | [release-notes.md](./release-notes.md) |
| Alpha database migration guide | Move alpha databases to the production backend | [alpha-migration.md](./alpha-migration.md) |
| Data security | Encryption at rest and in transit | [data-security.md](./data-security.md) |
| FAQs | Condensed pricing and limits questions | [faq.md](./faq.md) |
| Glossary | D1 terminology | [glossary.md](./glossary.md) |
| Community projects | Community ORMs, query builders and tools | [community-projects.md](./community-projects.md) |
