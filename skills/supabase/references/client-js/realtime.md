# Realtime

リアルタイム通信のメソッド群。Broadcast、Presence、Postgres Changes の 3 つの機能をサポート。

## メソッド一覧

### `channel()`

リアルタイムチャネルを作成する。

**Signature:**
```typescript
supabase.channel(name: string, options?: {
  config?: {
    broadcast?: { ack?: boolean; self?: boolean };
    presence?: { key?: string };
    private?: boolean;
  };
}): RealtimeChannel
```

**Usage:**
```typescript
// 基本的なチャネル作成
const channel = supabase.channel('room-1')

// オプション付き
const channel = supabase.channel('room-1', {
  config: {
    broadcast: { ack: true, self: true },
    presence: { key: 'user-123' },
    private: true,
  },
})
```

**Parameters:**
- `name` (string) — チャネル名（一意）
- `config.broadcast.ack` (boolean) — ブロードキャスト送信の確認応答を待つか（デフォルト: false）
- `config.broadcast.self` (boolean) — 自分にもブロードキャストを送信するか（デフォルト: false）
- `config.presence.key` (string) — Presence のキー（デフォルト: ランダム UUID）
- `config.private` (boolean) — プライベートチャネルにするか（デフォルト: false）

**Returns:** `RealtimeChannel`

---

### `channel.subscribe()`

チャネルを購読開始する。

**Signature:**
```typescript
channel.subscribe(callback?: (status: 'SUBSCRIBED' | 'TIMED_OUT' | 'CLOSED' | 'CHANNEL_ERROR', err?: Error) => void): RealtimeChannel
```

**Usage:**
```typescript
const channel = supabase.channel('room-1')

channel.subscribe((status, err) => {
  if (status === 'SUBSCRIBED') {
    console.log('Connected!')
  }
  if (status === 'CHANNEL_ERROR') {
    console.error('Error:', err)
  }
})
```

**Parameters:**
- `callback` (function) — 購読状態変更時のコールバック（省略可）

**Returns:** `RealtimeChannel`

---

### `channel.on()` — Broadcast

ブロードキャストイベントを受信する。

**Signature:**
```typescript
channel.on(
  'broadcast',
  { event: string },
  callback: (payload: { type: string; event: string; payload: any }) => void
): RealtimeChannel
```

**Usage:**
```typescript
const channel = supabase.channel('room-1')

channel
  .on('broadcast', { event: 'cursor-pos' }, (payload) => {
    console.log('Cursor position:', payload.payload)
  })
  .subscribe()
```

**Parameters:**
- `type` — `'broadcast'`
- `filter.event` (string) — リッスンするイベント名
- `callback` (function) — イベント受信時のコールバック

**Returns:** `RealtimeChannel`

---

### `channel.on()` — Presence

Presence イベントを受信する。

**Signature:**
```typescript
channel.on(
  'presence',
  { event: 'sync' | 'join' | 'leave' },
  callback: (payload: any) => void
): RealtimeChannel
```

**Usage:**
```typescript
const channel = supabase.channel('room-1')

channel
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    console.log('Online users:', state)
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('User joined:', key, newPresences)
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('User left:', key, leftPresences)
  })
  .subscribe()
```

**Parameters:**
- `type` — `'presence'`
- `filter.event` (string) — イベントタイプ（`'sync'` / `'join'` / `'leave'`）
- `callback` (function) — イベント受信時のコールバック

**Returns:** `RealtimeChannel`

---

### `channel.on()` — Postgres Changes

データベース変更イベントを受信する。

**Signature:**
```typescript
channel.on(
  'postgres_changes',
  {
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    schema?: string;
    table?: string;
    filter?: string;
  },
  callback: (payload: RealtimePostgresChangesPayload) => void
): RealtimeChannel
```

**Usage:**
```typescript
const channel = supabase.channel('db-changes')

// 全変更を監視
channel
  .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
    console.log('Change:', payload.eventType, payload.new, payload.old)
  })
  .subscribe()

// INSERT のみ
channel
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
    console.log('New message:', payload.new)
  })
  .subscribe()

// フィルタ付き
channel
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'users',
      filter: 'id=eq.123',
    },
    (payload) => {
      console.log('User updated:', payload.new)
    }
  )
  .subscribe()

// 複数テーブル監視
channel
  .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, handleMessages)
  .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, handleUsers)
  .subscribe()
```

**Parameters:**
- `type` — `'postgres_changes'`
- `filter.event` (string) — イベントタイプ（`'INSERT'` / `'UPDATE'` / `'DELETE'` / `'*'`）
- `filter.schema` (string) — スキーマ名（デフォルト: `'public'`）
- `filter.table` (string) — テーブル名（省略可。省略時は全テーブル）
- `filter.filter` (string) — PostgREST 形式のフィルタ（省略可。例: `'id=eq.123'`）
- `callback` (function) — 変更受信時のコールバック

