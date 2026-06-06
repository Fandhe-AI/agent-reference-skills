# CLI

`npx auth@latest` コマンドによるプロジェクト操作。

## プロジェクトの初期化

```sh
npx auth@latest init
```

Better Auth をプロジェクトに初期化する。オプションで `--framework`、`--database`、`--plugins`、`--package-manager` を指定できる。

## プロジェクトの初期化（オプション指定）

```sh
npx auth@latest init \
  --name my-app \
  --framework nextjs \
  --database sqlite \
  --plugins two-factor,organization \
  --package-manager pnpm
```

現在サポートされているフレームワークは Next.js、データベースは SQLite のみ（要確認）。

## 環境診断情報の表示

```sh
npx auth@latest info
```

OS、Node.js バージョン、Better Auth バージョン、検出されたフレームワーク・ORM を表示する。機密データは自動的に `[REDACTED]` に置換される。

## 環境診断情報の JSON 出力

```sh
npx auth@latest info --json
```

## 診断情報をファイルへ書き出し

```sh
npx auth@latest info --json > auth-info.json
```

## シークレットキーの生成

```sh
npx auth@latest secret
```
