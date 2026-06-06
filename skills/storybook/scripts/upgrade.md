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

> **警告**: `--yes` フラグはすべてのプロンプトをスキップして自動適用する。事前にドライランで内容を確認すること。

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
