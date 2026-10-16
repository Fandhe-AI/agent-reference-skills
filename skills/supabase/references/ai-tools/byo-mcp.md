# Deploy MCP servers

自アプリのユーザー向けにリモート MCP サーバーを Supabase Edge Functions 上で構築・デプロイする手順。認証なしの公開サーバーと、Supabase Auth（OAuth 2.1）で保護したサーバー。

## Signature / Usage

公開 MCP サーバー（認証なし）。`supabase/functions/mcp/index.ts`:

```ts
// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createMcpHandler, McpServer } from 'npm:@modelcontextprotocol/server@^2.0.0'
import { z } from 'npm:zod@^4.3.6'

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: 'mcp', version: '0.1.0' })

  server.registerTool(
    'add',
    {
      title: 'Addition Tool',
      description: 'Add two numbers together',
      inputSchema: z.object({ a: z.number(), b: z.number() }),
    },
    ({ a, b }) => ({ content: [{ type: 'text', text: String(a + b) }] })
  )

  return server
})

Deno.serve((req) => handler.fetch(req))
```

`supabase/config.toml`（公開サーバーでは JWT 検証を無効化）:

```toml
[functions.mcp]
verify_jwt = false
```

```bash
supabase init
supabase functions new mcp
supabase start
supabase functions serve mcp
supabase link --project-ref <your-project-ref>
supabase config push
supabase functions deploy mcp
```

- ローカル URL: `http://127.0.0.1:54321/functions/v1/mcp`、デプロイ後: `https://<your-project-ref>.supabase.co/functions/v1/mcp`
- curl で呼ぶ際は `Accept: application/json, text/event-stream` が必須（無いと拒否される）
- `createMcpHandler` は Streamable HTTP トランスポートを実行し、リクエストごとに新しい `McpServer` を作る（ステートレスな Edge Functions 向け）
- UI での確認: `npx -y @modelcontextprotocol/inspector`（Streamable HTTP を選択）

## 認証付きサーバー

### 構成

`@supabase/server` の 2 つのミドルウェアを `@supabase/middleware` の `pipeline` で合成し、その後ろに MCP ハンドラーを置く。

```text
pipeline([...], handler)
  withOAuthProtectedResource()    OAuth discovery for MCP clients (RFC 9728, WWW-Authenticate on 401)
  withSupabase({ auth: 'user' })  verifies the user's token, hands you an RLS-scoped client
  handler                         MCP transport and your tools
```

- `withOAuthProtectedResource()` は認証ゲートの前で OAuth Protected Resource Metadata を返し、未認証レスポンスに `WWW-Authenticate` チャレンジを付与する
- `withSupabase({ auth: 'user' })` は有効なユーザートークンの無いリクエストを拒否し、そのユーザーにスコープされた Supabase クライアントを渡す。ツールの読み書きは RLS を通る

### Supabase Auth 設定（OAuth 2.1 サーバー）

1. OAuth 2.1 サーバーを有効化
2. dynamic client registration を有効化（Dashboard の Authentication > OAuth Server）
3. 同意画面をフロントエンドでホスト（Supabase Library の OAuth Consent block が `/oauth/consent` ルートを導入）。Auth の Site URL をその origin に設定

```toml
[auth]
site_url = "http://localhost:3000"

[auth.oauth_server]
enabled = true
authorization_url_path = "/oauth/consent"
allow_dynamic_registration = true
```

### 認証付き index.ts

```ts
// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

import { createMcpHandler, McpServer } from 'npm:@modelcontextprotocol/server@^2.0.0'
import { pipeline } from 'npm:@supabase/middleware@1'
import { withOAuthProtectedResource, withSupabase } from 'npm:@supabase/server@1'
import { z } from 'npm:zod@^4.3.6'

import type { Database } from './database.types.ts'

Deno.serve(
  pipeline(
    // 1. OAuth discovery for MCP clients, 2. verify the user's token and scope a client to them
    [withOAuthProtectedResource(), withSupabase<Database>({ auth: 'user' })],
    async (req, { supabase }) => {
      // A fresh server per request: Edge Functions are stateless
      const handler = createMcpHandler(() => {
        const server = new McpServer({ name: 'todos', version: '0.1.0' })

        server.registerTool(
          'list_todos',
          {
            description: 'List the todos of the signed-in user',
            inputSchema: z.object({ limit: z.number().int().min(1).max(100).default(20) }),
            annotations: { readOnlyHint: true },
          },
          async ({ limit }) => {
            // RLS scopes this query to the signed-in user
            const { data, error } = await supabase
              .from('todos')
              .select('id, title, done')
              .order('created_at', { ascending: false })
              .limit(limit)
            if (error) throw new Error(error.message)
            return { content: [{ type: 'text', text: JSON.stringify(data) }] }
          }
        )

        return server
      })

      return handler.fetch(req)
    }
  )
)
```

