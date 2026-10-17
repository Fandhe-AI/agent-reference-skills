# Microsoft Teams

Hermes Agent runs as a Microsoft Teams bot. Teams delivers messages by calling a public HTTPS webhook, so the instance needs a dev tunnel (local) or a real domain (production).

## Signature / Usage

```bash
npm install -g @microsoft/teams.cli@preview
teams login
teams app create --name "Hermes" --endpoint "https://<your-tunnel-url>/api/messages"
teams app get <teamsAppId> --install-link
```

```bash
# ~/.hermes/.env
TEAMS_CLIENT_ID=<your-client-id>
TEAMS_CLIENT_SECRET=<your-client-secret>
TEAMS_TENANT_ID=<your-tenant-id>
TEAMS_ALLOWED_USERS=<your-aad-object-id>
```

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['teams'], explicit=True)"
hermes gateway restart
curl http://localhost:3978/health   # ok
```

## Options / Props

| Variable | Description |
|----------|-------------|
| `TEAMS_CLIENT_ID` / `TEAMS_CLIENT_SECRET` / `TEAMS_TENANT_ID` | Azure AD app credentials |
| `TEAMS_ALLOWED_USERS` | AAD object IDs (find with `teams status --verbose`) |
| `TEAMS_ALLOW_ALL_USERS` | `true` skips the allowlist |
| `TEAMS_HOME_CHANNEL` / `TEAMS_HOME_CHANNEL_NAME` | Cron / proactive delivery conversation |
| `TEAMS_PORT` | Webhook port (default `3978`) |
| `TEAMS_REQUIRE_MENTION` / `platforms.teams.require_mention` | Answer only @mentions / replies in channels and group chats (default `false`) |
| `platforms.teams.extra.delivery_mode` | `graph` or `incoming_webhook` (meeting summaries; inert without the `teams_pipeline` plugin) |
| `extra.chat_id` / `team_id` + `channel_id` / `access_token` / `incoming_webhook_url` | Delivery targets |

## Notes

- Personal chats respond to every message; group chats and channels respond only when @mentioned (`<at>BotName</at>` stripped). Once the manifest grants `ChannelMessage.Read.Group` or `ChatMessage.Read.Chat` (RSC), Teams delivers every message, so set `require_mention: true`.
- Dangerous commands trigger an Adaptive Card with Allow Once / Allow Session / Always Allow / Deny.
- Hermes' local listener is plain HTTP on 3978; terminate TLS at the tunnel / reverse proxy (HTTPS forwarded to it causes `"UNKNOWN / HTTP/1.0" 400`). Teams rejects self-signed certificates. Update the endpoint with `teams app update --id <teamsAppId> --endpoint ...`.
- `incoming_webhook` mode has no threading / reactions; `graph` mode needs `ChannelMessage.Send` (channel) or `Chat.ReadWrite.All` (chat) application permissions (per Hermes docs; see Microsoft Graph caveat below).
- Microsoft Graph caveat: app-only (application permission) posting to channels / chats is limited to migration scenarios (Teamwork.Migrate.All); see https://learn.microsoft.com/en-us/graph/api/channel-post-messages.
- Always set `TEAMS_ALLOWED_USERS`; unauthorized messages are silently dropped.
- Adapted: prefixed `cd ~/.hermes/hermes-agent &&` (as in the upstream ACP / DingTalk / SMS pages) because `pm` lives in the Hermes install checkout.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/teams (pinned to v0.22.2)

## Related

- [Teams Meetings](./teams-meetings.md)
- [Microsoft Graph Webhook Listener](./msgraph-webhook.md)
- [Messaging Gateway](./messaging.md)
