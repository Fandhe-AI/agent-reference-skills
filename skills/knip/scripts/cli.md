# cli

knip CLI の基本実行・オプション別コマンド集。

## 基本実行

```sh
knip
```

```sh
npm run knip
```

```sh
pnpm knip
```

```sh
bun knip
```

## バージョン・ヘルプ確認

```sh
knip --version
```

```sh
knip --help
```

## Bun ランタイムで実行

```sh
knip-bun
```

## カラー出力の無効化

```sh
NO_COLOR=1 knip
```

環境変数 `NO_COLOR` を設定することでカラーなし出力になる。

## プログレス表示の無効化

```sh
knip --no-progress
```

CI 環境では自動的に適用される。

## カスタム設定ファイルの指定

```sh
knip --config knip.custom.json
```

```sh
knip -c knip.custom.json
```

## tsconfig の指定

```sh
knip --tsConfig tsconfig.app.json
```

```sh
knip -t tsconfig.app.json
```

## tsconfig でプロジェクトファイルを定義

```sh
knip --use-tsconfig-files
```

## 実行ディレクトリの変更

```sh
knip --directory packages/my-lib
```

## 大規模コードベースでの表示制限

```sh
knip --max-show-issues 5
```

## 最大 issue 数のしきい値設定（超過で exit 1）

```sh
knip --max-issues 10
```

## 常に exit 0 で終了

```sh
knip --no-exit-code
```

## 設定ヒントの非表示

```sh
knip --no-config-hints
```

## 設定ヒントをエラーとして扱う

```sh
knip --treat-config-hints-as-errors
```

## キャッシュを有効化（連続実行を 10-40% 高速化）

```sh
knip --cache
```

```sh
knip --cache --cache-location .cache/knip
```

## ファイル変更の監視

```sh
knip --watch
```

## エントリーファイルの未使用 exports をレポートに含める

```sh
knip --include-entry-exports
```

## .gitignore を無視

```sh
knip --no-gitignore
```

## カスタムレポーター形式

```sh
knip --reporter json
```

```sh
knip --reporter markdown
```

```sh
knip --reporter compact
```

```sh
knip --reporter json --reporter-options '{"path":"knip-report.json"}'
```
