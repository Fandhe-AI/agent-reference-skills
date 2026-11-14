<!-- source: https://code.claude.com/docs/en/self-hosted-environments-reference.md / last verified: 2026-11-14 -->

# Self-hosted environments reference

Complete flag/env-var/metric reference for the two processes you run: the runner (executes cloud sessions on your Linux or macOS hosts) and the optional autoscaling orchestrator (spawns runners as sessions queue). Run `claude self-hosted-runner --help` for the authoritative list on your installed version.

## Signature / Usage

```bash
claude self-hosted-runner --environment-secret-file /etc/claude/environment-secret \
  --base-dir /workspace --capacity 4

claude self-hosted-runner orchestrator \
  --environment-secret-file /etc/claude/environment-secret \
  --hooks-dir /etc/claude/hooks --min-idle 1
```

## Options / Props

### Runner CLI flags

Most flags have an env var; when both are set the flag wins. Env var and default in parentheses.

| Name | Type | Description |
|------|------|-------------|
| `--environment-secret-file <path>` (`SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET`) | required | Path to the environment secret, or for orchestrator-spawned runners the single-use work-order JWT. The env var carries the secret value itself, not a path. Old `--pool-secret-file` / `SELF_HOSTED_RUNNER_POOL_SECRET` still work (deprecation notice on stderr); preview runner builds older than 2.1.216 only recognize the old names |
| `--api-url <url>` (none, `https://api.anthropic.com`) | url | API base URL; override only for testing |
| `--base-dir <path>` (`SELF_HOSTED_RUNNER_BASE_DIR`, `/workspace`; none on Windows) | path | Checkout / per-session working directory. Created at startup; exits with `cannot create or write to base directory` if it can't be created or written (before v2.1.225 it was created at first session). Windows is not a supported runner host and has no default. Use the same value on every runner in an environment |
| `--capacity <n>` (none, `1`) | int | Max concurrent sessions, all from the same locked owner. Use the same value on every runner in an environment |
| `--client-label <label>` (`SELF_HOSTED_RUNNER_CLIENT_LABEL`, hostname) | string | Label sent at registration; reported as `client_label` on `claude_code_self_hosted_runner_info`. Requires v2.1.248+ |
| `--configure-git` (`SELF_HOSTED_RUNNER_CONFIGURE_GIT=1`, off) | flag | At startup write global git identity, enable Anthropic commit signing, turn on git push negotiation, install commit hooks appending a `Co-authored-by:` trailer. Push negotiation requires v2.1.257+ |
| `--confine-repo-settings <mode>` (`SELF_HOSTED_RUNNER_CONFINE_REPO_SETTINGS`, `warn`) | `warn` / `enforce` / `off` | Guard flagging a session when a repo's committed settings grant write/read access outside the session workspace, set env vars, or override the operator's sandbox/hooks posture (e.g. `sandbox.enabled: false`, `disableAllHooks`). `warn` logs and still starts, `enforce` refuses the session, `off` disables the scan |
| `--debug-token-dir <path>` (`SELF_HOSTED_RUNNER_DEBUG_TOKEN_DIR`, unset) | path | Write live tokens to disk; debug only, not for production |
| `--defer-shutdown-max-min <n>` (`SELF_HOSTED_RUNNER_DEFER_SHUTDOWN_MAX_MS`, `0`) | minutes | On first `SIGTERM`/`SIGINT`, keep serving attached sessions instead of draining, then release what's left N minutes later and exit. Raise the host stop timeout first. `0` disables. Requires v2.1.238+ |
| `--drain-grace-sec <n>` (`SELF_HOSTED_RUNNER_DRAIN_GRACE_MS`, `0`) | seconds | Until a shutdown signal or retire time: `0` exits right after active sessions finish; positive keeps re-polling the locked owner's queue for N seconds (at the cost of per-session container isolation). After a deferred first signal the runner exits as soon as it holds no sessions regardless |
| `--drain-marker-file <path>` (`SELF_HOSTED_RUNNER_DRAIN_MARKER_FILE`, unset) | path | Marker file your host writes to announce a graceful drain before `SIGTERM`; if it exists when the drain starts, the exit is reported to Anthropic as a host drain. Use a local path sessions can't write. Requires v2.1.271+ |
| `--drain-wait-sec <n>` (`SELF_HOSTED_RUNNER_DRAIN_WAIT_MS`, `0`) | seconds | Once the drain starts (on `SIGTERM` unless deferred), wait up to N seconds per session for in-flight turn and background tasks before terminating the child; a just-finished background task counts as running for at most `SELF_HOSTED_RUNNER_BG_RESULT_GRACE_MS`. Raise your stop timeout too |
| `--exec-path <path>` (`SELF_HOSTED_RUNNER_EXEC_PATH`, own binary) | path | Binary or wrapper script spawned per session |
| `--exit-if-unused-min <n>` (`SELF_HOSTED_RUNNER_IDLE_SHUTDOWN_MS`, `0`) | minutes | Exit after N minutes of polling with no work ever assigned, for autoscaler scale-down; `0` disables |
| `--git-host-rewrite <from>=<to>` (none, unset) | repeatable, flag only | Rewrite `https://<from>/...` source URLs to `https://<to>/...` before cloning (split-horizon DNS) |
| `--git-ssh-rewrite <host>` (none, unset) | repeatable, flag only | Rewrite `https://<host>/...` to `git@<host>:...` before cloning (SSH-only git hosts) |
| `--health-port <port>` (`SELF_HOSTED_RUNNER_HEALTH_PORT`, `8080`) | port | `/healthz` + `/metrics` listener; `0` disables |
| `--hold-idle-file <path>` (`SELF_HOSTED_RUNNER_HOLD_IDLE_FILE`, unset) | path | File your host keeps changing to hold an idle session on the runner. Requires v2.1.311+ |
| `--hooks-dir <path>` (`SELF_HOSTED_RUNNER_HOOKS_DIR`, unset) | path | Lifecycle hook scripts directory |
| `--host-config-snapshot <mode>` (`SELF_HOSTED_RUNNER_HOST_CONFIG_SNAPSHOT`, `disk`) | `disk` / `memory` | Where the startup snapshot of the host config dir is kept. `disk` copies it under `--base-dir` and verifies every file against an in-memory digest at each session start (a modified file fails the session and the runner refuses sessions until restart). `memory` holds it on the heap, capped at 64 MiB (over the cap, sessions start without host config with a notice); on disk-write failure it falls back to `memory` for that run. Requires v2.1.271+ |
| `--kill-session-after-min <n>` (`SELF_HOSTED_RUNNER_MAX_LIFETIME_MS`, `0`) | minutes | Wall-clock cap per session for stuck sessions. v2.1.260+: the runner releases the session (resumable on the user's next message) and terminates it only if still on the runner when `SELF_HOSTED_RUNNER_MAX_LIFETIME_GRACE_MS` ends; before v2.1.260 it terminated at the limit. `0` disables |
| `--lock-to-account <id>` (`SELF_HOSTED_RUNNER_LOCK_TO_ACCOUNT`, unset) | email or `user_...` | Pre-lock the runner to an account in the environment's organization at startup. A pre-locked runner never picks up Claude Tag channel sessions, which have no account |
| `--log-file <path>` (`SELF_HOSTED_RUNNER_LOG_FILE`, unset) | path | Mirror logs to a file (`0600`); required for `self-hosted-runner doctor` to tail logs locally |
| `--log-level <level>` (none, `info`) | `info` / `debug` | Log verbosity |
| `--max-hold-min <n>` (`SELF_HOSTED_RUNNER_MAX_HOLD_MS`, `1440`) | minutes | With `--hold-idle-file`, release a held session anyway N minutes after it went idle; a value at or below `--release-idle-session-min` holds nothing; `0` turns the hold off. Requires v2.1.311+ |
| `--post-session-hook-timeout-sec <n>` (`SELF_HOSTED_RUNNER_POST_SESSION_HOOK_TIMEOUT_MS`, `60`) | seconds | Budget for the `post-session` hook on every session end, including runner shutdown |
| `--proxy-authorization-command <command>` (`SELF_HOSTED_RUNNER_PROXY_AUTHORIZATION_COMMAND`, unset) | shell command | Run for every connection to your egress proxy; trimmed stdout is the `Proxy-Authorization` value. Needs `HTTPS_PROXY`/`HTTP_PROXY`; mutually exclusive with `--proxy-authorization-file`. Requires v2.1.238+ |
| `--proxy-authorization-file <path>` (`SELF_HOSTED_RUNNER_PROXY_AUTHORIZATION_FILE`, unset) | path | File read for every proxy connection (trimmed contents = header value); for tokens another process rotates in place. Same requirements as the command flag. Requires v2.1.238+ |
| `--push-outcome-on-release` (`SELF_HOSTED_RUNNER_PUSH_OUTCOME_ON_RELEASE`, off) | flag | On runner-initiated session end (drain, idle release) push primary session branches with new commits to `origin` before deleting the workspace. Best-effort; adds 30 s to the shutdown budget; resuming needs git 2.29+. Restrict push access to `claude/*` refs. A `checkout` hook's repositories aren't pushed; snapshot them from `post-session` |
| `--release-idle-session-min <n>` (`SELF_HOSTED_RUNNER_SESSION_IDLE_MS`, `0`) | minutes | Release a session slot after N minutes of inactivity once a turn finishes or the session waits for the user. Some sessions don't count as idle, so pair with `--kill-session-after-min`. A finished background task keeps the session busy for at most `SELF_HOSTED_RUNNER_BG_RESULT_GRACE_MS`; delay with `--hold-idle-file`. `0` disables |
| `--remove-session-state [bool]` (`SELF_HOSTED_RUNNER_REMOVE_SESSION_STATE`, off) | flag | Remove a session's directories under `<base-dir>/_sessions/` when it ends on this runner. Best-effort (stays if the runner is killed or hits its drain deadline). With it on, a failed/interrupted session's debug log isn't kept. Requires v2.1.268+ |
| `--retire-at <epoch-seconds>` (`SELF_HOSTED_RUNNER_RETIRE_AT`, unset) | timestamp | Retire at an absolute Unix time (seconds). Values before 2001 or after year 5138 are rejected by the flag and ignored by the env var |
| `--server-auto-mode-lists <mode>` (`SELF_HOSTED_RUNNER_SERVER_AUTO_MODE_LISTS`, `no-allow`) | `all` / `no-allow` / `none` | Which auto mode classifier rule lists sent by the control plane may reach a session (see Notes). Invalid value stops the runner at startup. Requires v2.1.295+ |
| `--session-stop-grace-sec <n>` (`SELF_HOSTED_RUNNER_SESSION_STOP_GRACE_MS`, `5`) | seconds | Wait for the Claude process to exit cleanly after a session ends before force-killing; raise if the child's `SessionEnd` hooks need longer |
| `--startup-timeout-min <n>` (`SELF_HOSTED_RUNNER_STARTUP_TIMEOUT_MS`, `15`) | minutes | Release a session's slot if its child hasn't initialized this long after cloning; `0` disables |
| `--trust-workspace [bool]` (`SELF_HOSTED_RUNNER_TRUST_WORKSPACE`, on) | flag | Seed persisted trust for each session's repo paths so repo-committed `permissions.allow` / `additionalDirectories` are honored. `false` drops repo-committed permission grants (configure allow rules in the host config's `settings.json`); committed `sandbox.*` settings still apply either way |
| `--use-anthropic-git-proxy` (`CLAUDE_RUNNER_USE_GIT_PROXY=1`, off) | flag | Clone github.com repos via the Anthropic git proxy instead of customer-managed git auth. Requires `--capacity 1`, git 2.32+ (runner refuses to start otherwise) and v2.1.267+. Supersedes the rewrite flags |

