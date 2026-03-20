# Auth レート制限

認証エンドポイント別のレート制限と対策。

## 概要

Supabase Auth は、サービスの安定性と不正アクセス防止のために、各エンドポイントにレート制限を設けている。レート制限を超えると HTTP 429（Too Many Requests）エラーが返される。

### エンドポイント別レート制限（Free プラン）

| エンドポイント | 制限 | 期間 |
|---------------|------|------|
| サインアップ（`signUp`） | 制限あり | IP あたり |
| サインイン（`signInWithPassword`） | 制限あり | IP あたり |
| OTP 送信（`signInWithOtp`） | 制限あり | IP あたり |
| パスワードリセット | 制限あり | IP あたり |
| トークンリフレッシュ | 制限あり | IP あたり |
| ユーザー情報取得 | 制限あり | IP あたり |

### メール送信制限

| 種類 | Free プラン | Pro プラン |
|------|-----------|-----------|
| メール送信（合計） | 2 通/時間 | 制限緩和可能 |
| 同一アドレスへの送信 | 60 秒に 1 通 | 60 秒に 1 通 |
| 確認メール | レート制限あり | 制限緩和可能 |

### SMS 送信制限

| 種類 | 制限 |
|------|------|
| SMS 送信 | 60 秒に 1 通（同一番号） |
| SMS 送信（合計） | プランにより異なる |

### プラン別の制限

| プラン | 特徴 |
|--------|------|
| **Free** | 厳格なレート制限。開発・テスト向け |
| **Pro** | レート制限の緩和が可能。サポートに連絡して制限値を調整 |
| **Enterprise** | カスタムレート制限の設定が可能 |

## コード例

```typescript
// === レート制限エラーのハンドリング ===

async function signInWithRetry(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.status === 429) {
      // レート制限に到達
      console.error('Rate limit exceeded. Please try again later.')

      // Retry-After ヘッダーがある場合はその時間を待つ
      // ユーザーに待機を促す UI を表示
      showRateLimitMessage()
      return
    }

    console.error('Sign in error:', error.message)
    return
  }

  return data
}

// === OTP 送信のレート制限対策 ===

async function sendOTP(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
  })

  if (error) {
    if (error.status === 429) {
      // メール送信のレート制限
      // "Email rate limit exceeded" など
      showMessage('メールの送信制限に達しました。60 秒後に再試行してください。')
      return
    }

    if (error.message.includes('rate limit')) {
      showMessage('送信制限に達しました。しばらくお待ちください。')
      return
    }
  }

  showMessage('確認コードを送信しました。')
}

// === クライアントサイドでの送信制限 ===

// 連続送信を防止するデバウンス
let lastSendTime = 0
const SEND_INTERVAL = 60000 // 60秒

async function sendOTPWithThrottle(email: string) {
  const now = Date.now()
  const elapsed = now - lastSendTime

  if (elapsed < SEND_INTERVAL) {
    const remaining = Math.ceil((SEND_INTERVAL - elapsed) / 1000)
    showMessage(`${remaining} 秒後に再送信できます。`)
    return
  }

  const { data, error } = await supabase.auth.signInWithOtp({ email })

  if (!error) {
    lastSendTime = Date.now()
  }
}

// === React での再送信タイマー ===

import { useState, useEffect } from 'react'

function OTPForm() {
  const [cooldown, setCooldown] = useState(0)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldown])

  async function handleSendOTP() {
    if (cooldown > 0) return

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error?.status === 429) {
      setCooldown(60)
      return
    }

    if (!error) {
      setCooldown(60) // 60秒のクールダウン
    }
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP} disabled={cooldown > 0}>
        {cooldown > 0 ? `再送信 (${cooldown}秒)` : 'OTP を送信'}
      </button>
    </div>
  )
}

// === CAPTCHA によるレート制限対策 ===

// CAPTCHA を有効にすることで、bot による大量リクエストを防止
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    captchaToken: hcaptchaToken,
  },
})

// === サーバーサイドでのレート制限（Edge Function） ===

// Edge Function で独自のレート制限を実装
// Deno.serve(async (req) => {
//   const ip = req.headers.get('x-forwarded-for') || 'unknown'
//   const key = `rate_limit:${ip}`
//
//   // KV ストアやデータベースでレート制限を管理
//   const count = await getRequestCount(key)
//   if (count > 10) {
//     return new Response('Too Many Requests', { status: 429 })
//   }
//
//   await incrementRequestCount(key)
//   // ... 処理を続行
// })
```

## 注意点

- Free プランのメール送信制限は非常に厳格（2 通/時間）。開発時はメール確認を無効にするか、Inbucket を使用すること
- レート制限は IP アドレスベースのため、NAT 環境下では複数ユーザーが同じ制限を共有する可能性がある
- Pro プランでのレート制限緩和は、サポートチームに連絡して依頼する必要がある
- クライアントサイドで送信間隔を制御しても、サーバーサイドのレート制限は独立して適用される
- SMS 送信は外部プロバイダ（Twilio 等）の料金が発生するため、レート制限は特に重要
- CAPTCHA を有効にすることで、bot による不正なリクエストを効果的に防止できる
- `supabase.auth.resend()` メソッドでも OTP / 確認メールを再送信できるが、同じレート制限が適用される
- 本番環境で Free プランを使用する場合は、メール送信制限に特に注意が必要

## 関連

- [Auth 概要](./overview.md)
- [CAPTCHA](./captcha.md)
- [エラーコード](./error-codes.md)
- [メール OTP / Magic Link](./email-passwordless.md)
