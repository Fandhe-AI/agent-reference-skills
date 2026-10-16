# Supabase Plugin for AI Coding Agents

Supabase MCP サーバーと Agent Skills を 1 回のインストールで AI コーディングエージェントに導入するプラグイン。

## Signature / Usage

```bash
npx plugins add supabase-community/supabase-plugin
```

`plugins` パッケージがインストール済みの AI コーディングエージェントを自動検出し、すべてに一括インストールする。確認プロンプトのスキップは `--yes`。グローバル（全プロジェクト共通）またはプロジェクト単位でインストールできる。

## What's included

| 内容 | 説明 |
|------|------|
| Supabase MCP server | 認証後、エージェントがデータベース照会・マイグレーション管理・Edge Functions デプロイ等を実行 |
| `supabase` skill | Supabase 製品（Database / Auth / Edge Functions / Storage / Realtime）の中核ガイダンス |
| `supabase-postgres-best-practices` skill | Postgres のクエリ最適化・スキーマ設計・接続管理・RLS パターン |

## Notes

- プラグインは MCP servers / Skills / Hooks / Agents / Slash commands の任意の組み合わせを束ねられる汎用パッケージ形式
- MCP と Skills は個別にインストールすることもできる
- エージェント別の手動インストール手順は、公式ページ内のエージェント選択 UI で表示される（原本は UI 部分が空のため本スキルには未収録）
- 出典: https://supabase.com/docs/guides/ai-tools/plugins （取得日 2026-10-17、版の pin なし）

## Related

- [Supabase MCP Server](./mcp.md)
- [Agent Skills](./agent-skills.md)
- [AI Tools 概要](./overview.md)
