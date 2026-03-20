# Upgrade commitlint

validate-commit-msg からの移行、およびメジャーバージョン間のアップグレードガイド。

> **参照元**: https://commitlint.js.org/support/upgrade

---

## validate-commit-msg からの移行

### デフォルト設定の場合

```sh
npm remove validate-commit-msg --save-dev
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

`package.json` に `commitmsg` スクリプトを追加する:

```json
{
  "scripts": {
    "commitmsg": "commitlint -x @commitlint/config-conventional -E GIT_PARAMS"
  }
}
```

husky をインストールする:

```sh
npm install --save-dev husky
```

### カスタム設定の場合

```sh
npm remove validate-commit-msg --save-dev
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

`package.json` に `commitmsg` スクリプトを追加する:

```json
{
  "scripts": {
    "commitmsg": "commitlint -E GIT_PARAMS"
  }
}
```

husky をインストールする:

```sh
npm install --save-dev husky
```

`commitlint.config.js` を作成する:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Place your rules here
    "scope-enum": [2, "always", ["a", "b"]], // error if scope is given but not in provided list
  },
};
```

### validate-commit-msg のオプション対応表

```js
{
  "types": ["a", "b"],              // 'type-enum': [2, 'always', ['a', 'b']]
  "scope": {
    "required": true,               // 'scope-empty': [2, 'never']
    "allowed": ["a", "b"],          // 'scope-enum': [2, 'always', ['a', 'b']]; specify [0] for allowed: ["*"]
    "validate": false,              // 'scope-enum': [0], 'scope-empty': [0]
    "multiple": false               //  multiple scopes are not supported in commitlint
  },
  "warnOnFail": false,              // no equivalent setting in commitlint
  "maxSubjectLength": 100,          // 'header-max-length': [2, 'always', 100]
  "subjectPattern": ".+",           // may be configured via `parser-preset`, contact us
  "subjectPatternErrorMsg": "msg",  // no equivalent setting in commitlint
  "helpMessage": "",                // no equivalent setting in commitlint
  "autoFix": false                  // no equivalent setting in commitlint
}
```

---

## Version 1 to 2

```bash
npm install --save-dev conventional-changelog-lint@latest
```

### Breaking changes

- **CLI**: なし
- **Config**: ワイルドカード設定は v2.0.0 で無視されるようになった（警告が表示される）
- **API**: なし

---

## Version 2 to 3

パッケージ名が `conventional-changelog-lint` から `commitlint` にリネームされた。

```bash
npm remove --save-dev conventional-changelog-lint
npm install --save commitlint
mv .conventional-changelog-lintrc commitlint.config.js
```

`conventional-changelog-lint` のすべての呼び出しを `commitlint` にリネームする。

### Breaking changes

**CLI**:

- `conventional-changelog-lint` コマンドは `commitlint` に変更された
- `commitlint` コマンドは `@commitlint/cli` 経由でインストールされるようになった
- `.conventional-changelog-lintrc` は `commitlint.config.js` に変更された
- `commitlint` は設定ファイルをディレクトリ構造の上方向に検索しなくなった
- `--preset | -p` フラグが削除された。`angular` プリセットが常に使用される

**Config**:

- `.preset` キーが削除された。`angular` プリセットが常に使用される

**API**:

- `getConfiguration(name, settings, seed)` は `load(seed)` に変更された
- `getMessages(range)` は `read(range)` に変更された
- `getPreset(name, require)` は削除された
- `format(report, options)` は `options` の `.color` のみを参照するようになった
- `lint(message, options)` は `lint(message, rules)` に変更された

---

## Version 4 to 5

```bash
npm remove --save-dev @commitlint/config-angular
npm install --save @commitlint/cli @commitlint/config-conventional
echo 'module.exports = {extends: ["@commitlint/config-conventional"]};'
```

### Breaking changes

- **Config**: `config-angular` が `chore` type のサポートを廃止した。conventional-changelog との互換性が壊れるため、代わりに `config-conventional` を使用する

---

## Version 7 to 8

### Breaking changes

- 成功したコミットの出力がデフォルトで省略されるようになった
- `--verbose` フラグを使用するとポジティブな出力を得られる

---

## Version 8 to 9

### Breaking changes

- **Possible types**: `improvement` type が `config-conventional` で拒否されるようになった

---

## Version 9 to 10

### Breaking changes

- **Node support**: Node v8 はサポートされなくなった

---

## Version 10 to 11

### Breaking changes

- **Lerna support**: Lerna v2 はサポートされなくなった

---

## Version 11 to 12

### Breaking changes

- **resolve-extends**: `extends` の解決順序が右から左（right-to-left）から左から右（left-to-right）に変更された
