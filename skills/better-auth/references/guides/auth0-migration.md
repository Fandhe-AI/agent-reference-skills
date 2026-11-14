# Migrating from Auth0

Auth0 から Better Auth へ移行するためのガイド。ユーザーデータ移行・認証方法の移植・アプリケーションコードの更新を含む。

## Signature / Usage

1. **Better Auth のセットアップ**: プロジェクトに Better Auth をインストールし、PostgreSQL 等の DB に接続する
2. **認証機能の設定**: メール/パスワード認証・ソーシャルプロバイダー・管理者機能・2FA 等のプラグインを設定する
3. **ユーザーデータの移行**: Auth0 の Management API からユーザー・OAuth アカウント・パスワードハッシュ・MFA 設定を転送するスクリプトを実行する
4. **パスワードハッシュの設定**: Auth0 と同じ bcrypt アルゴリズムを使用するよう設定する
5. **アプリケーションコードの更新**: サインインコンポーネントとミドルウェアを Better Auth クライアントとセッション管理に移行する
6. **クリーンアップ**: 移行が完了・確認できたら Auth0 の依存関係を削除する

## Notes

- 移行により有効なセッションがすべて無効化される
- パスワードハッシュのエクスポートは Auth0 Enterprise ユーザーのみ可能（無料プランはサポートに連絡が必要）
- ロールマッピングやカスタムパスワードアルゴリズムには追加の設定が必要な場合がある
- 1.7 ドキュメントでの変更: アカウントの `providerId` は `getAccountProviderId(identity)`（`identity.provider === "auth0"` なら `"credential"`、それ以外は `identity.provider.split("-")[0] ?? identity.provider`）で決める。`accountId` は `providerId === "credential"` なら移行後のユーザー ID、それ以外は `identity.user_id`（旧: 常に `identity.user_id`）。サインインコンポーネントは `import { authClient } from "@/lib/auth-client"`（旧: `better-auth/client`）。
- 1.7.23 ドキュメントでの変更: TOTP シークレットは Management API では取得できず、Auth0 のサポートリクエスト経由でのみ提供される。移行スクリプトの 2FA 処理は `generateBackupCodes(key: string | SecretConfig)`（`better-auth/crypto` の `SecretConfig` 型）になり、TOTP シークレットは Base32 のため `symmetricEncrypt({ key: ctx.secretConfig, data: \`base32:${factor.totp.secret}\` })` で暗号化して `twoFactor` に保存し、バックアップコードも `ctx.secretConfig` で生成する。MFA 移行の try/catch は削除。`two-factor` プラグインが有効な場合のみ `twoFactorEnabled`（TOTP シークレットを持つ factor があるか）をユーザーに設定し、`migrateMFAFactors(auth0User, createdUser.id, ctx)` を呼ぶ。
- Source: https://www.better-auth.com/docs/guides/auth0-migration-guide (better-auth v1.7.23 docs)

## Related

- [Migrating from Clerk](./clerk-migration.md)
- [Migrating from Auth.js (NextAuth)](./next-auth-migration.md)
