# Supabase

Open-source Firebase alternative on the Vercel Marketplace. Provides Postgres, authentication, storage, Edge Functions, and real-time subscriptions.

## Products

| Product | Description |
|---------|-------------|
| **Postgres** | Managed relational database with Row Level Security |
| **Auth** | User authentication with social providers, magic links, JWT |
| **Storage** | Object storage for user files |
| **Realtime** | WebSocket-based subscriptions to database changes |
| **Edge Functions** | Deno-based serverless functions |

## Provision

```bash
vercel install supabase
```

Or via Dashboard: Marketplace > Supabase > Install.

## Environment Variables (auto-injected, 13 total)

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Pooled Postgres connection string |
| `POSTGRES_HOST` | Database host |
| `POSTGRES_DATABASE` | Database name |
| `POSTGRES_USER` | Database user |
| `POSTGRES_PASSWORD` | Database password |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public API key (safe for client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin API key (server-side only) |
| `SUPABASE_JWT_SECRET` | JWT signing secret |

## Connecting (Supabase Client)

```ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

// Query
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId);

// Insert
await supabase.from('posts').insert({ title: 'Hello', content: '...' });

// Auth
const { data: { user } } = await supabase.auth.getUser();
```

## Connecting (Direct Postgres)

Use `POSTGRES_URL` with any Postgres client (Prisma, Drizzle, etc.) for direct SQL access.

## Database Browser (Vercel Dashboard)

Supported. Access via **Project > Storage > your Supabase database > Browser**:

- **Query**: SQL editor with CSV/JSON/Markdown export
- **Data**: Table editor (sort, edit, insert, delete rows)
- **Schema**: Visual graph of tables and relations

## Integration Modes

- **Vercel Native**: Create Supabase projects as Vercel Storage resources; consolidated billing through Vercel
- **External Integration**: Sync env vars from existing Supabase projects; auto-creates redirect URLs for preview branches

## Plans

- Free tier available (starting at $0)
- See [supabase.com/pricing](https://supabase.com/pricing)
- Billing managed through Vercel (native mode)

## Notes

- Use `SUPABASE_SERVICE_ROLE_KEY` only on the server — it bypasses Row Level Security
- Framework-specific prefixes (e.g., `NEXT_PUBLIC_*`) can be customized via the Supabase dashboard
- 1000+ installations on Vercel Marketplace

## Related

- [Marketplace Overview](./overview.md)
- [Neon Postgres](./neon.md)
- [Upstash](./upstash.md)
