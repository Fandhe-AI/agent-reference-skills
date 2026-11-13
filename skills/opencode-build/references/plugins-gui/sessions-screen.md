---
source: https://opencode.ai/docs/build/plugins/gui/#sessions-and-the-session-screen
---

# Sessions and the session screen

`ctx.sessions.current()` is the routed session, and `ctx.screen.current()` is its screen.

## Signature / Usage

`ctx.sessions.current()` is the routed session, and `ctx.screen.current()` is its screen. Both are `undefined` on Home
and on a draft. Read them where you act, never once in `setup`.

```ts
const session = ctx.sessions.current()
const file = ctx.screen.current()?.file

if (session && file) void file.sync("README.md")
```

- `key` is `<server id>\n<session id>`, unique across servers. Key per-session state by it.
- `tab` is the key of the shell tab that owns the session. `pending` is `true` while the server still creates it.
- `directory` is the session's workspace directory, and `local` is `true` when that is the project root.
- `listedProject` is the sidebar project the session belongs to.
- `visit` is a new object each time the session is routed.
- `background` lists the session's running subagents and shell commands.
- `ctx.sessions.list()` returns the sessions of the open shell tabs.
- The screen's `file` reads the workspace's files, and `comment` holds the line comments of the next prompt.
  `composer` is the next prompt: its text, attached parts, and model; see
  [Attach to the composer](./composer.md).
- `file.sync(path)` loads a file and asks the server to watch it for changes. Call `file.unwatch(path)` when the file's
  tab closes.

#### Reference

```ts
interface Sessions {
  list(): SessionRef[]
  current(): MountedSession | undefined
}

interface SessionRef {
  key: string
  id: string
  tab: string
  server: ServerRef
  pending: boolean
  location: LocationRef | undefined
}

interface MountedSession extends SessionRef {
  visit: object
  project: Project | undefined
  listedProject: { worktree: string; name?: string; icon?: Project["icon"] } | undefined
  directory: string
  local: boolean
  background: BackgroundTask[]
}

interface Screen {
  current(): SessionScreen | undefined
}

interface SessionScreen {
  file: Files
  comment: Comments
  composer: Composer
}

interface Files {
  root: string
  ready(): boolean
  resolve(path: string): string
  absolute(path: string): boolean
  get(path: string): FileState | undefined
  missing(path: string): boolean
  sync(path: string, options?: { force?: boolean; silent?: boolean }): Promise<void>
  unwatch(path: string): void
  exists(path: string): Promise<boolean>
  search(query: string, options?: { kind?: "file" | "any"; limit?: number; signal?: AbortSignal }): Promise<string[]>
  selection: {
    get(path: string): LineRange | null | undefined
    set(path: string, range: LineRange | null): void
  }
  scroll: {
    get(path: string): { top?: number; left?: number }
    set(path: string, value: { top?: number; left?: number }): void
  }
  tree: {
    list(path: string): FileNode[]
    state(path: string): { expanded: boolean; loaded?: boolean; loading?: boolean; error?: string } | undefined
    sync(path: string, options?: { force?: boolean }): Promise<void>
    expand(path: string, options?: { list?: boolean }): void
    collapse(path: string): void
  }
}

interface Comments {
  list(file?: string): Comment[]
  add(input: Omit<Comment, "id" | "time">): Comment
  update(id: string, comment: string): void
  remove(id: string): void
  focus: {
    current(): { file: string; id: string } | null
    set(value: { file: string; id: string } | null): void
  }
  active: {
    current(): { file: string; id: string } | null
    set(value: { file: string; id: string } | null): void
  }
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Composer](./composer.md)
- [Servers and server events](./servers-events.md)
- [Layout](./layout.md)
