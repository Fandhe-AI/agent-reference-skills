# SAML SSO with Okta

Okta を IdP として使用した SAML ベースのシングルサインオン統合ガイド。SAML は認証・認可データを IdP とサービスプロバイダー間で交換する XML ベースの標準。

## Signature / Usage

1. **Okta のセットアップ**: Okta 管理コンソールで SAML アプリケーションを作成し、コールバックエンドポイント・エンティティ ID を設定して IdP メタデータと証明書をダウンロードする

2. **Better Auth の設定**:

Okta の SAML アプリ設定: **Single Sign-on URL** は Better Auth の ACS エンドポイント（例: `http://localhost:3000/api/auth/sso/saml2/sp/acs/sso`、`sso` は `providerId`）、**Audience URI (SP Entity ID)** はメタデータ URL（例: `http://localhost:3000/api/auth/sso/saml2/sp/metadata`）、Name ID format は Email Address など。Okta ダッシュボードからのアクセス（IdP-initiated）では Single Sign-on URL を `/api/auth/sso/saml2/sp/acs/{providerId}` にする（1.7 では IdP-initiated は既定で無効、`saml.allowIdpInitiated: true` が必要）。dev 環境の設定例（`defaultSSO`）:

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
      // SP Metadata
      spMetadata: {
        metadata: `<md:EntityDescriptor ...>[Your SP Metadata XML]</md:EntityDescriptor>`
      }
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

## Related

- [Your First Plugin](./your-first-plugin.md)
- [SSO](../plugins/sso.md)
