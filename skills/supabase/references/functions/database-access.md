# Edge Functions データベースアクセス

Edge Functions から Supabase Postgres データベースへの接続方法。

## 概要

Edge Functions からデータベースに接続するには主に 3 つの方法がある。(1) `@supabase/supabase-js` の `createClient` を使ったクライアント経由のアクセス、(2) Kysely や Drizzle 等の ORM/クエリビルダーを使った直接接続、(3) Deno の TCP 接続による直接 Postgres 接続。環境変数 `SUPABASE_URL`、`SUPABASE_ANON_KEY`、`SUPABASE_SERVICE_ROLE_KEY`、`SUPABASE_DB_URL` が自動的に設定される。

### 自動設定される環境変数

| 環境変数 | 説明 |
|---|---|
| `SUPABASE_URL` | プロジェクトの API URL |
| `SUPABASE_ANON_KEY` | 匿名キー（RLS 適用） |
| `SUPABASE_SERVICE_ROLE_KEY` | サービスロールキー（RLS バイパス） |
| `SUPABASE_DB_URL` | 直接 Postgres 接続文字列 |

## コード例

### supabase-js での接続（RLS 適用）

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  const authHeader = req.headers.get('Authorization')!

  // ユーザーのJWTを使ってクライアント作成（RLS が適用される）
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    },
  )

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### supabase-js での接続（Service Role / RLS バイパス）

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  // Service Role Key で RLS をバイパス
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // 管理者権限で全データにアクセス
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### Kysely での直接接続

```typescript
import { Pool } from 'https://deno.land/x/postgres@v0.17.0/mod.ts'
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from 'https://esm.sh/kysely@0.27.3'
import { PostgresJSDialect } from 'https://esm.sh/kysely-postgres-js@4.0.3'

// 接続プールを作成
const pool = new Pool(Deno.env.get('SUPABASE_DB_URL')!, 3, true)

interface Database {
  todos: {
    id: number
    task: string
    is_complete: boolean
    created_at: string
  }
}

Deno.serve(async (req: Request) => {
  const connection = await pool.connect()

  try {
    const result = await connection.queryObject`
      SELECT * FROM todos ORDER BY created_at DESC
    `
    return new Response(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    connection.release()
  }
})
```

### Drizzle ORM での接続

```typescript
import { drizzle } from 'npm:drizzle-orm/postgres-js'
import postgres from 'npm:postgres'
import { pgTable, serial, text, boolean, timestamp } from 'npm:drizzle-orm/pg-core'

const connectionString = Deno.env.get('SUPABASE_DB_URL')!

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client)

const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  task: text('task').notNull(),
  isComplete: boolean('is_complete').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

Deno.serve(async (req: Request) => {
  const allTodos = await db.select().from(todos)

  return new Response(JSON.stringify(allTodos), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

## 注意点

- `SUPABASE_ANON_KEY` で作成したクライアントは RLS が適用されるため、ユーザーの JWT を渡すこと
- `SUPABASE_SERVICE_ROLE_KEY` は RLS をバイパスするため、管理者操作にのみ使用すること
- 直接 Postgres 接続（`SUPABASE_DB_URL`）は接続プールの管理が必要
- Edge Functions からの DB 接続は内部ネットワーク経由のため、レイテンシーが低い
- 接続プールのサイズは小さく保つこと（推奨: 1-3）
- Edge Functions はステートレスなため、リクエストごとに接続を適切にクリーンアップすること

## 関連

- [概要](./overview.md)
- [認証・CORS](./auth.md)
- [シークレット管理](./secrets.md)
- [依存関係管理](./dependencies.md)
