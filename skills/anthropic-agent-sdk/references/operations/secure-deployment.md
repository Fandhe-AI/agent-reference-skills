<!-- source: https://code.claude.com/docs/en/agent-sdk/secure-deployment / last verified: 2026-08-07 -->

# Securely deploying AI agents

A guide to securing Claude Code and Agent SDK deployments with isolation, credential management, and network controls.

Claude Code and the Agent SDK can execute code, access files, and interact with external services on your behalf. Unlike traditional software following predetermined code paths, agent behavior is generated dynamically and can be influenced by the content it processes (files, webpages, user input) — sometimes called prompt injection. This guide covers practical ways to reduce this risk.

Securing an agent deployment doesn't require exotic infrastructure. The same principles that apply to running any semi-trusted code apply here: isolation, least privilege, and defense in depth. Not every deployment needs maximum security — a laptop developer has different requirements than a company processing customer data in a multi-tenant environment.

## Threat model

Agents can take unintended actions due to prompt injection (instructions embedded in processed content) or model error. Defense in depth is still good practice: for example, if an agent processes a malicious file instructing it to send customer data to an external server, network controls can block that request entirely.

## Built-in security features

- **Permissions system**: every tool and bash command can be allowed, blocked, or prompted for approval. Glob patterns build rules like "allow all npm commands" or "block any command with sudo". Organizations can set policies across all users.
- **Command parsing for permissions**: bash commands are parsed into an AST and matched against permission rules before execution. Commands that cannot be parsed cleanly, or that do not match an allow rule, require explicit approval. Constructs such as `eval` always require approval regardless of allow rules. This is a permission gate, not a sandbox.
- **Web search summarization**: search results are summarized rather than passing raw content directly into context, reducing prompt-injection risk from malicious web content.
- **Sandbox mode**: bash commands can run in a sandboxed environment restricting filesystem and network access.

## Security principles

### Security boundaries

A security boundary separates components with different trust levels. For high-security deployments, place sensitive resources (like credentials) outside the boundary containing the agent — e.g. run a proxy outside the agent's environment that injects an API key into requests, so the agent never sees the credential itself.

### Least privilege

| Resource | Restriction options |
|---|---|
| Filesystem | Mount only needed directories, prefer read-only |
| Network | Restrict to specific endpoints via proxy |
| Credentials | Inject via proxy rather than exposing directly |
| System capabilities | Drop Linux capabilities in containers |

### Defense in depth

Layer multiple controls: container isolation, network restrictions, filesystem controls, request validation at a proxy. The right combination depends on threat model and operational requirements.

## Isolation technologies

In all configurations, Claude Code (or your Agent SDK application) runs inside the isolation boundary (sandbox, container, or VM); the controls below restrict what the agent can access from within that boundary.

| Technology | Isolation strength | Performance overhead | Complexity |
|---|---|---|---|
| Sandbox runtime | Good (secure defaults) | Very low | Low |
| Containers (Docker) | Setup dependent | Low | Medium |
| gVisor | Excellent (with correct setup) | Medium/High | Medium |
| VMs (Firecracker, QEMU) | Excellent (with correct setup) | High | Medium/High |

### Sandbox runtime

`sandbox-runtime` (`anthropic-experimental/sandbox-runtime`) enforces filesystem and network restrictions at the OS level with no Docker configuration required. It uses `bubblewrap` on Linux / `sandbox-exec` on macOS for filesystem restriction, and removes the network namespace (Linux) or uses Seatbelt profiles (macOS) to route traffic through a built-in proxy. Configuration is a JSON allowlist of domains and paths.

```bash
npm install @anthropic-ai/sandbox-runtime
```

Security considerations:

1. **Same-host kernel**: sandboxed processes share the host kernel, unlike VMs. For kernel-level isolation, use gVisor or a separate VM.
2. **No TLS inspection**: the proxy allowlists domains by client-supplied hostname and does not terminate or inspect encrypted traffic, so domain fronting could reach hosts outside the allowlist. Configure a TLS-terminating proxy for stronger guarantees (see Traffic forwarding below).

### Containers

Containers isolate via Linux namespaces, sharing the host kernel. A hardened configuration:

```bash
docker run \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --security-opt seccomp=/path/to/seccomp-profile.json \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=100m \
  --tmpfs /home/agent:rw,noexec,nosuid,size=500m \
  --network none \
  --memory 2g \
  --cpus 2 \
  --pids-limit 100 \
  --user 1000:1000 \
  -v /path/to/code:/workspace:ro \
  -v /var/run/proxy.sock:/var/run/proxy.sock:ro \
  agent-image
```

| Option | Purpose |
|---|---|
| `--cap-drop ALL` | Removes Linux capabilities like `NET_ADMIN`/`SYS_ADMIN` |
| `--security-opt no-new-privileges` | Prevents privilege gain via setuid binaries |
| `--security-opt seccomp=...` | Restricts syscalls beyond Docker's default block of ~44 |
| `--read-only` | Makes root filesystem immutable |
| `--tmpfs /tmp:...` | Writable temp dir cleared on stop |
| `--network none` | Removes all network interfaces; agent talks only via mounted Unix socket |
| `--memory 2g` | Limits memory to prevent resource exhaustion |
| `--pids-limit 100` | Limits process count to prevent fork bombs |
| `--user 1000:1000` | Runs as non-root |
| `-v ...:/workspace:ro` | Mounts code read-only; avoid mounting `~/.ssh`, `~/.aws`, `~/.config` |
| `-v .../proxy.sock:...` | Unix socket to a proxy running outside the container |

