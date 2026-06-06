# Migrating from Auth.js (NextAuth)

Auth.js (NextAuth.js) から Better Auth へ移行するためのガイド。

## 主な移行手順

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
   | Account | account | `providerId` を `"credential"` に設定 |
   | VerificationToken | verification | 命名規約が異なる |

6. **リソースの保護**: ミドルウェアベースではなくページレベルで認証チェックを実装する

## 重要な注意点

パスワード認証を使用する場合、パスワードは `account` テーブルに `providerId: "credential"` で保存する必要がある。

## Related

- [auth0-migration.md](./auth0-migration.md)
- [clerk-migration.md](./clerk-migration.md)
