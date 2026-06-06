# CLI

syncpack の全 CLI コマンドとよく使うオプション

## 依存関係の一覧表示

```sh
syncpack list
```

## 依存関係の一覧表示（本番依存のみ・件数順）

```sh
syncpack list --dependency-types prod --sort count
```

## 依存関係の一覧表示（glob フィルター）

```sh
syncpack list --dependencies '**eslint**'
syncpack list --dependencies '@types/**'
```

## バージョン不一致の検出

```sh
syncpack lint
```

本番・開発依存のみ検査する場合:

```sh
syncpack lint --dependency-types prod,dev
```

## バージョン不一致の自動修正

```sh
syncpack fix
```

> **警告**: `package.json` を直接書き換える。実行後は `npm install` / `pnpm install` 等でロックファイルを更新すること。

特定の依存関係のみ修正する場合:

```sh
syncpack fix --dependencies react
syncpack fix --dependencies '@types/**'
```

依存カテゴリを絞って修正する場合:

```sh
syncpack fix --dependency-types prod,dev
```

変更をプレビュー（ファイルを書き換えない）:

```sh
syncpack fix --dry-run
```

## package.json のフォーマット（整形）

```sh
syncpack format
```

> **警告**: `package.json` のフィールド順・アルファベット順を書き換える。バージョン番号は変更しない。

フォーマット確認のみ（ファイルを書き換えない）:

```sh
syncpack format --check
```

特定パッケージのみ確認する場合:

```sh
syncpack format --check --source 'packages/pingu/package.json'
```

## npm レジストリから最新バージョンへ更新

```sh
syncpack update --target latest
```

> **警告**: npm レジストリへのネットワークアクセスが必要。`package.json` を直接書き換える。実行後は `npm install` / `pnpm install` 等でロックファイルを更新すること。

更新範囲を制限する場合:

```sh
# マイナーバージョンまで（1.x.x）
syncpack update --target minor

# パッチバージョンまで（1.2.x）
syncpack update --target patch
```

更新の確認のみ（ファイルを書き換えない）:

```sh
syncpack update --check
syncpack update --check --dependencies react
syncpack update --check --dependency-types dev --target patch
```

特定依存関係のみ更新する場合:

```sh
syncpack update --dependencies react
syncpack update --dependencies '@aws-sdk/**'
```

## 依存関係情報を JSON で出力

```sh
syncpack json
```

特定依存関係のみ出力する場合:

```sh
syncpack json --dependencies '@aws-sdk/**'
```

jq と組み合わせる場合:

```sh
syncpack json | jq -r '.dependencyType' | sort | uniq -c
```

## ヘルプの表示

```sh
# 簡易サマリー
syncpack lint -h

# 詳細ドキュメント
syncpack lint --help
```

`lint` の部分を `fix` / `format` / `list` / `update` / `json` に変えて各コマンドのヘルプを確認できる。

## 共通オプション

全コマンドで利用できる代表的なオプション:

| オプション | 説明 |
| --- | --- |
| `--config <path>` | 設定ファイルのパスを指定（拡張子必須） |
| `--dependencies <pattern>` | 依存名を glob でフィルター（`!` プレフィックスで除外） |
| `--dependency-types <types>` | カテゴリを絞る（`prod`, `dev`, `peer` 等、カンマ区切り） |
| `--specifier-types <types>` | バージョン指定形式でフィルター（`exact`, `range` 等） |
| `--source <pattern>` | 対象 `package.json` を glob で指定 |
| `--source-mode <mode>` | `replace`（デフォルト）または `extend` でソースパターンを制御 |
| `--log-levels <levels>` | ログ詳細度（`off`, `error`, `warn`, `info`, `debug`） |
| `--no-ansi` | カラー出力・ハイパーリンクを無効化 |
| `--reporter <format>` | 出力形式（`pretty` または `json` NDJSON） |
