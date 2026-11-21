---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/apps-api
---

# CCAI Platform Apps API, Manager API and API credentials

The Contact Center AI Platform (CCAI Platform) tenant APIs support integration with the platform. The Apps API extends features of the channels the platform supports (calls, chats and SMS). The Manager API extends features related to the settings and configuration of the system as well as events and activities. Both use basic authentication with API credentials created in the CCAI Platform portal.

## Signature / Usage

### Create API credentials

1. Go to the CCAI Platform portal.
2. Go to **Settings > Developer Settings > API Credentials**.
3. Add a new API credential and provide a name.

The API key that you provide can't be retrieved later. Be sure to store it securely.

- The subdomain is used as the `{username}` variable.
- The token is used as the `{password}` variable.

Every installation has its own subdomain. If your browser URL looks like `https://customer.uc1.ccaiplatform.com`, substitute the subdomain (`customer`) for `{subdomain}` and the remainder of the URL for `{domain}`.

### Base URLs

- Apps API: `https://{subdomain}.{domain}/apps/api/v1`, so `/calls` means `https://{subdomain}.{domain}/apps/api/v1/calls`.
- Manager API: `https://{subdomain}.{domain}/manager/api/v1`, so `/calls` means `https://{subdomain}.{domain}/manager/api/v1/calls`.

### Basic authentication request

Adapted (not in the official docs): the unquoted `{chat_id}` placeholder was replaced with `CHAT_ID` because curl treats an unquoted `{...}` in a URL as a glob set and would send the literal text `chat_id`. The `-u` value is only the user name `YOUR_SUBDOMAIN`; curl then prompts for the password (the API token), so the token is not stored in the shell history (the source passes `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"`; `man curl`: "If you simply specify the user name, curl prompts for a password."). `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `-q` (the first argument) makes curl skip `.curlrc`, so a `trace` or `trace-ascii` set there cannot record the credential headers.

```bash
curl -q --fail-with-body -X GET \
  https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/CHAT_ID \
  -u "YOUR_SUBDOMAIN" \
  -H "Accept: application/json"
```

### Apps API endpoint groups

Agent status, Bulk user management, Calls, Campaigns, Chats, Co-browse, Company Do Not Call list, Contact data, End users, Force agent logout, SMS, Wait times.

### Manager API groupings

- **Agent**: individual agent resources
- **Agent activity**: whenever an agent widget changes user status or receives a notification
- **Campaigns**: the events associated with the outbound dialer
- **Calls**: a single call resource
- **Chats**: a single chat resource
- **Emails**: a single email resource
- **Menu**: the queues that agents are assigned to and that end users access to receive support from an agent
- **Team**: the teams that an agent belongs to
- **User status**: individual statuses that the agent widget can be in

### Manage API credentials

The **Credential management** section is in the CCAI Platform portal under **Settings > Developer Settings > API**. Use your CCAI Platform subdomain (without `https://`) as the username; for `https://NAME.ccaiplatform.com` the username is `NAME`. You can create as many API credentials as you need for internal use, and you can:

- Add new API credentials (**+ Add API Credential**, enter a name, **Create**; the token is shown once).
- Disable or enable credentials.
- Regenerate the secret token (**Refresh** next to the credential, then **Regenerate** in the warning dialog; the new token is shown once).
- Edit the name of an existing credential (**Edit**, then **Done**).

## Notes

- Manager API rate limit: "The system limits requests to a rate of 10 requests per second."
- All Apps API updates are backward compatible. New JSON keys can be introduced in existing responses at any time; disregard unrecognized keys.
- Some third-party integrations require the creation of API credentials, and credentials for advanced reporting or other integrations might already exist.
- If you lose or forget a token, generate a new one. Keep tokens in a server-side secret store, never in browser or mobile code.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide (the page has no code of its own).
- Adapted from the official docs: `{chat_id}` in `https://YOUR_SUBDOMAIN.YOUR_DOMAIN/apps/api/v1/chats/{chat_id}` became `CHAT_ID`.
- There is no Discovery document for the CCAI Platform tenant APIs; the pages follow the twin as written.
- Corrected from the official docs: `-u "YOUR_SUBDOMAIN:YOUR_API_TOKEN"` puts the API token on the command line; the page passes the user name only and lets curl prompt for it. `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. `-q` is placed first (`man curl` 8.7.1, `-q, --disable`: "If used as the first parameter on the command line, the curlrc config file is not read or used."), because a `trace` / `trace-ascii` in `.curlrc` ("Enables a full trace dump of all incoming and outgoing data") would write the `Authorization` header to a file.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/apps-api (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/manager-api (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/api-credentials (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
- [reporting-api.md](./reporting-api.md)
- [webhooks.md](./webhooks.md)
