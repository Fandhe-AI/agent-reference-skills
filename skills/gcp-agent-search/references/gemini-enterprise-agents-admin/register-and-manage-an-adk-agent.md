---
source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-adk-agent
---

# Register and manage an ADK agent in Gemini Enterprise

Administrators register Agent Development Kit (ADK) agents that are deployed on Agent Runtime (formerly Vertex AI Agent Engine) with a Gemini Enterprise app (formerly Agentspace), so that end users can use them in the Gemini Enterprise web app. The Agent Runtime service processes the agent queries. This page covers authorization resources, registration, listing, viewing, updating and deleting through the Discovery Engine REST API (`v1alpha`).

## Signature / Usage

### Resource path of the Agent Runtime agent

In this path `PROJECT_ID` and `LOCATION` are the project and the region of the Agent Runtime agent, which can differ from the Gemini Enterprise app's project and multi-region (the REST examples below write them as `RUNTIME_PROJECT_ID` and `RESOURCE_LOCATION`).

```text
projects/PROJECT_ID/locations/LOCATION/reasoningEngines/RESOURCE_ID
```

### Authorization URI template (optional authorization)

```text
https://accounts.google.com/o/oauth2/v2/auth?client_id=OAUTH_CLIENT_ID&redirect_uri=https%3A%2F%2Fvertexaisearch.cloud.google.com%2Fstatic%2Foauth%2Foauth.html&scope=YOUR_CUSTOM_SCOPES&include_granted_scopes=true&response_type=code&access_type=offline&prompt=consent
```

### Add an authorization resource (optional)

Needed only if the agent must access Google Cloud resources on behalf of a user. The example reads the OAuth client secret without echo, builds the JSON body with `jq` from standard input and sends it to `curl` on standard input, so the secret does not appear in the shell history or in any process argument (requires `jq`, and curl 7.76.0 or later for `--fail-with-body`). The block is a single `if` command: run it, type `OAUTH_AUTH_URI` (the authorization URL built above) and `OAUTH_TOKEN_URI` on their own lines at the prompts, then the secret at the silent prompt. The request is built and sent only if every `read` succeeds and none of the three values is empty; otherwise the block prints a message and sends nothing. The block's exit status is non-zero (1) when nothing was sent, when curl fails, or when the server returns an HTTP status of 400 or greater. Run the block by itself: if more lines follow it in the same paste or script, `read` takes them as the values.