With `--network none`, the only path to the outside world is the mounted Unix socket to a host proxy that can enforce domain allowlists, inject credentials, and log traffic — the same architecture as sandbox-runtime. Additional hardening: `--userns-remap` (maps container root to unprivileged host user) and `--ipc private` (isolates IPC).

### gVisor

Standard containers share the host kernel; gVisor intercepts syscalls in userspace before they reach the host kernel, shrinking the attack surface an agent's malicious code could exploit.

```json title="/etc/docker/daemon.json"
{ "runtimes": { "runsc": { "path": "/usr/local/bin/runsc" } } }
```

```bash
docker run --runtime=runsc agent-image
```

| Workload | Overhead |
|---|---|
| CPU-bound computation | ~0% (no syscall interception) |
| Simple syscalls | ~2x slower |
| File I/O intensive | Up to 10-200x slower for heavy open/close patterns |

### Virtual machines

VMs provide hardware-level isolation via CPU virtualization; each VM runs its own kernel, so a guest-kernel vulnerability doesn't directly compromise the host. VM security still depends heavily on the hypervisor and device emulation. Firecracker boots microVMs in under 125ms with under 5 MiB memory overhead. The agent VM has no external network interface; traffic routes through `vsock` to a host proxy that enforces allowlists and injects credentials.

### Cloud deployments

1. Run agent containers in a private subnet with no internet gateway.
2. Configure cloud firewall rules (AWS Security Groups, GCP VPC firewall) to block all egress except to your proxy.
3. Run a proxy (e.g. Envoy with its `credential_injector` filter) that validates requests, enforces domain allowlists, injects credentials, and forwards to external APIs.
4. Assign minimal IAM permissions to the agent's service account.
5. Log all traffic at the proxy for audit purposes.

## Credential management

### The proxy pattern

Run a proxy outside the agent's security boundary that injects credentials into outgoing requests. Benefits: the agent never sees credentials, the proxy can enforce an endpoint allowlist, log all requests, and centralize credential storage.

### Configuring Claude Code to use a proxy

**Option 1: `ANTHROPIC_BASE_URL`** (simple, sampling API requests only):

```bash
export ANTHROPIC_BASE_URL="http://localhost:8080"
```

Routes sampling requests to your proxy in plaintext HTTP, which can inspect/modify them (including injecting credentials) before forwarding to the real API.

**Option 2: `HTTP_PROXY` / `HTTPS_PROXY`** (system-wide):

```bash
export HTTP_PROXY="http://localhost:8080"
export HTTPS_PROXY="http://localhost:8080"
```

Routes all HTTP traffic through the proxy. For HTTPS, the proxy creates an encrypted CONNECT tunnel and cannot see/modify contents without TLS interception.

### Implementing a proxy

Envoy Proxy (`credential_injector` filter), mitmproxy (TLS-terminating), Squid (caching + ACLs), LiteLLM (LLM gateway with credential injection and rate limiting).

### Credentials for other services

**Custom tools**: provide access through an MCP server or custom tool that routes requests to a service outside the agent's boundary, which injects credentials. The agent only sees the tool interface.

**Traffic forwarding**: for non-Claude-API HTTPS services (GitHub, npm, internal APIs), traffic is often encrypted end-to-end, so a plain `HTTP_PROXY` only sees an opaque TLS tunnel. To modify such traffic you need a TLS-terminating proxy: run it outside the container, install its CA certificate in the agent's trust store, and configure `HTTP_PROXY`/`HTTPS_PROXY`. Not all programs respect these variables — curl, pip, npm, and git do; Node.js `fetch()` ignores them by default (set `NODE_USE_ENV_PROXY=1` on Node 24+ to enable). For comprehensive coverage use `proxychains` or configure iptables to redirect outbound traffic to a transparent proxy (one that intercepts traffic at the network level without client configuration, e.g. Squid or mitmproxy in transparent mode).

## Filesystem configuration

### Read-only code mounting

```bash
docker run -v /path/to/code:/workspace:ro agent-image
```

Even read-only access can expose credentials. Exclude or sanitize before mounting: `.env`/`.env.local`, `~/.git-credentials`, `~/.aws/credentials`, `~/.config/gcloud/application_default_credentials.json`, `~/.azure/`, `~/.docker/config.json`, `~/.kube/config`, `.npmrc`/`.pypirc`, `*-service-account.json`, `*.pem`/`*.key`.

### Writable locations

For ephemeral workspaces, use `tmpfs` mounts (memory-only, cleared on stop):

```bash
docker run \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid,size=100m \
  --tmpfs /workspace:rw,noexec,size=500m \
  agent-image
```

To review changes before persisting, use an overlay filesystem so the agent writes to a separate inspectable layer. For fully persistent output, mount a dedicated volume kept separate from sensitive directories.

## Notes

- This page cross-references Claude Code's general security and permissions documentation and the `sandbox-runtime` and `sandboxing` guides, which are outside this skill's scope; they are described here only as summarized by this page.

## Related

- [Hosting the Agent SDK](./hosting.md)
- [Observability](./observability.md)
