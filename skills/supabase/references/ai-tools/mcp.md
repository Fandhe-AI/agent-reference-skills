# Supabase MCP Server

AI ツールを MCP 経由で Supabase プロジェクトに接続するホスト型リモート MCP サーバー（`https://mcp.supabase.com/mcp`）。ツールグループ、elicitation、URL パラメータ設定、手動認証、セキュリティ。

## Signature / Usage

ホスト型: `https://mcp.supabase.com/mcp`。Supabase CLI でのローカル開発では `http://localhost:54321/mcp`。

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"
```

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

認証（Claude Code）: 通常のターミナルで `claude /mcp` を実行し、"supabase" → "Authenticate"。ブラウザで Supabase にログインして組織へのアクセスを許可する（PAT は不要）。

### クライアント別の設定

| Client | 追加方法 |
|--------|---------|
| Claude Code | `claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"` または `.mcp.json` |
| Codex | `codex mcp add supabase --url "https://mcp.supabase.com/mcp"` / `~/.codex/config.toml` の `[mcp_servers.supabase]`、認証は `codex mcp login supabase` |
| Grok | `grok mcp add supabase "https://mcp.supabase.com/mcp" --transport http` / `~/.grok/config.toml`、確認は `grok mcp doctor supabase` |
| Gemini CLI（0.20.2 以上） | `gemini extensions install https://github.com/supabase-community/gemini-extension` または `gemini mcp add -t http supabase "https://mcp.supabase.com/mcp"`、認証は `/mcp auth supabase`。`.gemini/settings.json` では `httpUrl` キー |
| GitHub Copilot | `copilot mcp add --transport http supabase "https://mcp.supabase.com/mcp"` / `~/.copilot/mcp-config.json`、認証は `copilot -i /mcp` |
| OpenCode | `~/.config/opencode/opencode.json`（`"type": "remote"`）、認証は `opencode mcp auth supabase` |
| Factory | `droid mcp add supabase "https://mcp.supabase.com/mcp" --type http` / `~/.factory/mcp.json` |
| fx | `~/.fx/mcp.json`（`mcp` キー配下）、認証は `/mcp auth supabase --open`、確認は `/mcp list` |
| omp | `/mcp add` または `.omp/mcp.json`（全プロジェクト共通は `~/.omp/agent/mcp.json`） |
| Claude.ai / ChatGPT | コネクターとして各ディレクトリからインストール |
| Goose | `goose session --with-streamable-http-extension "https://mcp.supabase.com/mcp"` または `~/.config/goose/config.yaml` |
| Cursor | `.cursor/mcp.json`（全体共通は `~/.cursor/mcp.json`）。CLI は `agent mcp enable supabase` / `agent mcp login supabase` / `agent mcp list` |
| VS Code | `.vscode/mcp.json`（トップレベルキーは `servers`、`"type": "http"`） |
| Antigravity | `~/.gemini/antigravity/mcp_config.json`（キーは `serverUrl`）、設定後に再起動して OAuth |
| Kiro | `~/.kiro/settings/mcp.json`（`url`）。Supabase power のインストールも案内あり |
| Devin Desktop | `devin mcp add -s user supabase "https://mcp.supabase.com/mcp"` / `~/.config/devin/mcp_config.json`（Windows は `%APPDATA%\devin\mcp_config.json`）、認証は `devin mcp login supabase` |
| Kimi Code | `.kimi-code/mcp.json`（`"transport": "http"`）、`/mcp` / `/mcp-config` |
| Warp | `~/.warp/.mcp.json` |

## Options / Props

URL クエリパラメータ（組み合わせ可: `https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true`）。

| Parameter | Description | Example |
|-----------|-------------|---------|
| `read_only=true` | 全クエリを読み取り専用 Postgres ユーザーで実行 | `?read_only=true` |
| `project_ref=<id>` | 特定プロジェクトにスコープ（アカウントツールは無効化） | `?project_ref=abc123` |
| `features=<groups>` | 指定ツールグループのみ有効化（カンマ区切り） | `?features=database,docs` |
| `skip_elicitations=<tools>` | 指定ツールのフォーム確認をスキップ | `?skip_elicitations=execute_sql,apply_migration` |

## Available tools

Storage を除く全グループが既定で有効。

