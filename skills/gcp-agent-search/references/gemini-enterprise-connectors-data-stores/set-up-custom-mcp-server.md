---
source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server
---

# Set Up a Custom MCP Server Data Store

Preview. Connects a custom Model Context Protocol (MCP) server to Gemini Enterprise (formerly Agentspace) as a data store (a data store is interchangeable with connector or data connector; MCP tools are called actions). Covers limitations, prerequisites, Cloud Run authentication, OAuth settings, Agent Gateway egress, enabling actions and best practices.

## Signature / Usage

### Find the engine resource name of your app

Resource name format used in the **Engine resource name** field:

```text
projects/PROJECT_NUMBER/locations/LOCATION/collections/default_collection/engines/APP_ID
```

List the engines (apps) in your project with the Discovery Engine API:

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero, and `set -o pipefail` in a subshell `( ... )` keeps that status through `| jq`. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; set -o pipefail; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -s -X GET \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/collections/default_collection/engines" \
| jq -r '.engines[]? | "App Name: \(.displayName)\nEngine Resource Name: \(.name)\n"' )
```

Example output:

```text
App Name: Cymbal Math App
Engine Resource Name: projects/1234567890/locations/global/collections/default_collection/engines/chat-app-cymbal
```

### Skip user confirmation for read-only tools

Configure annotations in your MCP tool definitions before they are imported as actions. The source's example, in Python:

```text
@mcp.tool(annotations={
       "destructiveHint": False,
       "readOnlyHint": True
   })
```

### Limitations

- Transport: The older `SSE` transport isn't supported; only the newer `StreamableHTTP` transport.
- TLS certificate: Must be signed by a publicly trusted CA. Exception: private MCP servers with Agent Gateway can use private CAs or self-signed certificates by configuring custom TLS trust anchors (`tlsConfig`) in the agent connectivity template.
- Actions limit: Limit enabled actions to 100 at a time.
- Agent Gateway binding: A Gemini Enterprise app binds to a single egress Agent Gateway; multiple apps can share the same Agent Gateway. Private traffic through Agent Gateway is supported in `us-central1` and `europe-west1`.
- App-scoped creation: A standalone Custom MCP server data store can't be linked to an app; create it in the app under **Connected Data Stores**.
- VPC Service Controls: Egress controls are enforced through organization policy constraints such as `allowedEgressFqdns` and `allowedDataSources`, not runtime traffic enforcement. Supported in VPC Service Controls-enabled projects when the required egress domains and data sources are explicitly allowed.

### Prerequisites

- Organization policy: Override the constraint that blocks Custom MCP data store creation.
- Allowed egress FQDNs: Allow FQDNs of the MCP server URL, authorization URL and token URL (domain only, for example `api.cymbal.com` and `auth.cymbal.com` for `https://api.cymbal.com/mcp`).
- Allowed data sources: If project enforcement is enabled or the project is VPC Service Controls-protected, add `custom_mcp` to the allowed data sources.
- Agent Gateway: If routing egress through Agent Gateway, the organization policy must permit binding the app to the gateway.
- Admin role: Discovery Engine Editor (`roles/discoveryengine.editor`) to create the data store.
- OAuth client: Register Gemini Enterprise as an OAuth client with your identity provider (for example Okta, Azure AD, or Google); authorization redirect URL `https://vertexaisearch.cloud.google.com/oauth-redirect`; obtain `client_id` and `client_secret`.
- Cloud Run: If hosted on Cloud Run with authentication, grant Cloud Run Invoker (`roles/run.invoker`) to the service agent `service-PROJECT_NUMBER@gcp-sa-discoveryengine.iam.gserviceaccount.com` on the receiving service.

### Authentication headers sent to Cloud Run

- `X-Serverless-Authorization`: Google-signed ID token that authenticates the Gemini Enterprise service agent; sent only for a default Cloud Run URL ending in `.run.app` (not for custom domains).
- `Authorization`: Preserves the user's OAuth token intact.

### Other configuration fields

