---
source: https://v2.tauri.app/start/create-project/
---

# Create Project

新規 Tauri プロジェクトの作成（create-tauri-app）と、既存フロントエンドへの導入（`tauri init`）のコマンド集。

## create-tauri-app による雛形作成

公式は「作業したいフォルダーで次のいずれかを実行する」としている。本ファイルはパッケージマネージャー版を主ルートとして収録する。

> **警告**: 公式の Bash / PowerShell / Fish 版ワンライナーはリモートのスクリプトをそのままシェルへ渡す型のため収録しない。パッケージマネージャー版（npm / yarn / pnpm / deno / bun / cargo）を使う。
>
> Notes: The source also lists shell one-liners (Bash, PowerShell, Fish) that pipe the remote script into the shell; they are omitted here (same as references/getting-started/create-project.md).

npm:

```sh
npm create tauri-app@latest
```

yarn:

```sh
yarn create tauri-app
```

pnpm:

```sh
pnpm create tauri-app
```

deno:

```sh
deno run -A npm:create-tauri-app
```

bun:

```sh
bun create tauri-app
```

cargo:

```sh
cargo install create-tauri-app --locked
cargo create-tauri-app
```

プロンプトで project name / identifier / frontend language（Rust・TypeScript / JavaScript・.NET）/ package manager（pnpm・yarn・npm・bun）/ UI template / UI flavor を選ぶ。

## 開発サーバーの起動（create-tauri-app 後）

```sh
cd tauri-app
npm install
npm run tauri dev
```

```sh
cd tauri-app
pnpm install
pnpm tauri dev
```

cargo 版（Tauri CLI を cargo で導入）。

```sh
cd tauri-app
cargo install tauri-cli --version "^2.0.0" --locked
cargo tauri dev
```

## 既存フロントエンドへの Tauri CLI 導入

```sh
npm install -D @tauri-apps/cli@latest
```

```sh
pnpm add -D @tauri-apps/cli@latest
```

```sh
cargo install tauri-cli --version "^2.0.0" --locked
```

cargo で導入する場合はグローバルインストールになる。

## Tauri プロジェクトの初期化（tauri init）

```sh
npx tauri init
```

```sh
pnpm tauri init
```

```sh
cargo tauri init
```

実行すると app name / window title / web assets の場所 / dev server の URL / frontend dev command / frontend build command を尋ねられ、`src-tauri` ディレクトリが作られる。`tauri init` の全オプションは references の `cli/init.md` を参照する。

## 動作確認

```sh
npx tauri dev
```

```sh
cargo tauri dev
```

初回は Rust のコンパイルに時間がかかる。

## 参考: Vite プロジェクトの作成（公式例）

公式は手動セットアップの例として Vite アプリを作る手順を示している。フロントエンドは任意のものでよい。

```sh
mkdir tauri-app
cd tauri-app
npm create vite@latest .
```
