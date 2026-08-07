# Keyboard Shortcuts (Scripting Editor)

Reference for keyboard shortcuts in the Rive script editor, covering editing, navigation, selection, multi-cursor, search, and auto-formatting.

## Signature / Usage

```lua
-- Format the current file
-- macOS: F4  |  Windows/Linux: F4

-- Add a cursor at the next occurrence of the current selection
-- macOS: ⌘D  |  Windows/Linux: Ctrl+D

-- Toggle a line comment (Luau uses `--`)
-- macOS: ⌘/  |  Windows/Linux: Ctrl+/
```

## Options / Props

| Category | Examples (macOS / Windows-Linux) |
| --- | --- |
| Basic editing | Undo `⌘Z` / `Ctrl+Z`, Save `⌘S` / `Ctrl+S`, Format File `F4` |
| Cursor movement | By character/line/word `←→↑↓`, by subword `⌃⌥←→`, to line/doc start-end `⌘←→` / `⌘↑↓` |
| Selection | Same movement combined with `⇧` (Shift) |
| Line operations | Toggle comment `⌘/`, insert line below `⌘↩`, move line `⌥↑/↓`, duplicate line `⇧⌥↑/↓` |
| Multi-cursor | Add cursor `⌥+Click`, select next occurrence `⌘D`, collapse `Esc` |
| Search | Find `⌘F`, Find in Files `⌘⇧F`, toggles for Match Case / Whole Word / Regex |
| Code navigation | Go to Definition `⌘+Click`, File Palette `⌘P`, Command Palette `⌘⇧P`, Global Search `⌘K` |
| File/tab management | Close Tab `⌘W`, Previous/Next Tab `⌘⇧[` / `⌘⇧]` |
| Auto-closing pairs | `{}` `[]` `()` `""` `''` `` `` `` — auto-inserted; wraps selection when typed over a selection |
| Auto-complete Luau blocks | `function`/`do`/`then`/`else`/`repeat` auto-insert matching `end` (or `until false`) |

## Notes

- Indentation uses 2 spaces (soft tabs); line comments use `--` (Luau style).
- Diff Mode (reviewing AI-generated changes) supports per-chunk Accept/Reject and Accept All / Reject All.

## Related

- [configuration.md](./configuration.md)
