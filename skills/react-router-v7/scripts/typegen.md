# Type Generation

React Router v7 の型生成コマンド。Framework Mode でルートの型安全性を実現する。

## 型の一括生成

```sh
react-router typegen
```

全ルートの TypeScript 型を `.react-router/types/` に生成する。`react-router dev` 実行中は自動で行われる。

## ウォッチモードで実行

```sh
react-router typegen --watch
```

ルート設定の変更を監視し、型を自動で再生成する。

## CI での型チェック

```sh
react-router typegen && tsc --noEmit
```

CI パイプラインで `tsc` を実行する前に必ず `typegen` を先に実行する。生成された型が存在しない状態で `tsc` を実行するとエラーになる。

## ルートツリーの確認

```sh
react-router routes
```

```sh
# JSON 形式で出力
react-router routes --json
```

ルート設定を確認して型生成の対象ルートを把握するために使用する。
