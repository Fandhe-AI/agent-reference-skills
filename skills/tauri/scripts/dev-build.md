---
source: https://v2.tauri.app/reference/cli/
---

# Dev and Build

デスクトップ向け `tauri dev` / `tauri build` / `tauri bundle` のコマンド集。

CLI の導入方法ごとの呼び出し形は次のとおり（以降は `npm run tauri` 形式と `cargo tauri` 形式で示す。npm は追加フラグの前に `--` が必要）。

| 導入 | 呼び出し |
| --- | --- |
| npm | `npm run tauri <cmd>` |
| yarn | `yarn tauri <cmd>` |
| pnpm | `pnpm tauri <cmd>` |
| deno | `deno task tauri <cmd>` |
| bun | `bun tauri <cmd>` |
| cargo | `cargo tauri <cmd>` |

## 開発モードで起動

```sh
npm run tauri dev
```

```sh
cargo tauri dev
```

`build.devUrl` を読み、`build.beforeDevCommand`（通常はフロントエンド dev server の起動）を実行する。Rust コードはホットリロード対象。初回は Rust パッケージのビルドに数分かかる。

## dev のオプション付き実行

```sh
cargo tauri dev --release
cargo tauri dev --no-watch
cargo tauri dev --no-dev-server-wait
cargo tauri dev --config <CONFIG>
cargo tauri dev --target <TARGET>
cargo tauri dev --features <FEATURES>
cargo tauri dev --port <PORT>
cargo tauri dev -- [runnerArgs] -- [appArgs]
```

`--no-watch` は `src-tauri` のファイル監視を無効化する。監視から除外するファイルは `.taurignore`（`.gitignore` 形式）に書く。`--no-dev-server` で組み込み静的ファイル dev server を無効化、`--port` はその待受ポート（既定 1430）。

## リリースビルド（バンドル込み）

```sh
npm run tauri build
```

```sh
cargo tauri build
```

`build.frontendDist` を読み、`build.beforeBuildCommand` と `build.beforeBundleCommand` を実行してバンドル・インストーラーを生成する。

## build のオプション付き実行

```sh
cargo tauri build --debug
cargo tauri build --no-bundle
cargo tauri build --bundles deb rpm appimage
cargo tauri build --target universal-apple-darwin
cargo tauri build --features <FEATURES>
cargo tauri build --config <CONFIG>
cargo tauri build --ci
cargo tauri build --no-sign
cargo tauri build --skip-stapling
cargo tauri build --ignore-version-mismatches
cargo tauri build --no-binary-patching
```

`--target` は `rustc --print target-list` の値か、macOS ユニバーサル用の `universal-apple-darwin`（`aarch64-apple-darwin` と `x86_64-apple-darwin` の両ターゲットが必要）。`--bundles` の候補は CLI が出力する `[possible values: deb, rpm, appimage]`（プラットフォームによって他の値も使われる）。`--skip-stapling` は公証チケットの staple と公証完了待ちを省く。

> **警告**: `--ignore-version-mismatches` は Tauri パッケージのバージョン不一致エラーを無視する。公式は「不一致の検出が誤りだと確信できる場合のみ使う」としている。`--no-sign` は署名をスキップする（配布物には使わない）。

## ビルド済みアプリのバンドルのみ生成

```sh
npm run tauri build -- --no-bundle --target universal-apple-darwin
npm run tauri bundle -- --bundles app --target universal-apple-darwin
```

> Notes: Adapted from the App Store page, whose build step omits --target; it is added here so the universal bundle step has a binary to package.

```sh
cargo tauri bundle
```

`tauri build` 済みのアプリからバンドルとインストーラーを生成する。`build.beforeBundleCommand` が実行される。`tauri bundle` のオプションは `--debug` / `--bundles` / `--config` / `--features` / `--target` / `--ci` / `--skip-stapling` / `--no-sign` / `--no-binary-patching`。

## 設定ファイルの上書き

```sh
cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
```

`--config` は JSON 文字列または JSON / JSON5 / TOML ファイルのパスで、デフォルト設定にマージされる（後に渡したものが優先）。上記パスは Microsoft Store 配布ページの例。`tauri.macos.conf.json` / `tauri.linux.conf.json` / `tauri.windows.conf.json` / `tauri.android.conf.json` / `tauri.ios.conf.json` はプラットフォーム別に自動でマージされる。

## dev 設定例（設定ファイル）

`tauri.conf.json` に dev server を設定する（コマンドではなく設定）。

```json
{
  "build": {
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "npm run dev"
  }
}
```

## .taurignore（監視除外）

```txt
build/
src/generated/*.rs
deny.toml
```

## 注記

- 出典の `--help` 出力にある `Usage: pnpm-native run build <cmd>` は公式 docs の生成環境由来の表記。実際の呼び出しは `tauri <cmd>`。
- 組み込み dev server（`build.frontendDist` 指定時）は相互認証・暗号化に対応しない。公式は信頼できないネットワークでの使用を禁止している。
- 出典の `--help` は `@tauri-apps/cli` 2.12.2 で生成されたもの（npm latest は 2.12.3、`crates/tauri-cli/src` の差分は `xcode_script.rs` のみ）。
