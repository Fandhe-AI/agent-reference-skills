# Realtime 制限・ベンチマーク・エラーコード

Realtime の同時接続数、メッセージサイズ、レート制限、料金、エラーコード。

## 概要

Supabase Realtime にはプランごとに異なる制限が設けられている。同時接続数、メッセージサイズ、メッセージレート、チャネル数などに上限があり、プロダクション環境ではこれらの制限を理解した上で設計する必要がある。

### プラン別の同時接続数

| プラン | Peak Connections（同時接続数） |
|--------|-------------------------------|
| Free | 200 |
| Pro | 500（追加購入可能） |
| Team | 1,000+（追加購入可能） |
| Enterprise | カスタム |

### メッセージ制限

| 項目 | 制限値 |
|------|--------|
| メッセージサイズ（payload） | 最大 1 MB |
| 1秒あたりのメッセージ数（クライアント） | `eventsPerSecond` で設定（デフォルト 10） |
| 1秒あたりのメッセージ数（チャネル） | プランにより異なる |

### チャネル制限

| 項目 | 制限値 |
|------|--------|
| 接続あたりのチャネル数 | 制限なし（実質的にはリソースに依存） |
| チャネルあたりの Postgres Changes リスナー | 推奨: 少数に抑える |

### 料金

| 項目 | Free | Pro | Team |
|------|------|-----|------|
| Peak Connections | 200 まで無料 | 500 まで含む | 1,000+ まで含む |
| Messages | 200万/月まで無料 | 500万/月まで含む | 500万/月まで含む |
| 追加 Peak Connections | 不可 | $10 / 1,000 接続 | $10 / 1,000 接続 |
| 追加 Messages | 不可 | $2.50 / 100万メッセージ | $2.50 / 100万メッセージ |

### 主要エラーコード

| コード | 名前 | 説明 |
|--------|------|------|
| `CHANNEL_ERROR` | チャネルエラー | チャネルへの参加に失敗した場合。RLS ポリシー違反など |
| `TIMED_OUT` | タイムアウト | サーバーからの応答がタイムアウトした場合 |
| `CLOSED` | クローズ | チャネルまたは接続がクローズされた場合 |
| `TOKEN_EXPIRED` | トークン期限切れ | JWT トークンが期限切れ。`setAuth()` で更新が必要 |
| `RATE_LIMIT_EXCEEDED` | レート制限超過 | 送信レートが制限を超えた場合 |
| `TOO_MANY_CONNECTIONS` | 接続数超過 | プランの同時接続数上限を超えた場合 |
| `INVALID_TOKEN` | 無効なトークン | JWT トークンが無効（署名不正、不正な形式など） |
| `TENANT_NOT_FOUND` | テナント未発見 | プロジェクトの Realtime 設定が見つからない |

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10, // クライアントの送信レート制限
    },
  },
})

// --- エラーハンドリング ---

const channel = supabase.channel('room-1')

channel
  .on('broadcast', { event: 'message' }, (payload) => {
    console.log('Received:', payload)
  })
  .subscribe((status, err) => {
    if (status === 'SUBSCRIBED') {
      console.log('Connected successfully')
    }
    if (status === 'CHANNEL_ERROR') {
      console.error('Channel error:', err?.message)
      // RLS ポリシー違反や認可エラーの可能性
    }
    if (status === 'TIMED_OUT') {
      console.error('Connection timed out')
      // ネットワーク問題やサーバー過負荷の可能性
    }
    if (status === 'CLOSED') {
      console.log('Channel closed')
    }
  })

// --- 接続状態の監視 ---

supabase.realtime.onOpen(() => {
  console.log('WebSocket connected')
})

supabase.realtime.onClose(() => {
  console.log('WebSocket disconnected')
})

supabase.realtime.onError((error) => {
  console.error('WebSocket error:', error)
})

// --- レート制限を考慮した送信 ---

// eventsPerSecond を超えないように送信を制御する
// supabase-js は内部的にキューイングを行うが、超過時は警告が出る
async function sendWithRateLimit(channel: any, event: string, payload: any) {
  try {
    const result = await channel.send({
      type: 'broadcast',
      event,
      payload,
    })
    if (result === 'ok') {
      console.log('Message sent successfully')
    } else if (result === 'timed out') {
      console.warn('Message send timed out')
    } else {
      console.error('Message send failed:', result)
    }
  } catch (error) {
    console.error('Send error:', error)
  }
}
```

## 注意点

- Peak Connections は同時接続数の最大値で計測される。請求期間中の最大ピーク値が課金対象
- Messages は送受信の合計でカウントされる。1つの Broadcast メッセージが10クライアントに配信される場合、11メッセージ（1送信 + 10受信）としてカウントされる
- メッセージサイズの 1MB 制限は payload 全体に対する制限。Base64 エンコードされたデータなどは実データよりサイズが大きくなるため注意
- Free プランでは制限を超えた場合、新規接続が拒否される。既存接続は維持される
- `eventsPerSecond` のデフォルト値は 10。高頻度の送信が必要な場合は値を増やすことができるが、サーバー側のレート制限も考慮すること
- Postgres Changes は論理レプリケーションのスロットを消費するため、過度に多くのリスナーを設定するとデータベースのパフォーマンスに影響する
- 大規模なアプリケーションでは、チャネル設計（粒度）を適切に行い、不要なメッセージの配信を最小限に抑えることが重要

## 関連

- [Realtime 概要](./overview.md)
- [Broadcast](./broadcast.md)
- [Presence](./presence.md)
- [Postgres Changes](./postgres-changes.md)
- [認可](./authorization.md)
- [プロトコル](./protocol.md)
