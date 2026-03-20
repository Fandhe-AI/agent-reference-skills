# Edge Functions WebSocket 対応

Edge Functions での WebSocket リアルタイム通信の実装方法。

## 概要

Edge Functions は `Deno.upgradeWebSocket()` を使って HTTP リクエストを WebSocket 接続にアップグレードできる。これにより、クライアントとサーバー間の双方向リアルタイム通信が可能になる。チャット、ライブ更新、リアルタイムコラボレーションなどのユースケースに活用できる。

### 動作の仕組み

1. クライアントが WebSocket 接続リクエストを送信
2. `Deno.upgradeWebSocket(req)` で接続をアップグレード
3. `socket` オブジェクトでイベントハンドラを設定
4. 双方向のメッセージ送受信が可能

## コード例

### 基本的な WebSocket サーバー

```typescript
Deno.serve((req: Request) => {
  // WebSocket アップグレードリクエストかチェック
  const upgrade = req.headers.get('upgrade') || ''

  if (upgrade.toLowerCase() !== 'websocket') {
    return new Response('Expected WebSocket upgrade', { status: 426 })
  }

  const { socket, response } = Deno.upgradeWebSocket(req)

  socket.onopen = () => {
    console.log('Client connected')
    socket.send(JSON.stringify({ type: 'connected', message: 'Welcome!' }))
  }

  socket.onmessage = (event) => {
    console.log('Received:', event.data)
    const data = JSON.parse(event.data)

    // エコーバック
    socket.send(JSON.stringify({
      type: 'echo',
      message: data.message,
      timestamp: new Date().toISOString(),
    }))
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  socket.onclose = () => {
    console.log('Client disconnected')
  }

  return response
})
```

### クライアント側の実装

```typescript
const supabaseUrl = 'https://<project-ref>.supabase.co'
const anonKey = '<ANON_KEY>'

// WebSocket 接続を確立
const ws = new WebSocket(
  `${supabaseUrl.replace('https://', 'wss://')}/functions/v1/websocket-function`,
  // Authorization はプロトコルとして渡すか、URL パラメータで渡す
)

ws.onopen = () => {
  console.log('Connected to Edge Function')
  ws.send(JSON.stringify({ message: 'Hello from client!' }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  console.log('Server message:', data)
}

ws.onerror = (error) => {
  console.error('WebSocket error:', error)
}

ws.onclose = (event) => {
  console.log('Disconnected:', event.code, event.reason)
}
```

### チャット風の実装例

```typescript
const clients = new Set<WebSocket>()

Deno.serve((req: Request) => {
  const upgrade = req.headers.get('upgrade') || ''

  if (upgrade.toLowerCase() !== 'websocket') {
    return new Response('Expected WebSocket', { status: 426 })
  }

  const { socket, response } = Deno.upgradeWebSocket(req)

  socket.onopen = () => {
    clients.add(socket)
    console.log(`Client connected. Total: ${clients.size}`)
  }

  socket.onmessage = (event) => {
    // 全クライアントにブロードキャスト
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(event.data)
      }
    }
  }

  socket.onclose = () => {
    clients.delete(socket)
    console.log(`Client disconnected. Total: ${clients.size}`)
  }

  return response
})
```

## 注意点

- WebSocket 接続はエッジの単一インスタンスに固定されるため、マルチインスタンス間でのブロードキャストには Supabase Realtime や外部メッセージブローカーが必要
- WebSocket 接続にも実行時間制限が適用される
- JWT 検証が有効な場合、WebSocket アップグレードリクエストにも Authorization ヘッダーが必要
- `Deno.upgradeWebSocket()` は Deno 標準 API
- 接続が切断された場合のリコネクションロジックはクライアント側で実装する必要がある
- 上記のチャット例はシングルインスタンス内でのみ動作する（スケーリング時は注意）

## 関連

- [概要](./overview.md)
- [認証・CORS](./auth.md)
- [制限事項](./limits.md)
- [バックグラウンドタスク](./background-tasks.md)
