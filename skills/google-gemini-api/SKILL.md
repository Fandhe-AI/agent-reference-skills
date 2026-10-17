---
name: google-gemini-api
description: >
  Google Gemini API (Gemini Developer API, ai.google.dev) の
  Interactions API (v1 / v1beta), generateContent, Google GenAI SDK (google-genai / @google/genai),
  Live API, ephemeral tokens, Managed Agents, Deep Research, function calling, Google Search grounding,
  File Search, Files API, thought signatures, Nano Banana, Veo, Lyria, Batch API, Flex / Priority inference, OpenAI 互換。
user-invocable: false
---

# Google Gemini API

> 分割 PR の途中段階。現在収録済み: references/{generate-content, getting-started, interactions-core, live-realtime, managed-agents, media-generation, migration, models, multimodal-input, platform-ops, rest-reference, tools-grounding}。冒頭説明に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

Google Gemini API (Gemini Developer API, `ai.google.dev`) のリファレンススキル。Interactions API を中心に、generateContent・Live API・Managed Agents・各種ツール・メディア生成・運用・移行を収録する。

## 対象バージョン

- Docs fetched 2026-10-16（URL に版なし。Markdown twin は `<url>.md.txt`）
- API: Interactions API v1 (GA) / v1beta (SDK 既定)
- SDK（2026-10-16 実測）:
  - `google-genai` 2.31.0 (PyPI)
  - `@google/genai` 2.30.0 (npm latest)
  - `google.golang.org/genai` v1.75.0
  - `com.google.genai:google-genai` 1.57.0 (Maven)
  - `Google.GenAI` 1.26.1 (NuGet)
- SDK の GitHub 原本はタグ `python-genai@v2.31.0` / `js-genai@v2.30.0` / `go-genai@v1.75.0` のみ

## 近接スキルとの棲み分け

- Core（interactions-core / rest-reference / テキスト生成・ストリーミング・構造化出力）と移行・OpenAI 互換: `openai-api-core`、`anthropic-api-core` とは別物
- managed-agents: `anthropic-managed-agents`、`anthropic-agent-sdk`、`openai-agents`、`hermes-agent` とは別物。managed-agents の hooks は `anthropic-claude-code-extend`、`lefthook`、`react-hook-form`、`fastify` の hooks とは別物
- tools-grounding（function calling・Remote MCP・computer use・file search・google search）: `anthropic-api-tools-mcp`、`openai-agents` とは別物。file search / embeddings は `upstash`、`fandhe-db` の vector 検索とは別物
- live-realtime / ephemeral tokens / speech generation: `openai-realtime-audio` とは別物
- media-generation（Nano Banana, Omni, Veo）: `openai-images-video` とは別物
- platform-ops の batch / webhooks: `anthropic-api-core`、`openai-api-core`、`stripe`、`inngest` とは別物
- getting-started/coding-agents の `gemini-api-dev` スキルと Gemini Docs MCP は本リポジトリのスキルでも Claude Code の Agent Skills (`anthropic-claude-code-extend`) でもない
- Gemini CLI（別製品、本リポジトリに担当スキルなし）と Firebase AI Logic は対象外

## ディレクトリ構成

