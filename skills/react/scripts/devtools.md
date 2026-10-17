---
source: https://react.dev/learn/react-developer-tools
---

# DevTools

Safari などブラウザー拡張が使えない環境向けのスタンドアロン React Developer Tools。

## react-devtools のグローバルインストール

> **警告**: グローバルインストールは環境全体を変更する。使い捨て環境または影響を許容できる環境で実行する。

```sh
npm install -g react-devtools
```

```sh
yarn global add react-devtools
```

## react-devtools の起動

```sh
react-devtools
```

起動後、対象サイトの `<head>` 先頭へ公式記載の `<script>` タグを追加して接続する（詳細は https://react.dev/learn/react-developer-tools）。
