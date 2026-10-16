# Migrating from Supabase Auth

Supabase Auth から Better Auth へ移行するためのガイド。

## Signature / Usage

1. **Better Auth のセットアップ**: インストールして PostgreSQL 接続文字列で DB に接続する
2. **設定**: メール/パスワード認証・ソーシャルプロバイダーを設定し、anonymous や phone-number 等のプラグインを追加する
3. **DB の準備**: Supabase メタデータ保存用の追加フィールドを追加し、`npx auth migrate` を実行する
4. **データ移行**: カーソルベースのページネーションを使用したバッチ処理でユーザーとアカウントを転送するスクリプトを実行する
5. **パスワードアルゴリズムの更新**: Supabase と同じ bcrypt ハッシュを使用するよう設定する
6. **コードの更新**: Supabase API コールを Better Auth 相当に置き換える（例: `supabase.auth.signUp` → `authClient.signUp.email`）

### API コール対応表

| Supabase | Better Auth |
|---|---|
| `supabase.auth.signUp()` | `authClient.signUp.email()` |
| `supabase.auth.signInWithPassword()` | `authClient.signIn.email()` |
| `supabase.auth.getSession()` | `authClient.getSession()` |

### 信頼済み SSO アカウント ID の準備（Enterprise SSO 移行）

Better Auth は SAML アカウントを、プロバイダーメタデータ上の実際の IdP entity ID と署名済み `NameID` で識別する。Supabase のエクスポートにはこれらを安全に導出するための検証済みデータが含まれない。アカウント移行の前に、旧 SSO identity ごとに IdP entity ID と署名済み `NameID` への operator がレビューしたマッピングを作成する。サービスプロバイダーの `entity_id`、メールアドレス、プロファイルの `sub` claim で代用しない。外側の Map は Supabase SSO プロバイダー ID、内側の Map は旧 identity ID をキーにする:

```typescript
const samlAccountIdentityByProviderId = new Map([
  [
    'supabase-provider-id',
    new Map([
      [
        'legacy-identity-id',
        {
          issuer: 'https://idp.example.com/metadata',
          accountId: 'signed-name-id',
        },
      ],
    ]),
  ],
]);
```

`processBatch` の identity 処理ループで `identity.provider.startsWith('sso:')` の identity をこのマッピングで解決してアカウントをリンクする（1.7 のドキュメントでは SSO プロバイダー移行の SAML 設定から `callbackUrl` と `mapping.id` が外れ、`idpMetadata.metadata` と `spMetadata.entityID` で構成する）。

## Notes

- SSO 移行は Enterprise SAML プロバイダーの IdP 設定更新が別途必要
- 移行により有効なセッションがすべて無効化される
- 移行スクリプト実行前に送受信両 DB のバックアップを必ず取得する

## Related

- [Migrating from Auth0](./auth0-migration.md)
- [Migrating from Clerk](./clerk-migration.md)
