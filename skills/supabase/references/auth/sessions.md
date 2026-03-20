# セッション管理

JWT ベースのセッション管理、PKCE フロー、リフレッシュトークン、認証状態の監視。

## 概要

Supabase Auth のセッションは、アクセストークン（JWT）とリフレッシュトークンのペアで管理される。アクセストークンは短命で、期限切れ時にリフレッシュトークンを使って更新される。

### 認証フロー

**PKCE フロー（Proof Key for Code Exchange）**（推奨）:
- サーバーサイドアプリケーションおよびモバイルアプリに推奨
- code_verifier と code_challenge を使用した安全なフロー
- リダイレクト先でコードをトークンに交換する
- `@supabase/ssr` パッケージではデフォルトで PKCE を使用

**Implicit フロー**:
- SPA（Single Page Application）向け
- トークンが URL フラグメントで返される
- PKCE より安全性が低い

### セッション構造

```
{
  access_token: string,    // JWT（短命、デフォルト 3600 秒）
  refresh_token: string,   // リフレッシュトークン（長命）
  expires_in: number,      // アクセストークンの残り有効秒数
  expires_at: number,      // アクセストークンの有効期限（UNIX タイムスタンプ）
  token_type: 'bearer',
  user: User               // ユーザーオブジェクト
}
```

### onAuthStateChange イベント

| イベント | 説明 |
|----------|------|
| `INITIAL_SESSION` | 初期セッション読み込み時 |
| `SIGNED_IN` | ユーザーがログインした時 |
| `SIGNED_OUT` | ユーザーがログアウトした時 |
| `TOKEN_REFRESHED` | トークンが更新された時 |
| `PASSWORD_RECOVERY` | パスワードリカバリーリンクがクリックされた時 |
| `USER_UPDATED` | ユーザー情報が更新された時 |
| `MFA_CHALLENGE_VERIFIED` | MFA チャレンジが検証された時 |

## コード例

```typescript
// === セッション取得 ===

// クライアントサイドでセッションを取得（ローカルストレージから）
const { data: { session }, error } = await supabase.auth.getSession()

// サーバーサイドでユーザーを検証（Auth サーバーに問い合わせ）
const { data: { user }, error } = await supabase.auth.getUser()

// === 認証状態の監視 ===

const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    switch (event) {
      case 'INITIAL_SESSION':
        // 初期セッション読み込み完了
        break
      case 'SIGNED_IN':
        console.log('User signed in:', session?.user.email)
        break
      case 'SIGNED_OUT':
        console.log('User signed out')
        // ログインページにリダイレクト等
        break
      case 'TOKEN_REFRESHED':
        console.log('Token refreshed')
        break
      case 'PASSWORD_RECOVERY':
        // パスワードリセットフォームを表示
        break
      case 'USER_UPDATED':
        console.log('User updated:', session?.user)
        break
    }
  }
)

// リスナーの解除
subscription.unsubscribe()

// === PKCE フロー（サーバーサイド） ===

// 1. ログインを開始（コード交換用のURLが生成される）
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/auth/callback',
  },
})

// 2. コールバックでコードをセッションに交換
// /auth/callback ルートで:
const code = url.searchParams.get('code')
if (code) {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
}

// === サインアウト ===

// ローカルセッションのみ削除
const { error } = await supabase.auth.signOut({ scope: 'local' })

// すべてのデバイスからサインアウト
const { error: globalError } = await supabase.auth.signOut({ scope: 'global' })

// === セッション有効期限の設定（ダッシュボード） ===
// Auth Settings > JWT Expiry で設定
// デフォルト: 3600 秒（1 時間）
// リフレッシュトークンの有効期限も設定可能

// === セッションのリフレッシュ ===

// 手動でセッションをリフレッシュ
const { data: { session }, error } = await supabase.auth.refreshSession()

// 特定のリフレッシュトークンでリフレッシュ
const { data: { session }, error: refreshError } = await supabase.auth.refreshSession({
  refresh_token: 'your-refresh-token',
})
```

## 注意点

- `getSession()` はローカルストレージからセッションを取得するため、サーバーサイドでは信頼しないこと。`getUser()` を使用して Auth サーバーでトークンを検証すること
- `onAuthStateChange` はアプリケーションのルートレベルで 1 回だけ設定するのがベストプラクティス
- PKCE フローを使用する場合、`exchangeCodeForSession()` をコールバック URL で呼び出す必要がある
- リフレッシュトークンは一度使用すると無効化される（ローテーション）
- グローバルサインアウト（`scope: 'global'`）は、すべてのデバイスのセッションを無効化する
- `supabase-js` はデフォルトでアクセストークンの自動リフレッシュを行う

## 関連

- [Auth 概要](./overview.md)
- [JWT 構造](./jwts.md)
- [サーバーサイド認証](./server-side.md)
- [リダイレクト URL](./redirect-urls.md)
