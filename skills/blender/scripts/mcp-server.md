# MCP Server

Blender MCP Server のインストール・起動・設定・テストに使うコマンド集。

## Installation — MCP サーバー（pip）

```sh
pip install git+https://projects.blender.org/lab/blender_mcp.git#subdirectory=mcp
```

Python 3.10 以上が必要。依存パッケージ: `docutils`, `mcp[cli]>=1.2.0`, `pyyaml`。

## Installation — Blender add-on（Extensions リポジトリ）

1. Blender の Preferences → Extensions → Repositories から以下の URL を追加する。

```
https://lab.blender.org/
```

2. Extensions リストから MCP add-on を検索してインストール・有効化する。

add-on が有効になっていないと MCP サーバーから Blender へ接続できない。

## Running — MCP サーバー起動（uv）

```sh
uv run blender-mcp
```

stdio 経由で起動する。MCP クライアントからサブプロセスとして起動する場合の標準的な方法。

## MCP クライアント設定例（JSON）

```json
{
  "mcpServers": {
    "blender": {
      "command": "uv",
      "args": ["run", "blender-mcp"]
    }
  }
}
```

`manifest.json` 記載の `mcp_config` をそのまま MCP クライアントの設定ファイルに貼り付けて使用する。

## Connection — 環境変数

| 変数 | デフォルト | 説明 |
| --- | --- | --- |
| `BLENDER_MCP_HOST` | `localhost` | MCP add-on が待ち受けるホスト |
| `BLENDER_MCP_PORT` | `9876` | MCP add-on が待ち受けるポート |
| `BLENDER_PATH` | `blender` | MCP サーバーが使用する Blender バイナリのパス |
| `BLENDER_BIN` | `blender` | テスト用 Blender バイナリのパス |
| `BLENDER_MCP` | `blender-mcp` | テスト用 blender-mcp コマンドのパス |
| `BLENDER_MCP_TIMEOUT` | `10` | テスト用スタートアップタイムアウト（秒） |
| `GLOBAL_TIMEOUT_SCALE` | `1` | テストのタイムアウト倍率（低速環境向け） |

```sh
# ホスト・ポートを変更して起動する例
BLENDER_MCP_HOST=127.0.0.1 BLENDER_MCP_PORT=9999 uv run blender-mcp
```

## Chat client — openai（llama.cpp 等）

```sh
python chat_client/chat_client.py openai --api-url http://localhost:8080
```

OpenAI 互換 API（llama.cpp など）に接続する場合。デフォルト API URL は `http://localhost:8080`。

## Chat client — claude（Anthropic）

```sh
ANTHROPIC_API_KEY=sk-... python chat_client/chat_client.py claude --model claude-sonnet-4-20250514
```

`ANTHROPIC_API_KEY` 環境変数が必要。

## Tests — ユニットテスト

```sh
make test
```

全ユニットテスト（tool listing / RST parse / RST search / MCP server / Blender with Blender）を実行する。

```sh
make test_rst_parse
```

RST マニュアル・API ドキュメントのパースのみテストする。

```sh
make test_rst_search
```

RST テキスト検索レイヤーのみテストする。

## Tests — インテグレーションテスト

```sh
BLENDER_BIN=/path/to/blender make test_integration
```

> **警告**: 実行中の Blender インスタンスへ接続し、Python コードを実行する。本番データを含む .blend ファイルを開いた状態では実行しないこと。

```sh
# テスト一覧の表示
make test_integration TESTS_LIST=1

# 特定テストの実行
make test_integration TESTS=TestChatClient.test_name

# 複数テストの実行
make test_integration TESTS="test_one test_two"
```

`ANTHROPIC_API_KEY` を `.env` ファイルに書くと自動的に読み込まれる。

## Checks — コード品質

```sh
make check_all
```

ruff / mypy / vulture / license / ascii / namespace の全チェックをまとめて実行する。

```sh
make format
```

autopep8 でソースコードを自動整形する。

個別チェックの実行:

```sh
make check_ruff      # ruff linting
make check_mypy      # mypy 型チェック
make check_vulture   # vulture デッドコード検出
make check_license   # SPDX ヘッダー検証
make check_ascii     # 非 ASCII 文字の検出
make check_namespace # __all__ の定義確認
```

## Reference data — ドキュメントデータ更新

```sh
make update_reference_manual MANUAL_DIR=/path/to/blender/manual
```

```sh
make update_reference_api API_DIR=/path/to/api
```

```sh
make readme_update
```

ツール一覧から README を再生成する。
