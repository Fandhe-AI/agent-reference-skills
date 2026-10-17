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
- Gemini CLI（`gws` が担当）と Firebase AI Logic は対象外

## ディレクトリ構成

```text
skills/google-gemini-api/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md  get-started.md  interactions-overview.md  libraries.md
      api-key.md  oauth.md  available-regions.md  coding-agents.md
    generate-content/
      README.md
      overview.md  get-started.md  text-generation.md  structured-output.md
      thinking.md  thought-signatures.md  function-calling.md  grounding-tools.md
      tool-combination.md  explicit-caching.md  files.md  multimodal-understanding.md
      image-generation.md  speech-generation.md  music-generation.md  robotics.md
      tokens.md  inference-options.md  gemini-3-guide.md
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
| 旧 generateContent API の使い方（thought signatures・explicit caching・トークン計数） | generate-content | [references/generate-content/README.md](references/generate-content/README.md) |
