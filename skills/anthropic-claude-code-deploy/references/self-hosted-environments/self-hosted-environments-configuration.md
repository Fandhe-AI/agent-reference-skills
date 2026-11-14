<!-- source: https://code.claude.com/docs/en/self-hosted-environments-configuration.md / last verified: 2026-11-14 -->

# Customize sessions in self-hosted environments

Extension points on the runner host (Linux or macOS, POSIX shell): wrapper scripts for per-session credentials, lifecycle hooks that replace pipeline stages, on-demand runner spawning, Bedrock / Agent Platform model routing, MCP server delivery, and permission/tool-approval config. Some hook variables still say `pool` (e.g. `CLAUDE_RUNNER_POOL_ID`); CLI flags and env vars say `environment`.

## Signature / Usage

```bash
# Point the runner at a wrapper that execs into the pinned binary
claude self-hosted-runner --environment-secret-file /etc/claude/environment-secret --base-dir '<writable-dir>' --exec-path /etc/claude/session-wrapper.sh
```

```bash
#!/bin/bash
# wrapper: exec into the runner's own binary so signals/exit codes propagate
exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@"
```

Provision credentials scoped to the session creator (`decode-token` reads the token from an argument, `CLAUDE_CODE_SESSION_ACCESS_TOKEN`, or stdin, in that order):

```bash
#!/bin/bash
# Key on the stable Anthropic user ID and require a human creator.
CREATOR_SUB=$("$CLAUDE_RUNNER_CLAUDE_BIN" self-hosted-runner decode-token \
  | jq -re '.act.sub // "" | select(startswith("user:"))') \
  || { echo "decode-token: verification failed or no human creator" >&2; exit 1; }

creds=$(your-sts-helper assume-role --subject "$CREATOR_SUB") \
  || { echo "credential exchange failed" >&2; exit 1; }
eval "$creds"

exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@"
```

Backgrounding the child while keeping stdin (a bare `&` severs it):

```bash
exec 9<&0   # the runner uses 3, and from v2.1.309 reserves 4 and 5
"$CLAUDE_RUNNER_CLAUDE_BIN" "$@" <&9 9<&- &
CHILD=$!
trap 'teardown' EXIT
wait "$CHILD"
```

Start the orchestrator (on-demand runners), draining hooks on stop:

```bash
claude self-hosted-runner orchestrator \
  --environment-secret-file /etc/claude/environment-secret \
  --hooks-dir /etc/claude/hooks \
  --shutdown-drain-sec 70
```

## Options / Props

### Wrapper environment

| Name | Type | Description |
|------|------|-------------|
| `--exec-path <path>` / `SELF_HOSTED_RUNNER_EXEC_PATH` | runner flag | Wrapper run in place of the Claude Code binary, once per session (including resume/requeue); takes precedence over the `command` hook |
| `--hooks-dir <path>` / `SELF_HOSTED_RUNNER_HOOKS_DIR` | runner flag | Directory of executable lifecycle hooks (`checkout`, `post-session`, `command`; orchestrator: `spawn-runner`); absent hooks fall through to built-in behavior. Hooks run with the runner's privileges and session children share the UID, so mount read-only or bake into the image |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | wrapper env var | Session JWT (`sk-ant-cc-`); `act` claim identifies the creator. Only the spawn-time value; refreshes arrive over stdin |
| `CCR_SESSION_ACCOUNT_EMAIL` | wrapper env var | Creator email pre-extracted from `act.email` without signature verification; for labelling (commit trailers), not auth. Unset when no email (e.g. service-identity sessions); treat as PII |
| `CLAUDE_RUNNER_CLIENT_PLATFORM` | wrapper / hook env var | Surface that created the session (`web_claude_ai`, `desktop_app`, `ios`, `claude_code_cli`, `scheduled_trigger`); analytics/labelling only, not authorization. Unset if unrecognized. v2.1.229+ |
| `CLAUDE_RUNNER_CLAUDE_BIN` | wrapper env var | Absolute path to the runner's own binary; `exec` into it, don't hardcode an install path or use a PATH-resolved `claude` (defeats version pinning) |
| `CLAUDE_CODE_REMOTE_SESSION_ID` / `CLAUDE_CODE_REMOTE_SESSION_UUID` | wrapper env var | `cse_...` session ID / canonical UUID. Replace `cse_` with `session_` to get the hooks' `CLAUDE_RUNNER_SESSION_ID` (the ID in the session URL) |
| `CLAUDE_CODE_REMOTE_SLACK_THREAD_URL` / `_THREAD_TS` / `_CHANNEL_ID` | wrapper / `command` hook env var | Claude Tag sessions tied to a Slack thread (thread link, timestamp such as `1700000000.000100`, channel ID such as `C0123ABCDE`). Each can be unset independently; record channel ID with the thread TS. Not passed to `checkout` / `post-session` / `spawn-runner` hooks |
| `CLAUDE_SESSION_INGRESS_TOKEN_FILE` | wrapper env var | Per-session file with the current session JWT (kept fresh), used by subprocesses downloading user attachments. A wrapper that rebuilds the child's env must carry it over |
| `CLAUDE_CONFIG_DIR` | wrapper env var | Per-session config dir seeded from the host snapshot; writes isolated to the session. Stays under `<base-dir>/_sessions/` after the session unless `--remove-session-state` |
| `CLAUDE_CODE_REMOTE_MCP_CONFIG` | wrapper env var | File in `CLAUDE_CONFIG_DIR` holding the control plane's delivered MCP servers. If the wrapper rebuilds the child env, carry it plus `CLAUDE_CODE_REMOTE` and `CLAUDE_CODE_ENVIRONMENT_KIND` unchanged, or servers added with `--mcp-config` can be stopped on update. v2.1.299+ |
| `ANTHROPIC_BASE_URL` | wrapper env var | Delivered per session, normally `https://api.anthropic.com`; don't override (the inference credential is an Anthropic OAuth token) |
| `CLAUDE_CODE_OAUTH_TOKEN` | wrapper env var | ~30-min inference-scoped OAuth token; re-minted before expiry and rotated over the child's stdin. Not bounded by your IP allowlist; treat as a bearer credential (don't log, write to disk, or forward outside the session container) |
| `CLAUDE_RUNNER_ALIVE_EVERY_MS` | wrapper env var | How often the child reports alive when a turn starts before init; carry it over if the env is rebuilt, or the runner can release the session (`no child output for <n> — releasing`). Needs v2.1.309+ on runner and child |
| `--permission-mode auto` | appended flag | Pins auto mode from a wrapper/`command` hook (append after `"$@"`) |

