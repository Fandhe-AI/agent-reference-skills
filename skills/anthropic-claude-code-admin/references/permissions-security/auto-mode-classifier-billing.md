<!-- source: https://code.claude.com/docs/en/auto-mode-classifier-billing.md / last verified: 2026-10-16 -->

# Auto mode classifier request charges

Explains the Claude Code notice saying a session isn't eligible for auto mode's no-charge classifier requests: what it means, why it appears, and what to do.

## Signature / Usage

Notice text:

```text
We're changing auto mode to no longer charge for classifier requests in Claude Code. However, this session isn't eligible.
```

Opt out of asking the server for checks (classifier requests are then always Claude Code's own, billed as before, and the notice doesn't appear); set before starting the session, in the shell or in the `env` settings key:

```bash
export CLAUDE_CODE_AUTO_MODE_SERVER=0
```

## Options / Props

Responding to the notice:

| Key | Effect |
|-----|--------|
| Enter | Continues: the held action and the rest of the session use Claude Code's own classifier requests, billed as token usage. The notice doesn't appear again in that session. If it named a gateway, acknowledging keeps it from reappearing on this machine for 24 hours; otherwise it returns the next time a session falls back |
| Esc / Ctrl+C | Cancels: the held action doesn't run and the current turn stops, session stays in auto mode. Nothing is remembered, so the notice appears again before the next checked action |

## Notes

- In auto mode a classifier checks actions such as shell commands and network requests. Where server-side checks are on, the server performs them as part of the session's own model requests at no charge. The notice means the server's checks aren't reaching the session, so Claude Code makes its own classifier requests, which count toward token usage on the account. Nothing is broken; auto mode keeps working.
- Claude Code holds the first action it would check that way until you answer. To stop using auto mode instead, switch permission modes with `Shift+Tab`.
- Where the notice can't wait for an answer, the same text is reported and the session continues in auto mode (unless a gateway acknowledgment in the last 24 hours dismissed it): with `-p` it prints to stderr; in `stream-json` output it emits a `system` warning message that Agent SDK applications can read.
- Usual causes: an LLM gateway or proxy that strips or rewrites request headers, drops unrecognized request fields, or edits responses (the notice names the gateway when identifiable); or server-side checks not yet reaching the platform, region, or credential. Pro, Max, and Team plans never show the notice.
- To make the session eligible when a gateway is the cause, ask the admin or gateway provider to pass requests and replies through unchanged: forward headers and body fields as-is (including unrecognized ones such as the `safeguards` request field) and return responses and streaming events without dropping keys such as `safeguard_results` or rewriting tool-use IDs.
- `CLAUDE_CODE_AUTO_MODE_SERVER=0` on a direct connection to the Anthropic API requires Claude Code v2.1.281 or later. Setting `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` while `CLAUDE_CODE_AUTO_MODE_SERVER` is unset also turns the server's checks off (with exceptions described in the gateway protocol docs).
- `CLAUDE_CODE_AUTO_MODE_SERVER` is a temporary setting and may be removed in a later release.
- Check a session in auto mode with `/status`: the **Auto mode server** row reads `Enabled` while the server's checks decide actions and `Disabled` once the session has fallen back.
- If a gateway cuts responses short or rewrites results into an unreadable form, you get denials with no verdict instead of this notice.

## Related

- [permission-modes](./permission-modes.md)
- [permissions](./permissions.md)
