---
source: https://v2.tauri.app/develop/
---

# Mobile

Android / iOS 向け `tauri android` / `tauri ios` の初期化・開発・ビルド・実行コマンド集。

> **警告**: `tauri ios` の各コマンドは macOS ホストでのみ動作する。物理デバイス向けの `--host` は dev server を公開ネットワークアドレスに晒す（公式は dev server に相互認証・暗号化が無い点を注意している）。信頼できるネットワークでのみ使う。

## Android プロジェクトの初期化

```sh
npm run tauri android init
```

```sh
cargo tauri android init
```

オプション: `--ci` / `--skip-targets-install`（rustup によるツールチェーン導入を省く）/ `--config <CONFIG>`。

## iOS プロジェクトの初期化

```sh
npm run tauri ios init
```

```sh
cargo tauri ios init
```

オプション: `--ci` / `-r, --reinstall-deps` / `--skip-targets-install` / `--config <CONFIG>`。

## 開発モードで起動

```sh
npm run tauri android dev
npm run tauri ios dev
```

```sh
cargo tauri android dev
cargo tauri ios dev
```

接続中のデバイスで実行し、無ければシミュレーター/エミュレーターの選択を求める。デバイス名を引数で先に指定できる。

```sh
cargo tauri ios dev 'iPhone 15'
```

## Xcode / Android Studio を開く

```sh
cargo tauri android dev --open
cargo tauri ios dev --open
```

物理 iOS デバイスで実行する場合は `--host` も付け、dev server 側で `TAURI_DEV_HOST` を待受ホストに使う。

```sh
cargo tauri ios dev --open --host
```

iOS デバイスのアドレスを選ぶ場合（Xcode の Window > Devices and Simulators でデバイスをネットワーク接続しておく）。

```sh
cargo tauri ios dev --force-ip-prompt
```

Xcode / Android Studio を使う間も Tauri CLI のプロセスは終了させない。

## dev の主なオプション

| Option | 説明 |
| --- | --- |
| `-f, --features [<FEATURES>...]` | 有効にする cargo features |
| `-e, --exit-on-panic` | panic で終了 |
| `-c, --config <CONFIG>` | 設定のマージ（JSON 文字列または JSON / JSON5 / TOML のパス） |
| `--release` | リリースモードで実行 |
| `--no-dev-server-wait` | dev server の起動待ちを省く |
| `--no-watch` | ファイル監視を無効化 |
| `--additional-watch-folders <ADDITIONAL_WATCH_FOLDERS>` | 追加の監視パス |
| `-o, --open` | Android Studio / Xcode を開く |
| `--force-ip-prompt` | dev server への接続 IP を毎回尋ねる |
| `--host [<HOST>]` | 公開ネットワークアドレスで dev server に接続（Windows では既定） |
| `--no-dev-server` | 組み込み静的 dev server を無効化 |
| `--port <PORT>` | 組み込み dev server のポート（既定 1430） |
| `--root-certificate-path <ROOT_CERTIFICATE_PATH>` | HTTPS dev server の証明書（環境変数 `TAURI_DEV_ROOT_CERTIFICATE_PATH`） |

## Android リリースビルド

```sh
npm run tauri android build
```

```sh
cargo tauri android build --aab
cargo tauri android build --apk
cargo tauri android build --apk --split-per-abi
cargo tauri android build --aab --target aarch64 --target armv7
```

`-t, --target` の候補は `aarch64` / `armv7` / `i686` / `x86_64`（既定は全て）。その他のオプション: `-d, --debug` / `-f, --features` / `-c, --config` / `-o, --open` / `--ci` / `--ignore-version-mismatches`。

## iOS リリースビルド

```sh
npm run tauri ios build
```

```sh
cargo tauri ios build --export-method app-store-connect
cargo tauri ios build --open
```

`--export-method` の候補は `app-store-connect` / `release-testing` / `debugging`。`-t, --target` の候補は `aarch64`（既定）/ `aarch64-sim` / `x86_64`。その他: `--build-number <BUILD_NUMBER>` / `-d, --debug` / `-f, --features` / `-c, --config` / `-o, --open` / `--ci` / `--ignore-version-mismatches`。

## リリースモードで実行

```sh
cargo tauri android run
cargo tauri ios run
```

`-r, --release` / `-f, --features` / `-c, --config` / `--no-watch` / `--additional-watch-folders` / `-o, --open` / `--ignore-version-mismatches` を取る。デバイス名は第 1 引数。

## 参考: Vite の dev server 設定

物理 iOS デバイスで使うには dev server が `TAURI_DEV_HOST` を待受ホストにする必要がある。公式の Vite 例。

```js
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    host: host || false,
    port: 1420,
    strictPort: true,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
  },
});
```
