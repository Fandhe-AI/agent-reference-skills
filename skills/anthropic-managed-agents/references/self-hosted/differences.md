<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/differences / last verified: 2026-11-14 -->

# Differences from the hosted service

Which features only self-hosted Claude Managed Agents has, which hosted features it doesn't have, which behave differently, and which need a server setting first. A self-hosted server has the same API as Anthropic's hosted Managed Agents service, apart from these differences. Nothing is copied from the hosted service, session history included: create your agents, skills, vault credentials, and memory stores again on your server. To request access to self-hosted Claude Managed Agents, contact your Anthropic account team.

## Signature / Usage

MCP servers need an allowlist entry. The server connects only to MCP servers whose hosts you list under `mcp.allowed_hostnames` in its settings file:

```yaml
mcp:
  allowed_hostnames:
    - mcp.example.com
```

Git repositories need an allowlist entry (hosts and pushable branches):

```yaml
git:
  allowed_hostnames:
    - github.com
  allowed_push_refs:
    - refs/heads/agent/
```

Web tools need a server setting:

```yaml
web_tools:
  enabled: true
```

## Options / Props

### Features that only your server has

| Feature | What it does | How to set it up |
| --- | --- | --- |
| A choice of inference provider | The server can send model calls to a cloud provider or your own model gateway instead of the Claude API. | Inference provider (`inference-provider.md`) |
| Single sign-on | People call the server with a token from your OpenID Connect identity provider. The server gives each caller a role from the groups in the token. The server API key keeps working. | Single sign-on (`configure#single-sign-on`) |
| Your own secret manager | The server can store the secret of each new vault credential in your secret manager instead of its own database. | Secret manager (`agent-identity#secret-manager`) |
| Agent identity | The server can sign a short-lived token and send it with an agent's calls to an MCP server. The MCP server or gateway checks the token against public keys that you publish. | Agent identity (`agent-identity#agent-identity`) |

### Features that aren't available

