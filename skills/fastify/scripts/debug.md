---
source: https://github.com/fastify/fastify-cli/blob/v8.0.0/README.md
---

# debug

`fastify-cli` 8.0.0 時点（main ブランチ README.md、2026-08-29 取得）によるルーティング・プラグイン構造の可視化コマンド。

## ルーティングツリーの表示

```sh
fastify print-routes
```

router が内部で使用する radix tree の表現を出力する。

## プラグインツリーの表示

```sh
fastify print-plugins
```

avvio が内部で使用するプラグインツリーの表現を出力する。
