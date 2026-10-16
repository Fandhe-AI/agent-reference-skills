# Figma Weave Tools

Tools for running Figma Weave from an agent: run a published Weave tool, or run a Weave model directly. In Weave, a "tool" is a published Weave workflow, not an MCP tool.

## Signature / Usage

```
# Published tool flow
weave_list_tools -> weave_get_tool_inputs -> weave_run_tool -> weave_get_tool_run_output

# Direct model flow
weave_find_model -> weave_run_model -> weave_get_model_run_output
```

## Options / Props

All Weave tools need no Figma file.

| Tool | Parameters | Description |
|------|------------|-------------|
| `weave_list_tools` | `search` (optional) | Lists runnable Weave tools in the active workspace (own, workspace-shared, shared by email; private excluded). Returns most recently updated tools and total count |
| `weave_get_tool_inputs` | `recipeId`, `version` (optional, default latest) | Returns tool `version`, `outputs` summary, and `inputs` (`nodeId`, `name`, `type`, `required`, `description`, `options`, `range`, `isIterator`, `default`) |
| `weave_upload_asset` | `recipeId` | Uploads an attached file for use as input; returns single-use `submitUrl`, then permanent hosted URL. Files with a public HTTPS URL need no upload. Images (PNG, JPG, WebP, HEIC), video (MP4, MOV, WebM), audio (MP3, WAV, OGG, others), 3D (GLB, OBJ, FBX, PLY) |
| `weave_run_tool` | `recipeId`, `version`, `inputs` (list of `{ nodeId, value }`), `numberOfRuns` (1 to 10), `acknowledgedCost` | Runs a tool. Returns `runIds`, or `inputs_required` / `cost_confirmation_required` (with credits) |
| `weave_get_tool_run_output` | `recipeId`, `runIds` (optional) | Status (`RUNNING`, `COMPLETED`, `FAILED`, `CANCELED`), progress, errors, output |
| `weave_cancel_tool_run` | `recipeId`, `runIds` (optional; omit to cancel all) | Cancels in-progress runs. Cannot be undone |
| `weave_find_model` | `query` | Finds a Weave model by name; returns model, approximate cost, accepted inputs and settings, or a short list if ambiguous |
| `weave_run_model` | `id`, `input`, `acknowledgedCost` (optional) | Runs a model directly. Returns a prediction ID or the cost to approve |
| `weave_get_model_run_output` | `predictionIds` | Status and output of `weave_run_model` runs, with download links |

## Notes

- A paid standalone Figma Weave account is required. Runs use Weave credits, not Figma AI credits; the agent shows the cost and asks for confirmation before a paid run (every run and rerun for `weave_run_model`).
- A Weave link `app.weavy.ai/tool/<id>` or `app.weavy.ai/flow/<id>` gives the tool's `recipeId` as `<id>`, so `weave_list_tools` can be skipped.
- For published tool runs use `weave_get_tool_run_output`; for model runs use `weave_get_model_run_output`.
- Media inputs for `weave_run_model` come from `weave_upload_asset`, an earlier run's output, or a public HTTPS link.

## Related

- [Tools and Prompts](./tools-and-prompts.md)
- [Rate Limits & Access](./rate-limits-access.md)
