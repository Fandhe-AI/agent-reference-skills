# Plugins

> Source: https://commitlint.js.org/reference/plugins

commitlint のプラグインシステム。eslint のプラグイン実装に基づいている。

## プラグイン命名規則

- 標準形式: `commitlint-plugin-<plugin-name>`（例: `commitlint-plugin-jquery`）
- スコープ付き: `@<scope>/commitlint-plugin-<plugin-name>`（例: `@myorg/commitlint-plugin-custom`）

## ルールの実装

プラグインは `rules` オブジェクトをエクスポートし、ルール ID とルール関数のマッピングを公開する。ルール ID には命名要件はない。

```javascript
export default {
  rules: {
    "dollar-sign": function (parsed, when, value) {
      // rule implementation ...
    },
  },
};
```

### ルール関数の引数

| 引数 | 説明 |
|------|------|
| `parsed` | パースされたコミットメッセージオブジェクト |
| `when` | `always` または `never` |
| `value` | ルールに渡された値 |

### ルール関数の戻り値

```javascript
[
  boolean, // true = パス、false = 失敗
  string   // 失敗時のメッセージ
]
```

## 設定でのプラグインルール参照

プラグインルールは `pluginname/rulename` 形式で参照する。

例: `commitlint-plugin-myplugin` に `dollar-sign` ルールがある場合:

```json
{
  "plugins": ["commitlint-plugin-myplugin"],
  "rules": {
    "myplugin/dollar-sign": [2, "always"]
  }
}
```

## ピア依存関係

プラグインの `package.json` で `@commitlint/lint` をピア依存関係として宣言する必要がある:

```json
{
  "peerDependencies": {
    "@commitlint/lint": ">=7.6.0"
  }
}
```

## 公開時のキーワード

npm で公開する場合、`package.json` の `keywords` に以下を含めることが推奨される:

- `commitlint`
- `commitlintplugin`

## ローカルプラグイン

プラグインを公開せずにプロジェクト内でローカルに定義できる。**1 プロジェクトにつきローカルプラグインは 1 つのみ**。

```javascript
export default {
  rules: {
    "hello-world-rule": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "hello-world-rule": ({ subject }) => {
          const HELLO_WORLD = "Hello World";
          return [
            subject.includes(HELLO_WORLD),
            `Your subject should contain ${HELLO_WORLD} message`,
          ];
        },
      },
    },
  ],
};
```

### テスト

```bash
# 失敗
echo "feat: random subject" | commitlint
# => Your subject should contain Hello World message

# 成功
echo "feat: Hello World" | commitlint
# => パス
```
