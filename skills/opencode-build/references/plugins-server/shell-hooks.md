---
source: https://opencode.ai/docs/build/plugins/server/#hooks
---

# Shell Hooks

Modify shell commands, working directories, timeouts, executables, or environment variables before execution.

## Signature / Usage

```ts
await ctx.shell.hook("create.before", (event) => {
  event.timeout = Math.min(event.timeout, 60_000)
  event.env.COMPANY_ENV = "development"
})
```

### Reference

```ts
interface ShellHookContext {
  hook(name: "create.before", callback: (event: ShellCreateBefore) => Promise<void> | void): Promise<Registration>
}

interface ShellCreateBefore {
  command: string
  cwd: string
  timeout: number
  shell: string
  env: Record<string, string | undefined>
}
```

## Options / Props

`ShellCreateBefore` fields:

| Name | Type | Description |
| --- | --- | --- |
| `command` | `string` | — |
| `cwd` | `string` | — |
| `timeout` | `number` | — |
| `shell` | `string` | — |
| `env` | `Record<string, string \| undefined>` | — |

## Notes

- V1 `shell.env` migrates to `ctx.shell.hook("create.before", ...)`.
- OpenCode plugin hooks are distinct from Claude Code hooks (anthropic-claude-code-extend).

## Related

- [Tool hooks](./tool-hooks.md)
- [Hooks overview](./hooks-overview.md)
