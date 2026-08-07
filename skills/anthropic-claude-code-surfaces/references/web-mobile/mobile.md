<!-- source: https://code.claude.com/docs/en/mobile.md / last verified: 2026-08-07 -->

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
| Remote Control | A Claude Code session on your computer | Work needs local filesystem, tools, or MCP servers |
| Dispatch | The Desktop app on your computer | Message a task and let Dispatch decide how to run it (Pro/Max only) |

## Notes

- If your computer will be off, use cloud sessions; Remote Control and Dispatch require your machine to stay on.
- Attachments added in the Claude app are downloaded to the local machine and passed to Claude as an `@` file reference when using Remote Control.
- Local-only commands such as `/plugin` and `/resume` don't work from the app.
- Mode selection from the app: cloud sessions offer Accept edits / Plan / Auto; Remote Control sessions offer Manual / Accept edits / Plan. Bypass permissions is unavailable from the app in either case.
- Dispatch requires a Pro or Max plan; not available on Team or Enterprise.

## Related

- [claude-code-on-the-web](./claude-code-on-the-web.md)
- [web-quickstart](./web-quickstart.md)
