---
source: https://docs.cloud.google.com/gemini/enterprise/docs/agents-overview
---

# Gemini Enterprise agents overview, Core Assistant and Agent Gallery

Gemini Enterprise (formerly Agentspace) centrally manages agents from Google, third parties and internal teams: agent types, viewing agents, agent identity, management tasks and agent states. This page also covers Core Assistant, the Google-provided default agent, and Agent Gallery, where users of the web app discover, run and organize agents.

## Signature / Usage

### List the agents registered to an app (`v1alpha`)

To list the agents registered to your app (engine) and discover their numeric IDs, call the `agents` collection of the `default_assistant` on the `v1alpha` endpoint:

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (`global`, `us` or `eu`) while `ENDPOINT_LOCATION` is `us` or `eu`; for an app in `global`, the source says to "omit the location prefix from the hostname (`discoveryengine.googleapis.com`)". Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant/agents" )
```

The `agentId` is the final segment of the agent's full resource name; registered agents use a long numeric ID (for example `15492003793394502655`) rather than a display name:

```text
projects/{project}/locations/{location}/collections/{collection}/engines/{engine}/assistants/{assistant}/agents/{AGENT_ID}
```

### Invoke a registered agent with the StreamAssist API (`v1`)

Call a specific registered agent from custom applications, orchestrators or scripts by naming its numeric `agentId` in `agentsSpec`. The streamAssist page lists the supported agent types as Core Assistant, Deep Research, Workflow Builder chat agents (formerly low-code) and Workflow Builder workflows, and states: "A2A or ADK agents registered to a Gemini Enterprise app are not supported through `streamAssist`." Call a registered A2A agent through its registry A2A endpoint instead (https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-a2a):

Adapted (not in the official docs): the hostname is `ENDPOINT_LOCATION-discoveryengine.googleapis.com` instead of the source's `LOCATION-discoveryengine.googleapis.com`, so that the resource path keeps `locations/LOCATION` (`global`, `us` or `eu`) while `ENDPOINT_LOCATION` is `us` or `eu`; for an app in `global`, the source says to "omit the location prefix from the hostname (`discoveryengine.googleapis.com`)". Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--no-buffer` prints streamed chunks as they arrive. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body --no-buffer -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID/assistants/default_assistant:streamAssist" \
  -d '{
    "query": {
      "text": "List all contact cards."
    },
    "agentsSpec": {
      "agentSpecs": [
        {
          "agentId": "AGENT_ID"
        }
      ]
    }
  }' )