Adapted (not in the official docs): instead of writing `"clientSecret": "OAUTH_CLIENT_SECRET"` in the `curl -d` argument, the secret is read with `IFS= read -rs` (so leading or trailing spaces are kept), piped by the `printf` builtin, with the two URLs, into `jq -Rn` (which places it as `"clientSecret": $client_secret`) and the body is sent with `curl ... --data @-`; the build-and-send runs inside `if ... IFS= read -rs OAUTH_CLIENT_SECRET && [ -n "$OAUTH_CLIENT_SECRET" ]; then ... else ... fi`, so a cancelled or empty input sends nothing, and `unset` on the `fi` line clears the variable afterwards. `OAUTH_AUTH_URI` and `OAUTH_TOKEN_URI` are also read with `IFS= read -r` (checked to be non-empty in the same `if`) and passed to `jq` the same way (`printf` is a shell builtin, so the values are not in `jq`'s arguments), instead of being pasted into the single-quoted `jq` program, so an apostrophe in a URL cannot break the shell quoting. `curl --fail-with-body` makes an HTTP status of 400 or greater a failure (exit code 22), and the block keeps that status: `rc=$?` after the request (`rc=1` when nothing is sent), then `unset`, then `[ "$rc" -eq 0 ]` as the last command, which sets the exit status (0, or 1 on failure) without exiting an interactive shell. The URL, headers and every other body field are unchanged. The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token or the client secret, and `TOKEN` and `OAUTH_CLIENT_SECRET` do not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values is not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN OAUTH_CLIENT_SECRET BODY OAUTH_AUTH_URI OAUTH_TOKEN_URI; if IFS= read -r OAUTH_AUTH_URI && IFS= read -r OAUTH_TOKEN_URI && IFS= read -rs OAUTH_CLIENT_SECRET &&
  [ -n "$OAUTH_AUTH_URI" ] && [ -n "$OAUTH_TOKEN_URI" ] && [ -n "$OAUTH_CLIENT_SECRET" ]; then
BODY=$(printf '%s\n' "$OAUTH_AUTH_URI" "$OAUTH_TOKEN_URI" "$OAUTH_CLIENT_SECRET" |
jq -Rn '[inputs] as [$authorization_uri, $token_uri, $client_secret] | {
      "name": "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID",
      "serverSideOauth2": {
         "clientId": "OAUTH_CLIENT_ID",
         "clientSecret": $client_secret,
         "authorizationUri": $authorization_uri,
         "tokenUri": $token_uri
      }
   }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" | curl -q --fail-with-body -X POST \
   -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
   -H "Content-Type: application/json" \
   -H "X-Goog-User-Project: PROJECT_ID" \
   "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_NUMBER/locations/LOCATION/authorizations?authorizationId=AUTH_ID" \
   --data @-
rc=$?
else
  echo "A value is empty or the input ended; authorization request not sent." >&2
  rc=1
fi; unset OAUTH_CLIENT_SECRET BODY TOKEN; [ "$rc" -eq 0 ] )
```

### Register an ADK agent

The `authorizationConfig` object is needed only when you created an authorization resource (see above) so that the agent can access Google Cloud resources on behalf of the user; if the agent doesn't need OAuth, omit `authorizationConfig` (and its `toolAuthorizations` entry) from the body.

Run the command by itself and type each value on its own line at the prompts, in this order: `DISPLAY_NAME`, `DESCRIPTION`, `ICON_URI`; `jq` (required) encodes each one as a JSON string, and nothing is sent if a value is missing or empty. A line that follows the command in the same paste or script is read as a value.

Adapted (not in the official docs): the two `locations/global` segments (the engine path in the URL and the `toolAuthorizations` entry) are replaced with `locations/LOCATION`, so the request names the app and the authorization resource in the location where they were created; with `LOCATION` = `global` the request is the same as the source's. The project in the `reasoningEngine` value is the separate placeholder `RUNTIME_PROJECT_ID` (the source writes `PROJECT_ID`, the same placeholder as the app's project in the URL), because the Agent Runtime agent can be hosted in a different project. Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`DISPLAY_NAME`, `DESCRIPTION`, `ICON_URI`), checked to be non-empty with `[ -n ... ]` after all of them are read, and sent on standard input with `--data @-`, instead of putting `"DISPLAY_NAME"`, `"DESCRIPTION"`, `"ICON_URI"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN DISPLAY_NAME DESCRIPTION ICON_URI BODY; IFS= read -r DISPLAY_NAME && IFS= read -r DESCRIPTION && IFS= read -r ICON_URI &&
[ -n "$DISPLAY_NAME" ] && [ -n "$DESCRIPTION" ] && [ -n "$ICON_URI" ] &&
BODY=$(printf '%s\n' "$DISPLAY_NAME" "$DESCRIPTION" "$ICON_URI" |
jq -Rn '[inputs] as [$display_name, $description, $icon_uri] | {
         "displayName": $display_name,
         "description": $description,
         "icon": {
            "uri": $icon_uri
         },
         "adkAgentDefinition": {
            "provisionedReasoningEngine": {
               "reasoningEngine": "projects/RUNTIME_PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"
            }
         },
         "authorizationConfig": {
            "toolAuthorizations": [
               "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID"
            ]
         }
      }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
   curl -q --fail-with-body -X POST \
      -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
      -H "Content-Type: application/json" \
      -H "X-Goog-User-Project: PROJECT_ID" \
      "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents" \
      --data @- )
```

### List agents connected to an app

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents" )
```

If the agent is not prebuilt by Google, the response includes a `name` field whose last path segment is the Agent ID:

```text
{
"name": "projects/123456/locations/global/collections/default_collection/engines/my-app/assistants/default_assistant/agents/12345678901234567890",
...
}
```

