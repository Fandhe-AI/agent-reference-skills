<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool / last verified: 2026-10-17 -->

# Computer use tool

GA client toolset (`computer_toolset_20260801`): one `tools` entry gives Claude 17 member tools (screenshot, mouse, keyboard, zoom); your application runs every call in an environment you control. Claude's calls may arrive as a batch of `tool_use` blocks.

## Signature / Usage

```json
{
  "type": "computer_toolset_20260801",
  "configs": {
    "zoom": { "enabled": false }
  },
  "cache_control": { "type": "ephemeral" }
}
```

No beta header and no `name`. A response carries member calls such as:

```json
{
  "type": "tool_use",
  "id": "toolu_01WkoTUvSHDzTBu2xnGk8Ep8",
  "name": "left_click",
  "toolset_name": "computer",
  "input": { "coordinate": [512, 742] }
}
```

`input` holds only that member's parameters; there is no `input.action`.

## Options / Props

Toolset entry parameters:

| Name | Required | Description |
| --- | --- | --- |
| type | Yes | `computer_toolset_20260801` |
| configs | No | Per-member settings keyed by member name; each member accepts `enabled` (default `true` for all 17, including `zoom`) and `defer_loading` (default `false`, for tool search). Omitted members keep their defaults |
| cache_control | No | Prompt caching breakpoint at the toolset definition; entry only (not inside `configs`). A breakpoint on any `tool_use` / `tool_result` in a batch takes effect at the end of that batch |
| allowed_callers | No | `["direct"]` only |

The entry rejects `name`, `display_width_px`, `display_height_px`, `display_number`, `enable_zoom` (`invalid_request_error`), and cannot be declared in the same request as a `computer_20251124` entry or another tool named `computer`.

Member tools (17):

| Member | Input | Description |
| --- | --- | --- |
| `screenshot` | `{}` | Capture the full display and return it as an image |
| `zoom` | `region`: `[x0, y0, x1, y1]` | Capture only that region at full resolution, scaled to fit within the usual screenshot dimensions, aspect ratio preserved |
| `left_click` | `coordinate` (optional) `[x, y]`; `text` (optional) modifier keys: `shift`, `ctrl`, `alt`, `super`, or a `+`-joined combination such as `ctrl+shift` | Click at `coordinate`, or at the current cursor position when omitted |
| `right_click`, `middle_click`, `double_click`, `triple_click` | Same as `left_click` | Other mouse buttons and multiple clicks |
| `left_click_drag` | `start_coordinate`, `coordinate`, `text` (optional) | Press at `start_coordinate`, drag to `coordinate`, release |
| `mouse_move` | `coordinate` | Move the cursor without clicking |
| `left_mouse_down`, `left_mouse_up` | `{}` | Press or release the left button at the current cursor position (move first with `mouse_move`) |
| `cursor_position` | `{}` | Report the cursor `[x, y]` as text |
| `scroll` | `scroll_direction` (`up` / `down` / `left` / `right`), `scroll_amount` (wheel clicks), `coordinate` (optional), `text` (optional) | Scroll at `coordinate` or the cursor position |
| `type` | `text` | Type literal text at the current keyboard focus |
| `key` | `text` (key or `+`-joined combination), `repeat` (optional, 1 to 100, default 1) | Press a key or combination `repeat` times |
| `hold_key` | `text`, `duration` (seconds, up to 300) | Hold a key down for the duration |
| `wait` | `duration` (seconds, up to 300) | Pause before the next action |

## Notes

