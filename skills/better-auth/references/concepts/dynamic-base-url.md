# Dynamic Base URL

許可リストベースのアプローチによる動的ベース URL 解決をサポートし、アプリケーションが複数ドメインやプレビューデプロイメント（カスタムドメイン、Vercel プレビュー、ブランチデプロイメントなど）で同時に動作できるようにする。

## セットアップ

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      "myapp.com",
      "www.myapp.com",
      "*.vercel.app",
    ],
  },
});
```

リクエスト受信時、Better Auth は `x-forwarded-host` または `host` ヘッダーからホストを抽出し、許可リストに対して検証する。

## 設定オプション

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowedHosts` | `string[]` | Required | 許可するホストパターンのリスト（ワイルドカード対応） |
| `fallback` | `string` | — | マッチしないホスト用の URL（エラーはスローされない） |
| `protocol` | `"http" \| "https" \| "auto"` | `"auto"` | URL 構築に使用するプロトコル |

### ワイルドカードパターン

| Pattern | Matches |
|---------|---------|
| `myapp.com` | 完全一致ドメインのみ |
| `*.vercel.app` | 任意の Vercel サブドメイン |
| `preview-*.myapp.com` | `preview-` で始まるサブドメイン |
| `localhost:*` | 任意のポートの localhost |

### プロトコルハンドリング

| Value | Behavior |
|-------|----------|
| `"https"` | 常に HTTPS |
| `"http"` | 常に HTTP |
| `"auto"` | `x-forwarded-proto` から導出。利用不可の場合は HTTPS がデフォルト |

Cookie `Secure` フラグ: `https` → secure、`http` → insecure、`auto`/未設定 → `NODE_ENV === "production"` に依存（`advanced.useSecureCookies` でオーバーライド可能）。

## コード例

### フォールバック URL

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["myapp.com", "*.vercel.app"],
    fallback: "https://myapp.com",
  },
});
```

### 環境ベースのプロトコル

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["localhost:3000", "myapp.com", "*.vercel.app"],
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
});
```

### 動的ホストでのクロスサブドメイン Cookie

```typescript
export const auth = betterAuth({
  baseURL: {
    allowedHosts: ["auth.example1.com", "auth.example2.com"],
    protocol: "https",
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      // domain: ".example.com", // オプション: 静的ドメインを強制
    },
  },
});
```

### 後方互換性（静的文字列）

```typescript
export const auth = betterAuth({
  baseURL: "https://myapp.com",
});
```

### 一般的な実装パターン

**Vercel デプロイメント:**

```typescript
allowedHosts: ["myapp.com", "www.myapp.com", "*.vercel.app"]
```

**開発 + 本番:**

```typescript
allowedHosts: ["localhost:3000", "localhost:5173", "myapp.com", "*.vercel.app"],
protocol: process.env.NODE_ENV === "development" ? "http" : "https"
```

**複数本番ドメイン:**

```typescript
allowedHosts: ["myapp.com", "myapp.co.uk", "myapp.eu"]
```

## 注意点

- `allowedHosts` は自動的にパターンを `trustedOrigins` に追加し、重複を排除
- `allowedHosts` の設定は必須 — Better Auth は自動プラットフォーム検出を行わない
- `fallback` は未認識ホストを静かにマスクし、設定ミスを隠蔽する可能性があるため慎重に使用

## セキュリティ考慮事項

- **必須の許可リスト**: すべてのホストパターンは明示的に宣言する必要がある（自動検出なし）
- **ヘッダーのサニタイゼーション**: `x-forwarded-host` と `host` ヘッダーは処理前にサニタイズされる
- **明示的ワイルドカードのみ**: ワイルドカードはサポートされるが、意図的な設定が必要
- **未知ホストでのエラー**: `fallback` が設定されていない限り、未知のホストはエラーをスローする（可視性のためにこちらが推奨）
