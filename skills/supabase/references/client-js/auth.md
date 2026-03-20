# Auth

ユーザー認証に関するクライアントサイドメソッド群。

## メソッド一覧

### `signUp()`

メールアドレスとパスワードで新規ユーザーを登録する。

**Signature:**
```typescript
supabase.auth.signUp(credentials: SignUpWithPasswordCredentials): Promise<AuthResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      first_name: 'John',
      last_name: 'Doe',
    },
    emailRedirectTo: 'https://example.com/welcome',
    captchaToken: 'token',
  },
})
```

**Parameters:**
- `email` (string) — メールアドレス
- `password` (string) — パスワード（6文字以上）
- `options.data` (object) — ユーザーメタデータ（省略可）
- `options.emailRedirectTo` (string) — 確認メールのリダイレクト先（省略可）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { user, session }, error }` — 確認メールが有効な場合、session は null

---

### `signInWithPassword()`

メールアドレスまたは電話番号とパスワードでログインする。

**Signature:**
```typescript
supabase.auth.signInWithPassword(credentials: SignInWithPasswordCredentials): Promise<AuthTokenResponsePassword>
```

**Usage:**
```typescript
// メールでログイン
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
})

// 電話番号でログイン
const { data, error } = await supabase.auth.signInWithPassword({
  phone: '+81901234567',
  password: 'securepassword',
})
```

**Parameters:**
- `email` (string) — メールアドレス（email または phone のいずれか）
- `phone` (string) — 電話番号（email または phone のいずれか）
- `password` (string) — パスワード
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { user, session }, error }`

---

### `signInWithOtp()`

メールアドレスまたは電話番号にワンタイムパスワードを送信してログインする。

**Signature:**
```typescript
supabase.auth.signInWithOtp(credentials: SignInWithPasswordlessCredentials): Promise<AuthOtpResponse>
```

**Usage:**
```typescript
// メール OTP（マジックリンク）
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/dashboard',
    shouldCreateUser: true,
  },
})

// 電話 OTP（SMS）
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+81901234567',
})
```

**Parameters:**
- `email` (string) — メールアドレス（email または phone のいずれか）
- `phone` (string) — 電話番号（email または phone のいずれか）
- `options.emailRedirectTo` (string) — メール内リンクのリダイレクト先（省略可）
- `options.shouldCreateUser` (boolean) — ユーザーが存在しない場合に作成するか（デフォルト: true）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { messageId }, error }`

---

### `signInWithOAuth()`

OAuth プロバイダーでログインする。

**Signature:**
```typescript
supabase.auth.signInWithOAuth(credentials: SignInWithOAuthCredentials): Promise<OAuthResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/dashboard',
    scopes: 'email profile',
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})
```

**Parameters:**
- `provider` (Provider) — OAuth プロバイダー（`'google'`, `'github'`, `'apple'`, `'azure'`, `'discord'`, `'facebook'`, `'twitter'` 等）
- `options.redirectTo` (string) — 認証後のリダイレクト先（省略可）
- `options.scopes` (string) — 要求するスコープ（スペース区切り）（省略可）
- `options.queryParams` (object) — プロバイダーに渡す追加パラメータ（省略可）
- `options.skipBrowserRedirect` (boolean) — ブラウザリダイレクトをスキップ（省略可）

**Returns:** `{ data: { provider, url }, error }`

---

### `signInWithSSO()`

SAML SSO でログインする。

**Signature:**
```typescript
supabase.auth.signInWithSSO(params: SignInWithSSO): Promise<SSOResponse>
```

**Usage:**
```typescript
// プロバイダー ID を指定
const { data, error } = await supabase.auth.signInWithSSO({
  providerId: 'sso-provider-id',
})

// ドメインを指定
const { data, error } = await supabase.auth.signInWithSSO({
  domain: 'company.com',
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})
```

**Parameters:**
- `providerId` (string) — SSO プロバイダー ID（providerId または domain のいずれか）
- `domain` (string) — SSO ドメイン（providerId または domain のいずれか）
- `options.redirectTo` (string) — 認証後のリダイレクト先（省略可）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { url }, error }`

