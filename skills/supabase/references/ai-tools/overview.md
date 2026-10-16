# AI Tools 概要

AI コーディングエージェントを Supabase に接続する手段の全体像。MCP / Agent Skills / Plugin / Prompts の 4 要素と、並列エージェント向けローカルプロジェクト。

## 概要

Supabase は AI コーディングエージェント接続のために、プロジェクトへのライブ接続（MCP）、再利用可能な手順書（Agent Skills）、両者を 1 回でインストールする Plugin、上記いずれも使えないツール向けのコピー用 Prompts を提供する。

### Key concepts

| 要素 | 内容 |
|------|------|
| MCP (Model Context Protocol) | エージェントと実プロジェクトのライブ接続。データ照会・マイグレーション実行・Edge Functions デプロイ等をツール呼び出しで行う |
| Agent Skills | Supabase / Postgres 固有の手続き知識をエージェントがオンデマンドで読み込む。ライブ接続不要、複数エージェント間で可搬 |
| Plugin | MCP サーバーと Agent Skills を特定エージェント向けにまとめた 1 回のインストール |
| Prompts | MCP / Plugin / Skills をネイティブに扱えないエージェント向けに、プロジェクトへコピーする静的プロンプトファイル |

### エージェント別の案内先（公式ナビゲーション）

- Plugin ページ案内: Antigravity / Claude Code / Codex / Cursor / Gemini CLI / GitHub Copilot / Grok / Kimi Code / omp / VS Code
- MCP ページ案内: Devin Desktop / Factory / fx / Goose / Kiro / OpenCode / Warp

### 並列エージェント向けローカルプロジェクト

別々の git worktree / ブランチで動くエージェントは、それぞれ専用 DB が必要（そうしないと 1 つのタスクのマイグレーション・seed が他に影響する）。実験的な `supabase stack` コマンドを有効にすると、`supabase start` が worktree / ブランチごとに専用ポート・専用データのローカルプロジェクトを起動する。

```bash
supabase start
```

## Notes

- 有効化の設定キーは MCP ページで `[experimental] stack` と表記される。overview 本文には設定スニペットが無いため、具体的な書式は Running multiple local projects ページを参照すること（本スキルでは未収録）
- 同じチェックアウト・ブランチを共有するエージェントは 1 つのローカルプロジェクトを共有する。エージェントごとに worktree を分ける
- 同コマンドは Linux および Apple silicon の macOS で Docker 無しでも動作する（コンテナエンジンの無いエージェントサンドボックス向け）
- 公式は Supabase Evals（AI コーディングエージェントの実タスク性能を測るオープンソースベンチマーク）を案内している
- アプリに AI 機能を組み込む場合は別の導線: 自前の MCP サーバーのホスト（byo-mcp）と、Vectors / Embeddings（pgvector）による semantic search / RAG
- 出典: https://supabase.com/docs/guides/ai-tools （取得日 2026-10-17、版の pin なし）

## Related

- [Supabase MCP Server](./mcp.md)
- [Supabase Plugin](./plugins.md)
- [Agent Skills](./agent-skills.md)
- [Deploy MCP servers](./byo-mcp.md)
- [RAG パイプライン](../ai/rag.md)
