# Shell

Every box has a full Linux shell (Debian by default), reachable through the SDK or directly over SSH.

## Signature / Usage

```bash
ssh <box-id>@us-east-1.box.upstash.com   # password: your Box API key
```

```typescript
const run = await box.exec.command("echo hello")
console.log(run.result) // "hello"
console.log(run.status) // "completed"

const code = await box.exec.code({ code: "console.log('hello')", lang: "js", timeout: 10_000 })
console.log(code.result)    // "hello"
console.log(code.exitCode)  // 0

const failed = await box.exec.command("node -e 'process.exit(1)'")
console.log(failed.status) // "failed" (result contains stderr)

const s = await box.exec.session({ argv: ["sleep", "10"] })
s.kill()

const logs = await (await box.exec.command("npm test")).logs()
// [{ timestamp: "2026-02-23T...", level: "info", message: "PASS src/auth.test.ts" }, ...]
```

```python
run = box.exec.command("echo hello")
print(run.result, run.status)

run = box.exec.code(code="print('hello')", lang="python", timeout=10_000)
print(run.result, run.exit_code)  # "hello", 0

session = box.exec.session(argv=["sort"])
session.write("banana\napple\n")
session.end_stdin()
session.wait(30)
```

## Notes

- Pass a full shell expression; pipes, redirects, and chained commands work (`cd /work && npm install && npm test`)
- Install system tools with `sudo apt-get install <package>` inside the box
- `exec.command` runs to completion. To write stdin, drive a terminal, or signal a process, use `box.exec.session` (see Live Sessions)
- Typical flow: `box.git.clone(...)`, `box.exec.command("npm install")`, then `box.agent.run({ prompt })`; build artifacts via `box.files.upload([...])` and `box.files.download({ folder: "/work/dist" })`
- The docs' shell page shows `output` / `exit_code` for `exec.code`, but the SDK `Run` (@upstash/box 0.7.9 client.ts) exposes `result` / `exitCode` (number)
- The docs' cancel example awaits `exec.command` first, so the command has already finished; use `exec.session` + `kill` / `terminate` to stop a running process
- Source: https://upstash.com/docs/box/overall/shell (fetched 2026-10-17; no version pin on the site).
- The SSH command can also be copied from the SSH button on the box details page in the Upstash Console

## Related

- [Live Sessions](./live-sessions.md)
- [Filesystem](./filesystem.md)
- [Agent](./agent.md)
- [Git](./git.md)
