# CAPTCHA 連携

hCaptcha と Cloudflare Turnstile による bot 対策。

## 概要

Supabase Auth は CAPTCHA プロバイダと連携して、自動化された不正なサインアップやサインインを防止できる。サポートされているプロバイダは以下の 2 つ:

| プロバイダ | 特徴 |
|-----------|------|
| **hCaptcha** | プライバシー重視の CAPTCHA サービス |
| **Cloudflare Turnstile** | ユーザーフレンドリーな非対話型チャレンジ |

### ダッシュボード設定

1. Auth > Settings > Security で CAPTCHA プロバイダを選択
2. プロバイダの Site Key と Secret Key を設定
3. 保護するエンドポイントを選択（Sign Up, Sign In 等）

### 対応エンドポイント

- サインアップ（`signUp`）
- パスワードサインイン（`signInWithPassword`）
- パスワードレスサインイン（`signInWithOtp`）
- パスワードリセット（`resetPasswordForEmail`）

## コード例

```typescript
// === hCaptcha の実装 ===

// 1. hCaptcha スクリプトをロード
// <script src="https://js.hcaptcha.com/1/api.js" async defer></script>

// 2. hCaptcha ウィジェットを配置
// <div id="hcaptcha" class="h-captcha" data-sitekey="your-site-key"></div>

// 3. トークンを取得してサインアップ
const captchaToken = (window as any).hcaptcha.getResponse()

const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    captchaToken,
  },
})

// hCaptcha をリセット
;(window as any).hcaptcha.reset()

// === Cloudflare Turnstile の実装 ===

// 1. Turnstile スクリプトをロード
// <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

// 2. Turnstile ウィジェットを配置
// <div class="cf-turnstile" data-sitekey="your-site-key"></div>

// 3. トークンを取得してサインイン
const turnstileToken = document.querySelector<HTMLInputElement>(
  '[name="cf-turnstile-response"]'
)?.value

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
  options: {
    captchaToken: turnstileToken,
  },
})

// === React での hCaptcha 実装 ===

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useRef, useState } from 'react'

function SignUpForm() {
  const captchaRef = useRef<HCaptcha>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!captchaToken) {
      alert('Please complete the CAPTCHA')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options: {
        captchaToken,
      },
    })

    // CAPTCHA をリセット
    captchaRef.current?.resetCaptcha()
    setCaptchaToken(null)

    if (error) {
      console.error('Sign up error:', error.message)
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <HCaptcha
        ref={captchaRef}
        sitekey="your-site-key"
        onVerify={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

// === OTP サインインでの CAPTCHA ===

const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    captchaToken: captchaToken,
  },
})

// === パスワードリセットでの CAPTCHA ===

const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  {
    redirectTo: 'https://example.com/reset-password',
    captchaToken: captchaToken,
  }
)
```

## 注意点

- CAPTCHA トークンは一度使用すると無効化される。リクエスト後にウィジェットをリセットすること
- hCaptcha のトークンは 2 分間有効。期限切れの場合は再チャレンジが必要
- Cloudflare Turnstile は非対話型のため、ユーザー体験がより良い（推奨）
- CAPTCHA を有効にしても、Admin API（service_role）からのリクエストには CAPTCHA は不要
- テスト環境では、hCaptcha のテスト用 Site Key（`10000000-ffff-ffff-ffff-000000000001`）を使用できる
- CAPTCHA はクライアントサイドでのみ実装が必要。サーバーサイド API では Supabase Auth が自動的にトークンを検証する
- `captchaToken` を渡さずにリクエストすると、CAPTCHA が有効な場合は `captcha_failed` エラーが返される

## 関連

- [パスワード認証](./passwords.md)
- [レート制限](./rate-limits.md)
- [匿名認証](./anonymous-auth.md)
- [エラーコード](./error-codes.md)
