# Edge Functions URL ルーティング

単一の Edge Function 内での URL パスベースルーティングと HTTP メソッドの処理分岐。

## 概要

Edge Functions は単一のエントリポイント（`index.ts`）で複数のルートを処理できる。`URL` オブジェクトや `URLPattern` API を使ってパスベースのルーティングを実装し、`req.method` で HTTP メソッド（GET/POST/PUT/DELETE/PATCH/OPTIONS）ごとの処理を分岐する。

### ルーティングのアプローチ

1. **URL パス解析**: `new URL(req.url).pathname` でパスを取得して分岐
2. **URLPattern API**: Web 標準の `URLPattern` でパターンマッチング
3. **HTTP メソッド分岐**: `req.method` でメソッドごとに処理を振り分け

## コード例

### 基本的な HTTP メソッド分岐

```typescript
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req)
    case 'POST':
      return handlePost(req)
    case 'PUT':
      return handlePut(req)
    case 'DELETE':
      return handleDelete(req)
    default:
      return new Response('Method Not Allowed', { status: 405 })
  }
})

async function handleGet(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ items: [] }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handlePost(req: Request): Promise<Response> {
  const body = await req.json()
  return new Response(JSON.stringify({ created: body }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handlePut(req: Request): Promise<Response> {
  const body = await req.json()
  return new Response(JSON.stringify({ updated: body }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function handleDelete(req: Request): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders })
}
```

### パスベースルーティング

```typescript
Deno.serve(async (req: Request) => {
  const url = new URL(req.url)
  // パスから関数名部分を除去（/functions/v1/api/users/123 → /users/123）
  const pathname = url.pathname.replace(/^\/functions\/v1\/[^/]+/, '')

  if (pathname === '/users' || pathname === '/users/') {
    return handleUsers(req)
  }

  // /users/:id のパターン
  const userMatch = pathname.match(/^\/users\/(\d+)$/)
  if (userMatch) {
    const userId = userMatch[1]
    return handleUser(req, userId)
  }

  if (pathname === '/health') {
    return new Response(JSON.stringify({ status: 'ok' }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response('Not Found', { status: 404 })
})

function handleUsers(req: Request): Response {
  // ユーザー一覧の処理
  return new Response(JSON.stringify({ users: [] }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

function handleUser(req: Request, userId: string): Response {
  return new Response(JSON.stringify({ id: userId }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
```

### URLPattern を使ったルーティング

```typescript
const routes: Array<{
  pattern: URLPattern
  handler: (req: Request, match: URLPatternResult) => Promise<Response> | Response
}> = [
  {
    pattern: new URLPattern({ pathname: '/functions/v1/api/users' }),
    handler: async (req, match) => {
      if (req.method === 'GET') {
        return new Response(JSON.stringify({ users: [] }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }
      if (req.method === 'POST') {
        const body = await req.json()
        return new Response(JSON.stringify(body), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response('Method Not Allowed', { status: 405 })
    },
  },
  {
    pattern: new URLPattern({ pathname: '/functions/v1/api/users/:id' }),
    handler: (req, match) => {
      const id = match.pathname.groups.id
      return new Response(JSON.stringify({ id }), {
        headers: { 'Content-Type': 'application/json' },
      })
    },
  },
  {
    pattern: new URLPattern({ pathname: '/functions/v1/api/posts/:postId/comments/:commentId?' }),
    handler: (req, match) => {
      const { postId, commentId } = match.pathname.groups
      return new Response(JSON.stringify({ postId, commentId }), {
        headers: { 'Content-Type': 'application/json' },
      })
    },
  },
]

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200 })
  }

  for (const route of routes) {
    const match = route.pattern.exec(req.url)
    if (match) {
      return await route.handler(req, match)
    }
  }

  return new Response('Not Found', { status: 404 })
})
```

## 注意点

- Edge Functions の URL は `https://<project-ref>.supabase.co/functions/v1/<function-name>` 形式
- パスベースルーティング時、関数名部分（`/functions/v1/<function-name>`）を考慮してパスを処理すること
- `URLPattern` は Web 標準 API で Deno でネイティブサポートされている
- `OPTIONS` リクエストは CORS preflight のため、最初に処理すること
- 単一関数で多数のルートを持つ場合、関数を分割することも検討する
- クエリパラメータは `new URL(req.url).searchParams` で取得可能

## 関連

- [概要](./overview.md)
- [認証・CORS](./auth.md)
- [実装例](./examples.md)
- [テスト](./testing.md)
