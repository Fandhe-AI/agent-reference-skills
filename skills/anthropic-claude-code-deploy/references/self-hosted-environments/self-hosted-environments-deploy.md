<!-- source: https://code.claude.com/docs/en/self-hosted-environments-deploy.md / last verified: 2026-08-07 -->

# Deploy self-hosted environments to production

Security hardening, network egress control, git credentials, Kubernetes/Compose recipes, and troubleshooting for running self-hosted runners in production.

## Signature / Usage

```dockerfile
FROM debian:bookworm-slim
ARG CLAUDE_CODE_VERSION
RUN apt-get update && apt-get install -y --no-install-recommends git curl ca-certificates openssh-client \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL "https://downloads.claude.ai/claude-code-releases/${CLAUDE_CODE_VERSION:?set with --build-arg CLAUDE_CODE_VERSION}/linux-x64/claude" \
      -o /usr/local/bin/claude && chmod +x /usr/local/bin/claude
RUN git config --system user.name "Claude" \
 && git config --system user.email "noreply@anthropic.com" \
 && git config --system --add safe.directory '*'
ENTRYPOINT ["claude"]
```

```bash
docker build --build-arg CLAUDE_CODE_VERSION=2.1.224 -t <your-registry>/claude-runner:latest .
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--configure-git` | runner flag | Writes `user.name=Claude`/`user.email=noreply@anthropic.com` and SSH-format commit signing (git 2.34+ required) at startup |
| `--use-anthropic-git-proxy` | runner flag | Clones via Anthropic's git proxy using the session's own short-lived token; no git credentials needed in the image. Requires `--capacity 1` and git 2.32+; ignores `--git-host-rewrite`/`--git-ssh-rewrite` |
| `--git-host-rewrite <from>=<to>` | runner flag | Rewrites HTTPS source URLs before clone, for split-horizon DNS |
| `--git-ssh-rewrite <host>` | runner flag | Rewrites `https://<host>/owner/repo` to `git@<host>:owner/repo`, for SSH-only git hosts |
| `terminationGracePeriodSeconds` / `stop_grace_period` | orchestrator config | Kubernetes/Compose graceful-shutdown budget; must cover the runner's full drain path (logged at startup; ~80s at defaults) |
| `--capacity 1` + fresh container per exit | hardening pattern | Ephemeral, per-session containers so one container serves exactly one session |

## Notes

- Hardening checklist: ephemeral per-session containers (`--capacity 1`, `--drain-grace-sec 0`); no broad credentials baked into the image (mint per-session via a wrapper script); keep the environment secret off session-running hosts (prefer on-demand runners); default-deny network egress at your own boundary; least-privilege host IAM; block the cloud metadata endpoint (`169.254.169.254`) from session containers; per-runner filesystem isolation; dispatch is organization-wide (any org member can dispatch to any environment — there's no per-environment ACL); `--confine-repo-settings` (`warn`/`enforce`/`off`) scans committed repo settings for grants that escape the workspace.
- Network requirements: always need `api.anthropic.com` (443/WSS) and your git host (443/22, skippable with `--use-anthropic-git-proxy`); conditionally `downloads.claude.ai`, `storage.googleapis.com`, `code.claude.com`/`claude.com`, `*.frame.claudeusercontent.com`, `raw.githubusercontent.com`, `registry.npmjs.org`, Datadog hosts. Not needed: `statsig.anthropic.com`, `*.sentry.io`, `claude.ai`, `platform.claude.com`, `mcp-proxy.anthropic.com`.
- Git config: `--configure-git` for Anthropic-parity identity/signing, or ship your own `git config --system` in the image; never bake long-lived push credentials into a shared image — mint per-session tokens from a wrapper script instead.
- Kubernetes: runner serves `GET /healthz` on port 8080 (`--health-port`); mount the environment secret from a Secret; set `terminationGracePeriodSeconds` per Shutdown timing. Docker Compose: `restart: always` reuses the writable layer (fine for evaluation, not production hardening).
- Known issues: connector (GitHub/Slack/Linear) traffic routes through `api.anthropic.com`, not your network — filter via `allowedMcpServers`/`deniedMcpServers` if that's unacceptable; a session holding a never-finishing background task or an in-tool approval doesn't count as idle (pair `--release-idle-session-min` with `--kill-session-after-min`); resumed sessions lose unpushed work unless `--push-outcome-on-release` is set; private repos can't be added mid-session; newly connected connectors need a fresh session.
- Troubleshooting: `claude self-hosted-runner doctor` gives guided, read-only diagnosis (can requeue a stuck session); common causes are clock skew (auth failure), missing git credentials, base-dir permissions (`EACCES`), and an insufficient `terminationGracePeriodSeconds`.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Self-hosted environments quickstart](./self-hosted-environments-quickstart.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
