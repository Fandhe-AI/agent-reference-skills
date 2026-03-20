# Shareable Config

共有設定の作成・配布・使用方法。

> **参照元**: https://commitlint.js.org/concepts/shareable-config

## 概要

共有設定（Shareable config）は、commitlint のルールセットを npm パッケージとして配布・再利用するための仕組み。`.rules` を含むオブジェクトをデフォルトエクスポートする npm パッケージとして提供される。

## 共有設定の構造

共有設定パッケージは、`rules` プロパティを持つオブジェクトをエクスポートする:

```javascript
// commitlint-config-example/index.js
export default {
  rules: {
    'body-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 72],
  },
};
```

## extends での使用

### npm パッケージ

`extends` 配列にパッケージ名を指定する。`commitlint-config-` プレフィックスは省略できる:

```javascript
/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['example'], // => commitlint-config-example
};
```

パッケージのインストール:

```sh
npm install --save-dev commitlint-config-example
```

### スコープ付きパッケージ

スコープ付きパッケージはフルパスで指定する:

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
};
```

スコープ名のみを指定すると、`<scope>/commitlint-config` として解決される:

```javascript
export default {
  extends: ['@coolcompany'], // => @coolcompany/commitlint-config
};
```

> **注意**: スコープ付きパッケージが `<scope>/commitlint-config` の命名規則に従っていない場合は、フルパッケージ名を指定する必要がある。

### ローカル設定（相対パス）

ドット（`.`）で始まる相対パスを指定すると、ローカルファイルとして解決される:

```javascript
export default {
  extends: ['./example'], // => ./example.js
};
```

## マージの仕組み

`extends` で指定された共有設定のルールは、ローカルの `commitlint.config.js` に定義されたルールとマージされる。

### 再帰的マージ

マージは**再帰的**に動作する。共有設定自体がさらに別の共有設定を `extends` している場合、そのチェーンは無限にたどられる:

```
commitlint.config.js
  └── extends: commitlint-config-a
        └── extends: commitlint-config-b
              └── extends: commitlint-config-c
```

この場合、`commitlint-config-c` → `commitlint-config-b` → `commitlint-config-a` → ローカル設定の順にマージされ、後から指定されたルールが優先される。

### ローカルルールの優先

ローカル設定で定義したルールは、共有設定のルールを上書きする:

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 共有設定の header-max-length ルールを上書き
    'header-max-length': [2, 'always', 100],
  },
};
```

## パッケージ命名規則

| パターン | 解決先 |
|---------|--------|
| `'example'` | `commitlint-config-example` |
| `'@scope/example'` | `@scope/commitlint-config-example` |
| `'@scope'` | `@scope/commitlint-config` |
| `'@scope/config-conventional'` | `@scope/config-conventional`（そのまま） |
| `'./local'` | `./local.js`（ローカルファイル） |
