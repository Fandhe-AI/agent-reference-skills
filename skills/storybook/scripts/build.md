# Build

Storybook の静的ビルドとデプロイ用コマンド。

## 静的ビルド

```sh
storybook build
```

デフォルトで `storybook-static/` に出力する。

## 出力先ディレクトリを指定してビルド

```sh
storybook build --output-dir ./dist
```

npm スクリプト経由の場合は `--` セパレーターを付ける:

```sh
npm run storybook build -- --output-dir ./dist
```

## ドキュメントモードでビルド

```sh
storybook build --docs
```

Autodocs のみを含むドキュメントビルドを生成する。

## テスト最適化ビルド（UI 機能を除去）

```sh
storybook build --test
```

CI でのテスト実行向けに最適化したビルドを生成する。

## ビルド出力を抑制

```sh
storybook build --quiet
```

## デバッグ情報を付加してビルド

```sh
storybook build --debug
```

## カスタム設定ディレクトリを指定してビルド

```sh
storybook build --config-dir .storybook-custom
```

## ドキュメントのみのサーバーを起動（プレビュー）

```sh
storybook dev --docs
```
