<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool / last verified: 2026-10-17 -->

# Browser use tool

GA client toolset that lets Claude navigate, read, and interact with webpages in a browser your application runs; one `browser_toolset_20260801` entry exposes the member tools (`navigate`, `read_page`, `left_click`, `screenshot`, ...), and your executor runs every call.

## Signature / Usage

```json
{
  "model": "claude-opus-5-5",
  "max_tokens": 2048,
  "tools": [
    { "type": "browser_toolset_20260801" }
  ],
  "messages": [
    { "role": "user", "content": "Open example.com/docs and tell me how to get started." }
  ]
}
```

Claude replies with `stop_reason: "tool_use"` and member blocks; each carries `"toolset_name": "browser"` and `input` holds only that member's parameters (no `action` field):

```json
{
  "type": "tool_use",
  "id": "toolu_01NRLabsLyVHZPKxbKvkfSMn",
  "name": "navigate",
  "toolset_name": "browser",
  "input": { "url": "https://example.com/docs" }
}
```

Return one `tool_result` per block, echoing `toolset_name`:

```json
{
  "type": "tool_result",
  "tool_use_id": "toolu_01NRLabsLyVHZPKxbKvkfSMn",
  "toolset_name": "browser",
  "content": [
    { "type": "text", "text": "Navigated to https://example.com/docs" },
    {
      "type": "browser_state",
      "tabs": [
        {
          "tab_id": "tab-1",
          "title": "Documentation",
          "url": "https://example.com/docs",
          "active": true
        }
      ]
    }
  ]
}
```

## Options / Props

Toolset entry fields (besides `type`):

| Name | Type | Description |
| --- | --- | --- |
| `configs` | object keyed by member name | Per-member settings; list only members you change |
| `configs.<member>.enabled` | boolean | Default `true`, except `false` for `javascript_exec`, `file_upload`, `read_console`, `read_network` |
| `configs.<member>.defer_loading` | boolean | Default `false`; must resolve to the same value on every enabled member |
| `cache_control` | object | Shared with the computer use toolset (see Client toolsets in the tool reference) |
| `allowed_callers` | array | Shared with the computer use toolset; a code execution caller is not accepted |

Member tools (31 declared; 27 on by default). `tab_id?` defaults to the active tab:

| Group | Member: input |
| --- | --- |
| Navigation and capture | `navigate`: `url` (`http`/`https`, or `"back"` / `"forward"` / `"reload"`), `tab_id?`; `screenshot`: `tab_id?`; `zoom`: `region` `[x0, y0, x1, y1]`, `tab_id?` |
| Pointer | `left_click` / `right_click` / `middle_click` / `double_click` / `triple_click`: `target: Target`, `modifiers?`, `tab_id?`; `hover`: `target`, `tab_id?`; `left_click_drag`: `from`, `target` (both `CoordinateTarget`); `left_mouse_down` / `left_mouse_up` / `mouse_move`: `target: CoordinateTarget`; `scroll`: `target: CoordinateTarget`, `scroll_direction` (`up`/`down`/`left`/`right`), `scroll_amount?` (1 to 10, default 3); `scroll_to`: `target: RefTarget` |
| Keyboard and timing | `type`: `text`; `key`: `text`, `repeat?` (1 to 100, default 1); `hold_key`: `text`, `duration` (0 to 30 s); `wait`: `duration` (0 to 30 s) |
| Page reading | `read_page`: `filter?` (`"interactive"` / `"all"`), `depth?` (min 1, default 15), `ref?`; `find`: `query` (up to 20 matches); `get_page_text` |
| Forms and files | `form_input`: `target: RefTarget`, `value` (string / number / boolean); `file_upload` (off by default): `target: RefTarget`, `paths?`, `document_ids?` (at least one) |
| Diagnostics and scripting (all off by default) | `read_console`, `read_network`: `tab_id?`; `javascript_exec`: `text` (an expression, not a `return` statement) |
| Tab management | `new_tab`, `list_tabs`: no input; `switch_tab`, `close_tab`: `tab_id` (required) |

Targets: `CoordinateTarget` is `{"type": "coordinate", "x", "y"}` (integer viewport pixels); `RefTarget` is `{"type": "ref", "ref": "ref_2"}` (reference returned by `read_page` / `find`).

`browser_state` block (reported by your executor; Claude never sees it directly, the API renders text from it):

