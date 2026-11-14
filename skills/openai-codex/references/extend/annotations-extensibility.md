# Annotations extensibility (Browser Annotation API)

The Browser Annotation API lets your website customize what people select in Annotation mode, what context accompanies their feedback, and which controls they use to preview changes before sending an annotation to ChatGPT. Plain browser annotations work without code changes.

## Signature / Usage

```html
<section oai-annotation-container>
  <article id="chart-card" oai-annotatable="Q3 Revenue">
    <h2>Q3 Revenue</h2>
    <p>$120,000 this quarter</p>
    <button type="button">More info</button>
  </article>
</section>
```

JavaScript API: `document.oai.annotation` (in the desktop app's built-in browser, on secure top-level pages such as HTTPS or localhost; installed before page scripts run; no readiness event). Feature-detect each method. Methods return synchronously (`hitTest` may return a promise).

### HTML attributes and meta

| Goal | Integration |
|------|-------------|
| Make a card/group selectable as one object | `oai-annotation-container` on the region + `oai-annotatable="Name"` on targets (name optional; `oai-annotatable` alone has no effect; nearest marked target and nearest container win; unmarked areas inside a container create a webpage annotation) |
| Select a phrase or sentence | `oai-annotation-container-text` on a region (no value; if both attributes are on one element, text selection wins; text containers ignore `oai-annotatable`; not enabled inside iframes) |
| Add hidden context | `oai-annotation-metadata='{"email":"alex@example.com"}'` on a marked target |
| Default editor mode | `<meta name="oai-annotation-editor-default-mode" content="advanced" />` in `<head>` |

Metadata limits: flat JSON object, up to 6 properties (string, finite number, boolean, or `null`), keys up to 64 chars (start with ASCII letter; letters, digits, single spaces, `_`, `-`), string values up to 256 chars, 2,048 bytes serialized; invalid metadata is ignored.

### `request(target, options)`

Opens an annotation from your own UI; call it directly inside a user interaction (awaiting a network request first can lose it). Target: connected HTML element in the visible area, or a DOM `Range`. Virtual object IDs are not supported.

```typescript
annotation.request(summary, {
  initialComment: "Explain this delivery estimate.",
});
```

| Option | Behavior |
|--------|----------|
| `mode` | `"advanced"` opens advanced controls for an element; `"default"` (default). Text ranges support only `"default"`. |
| `enterAnnotationMode` | `true` enters Annotation mode and stays in it after cancel/send. |
| `omitScreenshot` | `true` omits the automatic screenshot (element and text-range requests). |
| `metadata` | Valid nonempty metadata replaces the target's HTML metadata for this request; ignored for text ranges and shadow DOM targets. |
| `initialComment` | Editable comment, up to 240 UTF-16 code units. |

Returns `{ accepted }`; `accepted` only means the browser received and validated it, not that the editor opened or the user sent anything. Only the user can submit. One accepted request can be held while the editor loads; others can be declined while a request is pending, an editor is open, or ChatGPT controls the browser.

Text range: the `Range` must contain nonempty visible text in the current document (at least partly in the visible area), at most 20,000 UTF-16 code units; collapsed, whitespace-only, hidden, and closed-shadow-root ranges are unsupported. `mode: "advanced"` is rejected and metadata ignored.

### `registerControls(options)`

```typescript
registration = annotation.registerControls({
  targets: preview.querySelectorAll(".preview-card"),
  controlsHeading: "Card spacing",
  controlsMode: "replace",
  controls: [
    {
      type: "range",
      label: "Card padding (pixels)",
      callback: "setCardPadding",
      reference: "--card-padding",
      min: 8,
      max: 32,
      step: 4,
      currentValue: 16,
    },
  ],
});
```

| Field | Notes |
|-------|-------|
| `targets` | 1-128 elements in the current document; selection attributes not required. |
| `controlsMode` | `"replace"` (only your controls) or `"extend"` (alongside built-ins). |
| `controlsHeading` | Optional panel name, 1-80 chars after trimming; not sent to ChatGPT. Default: element's HTML tag. |
| `controls` | Up to 12; each needs `type`, visible `label`, `callback`. |
| `callback` | String ID, unique per registration, starts with ASCII letter, letters/digits/`_`/`-`, max 80 UTF-16 units (not a function). |
| `reference` | Optional property/token name, 1-80 chars: ASCII letters, digits, `_ . / : @ $ # -`. |
| `currentValue` | Valid ordinary value incl. unsaved edits (baseline for before/after and reset). Omit it to always include the selected value even if unchanged. |
| `defaultValue` | Suggested starting value; wins over `currentValue` for initial state. Without both: white (color), min (range), first option (select), `false` (toggle). |

Control types:

| Type | Value | Additional fields |
|------|-------|-------------------|
| `color` | Hex string, 3/4/6/8 digits after `#` | None |
| `range` | Number | `min`, `max`, `step` (finite, -10,000..10,000; `min < max`; `step` 0.001..10,000 and <= `max - min`) |
| `select` | String | `options`: 1-12 `{ label, value }` with distinct values up to 512 units; labels up to 80 |
| `toggle` | boolean | None |

Handle previews with the `oaiannotationcontrolchange` event (bubbles from the selected element); `detail` has `callback`, `value`, `action`:

| `action` | Apply the supplied value to |
|----------|-----------------------------|
| `preview` | Show the requested change. |
| `preview-original` | Temporarily show the original for comparison. |
| `reset` | Restore the original when the preview is cleared. |

Return value: registration handle with `update({ targets, controls, controlsHeading, controlsMode })` (omitted fields kept; `targets: []` detaches; `controls: []` clears) and `dispose()` (does not undo your preview changes; remove inline overrides and listeners yourself). For `select`, callbacks receive `option.value` but annotation history and ChatGPT receive the visible `option.label`.

Limits: serialized `controls`+`controlsHeading`+`controlsMode` at most 16,384 UTF-16 units (JSON-encodable only); per document up to 64 registrations and 1,024 registration-to-target associations; labels may not contain control or direction-changing characters. `registerControls()`/`update()` throw synchronously on invalid input; a rejected update keeps the previous registration; update after `dispose()` throws.

### `registerSurface(options)` (canvas objects)

The official example's `hitTest` returns `null` for empty space and, on a hit, an object like this (the `id` alone is enough; the rest is optional context):

```javascript
return {
  id: "revenue-this-quarter",
  name: "Revenue this quarter",
  role: "chart-bar",
  metadata: { metricId: "quarterly-revenue" },
  rect,
};
```

Registration shape: `document.oai?.annotation?.registerSurface?.({ element: canvas, hitTest, renderSelection })`, returning a `surface` handle.

| Item | Notes |
|------|-------|
| `element` | Connected HTML element outside shadow DOM in a secure top-level document (not in an iframe). |
| `hitTest({ clientX, clientY, signal })` | Return `{ id, name?, role?, metadata?, rect? }` or `null` for empty space; may return a promise; `rect` in CSS pixels relative to the visible page area. 250 ms budget, then DOM selection fallback (also on errors/invalid results). Only one `hitTest` in flight: always settle the promise when aborted. |
| `renderSelection({ hoveredId, selectedId })` | Optional callback to draw hover/selection feedback; also use it to update host controls when `selectedId` changes. |
| `surface.invalidate()` / `surface.dispose()` | Call `invalidate()` after moving objects or zooming; `dispose()` when removing. |

Custom controls registered on the surface's element apply to its virtual objects (built-in CSS/text controls don't). Control events carry `detail.virtualTarget: { surfaceId, targetId }` (`targetId` = `id` from `hitTest`); route by that captured identity and `callback`, not the current selection.

