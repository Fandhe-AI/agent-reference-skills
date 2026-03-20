# ID 管理・アカウントリンク

auth.identities テーブルを使った複数プロバイダのアカウントリンク機能。

## 概要

Supabase Auth では、1 人のユーザーが複数の認証プロバイダ（メール、Google、GitHub など）を紐付けることができる。各プロバイダの認証情報は `auth.identities` テーブルに格納され、`user_id` で `auth.users` テーブルと関連付けられる。

### auth.identities テーブルの主要カラム

| カラム | 型 | 説明 |
|--------|-----|------|
| `id` | uuid | ID の一意識別子 |
| `user_id` | uuid | 関連する auth.users の ID |
| `provider` | text | プロバイダ名（email, google, github 等） |
| `provider_id` | text | プロバイダ側のユーザー ID |
| `identity_data` | jsonb | プロバイダから取得したユーザー情報 |
| `created_at` | timestamptz | 作成日時 |
| `updated_at` | timestamptz | 更新日時 |

### アカウントリンクの方式

**Automatic Linking（自動リンク）**:
- 同じメールアドレスを持つアカウントが自動的にリンクされる
- ダッシュボードの Auth 設定で有効化
- 信頼できるプロバイダ（メール確認済み）のみが対象
- セキュリティリスクがあるため、メール確認を必須にすること

**Manual Linking（手動リンク）**:
- ユーザーが明示的に `linkIdentity()` を呼び出してリンクする
- より安全だが、ユーザー操作が必要
- 推奨される方式

## コード例

```typescript
// === アカウントリンク ===

// 現在ログイン中のユーザーに OAuth プロバイダをリンク
const { data, error } = await supabase.auth.linkIdentity({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/account/linked',
  },
})

// GitHub をリンク
const { data, error } = await supabase.auth.linkIdentity({
  provider: 'github',
})

// === アカウントリンク解除 ===

// 現在のユーザーの identities を取得
const { data: { user } } = await supabase.auth.getUser()
const identities = user?.identities

// 特定の identity をリンク解除
const googleIdentity = identities?.find((i) => i.provider === 'google')

if (googleIdentity) {
  const { error } = await supabase.auth.unlinkIdentity(googleIdentity)
}

// === ユーザーの identities 確認 ===

const { data: { user } } = await supabase.auth.getUser()

if (user?.identities) {
  user.identities.forEach((identity) => {
    console.log(`Provider: ${identity.provider}`)
    console.log(`Provider ID: ${identity.provider_id}`)
    console.log(`Identity Data:`, identity.identity_data)
  })
}

// === Admin API で identities を確認 ===

const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(
  'user-uuid-here'
)
console.log('Identities:', user?.identities)
```

## 注意点

- Automatic Linking を有効にする場合、メール確認を必須に設定すること。確認なしだと、攻撃者が他人のメールアドレスでアカウントを作成し、そのアカウントにリンクされる危険がある
- `unlinkIdentity()` でリンクを解除する際、最後の identity を削除することはできない（ログイン手段がなくなるため）
- OAuth プロバイダをリンクする場合、ブラウザリダイレクトが発生する
- `identity_data` にはプロバイダから返される情報（名前、アバター等）が含まれる
- 同一プロバイダで複数の identity をリンクすることはできない

## 関連

- [ユーザー管理](./users.md)
- [ソーシャルログイン](./social-login.md)
- [匿名認証](./anonymous-auth.md)