| Field | Description |
| --- | --- |
| `tabs` | Full inventory of open tabs after the call (not a delta); entries `tab_id`, `title`, `url`, `active`; when non-empty, exactly one `active: true`; at most 100 tabs |
| `state_changes` | Optional; `tab_opened` (`tab_id`), `download_started` (`download_id`, `url`), `download_completed` (`download_id`, `url`, `path?`, `size_bytes?`), `download_failed` (`download_id`, `url`, `error?`); at most 200; omit rather than send an empty array |

## Notes

- Status GA. Supported platforms: Claude API and Google Cloud. ZDR eligible (excludes Covered Models). Supported model IDs listed on the source page: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-opus-5-5`, `claude-opus-5`, `claude-sonnet-5-5`, `claude-sonnet-5`, `claude-opus-4-8`, `claude-haiku-5-5`. Not currently available in Claude Managed Agents.
- The Python and TypeScript SDKs have a beta browser toolset class that runs the loop for you; see browser-use-sdk. Use this page as the tool reference or when you handle tool calls yourself.
- Distinct from the computer use tool (`computer_20251124`, whole desktop via screenshots and coordinates only) and from the web fetch / web search server tools (run by the API, no browser to operate). Browser use works through the accessibility tree plus screenshots; coordinates are viewport pixels (origin top left of the rendered page).
- Run a batch in order, stop at the first failure, and answer every later call with `is_error: true` and the exact text `Not executed: an earlier action in this turn failed.` Answer every `tool_use`, or the next request is rejected. Dispatch on (`toolset_name`, `name`), not `name` alone.
- When streaming, each member's `input` arrives as one complete `input_json_delta`.
- Member `tool_result` content may contain only `text`, `image`, and `browser_state` blocks. Only `screenshot` and `zoom` require an `image` block. `new_tab` / `switch_tab` / `close_tab` / `list_tabs` return exactly one `browser_state` block (no text or image); a `new_tab` result must also carry one `tab_opened` state change matching the active tab. Never send `browser_state` or `state_changes` on an `is_error: true` result.
- Element references (`[ref_N]`) are scoped to the tab that produced them and valid until it navigates or its DOM changes materially; return an error result for a stale or unknown reference. Prefer `read_page` with `filter: "interactive"` before screenshots on large pages; fall back to coordinates for canvas, video, virtualized lists, and cross-origin iframes.
- The API does not downscale toolset images: a screenshot or `zoom` image over the model's image size limits (or the stricter limit once a request holds more than 20 images) is rejected. Resize before returning and scale Claude's coordinates back.
- Request errors (`invalid_request_error`): a `name`, `strict: true`, `input_examples`, or entry-level `defer_loading` on the toolset entry; unknown `configs` keys; differing `defer_loading` across enabled members; no member enabled; a second browser toolset or another tool named `browser`; `tool_choice` of type `tool` naming `browser` or a member; the legacy `fine-grained-tool-streaming-2025-05-14` beta header; missing or wrong `toolset_name` on a member result; malformed `browser_state`.
- `disable_parallel_tool_use: true` in `tool_choice` limits Claude to at most one member call per turn.
- Tab titles, URLs, and download `url` / `path` / `error` are untrusted (prompt-injection surface); the API renders URLs verbatim, so sanitize them. Do not pre-escape titles.
- Security: run the browser and executor in a dedicated minimal-privilege container or VM with a fresh credential-free profile; enforce a domain allowlist at the network layer and re-check it in `navigate` after redirects; accept only `http` / `https` (refuse `javascript:`, `file:`, `data:`, `chrome:` with a URL parser, not a string prefix); keep `javascript_exec` and `file_upload` disabled unless needed; require human confirmation for consequential actions. Anthropic prompt-injection classifiers scan browser results automatically (opt out via support).
- `file_upload` should resolve paths (symlinks and `..`) and accept only a dedicated, allowlisted upload directory, never the browser's download directory.
- Pricing: standard tool use pricing. Declaring the toolset with default members adds about 6,600 input tokens (about 6,670 on Claude Sonnet 5, about 6,610 on other supported models); enabling all four optional members adds about 880 more. Screenshots and text results are billed as input.

## Related

- [browser-use-sdk](./browser-use-sdk.md)
- [computer-use-tool](./computer-use-tool.md)
- [handle-tool-calls](./handle-tool-calls.md)
- [parallel-tool-use](./parallel-tool-use.md)
- [tool-reference](./tool-reference.md)
- [web-fetch-tool](./web-fetch-tool.md)
- [web-search-tool](./web-search-tool.md)