### Orchestrator CLI flags

`self-hosted-runner orchestrator` accepts `--api-url`, `--environment-secret-file`, `--hooks-dir`, `--health-port`, `--log-level` with the runner's defaults and env vars, except `--hooks-dir` is required and must contain a `spawn-runner` hook. Its own flags:

| Name | Type | Description |
|------|------|-------------|
| `--hook-concurrency <n>` (`4`) | int | Max parallel `spawn-runner` hooks; also caps spawn requests claimed per poll. New requests are checked only after every started hook finishes |
| `--hook-timeout <sec>` (`60`) | seconds | Terminate the hook's process tree after N s. Timeout plus 5 s kill grace must stay below `--expected-spawn-seconds` (enforced at startup) |
| `--expected-spawn-seconds <sec>` (`120`) | seconds | Expected p99 from spawn request to runner registration (including platform capacity wait). Server enforces 10–3600. Sent on every poll as the server-side lease; if no runner registers in time the session is re-offered with a fresh order ID. All replicas must share it |
| `--min-idle <n>` (`0`) | int | Keep at least N idle session slots free via standby runners; `0` disables pre-warming. Pair with the runner's `--exit-if-unused-min` |
| `--shutdown-drain-sec <n>` (`0`) | seconds | On `SIGTERM` stop polling and give running `spawn-runner` hooks and any unanswered poll up to N s to finish; `0` stops immediately; max `3600` (enforced at startup). Requires v2.1.299+ |
| `--debug-dir <path>` (unset) | path | Write each spawn request's work order and hook stderr to disk; debug only, never in production |

