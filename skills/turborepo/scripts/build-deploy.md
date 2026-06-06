# Build & Deploy

ビルド・デプロイ・Docker 向け操作コマンド。

## ビルドタスクの実行

```sh
turbo run build
```

## 特定パッケージのビルド

```sh
turbo run build --filter=web
turbo run build --filter=@acme/web
turbo run build --filter=./apps/web
```

## 複数タスクの並列実行

```sh
turbo run build test lint check-types
```

## 変更パッケージのみビルド

```sh
turbo run build --affected
turbo run build --filter=[HEAD^1]
turbo run build --filter=[origin/main]
```

## Docker 向け部分モノレポの生成（turbo prune）

> **警告**: `--out-dir` に既存ディレクトリを指定すると内容が上書きされる。

```sh
turbo prune <package>
```

| オプション | デフォルト | 説明 |
|---|---|---|
| `--docker` | `false` | Docker レイヤーキャッシュ最適化向け出力構造を生成 |
| `--out-dir <path>` | `./out` | 出力ディレクトリのパス |
| `--use-gitignore` | `true` | `.gitignore` を考慮 |

Docker 向けに出力する例:

```sh
turbo prune web --docker
```

`--docker` フラグを使った場合の出力構造:

```
out/
├── json/          # package.json のみ（依存インストール用）
├── full/          # 完全なソースコード（ビルド用）
└── pnpm-lock.yaml # プルーニング済みロックファイル
```

カスタム出力先を指定:

```sh
turbo prune web --docker --out-dir=./docker-out
```

## タスクグラフの可視化

```sh
turbo run build --graph
turbo run build --graph=graph.svg
turbo run build --graph=graph.html
turbo run build --graph=graph.mermaid
```

## ビルド結果の確認

```sh
turbo run build --dry
turbo run build --dry=json
turbo run build --summarize
```

## 同時実行数の制御

```sh
turbo run build --concurrency=10
turbo run build --concurrency=50%    # CPU 数の 50% を使用
```

## エラー時の続行設定

```sh
turbo run build --continue=always                   # 常に続行
turbo run build --continue=dependencies-successful  # 依存が成功したら続行
turbo run build --continue=never                    # エラーで即停止（デフォルト）
```
