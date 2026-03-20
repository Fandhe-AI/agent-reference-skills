# Realtime プロトコル

Supabase Realtime の WebSocket プロトコル仕様。

## 概要

Supabase Realtime は Phoenix Channel プロトコルをベースとした WebSocket 通信を使用する。クライアントとサーバー間で JSON フォーマットのメッセージをやり取りし、チャネルの参加・離脱・イベント送受信を行う。

### WebSocket 接続 URL

```
wss://<project-ref>.supabase.co/realtime/v1/websocket?apikey=<anon-key>&vsn=1.0.0
```

### メッセージフォーマット

すべてのメッセージは以下の5つのフィールドを持つ JSON 配列として送受信される。

```
[join_ref, ref, topic, event, payload]
```

| フィールド | 説明 |
|-----------|------|
| `join_ref` | チャネル参加時の参照 ID。同じチャネルの全メッセージで共有される。サーバーからのメッセージでは `null` の場合もある |
| `ref` | メッセージの一意な参照 ID。リクエスト/レスポンスの対応付けに使用される |
| `topic` | チャネルのトピック名。`realtime:<channel-name>` 形式 |
| `event` | イベント名。システムイベントまたはユーザー定義イベント |
| `payload` | メッセージのペイロード（任意の JSON オブジェクト） |

### システムイベント

| イベント | 方向 | 説明 |
|---------|------|------|
| `phx_join` | Client -> Server | チャネルへの参加リクエスト |
| `phx_leave` | Client -> Server | チャネルからの離脱リクエスト |
| `phx_reply` | Server -> Client | リクエストへの応答（JOIN の成功/失敗など） |
| `phx_error` | Server -> Client | チャネルエラー |
| `phx_close` | Server -> Client | チャネルのクローズ |
| `heartbeat` | Client -> Server | 接続維持のためのハートビート |

### Heartbeat

接続を維持するため、クライアントは定期的に heartbeat メッセージを送信する必要がある。デフォルトでは30秒間隔。heartbeat が一定時間送信されないと、サーバーは接続を切断する。

## コード例

```typescript
// --- 低レベルのプロトコルメッセージ例（参考用） ---
// 通常は supabase-js が自動的に処理するため、直接操作する必要はない

// Heartbeat メッセージ
// Client -> Server
[null, "1", "phoenix", "heartbeat", {}]
// Server -> Client (reply)
[null, "1", "phoenix", "phx_reply", { "status": "ok", "response": {} }]

// チャネル JOIN
// Client -> Server
["1", "1", "realtime:room-1", "phx_join", {
  "config": {
    "broadcast": { "self": false, "ack": false },
    "presence": { "key": "" },
    "postgres_changes": [
      {
        "event": "*",
        "schema": "public",
        "table": "messages",
        "filter": ""
      }
    ]
  },
  "access_token": "<jwt-token>"
}]
// Server -> Client (reply)
["1", "1", "realtime:room-1", "phx_reply", {
  "status": "ok",
  "response": {
    "postgres_changes": [
      { "id": 12345, "event": "*", "schema": "public", "table": "messages", "filter": "" }
    ]
  }
}]

// Broadcast メッセージの送信
// Client -> Server
["1", "2", "realtime:room-1", "broadcast", {
  "event": "chat-message",
  "payload": { "user": "alice", "message": "Hello!" }
}]

// Broadcast メッセージの受信
// Server -> Client
[null, null, "realtime:room-1", "broadcast", {
  "event": "chat-message",
  "payload": { "user": "alice", "message": "Hello!" }
}]

// Postgres Changes イベントの受信
// Server -> Client
[null, null, "realtime:room-1", "postgres_changes", {
  "data": {
    "columns": [
      { "name": "id", "type": "int8" },
      { "name": "content", "type": "text" }
    ],
    "commit_timestamp": "2024-01-01T00:00:00.000Z",
    "errors": null,
    "old_record": {},
    "record": { "id": 1, "content": "Hello" },
    "schema": "public",
    "table": "messages",
    "type": "INSERT"
  },
  "ids": [12345]
}]

// Presence の状態追跡
// Client -> Server
["1", "3", "realtime:room-1", "presence", {
  "type": "track",
  "event": "track",
  "payload": {
    "user_id": "user-123",
    "username": "alice"
  }
}]

// チャネル LEAVE
// Client -> Server
["1", "4", "realtime:room-1", "phx_leave", {}]
```

```typescript
// --- supabase-js での Realtime 設定オプション ---

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10, // 1秒あたりの最大イベント数
    },
    heartbeatIntervalMs: 30000, // heartbeat 間隔（ミリ秒）
    timeout: 10000,             // タイムアウト（ミリ秒）
  },
})
```

## 注意点

- 通常のアプリケーション開発では、supabase-js がプロトコルの詳細を抽象化するため、低レベルのプロトコルを直接操作する必要はない
- heartbeat が途絶えるとサーバーが接続を切断する。supabase-js はデフォルトで30秒間隔のハートビートを自動送信する
- `join_ref` はチャネル参加ごとに一意で、再接続時にサーバーが以前のセッションと区別するために使用される
- `ref` は各メッセージに一意で、`phx_reply` の `ref` と照合してリクエスト/レスポンスを対応付ける
- トピック名は内部的に `realtime:` プレフィックスが付与される
- WebSocket 接続の URL には `apikey` クエリパラメータと `vsn`（バージョン）パラメータが必要
- 接続が切断された場合、supabase-js は自動的に再接続を試みる（指数バックオフ）

## 関連

- [Realtime 概要](./overview.md)
- [Broadcast](./broadcast.md)
- [Presence](./presence.md)
- [Postgres Changes](./postgres-changes.md)
- [制限](./limits.md)
