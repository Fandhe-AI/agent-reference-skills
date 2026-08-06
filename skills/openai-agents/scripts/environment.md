# Environment

OpenAI Agents SDK の実行に関わる環境変数の設定コマンド。

## API キーの設定 (macOS / Linux)

```sh
export OPENAI_API_KEY=$OPENAI_API_KEY
```

`$OPENAI_API_KEY` は実際のキー値（`sk-...` 形式）に置き換える。

## API キーの設定 (Windows PowerShell)

```powershell
$env:OPENAI_API_KEY = "$OPENAI_API_KEY"
```

## API キーの設定 (Windows コマンドプロンプト)

```cmd
set "OPENAI_API_KEY=%OPENAI_API_KEY%"
```

## OpenAI 互換エンドポイントの指定

```sh
export OPENAI_BASE_URL="https://your-openai-compatible-endpoint.example/v1"
export OPENAI_WEBSOCKET_BASE_URL="wss://your-openai-compatible-endpoint.example/v1"
```

デフォルトの OpenAI API エンドポイント以外（互換プロキシ等）を使う場合に設定する。

## 組織・プロジェクト ID の指定

```sh
export OPENAI_ORG_ID="org_..."
export OPENAI_PROJECT_ID="proj_..."
```

## トレースに含めるデータの制御

```sh
export OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA=0
export OPENAI_AGENTS_DONT_LOG_MODEL_DATA=0
export OPENAI_AGENTS_DONT_LOG_TOOL_DATA=0
```

`0` を設定すると、モデル入出力やツール呼び出しの詳細データをトレース・ログに含めなくなる。
