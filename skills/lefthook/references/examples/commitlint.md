# Commitlint and Commitizen with Lefthook

Source: https://lefthook.dev/examples/commitlint

commitlint（コミットメッセージの検証）と Commitizen（対話的なコミットメッセージ生成）を Lefthook と統合する方法を説明します。

## 依存パッケージのインストール

### commitlint（コミットメッセージのリント）

```
yarn add -D @commitlint/cli @commitlint/config-conventional
```

### Commitizen（対話的コミットメッセージ生成）

```
yarn add -D commitizen cz-conventional-changelog
```

## 設定

### commitlint の設定

`commitlint.config.js` を作成し、Conventional Commits の規約を使用するように設定します:

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### Commitizen の設定

`package.json` に Commitizen の設定を追加し、Conventional Changelog アダプターを指定します:

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

### Lefthook の設定

```yaml
# lefthook.yml

prepare-commit-msg:
  commands:
    commitizen:
      interactive: true
      run: yarn run cz --hook
      env:
        LEFTHOOK: 0

commit-msg:
  commands:
    commitlint:
      run: yarn run commitlint --edit {1}
```

## フックの説明

### prepare-commit-msg フック

- **commitizen** コマンドが対話的に実行され、コミットメッセージの生成を支援する
- `interactive: true` で対話モードを有効化
- `LEFTHOOK: 0` 環境変数により、Commitizen 実行中の Lefthook の再帰的実行を防止

### commit-msg フック

- **commitlint** コマンドがコミットメッセージを検証する
- `{1}` はコミットメッセージファイルのパスに展開される

## 使用方法

- **Commitizen を使う場合**: メッセージ引数なしで `git commit` を実行すると、対話的にコミットメッセージを生成できる
- **commitlint のみ使う場合**: `git commit -m "メッセージ"` で直接メッセージを指定し、commitlint が検証する
