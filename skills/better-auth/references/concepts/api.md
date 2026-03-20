# API

Better Auth はサーバー側 API アクセスを、auth インスタンスに公開される `api` オブジェクトを通じて提供する。HTTP リクエストではなく通常の関数呼び出しとして認証エンドポイントと直接やり取りできる。

## 概要

auth インスタンスを作成すると、`api` オブジェクトが提供される。このオブジェクトは Better Auth インスタンスに存在するすべてのエンドポイントを公開する。API は [better-call](https://github.com/bekacru/better-call) を活用し、REST エンドポイントを標準関数として呼び出せる軽量ウェブフレームワーク。

## API パラメーター

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `body` | Object | No | リクエストボディデータ |
| `headers` | Headers | Conditional | HTTP ヘッダー（認証トークン、IP 情報） |
| `query` | Object | No | URL クエリパラメーター |
| `returnHeaders` | boolean | No | レスポンスヘッダーを戻り値に含める |
| `asResponse` | boolean | No | 生の Response オブジェクトを返す |

## コード例

### セッション取得

```typescript
import { auth } from "@/lib/auth";

await auth.api.getSession({
  headers: await headers(),
});
```

### Body パラメーター付き

```typescript
await auth.api.signInEmail({
  body: {
    email: "john@doe.com",
    password: "password",
  },
  headers: await headers(),
});
```

### Query パラメーター付き

```typescript
await auth.api.verifyEmail({
  query: {
    token: "my_token",
  },
});
```

### メールサインアップ

```typescript
await auth.api.signUpEmail({
  returnHeaders: true,
  body: {
    email: "john@doe.com",
    password: "password",
    name: "John Doe",
  },
});
```

### レスポンスヘッダーの取得

```typescript
const { headers, response } = await auth.api.signUpEmail({
  returnHeaders: true,
  body: {
    email: "john@doe.com",
    password: "password",
    name: "John Doe",
  },
});

const cookies = headers.getSetCookie();
const customHeader = headers.get("x-custom-header");
```

### Response オブジェクトの取得

```typescript
const response = await auth.api.signInEmail({
  body: {
    email: "",
    password: "",
  },
  asResponse: true,
});
```

## エラーハンドリング

### 型定義

```typescript
import { APIError, isAPIError } from "better-auth/api";
```

### 実装

```typescript
try {
  await auth.api.signInEmail({
    body: {
      email: "",
      password: "",
    },
  });
} catch (error) {
  if (isAPIError(error)) {
    console.log(error.message, error.status);
  }
}
```

## 注意点

- クライアント側の呼び出しとは異なり、サーバー実装はプレーンな JavaScript オブジェクトを直接受け取る
- `returnHeaders` オプションは Cookie 抽出用の標準 `Headers` オブジェクトを取得する
- `asResponse` オプションは完全な HTTP レスポンスメタデータが必要な場合に使用
- コア機能やプラグインで定義されたすべてのエンドポイントが自動的に利用可能になる
- エラーインスタンスは `APIError` を継承し、一貫したエラーハンドリングパターンを提供

## セキュリティ考慮事項

- 一部のエンドポイントはヘッダーが必要（セッショントークン、IP 検出のため）
- ヘッダーはユーザーセッショントークンや IP アドレス情報など、レート制限や不正検知に必要なメタデータを提供
- レスポンスヘッダーには認証 Cookie が含まれ、セキュリティ上の慎重な取り扱いが必要
- すべてのサーバー側呼び出しは信頼されたコードとして実行される
