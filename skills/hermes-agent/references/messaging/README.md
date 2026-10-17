# messaging

| Name | Description | Path |
|------|-------------|------|
| A2A (Agent-to-Agent) | The Hermes A2A plugin implements the open Agent2Agent protocol (v1.0): your agent can call other A2A agents as tools, and other agents can send tasks to Hermes over HTTP (JSON-RPC 2.0, Agent Card, SSE streaming, push notifications). | [a2a.md](./a2a.md) |
| BlueBubbles (iMessage) | Connect Hermes to Apple iMessage through BlueBubbles, a free open-source macOS server. | [bluebubbles.md](./bluebubbles.md) |
| Buzz | The Buzz adapter connects Hermes to a Buzz community (Block's open-source human+agent collaboration platform on Nostr). | [buzz.md](./buzz.md) |
| DingTalk | Hermes Agent runs as a DingTalk chatbot over Stream Mode (a long-lived outbound WebSocket, no public URL), replying with markdown via session webhooks or optional AI Cards. | [dingtalk.md](./dingtalk.md) |
| Discord | Hermes Agent runs as a Discord bot in DMs, server channels and threads, with slash commands, voice messages and voice-channel support. | [discord.md](./discord.md) |
| Email | Hermes receives and replies to email over IMAP/SMTP (Python `imaplib` / `smtplib`), threading replies with `In-Reply-To` / `References`. | [email.md](./email.md) |
| Feishu / Lark | Hermes Agent runs as a Feishu or Lark bot in DMs and groups, supporting WebSocket (recommended) or webhook connection modes, interactive cards, document-comment replies and meeting invitations. | [feishu.md](./feishu.md) |
| Google Chat | Hermes Agent connects to Google Chat using a Cloud Pub/Sub pull subscription for inbound events and the Chat REST API for outbound messages, so no public URL, tunnel or TLS certificate is needed. | [google_chat.md](./google_chat.md) |
| Home Assistant | Hermes integrates with Home Assistant through the official `homeassistant` plugin (NousResearch/hermes-official-plugins, not part of Hermes core): a gateway platform subscribing to `state_changed` events over WebSocket, plus four smart-home tools in the `homeassistant` toolset. | [homeassistant.md](./homeassistant.md) |
| IRC | The IRC adapter connects Hermes to any IRC server (Libera.Chat or a self-hosted ircd) using only Python's stdlib `asyncio`: no SDK, daemon or external dependency. | [irc.md](./irc.md) |
| LINE | Hermes Agent runs as a LINE Messaging API bot through the bundled platform plugin `plugins/platforms/line/`. | [line.md](./line.md) |
| Matrix | Hermes Agent connects to any Matrix homeserver (Synapse, Conduit, Dendrite, matrix.org) via the `mautrix` Python SDK, with threads, reactions-based approvals, native voice messages and optional end-to-end encryption. | [matrix.md](./matrix.md) |
| Mattermost | Hermes Agent runs as a Mattermost bot over the REST API (v4) and WebSocket, using `aiohttp` (no extra library). | [mattermost.md](./mattermost.md) |
| Messaging Gateway | A single background process that connects to all configured platforms (25+), handles sessions, runs cron jobs, delivers voice messages, and includes circuit breakers that automatically pause adapters during sustained platform outages. | [messaging.md](./messaging.md) |
| Microsoft Graph Webhook Listener | The `msgraph_webhook` gateway platform is an inbound event listener for Microsoft Graph change notifications (meeting transcripts, calendar, chat). | [msgraph-webhook.md](./msgraph-webhook.md) |
| ntfy | ntfy is an HTTP pub-sub notification service (public `ntfy.sh` or self-hosted). | [ntfy.md](./ntfy.md) |
| Open WebUI | Use Open WebUI as a web frontend for Hermes Agent through the built-in OpenAI-compatible API server (`POST /v1/chat/completions`, SSE streaming; optional `/v1/responses`). | [open-webui.md](./open-webui.md) |
| Photon iMessage | Connect Hermes to iMessage through Photon, a managed service handling Apple line allocation. | [photon.md](./photon.md) |
| QQ Bot | Connect Hermes to QQ via the Official QQ Bot API (v2): private (C2C), group @-mentions, guild and direct messages, over a persistent WebSocket with REST replies and voice transcription. | [qqbot.md](./qqbot.md) |
| Raft | Hermes connects to Raft as an external agent through a local wake-channel bridge: the adapter starts a loopback HTTP endpoint that receives content-free wake hints and injects a short notice into the gateway session. | [raft.md](./raft.md) |
| Hermes Relay | Hermes Relay is an experimental connector system: your gateway dials out over one authenticated WebSocket to a connector service that owns the platform bot tokens (Discord, Telegram, Slack, WhatsApp, and others), so the gateway holds no platform credentials and opens no inbound port. | [relay.md](./relay.md) |
| Signal | Hermes connects to Signal through the signal-cli daemon running in HTTP mode (SSE for inbound, JSON-RPC for outbound). | [signal.md](./signal.md) |
| SimpleX Chat | Hermes connects to SimpleX Chat through the `simplex-chat` CLI daemon over a local WebSocket. | [simplex.md](./simplex.md) |
| Slack | Hermes Agent connects to Slack as a bot over Socket Mode (slack-bolt / slack_sdk), so no public URL is needed. | [slack.md](./slack.md) |
| SMS | Hermes connects to SMS through the Twilio API: people text your Twilio number and get responses back. | [sms.md](./sms.md) |
| Teams Meetings | The Teams meeting pipeline ingests Microsoft Graph meeting events, fetches transcripts first (falling back to recording download plus STT), stores durable job state and writes structured summaries to Notion, Linear and Microsoft Teams. | [teams-meetings.md](./teams-meetings.md) |
| Microsoft Teams | Hermes Agent runs as a Microsoft Teams bot. | [teams.md](./teams.md) |
| Telegram | Hermes Agent runs as a Telegram bot (built on python-telegram-bot) supporting text, voice, images and file attachments, group chats, topics, webhook mode and native streaming. | [telegram.md](./telegram.md) |
| Webhooks | The webhook adapter runs an HTTP server that accepts POST requests from external services (GitHub, GitLab, JIRA, Stripe, etc.), validates signatures, turns payloads into agent prompts and routes responses to the source or another platform. | [webhooks.md](./webhooks.md) |
| WeCom Callback (Self-Built App) | Hermes connects to WeCom as a self-built enterprise application using the callback model: WeCom pushes encrypted XML to an HTTP endpoint, Hermes acknowledges silently and delivers the reply proactively through the `message/send` API. | [wecom-callback.md](./wecom-callback.md) |
| WeCom (Enterprise WeChat) | Hermes connects to WeCom (企業微信) through the AI Bot WebSocket gateway: real-time bidirectional communication with no public endpoint or webhook. | [wecom.md](./wecom.md) |
| Weixin (WeChat) | Hermes connects to personal WeChat (微信) accounts through Tencent's iLink Bot API using HTTP long-polling (no public endpoint, webhook or WebSocket). | [weixin.md](./weixin.md) |
| WhatsApp Business (Cloud API) | Hermes connects to WhatsApp through Meta's official WhatsApp Business Cloud API: no Node.js bridge, no QR codes, no account-ban risk. | [whatsapp-cloud.md](./whatsapp-cloud.md) |
| WhatsApp | Hermes connects to WhatsApp through a built-in Baileys bridge that emulates a WhatsApp Web session (not the official Business API). | [whatsapp.md](./whatsapp.md) |
| Yuanbao | Hermes connects to Yuanbao, Tencent's enterprise messaging platform, over a WebSocket gateway with HMAC authentication, supporting direct (C2C) and group conversations. | [yuanbao.md](./yuanbao.md) |
