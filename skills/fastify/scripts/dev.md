---
source: https://github.com/fastify/fastify-cli/blob/main/README.md
---

# dev

`fastify-cli` 8.0.0 時点（main ブランチ README.md、2026-08-29 取得）の `start` コマンドで開発・運用時にサーバーを起動するコマンド集。

## 基本起動

```sh
fastify start plugin.js
```

## ポート・アドレスを指定して起動

```sh
fastify start -p 8080 -a 0.0.0.0 plugin.js
```

`-p` / `--port`（デフォルト 3000）、`-a` / `--address` に対応。

## ログレベルとログ出力の調整

```sh
fastify start -l debug -P plugin.js
```

`-l` / `--log-level`（デフォルト `fatal`）、`-P` / `--pretty-logs` で pretty ログ出力。`-L` / `--logging-module` でログ設定モジュールのパスを指定できる。

## ファイル変更監視での自動リロード

```sh
fastify start -w plugin.js
```

`-w` / `--watch` で監視モードを有効化。`--ignore-watch` で監視対象から除外するファイル・ディレクトリを指定、`--follow-watch` で監視対象を限定、`-V` / `--verbose-watch` でイベントログを出力する。

## デバッグモードで起動

```sh
fastify start -d -I 9320 plugin.js
```

`-d` / `--debug` でデバッグモード起動、`-I` / `--debug-port`（デフォルト 9320）でインスペクタポート指定、`--debug-host` でインスペクタホストを指定できる。

## モジュールのプリロード

```sh
fastify start -r dotenv/config plugin.js
```

`-r` / `--require` で CommonJS モジュールをプリロード、`-i` / `--import` で ES モジュールをプリロードする。

## ペイロードサイズ・タイムアウト・プレフィックスの調整

```sh
fastify start --body-limit 1048576 -T 10000 -x /api plugin.js
```

`--body-limit` で最大ペイロードバイト数、`-T` / `--plugin-timeout` でプラグインタイムアウト、`-x` / `--prefix` でルートプレフィックスを指定する。

## graceful shutdown の遅延設定

```sh
fastify start -g 5000 plugin.js
```

`-g` / `--close-grace-delay` で強制クローズまでの最大遅延を指定する（単位は要確認）。

## trust proxy の設定

```sh
fastify start --trust-proxy-enabled true --trust-proxy-ips 127.0.0.1 plugin.js
```

`--trust-proxy-enabled`（真偽値）、`--trust-proxy-ips`（IP/CIDR）、`--trust-proxy-hop`（ホップ数）で `trustProxy` を設定する。

## Unix ソケットで起動

```sh
fastify start -s /tmp/fastify.sock plugin.js
```

`-s` / `--socket` でソケットパスを指定する。

## 設定ファイルの読み込み

```sh
fastify start -c config.json plugin.js
```

`-c` / `--config` で設定ファイルパスを指定する。`-o` / `--options` はカスタムオプションの使用を有効にするフラグ（値の受け渡し形式は要確認）。
