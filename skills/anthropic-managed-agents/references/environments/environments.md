<!-- source: https://platform.claude.com/docs/en/managed-agents/environments / last verified: 2026-10-17 -->

# Cloud environment setup

Environments define the sandbox configuration where an agent runs. Create one, then reference its ID from any session; each session gets its own isolated sandbox (a fresh Linux container) even when environments are shared. This page covers `type: cloud`; for your own infrastructure see self-hosted sandboxes.

## Signature / Usage

```python
environment = client.beta.environments.create(
    name="python-dev",
    config={"type": "cloud", "networking": {"type": "unrestricted"}},
)
session = client.beta.sessions.create(agent=agent.id, environment_id=environment.id)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `config.packages.{apt,cargo,gem,go,npm,pip}` | array | Packages pre-installed before the agent starts, cached across sessions sharing the environment; installed alphabetically by manager; pin versions optionally |
| `config.networking.type` | string | `unrestricted` (default; full outbound access minus a safety blocklist) or `limited` |
| `config.networking.allowed_hosts` | array | `limited` mode only: bare hostnames or wildcard patterns (`*.example.com`), no scheme/port/path. A bare hostname matches that exact host (`example.com` does not match `www.example.com`); `*.example.com` matches every subdomain but not `example.com` itself. With no other fields set, no hosts are allowed |
| `config.networking.allow_mcp_servers` | boolean | `limited` mode: allow outbound access to agent-configured MCP endpoints beyond `allowed_hosts` (default `false`). While `false`, session creation fails with 400 if the agent (or an agent it can delegate to) declares an MCP server whose host is not in `allowed_hosts` |
| `config.networking.allow_package_managers` | boolean | `limited` mode: allow outbound access to public package registries and code hosts beyond `allowed_hosts` (default `false`). Must be `true` whenever the environment specifies `packages`, otherwise the request is rejected with 400 |

### Package manager hosts

When `allow_package_managers` is `true`, the sandbox can also reach these hosts (Anthropic maintains this list and can change it):

| Ecosystem | Hosts |
|-----------|-------|
| Code hosting | `github.com`, `api.github.com`, `codeload.github.com`, `raw.githubusercontent.com`, `objects.githubusercontent.com`, `release-assets.githubusercontent.com`, `gitlab.com`, `bitbucket.org` |
| Node.js | `registry.npmjs.org`, `registry.yarnpkg.com`, `nodejs.org` |
| Python | `pypi.org`, `files.pythonhosted.org` |
| Rust | `crates.io`, `index.crates.io`, `static.crates.io`, `static.rust-lang.org` |
| Go | `proxy.golang.org`, `sum.golang.org` |
| Java | `repo1.maven.org`, `repo.maven.apache.org`, `services.gradle.org`, `plugins.gradle.org`, `plugins-artifacts.gradle.org` |
| Ruby | `rubygems.org`, `index.rubygems.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Ubuntu (apt) | `archive.ubuntu.com`, `security.ubuntu.com`, `ppa.launchpad.net` |
| Containers | `registry-1.docker.io`, `auth.docker.io`, `production.cloudflare.docker.com`, `download.docker.com`, `ghcr.io` |

### Create with the CLI

`ant apply environment.yaml` creates the environment from a YAML file, prints its ID, and records it in `claude-lock.json`; commit `claude-lock.json` so the next `ant apply` updates the environment instead of creating it again.

```yaml
name: python-dev
config:
  type: cloud
  networking:
    type: limited
    allow_package_managers: true
```

### Pre-installed runtimes

Cloud sandboxes include common language runtimes, databases, and command-line tools out of the box; see the cloud sandbox reference for the full list.

## Notes

- Environments persist until archived/deleted and are not versioned — keep your own record of config changes to know which config a session used.
- For production, use `limited` networking with an explicit `allowed_hosts` list (least privilege).
- `allow_mcp_servers` scope, two separate contracts: (1) MCP host check: while `false`, session creation (and a session update that changes `mcp_servers`) is rejected with 400 if a declared MCP server's host is not in `allowed_hosts`; `true` turns this check off. (2) Sandbox reachability: the Secure deployment guide says it opens no host to code in the sandbox, because Managed Agents connects to MCP servers from Anthropic's servers, while the Environments page describes it as allowing outbound access to agent-configured MCP endpoints beyond `allowed_hosts`. The official pages word this differently and do not reconcile it; the Secure deployment guide recommends the default `false` with each MCP server host you operate or trust listed in `allowed_hosts` (each listed host is also open to code in the sandbox).
- With `limited` networking, `allowed_hosts` also applies to `web_search` and `web_fetch`, which run on Anthropic's servers: `web_fetch` for a URL on an unmatched host returns an error result, and `web_search` omits results from unmatched hosts. `allow_package_managers` and `allow_mcp_servers` add no hosts for these tools; with no hosts listed, neither tool returns a page or result. A host added to `allowed_hosts` is also open to the sandbox. `unrestricted` networking and self-hosted environments do not limit these tools. To restrict them further, set `allowed_domains` / `blocked_domains` on the tool's entry in the agent toolset.
- A request from the sandbox on port 80 or 443 refused because its host is not allowed gets a 403 naming the blocked host. Files, memory stores, and GitHub repositories attached to the session stay available under `limited` networking.
- Network access is granted per host, not per operation: the sandbox can send any request (including `git push` and package publishing) to an allowed host. If the agent processes untrusted input, set the `bash` tool's permission policy to `always_ask` or `auto`.
- Risks of `unrestricted` networking: the agent can change things on external sites, nothing pauses these requests by default (the agent toolset's default policy is `always_allow`), anything in the sandbox can leave it, and fetched content can steer the agent (prompt injection). The safety blocklist is not an allowlist.
- API-created environments default to `unrestricted` networking; sandboxes provisioned through Claude Studio default to `limited`.

## Related

- [Cloud sandbox reference](./cloud-sandboxes-reference.md)
- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
- [Choosing an environment](./choosing-an-environment.md)
- [Web search and fetch restrictions](../sessions/tools-web-restrictions.md)