- **Route egress through Agent Gateway**: Optional. For private network hosting in a VPC network or static IP egress. Routes only tool calls to your MCP server; AI model processing and document search traffic doesn't pass through the gateway. Unselected means a direct connection over the public internet.
- **Engine resource name**: `projects/PROJECT_NUMBER/locations/LOCATION/collections/default_collection/engines/APP_ID`
- `LOCATION`: Location of the app: `global`, `us`, or `eu`.
- `ENDPOINT_LOCATION`: Multi-region for the API request: `us`, `eu`, or `global` (for the `global` host form, see Notes).
- **MCP Server Description**: Optional. Describes what the MCP server does and how users can use it.
- **Location of your data connector**: Multi-region list.
- **Tag**: Optional. Identifies the connector across versions; immutable after creation.
- **Sensitive data protection policy**: Optional. Format `projects/PROJECT_ID/locations/LOCATION/contentPolicies/POLICY_ID`; a Sensitive Data Protection content policy that inspects and blocks sensitive data retrieved through this data store.

### Tool annotations

- `readOnlyHint`: Operation is non-destructive and only reads data; tool execution bypasses user confirmation.
- `destructiveHint`: Use explicitly if the tool modifies data; maintains the default confirmation behavior.

## Options / Props

### OAuth 2.0 fields

| Field | Description |
|---|---|
| **MCP Server URL** | Endpoint where the MCP server is hosted; must be an HTTPS URL; only `StreamableHTTP` transport; often ends with `/mcp`, for example `https://mcp.cymbal.com/mcp`. For Cloud Run enter the default `.run.app` URL. |
| **Authorization URL** | Base URL for the user to authorize Gemini Enterprise, for example `https://mcp.cymbal.com/authorize`; enter only the base URL without query parameters (standard OAuth parameters such as `client_id`, `redirect_uri` and `scope` are appended automatically). |
| **Authorization URL Parameters** | Optional. Additional parameters, for example `&access_type=offline&prompt=consent` to get a refresh token from a Google MCP server, or `&audience=https://api.cymbal.com/v1/`. |
| **Token URL** | Endpoint used to exchange the authorization code for an access token, for example `https://mcp.cymbal.com/token`. |
| **Client ID** | Identifier of the OAuth app registered in your identity provider. |
| **Client Secret** | Confidential key of that OAuth app. |
| **Scopes** | Space-separated list, for example for Box `root_readwrite manage_managed_users manage_groups`; must be sufficient to sign in and use the enabled actions; a common scope is `offline_access`. |
| **Enable PKCE Support** | Optional. Enables PKCE (RFC 7636). |
| **Use HTTP Basic Authentication** | Optional. Selected by default. Sends the client ID and client secret in the HTTP `Authorization` header instead of the token request body. |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms; Pre-GA features are available "as is" and might have limited support.
- By default no tools or actions are enabled. When you connect, all tools are imported and shown as actions; enable up to 100 at a time: open the data store, click **Actions > Reload custom actions** (performs a `tools/list` call), select the actions and click **Enable actions**. Reload after changing annotations.
- By default all calls to any action require user confirmation, because every operation is assumed to be potentially destructive. `readOnlyHint` skips it; only use it for genuinely read-only tools.
- Actions chosen by the model run against your own MCP server and can change data there; enable only the actions that users need.
- Verify the data store state: it moves from `Creating` to `Active` before it is ready.
- By default outbound traffic doesn't route through Agent Gateway unless **Route egress through Agent Gateway** is selected.
- Best practices: keep tool descriptions and schemas concise; use pagination or asynchronous polling (start-job tool returning a job ID plus a polling tool) for long-running operations; include the `offline_access` scope (or `&access_type=offline&prompt=consent`) so a refresh token is issued; turn off unused or unhealthy actions and data stores.
- Next steps in the source: enable Model Armor, create or use a custom agent, configure citations for custom MCP data stores.
- This is Gemini Enterprise's custom MCP data store (a Gemini Enterprise connector); it does not describe the Model Context Protocol itself or Claude Code MCP configuration.
- The Python snippet from the source is a decorator without a function, so it is tagged `text`.
- The source also shows Console steps.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/connectors/custom-mcp-server/set-up-custom-mcp-server (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [create-data-store.md](./create-data-store.md)
- [introduction-to-connectors-and-data-stores.md](./introduction-to-connectors-and-data-stores.md)
