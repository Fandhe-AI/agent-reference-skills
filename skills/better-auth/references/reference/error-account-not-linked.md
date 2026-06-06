# account_not_linked

OAuth フロー中に、プロバイダーアカウントを現在のユーザーにリンクできない際のエラー。

## 発生条件

リンク条件が満たされていない場合、または自動リンクが許可されていない場合に、OAuth フロー中に発生する。

## 主な原因

- ユーザーが別の認証プロバイダーまたは方法で登録している
- アカウントリンク機能が有効化または正しく設定されていない
- プロバイダーのメールが既存ユーザーアカウントと一致しない
- 信頼済みプロバイダーの制限など設定ルールが自動リンクをブロックしている

## 対処方法

**1. アカウントリンクの設定**

```typescript
export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"]  // 必要に応じて
        }
    }
})
```

**2. メール一致の検証**

OAuth プロバイダーが、既存ユーザーレコードに対応する検証済みメールアドレスを返しているか確認する。

**3. ユーザーへの案内**

ユーザーを最初に接続したプロバイダーまたはサインアップ方法で認証するよう案内する。

**4. 設定の整合性確認**

すべてのデプロイ環境で認証設定が一致していることを確認する。

## Related

- [error-account-already-linked.md](./error-account-already-linked.md)
- [errors.md](./errors.md)
