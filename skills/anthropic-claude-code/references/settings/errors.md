<!-- source: https://code.claude.com/docs/en/errors.md / last verified: 2026-08-07 -->

# Error reference

Runtime error messages Claude Code displays, with what each means and how to recover, plus checks for when responses seem off without an error. For installation errors (`command not found`, TLS failures during setup), see the troubleshoot-install docs instead. Except for Wrapper and IDE errors (printed by the launching program), these apply across the CLI, Desktop app, and Claude Code on the web, since all three wrap the same CLI.

## Find your error (message → category)

| Message | Category |
| --- | --- |
| `API Error: 500 Internal server error` | Server errors |
| `API Error: Repeated 529 Overloaded errors` | Server errors |
| `Request timed out` | Server errors (or Network, if it mentions your connection) |
| `Server error mid-response` / `Connection closed mid-response` / `Response stalled mid-stream` | Server errors — response above may be incomplete |
| `Connection closed while thinking` / `Response stalled while thinking` | Automatic retries |
| `<model> is temporarily unavailable, so auto mode cannot determine the safety of...` | Server errors — auto mode classifier |
| `Auto mode could not evaluate this action and is blocking it for safety` | Server errors — auto mode classifier |
| `Auto mode classifier transcript exceeded context window` | Server errors — auto mode classifier |
| `Agent terminated early due to an API error` | Server errors |
| `You've hit your session limit` / `You've hit your weekly limit` / `You've hit your Opus limit` | Usage limits |
| `Usage credits required for 1M context` | Usage limits |
| `Server is temporarily limiting requests` | Usage limits (not your plan quota) |
| `Request rejected (429)` | Usage limits |
| `Credit balance is too low` | Usage limits |
| `Could not update your spend limit` | Usage limits |
| `Not logged in · Please run /login` | Authentication |
| `Could not resolve authentication method` | Authentication |
| `Invalid API key` | Authentication |
| `Your apiKeyHelper script is failing` | Authentication |
| `This organization has been disabled` | Authentication |
| `Your organization has disabled API key authentication` | Authentication |
| `Your organization has disabled Claude subscription access` | Authentication |
| `Routines are disabled by your organization's policy` | Authentication |
| `Remote Control is only available when using Claude via api.anthropic.com` | Authentication |
| `OAuth token revoked` / `OAuth token has expired` | Authentication |
| `API Error: 401 Invalid authentication credentials` | Authentication |
| `Login expired · Please run /login` / `Failed to authenticate: OAuth session expired and could not be refreshed` | Authentication |
| `does not meet scope requirement user:profile` | Authentication — OAuth scope |
| `claude.ai rejected the session token` | Authentication |
| `AWS credentials expired or invalid` | Authentication |
| `AWS authentication failed` | Authentication |
| `AWS default-chain credential resolve timed out` | Authentication |
| `Unable to connect to API` | Network |
| `Unable to connect to Anthropic services` (during setup) | Network |
| `Socket is closed` | Network |
| `Waiting for API response · will retry in` | Automatic retries (or Network, if persistent) |
| `Bedrock streaming response has content-type "..."; expected "application/vnd.amazon.eventstream"` | Network |
| `SSL certificate verification failed` / `SSL certificate error (...)` | Network |
| `403` with `x-deny-reason: host_not_allowed` (cloud/routine session) | Network |
| `Couldn't reconnect to your Remote Control session` | Network |
| `Prompt is too long` | Request errors |
| `Context exceeds the ...-token limit by ... tokens` (in `/context`) | Request errors |
| `Error during compaction: Conversation too long` | Request errors |
| `Request too large` | Request errors |
| `Image was too large` / `Unable to resize image` | Request errors |
| `PDF too large` / `PDF is password protected` | Request errors |
| `Extra inputs are not permitted` | Request errors |
| `There's an issue with the selected model` | Request errors |
| `Model ... is not a recognized model id` | Request errors |
| `Claude Opus is not available with the Claude Pro plan` | Request errors |
| `Model ... is restricted by your organization's settings` | Request errors |
| `thinking.type.enabled is not supported for this model` | Request errors |
| `max_tokens must be greater than thinking.budget_tokens` | Request errors — thinking budget exceeds output limit |
| `API Error: 400 due to tool use concurrency issues` | Request errors — tool use/thinking block mismatch |
| `<model> can't help with this. Start a new session to continue` | Request errors — usage policy refusal |
| `Claude Code is unable to respond to this request, which appears to violate our Usage Policy` | Request errors — usage policy refusal |
| `<model>'s safeguards flagged this message` / `has safety measures that flagged this message for a cybersecurity topic` | Request errors — cybersecurity safety flag |
| `Installation was killed before it could finish (exit code 137)` | Installation errors |
| `The connection dropped while downloading the update` / `Download timed out: exceeded the total deadline` | Installation errors |
| `--bg and --print conflict` | Command-line errors |
| `Error: --json-schema is not a valid JSON Schema` | Command-line errors |
| `Error: Settings file exceeds the 2MiB limit` | Command-line errors |
| `Error: Workspace not trusted` (starting Remote Control) | Command-line errors |
| `Could not import <server>: <reason>` | Command-line errors |
| `Error: MCP tool <name> (passed via --permission-prompt-tool) not found` | Command-line errors |
| ``Shell command failed for pattern "!`git ... origin/HEAD...`"`` | Command-line errors — security review needs origin/HEAD |
| `Input must be provided either through stdin or as a prompt argument when using --print` | Command-line errors |
| `Diff is too large for ultrareview` / `PR #<N> is too large for ultrareview` | Command-line errors |
| `Could not find merge-base with <branch>` | Command-line errors |
| `Your checkout has no branches (detached HEAD only)` | Command-line errors |
| `Failed to resume the conversation` | Command-line errors |
| `Marketplace "<name>" is registered from an untrusted source` | Plugin errors |
| `references ${user_config.*} in a shell-form command` / `Monitor "<name>" from plugin <plugin> references ${user_config.*}` / `headersHelper for MCP server '<name>' references ${user_config.*}` | Plugin errors |
| `would be spawned with zero tools — refusing` | Tool errors |
| `File is covered by a Read deny rule in your permission settings` | Tool errors |
| `Error: this write left the memory index at MEMORY.md at ..., over its ... read limit` | Tool errors |
| `pkill: refusing to run` | Tool errors — pattern matches the Claude Code process |
| `Can't open MCP settings while no terminal is attached to this background session` / `Can't open MCP settings in a background session` | Background session errors |
| `This session has no saved transcript` | Background session errors |
| `This session was running agent '<name>', which is no longer available` | Background session errors |
| `CLAUDE_CODE_PROCESS_WRAPPER: launcher ...` | Background session errors |
| `EUNKNOWN: unknown error, uv_spawn` | Background session errors |
| `Claude Code process exited with code N` | Wrapper and IDE errors |
| `Restored the code, but skipped N files` | Rewind warnings |
| `Ignoring N permissions.allow entries from ... this workspace has not been trusted` | Configuration warnings |
| `... is not matched by file permission checks` | Configuration warnings |
| Responses seem lower quality than usual | Response quality (not a specific error message) |

