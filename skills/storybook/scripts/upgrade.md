# Upgrade

Storybook のバージョンアップグレードとマイグレーションコマンド。

## 最新バージョンへのアップグレード

```sh
storybook upgrade
```

## ドライランでアップグレード確認（変更を適用しない）

```sh
storybook upgrade --dry-run
```

## プロンプトをスキップして自動アップグレード

```sh
storybook upgrade --yes
```

> **警告**: `--yes` フラグはすべてのプロンプトをスキップして自動適用する。事前にドライランで内容を確認すること。フレームワーク移行や experimental feature flag など明示的な選択が必要な migration は実行されない。experimental feature flag を有効化する automigration は `--features` で事前選択できる（次節）。フレームワーク移行は `--features` の対象外のため、`--yes` を付けずに対話プロンプトで選択するか `storybook automigrate` で実行する。

## experimental feature flag を有効化するオートマイグレーションを事前選択

```sh
storybook upgrade --features experimentalReview,experimentalDocgenServer
```

10.5 以降の experimental flag（`experimentalReview` / `experimentalDocgenServer`）は opt-in で、自動では有効化されない。`--skip-automigrations` とは併用不可。`experimentalDocgenServer` はサーバー側 docgen を提供するフレームワークのみ対象。

## autoblocker チェックをスキップして強制アップグレード

```sh
storybook upgrade --force
```

> **警告**: `--force` は autoblocker による保護チェックをスキップする。非互換性の問題が生じる可能性がある。

## 自動マイグレーションの確認（ドライラン）

```sh
storybook automigrate --dry-run
```

## 自動マイグレーションの実行

```sh
storybook automigrate
```

## プロンプトをスキップして自動マイグレーションを適用

```sh
storybook automigrate --yes
```

> **警告**: `--yes` フラグは確認なしで設定変更を適用する。バージョン管理下でのみ実行すること。

## 利用可能なオートマイグレーション一覧の表示

```sh
storybook automigrate --list
```

## コードモッドの実行（手動マイグレーション）

```sh
storybook migrate --list
```

利用可能なコードモッド一覧を表示する。

## 指定コードモッドのドライラン

```sh
storybook migrate <codemod-name> --dry-run
```

## 指定コードモッドを glob パターン対象ファイルに適用

```sh
storybook migrate <codemod-name> --glob "src/**/*.stories.tsx"
```
