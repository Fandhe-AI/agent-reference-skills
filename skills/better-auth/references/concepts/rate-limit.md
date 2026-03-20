# Rate Limit

Better Auth にはトラフィック管理と不正利用防止のための組み込みレートリミッターが含まれている。

## 概要

**本番環境デフォルト:**
- ウィンドウ: 60 秒
- 最大リクエスト: ウィンドウあたり 100
- ステータス: 開発モードでは無効

サーバー側の `auth.api` 経由リクエストはレートリミットを完全にバイパスする。

## セットアップ

開発環境でレートリミットを有効化:

```typescript
export const auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
});
```

## IP アドレス検出

デフォルトで `x-forwarded-for` ヘッダーを使用。インフラに応じてカスタムヘッダーを設定:

```typescript
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare
    },
  },
  rateLimit: { enabled: true },
});
```

## IPv6 サポート

Better Auth は代替表現を使用したバイパス攻撃を防ぐため IPv6 アドレスを正規化する。IPv4 マップ IPv6 アドレス（`::ffff:192.0.2.1` など）は自動的に IPv4 形式に変換。

### サブネットベースのリミット

```typescript
export const auth = betterAuth({
  advanced: {
    ipAddress: {
      ipv6Subnet: 64, // /64 サブネットでレートリミット
    },
  },
});
```

一般的なプレフィックス長: 128（個別）、64（/64 サブネット）、48（/48 割り当て）、32（/32 ISP）。

## カスタムレートリミットルール

機密エンドポイントにより厳しい制限を適用:

```typescript
export const auth = betterAuth({
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 10, max: 3 },
      "/two-factor/*": async (request) => ({
        window: 10,
        max: 3,
      }),
      "/get-session": false, // 特定パスで無効化
    },
  },
});
```

プリセットカスタムルール: `/sign-in/email`（3 リクエスト/10 秒）、`/two-factor/verify`（3 リクエスト/10 秒）。

## ストレージオプション

### データベースストレージ

```typescript
rateLimit: {
  storage: "database",
  modelName: "rateLimit", // オプション
}
```

### セカンダリストレージ (Redis)

```typescript
rateLimit: {
  storage: "secondary-storage",
}
```

### カスタム実装

```typescript
rateLimit: {
  customStorage: {
    get: async (key) => { /* データ取得 */ },
    set: async (key, value) => { /* データ保存 */ },
  },
}
```

マイグレーション実行: `npx auth@latest migrate`

## データベーススキーマ

データベースバックのレートリミット用テーブル:

| Field | Type | Purpose |
|-------|------|---------|
| id | string | 主キー |
| key | string | ユニークなレートリミット識別子 |
| count | integer | ウィンドウ内リクエスト数 |
| lastRequest | bigint | 最後のリクエストタイムスタンプ（エポック ms） |

## エラーハンドリング

レートリミット超過時、レスポンスに待機時間（秒）を示す `X-Retry-After` ヘッダーが含まれる。

### グローバルクライアントハンドリング

```typescript
export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      if (context.response.status === 429) {
        const retryAfter = context.response.headers.get("X-Retry-After");
        console.log(`Retry after ${retryAfter} seconds`);
      }
    },
  },
});
```

### リクエスト毎のハンドリング

```typescript
await authClient.signIn.email({
  fetchOptions: {
    onError: async (context) => {
      if (context.response.status === 429) {
        // 429 レスポンスの処理
      }
    },
  },
});
```

## 注意点

- サーバー側の `auth.api` 経由リクエストはレートリミットをバイパスする
- 開発モードではデフォルト無効
- IPv6 アドレスはバイパス攻撃防止のため正規化される