---

### `signInWithIdToken()`

サードパーティの ID トークンでログインする。

**Signature:**
```typescript
supabase.auth.signInWithIdToken(credentials: SignInWithIdTokenCredentials): Promise<AuthTokenResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'google',
  token: 'google-id-token',
  nonce: 'optional-nonce',
})
```

**Parameters:**
- `provider` (Provider) — ID トークンのプロバイダー（`'google'`, `'apple'`）
- `token` (string) — ID トークン
- `nonce` (string) — ノンス（省略可）

**Returns:** `{ data: { user, session }, error }`

---

### `signInAnonymously()`

匿名ユーザーとしてログインする。

**Signature:**
```typescript
supabase.auth.signInAnonymously(credentials?: SignInAnonymouslyCredentials): Promise<AuthTokenResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.signInAnonymously({
  options: {
    data: { preferred_theme: 'dark' },
    captchaToken: 'token',
  },
})
```

**Parameters:**
- `options.data` (object) — ユーザーメタデータ（省略可）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { user, session }, error }`

---

### `signOut()`

現在のユーザーをログアウトする。

**Signature:**
```typescript
supabase.auth.signOut(options?: SignOutOptions): Promise<{ error: AuthError | null }>
```

**Usage:**
```typescript
// ローカルセッションのみ削除（デフォルト）
const { error } = await supabase.auth.signOut()

// すべてのセッションを削除
const { error } = await supabase.auth.signOut({ scope: 'global' })

// 他のセッションのみ削除
const { error } = await supabase.auth.signOut({ scope: 'others' })
```

**Parameters:**
- `scope` (string) — ログアウトのスコープ。`'global'`（全セッション）/ `'local'`（現在のセッション）/ `'others'`（他のセッション）。デフォルト: `'local'`

**Returns:** `{ error }`

---

### `getUser()`

JWT トークンをサーバーに送信して現在のユーザー情報を取得する。

**Signature:**
```typescript
supabase.auth.getUser(jwt?: string): Promise<UserResponse>
```

**Usage:**
```typescript
const { data: { user }, error } = await supabase.auth.getUser()

// JWT を指定して取得
const { data: { user }, error } = await supabase.auth.getUser(jwt)
```

**Parameters:**
- `jwt` (string) — 検証対象の JWT トークン（省略可。省略時は現在のセッションの JWT を使用）

**Returns:** `{ data: { user }, error }`

---

### `getSession()`

ローカルストレージから現在のセッション情報を取得する。

**Signature:**
```typescript
supabase.auth.getSession(): Promise<{ data: { session: Session | null }, error: AuthError | null }>
```

**Usage:**
```typescript
const { data: { session }, error } = await supabase.auth.getSession()
```

**Parameters:** なし

**Returns:** `{ data: { session }, error }` — session には `access_token`, `refresh_token`, `user` 等が含まれる

---

### `refreshSession()`

現在のセッションを更新し、新しい JWT トークンを取得する。

**Signature:**
```typescript
supabase.auth.refreshSession(currentSession?: { refresh_token: string }): Promise<AuthResponse>
```

**Usage:**
```typescript
const { data: { session }, error } = await supabase.auth.refreshSession()

// 特定のリフレッシュトークンで更新
const { data, error } = await supabase.auth.refreshSession({
  refresh_token: 'refresh-token',
})
```

**Parameters:**
- `currentSession` (object) — リフレッシュトークンを含むオブジェクト（省略可）

**Returns:** `{ data: { user, session }, error }`

---

### `updateUser()`

現在のユーザーの情報を更新する。

**Signature:**
```typescript
supabase.auth.updateUser(attributes: UserAttributes, options?: { emailRedirectTo?: string }): Promise<UserResponse>
```

**Usage:**
```typescript
// メールアドレス変更
const { data, error } = await supabase.auth.updateUser({
  email: 'new@example.com',
})

// パスワード変更
const { data, error } = await supabase.auth.updateUser({
  password: 'new-password',
})

