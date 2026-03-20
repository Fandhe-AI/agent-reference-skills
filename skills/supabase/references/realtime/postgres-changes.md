# Postgres Changes

データベースの INSERT/UPDATE/DELETE をリアルタイムに配信する Realtime 機能。

## 概要

Postgres Changes は、PostgreSQL のレプリケーション機能を利用して、データベースの変更（INSERT / UPDATE / DELETE）をリアルタイムにクライアントへ配信する。内部的には PostgreSQL の論理レプリケーションと `supabase_realtime` パブリケーションを使用している。

### 仕組み

1. テーブルを `supabase_realtime` パブリケーションに追加する
2. クライアントがチャネルで `postgres_changes` イベントをリッスンする
3. テーブルに変更が発生すると、Realtime サーバーがクライアントに配信する
4. RLS（Row Level Security）ポリシーに基づいてフィルタリングされる

### フィルタ構文

| 演算子 | 説明 | 例 |
|--------|------|----|
| `eq` | 等しい | `filter: 'user_id=eq.123'` |
| `neq` | 等しくない | `filter: 'status=neq.deleted'` |
| `gt` | より大きい | `filter: 'age=gt.18'` |
| `gte` | 以上 | `filter: 'age=gte.18'` |
| `lt` | より小さい | `filter: 'price=lt.100'` |
| `lte` | 以下 | `filter: 'price=lte.100'` |
| `in` | いずれかに一致 | `filter: 'status=in.(active,pending)'` |

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- 全イベント（INSERT/UPDATE/DELETE）をリッスン ---

const channel = supabase
  .channel('db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',           // '*' | 'INSERT' | 'UPDATE' | 'DELETE'
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      console.log('Change type:', payload.eventType)
      console.log('New record:', payload.new)
      console.log('Old record:', payload.old)
      // INSERT: new にデータあり、old は {}
      // UPDATE: new に更新後、old に更新前（REPLICA IDENTITY 設定に依存）
      // DELETE: new は {}、old に削除前（REPLICA IDENTITY 設定に依存）
    }
  )
  .subscribe()

// --- INSERT のみリッスン ---

supabase
  .channel('new-messages')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
    },
    (payload) => {
      console.log('New message:', payload.new)
    }
  )
  .subscribe()

// --- フィルタ付きリッスン ---

supabase
  .channel('user-messages')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'messages',
      filter: 'user_id=eq.user-123',
    },
    (payload) => {
      console.log('My message changed:', payload)
    }
  )
  .subscribe()

// --- in フィルタ ---

supabase
  .channel('active-orders')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'orders',
      filter: 'status=in.(pending,processing)',
    },
    (payload) => {
      console.log('Order updated:', payload.new)
    }
  )
  .subscribe()

// --- 複数テーブルを同一チャネルでリッスン ---

supabase
  .channel('multi-table')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => console.log('messages:', payload)
  )
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users' },
    (payload) => console.log('users:', payload)
  )
  .subscribe()
```

```sql
-- テーブルを supabase_realtime パブリケーションに追加
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 複数テーブルを一度に追加
ALTER PUBLICATION supabase_realtime ADD TABLE messages, users, orders;

-- UPDATE/DELETE 時に old_record を取得するには REPLICA IDENTITY を設定
ALTER TABLE messages REPLICA IDENTITY FULL;

-- パブリケーションの確認
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```

## 注意点

- テーブルを `supabase_realtime` パブリケーションに追加しないと変更は配信されない
- デフォルトでは UPDATE / DELETE 時に `old` レコードは空オブジェクト `{}` になる。`old` を取得するにはテーブルの REPLICA IDENTITY を `FULL` に設定する必要がある
- RLS が有効な場合、クライアントのロール（JWT）に基づいて SELECT 権限のある行のみ配信される
- フィルタは1つのリスナーにつき1カラムのみ指定可能。複数カラムでフィルタする場合はクライアント側で追加フィルタリングが必要
- `schema` はデフォルトで `'public'`。他のスキーマを指定する場合、そのスキーマがパブリケーションに含まれている必要がある
- 大量の変更が発生するテーブルでは、フィルタを適切に設定しないとパフォーマンスに影響する
- Postgres Changes は論理レプリケーションに依存するため、サーバー側のリソースを消費する

## 関連

- [Realtime 概要](./overview.md)
- [認可](./authorization.md)
- [制限](./limits.md)
