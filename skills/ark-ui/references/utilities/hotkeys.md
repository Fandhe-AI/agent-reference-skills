# Hotkeys

Register keyboard shortcuts, sequences and scopes, and read them back to build a command palette.

## Signature / Usage

```tsx
import { useFormatHotkey, useHotkey } from '@ark-ui/react/hotkeys'
import { useState } from 'react'

export const Basic = () => {
  const [count, setCount] = useState(0)
  const formatHotkey = useFormatHotkey()

  useHotkey({ hotkey: 'mod+K', action: () => setCount((value) => value + 1) })

  return (
    <p>
      Press <kbd>{formatHotkey('mod+K')}</kbd> ({count})
    </p>
  )
}
```

Exports (from `@ark-ui/react/hotkeys`): `useHotkey`, `useHotkeys`, `useHotkeyRegistrations`, `useHotkeyStore`, `usePressedKeys`, `useIsKeyPressed`, `usePlatform`, `useFormatHotkey`, `useHotkeyRecorder`, plus re-exports from `@zag-js/hotkeys`: `createHotkeyStore`, `formatHotkey`, `isHotKey`, `isHotkeyEqual`, `parseHotkey`, `validateHotkey` and the types `CommandDefinition`, `ConflictBehavior`, `HotkeyAction`, `HotkeyCommand`, `HotkeyFormatOptions`, `HotkeyOptions`, `HotkeyStore`, `HotkeyStoreOptions`, `ParsedHotkey`, `Platform`, `RecordedHotkey`.

Multiple shortcuts and a custom store:

```tsx
const store = createHotkeyStore({
  activeScopes: ['editor'],
  conflictBehavior: 'replace',
  sequenceTimeoutMs: 800,
})

useHotkeys({ commands, store })
useHotkey({ hotkey: 'mod+S', action: save, store })
```

Sequences use `>` (for example `'G > H'`). A function `enabled` is re-evaluated on each key press:

```tsx
useHotkey({ hotkey: 'mod+S', action: save, enabled: () => !isReadOnly })
```

## Options / Props

### createHotkeyStore

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `activeScopes` | `string \| string[]` | `['*']` | The scopes that start active. Only commands in an active scope fire. |
| `conflictBehavior` | `'warn' \| 'error' \| 'replace' \| 'allow'` | `'warn'` | What to do when two commands register the same hotkey. `warn` keeps both and logs, `replace` drops the earlier one, `allow` keeps both silently, `error` refuses the second. |
| `defaultOptions` | `HotkeyOptions` | — | Options applied to every command registered on this store. Per-command options override it. |
| `sequenceTimeoutMs` | `number` | `1000` | How long a sequence like `G > H` waits for the next key before resetting. |
| returns | `HotkeyStore` | — | The store. Pass it to any hook as `store`, and keep it stable: build it outside the component or memoize it. |

### useHotkey

Takes one object: every field of `UseHotkeysCommand`, plus an optional `store`.

### useHotkeys

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `commands` | `UseHotkeysCommand[]` | — | Required. The commands to register. The whole argument is `{ commands, store, id }`. |
| `store` | `HotkeyStore` | — | The store to register on. Defaults to a store shared by every hook that does not name one. |
| `id` | `string` | — | Prefix for the ids generated for commands that do not set their own. One is generated when omitted. |

### UseHotkeysCommand

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Identifies the command across renders. Generated when omitted, keyed by position within the hook instance. |
| `hotkey` | `string` | — | Required. The key combination or sequence that triggers the command. |
| `action` | `(event: KeyboardEvent) => void` | — | Required. Called when the hotkey fires. |
| `label` | `string` | — | Human-readable name. Read back by `useHotkeyRegistrations`. |
| `description` | `string` | — | Longer explanation of what the command does. |
| `category` | `string` | — | Group name, for sectioning a command palette. |
| `keywords` | `string[]` | — | Alternative search terms for a palette. |
| `scopes` | `string \| string[]` | `'*'` | The scopes this command belongs to. It only fires while one of them is active. |
| `enabled` | `boolean \| (() => boolean)` | `true` | Whether the command can fire. A function is re-evaluated on every key press. |
| `options` | `HotkeyOptions` | — | Per-command behavior. Overrides the store `defaultOptions`. |

### HotkeyOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `preventDefault` | `boolean` | — | Call `preventDefault()` on the event before running the action. |
| `stopPropagation` | `boolean` | — | Call `stopPropagation()` on the event before running the action. |
| `enableOnFormTags` | `boolean \| ('input' \| 'textarea' \| 'select')[]` | `false` | Whether a single-key shortcut fires while an input, textarea or select has focus. Shortcuts with a modifier always fire. Pass an array to opt in to specific tags. |
| `enableOnContentEditable` | `boolean` | `false` | Whether the shortcut fires inside a contenteditable element. |
| `capture` | `boolean` | `true` | Listen in the capture phase. |
| `requireReset` | `boolean` | `false` | Fire once per press. The key must be released before it fires again, which suppresses key repeat. |
| `eventType` | `'keydown' \| 'keyup'` | `'keydown'` | Whether to fire on press or on release. Pair a `keyup` command with a `keydown` one on the same key for push-to-talk. |
| `target` | `Element \| (() => Element \| null)` | — | Scope the command to a DOM subtree. Fires only when the event originates inside this element, which must contain focus. Resolved on every event; skipped while it resolves to `null`. |

### Hooks

| Hook | Arguments | Returns | Description |
| --- | --- | --- | --- |
| `useHotkeyRegistrations` | `{ store? }` | `HotkeyCommand[]` | Every command currently registered on the store, with label, category, keywords and resolved hotkey. Re-reads when commands are added or removed. |
| `useHotkeyStore` | — | `HotkeyStore` | The store you passed, or the shared default store. Use `setScope`, `addScope`, `removeScope`, `toggleScope` to change which commands are live, and `isPressed` to test a combination. |
| `usePressedKeys` | `{ store? }` | `string[]` | The keys currently held down. |
| `useIsKeyPressed` | `{ hotkey, store? }` | `boolean` | Whether that key or combination is currently held. |
| `usePlatform` | — | `Platform` | `'mac'`, `'windows'` or `'linux'`. Resolves after mount, so server and client render the same markup. |
| `useFormatHotkey` | — | `(hotkey: string, options?: HotkeyFormatOptions) => string` | Formatter bound to the current platform, so `mod+K` renders as `⌘ K` on macOS and `Ctrl K` elsewhere. |
| `useHotkeyRecorder` | `UseHotkeyRecorderProps` (`onRecord`, `onCancel`, `onClear`, `formatOptions`, `sequenceTimeoutMs`) | `UseHotkeyRecorderReturn` | Captures whatever the user presses, for a "click to rebind" setting. |

### UseHotkeyRecorderReturn

| Name | Type | Description |
| --- | --- | --- |
| `recording` | `boolean` | Whether the recorder is currently listening for key events. |
| `value` | `RecordedHotkey \| null` | The hotkey recorded so far. `value` is the raw string, `display` is the platform-formatted one. |
| `start` | `() => void` | Start listening for key events. |
| `stop` | `() => void` | Stop listening and keep the recorded hotkey. |
| `cancel` | `() => void` | Stop listening and discard the recorded hotkey. Also triggered by Escape. |
| `clear` | `() => void` | Clear the recorded hotkey. Also triggered by Backspace or Delete. |

## Notes

- Preview status: the official page is marked `status: preview` in the source (`@ark-ui/react` 5.39.3 docs).
- Built on `@zag-js/hotkeys`; React-only entrypoint `@ark-ui/react/hotkeys`.
- `mod` resolves to Command on macOS and Control elsewhere.
- Without a `store`, every hook registers on a shared default store. Build a custom store outside the component or memoize it; one created during render is rebuilt on every render and loses its registrations.
- Single keys are ignored while typing in an input, textarea or select; shortcuts with a modifier still fire. Opt in with `options: { enableOnFormTags: true }`.
- Inside a component use `useFormatHotkey` rather than importing `formatHotkey` from `@zag-js/hotkeys`, which reads the platform during render and mismatches on hydration.
- `conflictBehavior` is fixed when the store is created; switching it requires a new store.
- A command palette can give its own store and read `useHotkeyRegistrations({ store })` to list only its commands.
- Source: https://ark-ui.com/react/docs/utilities/hotkeys (Ark UI @ark-ui/react 5.39.3)

## Related

- [Locale](./locale.md)
