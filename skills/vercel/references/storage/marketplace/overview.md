# Marketplace Storage

Storage integrations from third-party providers provisioned directly from the Vercel dashboard or CLI.

## Available Provider Types

| Type | Use Cases | Example Providers |
|------|-----------|-------------------|
| **Postgres** | Relational data, ACID transactions, complex queries, foreign keys | Neon, Supabase, Prisma Postgres, AWS Aurora Postgres |
| **Key-Value (Redis)** | Caching, session storage, rate limiting, leaderboards | Upstash Redis |
| **NoSQL** | Flexible schemas, document storage, high write throughput | MongoDB Atlas, DynamoDB |
| **Vector** | AI embeddings, semantic search, recommendations | Pinecone, etc. |

## How It Works

Installing a storage integration:

1. Installs the third-party integration on your Vercel team
2. Provisions the database resource
3. Connects the resource to your project
4. Injects credentials as **environment variables** automatically

## Provisioning via CLI

```bash
vercel install neon
vercel install upstash
vercel install supabase
```

With options (CI/scripted):

```bash
vercel install neon --name my-database --plan free -e production -e preview
```

Use `vercel install <name> --help` to see available plans and options for each provider.

## Provisioning via Dashboard

1. Go to [Vercel Marketplace](https://vercel.com/marketplace?category=storage)
2. Select integration > **Install**
3. Choose pricing plan
4. Configure database (name, region, etc.)
5. Connect to your project

## Managing Integrations

After installation, from the Vercel dashboard you can:

- View connected projects
- Monitor usage and costs
- Update configuration / upgrade plans
- Access the provider's own dashboard
- Browse and query databases (supported Postgres providers)
- Transfer resources to another team

## Database Browser (Supported Postgres Providers)

Available for: AWS Aurora Postgres, Neon, Prisma Postgres, Supabase.

Access: **Project > Storage > select database > Browser**.

| Tab | Capability |
|-----|-----------|
| **Query** | Run SQL queries; export results as CSV, JSON, or Markdown |
| **Data** | Spreadsheet interface; sort, edit, insert, delete rows (applied as single transaction) |
| **Schema** | Visual graph of tables and relations |

Requires **Owner** permissions.

## Redis in the Database Browser

The database browser also supports Redis integrations (Redis, Upstash for Redis; changelog "Vercel Marketplace database browser now supports Redis"):

- **CLI** tab: run Redis commands (redis-cli style) and inspect results; separate multiple commands with newlines or semicolons; `MULTI` / `EXEC` supported to run commands in a transaction
- **Browser** tab: list keys (optionally grouped by prefix) and filter by type and pattern; view values for String, JSON, Hash, List, Set and Sorted set types; inspect key metadata (type, TTL, encoding, size)

## Custom Environments for Native Integrations

Vercel can scope a Native Marketplace resource's project environment variables to an exact Custom Environment, e.g. a `staging` deployment using a staging database without adding the database variables to Production, Preview, or Development.

```bash
# Provision a resource and connect it to staging in the linked project
vercel integration add neon --environment staging

# Connect an existing resource to staging in the linked project
vercel integration resource connect my-database --environment staging

# Deploy to the Custom Environment
vercel deploy --target=staging
```

Repeat `--environment` to connect more environments. If you omit the option, the commands connect `production`, `preview`, and `development`; the default does not include Custom Environments. For a Custom Environment, Vercel first uses the provider's Preview secret value, or the default secret value if the provider set no Preview value. (changelog "Native Marketplace integrations now support custom environments", 2026-09-17)

## Choosing a Provider

| Factor | Guidance |
|--------|---------|
| Data model | Relational → Postgres; caching → Redis; flexible schema → NoSQL; AI → Vector |
| Latency | Deploy database in same region as your Functions |
| Scale | Evaluate provider pricing tiers and scaling limits |
| Features | Branching (Neon), point-in-time recovery, real-time subscriptions (Supabase) |

## Best Practices

- **Connection pooling**: In serverless, use built-in pooling or PgBouncer to manage database connections efficiently
- **Region alignment**: Deploy database in regions near your Functions
- **Caching strategy**: Use [Data Cache](https://vercel.com/docs/runtime-cache/data-cache) or [Global Config (formerly Edge Config)](../edge-config/overview.md) to reduce database load
- **Secrets**: Store credentials only in environment variables, never in code
- Use SSL/TLS connections

## Transferring Resources

Transfer a Marketplace resource to another team from the resource's **Settings** page. See Vercel docs: [Transfer a resource to another team](https://vercel.com/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team).

## Related

- [Neon Postgres](./neon.md)
- [Upstash Redis](./upstash.md)
- [Supabase](./supabase.md)
