# Migrating from Supabase Auth

Supabase Auth から Better Auth へ移行するためのガイド。

## 主な移行手順

1. **Better Auth のセットアップ**: インストールして PostgreSQL 接続文字列で DB に接続する
2. **設定**: メール/パスワード認証・ソーシャルプロバイダーを設定し、anonymous や phone-number 等のプラグインを追加する
3. **DB の準備**: Supabase メタデータ保存用の追加フィールドを追加し、`npx auth migrate` を実行する
4. **データ移行**: カーソルベースのページネーションを使用したバッチ処理でユーザーとアカウントを転送するスクリプトを実行する
5. **パスワードアルゴリズムの更新**: Supabase と同じ bcrypt ハッシュを使用するよう設定する
6. **コードの更新**: Supabase API コールを Better Auth 相当に置き換える（例: `supabase.auth.signUp` → `authClient.signUp.email`）

## API コール対応表

| Supabase | Better Auth |
|---|---|
| `supabase.auth.signUp()` | `authClient.signUp.email()` |
| `supabase.auth.signInWithPassword()` | `authClient.signIn.email()` |
| `supabase.auth.getSession()` | `authClient.getSession()` |

## 考慮事項

- SSO 移行は Enterprise SAML プロバイダーの IdP 設定更新が別途必要
- 移行により有効なセッションがすべて無効化される
- 移行スクリプト実行前に送受信両 DB のバックアップを必ず取得する

## Related

- [auth0-migration.md](./auth0-migration.md)
- [clerk-migration.md](./clerk-migration.md)
