<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes-workers / last verified: 2026-10-17 -->

# Deploy self-hosted workers

Choose how self-hosted sandbox workers claim work (always-on or webhook-triggered) and where each session runs (in one process or one sandbox per session).

## Signature / Usage

```bash
# Always-on worker (polls continuously, needs only outbound HTTPS)
ant beta:worker poll --workdir /workspace

# One sandbox per session: poller calls a script per claimed work item
ant beta:worker poll --on-work ./spawn.sh
```

```dockerfile
FROM your-base-image
ARG ANT_VERSION=1.42.0
ARG TARGETARCH
RUN ARCH=$([ "$TARGETARCH" = "arm64" ] && echo arm64 || echo amd64) && \
    curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${ANT_VERSION}/ant_${ANT_VERSION}_linux_${ARCH}.tar.gz" \
      | tar -xz -C /usr/local/bin ant
WORKDIR /workspace
VOLUME /workspace
ENTRYPOINT ["ant", "beta:worker", "run"]
```

```python
# SDK always-on worker (Python)
worker = EnvironmentWorker(
    client,
    environment_id=environment_id,
    environment_key=environment_key,
    workdir="/workspace",
)
task = asyncio.create_task(worker.run())
```

## Options / Props

| Capability | `ant` CLI | SDK (Python, TypeScript, Go) |
|------------|-----------|------------------------------|
| Always-on polling | Yes | Yes |
| Webhook-triggered | No | Yes |
| Sandbox per session | Yes | Yes |
| Memory stores | Yes, with default sync settings | Yes, with configurable sync |
| Custom tools | No | Yes |

| Work item secret: you claim work with | The secret arrives as | Pass it to the worker as |
|----------------|------------------------|--------------------------|
| `ant beta:worker poll --on-work` | `secret` field of the work item JSON on the script's stdin | `ANTHROPIC_WORK_SECRET` in the sandbox environment |
| SDK `work.poller()` (go: `environments.NewWorkPoller()`) | `secret` (go: `Secret`) of each claimed work item | `ANTHROPIC_WORK_SECRET`, or the `work_secret` (typescript: `workSecret`; go: `WorkSecret`) argument to `handle_item()` (typescript: `handleItem()`; go: `HandleItem()`) |

## Notes

- Webhook-triggered: subscribe to `session.status_run_started` in the Console, export `ANTHROPIC_WEBHOOK_SIGNING_KEY="whsec_..."` on the handler host, verify with `client.beta.webhooks.unwrap(...)`, then drain the queue with `work.poller(block_ms=None, reclaim_older_than_ms=2000, drain=True, auto_stop=False)` and call `handle_item()` per item. Python needs `pip install "anthropic[webhooks]"`.
- Sandbox per session: the base image must provide `/bin/bash` (`curl` is only used at build time); `spawn.sh` needs `jq` on the poller host and forwards `ANTHROPIC_SESSION_ID`, `ANTHROPIC_ENVIRONMENT_KEY`, `ANTHROPIC_WORK_ID`, `ANTHROPIC_ENVIRONMENT_ID`, `ANTHROPIC_BASE_URL`, `ANTHROPIC_WORK_SECRET` into `docker run`. The poller sets all of these except the secret.
- Forward the per-session secret only into the sandbox that serves that session, never log it, and forward the environment key (never your API key). `ant beta:worker poll` without `--on-work`, or `EnvironmentWorker.run()`, passes the secret itself.
- Use an SDK entrypoint instead of `ant beta:worker run` when the sandbox must serve custom tools or use non-default memory sync settings; `handle_item()` with no arguments reads the forwarded `ANTHROPIC_*` variables.
- When using `work.poller()` with a launched sandbox that owns the stop call, set `auto_stop=False`.
- C#, Java, PHP, and Ruby SDKs have no `EnvironmentWorker` (and no polling helper); use the `ant` CLI worker or call the Environments Work endpoints directly.
- Stage files for a session: Anthropic does not mount files or GitHub repositories. Pass references (e.g. an S3 path or commit SHA) in session `metadata`, retrieve the session (`GET /v1/sessions/{session_id}`) in your spawn script or `--on-work` handler (the work item carries the session ID, not the metadata), and stage files before tool execution begins. Example: `ant beta:sessions create --agent "$AGENT_ID" --environment-id "$ANTHROPIC_ENVIRONMENT_ID" --metadata '{"input_file": "s3://my-bucket/data.csv"}'`.
- Cancel the worker (SIGTERM/SIGINT) rather than killing the process so it can upload changed memory files and remove store directories.
- Status: beta (`managed-agents-2026-04-01`).

## Related

- [Self-hosted sandboxes](./self-hosted-sandboxes.md)
- [Self-hosted worker reference](./self-hosted-sandboxes-reference.md)
- [Custom tools in self-hosted sandboxes](./self-hosted-sandboxes-custom-tools.md)
- [Memory stores in self-hosted sandboxes](./self-hosted-sandboxes-memory.md)
- [Monitor and troubleshoot self-hosted workers](./self-hosted-sandboxes-operations.md)
- [Security model](./self-hosted-sandboxes-security.md)
