# Migrating from Clerk

Clerk から Better Auth へ移行するためのガイド。ユーザーデータ移行・認証方法の移植・コンポーネントの更新を含む。

## Signature / Usage

1. **Better Auth のセットアップ**: インストールし DB 接続を設定する
2. **認証設定**: メール/パスワード（bcrypt ハッシュ設定）・ソーシャルプロバイダー・プラグインを設定する
3. **データエクスポート**: Clerk ダッシュボードからユーザーデータを CSV でダウンロードする
4. **移行スクリプトの実行**: ユーザー・アカウント・2FA 設定を転送する TypeScript スクリプトを実行する
5. **動作確認**: 移行データを確認する
6. **コンポーネントの更新**: Clerk の認証コールを Better Auth 相当に置き換える
7. **ミドルウェアの更新**: ルート保護のロジックを Better Auth セッション用に更新する
8. **クリーンアップ**: 移行確認後に Clerk の依存関係を削除する

## Notes

- 移行により有効なセッションがすべて無効化される
- 組織の移行は現在ガイドに記載されていない
- 1.7 ドキュメントでの変更: 移行スクリプトは `createdUser` が無い場合に `Unable to create or find user ${id}` を throw する。OAuth 外部アカウントの `providerId` は `provider.replace("oauth_", "")`、`accountId` は `externalAccount.provider_user_id`。credential アカウント（Clerk のパスワードユーザー）の `accountId` は `createdUser.id`（旧: `provider_user_id`）。サインインコンポーネントは `import { authClient } from "@/lib/auth-client"`（旧: `better-auth/client`）。
- 1.7.23 ドキュメントでの変更: Clerk のエクスポートにはユーザーごとの TOTP シークレットが含まれるがバックアップコードは含まれないため、移行スクリプトが新しいバックアップコードを生成する。CSV 読み込みは自前の分割処理から `csv-parse`（`npm install csv-parse`、`import { parse } from "csv-parse/sync"`、`columns: true` / `skip_empty_lines: true`）に変更。`generateBackupCodes(key: string | SecretConfig)`（`better-auth/crypto` の `SecretConfig`）。`twoFactorEnabled` は `Boolean(totp_secret)`、空セルは空文字列になるため `username` / `phoneNumber` は `|| undefined`。credential アカウントは `password_digest` がある場合に OAuth ループ外で作成（Clerk の API は OAuth アカウントのみ列挙するため、パスワードはエクスポートから取得）し、OAuth ループは `provider.replace("oauth_", "")` のみを処理する。`twoFactor` は `totp_secret` がある場合のみ作成し、Clerk の Base32 シークレットを `symmetricEncrypt({ key: ctx.secretConfig, data: \`base32:${totp_secret}\` })` で暗号化、バックアップコードは `ctx.secretConfig` で生成。実行コマンドは `bun run scripts/migrate-clerk.ts`（旧: `script/`）。
- Source: https://www.better-auth.com/docs/guides/clerk-migration-guide (better-auth v1.7.23 docs)

## Related

- [Migrating from Auth0](./auth0-migration.md)
- [Migrating from Auth.js (NextAuth)](./next-auth-migration.md)
