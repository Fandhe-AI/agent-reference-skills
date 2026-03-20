# 環境変数の使用

## 4種類のキーの違い

| キー | スコープ | ハッシュ影響 | 用途 |
|---|---|---|---|
| `env` | タスク個別 | あり | ビルド出力に影響する変数 |
| `globalEnv` | 全タスク | あり | リポジトリ全体に影響する変数 |
| `passThroughEnv` | タスク個別 | なし | 実行には必要だが出力に影響しない変数 |
| `globalPassThroughEnv` | 全タスク | なし | リポジトリ全体で実行時に必要な変数 |

## 設定例

```json
{
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": ["AWS_ACCESS_KEY_ID"],
  "tasks": {
    "build": {
      "env": ["MY_API_URL", "MY_API_KEY"],
      "passThroughEnv": ["CI"]
    }
  }
}
```

## Strict Mode vs Loose Mode

- `strict`（デフォルト）: 宣言されていない環境変数はタスクに渡されない
- `loose`: プロセスの全環境変数がタスクに渡される

## フレームワーク自動推論

Next.js の `NEXT_PUBLIC_*`、Vite の `VITE_*` 等は自動的にハッシュに含まれる。

無効化: `turbo build --framework-inference=false`

## .env ファイルの扱い

Turborepo は `.env` ファイルを自動ロードしない。`inputs` に追加してハッシュに含める:

```json
{
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env*"]
    }
  }
}
```

## ベストプラクティス

- `.env` ファイルはルートではなくアプリパッケージに置く
- `eslint-config-turbo` でハッシュに含まれていない変数を検出
- トラブルシューティング: `turbo build --summarize`
