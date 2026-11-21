---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/reporting-api
---

# CCAI Platform reporting data through the Manager and Apps APIs

CCAI Platform provides a set of APIs that can be used to gather reporting data. The available endpoints and the call-segment metrics derived from API fields are listed below.

## Signature / Usage

Reporting data comes from the Manager API and the Apps API; both use the basic authentication shown here.

Adapted (not in the official docs): the unquoted `{chat_id}` placeholder was replaced with `CHAT_ID` because curl treats an unquoted `{...}` in a URL as a glob set and would send the literal text `chat_id`. The `-u` value is only the user name `YOUR_SUBDOMAIN`; curl then prompts for the password (the API token), so the token is not stored in the shell history (the source passes `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"`; `man curl`: "If you simply specify the user name, curl prompts for a password.").

```bash
curl -X GET \
  https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/CHAT_ID \
  -u "YOUR_SUBDOMAIN" \
  -H "Accept: application/json"
```

### Basic call segment metrics (API fields)

The CCAI Platform portal reports and API requests are two ways to look at metrics. Due to the intricacies between the different data sources, some call metrics appear in the API that don't appear in reports.

- **Billing Time**: start `created_at`, end `ended_at`
- **Call Time**: start `created_at`, end `ended_at`
- **IVR Time**: start `created_at`, end `queued_at`
- **Queued Time & Wait Time**: start `queued_at`, end `connected_at`
- **Handle Time**: start `connected_at`, end `ended_at`
- **Transfer**: start `/call.transfers[]['created_at']`, end `/call.participants[]['connected_at']`
- **Conference Time**: `/calls.participants[]['connected_at']` and `/calls.participants[]['ended_at']` (overlap of agent participants connected and ended times)
- **Third Party Talk Time**: `/calls.participants[]['connected_at']` and `/calls.participants[]['ended_at']` (overlap of agent participants connected and ended times)
- **Ring Time (Connecting Time)**: start `connecting_at`, end `connected_at`
- **Talk Time**: `duration - hold_duration`
- **Hold Time**: `hold_duration`

## Options / Props

### Available endpoints

| Endpoint | Description |
|---|---|
| Agent | Provides necessary details around the agents that are assigned to the CCAI Platform platform. |
| Agent Status History | Enables status changes and associated timestamps for what agents are doing within the CCAI Platform platform. This data is extremely useful in time-series analysis. |
| Call | Gives visibility into every call and call type that the CCAI Platform platform manages including inbound, outbound, voicemails, and their channels. Subset details can also be included including keys to join photos, videos, transfer, and call participants. Furthermore, keys are provided to link calls and agents together for deeper tracking analysis. |
| Chat | Similar to the call data model, the chat data model allows for users to identify the details of all chats managed by the CCAI Platform platform including the menu path taken prior to the chat being taken and transfer of the chat if applicable. |
| Call Participant | Allows for the data to be pulled on the agent, end-users and/or third party who participated in a particular call. |
| Chat Participant | Allows for the data to be pulled on the agent and ensures who participated in a particular chat. |
| Changed Detail | Provides a unique data model to account for data value changes between the former and new value by specific fields. |
| User Info | A subset of data that is best categorized as a limited view of the full agent data model. |
| Photo | Represents the end user-uploaded photos which can be traced to call and chat channels. |
| Video | Represents the end user-uploaded videos which can be traced to call and chat channels. |
| Team | Provides additional context into agent details and how a particular agent is grouped in the support center. Agents can belong to more than one team. |
| Team With Assignees | Provides data into the team and the associated agents. |
| Team Tree | Provides the tree structure of the teams configured in CCAI Platform. For example, the US Team has two sub-teams, East and West Coast. This hierarchy is exposed with the US being the parent with 2 siblings, East and West. |

## Notes

- The source also shows two diagrams (call API schema and call lifecycle) that are not reproduced.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide (the page has no code of its own).
- Adapted from the official docs: `{chat_id}` in `https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/{chat_id}` became `CHAT_ID`.
- Source inconsistency: the source defines **Conference Time** and **Third Party Talk Time** identically (`/calls.participants[]['connected_at']` and `/calls.participants[]['ended_at']`, with the note "Overlap of agent participants connected & ended times" for both). Both are kept as written. From these definitions alone, third-party talk time cannot be told apart from conference time, and the source does not say which participants count as a third party; no other retrieved page of the CCAI Platform docs defines these two metrics.
- Corrected from the official docs: `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"` puts the API token on the command line; the page passes the user name only and lets curl prompt for it.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/reporting-api (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [apps-and-manager-apis.md](./apps-and-manager-apis.md)
