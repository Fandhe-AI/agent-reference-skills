# Have I Been Pwned

Have I Been Pwned プラグインは、侵害されたクレデンシャルでのアカウント作成やパスワード更新を防止することでアカウントセキュリティを強化する。Have I Been Pwned API と統合し、既知のデータ侵害でのパスワード露出をチェックする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { haveIBeenPwned } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        haveIBeenPwned()
    ]
})
```

クライアント側の設定は不要。

## 動作

侵害されたパスワードでのアカウント作成やパスワード更新の試行時:

```json
{
    "code": "PASSWORD_COMPROMISED",
    "message": "Password is compromised"
}
```

## 設定オプション

| オプション | 型 | 説明 |
|---|---|---|
| `customPasswordCompromisedMessage` | string | ユーザーに表示されるカスタムエラーメッセージ |

```typescript
haveIBeenPwned({
    customPasswordCompromisedMessage: "Please choose a more secure password."
})
```

## 注意点

- パスワードハッシュの最初の5文字のみが API に送信される（k-匿名性）
- 完全なパスワードが外部サービスに送信されることはない
- データ侵害からのクレデンシャル侵害に対する追加のアカウント保護レイヤーを提供
