---
name: openai-realtime-audio
description: >
  OpenAI API (developers.openai.com) の音声 API リファレンス。
  GPT-Live (gpt-live-1, full-duplex, delegation, /v1/live/sessions),
  Realtime API (WebRTC / WARP / WebSocket / SIP, sessions / events, client secrets,
  VAD (server_vad / semantic_vad), tools/MCP), speech-to-speech voice agents,
  speech-to-text (gpt-transcribe / gpt-live-transcribe), text-to-speech, custom voices, translation。
user-invocable: false
---

# openai-realtime-audio

OpenAI の音声 API を 2 系統でカバーする。

- GPT-Live（`gpt-live-1`、full-duplex で backend への delegation を持つ音声 API、`/v1/live/sessions`、2026-09-10 GA）。公式ハブは新規の会話型音声アプリでは GPT-Live から始めるよう案内している
- Realtime API（WebRTC / WARP / WebSocket / SIP 経由の低遅延 speech-to-speech セッション）と、Audio エンドポイント（file transcription, text-to-speech, custom voices）

対象版: developers.openai.com の Markdown twin を 2026-10-17 に取得（changelog 最新 Oct 15, 2026。URL に版は無い）。
Deprecation の要点: TTS モデルは 2027-01-06、文字起こしモデルと `/v1/audio/translations` は 2027-02-26、legacy realtime / audio は 2027-01-20 に停止予定。

## ディレクトリ構成

```text
skills/openai-realtime-audio/
  SKILL.md
  references/
    live/
      README.md
      overview.md
      webrtc.md
      websocket.md
      sip.md
      server-controls.md
      sessions.md
      delegation.md
      prompting.md
      migration.md
      decisions-voice.md
      costs.md
      partner-integrations.md
      events.md
    realtime/
      README.md
      overview.md
      webrtc.md
      webrtc-warp.md
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
      custom-voices.md
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

## 棲み分け

- `live/`（GPT-Live、`/v1/live/sessions`）と `realtime/`（Realtime API）は接続ガイド（voice-webrtc / voice-websockets / voice-sip / voice-server-controls）を共有するが、handshake・認証情報・イベント形式は互換ではない。`realtime/` と `live/` のページを混ぜて読まない
- GPT-Live の client delegation（自前 agent を接続する方式）は GPT-Live 側の機能。`openai-agents` スキルの Agents SDK（`RealtimeAgent` / `RealtimeSession` / handoffs）とは別物
- Decisions API 本体は本スキルの対象外。`live/decisions-voice.md` の音声連携のみを扱う
- webhook 一般・Responses API のリファレンスは `openai-api-core` スキルを参照
- `Realtime` というキーワードは Supabase の Realtime（データベース pub/sub 製品）と無関係なので混同しないこと

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| GPT-Live で full-duplex 音声会話・delegation（Responses / client）・Decisions 連携を作りたい | live | [references/live/README.md](references/live/README.md) |
| GPT-Live の接続（WebRTC / WebSocket / SIP / sideband）・課金・Realtime からの移行 | live | [references/live/README.md](references/live/README.md) |
| WebRTC/WebSocket/SIP で Realtime セッションを張りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| WebRTC 接続を WARP で高速化したい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| conversation/event ライフサイクル・VAD・tools/MCP を知りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| client secret（ephemeral key）発行・コスト・プロンプティングを知りたい | realtime | [references/realtime/README.md](references/realtime/README.md) |
| ファイルの音声書き起こし・text-to-speech（非リアルタイム）を知りたい | audio | [references/audio/README.md](references/audio/README.md) |
| custom voice を作成・利用したい | audio | [references/audio/README.md](references/audio/README.md) |
| transcription ワークフローの選定（file vs realtime）を知りたい | audio | [references/audio/README.md](references/audio/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
