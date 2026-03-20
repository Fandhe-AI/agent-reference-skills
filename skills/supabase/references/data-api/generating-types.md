# 型生成

Supabase CLI による TypeScript / Python 型定義の自動生成。supabase-js での型付き利用。

## 概要

Supabase CLI の `supabase gen types` コマンドは、データベーススキーマから型定義ファイルを自動生成する。これにより、supabase-js や supabase-py でのデータアクセスに完全な型安全性を提供できる。

### 生成される型

- テーブルの `Row` 型（SELECT の戻り値）
- テーブルの `Insert` 型（INSERT 時の入力）
- テーブルの `Update` 型（UPDATE 時の入力、全カラムが optional）
- Enum 型
- 関数の引数・戻り値の型
- ビューの型

### 型生成の方法

1. **リモートデータベースから生成**: 本番 / ステージング DB に接続して生成
2. **ローカルデータベースから生成**: `supabase start` で起動したローカル DB から生成
3. **マイグレーションから生成**: マイグレーションファイルに基づいて生成

## コード例

```bash
# === Supabase CLI のインストール ===
npm install -g supabase

# === リモートデータベースから型を生成 ===
supabase gen types typescript --project-id <PROJECT_REF> > src/types/database.types.ts

# === ローカルデータベースから型を生成 ===
supabase gen types typescript --local > src/types/database.types.ts

# === リンクされたプロジェクトから生成 ===
supabase link --project-ref <PROJECT_REF>
supabase gen types typescript --linked > src/types/database.types.ts

# === 特定のスキーマのみ生成 ===
supabase gen types typescript --local --schema public --schema api > src/types/database.types.ts
```

```typescript
// === 生成される型定義の例（database.types.ts） ===
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number;
          title: string;
          body: string | null;
          published: boolean;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          body?: string | null;
          published?: boolean;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          body?: string | null;
          published?: boolean;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {
      match_documents: {
        Args: {
          query_embedding: string;
          match_threshold: number;
          match_count: number;
        };
        Returns: {
          id: number;
          content: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      post_status: "draft" | "published" | "archived";
    };
  };
};
```

```typescript
// === supabase-js での型付き利用 ===
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

// 型パラメータにDatabase型を指定
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// SELECT - 戻り値が自動的に型付けされる
const { data: posts, error } = await supabase
  .from('posts')
  .select('id, title, body, published');
// posts の型: { id: number; title: string; body: string | null; published: boolean }[] | null

// INSERT - Insert 型に基づいてバリデーション
const { data, error: insertError } = await supabase
  .from('posts')
  .insert({
    title: 'New Post',    // 必須
    user_id: 'uuid-here', // 必須
    // id, created_at は optional（デフォルト値あり）
  })
  .select();

// UPDATE - Update 型に基づいて全カラム optional
const { data: updated } = await supabase
  .from('posts')
  .update({ title: 'Updated' }) // 変更するカラムのみ指定
  .eq('id', 1)
  .select();

// RPC - 引数と戻り値が型付け
const { data: matches } = await supabase.rpc('match_documents', {
  query_embedding: '[0.1, 0.2, ...]',
  match_threshold: 0.78,
  match_count: 10,
});
// matches の型: { id: number; content: string; similarity: number }[] | null
```

```typescript
// === ヘルパー型の抽出 ===
import type { Database } from './types/database.types';

// テーブルの Row 型を抽出
type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];

// Enum 型を抽出
type PostStatus = Database['public']['Enums']['post_status'];

// 汎用ヘルパー型
type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
type InsertDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
type UpdateDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// 使用例
const post: Tables<'posts'> = { ... };
```

```bash
# === CI/CD での自動型生成（package.json scripts） ===
# package.json に追加
# "scripts": {
#   "gen:types": "supabase gen types typescript --linked > src/types/database.types.ts",
#   "gen:types:local": "supabase gen types typescript --local > src/types/database.types.ts"
# }
```

```python
# === Python での型生成（実験的） ===
# supabase gen types python --local > types/database_types.py

# supabase-py での利用（型ヒントとして使用）
from supabase import create_client
from types.database_types import PostRow

supabase = create_client("https://...", "key")
result = supabase.table("posts").select("*").execute()
posts: list[PostRow] = result.data
```

## 注意点

- 型定義ファイルはスキーマ変更のたびに再生成する必要がある。CI/CD に組み込むことを推奨
- `supabase gen types` はリモート接続にプロジェクトの Management API を使用するため、認証が必要（`supabase login`）
- カスタムスキーマの型を生成するには `--schema` フラグで明示的に指定する
- `Json` 型のカラムは `Json` 型として生成され、具体的な構造は含まれない。必要に応じて手動で型を定義
- `vector` 型カラムは `string` として生成される（TypeScript に vector 型がないため）
- `Row`, `Insert`, `Update` の違い: `Row` は全カラム必須、`Insert` はデフォルト値のあるカラムが optional、`Update` は全カラム optional
- Supabase ダッシュボードの「API Docs」からも型定義を確認できる

## 関連

- [Data API 概要](./overview.md)
- [REST API](./rest.md)
- [API 堅牢化](./hardening.md)