## Automatic retries

Claude Code retries transient failures up to 10 times with exponential backoff before showing an error (tunable — see Options table). It doesn't always retry a failure that arrives partway through a response.

**Retried**: server errors/overloads/timeouts before any response has streamed; a dropped connection before any text/tool-call/thinking has been produced (re-issued with the same backoff) or after thinking finished but before text/tool-call started (re-issued up to 2 more times, then `Connection closed while thinking...`); a stalled stream in the same window (aborted and re-issued once, outside the 10-attempt budget; a second stall ends with `Response stalled while thinking...`); temporary 429 throttles (including claude.ai-subscription throttles without quota headers, v2.1.199+).

**Not retried**: TLS certificate validation failures (reported immediately so you can fix cert setup — transient TLS conditions like handshake timeout are still retried); a failure arriving after Claude completed a text block or tool call (kept as-is with an incomplete-response notice, to avoid double-running tool calls); a failure after the full response completed (nothing to retry); an Amazon Bedrock streaming response with an unexpected content-type (retrying would hit the same gateway rewrite).

While retrying, the spinner shows `Retrying in Ns · attempt x/y`; if no data arrives for 20 seconds (90 seconds while consulting the advisor) it shows `Waiting for API response · will retry in … · check your network` before any retry starts.

### Tune retry behavior

| Variable | Default | Effect |
| --- | --- | --- |
| `CLAUDE_CODE_MAX_RETRIES` | 10 | Retry attempt count, capped at 15 (cap removed when `CLAUDE_CODE_RETRY_WATCHDOG=1`) |
| `CLAUDE_CODE_RETRY_WATCHDOG` | unset | `1` retries `429`/`529` indefinitely in unattended sessions (e.g. CI) and raises other transient-error retries to ~300 (roughly 3 hours of backoff) |
| `API_TIMEOUT_MS` | 600000 | Per-request timeout (ms) |

## Server errors

Come from the inference provider (Anthropic, or the provider behind Bedrock/Vertex/Foundry/a custom gateway).

