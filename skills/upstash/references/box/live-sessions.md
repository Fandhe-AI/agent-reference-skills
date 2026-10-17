# Live Sessions

`box.exec.session` resolves as soon as the command starts and returns a handle to the running process: write stdin, drive a real terminal, stream output, and signal the process tree.

## Signature / Usage

```typescript
let out = ""

const session = await box.exec.session({
  argv: ["npm", "test"],
  onStdout: (data) => (out += Buffer.from(data).toString()),
  onStderr: (data) => console.error(Buffer.from(data).toString()),
})

console.log(session.pid)  // in-box process id
const code = await session.wait()

// Alternatively, before wait() resolves (while the process is still running):
session.terminate(5000) // ms: SIGTERM, then SIGKILL after grace period
session.kill("KILL")
session.close()         // stops the process
```

Write to stdin (close stdin so `sort` can finish):

```typescript
let out = ""

const session = await box.exec.session({
  argv: ["sort"],
  onStdout: (data) => (out += Buffer.from(data).toString()),
})

session.write("banana\napple\n")
session.endStdin() // EOF, so sort can finish

await session.wait()
console.log(out) // "apple\nbanana\n"
```

```python
session = box.exec.session(
    argv=["npm", "test"],
    on_stdout=chunks.append,
    on_stderr=lambda data: print(data.decode(), end=""),
)
code = session.wait(60)  # seconds; raises TimeoutError

with box.exec.session(cmd="npm run dev", tty=True) as dev:
    dev.write("rs\n")
```

## Options / Props

| Option | Description |
|---|---|
| `argv` | Run a program directly, no shell (safest for user input; `$HOME; rm -rf /` is printed literally) |
| `cmd` | Run via `bash -lc` (pipes, globs, `&&`) |
| `tty`, `rows`, `cols` | Allocate a real terminal (stderr merged into stdout); change size later with `resize(rows, cols)` |
| `cwd` | Working directory, resolved against the box's current directory |
| `env` | `KEY=VALUE` strings overlaid on the box environment (some runtime-reserved variables are dropped) |
| `onStdout` / `onStderr` (`on_stdout` / `on_stderr`) | Output callbacks; stdout and stderr stay separate without a TTY |

`kill(signal)` sends one signal to the whole process tree; default `TERM`; accepts `TERM`, `KILL`, `INT`, `HUP`, `TSTP`, `QUIT`, `USR1`, `USR2`.

| Use | When |
|---|---|
| `box.exec.command` | Result of a command that finishes on its own |
| `box.exec.stream` | Output as it arrives, no input and no signals |
| `box.exec.session` | stdin, terminal, signals, or a process held open |

## Notes

- Live sessions are a Node.js API in the JavaScript SDK (browsers cannot set headers on a WebSocket handshake)
- `wait()` returns the exit code; Python accepts a timeout in seconds, JavaScript `wait()` takes no timeout (cap with your own timer)
- Only the first `terminate` starts the sequence; later calls are ignored
- The session owns the process: closing the handle, losing the connection, or exiting your program stops the command. Sessions cannot be reattached; use schedules or a `keep_alive` box with `box.exec.command` for work that must outlive your program
- Always stop the session on the way out (Python context manager; JavaScript `finally { session.close() }`)
- Source: https://upstash.com/docs/box/overall/live-sessions (fetched 2026-10-17; no version pin on the site).

## Related

- [Shell](./shell.md)
- [Schedules](./schedules.md)
- [Keep Alive](./keep-alive.md)