```text
skills/google-gemini-api/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md  get-started.md  interactions-overview.md  libraries.md
      api-key.md  oauth.md  available-regions.md  coding-agents.md
    interactions-core/
      README.md
      text-generation.md  streaming.md  structured-output.md  thinking.md
      background-execution.md  implicit-caching.md  long-decode.md  optimization.md
      prompting-strategies.md  safety-guidance.md  safety-settings.md
    generate-content/
      README.md
      overview.md  get-started.md  text-generation.md  structured-output.md
      thinking.md  thought-signatures.md  function-calling.md  grounding-tools.md
      tool-combination.md  explicit-caching.md  files.md  multimodal-understanding.md
      image-generation.md  speech-generation.md  music-generation.md  robotics.md
      tokens.md  inference-options.md  gemini-3-guide.md
    multimodal-input/
      README.md
      image-understanding.md  audio-understanding.md  video-understanding.md
      document-processing.md  transcribe.md  files-api.md  file-input-methods.md
      media-resolution.md  tokens.md  long-context.md  embeddings.md  robotics-er.md
    tools-grounding/
      README.md
      tools-overview.md  function-calling.md  tool-combination.md  google-search.md
      maps-grounding.md  url-context.md  code-execution.md  computer-use.md  file-search.md
    live-realtime/
      README.md
      overview.md  get-started-sdk.md  get-started-websocket.md  capabilities.md
      tool-use.md  session-management.md  best-practices.md  thinking.md
      live-translate.md  live-transcribe.md  realtime-music-generation.md  ephemeral-tokens.md
    media-generation/
      README.md
      image-generation.md  omni.md  veo.md  speech-generation.md
      voice-design.md  voice-replication.md  music-generation.md  lyria-prompt-guide.md
    managed-agents/
      README.md
      agents-overview.md  quickstart.md  antigravity-agent.md  custom-agents.md
      deep-research.md  environments.md  credentials.md  hooks.md
    platform-ops/
      README.md
      batch-api.md  flex-inference.md  priority-inference.md  webhooks.md
      rate-limits.md  pricing.md  billing.md  api-errors.md
      troubleshooting.md  zero-data-retention.md  logs-datasets.md
    models/
      README.md
      models-catalog.md  gemini-4-3-models.md  gemini-2-models.md  gemini-3-developer-guide.md
      whats-new-gemini-4-argon.md  whats-new-gemini-3-7.md  whats-new-gemini-3-6.md  whats-new-gemini-3-5.md
      agent-models.md  audio-live-models.md  image-video-models.md  music-models.md
      embedding-models.md  specialized-models.md
    migration/
      README.md
      migrate-to-interactions.md  interactions-breaking-changes-may-2026.md  migrate-genai-sdk.md
      api-versions.md  deprecations.md  openai-compatibility.md  developer-api-vs-platform.md
    rest-reference/
      README.md
      overview.md  all-methods.md  interactions-v1.md  interactions-v1beta.md
      generate-content.md  models.md  tokens.md  files.md  caching.md  embeddings.md  batch.md
      file-search-stores.md  file-search-documents.md  live.md  live-music.md
      agents.md  environments.md  credentials.md  triggers.md  webhooks.md  voices.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 新規コードは Interactions API（`interactions-core`）を第一候補とし、旧 generateContent は `generate-content`、移行は `migration` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Gemini API の全体像・クイックスタート・SDK・API キー・OAuth・提供地域を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Interactions API でテキスト生成・ストリーミング・構造化出力・thinking を使いたい | interactions-core | [references/interactions-core/README.md](references/interactions-core/README.md) |
| background 実行・implicit caching・long decode・safety settings・プロンプト設計 | interactions-core | [references/interactions-core/README.md](references/interactions-core/README.md) |
| 旧 generateContent API の使い方（thought signatures・explicit caching・トークン計数） | generate-content | [references/generate-content/README.md](references/generate-content/README.md) |
| 画像・音声・動画・PDF の理解、Files API、media resolution、embeddings | multimodal-input | [references/multimodal-input/README.md](references/multimodal-input/README.md) |
| function calling・Google Search / Maps grounding・URL context・code execution・computer use・File Search | tools-grounding | [references/tools-grounding/README.md](references/tools-grounding/README.md) |
| Live API（WebSocket / SDK）・セッション管理・ephemeral tokens・live translate / transcribe | live-realtime | [references/live-realtime/README.md](references/live-realtime/README.md) |
| 画像生成 (Nano Banana)・Omni・Veo・TTS・音楽生成 (Lyria)・voice design | media-generation | [references/media-generation/README.md](references/media-generation/README.md) |
| Managed Agents・Antigravity agent・Deep Research・environments・credentials・hooks | managed-agents | [references/managed-agents/README.md](references/managed-agents/README.md) |
| Batch API・Flex / Priority inference・webhooks・rate limits・pricing・エラー対処 | platform-ops | [references/platform-ops/README.md](references/platform-ops/README.md) |
| モデル一覧・世代別 what's new・埋め込み / 音声 / 画像動画 / agent モデル | models | [references/models/README.md](references/models/README.md) |
| generateContent から Interactions への移行・SDK 移行・破壊的変更・非推奨・OpenAI 互換 | migration | [references/migration/README.md](references/migration/README.md) |
| REST エンドポイント・リクエスト / レスポンス仕様 (v1 / v1beta) を確認したい | rest-reference | [references/rest-reference/README.md](references/rest-reference/README.md) |