（原文は `create_todo` ツールも登録する。ここでは省略）

型生成: `supabase gen types typescript --local > supabase/functions/mcp/database.types.ts`。ブロック導入: `npx shadcn@latest add https://supabase.com/library/r/mcp.json`（`whoami` ツール付き）。

## Connect from MCP clients

| Client | Where to add the URL |
|--------|----------------------|
| Claude Code | `claude mcp add --transport http <name> <url>` |
| Claude | Settings > Connectors > Add custom connector |
| Cursor | `.cursor/mcp.json`: `{ "mcpServers": { "<name>": { "url": "<url>" } } }` |
| VS Code | `.vscode/mcp.json`: `{ "servers": { "<name>": { "type": "http", "url": "<url>" } } }` |
| ChatGPT | Settings > Connectors（developer mode 有効、公開 HTTPS URL が必要） |

## Custom domain

カスタムドメイン使用時、`withOAuthProtectedResource()` はリクエストのドメインから Auth URL を組み立てるが、Auth の issuer はプロジェクトドメイン（`https://<your-project-ref>.supabase.co/auth/v1`）のままで不一致になる。`authorizationServer` を明示する。

```ts
[
  withOAuthProtectedResource({ authorizationServer: Deno.env.get('MCP_AUTH_ISSUER') }),
  withSupabase<Database>({ auth: 'user' }),
],
```

```bash
supabase secrets set MCP_AUTH_ISSUER=https://<your-project-ref>.supabase.co/auth/v1
supabase functions deploy mcp
```

## Edge Functions 以外で動かす

`Request` in / `Response` out のランタイム（Next.js route handler、SvelteKit、Cloudflare Workers、Node / Bun / Deno）にも同じ pipeline をマウントできる。forwarded ヘッダーが無いため公開 URL を明示する。

```ts
import { pipeline } from '@supabase/middleware'
import { fromSupabaseUrl, withOAuthProtectedResource, withSupabase } from '@supabase/server'

export default {
  fetch: pipeline(
    [
      withOAuthProtectedResource({
        resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
        authorizationServer: fromSupabaseUrl('https://<your-project-ref>.supabase.co'),
      }),
      withSupabase({ auth: 'user' }),
    ],
    handler
  ),
}
```

`resourceServer` は MCP エンドポイントの公開 URL、`authorizationServer` は Auth issuer（`fromSupabaseUrl` がプロジェクト URL から導出）。どちらも文字列またはリクエストの関数を受け取り、Supabase 以外の OAuth 2.1 サーバーも指せる。

## Notes

- 前提: Supabase CLI 2.117.0 以降、Node.js 20 以降、Deno、Docker 互換ランタイム（ローカル開発）。ネスト形式 `withOAuthProtectedResource(withSupabase({ auth: 'user' }, handler))` も同じ挙動で、どちらも `@supabase/server` 1.6.0 以降が必要
- 認証付き関数でも `verify_jwt = false` が必要（ゲートウェイが discovery リクエストを先に拒否するため）
- `withSupabase` はプロジェクト JWKS でユーザートークンを検証し、legacy HS256 を拒否する。プロジェクトは非対称鍵（ES256 / RS256）の JWT Signing Keys が必須
- dynamic client registration は互換クライアントなら誰でも登録できる。登録済みクライアントを確認し、ユーザーが grant を revoke できるようにする
- Edge Functions はステートレスで、クライアントへの open channel が無いため MCP sampling は不可。追加入力が必要なツールはメッセージで返す
- ここで作るのはアプリがユーザーに公開する MCP サーバー。開発者自身のコーディングエージェントをプロジェクトに接続する Supabase MCP server（mcp.md）とは別物
- 公式サンプル: supabase/supabase リポジトリの `examples/edge-functions/supabase/functions/mcp/`（`simple-mcp-server` / `authenticated-mcp-server`）
- 出典: https://supabase.com/docs/guides/ai-tools/byo-mcp （取得日 2026-10-17、版の pin なし。本文中の MCP 仕様リビジョンは 2026-07-28 と記載）

## Related

- [Supabase MCP Server](./mcp.md)
- [AI Tools 概要](./overview.md)
- [Edge Functions 実装例一覧](../functions/examples.md)
- [OAuth サーバー](../auth/oauth-server.md)
