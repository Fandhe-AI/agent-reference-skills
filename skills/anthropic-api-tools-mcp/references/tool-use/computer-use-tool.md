<!-- source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool / last verified: 2026-08-07 -->

# Computer use tool

Beta client tool: gives Claude screenshot capture plus mouse/keyboard control for autonomous desktop interaction; your application executes every action.

## Signature / Usage

```json
{
  "type": "computer_20251124",
  "name": "computer",
  "display_width_px": 1280,
  "display_height_px": 800,
  "enable_zoom": true
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| type | string | `computer_20251124` (adds `zoom`) or `computer_20250124` |
| name | string | Must be `"computer"` |
| display_width_px / display_height_px | integer | Required display dimensions |
| display_number | integer (optional) | X11 display number |
| enable_zoom | boolean (optional) | `computer_20251124` only; `true` allows the `zoom` action; default `false` |

## Notes

- Beta feature: header `computer-use-2025-11-24` (or `computer-use-2025-01-24` for Sonnet 4.5, Haiku 4.5, Opus 4.1, Sonnet 4, Opus 4). Supported models: Opus 5, Sonnet 5, Opus 4.8/4.7/4.6, Sonnet 4.6, Opus 4.5 (for `_20251124`).
- Actions — basic (all versions): `screenshot`, `left_click`, `type`, `key`, `mouse_move`. Enhanced (`_20250124`+): `scroll`, `left_click_drag`, `right_click`, `middle_click`, `double_click`, `triple_click`, `left_mouse_down`/`left_mouse_up`, `hold_key`, `wait`. `_20251124` adds `zoom` (region `[x1,y1,x2,y2]`, requires `enable_zoom: true`).
- Modifier keys for click/scroll use the `text` parameter (`shift`, `ctrl`, `alt`, `super` for Cmd/Win) — distinct from `hold_key`, which holds a key for a duration without another action.
- Your application must implement the actual screenshot/mouse/keyboard execution — Claude cannot run the tool itself, only request actions.
- Limitations: latency may exceed human-directed speed; coordinate hallucination possible in computer vision; tool-selection reliability drops on niche/multi-app tasks; scrolling can be unreliable (fall back to Page Down); complex spreadsheet ops need fine-grained mouse-down/up + modifiers; account creation/content generation on social platforms is limited; jailbreak/prompt-injection risk from on-screen content — run in trusted, minimally-privileged VMs/containers and get user consent.
- ZDR eligible (client-side tool; screenshots/actions are stored in your environment, not Anthropic's, though Anthropic processes them in-flight per standard API retention).
- Pricing: computer-use beta adds 466-499 tokens to the system prompt; tool definition adds 735 input tokens (Claude 4.x); plus screenshot image tokens (vision pricing) and tool-result tokens. Bash/text-editor tools used alongside have their own separate costs.

## Related

- [bash-tool](./bash-tool.md)
- [text-editor-tool](./text-editor-tool.md)
- [tool-combinations](./tool-combinations.md)
