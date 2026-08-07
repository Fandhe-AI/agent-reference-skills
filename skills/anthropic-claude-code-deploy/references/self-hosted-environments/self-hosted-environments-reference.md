<!-- source: https://code.claude.com/docs/en/self-hosted-environments-reference.md / last verified: 2026-08-07 -->

# Self-hosted environments reference

Complete flag/env-var/metric reference for the two processes you run: the runner (executes cloud sessions on your hosts) and the optional autoscaling orchestrator (spawns runners as sessions queue). Run `claude self-hosted-runner --help` for the authoritative list on your installed version.

## Signature / Usage

```bash
claude self-hosted-runner --environment-secret-file /etc/claude/environment-secret \
  --base-dir /workspace --capacity 4

claude self-hosted-runner orchestrator \
  --environment-secret-file /etc/claude/environment-secret \
  --hooks-dir /etc/claude/hooks --min-idle 1
```

## Options / Props

Key runner flags (env var, default in parentheses):

| Name | Type | Description |
|------|------|-------------|
| `--environment-secret-file <path>` (`SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET`) | required | Environment secret, or the orchestrator's single-use work-order JWT. Old `--pool-secret-file`/`SELF_HOSTED_RUNNER_POOL_SECRET` still work (deprecated) |
| `--base-dir <path>` (`SELF_HOSTED_RUNNER_BASE_DIR`, `/workspace`) | path | Checkout/working directory; must match across all runners in an environment |
| `--capacity <n>` (default `1`) | int | Max concurrent sessions, all from the same locked account |
| `--drain-grace-sec <n>` (default `0`) | seconds | `0` = exit immediately once active sessions finish; positive = keep polling the locked account's queue for N seconds |
| `--drain-wait-sec <n>` (default `0`) | seconds | On `SIGTERM`, wait up to N seconds for in-flight turns before terminating the child |
| `--retire-at <epoch-seconds>` | timestamp | Retire at an absolute Unix time for infra that kills hosts at a known time |
| `--release-idle-session-min <n>` / `--kill-session-after-min <n>` | minutes | Idle-release timeout and hard max-lifetime backstop (`0` disables either) |
| `--confine-repo-settings <warn\|enforce\|off>` (default `warn`) | mode | Repo-settings write-scope guard |
| `--lock-to-account <id>` | email or `user_...` | Pre-lock the runner to an account at startup |
| `--hooks-dir <path>` / `--exec-path <path>` | path | Lifecycle hooks directory / wrapper binary |
| `--health-port <port>` (default `8080`) | port | `/healthz` + `/metrics` listener; `0` disables |

Orchestrator-only flags: `--hook-concurrency` (4), `--hook-timeout` (60s), `--expected-spawn-seconds` (120, range 10–3600, shared across replicas), `--min-idle` (0, pre-warming), `--debug-dir`; SCM connector: `--scm-connector-host`, `--scm-connector-id`, `--scm-connector-provider` (`ghe`), `--scm-connector-ca-file`.

## Notes

- Duration flags: CLI takes minutes/seconds, the paired env var is always milliseconds (`_MS` suffix) — e.g. `--exit-if-unused-min 10` ≡ `SELF_HOSTED_RUNNER_IDLE_SHUTDOWN_MS=600000`. Most `--*-min` flags cap at 10080 min (7 days); a flag overrunning its cap errors at startup, an env var is silently clamped.
- `pool` vs `environment`: metric series and some API fields still say `pool`/`pool_id` (`ccpool_...`); CLI flags/env vars say `environment` (e.g. `--environment-secret-file`). Same concept, two spellings.
- Health endpoint `GET /healthz`: always `200` while the process is alive; body carries `last_poll_age_ms` — use that (not the HTTP status) as the real liveness signal for a stuck poll loop.
- Key Prometheus series: `claude_code_self_hosted_runner_active_sessions`/`_capacity` (utilization), `_last_poll_age_seconds` (alert >60s), `_poll_errors_total{error_kind}`, `_sessions_{started,completed,failed,interrupted}_total{client_platform}`, `_session_init_duration_seconds`. Orchestrator adds `_orchestrator_connected`, `_pool_pending_sessions`/`_pool_active_sessions` (env-wide, use MAX not SUM across replicas), `_queue_circuit_broken_sessions` (alert if >0), `_spawn_hooks_total{result}`.
- Session lifecycle counter semantics: `sessions_completed_total` also covers idle release, startup timeout, and server-side deassign (clean handoffs) — not just a plain `exit 0`; `sessions_interrupted_total` is for operator-initiated kills (drain, max-lifetime watchdog, `released=false` backstop). On a one-shot fleet (`--capacity 1`, `--drain-grace-sec 0`) these terminal counters rarely survive a scrape window since the process exits right after — prefer the orchestrator's throughput/backlog series or the `post-session` hook for per-session guarantees instead.
- Telemetry: session children send operational telemetry to Anthropic (no code/repo content) unless disabled via `DISABLE_TELEMETRY`/`DO_NOT_TRACK`/etc.; `CLAUDE_CODE_BYOC_ENABLE_DATADOG=1` is self-hosted-specific and off by default.

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Customize sessions in self-hosted environments](./self-hosted-environments-configuration.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
