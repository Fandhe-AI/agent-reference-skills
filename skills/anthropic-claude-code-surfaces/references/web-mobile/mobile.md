<!-- source: https://code.claude.com/docs/en/mobile.md / last verified: 2026-10-17 -->

# Claude Code on mobile

Start, monitor, and steer Claude Code tasks from your phone with the Claude app for iOS and Android. The app is a client for sessions rather than a place where code runs; it reaches cloud sessions, a local session via Remote Control, or the Desktop app via Dispatch.

## Signature / Usage

```text
# In a Claude Code terminal session, display a QR code to install the app
/mobile
/ios
/android

# Start Remote Control from the terminal
claude remote-control
# or inside an existing session
/remote-control
```

Sign in to the Claude app with the same claude.ai account and organization used for Claude Code. Cloud sessions and Remote Control require a claude.ai account and aren't reachable with an Anthropic Console API key or a third-party provider.

## Options / Props

| Feature | Connects to | When to use |
| --- | --- | --- |
| Claude Code on the web | A cloud session on Anthropic-managed infrastructure | Repo is on GitHub; task should keep running after you close the app |
| Projects | A conversation where Claude coordinates parallel threads of work and reports back; runs in the cloud | A stream of related work rather than one task; see which threads finished or need you |
| Remote Control | A Claude Code session on your computer | Work needs local filesystem, tools, or MCP servers |
| Dispatch | The Desktop app on your computer | Message a task and let Dispatch decide how to run it (Pro/Max only) |

## Notes

- If your computer will be off, use cloud sessions or a project; Remote Control and Dispatch require your machine to stay on. If the machine sleeps during a Remote Control session, Claude Code reconnects when it comes back online.
- Start a session on your phone by tapping **Code** in the app or opening claude.ai/code/new. On an iPad, install the same iOS app.
- Remote Control attachments: photos are shown to Claude directly and also saved under `~/.claude/uploads/` (Claude is told the saved path); other files are downloaded to the local machine and passed to Claude as `@` file references.
- Push notifications: when Remote Control is active, Claude can send a push notification when a long-running task finishes or needs a decision; you can also ask in the prompt, such as `notify me when the tests finish`. Two `/config` toggles control it (see the Remote Control docs in the anthropic-claude-code skill).
- Local-only commands such as `/plugin` and `/resume` don't work from the app.
- Mode selection from the app: cloud sessions offer Accept edits / Plan / Auto; Remote Control sessions offer Manual / Accept edits / Plan / Auto. Bypass permissions is unavailable from the app in either case.
- Remote Control itself (requirements, invocation modes, limitations) is documented in the anthropic-claude-code skill.
- Dispatch requires a Pro or Max plan; not available on Team or Enterprise.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [web-quickstart](./web-quickstart.md)
