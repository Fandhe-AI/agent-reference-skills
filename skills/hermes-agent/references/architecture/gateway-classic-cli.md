# Gateway Classic CLI Client

How `hermes chat` / `--cli` / `-z` attach to the gateway authority instead of constructing a local agent (initial migration).

## Signature / Usage

For two-checkout compatibility testing, load the scoped pytest option plugin and name the disposable gateway peer's checkout:

```sh
scripts/run_tests.sh -j 1 --file-retries 0 tests/hermes_cli/test_gateway_chat_native.py \
  -p tests.hermes_cli.gateway_client_options --client-test-runtime-root=/path/to/runtime-checkout
```

Resume a session printed on stderr as `Session:` with `hermes --cli chat --resume ID`.

## Options / Props

Accepted and frozen at creation (`_POLICY` in `hermes_cli/gateway_chat.py`): `--model`, `--provider`, `--base-url`, `--api-key` (memory-only), `--reasoning`, `--toolsets`, `--max-turns`, `--skills`, `--checkpoints`, `--yolo`, `--accept-hooks` (or `HERMES_ACCEPT_HOOKS=1`), `--pass-session-id`, `--ignore-rules`, `--ignore-user-config`, `--safe-mode` (the last two need an explicit `--model`). Also accepted: `--source <label>`, `--resume <id-or-title>` (or `latest`), `-c <title>`, `-c <title> --create-if-missing`, bare `-c`, `--in <dir>`, `--query-file`, `--format stream-json`, `-z ... --usage-file`, `--list-tools` / `--list-toolsets`.

Refused with exit 2:

| Option | Why | Use instead |
|---|---|---|
| `-w` / `--worktree` | Worktree creation is a launcher-side step | `hermes --tui -w` |
| `--image` | No client-side attachment staging | attach in `hermes --tui` or Desktop |
| `--run-budget` | Not in the creation contract | `agent.run_budget_seconds` in config.yaml |
| `-v` / `--verbose` | Client has no verbose renderer | `hermes logs --follow` |
| `--no-restore-cwd` | Gateway keeps the frozen cwd | `--in <dir>` |
| `--create-if-missing` without `-c <name>` | Nothing to create by name | `-c <name> --create-if-missing` |

Exit status: 0 completed admission, 1 failed execution/connection, 2 unsupported frontend options, 3 pending control needing interactive reattachment or a turn lost in a gateway crash (clear with `hermes sessions discard <id> --yes`), 130 keyboard detach.

## Notes

- Normal `hermes --cli`, `hermes chat`, `hermes chat -q '...' -Q` and top-level `hermes -z '...'` use the gateway authority; direct `cli.main` chat launches hand off before building a local agent. Bootstrap uses the canonical ensure lifecycle and a single-use private control ticket, not service installation. An explicit `HERMES_TUI_GATEWAY_URL` stays remote-only (a failed connection never launches a local replacement).
- In-client commands: `/quit`, `/exit`, `/detach`, EOF and closing the terminal only detach; `/stop` sends an execution-generation-fenced interrupt; pending approvals show `/approve ID once|deny|...`, clarification uses `/answer ID TEXT`; `/discard ID` acknowledges an admission lost across an owner restart (`prompt.resolve_unknown`); `/branch`, `/model`, `/compress` are revision-fenced `session.mutate` operations; `/yolo [on|off]` toggles the session's approval bypass; `/title`, `/undo`, `/retry`, `/new` / `/reset`, `/usage`, `/tools` run in the view (`hermes_cli/gateway_chat_commands.py`). Other commands go to the owner as `slash.exec`; unreviewed ones print `/x is not available on the shared gateway yet` (see Gateway Command Parity). `-z` no longer implicitly bypasses approval policy.
- Launch options are sent only when the gateway advertises them via `runtime.describe` (`session_create.parameters`); an older gateway's missing option is refused, and an old gateway without cwd support warns (explicit `--in` rejects). A resume may repeat the exact creation flags; any flag changing the frozen route rejects. `--compact` is not a `hermes chat` option.
- One-shot output ends with the final reply; without `-Q`, a resumed session first prints stored history and the reply is followed by `Resume this session with:`; `-Q` prints the reply alone.
- Official-page discrepancy (both kept as written): this page describes the client in `hermes_cli/gateway_chat.py` with the limited in-client command set above, whereas Gateway Command Parity says normal `hermes chat` is main's `HermesCLI` with a gateway-backed agent and session store, and that the narrower `gateway_chat_commands.py` routes belong to the `--stream-json` / safe-mode transport client. Read the in-client command list and option-rejection table here as this initial-migration client's behaviour, and check gateway-command-parity.md for what a normal CLI session supports.
- Not full classic CLI parity: legacy presentation, slash registry parity, interactive history editing, auto-reconnect, lost-ACK durable client journals, remote login bootstrap, cold-owner resume and native Windows/macOS QA remain outstanding; the client preserves an explicit remote URL's authentication and never mints remote credentials.
- `tests/hermes_cli/test_gateway_chat_native.py` covers native tmux/PTY fresh input, detach, resume and one-shot against a loopback model. The test receipt reports `caller_cwd_effect_verified`; on an older runtime explicit `--in` must reject, which does not count as cwd parity.
- Source: https://hermes-agent.nousresearch.com/docs/developer-guide/gateway-classic-cli (pinned to v0.23.1)

## Related

- [Gateway Command Parity](./gateway-command-parity.md)
- [Gateway Local Sessions](./gateway-local-sessions.md)
- [CLI Internals](./cli-internals.md)
