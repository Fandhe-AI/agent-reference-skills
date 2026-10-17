---
source: https://zod.dev/compile
---

# Compile

AOT コンパイル（`zod/compile`）をグローバルに有効化するコマンドと設定。

## 前提パッケージのインストール

```sh
npm install zod@^4.5.0
```

`z.compile()` / `zod/compile` は zod 4.5 以降が必要（出典: https://zod.dev/blog/introducing-z-compile の Try it 節）。以降のコマンドの前提。詳細は `install.md` を参照。

## Node.js（ESM）での事前ロード

```sh
node --import zod/compile app.js
```

スキーマを定義するどのモジュールよりも前に実行されることが保証される。アプリケーション向けでライブラリ向けではない。

## Node.js（CommonJS）での事前ロード

```sh
node --require zod/compile app.cjs
```

## Bun での事前ロード

```toml
# bunfig.toml
preload = ["zod/compile"]
```

`bunfig.toml` の `preload` に指定する。

## nub での事前ロード

```jsonc
// nub.jsonc
{
  "preload": ["zod/compile"]
}
```

## コード内での import による有効化

```ts
import "zod/compile"; // スキーマを定義するモジュールより前に置く
import * as z from "zod";
```

import 以降に構築されたスキーマが、初回 parse 時に遅延コンパイルされる。

## CSP 環境でのグローバルコンパイル無効化

```ts
import * as z from "zod";

z.config({ jitless: true });
```

コンパイルは `new Function` を使うため、CSP（eval 禁止）環境では利用できない。`jitless` 設定時はグローバルモードが停止する。`z.compile()` の直接呼び出しは明示的なオプトインのため `jitless` に関わらずコード生成を試み、`new Function` が拒否される環境ではコンパイルされないスキーマが返る。