### `checkout` hook variables

| Name | Type | Description |
|------|------|-------------|
| `CLAUDE_RUNNER_REPO_URL` | env var | Repo URL after `--git-host-rewrite` / `--git-ssh-rewrite` |
| `CLAUDE_RUNNER_REPO_REF` | env var | Revision as requested: branch, tag, SHA, or full ref (`refs/heads/<branch>`, `refs/pull/<number>/head`); empty = default branch |
| `CLAUDE_RUNNER_CHECKOUT_PATH` | env var | Absolute path where the working tree must be left; ends in `<repo-owner>-<repo>` (e.g. `acme-api`); case-only collisions get a suffix (`acme/api` then `Acme/API` → `acme-api`, `Acme-API-2`) |
| `CLAUDE_RUNNER_SESSION_ID` / `_SESSION_UUID` / `_API_BASE_URL` / `_CLIENT_PLATFORM` | env var | `session_...` ID, UUID, API base URL for session-scoped calls, client surface |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN` | env var | Session token for session-scoped calls |
| `GIT_CONFIG_COUNT`, `GIT_CONFIG_KEY_n`, `GIT_CONFIG_VALUE_n` | env vars | Git settings the runner fixes for the hook's git (see Notes). v2.1.280+ |

### `post-session` hook variables

| Name | Type | Description |
|------|------|-------------|
| `CLAUDE_RUNNER_SESSION_ID` / `_SESSION_UUID` / `_API_BASE_URL` / `_CLIENT_PLATFORM` | env var | As for `checkout` |
| `CLAUDE_RUNNER_EXIT_REASON` | env var | `completed` (clean exit, or exited after archive/delete), `failed` (crash or setup failure after start), `interrupted` (released slot, startup timeout, server moved session, poll noticed archive/delete first, draining, `--kill-session-after-min` exceeded), `abandoned` (reserved; hook doesn't currently fire) |
| `CLAUDE_RUNNER_WORKSPACE_PATHS` | env var | Colon-separated absolute paths of working trees; empty for zero-repo sessions |
| `CLAUDE_RUNNER_DEBUG_LOG_PATH` | env var | Session debug log, still on disk while the hook runs |
| `CLAUDE_CODE_SESSION_ACCESS_TOKEN`, `GIT_CONFIG_*` | env vars | As for `checkout` (git settings v2.1.280+) |

### `spawn-runner` hook variables

| Name | Type | Description |
|------|------|-------------|
| `CLAUDE_RUNNER_WORK_ORDER_FILE` | env var | Temp file with the signed work-order JWT the new runner registers with; deleted after the hook exits (copy the JWT, e.g. into a Kubernetes Secret); don't log it |
| `CLAUDE_RUNNER_ORDER_ID` | env var | Opaque idempotency key, unique per spawn request, safe for Kubernetes names; the only valid dedup key |
| `CLAUDE_RUNNER_SESSION_ID` / `_SESSION_UUID` | env var | Session for this request; repeats on every re-request (logging/routing only); empty for pre-warming requests |
| `CLAUDE_RUNNER_ATTEMPT` | env var | Per-session counter for logging; not a retry count; `0` for pre-warming (and possibly a session request) |
| `CLAUDE_RUNNER_ORDER_SERVER_TIME` | env var | Server time from the poll's HTTP `Date` header; compare the work-order JWT `exp` against it to tolerate skew; empty if omitted |
| `CLAUDE_RUNNER_POOL_ID` | env var | Environment ID (`ccpool_...`) the new runner should join |
| `CLAUDE_RUNNER_ACCOUNT_ID` / `_ACCOUNT_EMAIL` | env var | Account that enqueued the session (routing, quota, chargeback; empty when unavailable); email is PII, don't log |
| `CLAUDE_RUNNER_PRIMARY_REPO_URL` / `_PRIMARY_REPO_REVISION` / `_REPO_SOURCES` | env var | First git source URL / revision, and JSON array of `{url, revision}` for all sources (routing); empty when none |
| `CLAUDE_RUNNER_CORRELATION_ID` | env var | Correlation ID supplied at session create; empty if none |
| `CLAUDE_RUNNER_CLIENT_PLATFORM` | env var | Client surface; unset for unrecognized and pre-warming requests |
| `CLAUDE_RUNNER_SPAWN_REASON` | env var | Why the request was sent (table in Notes); unset if absent. Requires v2.1.318+ on the orchestrator |

## Notes

- The `eval "$creds"` line in the example above runs whatever `your-sts-helper` prints; use only a trusted helper that emits fixed `export` lines and never feed it user-controlled values.

- Self-hosted environments are in public beta on Team and Enterprise plans; an Owner enables them via **Allow self-hosted environments** on the Cloud environments admin page.
- Under `set -u`, expand variables that can be unset with a default: `CCR_SESSION_ACCOUNT_EMAIL`, `CLAUDE_RUNNER_CLIENT_PLATFORM`, `CLAUDE_CODE_REMOTE_SLACK_THREAD_URL`, `_THREAD_TS`, `_CHANNEL_ID` (e.g. `"${CCR_SESSION_ACCOUNT_EMAIL:-}"`). Quote every argument/variable (pass `"$@"`); values can hold JSON, sentences, or permission rules like `Bash(npm run test *)`; never substitute into `eval` / `sh -c` strings.
- Keep stdin and fd 3 attached: stdin is the control channel (token rotation, session-end signals), fd 3 carries activity signals for idle/startup timeouts. A bare `&` severs stdin; the session looks healthy until the ~30-min OAuth token expires, then every API call fails `401 authentication_error`. Don't close or reuse fd 3; fds 4 and 5 are reserved from v2.1.309 (use 6–9 for saved stdin). stdout can be redirected. On non-zero exit the runner posts the tail of stderr to the session (the user sees it): no secrets, remove `set -x`.
- System prompt flags: v2.1.281+ delivers prompts as `--system-prompt-file <path>` / `--append-system-prompt-file <path>` (before, `--system-prompt <text>` / `--append-system-prompt <text>`). Pass them through via `"$@"`. On v2.1.281+, a file flag you append replaces the server's (last occurrence wins); put extra instructions in the image's `CLAUDE.md`. `Argument list too long` (exit 126) occurs when one argument reaches 128 KB on Linux (`getconf ARG_MAX` is a separate total limit). On v2.1.283+ keep the file flags in `"$@"` and pass only your own text: `exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@" --append-system-prompt "$(cat /opt/team-instructions.md)"`; on v2.1.281/282 that errors `Cannot use both --append-system-prompt and --append-system-prompt-file`, earlier versions silently replace the control plane's prompt.
- `jq -re` (not `-r`) when an extracted claim gates auth. Service-identity sessions carry `agent:` not `user:`, so the credential example refuses them; decide explicitly on a fallback. `.act.email` exists only when the creating surface recorded it (a CLI-dispatched session can lack it).
- Lifecycle hooks are distinct from Claude Code hooks (which run inside the session). `checkout` runs per repository on every session start/resume/requeue, replacing built-in clone/fetch; it must leave a working tree at `CLAUDE_RUNNER_CHECKOUT_PATH` at the requested revision (detached HEAD fine). The runner then verifies `.git` exists; set `CLAUDE_RUNNER_SKIP_GIT_VERIFY=1` for non-git sources (export outcomes via `post-session`). On success the runner removes the checkout path after the session.
- `checkout` credentials: no git credential is passed and `decode-token` is unavailable (`CLAUDE_RUNNER_CLAUDE_BIN` unset). Verify `CLAUDE_CODE_SESSION_ACCESS_TOKEN` with a JWT library against the JWKS under `CLAUDE_RUNNER_API_BASE_URL`, mint a short-lived clone credential keyed on `act.sub` (don't require `act.email`), or use host git auth (SSH agent, credential helper, `.netrc`).
- `checkout` failure (non-zero exit, or exit 0 without a usable checkout): for a repo the session pushes to, the session fails and the stderr tail is shown (one short last line, no secrets; `couldn't find remote ref` in the last ~4 KB reports a missing branch); for a read-only repo (e.g. added mid-session) the runner skips it with a `Skipped` step (detail on the `[runner:warn] checkout hook failed` log line) unless that leaves no repository, which fails the session.
- `post-session` runs after the child exits, before workspace teardown; it is the only chance to save uncommitted work (at `--capacity` above one worktrees are deleted right after; at `--capacity 1` the reused canonical clone is hard-reset at next start). Fires on every session end where a child spawned; can't fire on abrupt termination (VM preemption, power loss) — snapshot periodically from a Claude Code `PostToolUse` hook for that. Exit status never affects the outcome (logged and ignored); waits up to `--post-session-hook-timeout-sec` (60 s default). Some `interrupted` receipts count as `completed` in the runner counters.
- `post-session` timing on release (v2.1.236+): idle-after-turn or startup-timeout sessions: the child stops and the hook runs to completion before the session is released (a user message can't resume it elsewhere first); waiting-for-user-prompt sessions: released first, then the hook runs (can resume on another runner before it finishes). Applies at idle timeout, `--retire-at`, and (v2.1.260+) `--kill-session-after-min`; a turn-ended session holding only background tasks counts as idle. Before v2.1.236 the runner always released first. On `SIGTERM` drain the lease is held until the hook finishes.
- `post-session` rescue example (official): loops over `CLAUDE_RUNNER_WORKSPACE_PATHS`, runs git with `-c core.fsmonitor=false -c core.hooksPath=/dev/null -c commit.gpgsign=false`, `add -A`, commits `runner snapshot: $CLAUDE_RUNNER_SESSION_ID ($CLAUDE_RUNNER_EXIT_REASON)` and pushes `HEAD:refs/heads/rescue/$CLAUDE_RUNNER_SESSION_ID`, limiting `GIT_ALLOW_PROTOCOL` to `https:http:ssh`. Under the no-credentials-in-the-image posture (including the Anthropic git proxy) mint a short-lived push credential inside the hook from the session token, scoped to that push only; repo-local `credential.helper` and `pushurl` still apply (and `core.sshCommand` before v2.1.280). See the official page for the full script.
- Git configuration inside lifecycle hooks (v2.1.280+; before it the runner set none of these and, under `--configure-git`, a hook commit failed unless it passed `-c commit.gpgsign=false`): the runner sets `GIT_CONFIG_COUNT`/`_KEY_n`/`_VALUE_n` plus git env vars for hook git only. `core.hooksPath` defaults to `/dev/null` (supply your own by exporting a `GIT_CONFIG_KEY_n`/`VALUE_n` pair; the system git config's value is used only if the runner's user can't write that file, directory, or hook files; ignored values warn at startup), `core.fsmonitor` empty, `GIT_ALLOW_PROTOCOL=https:http:ssh` (`file://`, `git://`, local paths fail with `transport 'file' not allowed`), `core.sshCommand` / `core.askPass` from config files ignored (use `GIT_SSH_COMMAND` / `GIT_ASKPASS` in the runner's env; no credentials in them), gpg program paths set by the runner, and signing only under `--configure-git` (else `commit.gpgsign` / `tag.gpgsign` = `false`). Startup logs a `[runner:git] lifecycle hooks:` line. Overrides: a `GIT_CONFIG_KEY_n` pair in the runner env replaces the runner's value for that key (number from `0`; if the last pair announced by `GIT_CONFIG_COUNT` is missing all your pairs are ignored with a warning); the runner leaves `GIT_ALLOW_PROTOCOL`, `GIT_SSH_COMMAND`, `GIT_ASKPASS` as you set them; a `git -c` in the hook overrides a pair but not those three. Credential helpers, `url.*.insteadOf`, and filter drivers from writable config files still apply and run with the hook's privileges.
- `command` hook: replaces child spawn after checkout, same env as a wrapper, `exec` into `"$CLAUDE_RUNNER_CLAUDE_BIN"`; ignored if `--exec-path` is set.
- On-demand runners: the orchestrator is a stateless subcommand polling for one spawn request per queued session with no runner; it runs `${hooks-dir}/spawn-runner` and keeps the environment secret only on the orchestrator host (never runs user code); each spawned runner gets a single-use work order registering exactly one runner. Run 2+ replicas for availability (each request is claimed by one replica; same `--expected-spawn-seconds`). The hook must submit asynchronously and return within `--hook-timeout` (60 s). Start the spawned runner with `--environment-secret-file` pointing at a file with the work-order JWT (or `SELF_HOSTED_RUNNER_ENVIRONMENT_SECRET`), copy the JWT before the hook exits, use `--capacity 1` (a session-bound work order registers one runner; higher capacity warns), and note pre-warming work orders register unbound and claim queued work like a fixed-fleet runner.
- `spawn-runner` contract: (1) idempotent on `CLAUDE_RUNNER_ORDER_ID` — derive resource names from it, never from the session ID (a re-opened session sends the same session ID with a new order ID; a name based on the session ID collides with the old workload so no runner starts). (2) Don't retry the workload (one order ID, at most one workload; Anthropic re-requests after `--expected-spawn-seconds`). (3) Exit codes: `0` submitted; `1` or still running at `--hook-timeout` = retryable (backs off, re-offered, blocked after 10 failed requests in a row); `2`+ = non-retryable, session blocked until a user sends a new message or an Owner selects **Retry** in the environment's **Activity** tab. Backoff shows **Queued** with no spawn error; blocked shows **Failed** with the last 512 characters of the hook's stderr (write an actionable error, no secrets). Pre-warming requests have no session to fail (non-zero exit logged locally; server re-requests after the lease). (4) `--expected-spawn-seconds` ≥ your p99 from request receipt to runner registration (includes platform capacity wait; the work order expires with it). Hook stdout/stderr go to the orchestrator log with credentials redacted; check `/healthz` queue counts, then the **Activity** tab.
- Re-opened session stuck (Queued/Failed) when the name/key uses the session ID — outcome by hook behavior when the workload exists: exit 0 → Failed after 10 in a row (`runner did not register within ETA after max attempts`); exit 1 → after 10 (hook stderr tail or `exit 1`); exit 2+ → right away (stderr tail or `exit 2`); wait to timeout → after 10 (`spawn-runner hook timed out after 60000ms` where `60000` is `--hook-timeout` in ms). Fix: `name="runner-${CLAUDE_RUNNER_ORDER_ID}"`; make waiting hooks exit after submitting; then Queued sessions retry on their own, Failed need Owner **Retry** or a new user message.
- Make on-demand runners exit when idle (pass to runners your hook starts): `--release-idle-session-min 30` (release after idle minutes and exit 0; unpushed work is gone; hold sessions for left-running processes), `--kill-session-after-min 480` (backstop above your longest session), `--exit-if-unused-min 60` on standby runners (use a value well above boot time if `--min-idle` is set). Remove the workload on exit (`ttlSecondsAfterFinished` on a Kubernetes Job, or VM start script deleting the VM).
- Background processes started by the hook: redirect output to a file (`your-background-command >> "$HOME/claude-runner.log" 2>&1 &`); otherwise ~1 s after hook exit the orchestrator logs `exited, but a process it started still has the hook's stdout or stderr open`, keeps up to 64 KB under `[runner:hook:spawn-runner:after-exit jti=<order id>]`, and writes fail once the orchestrator exits. A runner started by the hook itself runs sessions on the orchestrator host, which holds the environment secret. Before v2.1.305 such a hook still hit `--hook-timeout` (`timed out after 60000ms, sending SIGTERM to process tree`).
- Don't wait for the runner in the hook: a hook that starts `claude self-hosted-runner` on the orchestrator host and waits (foreground or `wait`) is killed with its process tree at `--hook-timeout`, cutting off running turns (look for `timed out after 60000ms, sending SIGTERM to process tree`). Submit and exit 0; raising the timeout only delays the stop.
- Shell hooks with `set -e`: failures like `127` (missing command) or `22` (`curl --fail`) exit 2+ and block the session at the first failure. Put the trap lines below right under the `#!` line (bare `exit 2+` becomes exit 1; call `permanent "reason"` in the main shell for unfixable errors; don't `exec` the last command; merge a second EXIT trap into one, e.g. `trap 'rc=$?; your-cleanup-command || true; [ "$rc" -eq 0 ] || [ -n "${PERMANENT:-}" ] || exit 1' EXIT`; add `|| true` only to commands allowed to fail, never to the submit command; name the workload after `CLAUDE_RUNNER_ORDER_ID` and treat only an already-exists answer as success; for an object holding a secret print a fixed message instead of command output). Verify by adding `no-such-command` below the `trap` line and checking `echo $?` prints `1`.
- Spawn reasons (`CLAUDE_RUNNER_SPAWN_REASON`; read as `"${CLAUDE_RUNNER_SPAWN_REASON:-}"`, always start the runner whatever the value, keep a default branch since values can be added; shows only the last recorded cause): `session_created` (first request; can instead carry `runner_lost` if a fixed-fleet or standby runner held the session), `no_runner_registered` (none registered within `--expected-spawn-seconds`, no failure report recorded), `hook_failed` (orchestrator reported a retryable failure, or handed the request back without running the hook while stopping), `runner_lost` (runner stopped reporting, deregistered, or was deleted: node eviction, OOM kill, spot reclaim, rollout), `runner_reported_failure` (e.g. checkout failure), `resumed` (paused session needs a runner after a new message), `requeued` (Owner **Retry** or blocked session got a message), `server_retry` (Anthropic retrying; report repeated occurrences to your Anthropic account team), `prewarm`. To find earlier reasons search every replica's log for `session=` plus the `CLAUDE_RUNNER_SESSION_UUID`: `[runner:orchestrator] ok session=` (hook exited 0) and `nack session=` lines show `reason=` (or `reason=-`); also `stop: no nack for session=`, `nack failed session=`, `stop: handing back session=`.
- Stop/restart the orchestrator: `--shutdown-drain-sec` (v2.1.299+; older versions exit with `error: unknown flag --shutdown-drain-sec`) lets running hooks finish on `SIGTERM`; hooks still running at the deadline get `SIGTERM`; a second `SIGTERM` or any `SIGINT` exits without waiting; `[runner:orchestrator] stop summary:` counts outcomes. Without it, the orchestrator stops immediately, running hooks get `SIGTERM`, Anthropic isn't told, and a session without a runner waits for the re-request after `--expected-spawn-seconds` (120 s). Sizing: defaults → `--shutdown-drain-sec 70` with stop timeout 85 s (`terminationGracePeriodSeconds: 85` / `TimeoutStopSec=85`); generally drain ≥ `--hook-timeout` + 10 s and stop timeout ≥ drain + 15 s (startup logs a `shutdown drain:` line). Send a single `SIGTERM` to the orchestrator process alone; systemd default `KillMode=control-group` also signals hooks (a hook can die before submitting). If the hook submits a workload and exits, run the orchestrator as the unit's main process with `KillMode=mixed`; if the hook starts runners inside the orchestrator's unit, `KillMode=mixed` sends them no `SIGTERM` and systemd later `SIGKILL`s them (no session drain, no `post-session`).
- Bedrock / Agent Platform: configure the runner (every runner in the environment identically — sessions route to an environment, and a requeued session can land on another runner) for Amazon Bedrock or Google Cloud's Agent Platform (formerly Vertex AI) so model requests use your cloud account. The runner still polls Anthropic and each session still sends its event stream (prompts, responses, tool results) to `api.anthropic.com`; the plan requirement and Zero Data Retention exclusion still apply. Steps: (1) prepare model access and a narrow policy/role — Bedrock: limit `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` to the inference profiles and foundation models used; Agent Platform: custom role with only `aiplatform.endpoints.predict`; allow the provider endpoints through egress (otherwise Claude Code can retry for hours before an error shows). (2) Attach it to an identity that can do nothing else. Anyone who can run code in a session (including via prompt injection) can use these credentials at your cost while valid; shell commands, Claude Code hooks, and stdio MCP servers inherit them; hardening can't keep this credential out. Denying the cloud metadata endpoint also blocks instance-profile credentials (file-based web identity such as IRSA or a Workload Identity Federation file doesn't depend on it); use a self-renewing method since wrapper-exported credentials aren't renewed (and a wrapper exporting AWS credentials for other work lets Claude Code sign model requests with them). (3) Set exactly one provider's variables in the runner's environment (container spec or service unit; on-demand runners: on the spawned workload), then restart, and start the runners with `--confine-repo-settings enforce` after clearing `warn` output. (4) Verify from inside a session: `env | grep -E 'CLAUDE_CODE_USE_(BEDROCK|VERTEX)'` (both set → Bedrock wins; no output → neither reached it); it shows configuration, not traffic.
- Bedrock / Agent Platform session differences: server-managed settings and Owner organization policies don't reach these sessions (put rules in the image's managed settings file); account skills aren't downloaded; files attached in claude.ai or the apps don't reach the session and `SendUserFile` can't return files; the runner strips `ANTHROPIC_MODEL` and `ANTHROPIC_DEFAULT_MODEL` (the control plane sends the model, else the provider default) but per-family pinning variables reach sessions and decide what an alias like `opus` resolves to (not full model IDs); enable the models developers can choose, the background model, and the auto mode classifier model (on Bedrock allow each in the policy); web search isn't available on Bedrock and fast mode on neither provider.
- MCP servers: add at image build with `claude mcp add --scope user` (user scope required; the default local scope writes a per-directory key the runner doesn't seed). The runner snapshots the `mcpServers` key of the host's `.claude.json` (next to, not inside, `~/.claude/`) once at startup and seeds only that key; for a bare-process runner run the command as the runner's user, then restart. Unrecognized entry `type`s are dropped with a startup warning. `SELF_HOSTED_RUNNER_HOST_CONFIG_DIR` redirects the `.claude.json` read; an empty dir disables seeding. Other sources: enterprise-scope managed MCP file (`/etc/claude-code/managed-mcp.json` on Linux, `/Library/Application Support/ClaudeCode/managed-mcp.json` on macOS; when present Claude Code skips control-plane-delivered servers including claude.ai connectors and logs them at `debug` level; before v2.1.229 those sessions exited at startup with `You cannot dynamically configure MCP servers when an enterprise MCP config is present`); the `managedMcpServers` key in managed settings (HTTP/SSE without exclusive control; v2.1.259+); `<repo>/.mcp.json` (project scope; auto-approved in cloud sessions; at most one repository's file loads in a multi-repo session; with `--trust-workspace false` skipped unless host settings approve, e.g. `enabledMcpjsonServers`; v2.1.319+); and `--mcp-config` appended after `"$@"` (`exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@" --mcp-config /etc/claude/mcp.json`; pass the full environment so those servers survive mid-session delivery updates — before v2.1.299 they shut down at the first update). Connector delivery (claude.ai connectors) is server-driven through `api.anthropic.com` for interactively-created sessions only; CLI-dispatched sessions don't get it, and the child doesn't fetch connectors itself. A connector of the same name wins over host `.claude.json` / `.mcp.json` servers (rename yours to use both). `settings.json` has no MCP server definitions or top-level `mcpServers`. Set `ENABLE_TOOL_SEARCH` in the runner environment for MCP tool search.
- MCP wait before the first turn: at session startup a session waits up to 5 s for HTTP/SSE servers with `alwaysLoad: true` (all servers if `MCP_CONNECTION_NONBLOCKING=0` in the runner env; `MCP_CONNECT_TIMEOUT_MS` changes the 5 s); the first turn waits up to 2 s for stdio servers still connecting (`CLAUDE_CODE_MCP_STARTUP_WAIT_MS`, v2.1.274+). Late servers appear later without action. `claude mcp add` has no `alwaysLoad` flag; use `claude mcp add-json` (Dockerfile example below).
- Turn off built-in session tools: the control plane attaches its own MCP server, Claude Code Remote (cloud scheduled tasks, starting/steering other cloud sessions, attaching repositories, following PR activity). Deny it with server-level rules (names are matched exactly; the server registers under one of three names) in server-managed settings or the runner's `~/.claude/settings.json` (use the latter on Bedrock/Agent Platform runners); append `__<tool>` for a single tool (`mcp__Claude_Code_Remote__add_repo`); to block connecting at all add the three names without `mcp__` as `serverName` entries under `deniedMcpServers`. Verify by asking Claude to list its MCP tools.
- Prompt sessions to push their work: Anthropic-hosted sessions run a `Stop` hook that prompts Claude to commit and push; the runner installs none, so uncommitted work stays on the runner's disk and **Create PR** in claude.ai/code stays inactive until the branch is on the remote. Merge the `Stop` settings block below into `~/.claude/settings.json` and save the official `stop-hook-nudge.sh` (see the official page for the script) to `~/.claude/hooks/` on the runner host, executable; it nudges once per turn (re-entry guard on `stop_hook_active`) for uncommitted changes (excluding `.claude/`) or unpushed commits, runs git with `core.fsmonitor=` and `core.hooksPath=/dev/null` and `GIT_OPTIONAL_LOCKS=0` (hooks run outside the Bash sandbox, so don't count on the sandbox alone), and JSON-escapes the branch name. It needs a git identity (`user.name` / `user.email`, or `--configure-git`), push credentials (Anthropic-managed git proxy or git config shipped in the image), and for resumed sessions `--push-outcome-on-release` on every runner. On a large checkout raise the hook `timeout` (the `git status` skips `core.fsmonitor`, so >10 s possible; a timed-out hook ends the turn with no prompt).
- Stop hook and submodules: it checks which commit each submodule is on, not files inside it — a new submodule commit prompts until the parent records it (even with `ignore = all`), uncommitted submodule files don't prompt, unpushed submodule commits aren't checked. Replace an earlier copy of the script lacking `GIT_OPTIONAL_LOCKS` (now if sessions use the Bash sandbox, otherwise at the next image build/restart; keep your Stop settings except a larger `timeout`).
- Permissions: a self-hosted session has no terminal, so an unanswered permission prompt stalls the turn until the user responds in the UI. The control plane sends the tool list and permission rules with the work payload; defaults pre-approve routine calls including `Bash`, and cloud sessions pre-approve file edits regardless of mode. Pin auto mode only on environments with default-deny network egress and the hardening section in place (routine calls, including `Bash` network requests, run without a human in the loop in the default tool set and in auto mode). The appended mode applies until claude.ai/code or another client sets a mode (e.g. the first message with the mode dropdown on Auto); in auto mode a classifier reviews actions, an explicit ask rule still prompts, and a deny rule stays blocked in every mode. `--allowed-tools` / `--disallowed-tools` accumulate across occurrences, so appended rules apply on top of control-plane rules (e.g. `--allowed-tools "Bash(bazel *) Bash(yarn *) mcp__internal__*"`); `--disallowed-tools` denies even if another rule allows.
- Config assembly: each session gets its own config dir seeded from a snapshot of the host's `~/.claude/` taken once at startup (`settings.json`, `CLAUDE.md`, hooks, agents, commands, skills; restart to apply changes; `projects/` is excluded so auto-memory files placed there aren't seeded and don't turn auto memory on). Outside a project thread, a repo-committed `.claude/settings.json` layers on top of the baseline (at most one repo's in multi-repo sessions); `managed-settings.json` is read from the standard system path in the image. Supplied hooks (v2.1.229+; older runners ignore them; they run `python3`, so install it in the runner image) go to `hooks/.ccr-launcher/` in the session config dir and a separate `--settings` file, alongside your config; they enter the ordinary merged hook config (not the managed tier): `disableAllHooks` disables them and `allowManagedHooksOnly` doesn't keep them loaded. Account skills are downloaded only for a person's own session (not scheduled-task runs, not Bedrock/Agent Platform sessions) — add skills to the image or commit them to the repo's `.claude/skills/` (outside a project thread). Outside Claude Tag sessions, auto memory is off by default; use `CLAUDE.md` in the image or repo.
- `forceRemoteSettingsRefresh`: set `true` in the image's `managed-settings.json` to stop sessions from starting when the server-managed settings fetch fails (a reply that the organization has none counts as success). Leave it out on runners in an environment that an Owner routes Claude Tag channels to (the API refuses those sessions' settings request, so they'd fail to start; put their rules in `managed-settings.json`, which they still read), and it is moot on Bedrock/Agent Platform (they don't fetch server-managed settings). Set it in the file even if also set in the admin console (a new session has no cached copy). A failed fetch shows `Your organization requires remote managed settings to load, but they could not be loaded.`
- Multi-repo sessions: in a project thread no repo's `.claude/settings.json`, `.mcp.json`, or skills load. In other sessions at most one repo's `.claude/settings.json` takes effect as project settings (hooks, deny rules, `env` of the others don't apply): with `--capacity 1` and the built-in checkout the session starts in the first repository (its settings and `.mcp.json` load); with `--capacity` above one or a `checkout` hook it starts in a per-session directory containing the checkouts, so no repo's settings or `.mcp.json` load and `$CLAUDE_PROJECT_DIR` is that directory. Every repo's `CLAUDE.md` loads (and skills outside project threads); each repo is an additional directory, so `enabledPlugins` and `extraKnownMarketplaces` are read from each. For hooks/permissions in every session use the host `~/.claude/settings.json`; write `Read`/`Edit` paths as `//` absolute or `~/` patterns.
- Repository-committed permissions: don't commit a bare `"Edit"`, `"Write"`, or `"NotebookEdit"` in `permissions.allow` (grants writes anywhere on the host; the confine guard flags it, or with `--confine-repo-settings enforce` refuses the session). Repos need no file-tool rule (cloud sessions pre-approve edits); scope any such rule, e.g. `"Edit(/**)"` (single leading slash = project root). Bare rules are fine in the operator's host-level `settings.json`. `defaultMode: auto` is honored only from image-wide or user-level settings.
- Source: https://code.claude.com/docs/en/self-hosted-environments-configuration.md, fetched 2026-11-14

### Trap lines for shell hooks

```bash
set -e
PERMANENT=; permanent() { printf '%s\n' "$*" >&2; PERMANENT=1; exit 2; }
trap 'rc=$?; [ "$rc" -eq 0 ] || [ -n "${PERMANENT:-}" ] || exit 1' EXIT
```

```bash
if ! out=$(kubectl create -f job.yaml 2>&1); then
  case "$out" in
    *AlreadyExists*) ;;
    *) printf '%s\n' "${out:-kubectl create failed}" >&2; exit 1 ;;
  esac
fi
```

### Bedrock / Agent Platform runner variables

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
```

```bash
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=global
export ANTHROPIC_VERTEX_PROJECT_ID=YOUR-PROJECT-ID
```

### MCP at image build

```dockerfile
RUN claude mcp add --scope user sidecar -- /usr/local/bin/mcp-sidecar
RUN claude mcp add --scope user --transport http internal http://mcp-gateway.svc.cluster.local:8080
RUN claude mcp add-json core '{"type":"http","url":"https://mcp.example.com/mcp","alwaysLoad":true}' --scope user
```

### Deny the Claude Code Remote server

```json
{
  "permissions": {
    "deny": [
      "mcp__Claude_Code_Remote",
      "mcp__claude-code-remote",
      "mcp__bf7c680d-5fdc-5ef4-b4a0-abadb619bf0a"
    ]
  }
}
```

### Stop hook settings

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "timeout": 10,
            "command": "\"$CLAUDE_CONFIG_DIR/hooks/stop-hook-nudge.sh\""
          }
        ]
      }
    ]
  }
}
```

### Pin auto mode from the wrapper

```bash
#!/bin/bash
exec "$CLAUDE_RUNNER_CLAUDE_BIN" "$@" --permission-mode auto
```

### Fail closed on settings fetch failure

```json
{
  "forceRemoteSettingsRefresh": true
}
```

## Related

- [Self-hosted environments](./self-hosted-environments.md)
- [Deploy self-hosted environments to production](./self-hosted-environments-deploy.md)
- [Self-hosted environments reference](./self-hosted-environments-reference.md)
- [Verify session identity in self-hosted environments](./self-hosted-environments-identity.md)
