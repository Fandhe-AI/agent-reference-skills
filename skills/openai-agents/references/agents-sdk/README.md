# Agents SDK

OpenAI Agents SDK (developers.openai.com) の中核 API。この skill 全体は OpenAI 公式 Agents SDK を対象とし、Nous Research の `hermes-agent`（サードパーティ AI CLI）とは別物。

| Name | Description | Path |
|------|-------------|------|
| Agents SDK Overview | SDK 全体像、Responses API との比較、リーディングオーダー | [overview.md](./overview.md) |
| Quickstart | SDK インストール、最初の Agent 定義・実行、tool/handoff の追加 | [quickstart.md](./quickstart.md) |
| Agent Definitions | `Agent` 設定項目（name, instructions, model, tools, outputType 等）、local context | [define-agents.md](./define-agents.md) |
| Models and Providers | モデル選択戦略、`OPENAI_DEFAULT_MODEL`、provider/transport | [models-and-providers.md](./models-and-providers.md) |
| Running Agents | agent loop、conversation state 戦略（history/session/conversationId/responseId）、streaming | [running-agents.md](./running-agents.md) |
| Results and State | `finalOutput`/`history`/`lastAgent`/`state` 等の result surface、中断からの再開 | [results-and-state.md](./results-and-state.md) |
