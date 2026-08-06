---
name: openai-realtime-audio
description: >
  OpenAI API (developers.openai.com) の Realtime API と Audio エンドポイントのリファレンス。
  WebRTC / WebSocket / SIP transport, sessions / conversations / events,
  client secrets (ephemeral keys), VAD (server_vad / semantic_vad), tools/MCP,
  speech-to-speech voice agents, speech-to-text (streaming / file transcription),
  text-to-speech, translation。
user-invocable: false
---

# openai-realtime-audio

OpenAI Realtime API — WebRTC/WebSocket/SIP 経由の低遅延 speech-to-speech セッションと、
Audio エンドポイント（file transcription, text-to-speech）をカバーする。

## ディレクトリ構成

```text
skills/openai-realtime-audio/
  SKILL.md
  references/
    realtime/
      README.md
      overview.md
      webrtc.md
      websocket.md
      sip.md
      conversations.md
      vad.md
      transcription.md
      translation.md
      tools-mcp.md
      server-controls.md
      costs.md
      voice-agents.md
      models-prompting.md
      client-secrets.md
    audio/
      README.md
      audio-and-speech.md
      file-transcription.md
      text-to-speech.md
      transcription-workflow.md
  samples/
    README.md
    webrtc-browser-session.md
    websocket-server-connection.md
    client-secret-issuance.md
    realtime-transcription-stream.md
    file-transcription.md
    text-to-speech-synthesis.md
    voice-agent-basic.md
```

`scripts/` は意図的に作成していない。接続コード（WebRTC/WebSocket セットアップ、client secret 発行等）は `samples/` 側で完結してカバーしているため。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

webhook 一般・Responses API のリファレンスは `openai-api-core` スキルを参照。
Agents SDK 側の voice agents（`RealtimeAgent` / `RealtimeSession` 等の SDK ラッパー）は `openai-agents` スキルを参照。
本スキルは Realtime API 自体（WebRTC/WebSocket/SIP transport, session/event 仕様, client secrets）と
Audio エンドポイント（file transcription, text-to-speech）を担当する。
`Realtime` というキーワードは Supabase の Realtime（データベース pub/sub 製品）と無関係なので混同しないこと。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| WebRTC/WebSocket/SIP で Realtime セッションを張りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| conversation/event ライフサイクル・VAD・tools/MCP を知りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| client secret（ephemeral key）発行・コスト・プロンプティングを知りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| ファイルの音声書き起こし・text-to-speech（非リアルタイム）を知りたい | audio | [references/audio/README.md](references/audio/README.md) |
| transcription ワークフローの選定（file vs realtime）を知りたい | audio | [references/audio/README.md](references/audio/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
