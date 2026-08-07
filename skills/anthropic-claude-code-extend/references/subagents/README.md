# subagents

Claude Code CLI のサブエージェント・エージェントチーム・routines。Agent SDK のサブエージェント定義は anthropic-agent-sdk を参照。routines-fire のみ platform.claude.com の API エンドポイント。

| Name | Description | Path |
| --- | --- | --- |
| Agent teams | 複数 Claude Code インスタンスの協調実行・team lead + teammate 型 | [agent-teams.md](./agent-teams.md) |
| Agent view | バックグラウンド session の一括管理・dispatch UI | [agent-view.md](./agent-view.md) |
| Run agents in parallel (overview) | 複数 task 並列実行の 4 つのアプローチ比較 (overview) | [agents.md](./agents.md) |
| Routines | スケジュール・API・GitHub event 起動の cloud 自動化 | [routines.md](./routines.md) |
| Trigger a routine via API (/fire) | 既存 routine を POST で起動する /fire API エンドポイント | [routines-fire.md](./routines-fire.md) |
| Scheduled tasks (/loop) | セッション内 interval/cron task の /loop + CronCreate / CronDelete | [scheduled-tasks.md](./scheduled-tasks.md) |
| Subagents | 独立コンテキスト・専用プロンプト・tool access 制御 subagent 定義 | [sub-agents.md](./sub-agents.md) |
| Dynamic workflows | JavaScript 記述の大規模 subagent orchestration runtime (dozens~hundreds) | [workflows.md](./workflows.md) |
