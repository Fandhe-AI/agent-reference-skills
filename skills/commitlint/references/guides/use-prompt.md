# Use Prompt

`@commitlint/prompt-cli` を使った対話的なコミットメッセージ作成。

> **参照元**: https://commitlint.js.org/guides/use-prompt

> **Warning**: Prompt は現在メンテナンスされていない。一部の機能が期待通りに動作しない可能性がある。

## インストール

`@commitlint/prompt-cli` を `@commitlint/cli` および設定パッケージと共にインストールする。

```bash
# npm
npm install --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

```bash
# yarn
yarn add --dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

```bash
# pnpm
pnpm add --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

```bash
# bun
bun add --dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli
```

## 設定

設定ファイルを作成する:

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

`package.json` に `commit` スクリプトを追加する:

```json
{
  "scripts": {
    "commit": "commit"
  }
}
```

## 使い方

変更をステージングしてからプロンプトを実行する:

```bash
git add .
npm run commit
```

```bash
git add .
yarn commit
```

```bash
git add .
pnpm commit
```

```bash
git add .
bun commit
```

対話的なプロンプトが起動し、commitlint のルールに準拠したコミットメッセージを作成できる。

## 代替手段: commitizen

[commitizen](https://github.com/commitizen/cz-cli) 用の commitlint アダプタが 2 つ提供されている:

### @commitlint/prompt

`@commitlint/prompt-cli` と同様の対話的な機能を commitizen 経由で提供する。

### @commitlint/cz-commitlint

[cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) にインスパイアされた、より現代的なインターフェースを提供する。commitizen との組み合わせで使用する。
