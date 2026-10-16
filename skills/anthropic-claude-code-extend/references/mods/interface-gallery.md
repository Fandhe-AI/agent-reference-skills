<!-- source: https://code.claude.com/docs/en/plugins/mods/gallery / last verified: 2026-10-17 -->

# Interface gallery for mods

Samples of the elements a mod can draw (`Text`, `Markdown`, `Link`, `Code`, `Box`, `Button`, `Input`, `Select`, `Raster`, `Svg`, `Image`, `Client`); each snippet is the code for one element, pasted into a `/gallery` pane mod.

## Signature / Usage

Starter module that opens a pane drawing one sample (replace the `Text(...)` after `return` with a sample):

```javascript
// gallery/hooks/register.js
const noop = () => {}
let picked = 'md'

export function register(on) {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'gallery', description: 'Open the sample pane' })
    return next(e)
  })

  on('command.run', { command: 'gallery' }, async ($) => {
    await $.ui.open({ id: 'gallery', focus: true, closeOnEscape: true })
    return {}
  })

  on('ui.render', { component: 'Pane' }, async ($, e, next) => {
    if (e.requestId !== 'gallery') return next(e)
    const { Box, Text, Button, Input, Select, Link, Markdown, Code, Raster, Svg } = $.ui.resolve(e)
    return Text({ children: ['Plain text'] })
  })
}
```

Run with `claude --plugin-dir ./gallery`, then `/gallery`; saving the file reloads the module.

## Options / Props

| Element | Sample |
|---------|--------|
| `Text` | `Text({ bold: true, children: ['bold'] })`; also `italic`, `underline`, `strikethrough`, `dimColor`, `inverse`, `color: 'red'`, `backgroundColor: 'blue'` |
| `Markdown` | `Markdown({ text: '## Release notes\n\nThis build has **two** fixes and one `flag`' })` (content in `text`, not `children`) |
| `Link` | `Link({ href: 'https://code.claude.com/docs', label: 'Claude Code docs' })` |
| `Code` | `Code({ language: 'javascript', startLine: 1, source: "const name = 'mods'\nconsole.log('hello ' + name)" })` |
| `Code` (diff) | `Code({ format: 'diff', source: '@@ -1,3 +1,3 @@\n # Mods\n-A mod is a plugin.\n+A mod is a plugin that runs code.\n Read on.' })` |
| `Box` | `Box({ flexDirection: 'row', columnGap: 4, children: [...] })`; `Box({ borderStyle: 'round', paddingX: 1, children: [...] })` |
| `Button` | `Button({ key: 'save', label: 'Save', onPress: noop })`; `Button({ key: 'next', label: 'Next', hotkey: 'n', plain: true, onPress: noop })`; `dimColor: true` for a dim one |
| `Input` | `Input({ key: 'title', label: 'Title', placeholder: 'Type a title and press Enter', value: '', submitLabel: 'save', onSubmit: noop })` |
| `Select` | `Select({ key: 'format', label: 'Format', value: picked, options: [{ value: 'md', label: 'Markdown' }, { value: 'html', label: 'HTML' }, { value: 'txt', label: 'Plain text' }], onSelect: (value) => { picked = value } })` |
| `Raster` | `Raster({ key: 'grid', columns: 3, rows: 2, cells: cellsOf([[['█', 0x2e7d32], ['█', 0xf9a825], ['█', 0xc62828]], [['█', 0x2e7d32], ['█', 0x2e7d32], ['█', 0xf9a825]]]) })` |
| `Svg` | `Svg({ alt: 'Three bars of rising height', width: 120, height: 60, source: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60">...</svg>' })` |

`cellsOf` packs cells for a `Raster`:

```javascript
const DEFAULT_COLOR = 0x01000000
function cellsOf(rows) {
  const numbers = rows.flat().flatMap(([char, color]) => [char.codePointAt(0), color, DEFAULT_COLOR])
  return new Uint8Array(Uint32Array.from(numbers).buffer).toBase64()
}
```

## Notes

- `dimColor` draws text in gray; `backgroundColor` fills only as wide as the text. A `Box` border stretches to the pane width.
- `Link` in the terminal draws the label followed by the URL as text; whether a click opens it depends on the terminal.
- `Code` uses the user's theme colors. In the VS Code extension `Code` shows `source` as plain text with no colors, line numbers, or diff shading. In diff mode Claude Code draws line numbers in place of the `@@` line.
- A `Raster` rounds each color to a smaller palette (`0x2e7d32` draws as `#337733`). `Svg` draws only in the Desktop app and VS Code; in the terminal a pane returning only an `Svg` opens empty, so branch on `e.surface`.
- `Image` and `Client` have no sample. Unless Claude Code detects kitty graphics protocol Unicode placeholders (kitty 0.28+ and Ghostty, at startup), the user sees the `alt` text dimmed instead; detection fails in other terminals, inside tmux / screen, and in background sessions. Set `CLAUDE_CODE_FORCE_TERMINAL_IMAGES=1` to skip detection (does not help inside tmux / screen).
- Controls are reached with Tab; open the pane with `focus: true` so typed letters reach an `Input`. A focused button draws in inverse video.
- Other places a mod can draw: toast / status line / log line via `$.ui.toast` / `$.ui.status` / `$.ui.log`, and the question dialog via `$.ui.ask`.

## Related

- [Draw in the interface with a mod](./interface.md)
- [Mods reference](./reference.md)
- [Test a mod](./test.md)
