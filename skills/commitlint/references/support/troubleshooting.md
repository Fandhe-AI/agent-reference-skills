# Troubleshooting

commitlint のよくある問題と解決策。

> **参照元**: https://commitlint.js.org/support/troubleshooting

## `Range error: Found invalid rule names: [...]` エラー

### 症状

`@commitlint` パッケージのいずれかを更新した後、以下のようなエラーが発生する:

```
Found invalid rule names: header-trim.
Supported rule names are: body-case, body-empty, ...
```

### 原因

`node_modules` 内の `@commitlint` パッケージ間でバージョンミスマッチが起きている。設定が要求するルールが、インストールされている `@commitlint/rules` に含まれていない場合に発生する。

### 解決策

> **TIP**: 古いバージョンの `@commitlint/config-conventional` に依存する設定を使用している場合は、それらも合わせて更新する。

```sh
npm update @commitlint/config-conventional
```

> **NOTE**: 詳細は [GitHub PR #3871](https://github.com/conventional-changelog/commitlint/pull/3871) のコメントを参照。