// ユーザーメタデータ更新
const { data, error } = await supabase.auth.updateUser({
  data: { display_name: 'New Name' },
})
```

**Parameters:**
- `email` (string) — 新しいメールアドレス（省略可）
- `password` (string) — 新しいパスワード（省略可）
- `phone` (string) — 新しい電話番号（省略可）
- `data` (object) — ユーザーメタデータ（省略可）
- `options.emailRedirectTo` (string) — メール確認後のリダイレクト先（省略可）

**Returns:** `{ data: { user }, error }`

---

### `resetPasswordForEmail()`

パスワードリセット用のメールを送信する。

**Signature:**
```typescript
supabase.auth.resetPasswordForEmail(email: string, options?: { redirectTo?: string; captchaToken?: string }): Promise<{ data: {}, error: AuthError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  { redirectTo: 'https://example.com/update-password' }
)
```

**Parameters:**
- `email` (string) — パスワードリセット対象のメールアドレス
- `options.redirectTo` (string) — リセットリンクのリダイレクト先（省略可）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: {}, error }`

---

### `verifyOtp()`

OTP トークンを検証する。

**Signature:**
```typescript
supabase.auth.verifyOtp(params: VerifyOtpParams): Promise<AuthResponse>
```

**Usage:**
```typescript
// メール OTP 検証
const { data, error } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'email',
})

// token_hash による検証（サーバーサイド）
const { data, error } = await supabase.auth.verifyOtp({
  token_hash: 'hash-from-url',
  type: 'email',
})
```

**Parameters:**
- `email` (string) — メールアドレス（email+token または token_hash のいずれか）
- `phone` (string) — 電話番号（phone+token の場合）
- `token` (string) — OTP トークン
- `token_hash` (string) — トークンハッシュ（URL から取得）
- `type` (string) — 検証タイプ（`'signup'`, `'email'`, `'sms'`, `'recovery'`, `'invite'`, `'email_change'`, `'phone_change'`, `'magiclink'`）

**Returns:** `{ data: { user, session }, error }`

---

### `resend()`

確認メールまたは SMS を再送する。

**Signature:**
```typescript
supabase.auth.resend(credentials: ResendParams): Promise<AuthOtpResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.resend({
  type: 'signup',
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/welcome',
  },
})
```

**Parameters:**
- `type` (string) — 再送タイプ（`'signup'`, `'email_change'`, `'sms'`, `'phone_change'`）
- `email` (string) — メールアドレス（メールの場合）
- `phone` (string) — 電話番号（SMS の場合）
- `options.emailRedirectTo` (string) — リダイレクト先（省略可）
- `options.captchaToken` (string) — CAPTCHA トークン（省略可）

**Returns:** `{ data: { messageId }, error }`

---

### `onAuthStateChange()`

認証状態の変更を監視するリスナーを登録する。

**Signature:**
```typescript
supabase.auth.onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void): { data: { subscription: Subscription } }
```

**Usage:**
```typescript
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    console.log(event, session)

    if (event === 'SIGNED_IN') {
      // ログイン時の処理
    } else if (event === 'SIGNED_OUT') {
      // ログアウト時の処理
    } else if (event === 'TOKEN_REFRESHED') {
      // トークン更新時の処理
    } else if (event === 'USER_UPDATED') {
      // ユーザー情報更新時の処理
    } else if (event === 'PASSWORD_RECOVERY') {
      // パスワードリカバリー時の処理
    }
  }
)

// リスナーの解除
subscription.unsubscribe()
```

**Parameters:**
- `callback` (function) — 認証状態変更時に呼ばれるコールバック

**イベントタイプ:**
- `'INITIAL_SESSION'` — 初回セッション読み込み
- `'SIGNED_IN'` — ログイン
- `'SIGNED_OUT'` — ログアウト
- `'TOKEN_REFRESHED'` — トークン更新
- `'USER_UPDATED'` — ユーザー情報更新
- `'PASSWORD_RECOVERY'` — パスワードリカバリー
- `'MFA_CHALLENGE_VERIFIED'` — MFA チャレンジ検証完了

**Returns:** `{ data: { subscription } }` — subscription.unsubscribe() で解除