| Group | Tools |
|-------|-------|
| Database | `list_tables`, `list_extensions`, `list_migrations`, `apply_migration`, `execute_sql` |
| Debugging | `query_logs`（プロジェクトログへの読み取り専用 SQL）, `get_advisors` |
| Development | `get_project_url`, `get_publishable_keys`, `generate_typescript_types` |
| Edge Functions | `list_edge_functions`, `get_edge_function`, `deploy_edge_function`, `create_edge_function_secret`（提供される場合のみ） |
| Account management（project_ref スコープ時は無効） | `list_projects`, `get_project`, `create_project`, `pause_project`, `restore_project`, `list_organizations`, `get_organization`, `get_cost`, `confirm_cost` |
| Docs | `search_docs` |
| Branching (experimental, 有料プラン) | `create_branch`, `list_branches`, `delete_branch`, `merge_branch`, `reset_branch`, `rebase_branch` |
| Storage（既定で無効） | `list_storage_buckets`, `get_storage_config`, `update_storage_config` |

## Elicitations

MCP サーバーがツール呼び出しを一時停止してユーザーに入力・確認を求める仕組み。サーバー側の提供とクライアント側の対応モードの両方が必要。

| Mode | Supabase での用途 |
|------|------------------|
| Form | コスト確認、破壊的 SQL 確認 |
| URL | Dashboard での Edge Function シークレット入力 |

- コスト確認: `create_project` / `create_branch` で、期待コストを表示し承認時のみ実行。フォーム確認が使えない・スキップされた場合は legacy ワークフロー（`get_cost` → `confirm_cost` → `confirm_cost_id` を `create_project` / `create_branch` に渡す）
- 破壊的 SQL 確認: `execute_sql`（read-only モード外のみ）と `apply_migration`
- Edge Function シークレット: `create_edge_function_secret` は、サーバーが提供・クライアントが URL elicitation 対応・Edge Functions ツール有効・read-only でない場合のみ利用可。値は Dashboard にのみ入力し、チャット・ツール引数には含めない

### skip_elicitations

```text
https://mcp.supabase.com/mcp?skip_elicitations=create_project,create_branch
https://mcp.supabase.com/mcp?skip_elicitations=execute_sql,apply_migration
```

- 値は `create_project` / `create_branch` / `execute_sql` / `apply_migration` のカンマ区切り。大文字小文字区別、不正な名前は拒否
- boolean や `all` は無く、`create_edge_function_secret` は非対応
- スキップしても認証・権限・read-only 制限・課金は回避されない

## Manual authentication

既定ではホスト型サーバーは dynamic client registration で認証する（PAT / OAuth アプリ不要）。CI や OAuth クライアント ID/シークレットが必要なクライアント（例: Azure API Center）では手動認証。

### CI（scoped PAT を Authorization ヘッダーで渡す）

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}",
      "headers": {
        "Authorization": "Bearer ${SUPABASE_ACCESS_TOKEN}"
      }
    }
  }
}
```

### Manual OAuth app

組織の OAuth apps でアプリを追加し、クライアントが指定する website URL と callback URL を設定する。全スコープに write を付与（現状は全スコープが必要）。作成後の client ID / secret を MCP クライアントに設定する。

## Notes

- 本番プロジェクトに接続する前に project スコープ・read-only・feature グループ制限を使う
- Prompt injection: SQL 結果に命令が混入し得る。Supabase MCP は結果に追加指示を付与して抑止するが完全ではないため、ツール呼び出しは手動承認を維持して確認する。無人の監視ルーチンは事前に project スコープの read-only ツールのみ承認し、書き込みは推奨を報告して止める
- 顧客・エンドユーザーには渡さない（開発者権限で動作する開発者向けツール）
- Elicitation は guardrail であり人間の承認の保証ではない（クライアントのフック・ルールが自動応答する場合がある）。クライアント自身のツール承認の代替でもない
- `create_branch` のフォーム確認は、許容枠・免除の適用前の標準料金を確認する
- ローカルで `[experimental] stack` を有効にした場合は割り当てポートが使われるため、MCP URL は `supabase status` の出力で確認する
- ユーザーのアプリ側で公開する MCP サーバー（自前ホスト）は別物。byo-mcp ページを参照
- リポジトリ: github.com/supabase/mcp
- 出典: https://supabase.com/docs/guides/ai-tools/mcp （取得日 2026-10-17、版の pin なし）

## Related

- [AI Tools 概要](./overview.md)
- [Supabase Plugin](./plugins.md)
- [Deploy MCP servers](./byo-mcp.md)
