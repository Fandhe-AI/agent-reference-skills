# Gateway Local Sessions

The composed gateway listener creates fresh local CLI, TUI or GUI-policy sessions as canonical gateway admissions, without starting `tui_gateway`'s separate agent runtime; `GatewayRunner` / `TurnRunner` own execution, approvals, tools, storage and event delivery.

## Signature / Usage

A server-authenticated identity with `session:create` calls:

```json
{"jsonrpc":"2.0","id":1,"method":"session.create","params":{"request_id":"stable-client-create-id","source":"cli"}}
```

Then attach viewers with `session.resume({session_id})`, submit with `prompt.submit({session_id, submission_id, text})`, and answer approvals with `approval.respond({session_id, execution_generation, prompt_id, choice})`.

## Options / Props

`session.create` parameters:

| Parameter | Meaning |
|---|---|
| `request_id` | Stable id; repeating it for the same principal and profile reuses the identity and frozen policy (also after daemon death). Omit for a new session; retain it for lost-ACK retry protection. A conflicting repeat returns `invalid_params` |
| `source` | `cli` (default), `tui`, `gui`, `acp`, `tool`, `oneshot` (`gateway.session_policy.SURFACES`); maps to agent platforms `cli`, `tui`, `desktop`, `acp`, `cli`, `cli`. `tool` and `oneshot` keep their own stored label so pickers hide them |
| `client` | Optional `{"name": ..., "version": ...}`; `name` 1-64 chars of `a-z 0-9 . _ -` starting with a letter or digit; `version` 1-64 printable ASCII without spaces. Send only if `runtime.describe` lists `client` in `session_create.parameters` (capability `session-client-v1`) |
| `cwd`, `model`, `toolsets` | Existing absolute gateway-local directory; non-empty model id on the configured provider; explicit array of toolset names (empty allowed; unknown or policy-filtered names reject) |
| Further frozen fields (`CREATE_FIELDS`) | `provider`, `base_url`, `api_key` (memory only), `reasoning`, `max_turns`, `skills`, `yolo`, `checkpoints`, `accept_hooks`, `pass_session_id`, `ignore_rules`, `safe_mode`, `ignore_user_config`, `editor` (ACP only), `title`, `hidden` |

Other RPCs: `session.list({limit, scope?, workspace?, picker?})`, `session.transcript({session_id, subagent_id?, cursor?, limit?, order?, inline_images?})`, `session.info({session_id})`, `ping({})`, `runtime.describe({})`.

## Notes

- Both returned session IDs are the same stable persisted logical ID; compression and reset may rotate the private physical transcript without changing either. Creation is lazy for the agent but reserves the SessionDB/SessionStore identity in one SQLite transaction (session row, route, private `gateway.local_policy.v1:<stored-id>` receipt); a failed transaction publishes no live session.
- `client` is attribution only: `session.info` returns it, plugins read it through `hermes_cli.plugin_session.session_client()`; `source` still picks the policy and nothing grants anything based on `client` (unverified).
- The accepted prompt receipt is durable admission, not completion. Closing every viewer leaves the execution and its pending approval alive; a new viewer resumes and answers.
- Shared operator access: verified operators of the same profile may attach to canonical local sessions created through another operator path (creation receipts keep the original owner; admissions keep the submitting principal). `session:operator` is issued only at: native interactive bootstrap ticket redemption, the dashboard WebSocket upgrade gate (including `webapp.enabled` Webapp tokens, `HERMES_DASHBOARD_SESSION_TOKEN`), and the HTTP mutation gate after a verified Session or owner grant. A client cannot request it; it does not replace profile / instance / capability / revision / generation checks. The gateway listener stays on loopback unless `webapp.host` binds a wildcard address; the Webapp listener engages the sign-in gate on a wildcard bind or when `webapp.public_url` is set (`dashboard.public_url` never applies to it).
- Default TUI selection folds in the `project` toolset; GUI folds in `project`, `desktop_ui`, `catalog` (independent of `HERMES_DESKTOP`). Without explicit `toolsets`, `session.create` applies the coding posture (`agent.coding_context: focus` in a code workspace) once from the named `cwd`, never for `source: tool`. CLI/TUI cannot request `desktop_ui`. `cwd`, model, source and toolsets are fixed at creation. Other fields (cwd worktree creation, seeded history, profile switching, service-tier selection) return `invalid_params`; no launch field mutates daemon-wide config or environment.
- `session.list` returns live authority sessions (`scope: "live"`); `scope: "stored"` lists pre-authority history read-only without adopting sessions. `workspace` filters by git repo root or cwd; `picker: true` adds `cwd`, `workspace`, `preview`, `last_reply`, `git_branch`, `last_active_at`, `pinned` (capabilities `session-transcript-v1`, `session-list-picker-v1`).
- `session.transcript` reads without attaching or building an agent: rows carry `row_kind` (`"message"` or `"compaction"`), pages hold at most `limit` (1-500, default 100) rows and 2 MiB, opaque cursor, `order: "oldest"` (default, also the poll) or `"latest"`, and `reset: true` when compaction, rotation, rewind or rewrite invalidates the cursor. `subagent_id` reads a delegated child.
- Cold restart restores valid private policies and routes; missing, malformed, foreign-profile or mismatched policy fails closed. Never-started queued inputs resume through the authority FIFO; interrupted started inputs become `unknown`, are never replayed and pause followers. Compression and local reset keep the creation `session_id`, policy and principal/profile binding on the stable logical row; reset starts empty history. Create an independent conversation with `session.create` and a new request ID.
- Verification tests named by the page: `tests/gateway/test_operator_cross_surface.py`, `test_session_operator_scope.py`, `test_local_session.py`, `test_session_policy.py`, `test_local_session_recovery.py`, `test_local_session_lineage.py` (loopback integration evidence; not native launcher, cross-authentication crash, or compression-summary certification).
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-local-sessions (pinned to v0.23.1)

## Related

- [Gateway Session Lifecycle](./gateway-session-lifecycle.md)
- [Gateway Classic CLI](./gateway-classic-cli.md)
- [Gateway Command Parity](./gateway-command-parity.md)
- [Gateway Internals](./gateway-internals.md)
