# Getting Started

commitlint のインストールと基本設定。

> **参照元**: https://commitlint.js.org/guides/getting-started

## インストール

`@commitlint/cli` と設定パッケージ `@commitlint/config-conventional` を devDependencies としてインストールする。

```bash
# npm
npm install -D @commitlint/cli @commitlint/config-conventional
```

```bash
# yarn
yarn add -D @commitlint/cli @commitlint/config-conventional
```

```bash
# pnpm
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

```bash
# bun
bun add -d @commitlint/cli @commitlint/config-conventional
```

```bash
# deno
deno add -D npm:@commitlint/cli npm:@commitlint/config-conventional
```

## 設定ファイルの作成

`@commitlint/config-conventional` を extends する設定ファイルを作成する。

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

これにより以下の内容の `commitlint.config.js` が生成される:

```javascript
export default { extends: ['@commitlint/config-conventional'] };
```

`@commitlint/config-conventional` は [Conventional Commits](https://www.conventionalcommits.org/) の規約に基づいたルールセットを提供する。

## Node v24 に関する注意

> **Warning**: Node v24 ではモジュールのロード方法が変更されており、commitlint の設定ファイルの読み込みに影響がある。

プロジェクトに `package.json` が存在しない場合、commitlint が設定を読み込めず以下のエラーが発生する可能性がある:

```
Please add rules to your commitlint.config.js
```

### 解決策

1. **`package.json` を追加して ES6 モジュールとして宣言する**:

```bash
npm init es6
```

2. **設定ファイルの拡張子を `.mjs` に変更する**:

`commitlint.config.js` を `commitlint.config.mjs` にリネームする。
