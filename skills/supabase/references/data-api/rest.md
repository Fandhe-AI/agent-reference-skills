# REST API

PostgREST ベースの RESTful API。SQL 操作と HTTP メソッドのマッピング、Prefer ヘッダー、エラーコード。

## 概要

Supabase の REST API は PostgREST を基盤とし、PostgreSQL のテーブル・ビュー・関数を HTTP エンドポイントとして公開する。SQL の各操作は HTTP メソッドにマッピングされる。

### SQL → REST マッピング

| SQL | HTTP メソッド | supabase-js |
|-----|---------------|-------------|
| `SELECT` | `GET` | `.from('table').select()` |
| `INSERT` | `POST` | `.from('table').insert()` |
| `UPDATE` | `PATCH` | `.from('table').update()` |
| `DELETE` | `DELETE` | `.from('table').delete()` |
| `FUNCTION` | `POST /rpc/fn` | `.rpc('fn')` |

### Prefer ヘッダー

PostgREST は `Prefer` ヘッダーでレスポンスの挙動を制御する。

| Prefer 値 | 説明 |
|-----------|------|
| `return=representation` | INSERT/UPDATE/DELETE のレスポンスに変更後のデータを含める |
| `return=minimal` | レスポンスボディを空にする（デフォルト） |
| `return=headers-only` | ヘッダーのみ返す |
| `count=exact` | 総件数を `Content-Range` ヘッダーに含める |
| `count=planned` | PostgreSQL のプランナー推定値で件数を返す（高速） |
| `count=estimated` | 小さいテーブルは exact、大きいテーブルは planned |
| `resolution=merge-duplicates` | UPSERT（ON CONFLICT UPDATE） |
| `resolution=ignore-duplicates` | ON CONFLICT DO NOTHING |
| `missing=default` | 省略されたカラムにデフォルト値を使用 |

### PostgREST エラーコード

| コード | 説明 |
|--------|------|
| `PGRST000` | 接続エラー |
| `PGRST001` | データベースへの接続がタイムアウト |
| `PGRST002` | スキーマキャッシュの読み込みに失敗 |
| `PGRST100` | パース不可能なリクエスト |
| `PGRST102` | 不明なメディアタイプ |
| `PGRST106` | スキーマが見つからない |
| `PGRST200` | 曖昧なリレーション（複数の外部キーが該当） |
| `PGRST204` | カラムが見つからない |
| `PGRST300` | JWT の期限切れ |
| `PGRST301` | JWT のロールが無効 |
| `PGRST302` | ロールなし JWT |

## コード例

```typescript
// === フィルタリング ===
// eq（等値）
const { data } = await supabase.from('posts').select().eq('status', 'published');

// neq（非等値）
const { data } = await supabase.from('posts').select().neq('status', 'draft');

// gt / gte / lt / lte（比較）
const { data } = await supabase.from('posts').select().gte('views', 100);

// like / ilike（パターンマッチ）
const { data } = await supabase.from('posts').select().ilike('title', '%supabase%');

// in（配列に含まれる）
const { data } = await supabase.from('posts').select().in('id', [1, 2, 3]);

// is（null チェック）
const { data } = await supabase.from('posts').select().is('deleted_at', null);

// contains（JSONB に含まれる）
const { data } = await supabase.from('posts').select().contains('tags', ['supabase']);

// or（OR 条件）
const { data } = await supabase
  .from('posts')
  .select()
  .or('status.eq.published,status.eq.featured');

// === ソート・ページネーション ===
const { data } = await supabase
  .from('posts')
  .select('*', { count: 'exact' })
  .order('created_at', { ascending: false })
  .range(0, 9); // 0〜9 の 10 件

// === UPSERT ===
const { data } = await supabase
  .from('posts')
  .upsert(
    { id: 1, title: 'Updated or Created', body: '...' },
    { onConflict: 'id' }
  )
  .select();

// === バルク INSERT ===
const { data } = await supabase
  .from('posts')
  .insert([
    { title: 'Post 1', body: '...' },
    { title: 'Post 2', body: '...' },
  ])
  .select();

// === count の取得 ===
const { count } = await supabase
  .from('posts')
  .select('*', { count: 'exact', head: true }); // データは取得せず件数のみ
```

```bash
# === PostgREST フィルタ構文（cURL） ===

# 等値フィルタ
curl 'https://<REF>.supabase.co/rest/v1/posts?status=eq.published' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>"

# 複数フィルタ（AND）
curl 'https://<REF>.supabase.co/rest/v1/posts?status=eq.published&views=gte.100' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>"

# OR フィルタ
curl 'https://<REF>.supabase.co/rest/v1/posts?or=(status.eq.published,status.eq.featured)' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>"

# ソートとページネーション
curl 'https://<REF>.supabase.co/rest/v1/posts?select=*&order=created_at.desc&limit=10&offset=20' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>"

# UPSERT
curl -X POST 'https://<REF>.supabase.co/rest/v1/posts' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation,resolution=merge-duplicates" \
  -d '{"id": 1, "title": "Upserted Post"}'

# カウント取得
curl -I 'https://<REF>.supabase.co/rest/v1/posts?select=*' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Prefer: count=exact"
  # Content-Range ヘッダーに件数が含まれる

# RPC（関数呼び出し）
curl -X POST 'https://<REF>.supabase.co/rest/v1/rpc/get_user_stats' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "123"}'
```

## 注意点

- `PATCH`（UPDATE）と `DELETE` にはフィルタ条件を付けないと全行に適用される。supabase-js では安全のためフィルタなしの UPDATE/DELETE はエラーになる
- `Prefer: return=representation` を指定しないと、INSERT/UPDATE/DELETE のレスポンスは空になる。supabase-js の `.select()` はこのヘッダーを自動付与する
- PostgREST のデフォルト行数制限は 1000 行。大量データの取得には `range()` でページネーションを使用
- `count=exact` はテーブル全体をスキャンするため大きなテーブルでは遅い。`count=planned` を検討
- UPSERT には対象テーブルにユニーク制約またはプライマリキーが必要
- `or` フィルタの構文は `or=(condition1,condition2)` で、括弧が必要
- ネスト選択（リレーション）で曖昧な外部キーがある場合、`!inner` や `!hint` で明示する必要がある

## 関連

- [Data API 概要](./overview.md)
- [API キー](./api-keys.md)
- [GraphQL](./graphql.md)
- [型生成](./generating-types.md)
