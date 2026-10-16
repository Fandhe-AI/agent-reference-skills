# Install

Turborepo のインストールと新規プロジェクト作成コマンド。

## 新規プロジェクト作成（create-turbo）

```sh
# npm
npx create-turbo@latest

# pnpm
pnpm dlx create-turbo@latest

# yarn
yarn dlx create-turbo@latest

# bun
bunx create-turbo@latest

# nub
nubx create-turbo@latest

# aube
aubx create-turbo@latest
```

スターターには2つのアプリケーションと3つの共有パッケージが含まれる。

## create-turbo のオプション

```sh
npx create-turbo@latest [options]
```

| フラグ | 説明 |
|---|---|
| `-m, --package-manager` | パッケージマネージャーを指定（npm / yarn / pnpm / bun / nub / aube） |
| `-e, --example` | テンプレート名または GitHub URL |
| `--skip-install` | 依存関係のインストールをスキップ |
| `--turbo-version` | インストールする turbo バージョンを指定 |

## グローバルインストール（スタンドアロンインストーラー）

公式は取得と同時にシェルへ流し込むワンライナーで案内している。ここではダウンロード、内容確認、実行の3段階に分けて記載する。

```sh
# macOS / Linux: ダウンロード
curl -fsSL https://turborepo.dev/install -o turbo-install.sh

# 内容を確認
less turbo-install.sh

# 実行
sh ./turbo-install.sh
```

```powershell
# Windows x64（PowerShell）: ダウンロード
Invoke-RestMethod https://turborepo.dev/install.ps1 -OutFile turbo-install.ps1

# 内容を確認
Get-Content ./turbo-install.ps1

# 実行
./turbo-install.ps1
```

> **警告**: インストーラーはリモートのスクリプトであり、実行前に必ず内容を確認すること。

バイナリは GitHub release assets（2.11.5 以降）からも取得できる。古いバージョンはパッケージマネージャーで導入する。

## バージョンを固定したインストール（TURBO_VERSION）

依存インストール前の CI ステップなど、リポジトリの `turbo` 依存と合わせたい場合に `TURBO_VERSION` を指定する。ダウンロードと内容確認は上記と同じ手順。

```sh
# macOS / Linux
TURBO_VERSION=2.11.5 sh ./turbo-install.sh
```

```powershell
# Windows x64（PowerShell）
$env:TURBO_VERSION = '2.11.5'
./turbo-install.ps1
```

## パッケージマネージャー経由のグローバルインストール

```sh
# npm
npm install turbo --global

# pnpm
pnpm add turbo --global

# yarn
yarn global add turbo

# bun
bun install turbo --global
```

グローバルの `turbo` はリポジトリにローカルバージョンが存在する場合、自動的にそちらに委譲する。

## devDependency としてのインストール

```sh
# npm
npm install turbo --save-dev

# pnpm
pnpm add turbo --save-dev --ignore-workspace-root-check

# yarn
yarn add turbo --dev --ignore-workspace-root-check

# bun
bun install turbo --dev

# nub
nub add turbo --save-dev

# aube
aube add turbo --save-dev
```

チーム全体でバージョンを統一するため、ワークスペースルートの devDependency に追加する。

## 既存リポジトリへの追加（pnpm の例）

```sh
curl -fsSL https://turborepo.dev/install -o turbo-install.sh
less turbo-install.sh
sh ./turbo-install.sh
pnpm add turbo --save-dev --workspace-root
```

`pnpm-workspace.yaml` を先に作成しておく必要がある。Step 2 以降は `turbo.json` 作成、`.gitignore` への `.turbo` 追加、ルート `package.json` へのパッケージマネージャー宣言（`devEngines.packageManager` を推奨。従来のトップレベル `packageManager` も引き続きサポート）が必要。

## パッケージマネージャーの宣言（devEngines.packageManager）

```json
{
  "devEngines": {
    "packageManager": {
      "name": "pnpm",
      "version": "12.0.0"
    }
  }
}
```

ルート `package.json` に記述する。将来のメジャーバージョンでトップレベル `packageManager` のサポートは終了予定。nub / aube は `name` に `nub` / `aube` を指定する（サポート対象は nub 0.8+ / aube 2.2+）。

## @turbo/gen のインストール（カスタムジェネレーター使用時）

```sh
# npm
npm install @turbo/gen --save-dev

# pnpm
pnpm add @turbo/gen --save-dev

# yarn
yarn add @turbo/gen --dev
```

TypeScript でカスタムジェネレーターを作成する場合に必要。
