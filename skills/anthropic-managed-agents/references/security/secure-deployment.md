<!-- source: https://platform.claude.com/docs/en/managed-agents/secure-deployment / last verified: 2026-10-17 -->

# Secure your Managed Agents deployment

Settings that limit what an agent on Claude Managed Agents can reach and do, most important first (beta header `managed-agents-2026-04-01`).

## Signature / Usage

Limited-network cloud environment (set `networking` in every create request; omitting it might yield `unrestricted`):

```bash
curl -fsS https://api.anthropic.com/v1/environments \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{
    "name": "support-agent",
    "config": {
      "type": "cloud",
      "networking": {
        "type": "limited",
        "allowed_hosts": ["help.example.com"]
      }
    }
  }'
```

Smallest tool set with per-tool permission policies and a web domain allowlist:

```python
tools = [
    {
        "type": "agent_toolset_20260401",
        "default_config": {
            "enabled": False,
            "permission_policy": {"type": "always_ask"},
        },
        "configs": [
            {"name": "read", "enabled": True, "permission_policy": {"type": "always_allow"}},
            {"name": "write", "enabled": True, "permission_policy": {"type": "auto"}},
            {
                "name": "web_fetch",
                "enabled": True,
                "allowed_domains": ["help.example.com"],
                "permission_policy": {"type": "auto"},
            },
        ],
    },
]
```

## Options / Props

Checklist (setting or decision / recommended):

| Section | Setting or decision | Recommended |
|---------|---------------------|-------------|
| Choose where the agent runs | Cloud or self-hosted sandbox | Cloud, unless tools must run on infrastructure you control |
| Limit the network | Environment `networking.type` | `limited`, with only the hosts the agent needs |
| Keep credentials in vaults | `injection_location` and `networking` on each environment variable credential | Request headers only, and `limited` networking with only the hosts the key is for |
| Restrict web search and web fetch | `allowed_domains` on each web tool | An allowlist on each tool |
| Approve risky actions | `permission_policy` on each tool | `auto` on `bash` / `write` / `edit` / `web_fetch` / read-only MCP tools; `always_ask` if changes cannot be undone outside the sandbox or relayed end-user text alone should not trigger the tool |
| Smallest tool set | `default_config.enabled` on the agent toolset | `false`, then enable only needed tools |
| Keep untrusted input away from powerful tools | Tools and credentials held while reading untrusted input | No agent reading untrusted input has a writing / command-running / record-changing tool on `always_allow` |
| Set limits and a way to stop | `budget` on each session and deployment | A cap sized to the expected run cost |
| Offline reviewer (optional) | Offline job reading each session's events | Review each idle / terminated session on a schedule |
| Monitor and review retention | Webhooks and session deletion | Alert on idle / budget reached / terminated; store events in your own logs; delete unneeded sessions |

`limited` environment networking settings:

| Setting | What it opens to code in the sandbox | Recommended |
|---------|--------------------------------------|-------------|
| `allowed_hosts` | The hosts you list, for any request | Only needed hosts, including the host of each MCP server you operate or trust |
| `allow_package_managers` | Package manager hosts, including every repository and path on `github.com`, `gitlab.com`, `bitbucket.org` | `false`, unless the environment's `packages` setting lists packages (requires `true`); otherwise list only registry hosts in `allowed_hosts` |
| `allow_mcp_servers` | No host (MCP connections are made from Anthropic's servers) | `false`, with each MCP server host in `allowed_hosts` |

Built-in tool recommended permission policies:

| Tool | Recommended policy |
|------|--------------------|
| `read`, `glob`, `grep` | `always_allow` |
| `bash`, `write`, `edit` | `auto`; `always_ask` if changes cannot be undone outside the sandbox, or on `bash` if you relay end-user text (toolset default is `always_allow`) |
| `web_fetch` | `auto` |
| `web_search` | `always_ask` if queries may contain data you would not want sent; otherwise `always_allow` |
| MCP tools that only read | `auto`, per tool in the toolset's `configs` (toolset default stays `always_ask`) |
| MCP tools that change data | `always_ask` (MCP toolset default) |
| Custom tools | Your code decides; permission policies do not apply |

Host matching differs between the two lists:

| List | Entry | Matches | Does not match |
|------|-------|---------|----------------|
| `allowed_hosts` (environment) | `example.com` | `example.com` | `www.example.com` |
| `allowed_hosts` (environment) | `*.example.com` | Every subdomain | `example.com` |
| `allowed_domains` (web tool) | `example.com` | `example.com` and every subdomain | Other domains |

Stop controls:

| Control | What it does |
|---------|--------------|
| Session budget | Cap on spend at public list prices; at the cap the session and each thread pause; in-progress requests finish, so spend can pass the cap |
| Deployment budget | Same cap on each session a deployment starts |
| `user.interrupt` event | Stops the model response; a running tool call can finish first; session goes `idle` unless a workflow run keeps it `running`; ends no workflow run |
| Archive / delete a session | Archive keeps history and blocks new events; delete removes record, events, sandbox |
| Pause / archive a deployment | Pause stops new scheduled runs (manual runs still allowed); archive ends the schedule permanently |
| Archive / delete a vault or credential | Removes the secret from running sessions (with a delay); interrupt running sessions too |

## Notes

- Self-hosted sandbox: network limits must be set in your own firewall (it does not limit MCP servers an agent declares); web tools run on Anthropic's servers so only their domain lists limit them; environment variable credentials are not yet supported; isolation and hardening are your responsibility.
- `allow_mcp_servers` scope, two separate contracts: (1) MCP host check: while `false`, session creation (and a session update that changes `mcp_servers`) is rejected with 400 if a declared MCP server's host is not in `allowed_hosts`; `true` turns this check off. (2) Sandbox reachability: the Secure deployment guide says it opens no host to code in the sandbox, because Managed Agents connects to MCP servers from Anthropic's servers, while the Environments page describes it as allowing outbound access to agent-configured MCP endpoints beyond `allowed_hosts`. The official pages word this differently and do not reconcile it; the Secure deployment guide recommends the default `false` with each MCP server host you operate or trust listed in `allowed_hosts` (each listed host is also open to code in the sandbox).
- Network access is granted per host, not per operation. The sandbox can send any request to an allowed host (including `git push` and package publishing) and can use any credential the command supplies.
- Avoid `*.` wildcards and shared-hosting domains in `allowed_hosts`; list only hosts you operate or trust.
- After tightening an environment, start new sessions and stop running ones; a running session can keep the old limits until it ends.
- Vault: code in the sandbox sees a placeholder; the real secret is swapped in only in outgoing HTTPS requests to the hosts the credential allows. A credential `networking` of `unrestricted` swaps the secret for any host the environment reaches. A create request that omits `injection_location` enables both header and body; name both fields (`{"header": true, "body": false}`).
- Do not give the agent a Claude API key (even from a vault): code can call the Claude API directly, bypassing tool settings, approvals, and budget. Keep vaults for workloads with different trust levels in separate workspaces and use API keys scoped to one workspace.
- Use a fine-grained GitHub token with minimum permissions for mounted repositories; grant write only if the agent must push.
- `blocked_domains` blocks only listed hosts and subdomains; do not rely on it for security. Use `allowed_domains`.
- In a `limited` environment, a web tool `allowed_domains` entry outside `allowed_hosts` fails session creation with 400 (sessions started by a deployment are created anyway and the tool returns nothing from those hosts). An empty `allowed_hosts` means neither web tool returns anything. An `unrestricted` environment or self-hosted sandbox does not limit the web tools.
- `web_fetch` opens only URLs that have already appeared in the session (user message text, `user.define_outcome` description, web search result addresses, earlier fetched page text, direct custom tool results unless `is_error: true`). Not system prompt, agent configuration, Claude's own output, `bash` / sandbox tool output, MCP tool results, or attached files.
- `auto` is not a human checkpoint: it treats `user.message` text and `user.define_outcome` description as your instruction. A paused session waits indefinitely; unattended sessions need a client that answers paused calls or interrupts. For human review use `always_ask`.
- An agent update replaces the whole `tools` array and reaches only new sessions; deployments pin an agent version, and agents listing it in `subagents.predefined_agents` / `workflows.predefined_agents` keep the pinned version. To tighten an existing session, update its tools while `idle`.
- Untrusted input includes web pages, search results, tickets, emails, repository files, uploads, MCP results, relayed end-user messages. With `read`, `CLAUDE.md` / `AGENTS.md` files (and `@path` references up to five deep) load as instructions in cloud environments; a mounted repository's `.claude/skills` load as agent instructions without review. Attach memory stores as `read_only` unless writes are required (default is `read_write`).
- Recommended designs for untrusted input plus action: split reading and acting across a lead / fetcher / writer in one multiagent session (agents share the sandbox, files, and vault credentials, so for stronger separation use two sessions with separate environments and vaults), give the agent one narrow custom tool, or keep a person in the loop with `always_ask`.
- Budget `max_list_cost.amount` is a whole number of US cents as a string (`"125"` = $1.25). A budget cannot be added to a session created without one; after removing a session's cap a new one cannot be set.
- Stopping an agent: send `user.interrupt` alone; pause/archive the deployment for scheduled agents; rotate any exposed key at its issuer; send a `user.message` asking it to stop open workflow runs; wait for `idle` (a running session cannot be archived or deleted); archive to keep history or delete. An interrupt does not undo prior actions; archiving an agent does not stop running sessions.
- Adapted (not in the official docs; combined from Session budgets and Workflow runs): if workflow runs are open and the session is `idle` with `stop_reason` `budget_reached`, the steps above stall. A `user.interrupt` is accepted but stops nothing, a `user.message` asking the agent to stop its runs returns 400, and archiving or deleting the session might return 400 (`workflow_run_open`). In that case: (1) check the session-level `stop_reason` and `usage.list_cost`; (2) raise the budget (new `max_list_cost` strictly greater than the consumed list cost) or remove it; this resumes every paused run that an interrupt did not also pause (`workflow_run.status_running`), so they spend again until stopped, and a removed cap cannot be set again; (3) send the `user.message` asking the agent to stop its runs; (4) confirm each run you saw created has `workflow_run.status_ended` (result `{"type": "stopped"}`), then wait for `idle` and archive or delete.

## Related

- [Security risks and sandbox boundaries](./secure-deployment-risks.md)
- [Review and monitor agent sessions](./secure-deployment-monitoring.md)
- [Self-hosted sandboxes security model](../environments/self-hosted-sandboxes-security.md)
- [Permission policies](../sessions/permission-policies.md)
- [Web tool domain restrictions](../sessions/tools-web-restrictions.md)
- [Session budgets](../sessions/budgets.md)
