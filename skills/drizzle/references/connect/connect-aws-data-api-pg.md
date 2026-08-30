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

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
