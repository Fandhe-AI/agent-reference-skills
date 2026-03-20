# Initialization

Supabase クライアントの初期化と設定。

## メソッド一覧

### `createClient()`

Supabase クライアントインスタンスを作成する。

**Signature:**
```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js'

function createClient<Database = any>(
  supabaseUrl: string,
  supabaseKey: string,
  options?: SupabaseClientOptions<SchemaName>
): SupabaseClient<Database>
```

**Usage:**
```typescript
import { createClient } from '@supabase/supabase-js'

// 基本的な初期化
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

// TypeScript 型付きクライアント
import { Database } from './database.types'
const supabase = createClient<Database>(
  'https://xyzcompany.supabase.co',
  'public-anon-key'
)

// フルオプション指定
const supabase = createClient<Database>(
  'https://xyzcompany.supabase.co',
  'public-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storage: localStorage,
      flowType: 'pkce',
      detectSessionInUrl: true,
      storageKey: 'supabase-auth',
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: { 'x-custom-header': 'value' },
      fetch: customFetch,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
)
```

**Parameters:**
- `supabaseUrl` (string) — Supabase プロジェクトの URL
- `supabaseKey` (string) — Supabase プロジェクトの API キー（`anon` キーまたは `service_role` キー）
- `options` (SupabaseClientOptions) — オプション設定（省略可）

**Options:**

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `auth.autoRefreshToken` | boolean | `true` | トークンの自動更新 |
| `auth.persistSession` | boolean | `true` | セッションの永続化 |
| `auth.storage` | Storage | `localStorage` | セッション保存先 |
| `auth.flowType` | string | `'implicit'` | OAuth フロータイプ（`'implicit'` / `'pkce'`） |
| `auth.detectSessionInUrl` | boolean | `true` | URL からセッション検出 |
| `auth.storageKey` | string | `'sb-<project>-auth-token'` | ストレージキー名 |
| `db.schema` | string | `'public'` | 使用するデータベーススキーマ |
| `global.headers` | Record<string, string> | `{}` | 全リクエストに付与するヘッダ |
| `global.fetch` | Fetch | `globalThis.fetch` | カスタム fetch 関数 |
| `realtime.params.eventsPerSecond` | number | `10` | 秒あたりのイベント数制限 |

**Returns:** `SupabaseClient<Database>` — Supabase クライアントインスタンス

---

## TypeScript サポート

Supabase CLI で型定義を生成し、型安全なクエリを実現する。

```bash
# 型定義ファイルの生成
npx supabase gen types typescript --project-id your-project-id > database.types.ts

# ローカル DB から生成
npx supabase gen types typescript --local > database.types.ts
```

```typescript
import { Database } from './database.types'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

// 型推論が効く
const { data } = await supabase.from('users').select('id, name')
// data の型: { id: number; name: string }[] | null
```

---

## サーバーサイドでの使用

```typescript
// サーバーサイドでは persistSession を無効にする
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
```

---

## 注意点
- `anon` キーはクライアントサイドで使用し、RLS で保護する
- `service_role` キーはサーバーサイド専用。クライアントに露出させない
- サーバーサイドでは `persistSession: false` を推奨
- Next.js App Router 等では `@supabase/ssr` パッケージを使用する
- `flowType: 'pkce'` はサーバーサイドレンダリング環境で推奨

## 関連
- [Auth](./auth.md)
- [Database CRUD](./database-crud.md)
- [Realtime](./realtime.md)
