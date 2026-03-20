# リダイレクト URL 設定

認証フロー後のリダイレクト先 URL の設定と管理。

## 概要

Supabase Auth では、OAuth、マジックリンク、パスワードリセットなどの認証フロー後にユーザーをリダイレクトする URL を管理する必要がある。セキュリティのため、リダイレクト先 URL はダッシュボードの許可リストに登録しなければならない。

### 設定場所

ダッシュボードの **Auth > URL Configuration** で以下を設定:

- **Site URL**: デフォルトのリダイレクト先（必須）
- **Redirect URLs**: 許可するリダイレクト URL のリスト

### ワイルドカードサポート

リダイレクト URL にはワイルドカード（`*`）が使用可能:

| パターン | マッチ例 |
|---------|---------|
| `https://*.example.com/**` | `https://app.example.com/dashboard` |
| `https://example.com/*` | `https://example.com/callback` |
| `http://localhost:*/**` | `http://localhost:3000/auth/callback` |

## コード例

```typescript
// === redirectTo の指定 ===

// OAuth サインインでリダイレクト先を指定
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/auth/callback',
  },
})

// マジックリンクでリダイレクト先を指定
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/dashboard',
  },
})

// パスワードリセットでリダイレクト先を指定
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  {
    redirectTo: 'https://example.com/reset-password',
  }
)

// サインアップでメール確認後のリダイレクト先を指定
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    emailRedirectTo: 'https://example.com/welcome',
  },
})

// === 開発環境用の設定 ===

// ダッシュボードの Redirect URLs に追加:
// http://localhost:3000/**
// http://localhost:5173/**
// http://127.0.0.1:3000/**

// === Vercel プレビューデプロイ用 ===

// ダッシュボードの Redirect URLs に追加:
// https://*-your-team.vercel.app/**

// === ディープリンク（モバイルアプリ） ===

// iOS: カスタム URL スキーム
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'myapp://auth/callback',
  },
})

// Android: カスタム URL スキーム
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'myapp://auth/callback',
  },
})

// ダッシュボードの Redirect URLs に追加:
// myapp://auth/callback

// === Expo / React Native ===

import { makeRedirectUri } from 'expo-auth-session'
import * as QueryParams from 'expo-auth-session/build/QueryParams'
import * as Linking from 'expo-linking'

// Expo のリダイレクト URI を生成
const redirectTo = makeRedirectUri()
// 開発: exp://192.168.1.10:8081
// プロダクション: myapp://

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo,
    skipBrowserRedirect: true,
  },
})

// ブラウザを開く
if (data?.url) {
  const result = await WebBrowser.openAuthSessionAsync(
    data.url,
    redirectTo
  )

  if (result.type === 'success') {
    const { url } = result
    // URL からセッションを抽出
    const { params, errorCode } = QueryParams.getQueryParams(url)

    if (params?.code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        params.code
      )
    }
  }
}

// === コールバックルートの実装 ===

// Next.js: app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

## 注意点

- `redirectTo` に指定する URL は、ダッシュボードの Redirect URLs に登録されている必要がある。未登録の URL は無視され、Site URL にリダイレクトされる
- ワイルドカードは便利だが、過度に広いパターン（例: `https://**`）はセキュリティリスクがある
- `localhost` は開発環境でのみ使用し、本番環境では削除すること
- iOS / Android のディープリンクを使用する場合、カスタム URL スキームをダッシュボードに登録する必要がある
- Expo の開発環境では `exp://` スキームが使用されるが、ビルド時にはアプリのカスタムスキームに変わる
- メール内のリダイレクト URL は `emailRedirectTo`、OAuth のリダイレクト URL は `redirectTo` パラメータで指定する（名前が異なることに注意）
- PKCE フローでは、リダイレクト先で `exchangeCodeForSession()` を呼ぶ必要がある

## 関連

- [Auth 概要](./overview.md)
- [ソーシャルログイン](./social-login.md)
- [サーバーサイド認証](./server-side.md)
- [セッション管理](./sessions.md)