### View the details of an ADK agent

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents/AGENT_ID" )
```

### Update an ADK agent

Run the command by itself and type each value on its own line at the prompts, in this order: `DISPLAY_NAME`, `DESCRIPTION`; `jq` (required) encodes each one as a JSON string, and nothing is sent if a value is missing or empty. A line that follows the command in the same paste or script is read as a value.

Adapted (not in the official docs): the `reasoningEngine` string, which the source breaks across lines inside the quotes (`.../reasoningEngine` / `s/RESOURCE_ID"`), is joined into one line, and the trailing comma after the `provisionedReasoningEngine` object is removed, so the body is valid JSON. The project in the `reasoningEngine` value is the separate placeholder `RUNTIME_PROJECT_ID` (the source writes `PROJECT_ID`, the same placeholder as the `X-Goog-User-Project` header), because the Agent Runtime agent can be hosted in a different project. Also, the request body is built with `printf '%s\n' ... | jq -Rn '[inputs] as [...] | {...}'` from the values read by one `IFS= read -r` per placeholder (`DISPLAY_NAME`, `DESCRIPTION`), rejected with `[ -n ... ]` when empty, and sent on standard input with `--data @-`, instead of putting `"DISPLAY_NAME"`, `"DESCRIPTION"` inside the single-quoted `-d '{...}'` argument, so apostrophes, double quotes and backslashes in these values cannot break the shell quoting or the JSON; every other field is unchanged. `printf` is a shell builtin, so these values reach `jq` on standard input, not in its arguments (the process list). The body is built in its own step (`BODY=$(... | jq ...) &&`) and piped to `curl` with the `printf` builtin, so a `jq` error stops the command before `curl` runs. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN DISPLAY_NAME DESCRIPTION BODY; IFS= read -r DISPLAY_NAME && IFS= read -r DESCRIPTION &&
[ -n "$DISPLAY_NAME" ] && [ -n "$DESCRIPTION" ] &&
BODY=$(printf '%s\n' "$DISPLAY_NAME" "$DESCRIPTION" |
jq -Rn '[inputs] as [$display_name, $description] | {
         "displayName": $display_name,
         "description": $description,
         "adkAgentDefinition": {
         "provisionedReasoningEngine": {
            "reasoningEngine":
            "projects/RUNTIME_PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"
         }
      }
   }') &&
TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
printf '%s' "$BODY" |
curl -q --fail-with-body -X PATCH \
   -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
   -H "Content-Type: application/json" \
   -H "X-Goog-User-Project: PROJECT_ID" \
   "https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/AGENT_RESOURCE_NAME" \
   --data @- )
```

### Delete an ADK agent

Adapted (not in the official docs): The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X DELETE \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents/AGENT_ID" )
```

## Options / Props

### Agent governance

| Agent governance | Description |
|---|---|
| Secure communication | The connection between Agent Runtime and Gemini Enterprise is compliant with VPC Service Controls (VPC-SC), ensuring secure data exchange. |
| Cross-project agent support | You can connect ADK agents hosted in a different Google Cloud project. Gemini Enterprise uses Google Cloud's secure private networking for these cross-project connections. |
| Personalized interactions | ADK agents receive the user's email address from Gemini Enterprise, so agents can recognize individual users and personalize responses based on identity and permissions. |

### Placeholders

| Placeholder | Description |
|---|---|
| `ENDPOINT_LOCATION` | The multi-region for the API request: `us` (US multi-region), `eu` (EU multi-region) or `global` (Global location). For the `global` host form, see Notes. |
| `LOCATION` | The multi-region of the app / data store: `global`, `us` or `eu`. |
| `PROJECT_ID` / `PROJECT_NUMBER` | The ID / number of the Google Cloud project. |
| `APP_ID` | The unique identifier of the Gemini Enterprise app. |
| `AUTH_ID` | The ID of the authorization resource (an arbitrary alphanumeric ID that you define; referenced later when registering an agent that requires OAuth). |
| `ICON_URI` | The public URI of the icon; alternatively pass Base64-encoded image file contents and use `icon.content`. |
| `RESOURCE_ID` | The ID of the Agent Runtime endpoint where the ADK agent is deployed. |
| `RUNTIME_PROJECT_ID` | The ID of the Google Cloud project that hosts the Agent Runtime agent (added; see Notes). Same as `PROJECT_ID` when the agent and the app are in the same project. |
| `RESOURCE_LOCATION` | The cloud location of the Agent Runtime endpoint. |
| `AGENT_ID` | The ID of the agent, found by listing the agents connected to the app. |
| `AGENT_RESOURCE_NAME` | The resource name of the agent registration to update. |

### Agent Runtime location compatibility

