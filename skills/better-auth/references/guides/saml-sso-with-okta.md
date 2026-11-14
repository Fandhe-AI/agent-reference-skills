# SAML SSO with Okta

Okta を IdP として使用した SAML ベースのシングルサインオン統合ガイド。SAML は認証・認可データを IdP とサービスプロバイダー間で交換する XML ベースの標準。

## Signature / Usage

1. **Okta のセットアップ**: Okta 管理コンソールで SAML アプリケーションを作成し、コールバックエンドポイント・エンティティ ID を設定して IdP メタデータと証明書をダウンロードする

2. **Better Auth の設定**:

Okta の SAML アプリ設定: **Single Sign-on URL** は Better Auth の ACS エンドポイント（例: `http://localhost:3000/api/auth/sso/saml2/sp/acs/sso`、`sso` は `providerId`）、**Audience URI (SP Entity ID)** はメタデータ URL（例: `http://localhost:3000/api/auth/sso/saml2/sp/metadata`）、Name ID format は Email Address など。Okta ダッシュボードからのアクセス（IdP-initiated）では Single Sign-on URL を `/api/auth/sso/saml2/sp/acs/{providerId}` にし、`sso()` の options に `saml: { allowIdpInitiated: true }` を設定する（既定で無効。有効にすると IdP にアカウントを持つ誰もが被害者を攻撃者のアカウントにサインインさせられるため。設定はすべての SAML プロバイダーに適用され、IdP が要求する場合のみ有効にする）。dev 環境の設定例（`defaultSSO`）:

```typescript
const ssoConfig = {
  defaultSSO: [{
    domain: "localhost:3000", // Your domain
    providerId: "sso",
    samlConfig: {
      // SP Configuration
      issuer: "http://localhost:3000/api/auth/sso/saml2/sp/metadata",
      entryPoint: "https://trial-1076874.okta.com/app/trial-1076874_samltest_1/exktofb0a62hqLAUL697/sso/saml",
      // IdP Configuration
      idpMetadata: {
        entityID: "https://trial-1076874.okta.com/app/exktofb0a62hqLAUL697/sso/saml/metadata",
        singleSignOnService: [{
          Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect",
          Location: "https://trial-1076874.okta.com/app/trial-1076874_samltest_1/exktofb0a62hqLAUL697/sso/saml"
        }],
      },
      cert: `-----BEGIN CERTIFICATE-----\n[Your Okta Certificate]\n-----END CERTIFICATE-----`,
      // Better Auth generates the SP metadata from `issuer` and the ACS URL.
      // If you supply your own `spMetadata.metadata`, its entityID becomes the SP entity ID and the default audience.
    }
  }]
}
```

3. **マルチプロバイダーのサポート**: 異なるドメインに対して複数の SAML プロバイダーを設定し、ユーザーのメールドメインに基づいて自動マッチングを有効にする

4. **サインイン開始**: 3 つの方法を選択できる:
   - プロバイダー ID を明示的に指定（推奨）
   - メールドメインマッチング
   - ドメイン指定

5. **動的登録**: プロダクション環境では API を通じてプログラムで SAML プロバイダーを登録する

## Notes

- プロダクションでは本番グレードの IdP と適切な URL を使用する（開発用証明書をライブデプロイに使わない）
- 1.7 での変更: Okta の Single Sign-on URL（ACS）は `/api/auth/sso/saml2/callback/{providerId}` から `/api/auth/sso/saml2/sp/acs/{providerId}` へ。`samlConfig.callbackUrl` の設定は不要になった。ACS URL は `{baseURL}/sso/saml2/sp/acs/{providerId}` から自動的に導出され、サインイン後の遷移先は `signIn.sso()` の `callbackURL` で制御する。動的登録の例では `issuer` が SP 識別子（`https://yourapp.com/saml/acme-corp` 形式）になった。
- 1.7.23 ドキュメントでの変更: SP メタデータは `issuer` と ACS URL から Better Auth が生成するため、設定例から `spMetadata` を削除（独自の `spMetadata.metadata` を渡す場合はその entityID が SP エンティティ ID と既定の audience になる）。IdP-initiated SSO は `saml: { allowIdpInitiated: true }` が必要で既定は無効（全 SAML プロバイダーに適用）。SAML の全オプションは SSO プラグインの SAML providers ページ（plugins/sso-saml.md）と SSO reference を参照。
- Source: https://www.better-auth.com/docs/guides/saml-sso-with-okta (better-auth v1.7.23 docs)

## Related

- [Your First Plugin](./your-first-plugin.md)
- [SSO](../plugins/sso.md)
