---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server
---

# Install SDKs

公式チュートリアルに記載された SDK・開発環境のセットアップコマンド（Python / TypeScript）。

## uv のインストール（Python 用）

> **警告**: リモートのスクリプトを取得して実行する。実行前に内容を確認し、使い捨て環境または信頼できる環境で実行する。

Adapted (not in the official docs): 公式は 1 行パイプ。内容確認のためダウンロードと実行を分割。

```bash
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
# install.sh の内容を確認してから実行する
sh install.sh
```

```powershell
irm https://astral.sh/uv/install.ps1 -OutFile install.ps1
# install.ps1 の内容を確認してから実行する
powershell -ExecutionPolicy ByPass -File install.ps1
```

インストール後は `uv` コマンドを認識させるため、ターミナルを再起動する。

## Python サーバープロジェクトの作成

```bash
# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]"

# Create our server file
touch weather.py
```

## Node.js の確認（TypeScript 用）

```bash
node --version
npm --version
```

Node.js 20 以上が必要（原文）。

## TypeScript サーバープロジェクトの作成

```bash
# Create a new directory for our project
mkdir weather
cd weather

# Initialize a new npm project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/server zod
npm install -D @types/node typescript

# Create our files
mkdir src
touch src/index.ts
```

`package.json` に `"type": "module"` とビルドスクリプト、`tsconfig.json` の作成が続く。詳細は出典を参照。