| Gemini Enterprise app location | Allowed Agent Runtime location(s) |
|---|---|
| `global` | Any supported Google Cloud region |
| `us` | Any region starting with `us-`, such as `us-central1` or `us-east4` |
| `eu` | Any region starting with `europe-`, such as `europe-west1` or `europe-west3` |

### Authorization URI parameters

| Parameter | Value or action |
|---|---|
| `client_id` | The `client_id` found in the downloaded OAuth client JSON. |
| `redirect_uri` | Must be `https://vertexaisearch.cloud.google.com/static/oauth/oauth.html`. |
| `scope` | The Google API scopes the app needs; separate multiple scopes with a space (`%20` in the URL). |
| `include_granted_scopes` | Must be `true`. |
| `response_type` | Must be `code`. |
| `access_type` | `offline`, to receive a refresh token. |
| `prompt` | `consent`, so the user is always shown a consent screen. |

## Notes

- Requirements: the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`), the Discovery Engine API enabled (the API behind Agent Search and Gemini Enterprise keeps the name Discovery Engine), an existing Gemini Enterprise app, and an ADK agent hosted on Agent Runtime. The agent must be hosted and maintained on Agent Runtime to work in Gemini Enterprise. If the ADK agent is hosted in a different Google Cloud project than the Gemini Enterprise app, you must grant the necessary permissions first: https://docs.cloud.google.com/gemini/enterprise/docs/configure-cross-project-adk-agents.
- Agent Runtime ML processing terms apply to registered agents (see Agent Runtime limitations on the Gemini Enterprise locations page).
- Model Armor: to secure ADK agents, developers must configure Model Armor using the REST API within the agent's application code. The Model Armor settings in the Google Cloud console for Gemini Enterprise do not automatically protect ADK agents.
- Optional authorization: create an OAuth client ID (application type Web application) with the authorized redirect URIs `https://vertexaisearch.cloud.google.com/oauth-redirect` and `https://vertexaisearch.cloud.google.com/static/oauth/oauth.html`, then download the JSON (Client ID, Authorization URI, Token URI, Client secret). The authorization resource carries a client secret: store it securely and do not commit it.
- Quota: registering an agent consumes one unit of the project's pooled daily agent creation quota (`discoveryengine.googleapis.com/agents_tier_enterprise_regional`). Quota follows the Gemini Enterprise Standard licenses (1 creation per user per day, pooled) or Plus licenses (10 per user per day, pooled) distributed to the project; Frontline licenses provide 0 creation quota. Each `agents.create` call counts, so scripts or CI/CD pipelines registering an agent across many apps can hit `HTTP 429 RESOURCE_EXHAUSTED: Agent creation quota exceeded`.
- Update: "You can update all fields during the agent registration. However, the following fields must be updated:" `displayName`, `description` and `reasoningEngine` (as the source writes it). `DISPLAY_NAME` and `DESCRIPTION` are marked required in the placeholder list.
- Corrected from the official docs: the source's register example writes `.../locations/global/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents` and `"projects/PROJECT_NUMBER/locations/global/authorizations/AUTH_ID"` while its host is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` with `us` / `eu` / `global`. The same source creates the authorization resource as `"name": "projects/PROJECT_NUMBER/locations/LOCATION/authorizations/AUTH_ID"` and lists, views and deletes agents of the same app at `.../locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents`; the A2A registration page registers at the same path with `locations/LOCATION` and references `"agentAuthorization": "projects/PROJECT_ID/locations/LOCATION/authorizations/AUTH_ID"`. The example above therefore uses `locations/LOCATION` in both places.
- Corrected from the official docs: the register and update examples write `"reasoningEngine": "projects/PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngines/RESOURCE_ID"` and define `PROJECT_ID` as "the ID of your Google Cloud project", the same placeholder as the app's project in the register URL and the `X-Goog-User-Project` header. The same source says "You can connect ADK agents hosted in a different Google Cloud" project and "If your ADK agent is hosted in a different Google Cloud project than your Gemini Enterprise app, you must grant necessary permissions." The examples therefore use `RUNTIME_PROJECT_ID` for the Agent Runtime project; the source does not name a separate placeholder.
- Adapted from the official docs: the source's authorization request writes `"clientSecret": "OAUTH_CLIENT_SECRET"` inside the `curl -d '{...}'` argument, so the real secret would land in the shell history and in the process arguments of `curl`. The example reads it with `read -rs`, builds the body with `jq -Rn` from standard input and sends it with `--data @-` only when every `read` succeeds and the two URLs and the secret are non-empty (otherwise it prints `A value is empty or the input ended; authorization request not sent.` to standard error and sends nothing), then unsets the variable (tested with `jq` 1.7.1: the resulting body equals the source's body with the secret substituted, including quotes, backslashes and `$` in the secret). The source also writes `"authorizationUri": "OAUTH_AUTH_URI"` and `"tokenUri": "OAUTH_TOKEN_URI"` in that argument; the example reads both URLs with `IFS= read -r` and passes them to `jq` on standard input too (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one."). The source's `curl -X POST` reports success whatever the HTTP status; the example adds `--fail-with-body` and ends with a non-zero status after `unset` when the request failed (local `man curl`, curl 8.7.1: "(HTTP) Return an error on server errors where the HTTP response code is 400 or greater)." ... "This option is mutually exclusive to -f, --fail. Added in 7.76.0.").
- Calling the agent: the streamAssist page states "A2A or ADK agents registered to a Gemini Enterprise app are not supported through `streamAssist`." (https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-streamassist); a registered ADK agent is used from the Gemini Enterprise web app.
- Delete removes the agent registration from the app; try it in a disposable project first. The source's example result is a long-running-style response `{"name": ".../operations/delete-agent-12345678901234567890", "done": true}`.
- Corrected from the official docs: the source's PATCH example splits the string `"projects/PROJECT_ID/locations/RESOURCE_LOCATION/reasoningEngine` / `s/RESOURCE_ID"` across two lines (a raw line break inside a JSON string is invalid) and leaves a trailing comma (`},` before the closing brace). The `discoveryengine.v1alpha` Discovery document gives the format `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}`; the body above joins the string to that form and removes the comma, keeping the source's other lines and indentation.
- `authorizationConfig`: the source says "If you obtained the authorization details and want the agent to access Google Cloud resources on behalf of the user, add the `authorization_config` field to your JSON resource." The `discoveryengine.v1alpha` Discovery document describes `Agent.authorizationConfig` as "Optional. The authorizations that are required by the agent."
- API version: all agent endpoints on this page use `v1alpha` (the Discovery Engine Discovery document defines `adkAgentDefinition.provisionedReasoningEngine.reasoningEngine`, `authorizationConfig.toolAuthorizations` and `serverSideOauth2` in `v1alpha`).
- Best practices for latency and reliability: minimize sequential multi-agent hops and redundant summarization (wrap sub-agents with `AgentTool(..., skip_summarization=True)` when the parent does not need to re-summarize); configure `min_instances`, `resource_limits` (`cpu` and `memory`) and `container_concurrency` when deploying to Agent Runtime; pin the same versions of `google-adk`, `google-cloud-aiplatform` and `cloudpickle` in the deployment `requirements` as in the local build; use the `global` endpoint (or Provisioned Throughput) for Gemini model calls on Vertex AI and set explicit connection timeouts and bounded retries on external tool calls.
- Agents are Google ADK / Agent Runtime agents, not Claude Code or Agent SDK agents.
- The source also shows Console steps for registering, updating and the authorization form, and a sample `fun_facts` agent in the `adk-samples` repository.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Corrected from the official docs: the source writes free-text placeholders inside the single-quoted `curl -d '{...}'` body (`"displayName": "DISPLAY_NAME"`, `"description": "DESCRIPTION"`, and in the register example `"uri": "ICON_URI"`). Replacing them with text that contains an apostrophe ends the shell quoting, and text with `"` or `\` makes the JSON invalid, so the body is built with `jq -Rn` from the values, which the `printf` builtin writes to its standard input (not its arguments), and sent with `--data @-` (`man jq` 1.7.1: `--raw-input / -R` "each line of text is passed to the filter as a string"; `inputs` "Outputs all remaining inputs, one by one.").
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token or the client secret, and `TOKEN` and `OAUTH_CLIENT_SECRET` do not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values is not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-adk-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [register-and-manage-an-a2a-agent.md](./register-and-manage-an-a2a-agent.md)
- [share-custom-agents.md](./share-custom-agents.md)
- [import-govern-agent-registry.md](./import-govern-agent-registry.md)
