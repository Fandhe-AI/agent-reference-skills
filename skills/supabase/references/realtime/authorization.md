# Realtime 認可

Realtime の認可・RLS 連携の仕組み。

## 概要

Supabase Realtime は、既存の Row Level Security（RLS）とカスタム認可ポリシーを使用して、リアルタイムイベントへのアクセスを制御する。機能ごとに認可の仕組みが異なる。

### 機能別の認可方式

| 機能 | 認可方式 |
|------|----------|
| **Postgres Changes** | テーブルの RLS ポリシーに従う。SELECT 権限のある行の変更のみ配信される |
| **Broadcast** | `realtime.messages` テーブルの RLS ポリシーで制御する |
| **Presence** | `realtime.messages` テーブルの RLS ポリシーで制御する |

### Broadcast / Presence の認可

Broadcast と Presence の認可は `realtime.messages` テーブルに RLS ポリシーを設定することで実現する。このテーブルの `extension` カラム（`'broadcast'` または `'presence'`）と `topic` カラムでチャネルごとのアクセスを制御できる。

### Postgres Changes の認可

Postgres Changes は対象テーブルの既存の RLS ポリシーを活用する。クライアントの JWT トークンに基づいて、SELECT 権限のある行の変更のみがそのクライアントに配信される。

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- 認証済みユーザーとして Realtime に接続 ---

// ログイン後、Supabase クライアントは自動的に JWT を Realtime 接続に使用する
const { data: { session } } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
})

// 認証済み状態でチャネルに subscribe
const channel = supabase
  .channel('private-room')
  .on('broadcast', { event: 'message' }, (payload) => {
    console.log('Received:', payload)
  })
  .subscribe()

// --- トークンの更新 ---

// セッション更新時に Realtime のトークンも自動で更新される
// supabase.auth.onAuthStateChange で自動処理される

// 手動でトークンを更新する場合
supabase.realtime.setAuth('new-jwt-token')
```

```sql
-- === Broadcast / Presence の認可ポリシー ===

-- realtime.messages テーブルの RLS を有効化
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

-- 認証済みユーザーのみ Broadcast を使用可能にする
CREATE POLICY "Authenticated users can use broadcast"
ON realtime.messages
FOR ALL
TO authenticated
USING (
  extension = 'broadcast'
)
WITH CHECK (
  extension = 'broadcast'
);

-- 特定のトピック（チャネル）に対するアクセス制御
CREATE POLICY "Users can only access their own channels"
ON realtime.messages
FOR ALL
TO authenticated
USING (
  (
    extension IN ('broadcast', 'presence')
    AND topic = 'user:' || auth.uid()::text
  )
)
WITH CHECK (
  (
    extension IN ('broadcast', 'presence')
    AND topic = 'user:' || auth.uid()::text
  )
);

-- 特定のロールに基づくアクセス制御
CREATE POLICY "Admins can access all channels"
ON realtime.messages
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  auth.jwt() ->> 'role' = 'admin'
);

-- === Postgres Changes の認可 ===
-- 既存の RLS ポリシーがそのまま適用される

-- 例: ユーザーは自分のメッセージのみ閲覧可能
CREATE POLICY "Users can view own messages"
ON public.messages
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- この RLS ポリシーにより、Postgres Changes でも
-- user_id が自分の行の変更のみ配信される
```

## 注意点

- Broadcast / Presence の認可は `realtime.messages` テーブルに RLS ポリシーを設定しない限り、全ユーザーがアクセスできる（デフォルトは未制限）
- Postgres Changes の認可は対象テーブルの RLS ポリシーに完全に依存する。RLS が無効なテーブルは全変更が全クライアントに配信される
- `setAuth()` は JWT トークンの更新に使用する。Supabase Auth を使用している場合、トークンの更新は `onAuthStateChange` で自動的に処理される
- 認可ポリシーの変更は即座に反映される。既存の接続にも適用される
- `realtime.messages` テーブルへの RLS ポリシー設定は Supabase Dashboard の SQL Editor か Migration で行う
- Postgres Changes でフィルタ（`filter` オプション）を使用しても、RLS ポリシーが最終的なアクセス制御を行う。フィルタはパフォーマンス最適化のための手段であり、セキュリティの代替にはならない

## 関連

- [Realtime 概要](./overview.md)
- [Postgres Changes](./postgres-changes.md)
- [Broadcast](./broadcast.md)
- [Presence](./presence.md)
