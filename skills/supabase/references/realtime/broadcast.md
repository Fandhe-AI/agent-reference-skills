# Broadcast

低遅延のクライアント間メッセージングを実現する Realtime 機能。

## 概要

Broadcast は、同じチャネルに参加しているクライアント間で低遅延のメッセージを送受信する仕組みである。メッセージは Realtime サーバーを経由して配信される。データベースを介さないため高速であり、チャットメッセージ、カーソル位置の共有、ゲームの状態同期などに適している。

### 主要な概念

- **channel.send()**: チャネルにメッセージを送信する
- **channel.on('broadcast', ...)**: チャネルからメッセージを受信するリスナーを登録する
- **self オプション**: `true` にすると、送信者自身にもメッセージが配信される（デフォルト: `false`）
- **ack オプション**: `true` にすると、サーバーがメッセージ受信を確認応答する（デフォルト: `false`）
- **replay オプション**: プライベートチャネルで過去のメッセージを取得する（データベース経由 Broadcast のみ）

### 配信フロー

1. クライアント A が `channel.send()` でメッセージを送信
2. Realtime サーバーがメッセージを受信
3. 同じチャネルに参加している全クライアント（B, C, ...）にメッセージを配信
4. `self: true` の場合、クライアント A にも配信される

### 送信方法の比較

| 方法 | 説明 |
|------|------|
| クライアントライブラリ | WebSocket でクライアント→サーバー→ブロードキャスト |
| REST API | HTTP リクエスト → WebSocket でクライアントへ配信 |
| データベース（`realtime.send()`） | `realtime.messages` に挿入 → 論理レプリケーション経由で配信 |
| データベース（`realtime.broadcast_changes()`） | DB 変更イベントをトリガー経由で構造化して配信 |

### パブリック / プライベートチャネル

- **パブリック（`private: false`）**: 認証なしで subscribe 可能
- **プライベート（`private: true`）**: 認証済みクライアントのみ subscribe 可能。RLS ポリシーで制御

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- 基本的な Broadcast の送受信 ---

const channel = supabase.channel('room-1', {
  config: {
    broadcast: {
      self: true, // 自分にも配信する
      ack: true,  // サーバーからの確認応答を待つ
    },
  },
})

// 受信リスナーの登録
channel.on('broadcast', { event: 'chat-message' }, (payload) => {
  console.log('Received:', payload.payload)
  // payload.payload にユーザーが送信したデータが入る
})

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    // メッセージの送信
    const result = await channel.send({
      type: 'broadcast',
      event: 'chat-message',
      payload: {
        user: 'alice',
        message: 'Hello, world!',
        timestamp: new Date().toISOString(),
      },
    })
    console.log('Send result:', result) // ack: true の場合 'ok' が返る
  }
})

// --- 複数イベントの使い分け ---

const gameChannel = supabase.channel('game-room')

gameChannel
  .on('broadcast', { event: 'player-move' }, (payload) => {
    console.log('Player moved:', payload.payload)
  })
  .on('broadcast', { event: 'player-chat' }, (payload) => {
    console.log('Chat:', payload.payload)
  })
  .subscribe()

// --- REST API での Broadcast 送信（サーバーサイド） ---
// WebSocket 接続なしでサーバーから Broadcast を送信できる

const response = await fetch(
  `${SUPABASE_URL}/realtime/v1/api/broadcast`,
  {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          topic: 'room-1',
          event: 'chat-message',
          payload: { user: 'server', message: 'Server notification' },
        },
      ],
    }),
  }
)

// --- データベースからの Broadcast ---

// 1. realtime.send() — 任意のメッセージを realtime.messages に挿入して配信
// 第4引数: false = パブリック, true = プライベート（認証必須）

// 2. realtime.broadcast_changes() — DB 変更イベントをトリガー経由で配信
```

```sql
-- realtime.send() によるデータベース Broadcast
select realtime.send(
  jsonb_build_object('hello', 'world'),  -- payload
  'event',                               -- event 名
  'topic',                               -- チャネルトピック
  false                                  -- プライベートかどうか
);

-- realtime.broadcast_changes() によるトリガー Broadcast
-- テーブルの INSERT/UPDATE/DELETE を自動的に Broadcast する
create or replace function broadcast_changes()
returns trigger
language plpgsql
as $$
begin
  perform realtime.broadcast_changes(
    'table-changes',         -- topic
    tg_op,                   -- INSERT | UPDATE | DELETE
    tg_op,                   -- event 名
    tg_table_schema,
    tg_table_name,
    new,
    old
  );
  return null;
end;
$$;

-- トリガーに設定
create trigger broadcast_changes
after insert or update or delete on public.messages
for each row execute function broadcast_changes();
```

```typescript
// --- Broadcast Replay（プライベートチャネルの過去メッセージ取得） ---
// データベース経由の Broadcast メッセージのみが対象（最大 3 日間保持）

const channel = supabase.channel('private-room', {
  config: {
    private: true,  // プライベートチャネル
    broadcast: {
      replay: {
        since: Date.now() - 60 * 60 * 1000, // 1時間前から（ミリ秒）
        limit: 25,                           // 最大 25 件（省略可）
      },
    },
  },
})

channel.subscribe()
```

## 注意点

- `send()` は subscribe 完了後（`SUBSCRIBED` ステータス確認後）に呼ぶこと
- `ack: false`（デフォルト）の場合、`send()` は即座に `'ok'` を返すがサーバー到達は保証されない
- `ack: true` の場合、`send()` は Promise を返しサーバーからの確認を待つ。タイムアウト時は `'timed out'` が返る
- `self: false`（デフォルト）の場合、送信者自身には配信されない。ローカル状態の更新は別途行う必要がある
- クライアントライブラリ経由の Broadcast メッセージはデータベースに永続化されない。オフラインのクライアントはメッセージを受信できない
- データベース経由の Broadcast（`realtime.send()`）は `realtime.messages` に保持され、3 日後に自動削除される
- Replay 機能はデータベース経由の Broadcast のみ対象。クライアントライブラリ経由のメッセージは Replay できない
- REST API での Broadcast はサーバーサイドからの通知やバッチ送信に適している
- メッセージの payload サイズは最大 1MB に制限される
- プライベートチャネルを利用する場合は、ダッシュボードの Realtime 設定で「Allow public access」を無効化する必要がある

## 関連

- [Realtime 概要](./overview.md)
- [Presence](./presence.md)
- [認可](./authorization.md)
- [制限](./limits.md)
