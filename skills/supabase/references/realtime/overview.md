# Realtime 概要

Supabase Realtime はリアルタイム通信を提供する Phoenix ベースの Elixir サーバーである。

## 概要

Supabase Realtime は、クライアントとサーバー間の双方向リアルタイム通信を WebSocket 接続で実現する。内部的には Phoenix Framework（Elixir）上に構築されており、Phoenix Channels の仕組みを活用している。

### 3つの主要機能

| 機能 | 説明 |
|------|------|
| **Broadcast** | 低遅延のクライアント間メッセージング。チャネルに参加しているクライアント同士でメッセージを送受信する |
| **Presence** | オンライン状態の共有・同期。接続中のユーザーの状態をリアルタイムに追跡する |
| **Postgres Changes** | データベースの変更（INSERT/UPDATE/DELETE）をリアルタイムに配信する |

### チャネルの概念

チャネル（Channel）は Realtime 通信の基本単位である。クライアントはチャネルに subscribe（参加）し、同じチャネルに参加している他のクライアントとメッセージをやり取りする。チャネルはトピック文字列で識別される。

### 接続の仕組み

1. クライアントが Supabase Realtime サーバーに WebSocket 接続を確立する
2. 接続後、1つ以上のチャネルに subscribe する
3. チャネル上で Broadcast / Presence / Postgres Changes のイベントを送受信する
4. 不要になったチャネルは unsubscribe する

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://<project-ref>.supabase.co',
  '<anon-key>'
)

// チャネルを作成して subscribe
const channel = supabase.channel('room-1')

channel
  .on('broadcast', { event: 'chat' }, (payload) => {
    console.log('Broadcast received:', payload)
  })
  .on('presence', { event: 'sync' }, () => {
    console.log('Presence synced')
  })
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('DB change:', payload)
    }
  )
  .subscribe((status) => {
    console.log('Subscription status:', status)
    // status: 'SUBSCRIBED' | 'TIMED_OUT' | 'CLOSED' | 'CHANNEL_ERROR'
  })

// チャネルの購読解除
supabase.removeChannel(channel)

// 全チャネルの購読解除
supabase.removeAllChannels()
```

## 注意点

- WebSocket 接続はクライアントごとに1本確立され、複数チャネルを多重化する
- subscribe() のコールバックで `SUBSCRIBED` ステータスを確認してからメッセージを送信すること
- チャネルのトピック名は `realtime:` プレフィックスが内部的に付与される（クライアント側では意識不要）
- removeChannel() を呼ばないとメモリリークやコネクション数の浪費につながる
- Realtime サーバーは Elixir/Phoenix で構築されており、高い並行性とフォールトトレランスを備える

## 関連

- [Broadcast](./broadcast.md)
- [Presence](./presence.md)
- [Postgres Changes](./postgres-changes.md)
- [認可](./authorization.md)
- [プロトコル](./protocol.md)
- [制限](./limits.md)
