# Open API

Open API プラグインは、Better Auth の OpenAPI 3.0 リファレンスを提供する。プラグインとコアによって追加された全エンドポイントを表示し、Scalar を使用してインタラクティブなリファレンス UI をレンダリングする。

開発初期段階のプラグイン。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { openAPI } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        openAPI(),
    ]
})
```

### リファレンスへのアクセス

`/api/auth/reference` にアクセスして OpenAPI リファレンス UI を表示する。

## API メソッド

### スキーマをプログラムで取得

```typescript
import { auth } from "@/lib/auth"

const openAPISchema = await auth.api.generateOpenAPISchema()
console.log(openAPISchema)
```

### Scalar ドキュメントとの統合

```typescript
app.get("/docs", Scalar({
    pageTitle: "API Documentation",
    sources: [
        { url: "/api/open-api", title: "API" },
        { url: "/api/auth/open-api/generate-schema", title: "Auth" },
    ],
}))
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `path` | string | `/api/auth/reference` | リファレンスが提供される URL パス |
| `disableDefaultReference` | boolean | `false` | カスタムドキュメント使用時にデフォルト Scalar UI を無効化 |
| `theme` | string | `default` | OpenAPI リファレンスページのテーマ |
| `nonce` | string | `undefined` | インラインスクリプト用の CSP nonce 文字列 |

## 注意点

- 全プラグインとコアエンドポイントが自動ドキュメント化される
- エンドポイントはプラグイン名でグループ化され、コアエンドポイントは "Default" とラベル付けされる
- OpenAPI 3.0 仕様に準拠
- スキーマは設定された auth インスタンスから動的に生成されるため、ドキュメントは実際のエンドポイント設定と同期する
