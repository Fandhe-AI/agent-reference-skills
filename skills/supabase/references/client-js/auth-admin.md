# Auth Admin

サーバーサイド専用の管理者向け認証メソッド群。`service_role` キーが必要。

## メソッド一覧

### `createUser()`

新しいユーザーを管理者として作成する。確認メール不要でユーザーを追加可能。

**Signature:**
```typescript
supabase.auth.admin.createUser(attributes: AdminUserAttributes): Promise<AdminUserResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.createUser({
  email: 'user@example.com',
  password: 'securepassword',
  email_confirm: true,
  user_metadata: {
    display_name: 'John Doe',
    role: 'admin',
  },
  app_metadata: {
    provider: 'email',
  },
})
```

**Parameters:**
- `email` (string) — メールアドレス（省略可）
- `password` (string) — パスワード（省略可）
- `phone` (string) — 電話番号（省略可）
- `email_confirm` (boolean) — メール確認済みとして作成するか（省略可）
- `phone_confirm` (boolean) — 電話番号確認済みとして作成するか（省略可）
- `user_metadata` (object) — ユーザーメタデータ（省略可）
- `app_metadata` (object) — アプリメタデータ（省略可）
- `ban_duration` (string) — BAN 期間（省略可。例: `'24h'`, `'none'`）

**Returns:** `{ data: { user }, error }`

---

### `deleteUser()`

ユーザーを削除する。

**Signature:**
```typescript
supabase.auth.admin.deleteUser(id: string, shouldSoftDelete?: boolean): Promise<{ data: null, error: AuthError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.deleteUser(
  'user-uuid',
  false // true でソフトデリート
)
```

**Parameters:**
- `id` (string) — ユーザーの UUID
- `shouldSoftDelete` (boolean) — ソフトデリートするか（デフォルト: false）

**Returns:** `{ data: null, error }`

---

### `getUserById()`

ユーザー ID でユーザー情報を取得する。

**Signature:**
```typescript
supabase.auth.admin.getUserById(uid: string): Promise<AdminUserResponse>
```

**Usage:**
```typescript
const { data: { user }, error } = await supabase.auth.admin.getUserById('user-uuid')
```

**Parameters:**
- `uid` (string) — ユーザーの UUID

**Returns:** `{ data: { user }, error }`

---

### `listUsers()`

ページネーション付きでユーザー一覧を取得する。

**Signature:**
```typescript
supabase.auth.admin.listUsers(params?: { page?: number; perPage?: number }): Promise<{ data: { users: User[]; aud: string }, error: AuthError | null }>
```

**Usage:**
```typescript
const { data: { users }, error } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 100,
})
```

**Parameters:**
- `page` (number) — ページ番号（1 始まり。デフォルト: 1）
- `perPage` (number) — 1 ページあたりの件数（デフォルト: 50、最大: 1000）

**Returns:** `{ data: { users, aud }, error }`

---

### `updateUserById()`

管理者としてユーザー情報を更新する。

**Signature:**
```typescript
supabase.auth.admin.updateUserById(uid: string, attributes: AdminUserAttributes): Promise<AdminUserResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.updateUserById('user-uuid', {
  email: 'newemail@example.com',
  email_confirm: true,
  user_metadata: { display_name: 'Updated Name' },
  ban_duration: 'none', // BAN 解除
})
```

**Parameters:**
- `uid` (string) — ユーザーの UUID
- `attributes` (AdminUserAttributes) — 更新する属性（email, password, phone, user_metadata, app_metadata, email_confirm, phone_confirm, ban_duration）

**Returns:** `{ data: { user }, error }`

---

### `inviteUserByEmail()`

メールアドレスにユーザー招待を送信する。

**Signature:**
```typescript
supabase.auth.admin.inviteUserByEmail(email: string, options?: InviteUserByEmailOptions): Promise<AdminUserResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.inviteUserByEmail(
  'user@example.com',
  {
    redirectTo: 'https://example.com/welcome',
    data: { role: 'member' },
  }
)
```

