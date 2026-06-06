# Storage

| Name | Description | Path |
|------|-------------|------|
| Storage Overview | Product comparison (Blob vs Edge Config vs Marketplace), best practices, transfers | [overview.md](./overview.md) |
| **Vercel Blob** | | |
| Blob Overview | Access modes, authentication, caching, limits, durability | [vercel-blob/overview.md](./vercel-blob/overview.md) |
| @vercel/blob SDK | put, get, del, head, list, copy, multipart, client uploads API | [vercel-blob/blob-sdk.md](./vercel-blob/blob-sdk.md) |
| Private Storage | Authentication, serving via Functions, caching, conditional requests | [vercel-blob/private-storage.md](./vercel-blob/private-storage.md) |
| Public Storage | Direct URLs, next/image, caching, SEO, download charges | [vercel-blob/public-storage.md](./vercel-blob/public-storage.md) |
| Server Upload | Upload from Vercel Functions and Server Actions | [vercel-blob/server-upload.md](./vercel-blob/server-upload.md) |
| Client Upload | Browser-direct uploads with handleUpload() and upload() | [vercel-blob/client-upload.md](./vercel-blob/client-upload.md) |
| Blob Pricing | Billing dimensions, operation rate limits, size limits | [vercel-blob/pricing.md](./vercel-blob/pricing.md) |
| **Edge Config** | | |
| Edge Config Overview | Use cases, architecture, latency, getting started | [edge-config/overview.md](./edge-config/overview.md) |
| @vercel/edge-config SDK | get, getAll, has, digest, createClient | [edge-config/edge-config-sdk.md](./edge-config/edge-config-sdk.md) |
| Vercel REST API | Create, update items (PATCH), read, list Edge Configs; create tokens | [edge-config/vercel-api.md](./edge-config/vercel-api.md) |
| Using Edge Config | Connection strings, read tokens, backups, Middleware example | [edge-config/using-edge-config.md](./edge-config/using-edge-config.md) |
| Edge Config Limits | Store size, store count, key length, propagation, pricing by plan | [edge-config/limits.md](./edge-config/limits.md) |
| **Marketplace Storage** | | |
| Marketplace Overview | Provisioning via CLI/dashboard, database browser, choosing providers | [marketplace/overview.md](./marketplace/overview.md) |
| Neon Postgres | Serverless Postgres with branching, autoscaling, scale-to-zero | [marketplace/neon.md](./marketplace/neon.md) |
| Upstash | Redis, Vector, QStash, Search | [marketplace/upstash.md](./marketplace/upstash.md) |
| Supabase | Postgres + Auth + Storage + Realtime | [marketplace/supabase.md](./marketplace/supabase.md) |
