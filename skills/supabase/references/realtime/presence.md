# Presence

オンライン状態の共有・同期を実現する Realtime 機能。

## 概要

Presence は、同じチャネルに参加しているクライアントの状態（オンライン/オフライン、カスタム状態）をリアルタイムに追跡・同期する仕組みである。Phoenix Presence（CRDT ベース）を基盤としており、ネットワーク分断時にも最終的に一貫した状態に収束する。

### 主要な概念

- **channel.track(state)**: 自分の状態を登録・更新する
- **channel.untrack()**: 自分の状態を解除する
- **channel.presenceState()**: チャネル上の全ユーザーの現在の状態を取得する
- **sync イベント**: 状態が同期されたときに発火する
- **join イベント**: 新しいユーザーが参加したときに発火する
- **leave イベント**: ユーザーが離脱したときに発火する

### ユースケース

- ユーザーのオンライン/オフライン表示
- 入力中インジケーター
- カーソル位置の共有
- アクティブユーザー一覧の表示

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- 基本的な Presence の使い方 ---

const channel = supabase.channel('online-users')

// sync イベント: 状態が同期されるたびに発火
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState()
  console.log('Current online users:', state)
  // state の構造:
  // {
  //   '<presence-key>': [
  //     { user_id: '123', username: 'alice', online_at: '2024-01-01T00:00:00Z', presence_ref: '...' },
  //   ],
  //   '<presence-key>': [...]
  // }
})

// join イベント: 新しいユーザーが参加
channel.on('presence', { event: 'join' }, ({ key, newPresences, currentPresences }) => {
  console.log('User joined:', key, newPresences)
})

// leave イベント: ユーザーが離脱
channel.on('presence', { event: 'leave' }, ({ key, leftPresences, currentPresences }) => {
  console.log('User left:', key, leftPresences)
})

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    // 自分の状態を登録
    await channel.track({
      user_id: 'user-123',
      username: 'alice',
      online_at: new Date().toISOString(),
    })
  }
})

// --- 状態の更新 ---

// track を再度呼ぶと状態が更新される
await channel.track({
  user_id: 'user-123',
  username: 'alice',
  online_at: new Date().toISOString(),
  status: 'away', // 新しいフィールドを追加
})

// --- 状態の解除 ---

await channel.untrack()

// --- presenceState() で全ユーザーの状態を取得 ---

const state = channel.presenceState()
// Object.keys(state) で全 presence key を取得
// 各キーに対して配列でユーザー情報が格納される
// （同一キーで複数デバイスから接続している場合は複数エントリ）

for (const [key, presences] of Object.entries(state)) {
  for (const presence of presences) {
    console.log(`User: ${presence.username}, Status: ${presence.status}`)
  }
}
```

## 注意点

- `track()` は subscribe 完了後に呼ぶこと
- `track()` を再度呼ぶと前回の状態は上書きされる（マージではない）
- Presence の状態はメモリ上で管理されるため、データベースには永続化されない
- クライアントが切断されると自動的に leave イベントが発火する
- `presenceState()` の各キーは presence key であり、デフォルトではソケットの参照 ID が使われる
- 同じユーザーが複数デバイスから接続している場合、同一キーに複数エントリが存在する
- Presence の状態サイズが大きすぎるとパフォーマンスに影響するため、必要最小限のデータのみを track すること
- sync イベントは join/leave の後にも発火するため、最新の全体状態を取得するのに最適

## 関連

- [Realtime 概要](./overview.md)
- [Broadcast](./broadcast.md)
- [認可](./authorization.md)
- [制限](./limits.md)
