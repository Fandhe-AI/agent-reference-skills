# FileFormat / TextFileFormat (editor file-format protocols)

Protocols for adding editor support for custom file formats. `FileFormat` handles custom binary formats (files with a claimed extension import as blobs, keeping raw bytes, with previews from `view`). `TextFileFormat` handles text formats that are editable in the editor, synced across collaborators, with callbacks driving the text editor's intelligence.

## Signature / Usage

```lua
local format: TextFileFormat = {
    name = 'Markdown',
    extensions = { 'md' },
}

return function(): TextFileFormat
    return format
end
```

Binary format:

```lua
local format: FileFormat = {
    name = 'Model',
    extensions = { 'glb' },
}

return function(): FileFormat
    return format
end
```

## Options / Props

### FileFormat / TextFileFormat

| Name | Signature | Description |
|------|-----------|-------------|
| `name` | field | Display name of the format, e.g. "Markdown" |
| `extensions` | field | File extensions handled, without dots, e.g. `{"md", "markdown"}` |
| `parse` | `parse(doc: FormatDocument) -> buffer?` | Optional. Called once per document version; the returned buffer is cached by Rive, keyed to the document's content, and passed back into every other callback. Within one VM the same buffer object is reused; across VMs the bytes are copied once |
| `view` | `view(doc: FormatDocument, editor: EditorContext, surface: FormatSurface, parsed: buffer?) -> FormatView?` | Creates the preview for a document on a surface. Each surface gets its own view; a document can be visible on several at once |
| `highlight` | `highlight(doc, parsed: buffer?) -> {FormatToken}` | TextFileFormat only. Returns highlight tokens |
| `diagnostics` | `diagnostics(doc, parsed: buffer?) -> {FormatDiagnostic}` | TextFileFormat only. Returns problems |
| `completions` | `completions(doc, line: number, column: number, parsed: buffer?) -> {FormatCompletion}` | TextFileFormat only. Returns completions at the position |
| `hover` | `hover(doc, line: number, column: number, parsed: buffer?) -> FormatHover?` | TextFileFormat only. Hover documentation at the position, or nil |
| `format` | `format(doc, parsed: buffer?) -> string?` | TextFileFormat only. Fully formatted text, or nil to leave the document unchanged. Rive diffs the result against the current text and applies minimal edits |

### EditorContext (edit-time context handed to views)

| Name | Signature | Description |
|------|-----------|-------------|
| `image` | `image(name: string) -> Image?` | Image asset by name, or nil |
| `blob` | `blob(name: string) -> Blob?` | Blob asset by name, or nil |
| `artboard` | `artboard(name: string) -> Artboard<ViewModel?>?` | Fresh instance of a named artboard, private to this view; default view model instance bound and reachable through `data` (nil when none). Names resolve against this script's own file; prefix with a library namespace (`markdown@0/Document`) to name one explicitly |
| `hostArtboard` | `hostArtboard(name: string) -> Artboard<ViewModel?>?` | Like `artboard`, but always resolves in the file being edited |
| `theme` | `theme() -> EditorTheme` | The editor's current theme |
| `openUrl` | `openUrl(url: string)` | Opens a url in the user's browser |
| `themeFont` | `themeFont() -> Font?` | Font the code editor renders with. Assign to a view model font property |
| `defaultFont` | `defaultFont() -> Font?` | Editor's default UI font, for preview prose |
| `codeFont` | `codeFont() -> Font?` | Editor's built-in code font, for preview code regions |
| `editorScroll` | `editorScroll() -> EditorScroll?` | Text editor's scroll position, refreshed each draw while the user scrolls; nil on surfaces without an attached editor (inspector, viewer tab) |
| `scrollTo` | `scrollTo(x: number, y: number) -> ()` | Scrolls the pane hosting this view to a content offset, clamped to measured content. Only meaningful for pane views with `measure` |
| `scrollEditorTo` | `scrollEditorTo(line: number) -> ()` | Scrolls the attached text editor to a fractional line factor, clamped. Ignored without an attached editor. Guard against ping-pong when combined with `editorScroll` syncing |
| `requestDraw` | `requestDraw() -> ()` | Asks the host to repaint the view outside the advance loop, e.g. when an async decode completes |
| `shader` | `shader(name: string) -> Shader?` | Compiled shader by name, or nil |
| `canvas` | `canvas(desc: {width: number?, height: number?}?) -> Canvas` | Creates a CPU canvas. Zero or missing size defers the backing texture |
| `gpuCanvas` | `gpuCanvas(desc: {width: number?, height: number?}?) -> GPUCanvas` | Creates a GPU canvas for render pass drawing |
| `features` | `features() -> GPUFeatures` | Capabilities of the active GPU device |
| `decodeImage` | `decodeImage(data: buffer) -> Promise<DecodedImage>` | Decodes an encoded image (png, jpeg, webp) into a drawable image |