### Annotation mode control

```typescript
const onClick = () => annotation?.toggle(!annotation.isActive());
```

- `toggle(force?)` inverts mode; `true` ensures on, `false` ensures off (idempotent); call from a live user interaction. Returns `{ accepted }` (acknowledges the request only).
- `isActive()` needs no gesture; the document event `oaiannotationmodechange` has `event.detail.active`; no initial event, so initialize UI from the getter.
- Annotation mode captures page clicks; hold **Space** to use page controls. No attribute lets clicks pass through.

## Notes

- Targets the DevDay 2026 release of the ChatGPT desktop app and later. In ChatGPT Enterprise and Edu workspaces an admin must allow **Site annotation customizations** via workspace policy. Text selection containers work only in Annotation mode with the site annotation capability and per-site setting enabled. Site-initiated requests may need user permission; users re-enable blocked features under **Site tools > Annotation features**.
- Manual **Adjust**, collapse, and Option-click controls exist only in Codex or on localhost; on hosted sites in ChatGPT registered controls appear automatically.
- Default mode doesn't guarantee a comment-only editor: custom controls with proposed starting values, or controls omitting `currentValue`, can open the controls editor. The page meta setting doesn't override `request({ mode })`.
- Name controls by what they change (e.g. "Page background"), not by the current value; keep proposed values separate from ordinary drafts; preview events don't request permanent changes (save through your normal flow).
- Testing checklist: select objects/text, open from your own button, change/compare/clear controls, canvas empty space/resizing/aborted hit tests, save/reopen/edit from the composer attachment, send with a message and confirm ChatGPT receives selection, metadata, and values, and verify the site works in a browser without the API.
- To compile the official TypeScript examples: `npm install --save-dev esbuild` and `npx esbuild annotations.ts --format=esm --outfile=annotations.js`, then load with `<script type="module" src="./annotations.js"></script>`. An "Annotations Extensibility" plugin is offered to help integrate.
- Annotations bring the person's selection into the conversation; site tools (WebMCP) let the agent act (see webmcp.md).
- Condensed from a long page; interactive "Try it" demos and the remaining full examples are omitted.
- Source: https://learn.chatgpt.com/docs/annotations-extensibility (retrieved 2026-11-14).

## Related

- [Browser](./browser.md)
- [Site tools (WebMCP)](./webmcp.md)
