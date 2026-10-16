<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/sessions-connect / last verified: 2026-10-17 -->

# Connect to a Managed Agents session from your terminal

`ant beta:sessions connect` attaches the terminal to an existing Claude Managed Agents session, following its transcript live and letting you send messages, interrupt, or allow or deny tool calls; `--web` opens the Console session viewer instead.

## Signature / Usage

```bash
# Attach the terminal view
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7

# Open the session viewer in the browser
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7 --web
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--web` | Serve the Console's session viewer from a local server on `127.0.0.1`, print its URL, and open it in the browser. |
| `--no-browser` | With `--web`, skip opening the browser. |
| `--verbose`, `-v` | Start with detail shown (same as toggling Ctrl+O). |

| Key | Action |
|-----|--------|
| Enter | Send input as a `user.message` event. Alt+Enter or Ctrl+J starts a new line. |
| Esc | Interrupt the agent while it's running (`user.interrupt`). |
| Ctrl+O | Show or hide detail: tool inputs and results, token usage, status events. |
| Page Up, Page Down | Scroll the transcript. Scrolling up pauses following; End resumes it. |
| Ctrl+C | Detach. Ctrl+D on an empty input line also detaches. |

## Notes

- Requires CLI version 1.32.0 or later.
- Takes the ID of a session in your workspace (from the create response, `ant beta:sessions list`, or the Console).
- Without `--web` an interactive terminal is required. In scripts use `ant beta:sessions:events stream` and `ant beta:sessions:events send`.
- Ctrl+C detaches; the session keeps running and reconnecting loads the full history.
- When a tool call awaits approval (under an `always_ask` policy, or under `auto` when the server reaches no determination), the input line shows **Allow tool call?** with Yes / No / No, and tell the agent why. The CLI sends a `user.tool_confirmation` event, with any typed reason as `deny_message`.
- In multiagent sessions the terminal view follows the primary thread only; the browser viewer follows every thread.
- A `terminated` or deleted session is read-only.
- The `--web` URL can be opened once, within two minutes of being printed; reloading that tab works, otherwise rerun the command. Credentials never leave the CLI (the page talks only to the local `ant` process). The server runs until Ctrl+C.
- This is the CLI for the Claude API (platform.claude.com), distinct from the Claude Code CLI (see anthropic-claude-code).

## Related

- [CLI quickstart](./cli-quickstart.md)
- [CLI scripting and automation](./cli-scripting.md)
- [Manage resources as code with ant apply](./cli-apply.md)