- Status: GA on the Claude API and Google Cloud; beta on Claude Platform on AWS, Amazon Bedrock, and Microsoft Foundry, which currently offer only the earlier tool versions. Supported models for the toolset: Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5.5, Opus 5, Sonnet 5.5, Sonnet 5, Opus 4.8, Haiku 5.5. On the Claude API and Google Cloud, Claude 5.5 and later models accept only the toolset and error on `computer_20251124` / `computer_20250124`.
- Not available in Claude Managed Agents. For the SDK computer toolset class (Python / TypeScript, beta), see browser-use-sdk.md. For tasks that stay inside webpages, see browser-use-tool.md.
- Batch actions: Claude may return several member `tool_use` blocks in one response. Run them in order and stop at the first failure. Return one `tool_result` per block (matched by `tool_use_id`), each echoing `"toolset_name": "computer"` (omitting it or naming another toolset is rejected). Result content may contain only `text` and `image`. For the failed action return `is_error: true` with a description; for every later block return `is_error: true` with exactly `Not executed: an earlier computer action in this turn failed.` A request that leaves any `tool_use` unanswered is rejected with `invalid_request_error`. Only `screenshot` and `zoom` need an image result; `OK` text suffices for the others.
- Dispatch on the pair (`toolset_name`, `name`): a custom tool in the same request can share a member name.
- Coordinates (`coordinate`, `start_coordinate`, `region`, `cursor_position` output) are in the pixel space of the full-display screenshots you return, origin top left; zoom images do not change this. If you scale screenshots down, scale coordinates back up. The toolset rejects a screenshot or zoom image that exceeds the model's image limits instead of downscaling, so resize it yourself.
- All members are enabled by default, including `zoom`. Withhold unimplemented members with `configs`; if Claude calls a withheld or unimplemented member, return `is_error: true`.
- `disable_parallel_tool_use: true` in `tool_choice` limits Claude to at most one member `tool_use` per turn.
- Migrate from `computer_20251124` (optional on models that still accept it): (1) remove the `computer-use-2025-11-24` beta header and `betas`, use the standard client; (2) set `type` to `computer_toolset_20260801` and delete `name`, `display_width_px`, `display_height_px`, `display_number`, `enable_zoom`; (3) zoom is enabled by default whereas `enable_zoom` defaulted to `false`, so add `"configs": {"zoom": {"enabled": false}}` to keep the old behavior; (4) iterate over every `tool_use` block and dispatch on `name` plus `toolset_name` instead of `input.action`; (5) run blocks in order, stop at the first failure, use the halt text; (6) echo `toolset_name` on every `tool_result`; (7) honor `repeat` on `key`; (8) resize screenshots yourself; (9) move any `defer_loading` from the entry into `configs`, with the same value on every enabled member.
- Earlier tool versions (beta header required on every request; use the beta namespace):

| Tool version | Beta header | Use with |
| --- | --- | --- |
| `computer_20251124` | `computer-use-2025-11-24` | Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5, Sonnet 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6, Opus 4.5; on Amazon Bedrock also Opus 5.5, Sonnet 5.5, Haiku 5.5 |
| `computer_20250124` | `computer-use-2025-01-24` | Sonnet 4.5 (deprecated), Haiku 4.5, Opus 4.1 (retired, except on Bedrock and Google Cloud), Sonnet 4 (retired, except on Bedrock and Google Cloud), Opus 4 (retired, except on Google Cloud) |

- Limitations: latency may exceed human-directed speed; coordinate and tool-selection hallucination; scrolling may be unreliable (fall back to Page Down); spreadsheets need `left_mouse_down` / `left_mouse_up` plus modifiers; limited ability for account creation and content generation on social platforms; jailbreak and prompt-injection risk from on-screen content, so use a dedicated minimally-privileged VM or container and get user consent. For summarized thinking set `display: "summarized"` on the thinking configuration, because the models that support the toolset omit thinking text by default.
- Your application implements the actual screenshot, mouse, and keyboard execution.
- Data retention: client-side tool; ZDR eligible (excludes Covered Models per the API and data retention page).
- Pricing: declaring `computer_toolset_20260801` with default members adds about 4,500 input tokens (about 4,590 on Claude Sonnet 5, about 4,520 on the other supported models); disabling `zoom` removes about 410. The 466-499 system prompt tokens and about 735 tokens per tool definition apply to `computer_20251124` / `computer_20250124` only. Plus screenshot and zoom image tokens (vision pricing) and tool-result tokens; bash / text-editor tools alongside have their own costs.

## Related

- [bash-tool](./bash-tool.md)
- [text-editor-tool](./text-editor-tool.md)
- [tool-combinations](./tool-combinations.md)
- [tool-reference](./tool-reference.md)
