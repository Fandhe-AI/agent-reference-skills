---
source: https://v2.tauri.app/reference/javascript/shell/
---

# @tauri-apps/plugin-shell

Access the system shell. Allows you to spawn child processes and manage files and URLs using their default application.

## Signature / Usage

```ts
import { Command } from '@tauri-apps/plugin-shell';
const command = Command.create('node');
command.on('close', data => {
  console.log(`command finished with code ${data.code} and signal ${data.signal}`)
});
command.on('error', error => console.error(`command error: "${error}"`));
command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
command.stderr.on('data', line => console.log(`command stderr: "${line}"`));

const child = await command.spawn();
console.log('pid:', child.pid);
```

```ts
class Command<O extends IOPayload> extends EventEmitter<CommandEvents> {   // @since 2.0.0
  readonly stdout: EventEmitter<OutputEvents<O>>
  readonly stderr: EventEmitter<OutputEvents<O>>
  static create(program: string, args?: string | string[]): Command<string>
  static create(program: string, args?: string | string[], options?: SpawnOptions & { encoding: 'raw' }): Command<Uint8Array>
  static create(program: string, args?: string | string[], options?: SpawnOptions): Command<string>
  static sidecar(program: string, args?: string | string[]): Command<string>
  static sidecar(program: string, args?: string | string[], options?: SpawnOptions & { encoding: 'raw' }): Command<Uint8Array>
  static sidecar(program: string, args?: string | string[], options?: SpawnOptions): Command<string>
  spawn(): Promise<Child>
  execute(): Promise<ChildProcess<O>>
}

class Child {                                            // @since 2.0.0
  pid: number
  constructor(pid: number)
  write(data: IOPayload | number[]): Promise<void>
  kill(): Promise<void>
}

class EventEmitter<E extends Record<string, any>> {      // @since 2.0.0
  addListener / on / once / prependListener / prependOnceListener<N extends keyof E>(eventName: N, listener: (arg: E[N]) => void): this
  removeListener / off<N extends keyof E>(eventName: N, listener: (arg: E[N]) => void): this
  removeAllListeners<N extends keyof E>(event?: N): this
  listenerCount<N extends keyof E>(eventName: N): number
}

function open(path: string, openWith?: string): Promise<void>   // @since 2.0.0

type IOPayload = string | Uint8Array
interface CommandEvents { close: TerminatedPayload; error: string }
interface OutputEvents<O extends IOPayload> { data: O }
interface TerminatedPayload { code: number | null; signal: number | null }
interface ChildProcess<O extends IOPayload> { code: number | null; signal: number | null; stdout: O; stderr: O }
interface SpawnOptions { cwd?: string; env?: Record<string, string>; encoding?: string; processGroup?: boolean }
```

## Options / Props

`SpawnOptions`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cwd | `string` | — | Current working directory. |
| env | `Record<string, string>` | — | Environment variables. Set to `null` to clear the process env. |
| encoding | `string` | — | Character encoding for stdout/stderr. Use `'raw'` to receive `Uint8Array` instead of `string`. |
| processGroup | `boolean` | `false` | Spawns the child in its own process group (POSIX) or job object (Windows), so `kill()` can kill the entire process tree. Useful for programs that spawn child processes, such as PyInstaller wrappers. |

`ChildProcess` / `TerminatedPayload`

| Name | Type | Description |
| --- | --- | --- |
| code | `number \| null` | Exit code of the process. `null` if the process was terminated by a signal on Unix. |
| signal | `number \| null` | If the process was terminated by a signal, represents that signal. |
| stdout | `O` | The data that the process wrote to `stdout` (`ChildProcess` only). |
| stderr | `O` | The data that the process wrote to `stderr` (`ChildProcess` only). |

Methods

| Name | Description |
| --- | --- |
| `Command.create(program, args?, options?)` | Creates a command to execute the given program. `program` must be configured in your project's capabilities. |
| `Command.sidecar(program, args?, options?)` | Creates a command for a sidecar. Must be configured in capabilities and defined on `tauri.conf.json > bundle > externalBin`. |
| `spawn()` | Executes the command as a child process, returning a `Child` handle. |
| `execute()` | Executes the command, waits for it to finish and collects all of its output. |
| `Child.write(data)` | Writes `data` (string or byte array) to the `stdin`. |
| `Child.kill()` | Kills the child process. |
| `open(path, openWith?)` | Opens a path or URL with the system default app, or `openWith`, which must be one of `firefox`, `google chrome`, `chromium` `safari`, `open`, `start`, `xdg-open`, `gio`, `gnome-open`, `kde-open` or `wslview`. `path` is matched against the regex defined on `tauri.conf.json > plugins > shell > open`, default `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+`. |

## Notes

- Events: `Command` emits `close` (`TerminatedPayload`) and `error` (message string); `command.stdout` / `command.stderr` emit `data` for each line the process wrote (or each raw chunk with the `raw` encoding).
- Security: this API has a scope configuration that forces you to restrict the programs and arguments that can be used. The permission `scope` field defines an array of CLIs, each `{ name: string, cmd: string, sidecar?: bool, args?: boolean | Arg[] }`: `name` is the unique identifier passed to `Command.create` (for a sidecar it must be the value defined on `tauri.conf.json > bundle > externalBin`); `cmd` is the program to execute (ignored for sidecars); `sidecar` states whether it configures a sidecar; `args` are the allowed arguments, none by default (`true` allows any list, `false` none, otherwise an array of fixed strings or `{ validator: string, raw?: boolean }` regexes). A validator is anchored as `^<validator>$` unless `raw: true` is set, so it must match the whole argument (plugins/shell/src/scope.rs).
- Example scope for CLI `git commit -m "the commit message"`:

```json
{
  "permissions": [
    {
      "identifier": "shell:allow-execute",
      "allow": [
        {
          "name": "run-git-commit",
          "cmd": "git",
          "args": ["commit", "-m", { "validator": ".+" }]
        }
      ]
    }
  ]
}
```

```ts
import { Command } from '@tauri-apps/plugin-shell'
Command.create('run-git-commit', ['commit', '-m', 'the commit message'])
```

- Differs from upstream: the TSDoc example uses the validator `\\S+`, which (anchored as `^\S+$`) rejects 'the commit message' because it contains spaces; this page uses `.+` so the scope and the call match.
- The TSDoc says `env: null` clears the process environment, but the declared type is `Record<string, string>`, so passing `null` needs a type cast in TypeScript.
- The shell plugin guide points `shell.open` users to the Opener plugin (`openUrl` / `openPath`); prefer it for opening files and URLs.
- Executing any API with a program not configured on the scope results in a promise rejection due to denied access.
- `EventEmitter.emit` is marked `@ignore` in the source (internal).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@shell-v2.5.0` `plugins/shell/guest-js/index.ts`; scope validator behavior from `plugins/shell/src/scope.rs` and `scope_entry.rs` (shell-v2.5.0)

## Related

- [Shell plugin](../plugins-core/shell.md)
- [Opener plugin JS API](./opener.md)
