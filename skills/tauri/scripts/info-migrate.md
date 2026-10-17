---
source: https://v2.tauri.app/reference/cli/
---

# Info and Migrate

環境診断（`tauri info`）、v1 / v2 beta からの移行（`tauri migrate`）、シェル補完、WiX Upgrade Code の確認、依存更新のコマンド集。

> **警告**: `tauri migrate` はプロジェクトの設定・コードを v2 形式へ書き換える。必ずバージョン管理下で実行し、差分を確認する。

## 環境情報の表示

```sh
npm run tauri info
```

```sh
cargo tauri info
```

OS・Rust・Node.js とそのバージョン、関連するプロジェクト設定を簡潔に表示する。オプション: `--interactive`（自動修正を適用する対話モード）。

## v1 / v2 beta からの移行

```sh
npm run tauri migrate
```

```sh
pnpm tauri migrate
```

```sh
cargo tauri migrate
```

Tauri v1 から v2 への移行、および v2 beta から v2 安定版への移行ページで案内されているコマンド。

## シェル補完の生成

```sh
cargo tauri completions --shell zsh
cargo tauri completions --shell bash --output <OUTPUT>
```

`-s, --shell` は `bash` / `elvish` / `fish` / `powershell` / `zsh`。`-o, --output` を省略すると標準出力に出る。

## MSI の Upgrade Code の確認

```sh
cargo tauri inspect wix-upgrade-code
```

`productName` から導出される MSI インストーラーの既定 Upgrade Code を表示する。

## npm パッケージの更新

```sh
npm install @tauri-apps/cli@latest @tauri-apps/api@latest
```

```sh
yarn up @tauri-apps/cli @tauri-apps/api
```

```sh
pnpm update @tauri-apps/cli @tauri-apps/api --latest
```

## 最新バージョンの確認

```sh
npm outdated @tauri-apps/cli
```

```sh
yarn outdated @tauri-apps/cli
```

```sh
pnpm outdated @tauri-apps/cli
```

## Cargo パッケージの更新

`src-tauri/Cargo.toml` の `tauri` と `tauri-build` のバージョンを書き換えた後に実行する。

```sh
cd src-tauri
cargo update
```

公式は `cargo outdated` や cargo-edit の `cargo upgrade` でも更新できるとしている（コマンド詳細は各ツールの README）。

## バージョン同期の注意

- npm の `@tauri-apps/api` と cargo の `tauri` は同じ minor に揃える。
- プラグインは patch リリースでも変更が入りうるため、`@tauri-apps/plugin-fs` と `tauri-plugin-fs` のように npm パッケージと crate の完全なバージョン（例: `2.2.1`）を揃える。

## CLI の導入

```sh
npm install --save-dev @tauri-apps/cli@latest
```

```sh
pnpm add -D @tauri-apps/cli@latest
```

```sh
deno add -D npm:@tauri-apps/cli@latest
```

```sh
cargo install tauri-cli --version "^2.0.0" --locked
```

## 注記

- 呼び出し形は導入方法で異なる（`dev-build.md` の表を参照）。
- 出典の `--help` 出力の `Usage: pnpm-native run build ...` は公式 docs の生成環境由来で、実際は `tauri ...`。
