# Lint

TSDoc 構文の検証と lint 実行。

## TypeScript ファイルの TSDoc 構文チェック

```sh
npm run lint
```

`package.json` の lint スクリプトが `eslint -f unix "src/**/*.{ts,tsx}"` のように設定されている場合に実行する。

## ESLint 設定への TSDoc プラグイン追加（.eslintrc.js）

```sh
# .eslintrc.js に以下を追加して tsdoc/syntax ルールを有効化する
```

```js
// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["eslint-plugin-tsdoc"],
  rules: {
    "tsdoc/syntax": "warn",
  },
};
```

`eslint-plugin-tsdoc` のインストール後、上記設定を追加することで TSDoc 構文エラーを検出できる。
