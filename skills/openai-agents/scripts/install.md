# Install

OpenAI Agents SDK (Python / TypeScript) のプロジェクト初期化とパッケージインストール。

## Python プロジェクトの初期化

```sh
mkdir my_project
cd my_project
python -m venv .venv
```

## Python 仮想環境の有効化 (macOS / Linux)

```sh
source .venv/bin/activate
```

## Python 仮想環境の有効化 (Windows)

```sh
.venv\Scripts\activate
```

## Python SDK のインストール

```sh
pip install openai-agents
```

## Python SDK のインストール (voice 拡張込み)

```sh
pip install 'openai-agents[voice]'
```

音声エージェント (`agents.voice`) を使う場合に必要な追加依存を含める。

## TypeScript プロジェクトの初期化

```sh
mkdir my_project
cd my_project
npm init -y
```

## TypeScript SDK のインストール

```sh
npm install @openai/agents zod
```

SDK は Zod v4 を要求する。`npm install` で zod をインストールすると最新の v4 系が入る。
