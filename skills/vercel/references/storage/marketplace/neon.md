# Neon Postgres

Serverless PostgreSQL on the Vercel Marketplace. Provides database branching, autoscaling, and scale-to-zero for cost efficiency.

## Provision

```bash
vercel install neon
vercel install neon --name my-db --plan free -e production -e preview
```

Or via Dashboard: Marketplace > Neon > Install.

## Key Features

| Feature | Description |
|---------|-------------|
| Database branching | Create branches for preview deployments and development |
| Autoscaling | Scales compute up/down with load |
| Scale-to-zero | Compute pauses when idle to reduce cost |
| Read replicas | Horizontal read scaling |
| Point-in-time recovery | Restore to any previous state |
| Time travel queries | Query historical data |
| Serverless driver | Low-latency HTTP-based driver for edge/serverless |

## Environment Variables (auto-injected)

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Pooled connection string (recommended for serverless) |
| `POSTGRES_URL_NON_POOLING` | Direct connection string |
| `POSTGRES_HOST` | Database host |
| `POSTGRES_DATABASE` | Database name |
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |

## Connecting

```ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL!);
const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
```

For pooled connections with Prisma, Drizzle, or other ORMs, use `POSTGRES_URL`.

## Database Browser (Vercel Dashboard)

Supported. Access via **Project > Storage > your Neon database > Browser**:

- **Query**: SQL editor with CSV/JSON/Markdown export
- **Data**: Table editor (sort, edit, insert, delete rows)
- **Schema**: Visual graph of tables and relations

## Plans

- Free tier available
- Pay-as-you-go and fixed plans at [neon.tech/pricing](https://neon.tech/pricing)
- Billing managed through Vercel

## Integration Modes

- **Create New Neon Account**: Fresh account, billing through Vercel
- **Link Existing Neon Account**: Connect existing Neon database, create branches for preview deployments

## Notes

- Use `POSTGRES_URL` (pooled) for serverless Functions to avoid connection exhaustion
- Deploy database in the same region as your Vercel Functions

## Related

- [Marketplace Overview](./overview.md)
- [Upstash Redis](./upstash.md)
- [Supabase](./supabase.md)
