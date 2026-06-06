# Migrate

バージョンアップグレード・移行コマンド。

## @turbo/codemod による自動移行

```sh
npx @turbo/codemod migrate
```

非推奨機能・破壊的変更の自動移行を実行する。

## ドライランで変更内容を確認してから実行

```sh
npx @turbo/codemod migrate --dry
```

> **警告**: `migrate` は設定ファイルや `package.json` を書き換える。`--dry` で事前に変更内容を確認することを推奨。

## turbo scan による最適化設定（非推奨）

```sh
turbo scan
```

Git FS Monitor・Remote Caching・バージョンチェック等をインタラクティブに設定する。

> **注記**: `turbo scan` は非推奨（deprecated）であり、将来のバージョンで削除される予定。