SCM connector flags (`--scm-connector-host <host[:port]>`, `--scm-connector-id <n>` required with host, `--scm-connector-provider <slug>` default `ghe` matching `^[a-z0-9-]{1,32}$`, `--scm-connector-ca-file <path>`, `--scm-connector-host-rewrite <from>=<to_host:to_port>` for end-to-end testing only): the SCM connector isn't available, so leave them unset. Setting `--scm-connector-host` means the connection doesn't open and the orchestrator keeps retrying (exponential backoff capped at 30 s plus jitter); runners still start as sessions queue.

### Environment-variable-only settings

| Name | Type | Description |
|------|------|-------------|
| `SELF_HOSTED_RUNNER_BG_RESULT_GRACE_MS` (`30000`) | ms | How long a session counts as busy after a background task finishes while the follow-up turn hasn't started. `0`/unusable falls back to default (can't be turned off). v2.1.228+ |
| `SELF_HOSTED_RUNNER_HOST_CONFIG_DIR` (`~/.claude`) | path | Directory captured into the startup snapshot and seeded into each session's `CLAUDE_CONFIG_DIR`; changes apply after a restart. Setting it (even to the default) also moves where `.claude.json` is read for MCP seeding; point at an empty dir to disable seeding |
| `SELF_HOSTED_RUNNER_MAX_LIFETIME_GRACE_MS` (`900000`) | ms | Wait after a session reaches its `--kill-session-after-min` limit before terminating it |
| `SELF_HOSTED_RUNNER_POST_TURN_SETTLE_MS` (`7000`) | ms | Cap on counting a session as busy for the `--drain-wait-sec` drain after a turn finishes. `0`/unusable falls back to default. v2.1.275+ |
| `SELF_HOSTED_RUNNER_SIGKILL_GRACE_MS` (`30000`) | ms | Wait for the OS to deliver `SIGKILL` to a child stuck in uninterruptible I/O before the runner exits. Floored at `--post-session-hook-timeout-sec` + 15 s (+30 s more with `--push-outcome-on-release`; effective minimum 75 s at defaults) |
| `CLAUDE_RUNNER_DISABLE_RENEWAL_WARNING` (unset) | `1` | Runner doesn't post `The server has refused to renew this session's access to the model`; after each refusal it waits for the next scheduled renewal. v2.1.319+ |
| `CLAUDE_RUNNER_FETCH_DEPTH` (`50`) | int / `full` / `0` | Git fetch depth for fresh clones; `full` or `0` = complete fetch |
| `CLAUDE_RUNNER_FETCH_SERVER_PROGRESS_CAP_MS` (`600000`) | ms | Per attempt, how long a git fetch may wait for first data while the server's progress numbers keep rising. `0`/`off` = cut off after 2 minutes without data; other values clamped to 120000–1800000. v2.1.295+ |
| `CLAUDE_RUNNER_SKIP_GIT_VERIFY` (unset) | `1` | Skip the `.git` presence check after a `checkout` hook (for non-git sources) |
| `FORCE_AUTOUPDATE_PLUGINS` (unset) | `1` | Let plugin marketplaces auto-update even though the binary is pinned |
| `CLAUDE_CODE_DISABLE_ARTIFACT` (unset) | `1` | Disable the Artifact tool in sessions regardless of the org admin setting, and drop the `*.frame.claudeusercontent.com` egress requirement |

## Notes

- Duration flags: CLI takes minutes/seconds, the paired env var is always milliseconds (`_MS` suffix) — e.g. `--exit-if-unused-min 10` ≡ `SELF_HOSTED_RUNNER_IDLE_SHUTDOWN_MS=600000`; a Helm value `SELF_HOSTED_RUNNER_STARTUP_TIMEOUT_MS: "15"` means 15 ms, not 15 minutes. Caps (32-bit timer ceiling ~24.85 days): `--*-min` flags 10080 min (7 days), `--drain-grace-sec` 604800 s, `--drain-wait-sec` 86400 s; `--session-stop-grace-sec` and `--post-session-hook-timeout-sec` uncapped. Overrunning a cap errors at startup for a flag, but an env var is clamped.
- `pool` vs `environment`: metric series and some API fields still say `pool`/`pool_id` (`ccpool_...`); CLI flags/env vars say `environment`. Same concept.
- Self-hosted environments are in public beta on Team and Enterprise plans; an Owner enables them via **Allow self-hosted environments** on the Cloud environments admin page.
- Session startup timeout: from v2.1.299 through v2.1.308 the runner released a session even mid-turn once the startup timeout passed without a `user` or `assistant` message; update runner and child binary to v2.1.309+. With `--startup-timeout-min`, during a turn that begins before the child initializes the session keeps its slot until N minutes pass with no line on the child's activity channel; after init `--release-idle-session-min` governs. Use `--kill-session-after-min` for an alive-but-stuck child.
- Auto mode rule lists (`--server-auto-mode-lists`): the control plane may send `environment` (entry can make the classifier allow more as well as less), `soft_deny` (blocks unless the user explicitly asked or an `allow` exception applies) and `allow` lists. `no-allow` (default) applies `environment` + `soft_deny`, withholds `allow` (an `environment` entry can still loosen); `all` applies all three; `none` applies none (also drops `soft_deny` restrictions). No runner setting makes the control plane send lists; with `--log-level debug` the runner logs `the server asked this runner to apply` or `the server did not ask this runner to apply the auto mode lists it sends` per session.
- Telemetry: session children send operational telemetry to Anthropic (no code/repo content) unless disabled; set variables on the runner process (re-asserted after server-provided env). `CLAUDE_CODE_BYOC_ENABLE_DATADOG=1` is self-hosted-specific and off by default. `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `DISABLE_ERROR_REPORTING`, `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` apply to children; `CLAUDE_CODE_DISABLE_FEATURE_FLAGS=1` (v2.1.319+) disables feature-flag fetching only (telemetry stays on unless `DISABLE_TELEMETRY` too). `CLAUDE_CODE_ENABLE_TELEMETRY` is unrelated (OpenTelemetry export to your own collector).
- Runner `GET /healthz` is `200` whenever the process is alive (only after registration and startup checks), so an HTTP probe detects a dead process only. Body: `status`, `runner_id`, `active_sessions`, `last_poll_at`, `last_poll_age_ms` (both `null` until the first poll succeeds; also rises when Anthropic is unreachable). Alert on `last_poll_age_ms` and `claude_code_self_hosted_runner_poll_errors_total`, but keep the liveness probe on the status code. Orchestrator `/healthz` always returns `200`; gate readiness on `connected`, read `last_error` (reset to `null` on each successful poll) for why, plus `queue_counts`; with the SCM connector configured also `scm_connector_connected` and a `scm_connector` object (both `null` when `--scm-connector-host` is unset).
- Runner Prometheus series (`/metrics` on the health port): `claude_code_self_hosted_runner_info{runner_id,version,client_label}` (always 1; version drift), `_capacity`, `_active_sessions`, `_locked_account{email}` (present once locked to a user and a token with `act.email` was issued; absent on a Claude Tag agent-locked runner; email label — drop/hash via `metric_relabel_configs` if the store is broadly readable), `_last_poll_age_seconds` (alert >60), `_poll_errors_total{error_kind}` (`transport`/`timeout`/`5xx`/`429`/`4xx`, all present from start; alert `rate(...[5m]) > 0`), `_sessions_{started,completed,failed,interrupted}_total{client_platform}` (Slack sessions carry `claude_in_slack` or `claude-in-slack`; match with `{client_platform=~"claude[-_]in[-_]slack"}`), `_initializing_sessions`, `_session_init_duration_seconds` (histogram), `_session_init_errors_total` (checkout hook failure, git prep, token issue, pre-init crash), `_session_start_hook_errors_total`, `_session_idle_seconds{session_id,client_platform}`.
- Orchestrator series: `claude_code_self_hosted_orchestrator_info{version,pool_id,orchestrator_uuid,hostname}`, `_connected` (0 after any failed poll), `_last_poll_age_seconds` (since last attempt, success or failure — unlike the runner's; alert above `--hook-timeout` + margin, ~90 s), `_poll_errors_total{error_kind}`, `_queue_pending_sessions`, `_queue_backing_off_sessions`, `_queue_circuit_broken_sessions` (stays blocked until a user messages the session or an Owner retries from the environment's **Activity** tab; alert if >0), `_pool_pending_sessions` / `_pool_active_sessions` (environment-wide aggregates identical on every instance — use `MAX` not `SUM`), `_spawn_hooks_total{result}` (`ok`/`retryable`/`non_retryable`; counts hook invocations, not sessions), `_spawn_hook_duration_seconds`, `_warm_hints_dispatched_total`, `_session_queue_wait_seconds` (histogram; pre-warming spawns not sampled), `_clock_skew_seconds`, `_scm_connector_connected`, `_scm_connector_requests_forwarded_total` (both absent without `--scm-connector-host`).
- Autoscaling: queue-depth scaling feeds `orchestrator_pool_pending_sessions` (not `queue_pending_sessions`) into HPA/KEDA; capacity scaling uses runner `active_sessions` / `capacity`; gate with `claude_code_self_hosted_orchestrator_connected == 1` per instance. In a full poll outage the gated query returns no data: HPA holds the replica count, but KEDA's Prometheus scaler at default `ignoreNullValues: "true"` reads it as zero and scales in — set `ignoreNullValues: "false"`, optionally with a `fallback` replica floor.
- Session-child metrics: with `OTEL_METRICS_EXPORTER=prometheus` on the runner host and `CLAUDE_CODE_ENABLE_TELEMETRY=1` in the session environment, at `--capacity` above one the runner rewrites each child's exporter to OTLP push to a loopback receiver on the health port, re-exposes counters/gauges on its own `/metrics` with `session_id` and `client_platform` labels, and evicts a session's series at session end; histograms don't pass through and colliding names are dropped. At `--capacity 1` the child binds its own Prometheus endpoint on port 9464. To join idle cost to the runner's metric use `ccr_session_id` (the `session_id` label on port 9464 is Claude Code's own `session.id` and matches nothing); if missing, check `OTEL_METRICS_INCLUDE_SESSION_ID` isn't `false`. The `ccr_session_id` join query is under Session cost join below.
- Session lifecycle counter semantics: every spawned child increments `sessions_started_total`; exactly one of the other three increments at exit, so `started` minus the other three = children currently running. `completed` = clean end (child exit 0, session archived/deleted while connected, clean slot handback: idle release, retire time, `--kill-session-after-min` release, startup timeout, server deassign noticed by the poll loop). `failed` = child exited non-zero on its own. `interrupted` = runner terminated the child for an operational reason (drain, e.g. Kubernetes rolling restart `SIGTERM`; session still on the runner when the `SELF_HOSTED_RUNNER_MAX_LIFETIME_GRACE_MS` window ended). Before v2.1.260 every session reaching the `--kill-session-after-min` limit was terminated and counted `interrupted`. The `post-session` hook's `CLAUDE_RUNNER_EXIT_REASON` reports clean handoffs (release, startup timeout, deassign, archive/delete noticed first) as `interrupted`, so reconciling hook receipts against `sessions_completed_total` undercounts; use the hook for per-session guarantees and counters for aggregate rates.
- One-shot environments (`--capacity 1`, `--drain-grace-sec 0`): the three end-of-session counters increment right before exit so scrapes rarely catch them; `sessions_started_total` reads closer to "sessions running". Instead use: throughput = `orchestrator_spawn_hooks_total{result="ok"}` (hook invocations, not sessions); utilization = `sum(runner_active_sessions)` vs `sum(runner_capacity)`; backlog = `orchestrator_pool_pending_sessions` and `queue_circuit_broken_sessions` (>0 alert); failures = `sessions_failed_total` best effort (pre-spawn failures appear only in `session_init_errors_total`). `orchestrator_*` rows exist only with the on-demand orchestrator; on a fixed fleet with `--drain-grace-sec` above `0` use `sum(rate(..._sessions_started_total[5m]))` for throughput. Backlog is also on the environment's **Activity** tab; runners export no queue-depth series. Per-session outcomes: `post-session` hook (fires at every session end where a child spawned, except abrupt termination such as VM preemption).
- Official alert rules (sample, runner + orchestrator): `ClaudeRunnerPollStale` (`last_poll_age_seconds > 60`, 2m), `ClaudeRunnerVersionDrift` (`count(count by (version) (..._runner_info)) > 1`, 30m), `ClaudeRunnerInitErrorsHigh`, `ClaudeRunnerPollErrors`, `ClaudeRunnerSessionStartHookErrors`, `ClaudeOrchestratorDisconnected` (`connected == 0`, 2m, critical), `ClaudeOrchestratorPollStale` (`> 90`), `ClaudeOrchestratorCircuitBroken`, `ClaudeOrchestratorPollErrors`, `ClaudeOrchestratorSpawnHookFailing`. Additional rules: fixed fleet `ClaudeRunnersBelowFloor` (set the floor to about half your replica count rounded up; replace the `claude-runners` namespace, or remove the matcher/label if targets have no `namespace` label; keep `ClaudeRunnerPollStale`/`ClaudeRunnerPollErrors` loaded since it still counts a runner that can't poll); on-demand `ClaudeOrchestratorSessionsWaiting` (pending > 0 for 10m; raise the threshold if a session is always waiting; keep `ClaudeOrchestratorDisconnected` loaded, since it stops firing ~2 minutes after the last orchestrator disconnects), `ClaudeOrchestratorQueueWaitHigh` (p99 queue wait > 160 s over 10m, for 5m) and `ClaudeOrchestratorAbsent` (`absent(...orchestrator_connected{namespace="claude-runners"})` for 5m; omit on Prometheus servers that don't scrape the orchestrator; the orchestrator's other alerts stop firing within ~10 minutes of it going down). See the official page for the complete rule YAML.
- Source: https://code.claude.com/docs/en/self-hosted-environments-reference.md, fetched 2026-11-14

### Session cost join

```text
sum by (ccr_session_id) (claude_code_cost_usage_total)
and on (ccr_session_id)
label_replace(
  claude_code_self_hosted_runner_session_idle_seconds > 600,
  "ccr_session_id", "cse_$1", "session_id", "session_(.*)"
)
```

### PodMonitor

```yaml
# Example Prometheus Operator PodMonitor for the Claude Code self-hosted
# runner + orchestrator. Adjust the namespace and label selectors to match
# your deployment. Both the runner and the orchestrator serve /metrics on
# their --health-port (default 8080).
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: claude-code-self-hosted-runner
  namespace: monitoring
spec:
  namespaceSelector:
    matchNames:
      - claude-runners
  selector:
    matchExpressions:
      # Matches the runner Deployment from the Kubernetes recipe, plus any
      # on-demand runner Jobs and orchestrator pods you label the same way
      # and give a named 'health' containerPort.
      - key: app.kubernetes.io/part-of
        operator: In
        values: [claude-code-self-hosted-runner]
  podMetricsEndpoints:
    - port: health
      path: /metrics
      interval: 30s
```

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