**Parameters:**
- `email` (string) — 招待先メールアドレス
- `options.redirectTo` (string) — 招待リンクのリダイレクト先（省略可）
- `options.data` (object) — ユーザーメタデータ（省略可）

**Returns:** `{ data: { user }, error }`

---

### `generateLink()`

確認、招待、パスワードリセット等のリンクを生成する。

**Signature:**
```typescript
supabase.auth.admin.generateLink(params: GenerateLinkParams): Promise<GenerateLinkResponse>
```

**Usage:**
```typescript
// サインアップ確認リンク
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'signup',
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    redirectTo: 'https://example.com/welcome',
  },
})

// 招待リンク
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'invite',
  email: 'user@example.com',
})

// パスワードリカバリーリンク
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'recovery',
  email: 'user@example.com',
})

// マジックリンク
const { data, error } = await supabase.auth.admin.generateLink({
  type: 'magiclink',
  email: 'user@example.com',
})
```

**Parameters:**
- `type` (string) — リンクタイプ（`'signup'`, `'invite'`, `'magiclink'`, `'recovery'`, `'email_change_new'`, `'email_change_current'`）
- `email` (string) — 対象メールアドレス
- `password` (string) — パスワード（signup の場合。省略可）
- `newEmail` (string) — 新しいメールアドレス（email_change の場合。省略可）
- `options.redirectTo` (string) — リダイレクト先（省略可）

**Returns:** `{ data: { properties: { action_link, hashed_token, ... }, user }, error }`

---

### `signOut()`

特定ユーザーの全セッションまたは指定スコープのセッションをログアウトさせる。

**Signature:**
```typescript
supabase.auth.admin.signOut(jwt: string, scope?: 'global' | 'local' | 'others'): Promise<{ error: AuthError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.auth.admin.signOut('user-jwt-token', 'global')
```

**Parameters:**
- `jwt` (string) — ユーザーの JWT トークン
- `scope` (string) — ログアウトスコープ（`'global'`, `'local'`, `'others'`。デフォルト: `'global'`）

**Returns:** `{ error }`

---

### `mfa.deleteFactor()`

ユーザーの MFA ファクターを管理者として削除する。

**Signature:**
```typescript
supabase.auth.admin.mfa.deleteFactor(params: { id: string; factorId: string }): Promise<{ data: Factor, error: AuthError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.admin.mfa.deleteFactor({
  id: 'user-uuid',
  factorId: 'factor-uuid',
})
```

**Parameters:**
- `id` (string) — ユーザーの UUID
- `factorId` (string) — 削除するファクターの UUID

**Returns:** `{ data: Factor, error }`

---

### `mfa.listFactors()`

ユーザーの MFA ファクター一覧を取得する。

**Signature:**
```typescript
supabase.auth.admin.mfa.listFactors(params: { userId: string }): Promise<{ data: { factors: Factor[] }, error: AuthError | null }>
```

**Usage:**
```typescript
const { data: { factors }, error } = await supabase.auth.admin.mfa.listFactors({
  userId: 'user-uuid',
})
```

**Parameters:**
- `userId` (string) — ユーザーの UUID

**Returns:** `{ data: { factors }, error }`

---

## 注意点
- すべてのメソッドに `service_role` キーが必要。クライアントサイドでは使用しない
- `service_role` キーは RLS をバイパスするため、取り扱いに注意
- `deleteUser` のソフトデリートでは、ユーザーデータは保持されるがログイン不可になる
- `listUsers` は大量データの場合パフォーマンスに注意。ページネーションを活用する
- `generateLink` で生成したリンクは自前のメール送信に使用できる

## 関連
- [Auth](./auth.md)
- [Auth MFA](./auth-mfa.md)
- [Initialization](./initialization.md)
