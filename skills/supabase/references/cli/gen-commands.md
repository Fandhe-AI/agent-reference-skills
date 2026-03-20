# Supabase CLI: 型生成コマンド

## supabase gen types typescript

データベーススキーマから TypeScript の型定義ファイルを生成する。

```bash
supabase gen types typescript
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--linked` | リンク済みリモートプロジェクトから型生成 |
| `--local` | ローカルデータベースから型生成 |
| `--db-url <url>` | 直接 DB 接続URLを指定して型生成 |
| `--schema <schemas>` | 対象スキーマ（カンマ区切り。デフォルト: `public`） |
| `--project-id <ref>` | プロジェクト参照ID |

### ソース別の使い方

#### ローカルデータベースから生成

```bash
supabase gen types typescript --local > src/types/database.types.ts
```

#### リモートプロジェクトから生成

```bash
# リンク済みプロジェクトから
supabase gen types typescript --linked > src/types/database.types.ts

# プロジェクトID直接指定
supabase gen types typescript --project-id <ref> > src/types/database.types.ts
```

#### DB URL を直接指定

```bash
supabase gen types typescript --db-url "postgresql://postgres:password@host:5432/postgres" > src/types/database.types.ts
```

### 複数スキーマ

```bash
supabase gen types typescript --local --schema public,auth > src/types/database.types.ts
```

### 出力例

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string | null
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_posts: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          title: string
          content: string | null
        }[]
      }
    }
    Enums: {
      user_role: "admin" | "editor" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
```

## 型定義の活用

### Supabase Client での使用

```typescript
import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types/database.types"

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 型安全なクエリ
const { data, error } = await supabase
  .from("users")  // テーブル名が補完される
  .select("id, name, email")  // カラム名が補完される
  .eq("id", userId)  // フィルタの値も型チェック
  .single()

// data の型: { id: string; name: string; email: string } | null
```

### ヘルパー型

```typescript
import type { Database } from "./types/database.types"

// テーブルの行型
type User = Database["public"]["Tables"]["users"]["Row"]

// Insert 用の型
type NewUser = Database["public"]["Tables"]["users"]["Insert"]

// Update 用の型
type UserUpdate = Database["public"]["Tables"]["users"]["Update"]

// Enum 型
type UserRole = Database["public"]["Enums"]["user_role"]

// 関数の引数型
type GetUserPostsArgs = Database["public"]["Functions"]["get_user_posts"]["Args"]

// 関数の戻り値型
type GetUserPostsReturn = Database["public"]["Functions"]["get_user_posts"]["Returns"]
```

### Tables ヘルパー

```typescript
import type { Tables, TablesInsert, TablesUpdate } from "./types/database.types"

type User = Tables<"users">
type NewUser = TablesInsert<"users">
type UserUpdate = TablesUpdate<"users">
```

## CI/CD での自動生成

### GitHub Actions 例

```yaml
name: Generate Types
on:
  push:
    branches: [main]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase gen types typescript --project-id ${{ secrets.SUPABASE_PROJECT_REF }} > src/types/database.types.ts
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update database types"
```

## package.json スクリプト例

```json
{
  "scripts": {
    "gen:types": "supabase gen types typescript --local > src/types/database.types.ts",
    "gen:types:remote": "supabase gen types typescript --linked > src/types/database.types.ts"
  }
}
```

## 関連

- [型生成](../data-api/generating-types.md) — TypeScript 型活用
- [JS クライアント初期化](../client-js/initialization.md) — 型付きクライアント
