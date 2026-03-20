# Captcha

Captcha プラグインは、キーエンドポイントに captcha 検証を追加することでボット保護を統合する。サインアップ、サインイン、パスワードリセットなどのアクションを人間のユーザーのみが実行できるようにする。

サポートプロバイダー: Google reCAPTCHA、Cloudflare Turnstile、hCaptcha、CaptchaFox

Email & Password 認証ではそのまま動作する。他の認証方法では `endpoints` 配列の設定が必要。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { captcha } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        captcha({
            provider: "cloudflare-turnstile",
            // "google-recaptcha" | "hcaptcha" | "captchafox"
            secretKey: process.env.TURNSTILE_SECRET_KEY!,
        }),
    ],
})
```

### クライアント側

```typescript
await authClient.signIn.email({
    email: "user@example.com",
    password: "secure-password",
    fetchOptions: {
        headers: {
            "x-captcha-response": turnstileToken,
        },
    },
})
```

`x-captcha-user-remote-ip` ヘッダーは不要。IP 検出はサーバー側で自動的に行われる。

### 推奨クライアントライブラリ

- **Cloudflare Turnstile**: `@marsidev/react-turnstile`
- **Google reCAPTCHA**: `react-google-recaptcha`（v2）、`react-google-recaptcha-v3`（v3）
- **hCaptcha**: `@hcaptcha/react-hcaptcha`
- **CaptchaFox**: `@captchafox/react`

## 動作の仕組み

1. 設定されたエンドポイントへの全 POST リクエストをインターセプト
2. プロバイダーの `/siteverify` エンドポイントでサーバー側トークン検証
3. トークンがない、拒否された、または `/siteverify` が利用できない場合はエラーを返す
4. トークンが受け入れられた場合はリクエストを続行

## 設定オプション

| オプション | 型 | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `provider` | string | Yes | - | captcha プロバイダー |
| `secretKey` | string | Yes | - | サーバー側検証用のプロバイダーシークレットキー |
| `endpoints` | string[] | No | `["/sign-up/email", "/sign-in/email", "/request-password-reset"]` | captcha 検証を強制するパス |
| `minScore` | number | No | 0.5 | 最小スコア閾値（Google reCAPTCHA v3 のみ） |
| `siteKey` | string | No | - | サイトキー間のトークン再利用防止（hCaptcha、CaptchaFox のみ） |
| `siteVerifyURLOverride` | string | No | - | captcha 検証リクエストのカスタム URL |

## 注意点

- トークン検証はサーバー上でのみ行われる
- IP アドレスはサーバー側で自動検出される
- トークンがないか拒否された場合、リクエストは中断される
