# Getting started

Claude Code CLI 本体のリファレンス。Skills / MCP / subagents / hooks / plugins の拡張機能は anthropic-claude-code-extend、Agent SDK は anthropic-agent-sdk を参照。

| Name | Description | Path |
|------|-------------|------|
| Best practices | Claude Code を最大限に活用するためのパターン: 検証、計画、プロンプティング、環境設定、セッション管理 | [best-practices.md](./best-practices.md) |
| Common workflows | コードベース調査、バグ修正、リファクタリング、テスト、PR、ドキュメント作成、画像、ファイル参照、スケジューリングの短いプロンプトレシピ | [common-workflows.md](./common-workflows.md) |
| Explore the context window | コンテキストウィンドウがセッション中どう満杯になるか、ファイル読取コスト、ルール・フック発火をシミュレート | [context-window.md](./context-window.md) |
| Feature availability | Claude Code の機能を Anthropic サブスクリプション、Console API、Amazon Bedrock など複数プロバイダで比較 | [feature-availability.md](./feature-availability.md) |
| Extend Claude Code | CLAUDE.md、Skills、subagents、hooks、MCP、agent teams、code intelligence、plugins の使い分けを理解 | [features-overview.md](./features-overview.md) |
| Glossary | Claude Code 用語の定義: agentic loop、compaction、CLAUDE.md、hooks、subagents、MCP など | [glossary.md](./glossary.md) |
| Keep Claude working toward a goal | `/goal` で完了条件を設定するとクラウドが複数ターン続行して条件を満たすまで動作 | [goal.md](./goal.md) |
| How Claude Code works | agentic loop、ビルトインツール、セッション、コンテキストウィンドウ、チェックポイント、パーミッションを解説 | [how-claude-code-works.md](./how-claude-code-works.md) |
| How Claude remembers your project | CLAUDE.md でユーザーが書いた永続命令、auto memory でクラウドが習得した学習を自動蓄積 | [memory.md](./memory.md) |
| Overview | Claude Code はコードベースを読取・ファイル編集・コマンド実行・開発ツール連携するエージェント型コーディングツール | [overview.md](./overview.md) |
| How Claude Code uses prompt caching | Claude Code がプロンプトキャッシングを自動管理。モデル切替でキャッシュ無効化される理由など | [prompt-caching.md](./prompt-caching.md) |
| Quickstart | Claude Code をインストール、ログイン、セッション開始、最初のコード編集まで | [quickstart.md](./quickstart.md) |
| Advanced setup | システム要件、プラットフォーム別インストール、バージョン管理、アンインストール | [setup.md](./setup.md) |