**Payload:**
```typescript
{
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Record<string, any>  // INSERT/UPDATE 時の新しいレコード
  old: Record<string, any>  // UPDATE/DELETE 時の古いレコード
  schema: string
  table: string
  commit_timestamp: string
  errors: string[] | null
}
```

**Returns:** `RealtimeChannel`

---

### `channel.send()`

ブロードキャストメッセージを送信する。

**Signature:**
```typescript
channel.send(message: {
  type: 'broadcast';
  event: string;
  payload: any;
}): Promise<'ok' | 'timed out' | 'error'>
```

**Usage:**
```typescript
await channel.send({
  type: 'broadcast',
  event: 'cursor-pos',
  payload: { x: 100, y: 200 },
})
```

**Parameters:**
- `type` (string) — `'broadcast'`
- `event` (string) — イベント名
- `payload` (any) — 送信するデータ

**Returns:** `Promise<'ok' | 'timed out' | 'error'>`

---

### `channel.track()`

Presence 状態を登録/更新する。

**Signature:**
```typescript
channel.track(payload: Record<string, any>): Promise<'ok' | 'timed out' | 'error'>
```

**Usage:**
```typescript
await channel.track({
  user_id: '123',
  username: 'John',
  online_at: new Date().toISOString(),
})
```

**Parameters:**
- `payload` (Record<string, any>) — 登録する状態データ

**Returns:** `Promise<'ok' | 'timed out' | 'error'>`

---

### `channel.untrack()`

Presence 状態を解除する。

**Signature:**
```typescript
channel.untrack(): Promise<'ok' | 'timed out' | 'error'>
```

**Usage:**
```typescript
await channel.untrack()
```

**Parameters:** なし

**Returns:** `Promise<'ok' | 'timed out' | 'error'>`

---

### `channel.unsubscribe()`

チャネルの購読を解除する。

**Signature:**
```typescript
channel.unsubscribe(): Promise<'ok' | 'timed out' | 'error'>
```

**Usage:**
```typescript
await channel.unsubscribe()
```

**Parameters:** なし

**Returns:** `Promise<'ok' | 'timed out' | 'error'>`

---

### `getChannels()`

現在アクティブな全チャネルを取得する。

**Signature:**
```typescript
supabase.getChannels(): RealtimeChannel[]
```

**Usage:**
```typescript
const channels = supabase.getChannels()
```

**Parameters:** なし

**Returns:** `RealtimeChannel[]`

---

### `removeChannel()`

チャネルを削除し、購読を解除する。

**Signature:**
```typescript
supabase.removeChannel(channel: RealtimeChannel): Promise<'ok' | 'timed out' | 'error'>
```

**Usage:**
```typescript
await supabase.removeChannel(channel)
```

**Parameters:**
- `channel` (RealtimeChannel) — 削除するチャネル

**Returns:** `Promise<'ok' | 'timed out' | 'error'>`

---

### `removeAllChannels()`

全チャネルを削除し、全購読を解除する。

**Signature:**
```typescript
supabase.removeAllChannels(): Promise<('ok' | 'timed out' | 'error')[]>
```

**Usage:**
```typescript
await supabase.removeAllChannels()
```

**Parameters:** なし

**Returns:** `Promise<('ok' | 'timed out' | 'error')[]>`

---

### `broadcastMessage()`

REST API 経由でブロードキャストメッセージを送信する（WebSocket 接続不要）。

**Signature:**
```typescript
supabase.broadcastMessage(
  channel: string,
  event: string,
  payload: any
): Promise<{ error: Error | null }>
```

**Usage:**
```typescript
const { error } = await supabase.broadcastMessage(
  'room-1',
  'new-message',
  { text: 'Hello everyone!' }
)
```

**Parameters:**
- `channel` (string) — チャネル名
- `event` (string) — イベント名
- `payload` (any) — 送信するデータ

**Returns:** `{ error }`

---

### `realtime.setAuth()`

Realtime 接続で使用する認証トークンを設定する。

**Signature:**
```typescript
supabase.realtime.setAuth(token: string | null): void
```

**Usage:**
```typescript
supabase.realtime.setAuth('custom-jwt-token')

// トークンをクリア
supabase.realtime.setAuth(null)
```

**Parameters:**
- `token` (string | null) — JWT トークン。null でクリア

**Returns:** `void`

---

## 注意点
- Postgres Changes を使用するには、Supabase Dashboard で Realtime を有効にし、対象テーブルの Publication を設定する必要がある
- `channel.on()` は `subscribe()` より前に呼び出す必要がある
- DELETE イベントで `old` データを取得するには、テーブルの Replica Identity を `FULL` に設定する必要がある
- `private: true` チャネルは RLS ポリシーに基づくアクセス制御が適用される
- `broadcast.self: true` を設定しないと、送信者自身にはブロードキャストが配信されない
- フィルタ構文は PostgREST 形式（例: `'column=eq.value'`, `'column=in.(a,b,c)'`）
- クリーンアップ時は `removeChannel()` または `removeAllChannels()` を使用する

## 関連
- [Initialization](./initialization.md)
- [Database CRUD](./database-crud.md)
