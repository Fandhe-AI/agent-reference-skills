# SAML SSO with Okta

Okta を IdP として使用した SAML ベースのシングルサインオン統合ガイド。SAML は認証・認可データを IdP とサービスプロバイダー間で交換する XML ベースの標準。

## 主な手順

1. **Okta のセットアップ**: Okta 管理コンソールで SAML アプリケーションを作成し、コールバックエンドポイント・エンティティ ID を設定して IdP メタデータと証明書をダウンロードする

2. **Better Auth の設定**:

```typescript
export const auth = betterAuth({
    plugins: [
        sso({
            issuer: "https://your-app.com",
            saml: {
                providers: [
                    {
                        id: "okta",
                        entryPoint: "https://your-org.okta.com/app/xxx/sso/saml",
                        cert: process.env.OKTA_CERT,
                        callbackUrl: "https://your-app.com/api/auth/sso/callback/okta"
                    }
                ]
            }
        })
    ]
})
```

3. **マルチプロバイダーのサポート**: 異なるドメインに対して複数の SAML プロバイダーを設定し、ユーザーのメールドメインに基づいて自動マッチングを有効にする

4. **サインイン開始**: 3 つの方法を選択できる:
   - プロバイダー ID を明示的に指定（推奨）
   - メールドメインマッチング
   - ドメイン指定

5. **動的登録**: プロダクション環境では API を通じてプログラムで SAML プロバイダーを登録する

## 注意事項

- プロダクションでは本番グレードの IdP と適切な URL を使用する（開発用証明書をライブデプロイに使わない）

## Related

- [your-first-plugin.md](./your-first-plugin.md)
- `/references/plugins/sso.md`
