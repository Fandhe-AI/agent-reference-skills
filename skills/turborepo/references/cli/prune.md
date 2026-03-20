# turbo prune

特定パッケージとその依存関係のみを含む部分的なモノレポを生成する。Docker デプロイのレイヤーキャッシュ最適化に有用。

```bash
turbo prune [package] [options]
```

## オプション

| オプション | デフォルト | 説明 |
|---|---|---|
| `--docker` | `false` | Docker レイヤーキャッシュ最適化向け出力構造 |
| `--out-dir` | `./out` | 出力ディレクトリのパス |
| `--use-gitignore` | `true` | `.gitignore` を考慮 |

## --docker フラグの出力構造

```
out/
├── json/          # package.json のみ（依存インストール用）
├── full/          # 完全なソースコード（ビルド用）
└── pnpm-lock.yaml # プルーニング済みロックファイル
```

## Dockerfile での使用例

```dockerfile
FROM node:alpine AS installer
COPY out/json/ .
RUN npm install

FROM node:alpine AS builder
COPY --from=installer /app/node_modules ./node_modules
COPY out/full/ .
RUN turbo run build
```

## 注意点

- `pnpm deploy` と異なり、モノレポ構造を維持
- `globalDependencies` で参照されるファイルはデフォルトではコピーされない
