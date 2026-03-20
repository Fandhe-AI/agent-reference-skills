# Edge Functions デバッグ・ロギング

Edge Functions のデバッグ方法とログの確認手段。

## 概要

Edge Functions のデバッグには、`console.log` によるログ出力、Supabase ダッシュボードでのログ確認、CLI での `--debug` フラグ、Chrome DevTools Inspector Protocol の利用がある。ローカル開発時は `supabase functions serve` のターミナル出力でログを確認でき、本番環境ではダッシュボードや Edge Function Logs API でログを取得できる。

### ログの確認方法

| 方法 | 環境 | 説明 |
|---|---|---|
| ターミナル出力 | ローカル | `supabase functions serve` のコンソール |
| ダッシュボード | 本番 | Edge Functions > Logs |
| CLI | 本番 | `supabase functions logs` |
| Logs API | 本番 | REST API でログを取得 |
| Inspector | ローカル | Chrome DevTools でステップ実行 |

## コード例

### console.log によるロギング

```typescript
Deno.serve(async (req: Request) => {
  // 基本的なログ
  console.log('Function invoked')

  // リクエスト情報のログ
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  try {
    const body = await req.json()
    console.log('Request body:', JSON.stringify(body))

    // 処理のログ
    console.log('Processing started')
    const result = processData(body)
    console.log('Processing completed:', JSON.stringify(result))

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // エラーログ
    console.error('Error occurred:', error.message)
    console.error('Stack trace:', error.stack)

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})

function processData(data: any) {
  console.log('processData called with:', data)
  return { processed: true, ...data }
}
```

### ログレベルの使い分け

```typescript
Deno.serve(async (req: Request) => {
  console.log('INFO: Function called')       // 一般的な情報
  console.info('INFO: Request received')      // 情報レベル
  console.warn('WARN: Deprecated parameter used')  // 警告
  console.error('ERROR: Something went wrong')     // エラー
  console.debug('DEBUG: Detailed debug info')      // デバッグ情報

  // 構造化ログ
  console.log(JSON.stringify({
    level: 'info',
    message: 'Function invoked',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: new URL(req.url).pathname,
  }))

  return new Response('ok')
})
```

### ローカルデバッグ（--debug フラグ）

```bash
# デバッグモードで関数を起動
supabase functions serve --debug

# 特定の関数のみデバッグ
supabase functions serve hello-world --debug
```

### Chrome DevTools Inspector Protocol

```bash
# Inspector Protocol を有効にして起動
supabase functions serve --inspect-mode brk

# Chrome DevTools で接続:
# 1. Chrome で chrome://inspect を開く
# 2. "Configure..." をクリックして localhost:8083 を追加
# 3. Target が表示されたら "inspect" をクリック
# 4. ブレークポイントを設定してステップ実行が可能
```

### CLI でのログ確認（本番環境）

```bash
# 最新のログを取得
supabase functions logs hello-world

# リアルタイムでログをフォロー（--tail に相当）
supabase functions logs hello-world --scroll
```

### エラーハンドリングとデバッグ

```typescript
Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID()
  console.log(`[${requestId}] Request received: ${req.method} ${req.url}`)

  try {
    const startTime = performance.now()

    // 処理
    const body = await req.json()
    console.log(`[${requestId}] Body parsed:`, JSON.stringify(body))

    const result = await heavyProcess(body, requestId)

    const duration = performance.now() - startTime
    console.log(`[${requestId}] Completed in ${duration.toFixed(2)}ms`)

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': requestId,
      },
    })
  } catch (error) {
    console.error(`[${requestId}] Error:`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })

    return new Response(
      JSON.stringify({ error: error.message, requestId }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': requestId,
        },
      },
    )
  }
})

async function heavyProcess(data: any, requestId: string) {
  console.log(`[${requestId}] Starting heavy process...`)
  // 処理
  return { success: true }
}
```

### ダッシュボードでのログ確認

Supabase ダッシュボード > Edge Functions > 該当関数 > Logs タブで以下を確認可能:

- リクエストのステータスコード
- 実行時間
- console.log / console.error の出力
- エラースタックトレース

## 注意点

- `console.log` の出力は本番環境のダッシュボードにも表示される
- 機密情報（API キー、パスワード等）をログに出力しないこと
- ログの保持期間はプランによって異なる
- `--debug` フラグはローカル開発時のみ使用可能
- Inspector Protocol はローカル開発時のみ使用可能
- 本番環境でのログは数秒の遅延がある場合がある
- 構造化ログ（JSON 形式）を使うと、ログの検索・フィルタリングが容易になる
- 大量のログ出力はパフォーマンスに影響する可能性がある

## 関連

- [クイックスタート](./quickstart.md)
- [テスト](./testing.md)
- [制限事項](./limits.md)
- [シークレット管理](./secrets.md)
