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
- **Caching strategy**: Use [Data Cache](https://vercel.com/docs/runtime-cache/data-cache) or [Edge Config](../edge-config/overview.md) to reduce database load
- **Secrets**: Store credentials only in environment variables, never in code
- Use SSL/TLS connections

## Transferring Resources

Transfer a Marketplace resource to another team from the resource's **Settings** page. See Vercel docs: [Transfer a resource to another team](https://vercel.com/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team).

## Related

- [Neon Postgres](./neon.md)
- [Upstash Redis](./upstash.md)
- [Supabase](./supabase.md)
