# ユーザー管理

auth.users テーブルの構造とユーザーの作成・更新・削除を行う方法。

## 概要

Supabase Auth のユーザー情報はすべて `auth.users` テーブルに格納される。このテーブルは `auth` スキーマに属し、直接クエリすることは推奨されない。代わりに `supabase.auth` API または Admin API を使用する。

### auth.users テーブルの主要カラム

| カラム | 型 | 説明 |
|--------|-----|------|
| `id` | uuid | ユーザーの一意識別子（主キー） |
| `email` | text | メールアドレス |
| `phone` | text | 電話番号 |
| `encrypted_password` | text | ハッシュ化されたパスワード |
| `email_confirmed_at` | timestamptz | メール確認日時 |
| `phone_confirmed_at` | timestamptz | 電話番号確認日時 |
| `created_at` | timestamptz | 作成日時 |
| `updated_at` | timestamptz | 更新日時 |
| `last_sign_in_at` | timestamptz | 最終ログイン日時 |
| `raw_user_meta_data` | jsonb | user_metadata（ユーザーが編集可能） |
| `raw_app_meta_data` | jsonb | app_metadata（サーバーサイドのみ編集可能） |
| `is_anonymous` | boolean | 匿名ユーザーフラグ |
| `banned_until` | timestamptz | BAN 解除日時 |

### user_metadata と app_metadata の違い

- **user_metadata**: ユーザー自身がクライアントサイドから `updateUser()` で更新可能。表示名やアバター URL など
- **app_metadata**: サーバーサイド（service_role）からのみ更新可能。ロール、プラン、権限など、ユーザーが変更してはいけない情報

## コード例

```typescript
// === クライアントサイド API ===

// ユーザー登録
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
  options: {
    data: {
      display_name: 'John Doe',
      avatar_url: 'https://example.com/avatar.png',
    },
  },
})

// 現在のユーザー情報を取得
const { data: { user } } = await supabase.auth.getUser()

// ユーザー情報を更新（user_metadata）
const { data, error } = await supabase.auth.updateUser({
  data: {
    display_name: 'Jane Doe',
  },
})

// メールアドレスを変更
const { data, error } = await supabase.auth.updateUser({
  email: 'newemail@example.com',
})

// パスワードを変更
const { data, error } = await supabase.auth.updateUser({
  password: 'newpassword456',
})

// === Admin API（サーバーサイド、service_role key 必須）===

// ユーザー一覧を取得
const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

// ページネーション付きで取得
const { data: { users, aud }, error } = await supabaseAdmin.auth.admin.listUsers({
  page: 1,
  perPage: 50,
})

// 特定のユーザーを取得
const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(
  'user-uuid-here'
)

// ユーザーを管理者として作成（メール確認不要）
const { data: { user }, error } = await supabaseAdmin.auth.admin.createUser({
  email: 'admin-created@example.com',
  password: 'password123',
  email_confirm: true,
  user_metadata: { display_name: 'Admin Created' },
  app_metadata: { role: 'moderator' },
})

// ユーザー情報を管理者として更新（app_metadata を含む）
const { data: { user }, error } = await supabaseAdmin.auth.admin.updateUserById(
  'user-uuid-here',
  {
    app_metadata: { role: 'admin', plan: 'pro' },
    user_metadata: { display_name: 'Updated Name' },
    ban_duration: 'none', // BAN 解除
  }
)

// ユーザーを削除
const { error } = await supabaseAdmin.auth.admin.deleteUser('user-uuid-here')

// ユーザーを BAN（24時間）
const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
  'user-uuid-here',
  { ban_duration: '24h' }
)
```

## 注意点

- `auth.users` テーブルに直接 SQL でアクセスすることは推奨されない。必ず API を使用すること
- `user_metadata` はクライアントから変更可能なため、権限管理には `app_metadata` を使用すること
- Admin API は `service_role` キーが必要で、サーバーサイドでのみ使用すること
- `signUp` 時にメール確認が有効な場合、ユーザーは確認リンクをクリックするまで `email_confirmed_at` が null になる
- ユーザー削除は物理削除であり、関連する `auth.identities` や `auth.sessions` も削除される
- public スキーマにユーザープロフィールテーブルを別途作成し、`auth.users.id` を外部キーとして参照するのが一般的なパターン

## 関連

- [Auth 概要](./overview.md)
- [ID 管理・アカウントリンク](./identities.md)
- [セッション管理](./sessions.md)
- [匿名認証](./anonymous-auth.md)