---

### `setSession()`

アクセストークンとリフレッシュトークンからセッションを設定する。

**Signature:**
```typescript
supabase.auth.setSession(params: { access_token: string; refresh_token: string }): Promise<AuthResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.setSession({
  access_token: 'access-token',
  refresh_token: 'refresh-token',
})
```

**Parameters:**
- `access_token` (string) — JWT アクセストークン
- `refresh_token` (string) — リフレッシュトークン

**Returns:** `{ data: { user, session }, error }`

---

### `exchangeCodeForSession()`

PKCE フローで取得した認証コードをセッションに交換する。

**Signature:**
```typescript
supabase.auth.exchangeCodeForSession(authCode: string): Promise<AuthTokenResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.exchangeCodeForSession('auth-code-from-url')
```

**Parameters:**
- `authCode` (string) — PKCE 認証コード

**Returns:** `{ data: { user, session }, error }`

---

### `reauthentication()`

現在のユーザーの再認証をトリガーする（パスワード変更等のセキュリティ操作前に使用）。

**Signature:**
```typescript
supabase.auth.reauthentication(): Promise<AuthResponse>
```

**Usage:**
```typescript
const { error } = await supabase.auth.reauthentication()
// ユーザーにナンスが送信される → verifyOtp で検証
```

**Parameters:** なし

**Returns:** `{ data: {}, error }`

---

### `getUserIdentities()`

現在のユーザーにリンクされている全 ID プロバイダーを取得する。

**Signature:**
```typescript
supabase.auth.getUserIdentities(): Promise<{ data: { identities: UserIdentity[] }, error: AuthError | null }>
```

**Usage:**
```typescript
const { data: { identities }, error } = await supabase.auth.getUserIdentities()
```

**Parameters:** なし

**Returns:** `{ data: { identities }, error }`

---

### `linkIdentity()`

現在のユーザーに OAuth プロバイダーをリンクする。

**Signature:**
```typescript
supabase.auth.linkIdentity(credentials: { provider: Provider; options?: object }): Promise<OAuthResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.linkIdentity({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})
```

**Parameters:**
- `provider` (Provider) — リンクする OAuth プロバイダー
- `options.redirectTo` (string) — リダイレクト先（省略可）
- `options.scopes` (string) — 要求するスコープ（省略可）
- `options.queryParams` (object) — 追加クエリパラメータ（省略可）

**Returns:** `{ data: { provider, url }, error }`

---

### `unlinkIdentity()`

現在のユーザーから ID プロバイダーをアンリンクする。

**Signature:**
```typescript
supabase.auth.unlinkIdentity(identity: UserIdentity): Promise<{ error: AuthError | null }>
```

**Usage:**
```typescript
const { data: { identities } } = await supabase.auth.getUserIdentities()
const googleIdentity = identities.find((i) => i.provider === 'google')

const { error } = await supabase.auth.unlinkIdentity(googleIdentity)
```

**Parameters:**
- `identity` (UserIdentity) — アンリンクする ID オブジェクト

**Returns:** `{ error }`

---

### `startAutoRefresh()` / `stopAutoRefresh()`

セッションの自動更新を手動で制御する。

**Signature:**
```typescript
supabase.auth.startAutoRefresh(): Promise<void>
supabase.auth.stopAutoRefresh(): Promise<void>
```

**Usage:**
```typescript
// React Native 等でアプリがフォアグラウンドに戻った時
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
```

**Parameters:** なし

**Returns:** `void`

---

## 注意点
- `getSession()` はローカルストレージから読み取るため、信頼できるユーザー検証には `getUser()` を使用する
- `onAuthStateChange` は必ずアプリの初期化時に設定し、不要になったら `unsubscribe()` する
- パスワードは最低 6 文字が必要
- メール確認が有効な場合、`signUp` 後の session は null になる
- `signOut({ scope: 'global' })` はサーバー側で全セッションを無効化する

## 関連
- [Auth Admin](./auth-admin.md)
- [Auth MFA](./auth-mfa.md)
- [Initialization](./initialization.md)
