# Broadcast

低遅延のクライアント間メッセージングを実現する Realtime 機能。

## 概要

Broadcast は、同じチャネルに参加しているクライアント間で低遅延のメッセージを送受信する仕組みである。メッセージは Realtime サーバーを経由して配信される。データベースを介さないため高速であり、チャットメッセージ、カーソル位置の共有、ゲームの状態同期などに適している。

### 主要な概念

- **channel.send()**: チャネルにメッセージを送信する
- **channel.on('broadcast', ...)**: チャネルからメッセージを受信するリスナーを登録する
- **self オプション**: `true` にすると、送信者自身にもメッセージが配信される（デフォルト: `false`）
- **ack オプション**: `true` にすると、サーバーがメッセージ受信を確認応答する（デフォルト: `false`）

### 配信フロー

1. クライアント A が `channel.send()` でメッセージを送信
2. Realtime サーバーがメッセージを受信
3. 同じチャネルに参加している全クライアント（B, C, ...）にメッセージを配信
4. `self: true` の場合、クライアント A にも配信される

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
```

## 注意点

- `send()` は subscribe 完了後（`SUBSCRIBED` ステータス確認後）に呼ぶこと
- `ack: false`（デフォルト）の場合、`send()` は即座に `'ok'` を返すがサーバー到達は保証されない
- `ack: true` の場合、`send()` は Promise を返しサーバーからの確認を待つ。タイムアウト時は `'timed out'` が返る
- `self: false`（デフォルト）の場合、送信者自身には配信されない。ローカル状態の更新は別途行う必要がある
- Broadcast メッセージはデータベースに永続化されない。オフラインのクライアントはメッセージを受信できない
- REST API での Broadcast はサーバーサイドからの通知やバッチ送信に適している
- メッセージの payload サイズは最大 1MB に制限される

## 関連

- [Realtime 概要](./overview.md)
- [Presence](./presence.md)
- [認可](./authorization.md)
- [制限](./limits.md)