```

### View agents in the console

In the Google Cloud console, go to the Gemini Enterprise page, click the name of the app that has the agents, then click **Agents**. The **Agent state** column of the Agents table shows each agent's state.

### Core Assistant

Core Assistant is the Google-provided ("Made by Google") agent that handles interactions when users talk to the Gemini Enterprise engine without specifying any other agent. It is available automatically with Gemini Enterprise and includes monitoring and observability through two console tabs:

- **Traces**: a chronological summary of trace records showing parent-child execution span details (`Agent to Tool`, `Invoke Agent` and `Agent to Model` actions, including `execute_tool` and `invoke_connector` operations). Traces persist for 30 days and require OpenTelemetry traces and logs to be turned on in the observability settings, plus the Cloud Trace User role (`roles/cloudtrace.user`).
- **Metrics**: an operational overview dashboard of sessions, count of agent invocations, traffic, error rates and connections of tools usage. Metrics persist for 6 weeks (42 days), are on by default, require no configuration and incur no extra billing costs.

Key characteristics of Core Assistant:

- Google-managed: entirely maintained and managed by Google; you cannot edit its configuration or change the charts and data shown.
- Always available: automatically provisioned and runs out of the box for Gemini Enterprise agents.
- Access: viewable through the Google Cloud console.

Prerequisites: the Gemini Enterprise Admin role (`roles/discoveryengine.agentspaceAdmin`) or the Google Cloud console Gemini Enterprise User role (`roles/discoveryengine.agentspaceUser`), and an existing Gemini Enterprise app.

### Agent Gallery

Agent Gallery lets users discover, run and organize prebuilt and custom agents. To open it, click **Agents** in the app navigation menu of the web app.

- Search: click the search bar and enter the name, function or keyword; the gallery updates in real time and matching agents stay grouped by category. When a search is active, the filter chip row shows only categories that contain matching agents.
- Filter chips: **All** (all accessible agents across all categories, the default view); **Pinned** (only agents you pinned); **Made by Google** (ready-to-use first-party agents such as Deep Research, Gemini Notebook Enterprise and Co-Scientist); **From your organization** (custom agents created by colleagues and shared with your team or workspace); **Your agents** (custom agents you created in Workflow Builder, with a status such as **Draft** or **Live**); **Marketplace** (third-party partner agents available to request from your administrator). **Show more** / **Show less** expands or collapses a category grid.
- Pin: click the **Pin** icon on a card; the agent appears in the **Pinned** section and in the left navigation menu under **Agents**. Pin selections persist across web sessions.
- Run, create, edit: click a card or type `@agent_name` in a conversation; **+ New agent** opens Workflow Builder for chat agents (conversational) or workflows (multi-step, configured with triggers and connector actions); the more options menu on a **Your agents** card edits, shares or deletes the agent.
- Marketplace: select the **Marketplace** chip, click the agent card and click **Request access**. After approval you get a notification at the bell icon, the agent appears in **From your organization**, and you can run it with `@agent_name`.

## Options / Props

### Agent types

| Agent type | Gemini Enterprise tool | Description |
|---|---|---|
| Employee-made agents from your organization | Workflow Builder | Interactive no-code, low-code tool that lets users create, launch and manage single and multi-step agents on the web app. An admin must turn on the **Enable Workflow Builder** toggle on the **End user features control** page (Manage web app features). |
| Google-made agents | Core Assistant | Handles interactions when users talk to the Gemini Enterprise engine without specifying any other agent. |
| Google-made agents | Deep Research | Helps users perform in-depth exploration of topics. |
| Custom agents from your organization | ADK agents hosted on Agent Runtime on Gemini Enterprise Agent Platform | Admins can register custom agents built by your organization and hosted on Agent Runtime (formerly Vertex AI Agent Engine), making them available on the web app. |
| Custom agents from your organization | Agent2Agent (A2A) | Admins can register custom agents built using the A2A Protocol. A2A agents in Agent Registry can also be discovered and added to apps (import A2A agents from Agent Registry). |
| Custom agents from your organization | Dialogflow | Admins can register conversational agents built with Dialogflow, making them available on the web app. |
| Custom agents from your organization | | |

### Management tasks (Agents page in the console)

| Task | Description |
|---|---|
| Update an agent | Update the details of an A2A, ADK or Dialogflow agent. |
| Test an agent | On the **Agents** page, open the menu next to the agent and click **Preview**; this opens the agent in the Gemini Enterprise app. |
| Invoke an agent programmatically | Call a specific registered agent from custom applications, orchestrators or scripts: Core Assistant, Deep Research, Workflow Builder chat agents and Workflow Builder workflows with the StreamAssist API; an A2A agent through its registry A2A endpoint (A2A and ADK agents are not supported through `streamAssist`; see the StreamAssist section above). |
| Share an agent or transfer ownership | Share available agents or transfer ownership of shared agents in the Google Cloud console. |
| Configure agent sharing by end users and review their requests to share | For Workflow Builder agents, let end users share agents through email addresses or groups and configure whether sharing requires administrator review and approval: settings **Enable agent sharing**, **Enable agent sharing without admin approval** and **Enable End Users to share with Groups** in Manage features on the web app. |
| Delete an agent | On the **Agents** page, open the menu next to the agent and click **Delete**; the agent is removed from the **Agents** page and the web app. |

### Agent states

| State | Description |
|---|---|
| Private | Intended for personal use; only its creator can chat with it. Users with the `discoveryengine.agents.manage` permission (such as Gemini Enterprise Admin, `roles/discoveryengine.agentspaceAdmin`, and Discovery Engine Editor, `roles/discoveryengine.editor`) can view its details but can't use it. After the status is changed to Enabled, the agent is visible to other users on the web app. |
| Suspended | Temporarily deactivated. Remains visible in the Agent Gallery with a message explaining its deactivation; users can't interact with it, owners and admins retain full access. |
| Enabled | Active and available on the web app; authorized users can interact with it as intended. |
| Disabled | Inactive and hidden from the Agent Gallery. Users can't interact with it until the owner or an admin re-enables it; the owner and users with `discoveryengine.agents.manage` can still view and chat with it. |

### Agent Gallery features

| Feature | Action | Where it appears |
|---|---|---|
| Search bar | Find agents by name or description keyword in real time. | Top of the gallery. |
| Filter chips | Filter visible agents by category (`All`, `Pinned`, `Made by Google`, `From your organization`, `Your agents`, `Marketplace`). | Below the search bar. |
| Pinned agents | Pin frequently used agents for rapid one-click access. | Pinned gallery section and the left navigation menu. |
| + New agent | Open Workflow Builder to build a new custom agent. | Upper-right corner of the gallery. |

## Notes

- Agent identity: an administrator can view an agent's identity, typically its SPIFFE ID, which is visible only if the publisher made it available; otherwise the Agent Registry resource ID is displayed. For A2A agents that use an agent identity you can configure 3-legged OAuth (3LO) with Agent Identity auth manager so the agent can authenticate to downstream MCP servers and third-party APIs on behalf of the user.
- Source inconsistency: the twin's agent-type table ends with a truncated row ("Custom agents from your organization" with no further cells); the row is kept empty as in the source.
- API versions: the agents list call uses the `v1alpha` endpoint (`engines.assistants.agents.list` exists in the `discoveryengine` `v1alpha` Discovery document), while `streamAssist` is called on `v1`. For `LOCATION` = `global`, the Python sample of the same source page uses the default endpoint `discoveryengine.googleapis.com` and sets a regional `api_endpoint` only for other locations.
- Corrected from the official docs: the borrowed streamAssist examples write the host as `"https://LOCATION-discoveryengine.googleapis.com/v1alpha/projects/PROJECT_ID/locations/LOCATION/..."` (and `/v1/` for `streamAssist`), with the same `LOCATION` in the host and the path. Substituting `global` gives `global-discoveryengine.googleapis.com`, which contradicts the source's instruction "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The host prefix is the separate placeholder `ENDPOINT_LOCATION`.
- Made by Google agents (Core Assistant, Deep Research and others) aren't available in the Gemini Enterprise Frontline edition. In Frontline, access to agents created by your organization is limited to agents provisioned by your administrator; full access needs Gemini Enterprise Standard or Gemini Enterprise Plus.
- Core Assistant Traces field details, graphs and timelines are on the "Access traces for agents" page; metric dashboards on "Access metrics for agents".
- Deleting an agent removes it from the app for all users; try it in a disposable project first.
- Adapted from the official docs: the source's "Invoke an agent programmatically" row links the StreamAssist and registry A2A endpoint guides without saying which agents each covers; the row adds the streamAssist page's supported agent types and its limitation.
- Distance: these are Google's agents built with ADK, A2A, Dialogflow or Workflow Builder and hosted on Agent Runtime; they are not Claude Code, Claude Agent SDK or OpenAI Agents SDK agents.
- Snippet taken from https://docs.cloud.google.com/gemini/enterprise/docs/invoke-agent-streamassist (the "Find the agent ID" section and the StreamAssist request; the source also shows a session-scoped request and a Python client sample).
- Source inconsistency (global host): for a `global` app, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...` (`ENDPOINT_LOCATION` = `global` on those pages), while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. This page follows the streamAssist page, from which its snippets are taken: `ENDPOINT_LOCATION` is `us` or `eu`, and a `global` app uses `discoveryengine.googleapis.com` (see the Corrected line above).
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/agents-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/core-assistant (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/agent-gallery (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [configure-assistant.md](./configure-assistant.md)
- [create-app.md](./create-app.md)
- [editions.md](./editions.md)
