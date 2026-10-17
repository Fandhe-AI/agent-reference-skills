# Google Chat

Hermes Agent connects to Google Chat using a Cloud Pub/Sub pull subscription for inbound events and the Chat REST API for outbound messages, so no public URL, tunnel or TLS certificate is needed.

## Signature / Usage

```bash
# ~/.hermes/.env
GOOGLE_CHAT_PROJECT_ID=my-chat-bot-123
GOOGLE_CHAT_SUBSCRIPTION_NAME=projects/my-chat-bot-123/subscriptions/hermes-chat-events-sub
GOOGLE_CHAT_SERVICE_ACCOUNT_JSON=/home/you/.hermes/google-chat-sa.json
GOOGLE_CHAT_ALLOWED_USERS=you@yourdomain.com,coworker@yourdomain.com
```

```bash
python -m plugins.platforms.google_chat.oauth --install-deps
hermes gateway
```

Setup: GCP project, enable Google Chat API and Cloud Pub/Sub API, create a service account + JSON key, create topic `hermes-chat-events` and a Pull subscription (7-day retention), grant `chat-api-push@system.gserviceaccount.com` the `Pub/Sub Publisher` role on the **topic**, grant your service account `Pub/Sub Subscriber` and `Pub/Sub Viewer` on the **subscription**, configure the Chat app (Cloud Pub/Sub connection, topic `projects/<project>/topics/hermes-chat-events`), then DM the app.

## Options / Props

| Variable | Description |
|----------|-------------|
| `GOOGLE_CHAT_PROJECT_ID` | Project ID (falls back to `GOOGLE_CLOUD_PROJECT`) |
| `GOOGLE_CHAT_SUBSCRIPTION_NAME` | Full subscription path |
| `GOOGLE_CHAT_SERVICE_ACCOUNT_JSON` | Service account key path (falls back to `GOOGLE_APPLICATION_CREDENTIALS`) |
| `GOOGLE_CHAT_ALLOWED_USERS` | Allowed emails |
| `GOOGLE_CHAT_HOME_CHANNEL` | Cron delivery destination (`spaces/AAAA...`) |
| `GOOGLE_CHAT_MAX_MESSAGES` | Pub/Sub FlowControl messages (default `1`; serializes commands per session) |
| `GOOGLE_CHAT_MAX_BYTES` | In-flight bytes cap (default `16777216`) |
| `GOOGLE_CHAT_DEBUG_RAW` | `1` dumps redacted envelopes at DEBUG |
| `platforms.google_chat.typing_status_text` | Working-state marker (default `"Hermes is thinking…"`); `typing_indicator: false` disables |

## Notes

- Requires a Google Workspace (Gmail-only accounts cannot host Chat apps). There is no "Chat Bot Caller" IAM role; grant only subscription-level Pub/Sub roles, never project-level.
- The marker is a real posted message edited in place with the response. Limits: 4000 characters per message (auto-split); supported markdown `*bold*`, `_italic_`, `~strike~`, code, no headings or lists; thread replies keep separate sessions.
- Clarify questions render as Card v2 buttons plus "Other / type answer".
- Native attachments need per-user OAuth because `media.upload` rejects service accounts: register an OAuth Desktop client once per profile (`python -m plugins.platforms.google_chat.oauth --client-secret /path/to/client_secret.json`), then each user runs `/setup-files`, `/setup-files start`, `/setup-files <PASTED_URL>` (revoke with `/setup-files revoke`). Only the `chat.messages.create` scope is requested; tokens in `~/.hermes/google_chat_user_tokens/<sanitized_email>.json`.
- Under multi-profile gateways every `GOOGLE_CHAT_*` is read from the routed profile's `.env`; no fallback to Application Default Credentials across profiles.
- Silent bot: check undelivered messages in the subscription, then the topic IAM binding. Default quota is 60 messages per space per minute. Bearer tokens attach only to Google-owned hosts (SSRF protection).
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/google_chat (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Slack](./slack.md)
