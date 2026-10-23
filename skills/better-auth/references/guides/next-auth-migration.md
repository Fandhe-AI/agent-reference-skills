# Migrating from Auth.js (NextAuth)

Auth.js (NextAuth.js) から Better Auth へ移行するためのガイド。

## Signature / Usage

1. **Better Auth インスタンスのセットアップ**: GitHub OAuth 等のプロバイダーを設定して Better Auth をインストールする

2. **クライアントインスタンスの作成**: `createAuthClient()` でサーバーサイドの auth クライアントを構築する

3. **ルートハンドラーの更新**:
   - `/app/api/auth/[...nextauth]` → `/app/api/auth/[...all]`
   - `toNextJsHandler()` を使用してエクスポートする

4. **セッション管理のリファクタリング**:
   - クライアント側: `useSession()` → `authClient.useSession()`
   - サーバー側: `auth()` → `auth.api.getSession()`

5. **DB スキーマの移行**:

   | Auth.js テーブル | Better Auth テーブル | 主な差異 |
   |---|---|---|
   | User | user | フィールド名が異なる場合がある |
   | Session | session | 必須フィールドが増加 |
   | Account | account | OAuth 行は Auth.js の `provider` / `providerAccountId` を `providerId` / `accountId` に対応付ける。`providerId` を `"credential"` にするのはパスワード認証の行のみ |
   | VerificationToken | verification | 命名規約が異なる |

6. **リソースの保護**: ミドルウェアベースではなくページレベルで認証チェックを実装する

## Notes

- パスワード認証を使用する場合（Phone Number プラグインを含む）、パスワードは `account` テーブルに `providerId: "credential"` かつ `accountId` に Better Auth のユーザー `id` を設定して保存する必要がある（1.7 ドキュメントで `accountId` の指定が追加）。このレコードが無いとパスワードサインインは失敗する
- Better Auth の `account` は、ローカルのアカウントレコードに `id`、外部 identity に `providerId` + `accountId` のペアを使う（`accountId` は「プロバイダーが割り当てる安定したアカウント識別子」、`providerId` は「アカウントの認証に使ったプロバイダー設定」）
- Account mapping table: OAuth rows map Auth.js `provider` / `providerAccountId` to `providerId` / `accountId`; `providerId: "credential"` applies only to password rows, so the official statement for all rows was narrowed (Adapted from the official docs)

## Related

- [Migrating from Auth0](./auth0-migration.md)
- [Migrating from Clerk](./clerk-migration.md)
