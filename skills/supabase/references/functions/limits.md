# Edge Functions 制限事項

Edge Functions のリソース制限、実行制限、料金体系。

## 概要

Edge Functions にはメモリ、実行時間、ペイロードサイズ、同時実行数などの制限がある。プランによって制限値が異なり、Pro プラン以上ではカスタマイズ可能な項目もある。料金は呼び出し回数と実行時間に基づいて課金される。

### リソース制限

| 項目 | Free プラン | Pro プラン | 備考 |
|---|---|---|---|
| メモリ | 256MB | 256MB / 512MB / 1GB | `config.toml` で変更可能 |
| Wall Clock Time | 150 秒 | 400 秒 | レスポンスまでの経過時間 |
| CPU Time | 2 秒/リクエスト | 2 秒/リクエスト | 実際の CPU 使用時間（I/O 待ち除く） |
| リクエストペイロード | 100MB | 100MB | リクエストボディの最大サイズ |
| レスポンスペイロード | - | - | ストリーミングの場合は制限なし |
| 同時実行数 | - | - | リージョンごとに自動スケーリング |

### プロジェクト内の関数数

| プラン | 最大関数数 |
|--------|-----------|
| Free | 100 |
| Pro | 500 |
| Team | 1,000 |
| Enterprise | 無制限 |

### その他の制限

| 項目 | 制限値 |
|------|--------|
| バンドルサイズ（圧縮後） | 20MB |
| シークレット数 | 100 / プロジェクト |
| シークレット名の長さ | 最大 256 文字 |
| シークレットのサイズ | 48 KiB |
| ログメッセージ長 | 10,000 文字 |
| ログ記録しきい値 | 100 イベント / 10 秒 |

### Wall Clock Time vs CPU Time

- **Wall Clock Time**: 関数が呼び出されてからレスポンスを返すまでの実際の経過時間。外部 API の待ち時間を含む
- **CPU Time**: JavaScript/TypeScript コードが実際に CPU を使用した時間。I/O 待ちは含まない

### 料金

| 項目 | Free プラン | Pro プラン |
|---|---|---|
| 呼び出し回数 | 500,000 回/月 | 2,000,000 回/月（含む） |
| 超過分（呼び出し） | - | $2 / 100 万回 |
| 実行時間 | - | 含まれる |

### メモリ設定

```toml
# supabase/config.toml
[functions.heavy-function]
memory = 512  # 512MB に変更（デフォルト: 256MB）

[functions.very-heavy-function]
memory = 1024  # 1GB に変更
```

## コード例

### 実行時間の考慮

```typescript
Deno.serve(async (req: Request) => {
  const startTime = performance.now()

  // 外部 API 呼び出し（Wall Clock Time に含まれるが CPU Time にはほぼ含まれない）
  const response = await fetch('https://api.example.com/data')
  const data = await response.json()

  // CPU 処理（CPU Time に含まれる）
  const processedData = data.map((item: any) => ({
    ...item,
    processed: true,
  }))

  const duration = performance.now() - startTime
  console.log(`Execution time: ${duration}ms`)

  return new Response(JSON.stringify(processedData), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 大きなペイロードのストリーミング

```typescript
Deno.serve(async (req: Request) => {
  // ストリーミングレスポンスでペイロード制限を回避
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 1000; i++) {
        const chunk = JSON.stringify({ index: i, data: 'chunk' }) + '\n'
        controller.enqueue(new TextEncoder().encode(chunk))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Transfer-Encoding': 'chunked',
    },
  })
})
```

### タイムアウト対策

```typescript
Deno.serve(async (req: Request) => {
  // AbortController でタイムアウトを設定
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 120_000) // 120 秒

  try {
    const response = await fetch('https://slow-api.example.com/data', {
      signal: controller.signal,
    })
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      return new Response(
        JSON.stringify({ error: 'Request timed out' }),
        { status: 504, headers: { 'Content-Type': 'application/json' } },
      )
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
})
```

## 注意点

- Wall Clock Time の制限には、バックグラウンドタスク（`EdgeRuntime.waitUntil`）の実行時間も含まれる
- CPU Time は I/O 待ち（fetch、DB クエリ等）を含まないため、通常は Wall Clock Time より大幅に短い
- CPU Time の 2 秒制限はリクエストごとの制限。処理量の多いバッチ系タスクでは超過する可能性がある
- メモリ制限を超えると関数が強制終了される
- Free プランでは月間 500,000 回の呼び出しが上限
- ストリーミングレスポンスを使うと、大きなレスポンスでもメモリ効率良く返却可能
- 同時実行数は自動スケーリングされるが、突発的な大量リクエストでは制限にかかる場合がある
- `config.toml` でのメモリ設定変更は Pro プラン以上で利用可能
- コールドスタート時間は制限には含まれない
- シークレット名に `SUPABASE_` プレフィックスは使用不可（システム予約）
- ポート 25 および 587 へのアウトバウンド接続はブロックされる
- カスタムドメインなしで HTML を返すと自動的にプレーンテキストに変換される

## 関連

- [概要](./overview.md)
- [バックグラウンドタスク](./background-tasks.md)
- [デバッグ](./debugging.md)
- [デプロイ](./deploy.md)