### FormatView (one document on one surface; created by `FileFormat.view`, disposed when the surface closes)

| Name | Signature | Description |
|------|-----------|-------------|
| `draw` | `draw(renderer: Renderer, width: number, height: number) -> ()` | Draws the current frame into a viewport of width by height |
| `measure` | `measure(viewportWidth: number, viewportHeight: number) -> (number, number)` | Pane surfaces only: content's intrinsic size, driving the pane's scrollbars. Omit for fit-to-viewport views; the inspector never measures |
| `advance` | `advance(seconds: number) -> boolean` | Advances animation state. Return true to keep receiving frames |
| `textScrolled` | `textScrolled(x: number, y: number, line: number, maxLine: number) -> ()` | User scrolled the text editor; x/y are scroll percentages, line is the fractional top visible line. Never fired for host-performed `scrollEditorTo` |
| `paneScrolled` | `paneScrolled(x: number, y: number) -> ()` | User scrolled the preview pane (measured views only); offsets in content coordinates |
| `paneWheel` | `paneWheel(dx: number, dy: number) -> ()` | Raw wheel/trackpad input over an unmeasured (self-scrolling) preview, in pixels, positive y scrolling down |
| `pointerDown` / `pointerMove` / `pointerUp` | `(event: PointerEvent) -> ()` | Pointer input over the preview surface; signatures match the Layout protocol so live artboards can forward events directly |
| `documentChanged` | `documentChanged(doc: FormatDocument, parsed: buffer?) -> ()` | Text documents only: the document changed |
| `selectionChanged` | `selectionChanged(line: number, column: number) -> ()` | Text documents only: the primary cursor moved; zero based code point coordinates |
| `dispose` | `dispose() -> ()` | The surface is closing; release resources |

### Data types

| Type | Fields / values |
|------|-----------------|
| `FormatDocument` | `name` (display name, e.g. "readme"), `extension` (without the dot), `text` (nil for binary), `bytes` (nil for text). Exactly one of `text` / `bytes` is set. Positions reported back to Rive are 0-based byte offsets into `text` |
| `FormatSurface` | `kind`: 'pane' for the editor split or full viewer tab, 'inspector' for the selected asset strip |
| `FormatToken` | `line`, `column`, `scope`, `length`. When `length` is omitted the run extends to the next token on the same line, or the end of the line |
| `FormatScope` | `none`, `keyword`, `type`, `literal`, `number`, `operator`, `punctuation`, `property`, `string`, `comment`, `boolean`, `nil`, `interp`, `function` (same theme colors as the Luau and WGSL editors) |
| `FormatDiagnostic` | `startLine`, `startColumn`, `endLine`, `endColumn`, `message`, `severity` (defaults to 'error' when omitted) |
| `FormatCompletion` | `text`, `startLine`, `startColumn`, `endLine`, `endColumn`. When the range is omitted the completion inserts at the cursor position |
| `FormatHover` | `startLine`, `startColumn`, `endLine`, `endColumn`, `preview` (short single line, e.g. a signature), `documentation` (Markdown body) |
| `EditorTheme` | `scopes` (per-scope styles), `background`, `divider`, `dividerHighlight`, `error`, `warning`, `lineNumber`, `fontSize`, `lineHeight` |
| `EditorThemeStyle` | `color`, `weight` (plain values, usable for paints / view models) |
| `EditorScroll` | `percent` (0 to 1), `line` (fractional 0-based top line), `maxLine` (scrollable range in line units), `cursorLine`, `cursorFraction` (0 top to 1 bottom; cursor fields nil when the editor has no cursor) |

## Notes

- Text documents export as plain blobs, so scripts read them via `context:blob(name)` at both edit time and runtime.
- TextFileFormat analysis callbacks are pure functions of `(doc, parsed)`; state lives only in views. `parsed` is nil when `parse` is not implemented.
- `EditorTheme` values refresh live when the user's config changes; read inside draw/measure rather than caching across frames.

## Related

- [protocol-overview.md](./protocol-overview.md)
- [renderer.md](./renderer.md)
- [pointer-events.md](./pointer-events.md)
- [font.md](./font.md)
