# AI プロンプト・MCP 連携

AI ツールと Supabase の連携方法。

## Signature / Usage

Supabase は AI コーディングツール（Cursor, Claude Code, Codex, GitHub Copilot 等）との連携をサポートする。プロンプト集（AI Prompts）とホスト型の MCP（Model Context Protocol）サーバーを提供する。

## AI プロンプト

公式の AI Prompts は、Cursor や GitHub Copilot など AI IDE ツールで Supabase を扱うためのプロンプトを集めたもの。使い方: プロンプトをリポジトリ内のファイルへコピーし、AI ツールの "include file" 機能でチャットに含める。

| Environment | Where to put prompt |
| --- | --- |
| Cursor | Project rules (`.cursor/rules/*.md` or `.mdx`) |
| GitHub Copilot | `.github/copilot-instructions.md` |
| JetBrains IDEs | `guidelines.md` |
| Gemini CLI | `GEMINI.md` |
| VS Code | `.instructions.md` |
| Devin Desktop | `guidelines.md` |

## Supabase MCP サーバー

公式ドキュメントは、ホスト型のリモートサーバー `https://mcp.supabase.com/mcp` のみを案内している。Supabase CLI でローカル開発している場合は `http://localhost:54321/mcp` を使う（実験的な `[experimental] stack` 設定を有効にしている場合はポートが割り当て制になるため、`supabase status` の出力の MCP URL を読む）。

### 設定

URL のクエリパラメータでスコープを絞る。

```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=<id>&read_only=true"
    }
  }
}
```

Claude Code の場合のコマンド例:

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp"
```

認証はブラウザでの OAuth（dynamic client registration）。Personal Access Token は不要。CI など OAuth が使えない環境では、スコープを絞った PAT を `Authorization: Bearer ...` ヘッダーで渡す。

### URL クエリパラメータ

| Parameter | Description |
| --- | --- |
| `read_only=true` | Execute all queries as a read-only Postgres user |
| `project_ref=<id>` | Scope to a specific project (disables account tools) |
| `features=<groups>` | Enable only specific tool groups (comma-separated) |
| `skip_elicitations=<tools>` | Skip form confirmations for the named tools（`create_project` / `create_branch` / `execute_sql` / `apply_migration`。ホスト接続のみ） |

パラメータは組み合わせ可能: `https://mcp.supabase.com/mcp?project_ref=abc123&read_only=true`

### 利用可能なツールグループ

Storage 以外は既定で有効。

| グループ | 主なツール |
| --- | --- |
| Database | `list_tables` / `list_extensions` / `list_migrations` / `apply_migration` / `execute_sql` |
| Debugging | `query_logs` / `get_advisors` |
| Development | `get_project_url` / `get_publishable_keys` / `generate_typescript_types` |
| Edge Functions | `list_edge_functions` / `get_edge_function` / `deploy_edge_function` / `create_edge_function_secret`（提供時のみ） |
| Account management | `list_projects` / `get_project` / `create_project` / `pause_project` / `restore_project` / `list_organizations` / `get_organization` / `get_cost` / `confirm_cost`（`project_ref` 指定時は無効） |
| Docs | `search_docs` |
| Branching (experimental) | `create_branch` / `list_branches` / `delete_branch` / `merge_branch` / `reset_branch` / `rebase_branch`（有料プラン） |
| Storage（既定で無効） | `list_storage_buckets` / `get_storage_config` / `update_storage_config` |

## セキュリティ注意事項

- 原則として開発プロジェクトまたは開発用ブランチに接続する。本番プロジェクトへの接続は、タスクに本番の証拠が必要な場合に限る。その場合は project scoping・read-only モード・feature groups の制限・最小限のクエリを併用し、プロンプトやレポートにシークレットや無関係な個人データを含めない
- prompt injection のリスクがある。MCP クライアントのツール呼び出しの手動承認を有効にしておく
- MCP サーバーは開発者権限で動作するため、顧客・エンドユーザーに渡さない
- Branching で開発用ブランチを作り、本番へマージする前に検証する
- Elicitation（form / URL による確認）はガードレールであり、人間の承認を保証するものではない
- Edge Function のシークレット値はチャットやツール引数に入れず、Dashboard でのみ入力する
- service_role / secret キーは AI ツールに渡さない

## Notes

- 公式 URL は `/docs/guides/getting-started/ai-prompts` から `/docs/guides/ai-tools/ai-prompts` に移動した（旧 URL はリダイレクトされる）。MCP・plugins・Agent Skills・BYO MCP の詳細は新しい ai-tools カテゴリに置かれている
- 旧版のこのページにあった stdio 構成（`npx -y @supabase/mcp-server` + `SUPABASE_ACCESS_TOKEN` 環境変数、`--read-only` / `--project-ref` 引数）は、現行の公式ドキュメントには記載がないため削除した。現行はホスト型 URL とクエリパラメータのみ
- 旧版の汎用プロンプトテンプレート例は公式の AI Prompts ページには含まれないため削除した

## Related

- [./architecture.md](./architecture.md) — アーキテクチャ概要
- [./quickstarts.md](./quickstarts.md) — クイックスタート
