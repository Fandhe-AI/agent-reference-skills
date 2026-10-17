# Guide: Host T3 Code in a Remote Sandbox

Run T3 Code inside an Upstash Box and open it from any browser or phone. The agent works in the box, which sleeps when you are away and wakes when you open the public URL.

## Signature / Usage

```bash
ssh <box-id>@us-east-1.box.upstash.com   # Box API key as password

npm install -g --prefix /home/boxuser/.local t3
export PATH="/home/boxuser/.local/bin:$PATH"
claude auth login      # or: codex login

setsid nohup t3 serve --host 0.0.0.0 --port 3773 --base-dir /workspace/home/.t3 > /tmp/t3.log 2>&1 < /dev/null &
sleep 5 && grep "Pairing URL" /tmp/t3.log
```

Mint a new pairing link later:

```bash
t3 pair --base-dir /workspace/home/.t3
```

## Options / Props

| Step | Action |
|---|---|
| 1 | Create a Node.js-runtime box with default settings |
| 6 | Create a public URL for port `3773` in the console: `https://<box-id>-3773.preview.box.upstash.com` |
| 7 | Open the pairing link with the address replaced by the public URL: `https://<box-id>-3773.preview.box.upstash.com/pair#token=<token>` |
| 9 | Save the `t3 serve` command from step 5 as the Init Command in console Settings so it restarts after every wake |

## Notes

- The pairing link works once and expires after 5 minutes; the browser stays signed in for 30 days; treat the link as a password
- T3 Code uses Codex to name threads: sign in to Codex too, or switch the title provider to Claude
- Projects, threads, and browser pairing live under `/workspace/home/.t3` on persistent storage and are captured by snapshots; keep existing project folders under `/workspace` too
- After a reset, reinstall T3 Code (step 3); a snapshot restore brings projects and pairing back
- If a thread says "Claude could not authenticate", the step 4 sign-in is missing
- Original docs use `sudo npm install -g t3` inside the box; this page rewrites it to a user-space install (`--prefix /home/boxuser/.local`)
- Source: https://upstash.com/docs/box/guides/t3-code-setup (fetched 2026-10-17; no version pin on the site).

## Related

- [Public URLs](./preview.md)
- [Keep Alive](./keep-alive.md)
- [Quickstart](./quickstart.md)
- [Snapshots](./snapshots.md)
