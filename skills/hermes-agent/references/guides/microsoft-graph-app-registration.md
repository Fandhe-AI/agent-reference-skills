# Register a Microsoft Graph Application

Azure portal walkthrough for the app registration that powers the Teams meeting pipeline (app-only / daemon authentication, admin-consented application permissions).

## Signature / Usage

1. entra.microsoft.com -> Identity -> Applications -> App registrations -> New registration (single tenant, no redirect URI). Copy Application (client) ID and Directory (tenant) ID.
2. Certificates & secrets -> New client secret; copy the Value column immediately (not the Secret ID).
3. API permissions -> Add a permission -> Microsoft Graph -> Application permissions, then Grant admin consent.
4. (Required for app-only onlineMeetings access; the Hermes docs label this step Recommended) scope with an Application Access Policy:

```powershell
New-CsApplicationAccessPolicy `
  -Identity "Hermes-Meeting-Pipeline-Policy" `
  -AppIds "<MSGRAPH_CLIENT_ID>" `
  -Description "Restrict Hermes meeting pipeline to allow-listed users"

Grant-CsApplicationAccessPolicy `
  -PolicyName "Hermes-Meeting-Pipeline-Policy" `
  -Identity "alice@example.com"

Test-CsApplicationAccessPolicy -Identity "alice@example.com" -AppId "<MSGRAPH_CLIENT_ID>"
```

5. `~/.hermes/.env`:

```bash
MSGRAPH_TENANT_ID=<directory-tenant-id>
MSGRAPH_CLIENT_ID=<application-client-id>
MSGRAPH_CLIENT_SECRET=<client-secret-value>
```

```bash
chmod 600 ~/.hermes/.env
```

Smoke test:

```python
python -c "
import asyncio
from tools.microsoft_graph_auth import MicrosoftGraphTokenProvider
provider = MicrosoftGraphTokenProvider.from_env()
token = asyncio.run(provider.get_access_token())
print('Token acquired, length:', len(token))
print(provider.inspect_token_health())
"
```

## Options / Props

| Permission | Purpose |
|------------|---------|
| `OnlineMeetings.Read.All` | Meeting metadata (transcript-first summaries) |
| `OnlineMeetingTranscript.Read.All` | Meeting transcripts (transcript-first summaries) |
| `OnlineMeetingRecording.Read.All` | Download recordings for offline STT (recording fallback) |
| `CallRecords.Read.All` | Resolve meetings from call records (recording fallback) |
| `ChannelMessage.Send` | Post to channels (only when `platforms.teams.extra.delivery_mode` is `graph`) (per Hermes docs; see Notes) |
| `Chat.ReadWrite.All` | Post to 1:1 / group chats (graph mode with `chat_id` target) (per Hermes docs; see Notes) |

Common errors:

| Azure error | Fix |
|-------------|-----|
| `AADSTS7000215: Invalid client secret` | Generate a new secret; update `.env` |
| `AADSTS700016: Application not found` | Check client ID / tenant belong to the same app |
| `AADSTS90002: Tenant not found` | Re-copy the Directory (tenant) ID |
| `insufficient_claims` at call time | Grant admin consent again |

## Notes

- Needs tenant admin rights (or an admin to consent) and a Microsoft 365 tenant with Teams licenses producing transcripts and recordings.
- Not recommended: `OnlineMeetings.ReadWrite.All`, `Chat.ReadWrite` without `.All`, and delegated permissions (the pipeline uses client-credentials).
- The Hermes docs call the policy optional and state that without it every user's meetings are readable; however Microsoft Graph's onlineMeeting API docs state that for application permissions tenant administrators must create an application access policy and grant it to the user (https://learn.microsoft.com/en-us/graph/api/onlinemeeting-get), so treat this step as required. Propagation can take up to 30 minutes; the policy is PowerShell-only (MicrosoftTeams module, `Connect-MicrosoftTeams`).
- Caveat: Microsoft Graph's own permission table for POST /teams/{id}/channels/{id}/messages lists ChannelMessage.Send as a delegated permission only, and application permissions (Teamwork.Migrate.All) are supported only for message import/migration — app-only (client-credentials) posting to channels or chats is not supported by Graph, so graph delivery_mode as described here may fail; verify against https://learn.microsoft.com/en-us/graph/api/channel-post-messages before relying on it.
- Secret rotation: create a second secret, update `MSGRAPH_CLIENT_SECRET`, `hermes gateway restart`, verify, then delete the old secret.
- Follow-up pages (webhook listener, pipeline configuration, outbound delivery) were described in the source as landing with later PRs.
- Source: https://hermes-agent.nousresearch.com/docs/guides/microsoft-graph-app-registration (pinned to v0.22.2)

## Related

- [operate-teams-meeting-pipeline](./operate-teams-meeting-pipeline.md)