- **`API Error: 500 Internal server error`** — unexpected server-side failure, unrelated to your prompt/settings/account. Check status.claude.com (or the provider's status page), wait, retry with "try again"; run `/feedback` if it persists with no posted incident.
- **`API Error: Repeated 529 Overloaded errors`** — capacity-wide overload, already retried several times; not your usage limit. Check status, retry later, or `/model` to switch models (capacity is tracked per model).
- **`Request timed out`** — no response before the connection deadline (default 10 min). Retry, break work into smaller prompts, or raise `API_TIMEOUT_MS`.
- **The response above may be incomplete** (`Server error mid-response` / `Connection closed mid-response` / `Response stalled mid-stream`) — a mid-stream failure after Claude completed a text block or tool call; output kept, turn not discarded. Reply `continue` to resume from the last completed block; in non-interactive mode, resume the session and send `continue`.
- **Auto mode cannot determine the safety of an action** — the classifier model failed (overloaded/rate-limited/unreachable, or on Amazon Bedrock, your account can't invoke the classifier model). Retry after a few seconds; on Bedrock, check IAM policy or contact your AWS account team for Mantle model access. An unparseable classifier response blocks with `run with --debug for details` — retry, or check the debug log. A separate API safety check on earlier conversation content blocks with a distinct message — retrying won't help; switch permission mode or start fresh. An oversized classifier transcript falls back to manual approval — approve manually or run `/compact`.
- **`Agent terminated early due to an API error`** — a subagent's request failed terminally (e.g. hit a usage limit, retries exhausted). Match the detail after the colon to its own section and follow those steps; then ask Claude to retry or resume the subagent.

## Usage limits

Most mean a quota tied to your account/plan is exhausted. Two exceptions: `Server is temporarily limiting requests` is a server-side throttle unrelated to plan quota, and `Usage credits required for 1M context` is an entitlement check, not exhaustion.

- **Session/weekly/Opus limit hit** — blocked until the reset time shown. Session/weekly limits are shared across models; Opus limit only affects Opus (switch models with `/model` to keep working). `/usage` shows limits/reset times; `/usage-credits` buys more usage.
- **`Usage credits required for 1M context`** — the `[1m]` model variant needs usage credits on your plan. `/model` to a non-`[1m]` variant, or `/usage-credits` to turn on billing; set `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` to remove 1M variants from the picker entirely.
- **`Server is temporarily limiting requests`** — short-lived server throttle, not your plan quota; retried automatically (v2.1.199+). Wait and retry; check status.claude.com if persistent.
- **`Request rejected (429)`** — hit your API key/Bedrock project/GCP project rate limit. Check `/status` for the active credential, check your provider console's limit tier, reduce concurrency (`CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`, fewer parallel subagents, or a smaller model).
- **`Credit balance is too low`** — Console org out of prepaid credits. Add credits/enable auto-reload, or `/login` to switch to subscription auth.
- **`Could not update your spend limit`** — the server rejected a spend-limit change. If a reason is given, choose a value that satisfies it; otherwise retry, or change it from claude.ai billing settings.

## Authentication errors

Run `/status` to see the active credential. Key messages: `Not logged in` (`/login`, or check `ANTHROPIC_API_KEY`/`apiKeyHelper` for automation); `Could not resolve authentication method` (background/cloud/SDK sessions with no credential reaching the worker — upgrade if on an old version); `Invalid API key` (check for typos/revocation, check `env | grep ANTHROPIC` for a stray `.env`-loaded key, or unset it and `/login`); `Your apiKeyHelper script is failing` (run the helper command directly to reproduce; it must print the key to stdout and exit 0); `This organization has been disabled` / `Your organization has disabled API key authentication` / `...Claude subscription access` (env var takes precedence over `/login` — unset it; or ask an admin to re-enable the relevant auth method); `Routines are disabled by your organization's policy` (ask an Owner to enable Routines); `Remote Control is only available when using Claude via api.anthropic.com` (unset `ANTHROPIC_BASE_URL`); `OAuth token revoked/expired` and `Login expired` (`/login`, or `/logout` then `/login` if it recurs); `API Error: 401 Invalid authentication credentials` (check whether `/status` shows an API key overriding your login); AWS credential/chain errors (re-run `aws sso login` or raise `CLAUDE_CODE_AWS_CHAIN_RESOLVE_TIMEOUT_MS`).

## Network and connection errors

Local network/proxy/firewall or cloud-network-policy failures. `Unable to connect to API` (ECONNREFUSED/ECONNRESET/ETIMEDOUT, "fetch failed"): confirm `curl -I https://api.anthropic.com` works, set `HTTPS_PROXY` behind a corporate proxy, check firewall/DNS. `Unable to connect to Anthropic services` (first-run setup probe): same checks, message names the failing proxy variable. `Socket is closed` (streaming connection dropped, e.g. Windows corporate proxy): retried automatically since v2.1.214, update if older. `Bedrock streaming response has an unexpected content-type`: a gateway is rewriting the eventstream body/header — fix the gateway or set `CLAUDE_CODE_DISABLE_BEDROCK_CONTENT_TYPE_GUARD=1`. SSL certificate errors: export your CA bundle to `NODE_EXTRA_CA_CERTS` (never disable validation with `NODE_TLS_REJECT_UNAUTHORIZED=0`). `Host not allowed in a cloud session` (`403`/`x-deny-reason: host_not_allowed`): add the domain to the cloud environment's **Custom** network allowlist. `Couldn't reconnect to your Remote Control session`: run `/remote-control` to retry, or start without `--resume`.

## Request errors

Content-of-request problems, mostly rejected by the API. `Prompt is too long` / `Context exceeds the token limit`: run `/compact` or `/clear`, check `/context` for what's consuming the window, disable unused MCP servers. `Error during compaction: Conversation too long`: Esc twice to step back several turns, then retry `/compact`, or `/clear`. `Request too large` (32MB HTTP body cap): `/compact`, or reference large files by path instead of pasting. `Image was too large` / `Unable to resize image`: resize below 8000px (or 2000px with many images), convert to PNG/JPEG/GIF/WebP. PDF errors (too large/password-protected/invalid): extract with `pdftotext` or read a page range instead. `Extra inputs are not permitted`: a gateway stripped the `anthropic-beta` header — configure pass-through or set `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1`. `There's an issue with the selected model` / `Model ... is not a recognized model id`: run `/model` to pick a valid one; check `--model`/`ANTHROPIC_MODEL`/settings for a stale ID. `Claude Opus is not available with the Claude Pro plan`: `/model` to a plan-included model, or `/logout`+`/login` after upgrading. `Model ... is restricted by your organization's settings`: `/model` shows only allowed models; ask an admin for access. `thinking.type.enabled is not supported for this model`: `claude update` (version floors vary by model). Thinking-budget-exceeds-output-limit (`max_tokens must be greater than thinking.budget_tokens`): lower `MAX_THINKING_TOKENS` or raise `CLAUDE_CODE_MAX_OUTPUT_TOKENS`. Tool use/thinking block mismatch (`API Error: 400 due to tool use concurrency issues`): `/rewind` to a checkpoint before the corrupted turn; update if on Opus 4.7/4.8 pre-v2.1.156. Usage Policy refusal and cybersecurity safety flags: `/rewind` past the triggering turn, `/clear` for a fresh conversation, or `/feedback` to report a false positive; apply to the Cyber Verification Program for legitimate cybersecurity work.

## Installation errors

From the install script, `claude install`, or `claude update`. `Installation was killed before it could finish` (exit code 137 = OOM on Linux): free memory or add swap, then rerun. `The connection dropped while downloading the update` / `Download timed out`: rerun `claude update`, set `HTTPS_PROXY` if needed, ask network team to allow `downloads.claude.ai`.

## Command-line errors

From the `claude` CLI and its subcommands. `--bg and --print conflict`: drop `-p`/`--print`, `--bg` takes the prompt directly. `--json-schema is not a valid JSON Schema`: fix the keyword the diagnostic names. `Settings file exceeds the 2MiB limit`: point `--settings` at a real settings file under 2 MiB. `Workspace not trusted when starting Remote Control`: run `claude` in the directory first to accept the trust dialog (home directory trust is never saved — use a project directory). `Could not import a server from Claude Desktop`: rename the server to letters/numbers/hyphens/underscores only. `MCP permission prompt tool not found`: confirm the server is connected (`claude mcp list`) and the tool name matches `mcp__<server>__<tool>`; raise `MCP_TIMEOUT` if it's slow to start. `/security-review` fails without `origin/HEAD`: run `git remote set-head origin <default-branch>` (fetch the branch first if needed). `Input must be provided...when using --print`: run `claude` in a real terminal, or pass/pipe a prompt with `-p`. `Diff is too large for ultrareview`: pass a closer base branch or split the change. `Could not find merge-base with the base branch`: pass the base branch explicitly or `git fetch --unshallow origin`. `Your checkout has no branches`: `git checkout -b <name>` at the current commit. `Failed to resume the conversation`: retry `claude --resume <session-id>`, or start a new session.

## Plugin errors

`Marketplace "<name>" is registered from an untrusted source` (reserved name not under `github.com/anthropics`): `claude plugin marketplace remove` then re-add from the official source, or rename a third-party marketplace. Plugin command references `${user_config.*}` in a shell-form hook/monitor/`headersHelper`: switch the hook to exec form (`args` array) or read `$CLAUDE_PLUGIN_OPTION_<KEY>`/an env var inside the script instead of shell-interpolating the value.

## Tool errors

`Agent would be spawned with zero tools`: fix each `tools` frontmatter entry the message groups as unrecognized/not-available-to-subagents/matched-no-tools, or delete the `tools` field. `File is covered by a Read deny rule`: narrow the `Read` deny rule if Claude should edit the file, or add a matching `Edit` deny rule if it must stay untouched. `Memory index is over its read limit` (MEMORY.md > 200 lines/25KB): let Claude rewrite it — one line per entry, detail moved to topic files. `pkill: refusing to run` (pattern matches the Claude Code process, Linux only): narrow the pattern or use `pkill -P $$`.

## Background session errors

`Can't open MCP settings while no terminal is attached` and similar: attach from agent view's **Needs input** list, or use the non-interactive form (`/mcp reconnect <server>`, etc.). `This session has no saved transcript` (stopped before first response): resume the original conversation with `claude --resume`, or `claude respawn <id>` to start fresh. `This session was running agent '<name>', which is no longer available`: re-create the agent file, or resume with an explicit `--agent <name>`. `CLAUDE_CODE_PROCESS_WRAPPER` launcher errors: point the variable at an absolute executable path ending in `exec "$@"`; check `/status`'s Self-exec entry. `EUNKNOWN` starting a background session on Windows (software restriction policy blocking the executable): ask an admin to allowlist the Claude Code executable, or install PowerShell 7 if the service doesn't outlive the terminal.

## Wrapper and IDE errors

`Claude Code process exited with code N` (from an IDE extension/Agent SDK wrapper, not Claude Code itself): follow the wrapper's **View output logs** link, reproduce by running `claude` directly in a terminal, or run `claude doctor`.

## Rewind warnings

`Restored the code, but skipped N files` (`/rewind` skipped symlinks/hard links, paths whose directory changed, or unreadable backups): run with `--debug` to see the skipped paths in the debug log; links you created on purpose were left untouched, others should be inspected before trusting.

## Configuration warnings

Written to stderr at startup, not shown as conversation errors. `Ignoring N permissions.allow entries...this workspace has not been trusted`: run `claude` interactively in the directory and accept the trust dialog, or set `hasTrustDialogAccepted` in `~/.claude.json` for non-interactive (`-p`) use. `...is not matched by file permission checks` (a `Write`/`NotebookEdit`/`MultiEdit`/`Glob` path rule, which only `Edit`/`Read` rules actually enforce): replace with the equivalent `Edit(path)` or `Read(path)` rule at the source the warning names.

## Responses seem lower quality than usual

Not an error message — check `/model` (stale model pin), `/effort` (reasoning level), `/context` (window pressure — `/compact`/`/clear`), and `/doctor` (oversized CLAUDE.md/unused extensions) before assuming a regression. Prefer `/rewind` over in-thread corrections, since correcting keeps the wrong attempt anchoring later answers. Run `/feedback` (includes the transcript) if quality still seems off, or if a suspected-prompt-injection warning repeats after `claude update`.

## Report an error

For components this page doesn't cover: MCP connection/auth issues → MCP docs; hook failures → hooks docs (`Debug hooks`); install/permission errors → troubleshoot-install docs. Otherwise run `/feedback` (sends the transcript; offers a prefilled GitHub issue; on third-party providers or without Anthropic credentials, saves a local archive instead), `claude doctor` for read-only diagnostics, or check status.claude.com for active incidents.

## Notes

- For the raw HTTP status code definitions behind these messages, see the Claude Platform API error reference (platform.claude.com).

## Related

- [env-vars.md](./env-vars.md): `CLAUDE_CODE_MAX_RETRIES`, `CLAUDE_CODE_RETRY_WATCHDOG`, `API_TIMEOUT_MS`
- [auto-mode-config.md](./auto-mode-config.md): the auto mode classifier errors in context
- [model-config.md](./model-config.md): model-selection errors (`There's an issue with the selected model`, `Model ... is not a recognized model id`, `availableModels` restriction errors)
- [debug-your-config.md](./debug-your-config.md): `/status`, `/doctor`, and `claude --safe-mode` used throughout this page's fixes
