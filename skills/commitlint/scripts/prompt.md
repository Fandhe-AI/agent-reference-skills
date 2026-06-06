# prompt

対話型コミットメッセージ作成ツールのインストールと使い方。

> **注記**: `@commitlint/prompt-cli` は現在メンテナンスされていない。一部の機能が期待通りに動作しない可能性がある。

## @commitlint/prompt-cli のインストール（npm）

```sh
npm install --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

## @commitlint/prompt-cli のインストール（yarn）

```sh
yarn add --dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

## @commitlint/prompt-cli のインストール（pnpm）

```sh
pnpm add --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

## @commitlint/prompt-cli のインストール（bun）

```sh
bun add --dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

## 設定ファイルの作成

```sh
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

## 対話型プロンプトの実行（npm）

`package.json` の `scripts.commit` に `"commit"` を設定済みの場合:

```sh
git add .
npm run commit
```

## 対話型プロンプトの実行（yarn）

```sh
git add .
yarn commit
```

## 対話型プロンプトの実行（pnpm）

```sh
git add .
pnpm commit
```

## 対話型プロンプトの実行（bun）

```sh
git add .
bun commit
```
