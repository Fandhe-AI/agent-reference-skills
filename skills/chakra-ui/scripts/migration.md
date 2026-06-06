# Migration

Chakra UI v2 から v3 へのマイグレーションコマンド。

## codemod による自動マイグレーション（推奨）

> **警告**: codemod はソースファイルを書き換える。事前に Git でコミットまたはバックアップを取ること。

```sh
npx @chakra-ui/codemod upgrade
```

コンポーネントのリネーム、props の変更、import パスの更新、複合コンポーネントの再構成を自動で処理する。

## ファイルを変更せずにプレビュー（dry-run）

```sh
npx @chakra-ui/codemod upgrade --dry
```

実際の変更内容を確認してから適用するときに使用する。

## 非推奨パッケージのアンインストール

```sh
npm uninstall @emotion/styled framer-motion
```

v3 では `@emotion/styled` と `framer-motion` は不要になった。

## パッケージを最新版に更新

```sh
npm install @chakra-ui/react@latest @emotion/react@latest
```

## スニペットの追加（v3 セットアップ）

codemod 実行後、v3 用のスニペットを追加する:

```sh
npx @chakra-ui/cli snippet add
```
