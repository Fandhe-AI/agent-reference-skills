# Migrate

バージョンアップグレード・移行コマンド。

## @turbo/codemod による自動移行

```sh
npx @turbo/codemod migrate
```

非推奨機能・破壊的変更の自動移行を実行する。事前に各パッケージマネージャーの install を済ませておく。

## ドライランで変更内容を確認してから実行

```sh
npx @turbo/codemod migrate --dry
```

> **警告**: `migrate` は設定ファイルや `package.json` を書き換える。`--dry` で事前に変更内容を確認することを推奨。

## 個別の transform の実行

```sh
npx @turbo/codemod [transform] [path] [--dry] [--print]
```

`--dry` は編集せず確認のみ、`--print` は変更後の出力を表示する。2.x 系の代表的な transform:

```sh
npx @turbo/codemod update-versioned-schema-json   # 2.7.5: $schema を versioned サブドメイン形式へ
npx @turbo/codemod update-schema-json-url         # 2.0.0: versioned schema URL を v2 へ
npx @turbo/codemod add-package-names              # 2.0.0: name の無い package.json に name を追加
npx @turbo/codemod clean-globs                    # 2.0.0: 無効になった glob を修正
npx @turbo/codemod migrate-dot-env                # 2.0.0: 削除された dotEnv を inputs へ移行
npx @turbo/codemod rename-output-mode             # 2.0.0
npx @turbo/codemod rename-pipeline                # 2.0.0
npx @turbo/codemod stabilize-ui                   # 2.0.0
```

> **警告**: transform は設定ファイルを書き換える。`--dry` で事前に確認すること。

## turbo scan による最適化設定（非推奨）

```sh
turbo scan
```

Git FS Monitor・Remote Caching・バージョンチェック等をインタラクティブに設定する。

> **注記**: `turbo scan` は非推奨（deprecated）であり、将来のバージョンで削除される予定。
