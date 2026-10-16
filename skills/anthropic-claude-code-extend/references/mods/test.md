<!-- source: https://code.claude.com/docs/en/plugins/mods/test / last verified: 2026-10-17 -->

# Test a mod

Write `*.test.ts` files with the `claude-code/testing` kit that fire events through a mod's hooks and check results, run with `claude plugin test`, with no session, sign-in, or network.

## Signature / Usage

```typescript
// first-mod/tests/first-mod.test.ts
import { expect, test } from 'claude-code/testing'

test('/tally reports the tool calls the mod has seen', async ($, on) => {
  // Answer each tool call in Claude Code's place, so no tool runs
  on('tool.call', () => ({ result: 'ok' }))

  await $.tool.call({ tool: 'Bash', command: 'ls' })
  await $.tool.call({ tool: 'Read', file_path: 'README.md' })

  const answer = await $.command.run({ command: 'tally', args: '' })
  expect(answer.text).toBe('Claude has made 2 tool calls since this mod loaded')
})
```

```bash
claude plugin test          # exits 1 when a test fails
```

## Options / Props

What a stub returns, by call or event:

| Your mod calls or passes on | Stub |
|-----------------------------|------|
| `$.command.register`, `$.tool.register`, `$.ui.toast`, `$.ui.log`, `$.ui.status`, `$.ui.close`, `$.store.set` | `() => ({ value: undefined })` |
| `$.store.get` | `($, e) => ({ value: saved.get(e.key) })` |
| `$.fs.read` | `($, e) => ({ value: ... })` (`e.path` is absolute; compare with `endsWith`) |
| `$.ui.open` | `() => ({ value: { isPlaced: true } })` |
| `$.ui.ask` | A `tool.call` stub: `($, e) => ({ result: { answers: { [e.questions[0].question]: 'Run it' } } })` |
| `$.model.complete` | `() => ({ value: { isAnswered: true, text: '...', usage } })` |
| `$.process.run` | `($, e) => ({ value: { exitCode: 0, stdout: '...', stderr: '' } })` (`e.argv`, `e.init`) |
| Any API call that should fail | `() => ({ deny: 'the reason' })` |
| `session.start` | `() => ({ cwd: '/work' })` |
| `turn.start` | `($, e) => ({ turnId: e.turnId })` |
| `tool.call` | `() => ({ result: '...' })` |
| `turn.complete` | `() => ({ text: '' })` |
| `prompt.submit` | `($, e) => ({ text: e.text })` |
| `prompt.fill` | `() => ({ isFilled: true })` |
| `$.prompt.read` | `() => ({ value: { text: '...', cursor: 0 } })` |
| `$.ui.copy` | `() => ({ value: { isCopied: true } })` |
| `$.session.messages` | `() => ({ value: [{ role: 'assistant', text: '...', toolUses: [] }] })` |
| `$.session.id`, `$.agent.list` | `() => ({ value: 'abc123' })`, `() => ({ value: [] })` |
| `session.send` | `() => ({ isDelivered: true })` |
| `session.receive` | `($, e) => ({ text: e.text })` |
| `ui.render` | `() => ({ type: 'Text', props: {}, children: ['...'] })` |

Kit mocks and clock:

| API | What it does |
|-----|--------------|
| `mock.clock(on)` / `mock.clock(on, { now: 5000 })` | Mock clock starting at 0 |
| `clock.advance(ms)` / `clock.set(ms)` / `clock.now()` / `clock.settle()` / `clock.sleep(ms)` | Move time and run due timers; `sleep` inside a stub simulates slow calls |
| `mock.store(on, { count: 7 })` | Answers `$.store` from initial entries |
| `mock.env(on, { CI: 'true' })` | Answers `$.env.get` |
| `mock.session(on)` | `appended()` lists rows added with `$.session.append` (v2.1.293+) |
| `tier('prepend')` | Load the mod under test as `prepend`, `append`, or `builtin` (default `user`) |
| `test(name, { plugins: [{ name, register }] }, fn)` | Load extra inline mods, optionally with `tier` |

`$.ui.mount({ ...props, surface })` handle methods:

| Method | What it does |
|--------|--------------|
| `press({ key })` | Presses the `Button` with that key |
| `input({ key, text })` | Types and presses Enter (`kind: 'change'` to type without submitting) |
| `select({ key, value })` | Picks an option |
| `find({ key })` / `find({ type, text })` | First matching `{ type, props, children }` or `undefined`; `text` string or regex |
| `unmount()` | Removes the drawing |

`expect` assertions: `toBe`, `toEqual`, `toMatch`, `toMatchObject`, `toContain`, `toBeDefined`, `toBeUndefined`, `toThrow`, and `.not`.

## Notes

- The test's `$` acts as Claude Code and is not the mods API a hook receives: each method fires the same-named event (`$.tool.call`, `$.command.run`, `$.prompt.submit`, `$.session.start`, `$.turn.complete`, `$.classic.Stop`). A test cannot fire a mods API call such as `ui.close` directly.
- Register every stub before the test's first call on `$` (otherwise `on("ui.render") after the test first called $`).
- `session.start` does not run by itself; fire `$.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })` and stub `command.register` if the hook depends on it. Without a stub the call rejects with `no implementation for command.register` and the kit skips the hook.
- A `ui.render` hook that returns `next(e)` needs a `ui.render` stub or mounting fails with `no implementation for ui.render`.
- A `turn.step` stub is an async generator; read the stream with `stream.next()` until `done`.
- Stub errors: `returned neither { value } nor { deny }` (bare value returned) and `no implementation for <name>`; failed output includes a block headed `the engine reported:`. A stub that throws is skipped.
- The kit answers `$.ui.invalidate`, `$.state`, and `$.session.append` itself. `$.clock` calls need `mock.clock(on)`.
- Each test needs at least one `test()` (`declares no test(): nothing ran`). Each test starts with the module freshly loaded and every `$.state` value at default (as after `/clear`); test the reload path by firing `$.classic.SessionStart({ source: 'clear' })`.
- A drawing test checks the returned tree and its validity for the app, not how the app paints it.
- When mods cannot load in the shell, `claude plugin test` prints `claude plugin test: hooks modules are turned off` with a reason and exits 1. Default per-test timeout is 5 s.
- When the mod under test refuses another mod (policy mod), the first call on `$` throws with a message such as `runner: refused by acme-guard: Acme policy: mods may not call process.run`.

## Related

- [Create a mod](./create.md)
- [Draw in the interface with a mod](./interface.md)
- [Manage mods for your organization](./admin.md)
- [Troubleshoot a mod](./troubleshoot.md)
- [Mods reference](./reference.md)
