---
source: https://orm.drizzle.team/docs/connect-aws-data-api-pg
---

# Drizzle <> AWS Data API Postgres

Drizzle ORM supports Aurora PostgreSQL over the AWS Data API via the `drizzle-orm/aws-data-api/pg` package, built on `@aws-sdk/client-rds-data`.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/aws-data-api/pg';

// database, secretArn, resourceArn are required.
// Any property from the RDSDataClient type can also be specified.
const db = drizzle({
  connection: {
    database: process.env['DATABASE']!,
    secretArn: process.env['SECRET_ARN']!,
    resourceArn: process.env['RESOURCE_ARN']!,
  },
});

await db.select().from(/* ... */);
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/aws-data-api/pg';
import { RDSDataClient } from '@aws-sdk/client-rds-data';

const rdsClient = new RDSDataClient({ region: 'us-east-1' });

const db = drizzle({
  client: rdsClient,
  database: process.env['DATABASE']!,
  secretArn: process.env['SECRET_ARN']!,
  resourceArn: process.env['RESOURCE_ARN']!,
});

await db.select().from(/* ... */);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `database` | `string` | Required. Aurora database name |
| `secretArn` | `string` | Required. ARN of the Secrets Manager secret with DB credentials |
| `resourceArn` | `string` | Required. ARN of the Aurora Serverless cluster |

## Notes

- Transcribed from `pg/connect-aws-data-api-pg.mdx`.

### rc.5 changes

- Migration (rc.4 → rc.5): array params are sent as `pg` array literals, object params as JSON with a `JSON` type hint, multidimensional array results are no longer returned as raw `ArrayValue` objects, `char(n)` params are no longer truncated by the `::char` cast, `inet` values no longer gain a full-width netmask, and `time({ withTimezone: true })` values keep their offset.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
