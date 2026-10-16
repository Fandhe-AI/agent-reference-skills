# Agent Skills (supabase / supabase-postgres-best-practices)

Supabase 公式の Agent Skills（`supabase/agent-skills` リポジトリ）。インストール・更新方法と提供スキル 2 種。

## Signature / Usage

```bash
npx skills add supabase/agent-skills
```

特定スキルのみ:

```bash
npx skills add supabase/agent-skills --skill SKILL_NAME
```

更新:

```bash
npx skills update
```

特定スキルの更新は `npx skills update SKILL_NAME`。コミュニティスキル検索は `npx skills find QUERY`。

## Options / Props

| Option | Description |
|--------|-------------|
| `--skill SKILL_NAME` | リポジトリから特定スキルのみインストール |
| `--global` | 全プロジェクト共通でインストール（既定はプロジェクトスコープ） |
| `--all` | 検出された全エージェントにスキルを追加 |

## Available skills

| Skill | 用途 |
|-------|------|
| `supabase` | Supabase に関わるあらゆるタスク。製品（Database / Auth / Edge Functions / Realtime / Storage / Vectors / Cron / Queues）、クライアントライブラリと SSR 連携（supabase-js, @supabase/ssr）、認証問題、CLI / MCP、スキーマ変更・マイグレーション・宣言的スキーマ・セキュリティ監査、Postgres 拡張、エラーのデバッグ、ログ参照 |
| `supabase-postgres-best-practices` | どこで動く Postgres にも使える Postgres ベストプラクティス。テーブル／カラム設計、マイグレーション、RLS ポリシーとそのテスト、インデックス、トリガー、DB 関数、キュー・スケジュールジョブ、pgvector、遅いクエリ・接続枯渇・ロック・bloat の診断。性能だけでなくスキーマ・セキュリティ・SQL 記述にも適用する |

```bash
npx skills add supabase/agent-skills --skill supabase
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices
```

## Notes

- スキルはプロジェクトスコープで既定インストールされ、リポジトリに置かれるためコントリビューターやクラウドエージェントも同じ構成を共有する
- スキルは頻繁に更新されるため定期的に `npx skills update` を実行する
- MCP サーバーとの同時導入は Supabase Plugin が 1 ステップで行う
- 出典: https://supabase.com/docs/guides/ai-tools/ai-skills （取得日 2026-10-17、版の pin なし）。リポジトリ: github.com/supabase/agent-skills

## Related

- [Supabase Plugin](./plugins.md)
- [Supabase MCP Server](./mcp.md)
- [AI Tools 概要](./overview.md)