| Feature | What happens | What to do instead |
| --- | --- | --- |
| Cloud environments | Only `self_hosted` environments exist. A request for a cloud environment returns a `400` error. | Deploy self-hosted workers for every environment. |
| The rest of the Claude API, such as the Messages API and the Models API | The server doesn't serve it. The SDK's calls to `/v1/messages` and `/v1/models` return a `404` error. | Send those requests to the Claude API or to your provider, from a client that doesn't point at your server. |
| File session resources and the Files API | The server rejects `file` resources, and `/v1/files` doesn't exist. `memory_store` resources work. | Put files in the worker's working directory. See "Move data in and out of a session" in `call-the-api.md`. To show the model an image or a PDF, send it as `base64` in a message. |
| `mcp_oauth` vault credentials | The server rejects them when you create them, because it has no OAuth flow to refresh a token. | Store the token as a `static_bearer` credential. Update the credential with a new token before the old one expires. |
| Prebuilt `docx`, `pdf`, `pptx`, and `xlsx` skills | The server rejects an agent that declares them. Only skills you upload exist. | Download their sources from the skills repository (https://github.com/anthropics/skills) and upload them as custom skills. |
| Scheduled deployments and dreams | The server has no routes for them. | Start sessions from your own scheduler, such as a cron job. Dreams have no replacement. |
| Webhooks | The server sends no webhooks, so a worker that starts on a webhook never starts. | Follow a session through its event stream, or list its events. Keep your workers running so that they can poll. |

### Features that behave differently

| Feature | What's different | What to do |
| --- | --- | --- |
| Claude Console | The Claude Console at platform.claude.com doesn't show what is on your server. | Use the console on your server (`console.md`). |
| Tool calls | A session's model turns run even when no worker is polling its environment. The first tool call then waits, with no error, until a worker runs it. | If a session stops at a tool call, check that a worker is polling its environment. |
| Memory stores | The API is complete. The worker, not the server, copies each attached store into the sandbox and writes changes back. See Memory stores in self-hosted sandboxes. | Run your workers on the latest version of `ant`, with a writable `/mnt/memory` directory. |
| Custom skill uploads | The server doesn't unpack a zip archive. An upload of one returns a `400` error that says `SKILL.md not found in uploaded files`. | `ant apply` and the Python SDK's `files_from_dir` helper work as they are. With anything else, upload the skill's files as separate parts, and start each part's file name with the skill's folder, as in `my-skill/SKILL.md`. |
| Multiagent orchestration | An agent can delegate only to subagents that you list. Dynamic workflows, the advisor, and subagents that the agent defines itself aren't available. The server accepts a `multiagent` (csharp, go: `Multiagent`) block only if its `type` is `coordinator`. The examples in Multiagent orchestration set `type` to `multiagent_20261001`, which returns a `400` error. A block with an `advisor` (csharp, go: `Advisor`) setting returns a `400` error too. | Set `multiagent` (csharp, go: `Multiagent`) to `{"type": "coordinator", "agents": [...]}`. List 1 to 20 agents in `agents` (csharp, go: `Agents`). Each entry takes one of the forms of a predefined agent. |
| GitHub repository session resources | The server rejects `github_repository` resources until you list their Git hosts in its settings. The server doesn't discover skills in a repository's `.claude/skills` directory, so attach skills to the agent. | See "Git repositories need an allowlist entry" in Signature / Usage above. |
| MCP servers | The server connects only to the MCP hosts that you list in its settings. | See "MCP servers need an allowlist entry". |
| Web tools | The `web_search` and `web_fetch` tools are off until you turn them on in the server's settings. | See "Web tools need a server setting". |
| `environment_variable` vault credentials | The server rejects them until you turn on the egress gateway, a proxy between your sandboxes and the internet. | See Environment variable credentials in `agent-identity.md`. Without the gateway, give your sandbox the CLI and API credentials it needs through your own tooling. |
| Custom tool results | The server sends the model the whole text of a custom tool result. If a result is too large for the model's context window, the server still answers with `200`, and the session then ends with a `session.error`. | Shorten long results in your client before you send them. |
| MCP tool results | The server cuts a result that is larger than its `mcp.max_result_bytes` setting, which is 100 KiB by default. It tells the model that the result was cut, and the rest is lost. The hosted service cuts long results too, but can save the full result to a file for a session in a cloud sandbox. | To change the limit, set `mcp.max_result_bytes` in the settings file (see `configuration-reference.md`, "Where settings go"). |
| Images and documents sent by URL | The server accepts an `image` or `document` block with a `url` source, but the model never sees it, and there is no error. The same happens to an `image` block with a `file` source. | Send the data as `base64`, or as `text` for a document. |
| The `rescheduling` session status | The server retries a model call that fails for a temporary reason and reports each attempt on the event stream, as the hosted service does. The session's status stays `running` between attempts, so a `statuses[]=rescheduling` filter matches no sessions. | Read retries from the event stream. |
| Session metadata, with a model gateway | If the server's `inference.credentials.assertion.forward_metadata` setting lists session metadata keys, an update that adds, removes, or changes one of them returns a `400` error. | Set those keys when you create the session. For the setting, see "Short-lived gateway tokens" in `configuration-reference.md`. |

### Git repositories: points to note

- **URL:** The host doesn't have to be `github.com`, but the URL must use HTTPS.
- **Token:** The token that your client sends never reaches the sandbox, because Git traffic goes through your server, which adds the token.
- **Branches:** Agents aren't told the list of branches, so name a branch in your prompt.
- **Force pushes:** The server doesn't refuse force pushes, so an agent can overwrite any branch that you list. To refuse force pushes, protect the branch on your Git host.

### MCP URL rules

An MCP server inside your private network needs no MCP tunnel. Put its URL in the agent definition and add its host to the allowlist. Two rules apply to the URL:

- It must use `https`, unless the MCP server is on the loopback address.
- If its host is a name that resolves only to private or reserved addresses, your server refuses to connect by default.

| Your case | Fix |
| --- | --- |
| The address is in `10.0.0.0/8`, `172.16.0.0/12`, or `192.168.0.0/16`, and you control the name's DNS records | Keep the name, and also list it under `mcp.private_hostnames` in the settings file. |
| Any other case | Use the IP address in place of the name, in the URL and on the allowlist. The MCP server's certificate must name that address. |

### Web tools while off

While the tools are off, what happens to an agent depends on the `web_search` and `web_fetch` entries in its toolset:

| The toolset has | What happens |
| --- | --- |
| No entry for either tool | The agent runs without the tools, and no error says so. |
| An entry that only turns its tool off, such as `{"name": "web_fetch", "enabled": false}` | The same. |
| An entry that leaves its tool on, or that sets its domain lists, content limit, or location | The server refuses to save the agent, or to start a session for it. |

### Differences that depend on your inference provider

Some features work only under some values of the server's `inference.provider` setting. Some of these cases return no error. The `web_search` and `web_fetch` rows apply after you turn the web tools on; until then, neither tool works under any provider.

| Feature | Works when `inference.provider` is | Under the other values | What to do |
| --- | --- | --- | --- |
| `web_search` tool | `anthropic`, `vertex`, `foundry` | The server never offers the tool to the model. Agents still save and run, and still list the tool, but the model can't call it. | Give the agent a custom tool or an MCP server that searches. |
| `web_fetch` tool | `anthropic`, `foundry` | The same as for `web_search`. | Give the agent a custom tool or an MCP server that fetches pages. |
| `inference_geo` (java, php: `inferenceGeo`; csharp, go: `InferenceGeo`) | `anthropic` | The server refuses to save an agent that sets it. | Remove `inference_geo` (java, php: `inferenceGeo`; csharp, go: `InferenceGeo`) from the agent. |
| Fast mode (`speed: "fast"`) | Depends on the provider and on the agent's model | An agent that sets it has to pass two checks. **When you save the agent:** The server's model catalog must list the agent's model as one that accepts fast mode. Otherwise, the server refuses to save the agent. **On each turn:** If the provider doesn't serve fast mode for that model or deployment, the turn ends with an error. | Remove `speed` (csharp, go: `Speed`) from the agent. See "Models that accept fast mode" below. |

### Models that accept fast mode

By default, the server's model catalog lists four models as ones that accept fast mode: Claude Opus 5.5, Claude Opus 5, Claude Opus 4.8, and Claude Opus 4.6. On Claude Opus 4.6, the Claude API accepts the request but runs it at standard speed. These values of `inference.provider` are exceptions:

- **`foundry`:** The catalog lists Claude Opus 5.5 alone.
- **`gateway` with `format: vertex-raw-predict`:** The catalog lists no model.
- **`vertex`:** The catalog lists no model, and no setting changes that.

To change what the catalog lists, see "Model entries" in `configuration-reference.md`.

## Notes

- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/differences.md (fetched 2026-11-14)
- Self-hosted Claude Managed Agents (this category) means you host the whole service. This differs from `self_hosted` environments / self-hosted sandboxes (workers, see `../environments/self-hosted-sandboxes*.md`), where Anthropic hosts the service and you host only the tool-execution worker.
- Hosts in `mcp.allowed_hostnames` match exactly, with no wildcards and no subdomains, and the list is empty by default. Until an MCP server's host is on the list, your server refuses to save an agent that names it.
- The server rejects `github_repository` resources until their Git hosts are listed. On the hosted service, sessions that use self-hosted sandboxes can't have `github_repository` resources; on your server, sessions can.
- If a Git clone fails, the session gets a `session.error` event that names the cause. To check a push, look for the branch on your Git host; the server's log says `ok` even for a push that your host refused.
- With `web_tools.enabled: true` alone, each agent's own domain lists and content limit apply, as on the hosted service. To limit the tools for every agent, set `web_tools.allowed_domains`, `web_tools.blocked_domains`, or `web_tools.max_content_tokens`; each of these also turns the tools on. The server refuses to save an agent that asks for more than these settings allow (for example, an allowed domain outside `web_tools.allowed_domains`, or a larger content limit). If such an agent already exists, it can't start a session until you update it.
- Under `anthropic`, the server asks for the Claude API's server-side fallback by default. When a safety classifier declines a request, another Claude model, possibly a less capable one, can then answer it. Anthropic picks the model, and no event reports the change, but a read of the session shows that model's ID. To turn fallback off, set `inference.model_fallback: false`. Under the other providers, such a request ends the turn with a refusal.
- Your provider's documentation says which models and regions support each feature. Custom tools, MCP tools, and the tools that your worker runs are the same under every provider.
- If you already run self-hosted sandboxes: the worker software is the same, so your workers can connect to your server. See "Point a worker at your server" in `call-the-api.md` for the three values for the process that polls and what to change first. A worker that starts on a webhook doesn't work here.

## Related

- [overview](./overview.md)
- [call-the-api](./call-the-api.md)
- [configuration-reference](./configuration-reference.md)
- [inference-provider](./inference-provider.md)
- [agent-identity](./agent-identity.md)
- [single-sign-on](./single-sign-on.md)
- [console](./console.md)
