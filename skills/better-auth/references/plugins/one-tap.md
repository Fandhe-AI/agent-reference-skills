# One Tap

One Tap プラグインは、Google の One Tap API を使用した1回のインタラクションでの認証を可能にする。自動プロンプト表示とカスタムボタンレンダリングモードの両方をサポートする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { oneTap } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        oneTap(),
    ]
})
```

サーバーオプション:
- `disableSignUp` (boolean, デフォルト: false): 既存ユーザーのみに認証を制限
- `clientId` (string, 任意): Google OAuth クライアント ID

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { oneTapClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: "YOUR_CLIENT_ID",
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
            additionalOptions: {},
            promptOptions: {
                baseDelay: 1000,
                maxAttempts: 5
            }
        })
    ]
})
```

## クライアント設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `clientId` | string | 必須 | Google OAuth クライアント ID |
| `autoSelect` | boolean | false | サインイン済みの場合にアカウントを自動選択 |
| `cancelOnTapOutside` | boolean | true | 外部タップでプロンプトを閉じる |
| `uxMode` | string | "popup" | フローモード: "popup" or "redirect" |
| `context` | string | "signin" | 使用コンテキスト: "signin", "signup", "use" |
| `additionalOptions` | object | {} | Google Identity Services の追加オプション |
| `promptOptions.baseDelay` | number | 1000 | リトライ遅延（ミリ秒） |
| `promptOptions.maxAttempts` | number | 5 | コールバック前の最大プロンプト試行数 |
| `promptOptions.fedCM` | boolean | true | サインアウト時に FedCM 状態をクリア |

## API メソッド

### プロンプトモード（デフォルト）

```typescript
await authClient.oneTap()
```

Google One Tap ポップアップを自動表示する。

### ボタンモード

```typescript
// Vanilla JavaScript
await authClient.oneTap({
    button: {
        container: "#google-signin-button",
        config: {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with"
        }
    }
})
```

React:

```typescript
function SignInButton() {
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (buttonRef.current) {
            authClient.oneTap({
                button: {
                    container: buttonRef.current,
                    config: { theme: "filled_blue", size: "large" }
                }
            })
        }
    }, [])

    return <div ref={buttonRef}></div>
}
```

### ボタン設定オプション

| オプション | 型 | デフォルト | 値 |
|---|---|---|---|
| `type` | string | "standard" | "standard", "icon" |
| `theme` | string | "outline" | "outline", "filled_blue", "filled_black" |
| `size` | string | "large" | "large", "medium", "small" |
| `text` | string | "signin_with" | "signin_with", "signup_with", "continue_with", "signin" |
| `shape` | string | "rectangular" | "rectangular", "pill", "circle", "square" |
| `logo_alignment` | string | "left" | "left", "center" |
| `width` | number | undefined | 最大400ピクセル |
| `locale` | string | undefined | 言語コード（例: "zh_CN"） |

### リダイレクト動作のカスタマイズ

```typescript
// ハードリロード回避
await authClient.oneTap({
    fetchOptions: {
        onSuccess: () => {
            router.push("/dashboard")
        }
    }
})

// カスタムコールバック URL
await authClient.oneTap({
    callbackURL: "/dashboard"
})
```

### プロンプト非表示の処理

```typescript
await authClient.oneTap({
    onPromptNotification: (notification) => {
        console.warn("Prompt dismissed.", notification)
        // 代替認証 UI を表示
    }
})
```

エクスポネンシャルバックオフで自動リトライ。`maxAttempts` 到達時にコールバックが通知を受け取る。

## 注意点

- Google Cloud Console で正確な Authorized JavaScript Origins の設定が必要（例: http://localhost:3000, https://example.com）
- `promptOptions.fedCM` 有効時（デフォルト）、サインアウト時に `navigator.credentials.preventSilentAccess()` が呼ばれる
- FedCM がアクティブな場合、`cancelOnTapOutside` が動作しない可能性がある（ブラウザが閉じ動作を管理）
