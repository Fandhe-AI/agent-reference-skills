---
source: https://orm.drizzle.team/docs/perf-serverless
---

# Drizzle Serverless performance

Serverless functions like AWS Lambda or Vercel Server Functions (AWS Lambda based) can live up to 15 minutes and reuse both database connections and prepared statements, giving large performance benefits. Edge functions, by contrast, tend to clean up immediately after invocation, so there is little to no benefit there.

## Signature / Usage

```ts
const databaseConnection = ...;
const db = drizzle({ client: databaseConnection });
const prepared = db.select().from(...).prepare();

// AWS handler
export const handler = async (event: APIGatewayProxyEvent) => {
  return prepared.execute();
}
```

## Notes

- Declare the database connection and prepared statements outside of the handler scope so they are reused across invocations
- Transcribed from `perf-serverless.mdx`, which lives at the docs root (`src/content/docs/`), not under `pg/` — dialect-independent page

## Related

- [Queries performance](./perf-queries.md)
- [Read Replicas](./read-replicas.md)
