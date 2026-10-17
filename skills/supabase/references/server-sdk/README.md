# server-sdk

| Name | Description | Path |
| --- | --- | --- |
| Adapters (deprecated) | `@supabase/server/adapters/*` の framework adapter。deprecated で 2026-12-01 に削除される… | [adapters.md](./adapters.md) |
| Errors | `@supabase/server` が生成する全エラー型とエラーコード。 | [errors.md](./errors.md) |
| Framework bridges | `@supabase/server` の middleware を Hono / H3 (Nuxt) / Elysia / NestJS / TanStack… | [frameworks.md](./frameworks.md) |
| Middleware | `@supabase/server` の middleware / entry 群。`withSupabase` 以外は `pipeline([...], handler)`… | [middleware.md](./middleware.md) |
| Moving off the adapters | `@supabase/server/adapters/*`（Hono / H3 / Elysia / NestJS）から `@supabase/middleware` entry… | [migrating-off-adapters.md](./migrating-off-adapters.md) |
| @supabase/server 概要 | サーバーサイド JavaScript 環境でリクエストを認証するフレームワーク非依存ライブラリ。JWT 検証… | [overview.md](./overview.md) |
| Primitives | framework 非依存の低レベル関数（`@supabase/server/core`）。カスタムフレームワークや edge runtime で… | [primitives.md](./primitives.md) |
| Types | `@supabase/server` の公開型。auth mode・設定・context・claims など。 | [types.md](./types.md) |
