# Data API（PostgREST）概要

PostgreSQL スキーマから自動生成される RESTful API。PostgREST を基盤とした Supabase のコアデータアクセス機能。

## 概要

Supabase の Data API は PostgREST を使って PostgreSQL のテーブル・ビュー・関数から RESTful API を自動生成する。スキーマを変更すると API も自動的に更新されるため、バックエンドコードの記述が不要。

### URL 構造

```
https://<PROJECT_REF>.supabase.co/rest/v1/<table_name>
```

### 認証ヘッダー

すべてのリクエストに以下のヘッダーが必要:

| ヘッダー | 値 | 説明 |
|----------|-----|------|
| `apikey` | `<SUPABASE_ANON_KEY>` または `<SUPABASE_SERVICE_ROLE_KEY>` | プロジェクトの API キー |
| `Authorization` | `Bearer <TOKEN>` | JWT トークン（ユーザートークンまたは API キー） |

### supabase-js クライアント

`supabase-js` は PostgREST API のラッパーで、JavaScript/TypeScript からの呼び出しを簡潔にする。

### 主な機能

- **CRUD 操作**: テーブルに対する SELECT / INSERT / UPDATE / DELETE
- **フィルタリング**: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `is` 等
- **ソート・ページネーション**: `order`, `limit`, `offset`, `range`
- **リレーション**: 外部キーに基づく自動 JOIN（ネスト選択）
- **RPC**: PostgreSQL 関数の呼び出し
- **リアルタイム**: WebSocket による変更通知（Realtime Extension）

## コード例

```typescript
// === supabase-js クライアントの初期化 ===
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://<PROJECT_REF>.supabase.co',
  '<SUPABASE_ANON_KEY>'
);

// === SELECT（読み取り） ===
const { data, error } = await supabase
  .from('posts')
  .select('id, title, body, created_at')
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(10);

// リレーション（外部キー JOIN）
const { data } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    author:users(name, email),
    comments(id, body, created_at)
  `);

// === INSERT（挿入） ===
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'New Post', body: 'Content...', user_id: userId })
  .select();

// === UPDATE（更新） ===
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated Title' })
  .eq('id', 1)
  .select();

// === DELETE（削除） ===
const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', 1);

// === RPC（関数呼び出し） ===
const { data, error } = await supabase.rpc('get_user_stats', {
  user_id: '123',
});
```

```bash
# === cURL での直接呼び出し ===
# SELECT
curl 'https://<REF>.supabase.co/rest/v1/posts?select=id,title&published=eq.true&order=created_at.desc&limit=10' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <ANON_KEY>"

# INSERT
curl -X POST 'https://<REF>.supabase.co/rest/v1/posts' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"title": "New Post", "body": "Content..."}'

# UPDATE
curl -X PATCH 'https://<REF>.supabase.co/rest/v1/posts?id=eq.1' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <USER_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"title": "Updated Title"}'

# DELETE
curl -X DELETE 'https://<REF>.supabase.co/rest/v1/posts?id=eq.1' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <USER_TOKEN>"
```

## 注意点

- Data API は `public` スキーマのテーブル・ビュー・関数をデフォルトで公開する
- RLS（Row Level Security）が有効でない場合、`anon key` で全データにアクセス可能になるため、必ず RLS を設定する
- PostgREST は PostgreSQL のロールシステムに基づいてアクセス制御を行う
- API のレスポンスにはデフォルトで 1000 行の制限がある（`Settings > API > Max Rows` で変更可能）
- `select()` を呼ばない INSERT / UPDATE はデフォルトでレスポンスボディが空になる。`.select()` を付けて返却データを取得
- ネスト選択（リレーション）は外部キーが設定されているテーブル間でのみ動作する

## 関連

- [API キー](./api-keys.md)
- [REST API](./rest.md)
- [GraphQL](./graphql.md)
- [型生成](./generating-types.md)
