# Edge Functions バックグラウンドタスク

レスポンス返却後もバックグラウンドで処理を継続する方法。

## 概要

`EdgeRuntime.waitUntil(promise)` を使うと、クライアントにレスポンスを即座に返しつつ、バックグラウンドで非同期処理を継続できる。メール送信、ログ記録、外部 API 呼び出しなど、レスポンスに直接影響しない処理をバックグラウンドで実行することで、レスポンスタイムを改善できる。

### 動作の仕組み

1. 関数がレスポンスを返す
2. クライアントはレスポンスを即座に受信
3. `waitUntil` に渡された Promise が解決されるまで、関数の実行が継続
4. Promise が解決（または reject）されると、関数の実行が完了

## コード例

### 基本的な使い方

```typescript
Deno.serve(async (req: Request) => {
  // バックグラウンドで実行する処理
  const backgroundTask = async () => {
    // 時間のかかる処理（例: 外部 API 呼び出し）
    await fetch('https://api.example.com/analytics', {
      method: 'POST',
      body: JSON.stringify({ event: 'function_called', timestamp: Date.now() }),
      headers: { 'Content-Type': 'application/json' },
    })
    console.log('Background task completed')
  }

  // バックグラウンドタスクを登録
  EdgeRuntime.waitUntil(backgroundTask())

  // 即座にレスポンスを返す
  return new Response(
    JSON.stringify({ message: 'Request accepted' }),
    {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    },
  )
})
```

### メール送信のバックグラウンド処理

```typescript
Deno.serve(async (req: Request) => {
  const { email, orderId } = await req.json()

  // バックグラウンドでメール送信
  EdgeRuntime.waitUntil(
    (async () => {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'noreply@example.com',
            to: email,
            subject: `Order #${orderId} Confirmation`,
            html: `<p>Your order #${orderId} has been confirmed.</p>`,
          }),
        })
        console.log(`Confirmation email sent to ${email}`)
      } catch (error) {
        console.error('Failed to send email:', error)
      }
    })()
  )

  // 即座に注文確認レスポンスを返す
  return new Response(
    JSON.stringify({ orderId, status: 'confirmed' }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### 複数のバックグラウンドタスク

```typescript
Deno.serve(async (req: Request) => {
  const { userId, action } = await req.json()

  // 複数のバックグラウンドタスクを登録可能
  EdgeRuntime.waitUntil(logAnalytics(userId, action))
  EdgeRuntime.waitUntil(updateUserActivity(userId))
  EdgeRuntime.waitUntil(sendNotification(userId, action))

  return new Response(
    JSON.stringify({ status: 'ok' }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})

async function logAnalytics(userId: string, action: string) {
  // 分析ログの記録
  console.log(`Analytics: ${userId} performed ${action}`)
}

async function updateUserActivity(userId: string) {
  // ユーザーアクティビティの更新
  console.log(`Updated activity for ${userId}`)
}

async function sendNotification(userId: string, action: string) {
  // 通知の送信
  console.log(`Notification sent to ${userId}`)
}
```

## 注意点

- `EdgeRuntime.waitUntil()` は Supabase Edge Functions 固有の API（Deno Deploy の標準 API ではない）
- バックグラウンドタスクも関数の実行時間制限（Wall Clock Time）に含まれる
- バックグラウンドタスク内のエラーはレスポンスに影響しないため、適切にエラーハンドリングすること
- `waitUntil` に渡す Promise が reject された場合でも、クライアントに送信済みのレスポンスには影響しない
- 複数の `waitUntil` を呼び出すことが可能で、すべての Promise が解決されるまで実行が継続される
- バックグラウンドタスクからレスポンスを返すことはできない

## 関連

- [概要](./overview.md)
- [制限事項](./limits.md)
- [スケジュール実行](./scheduling.md)
- [デバッグ](./debugging.md)
