# Generative Plugins and Shaders

Read and write the source code behind generative plugins and shaders (fills and effects) through the remote Figma MCP server. Available on all plans in Figma Design; shaders are in open beta.

## Signature / Usage

```
create_shader({
  name: "Topographic contours",
  description: "Elevation-ring contour lines with adjustable spacing and ruggedness",
  planKey: "team::9876543210",
  kind: "fill"
})

update_shader({
  id: "<id from create>",
  kind: "fill",
  files: [{ path: "main.ts", content: "<complete file contents>" }],
  commitMessage: "Add contour line shader with spacing and ruggedness controls"
})
```

Rename only: `update_shader({ id, kind: "fill", files: [], metadata: { name: "..." }, commitMessage: "Rename" })`.

## Options / Props

| Resource | List | Read | Create | Update |
|----------|------|------|--------|--------|
| Generative plugin | `list_generative_plugins` | `get_generative_plugin` | `create_generative_plugin` | `update_generative_plugin` |
| Shader (fill or effect) | `list_shaders`, `list_file_shaders` | `get_shader` | `create_shader` | `update_shader` |

| Resource | Can replace | Can't replace |
|----------|-------------|---------------|
| Shader | `main.ts` | `features.json` (animation, mouse interaction) |
| Generative plugin | `code.ts`, `ui.html` | `manifest.json` |

| `owner` value | Meaning |
|---------------|---------|
| Your email address | You own it; read and change source |
| `figma` | Made by Figma |
| Public publisher handle | Plugin published by someone else |

| Resource | Who can read source | Who can change it |
|----------|---------------------|-------------------|
| Your own | You | You |
| Published by Figma | Anyone | No one directly (publishing process) |
| Published by others | Owner only (compiled code is public) | No one directly |
| Someone else's unpublished shaders | Anyone who can open a file using them, via `list_file_shaders` | The owner |

| Error situation | Result |
|-----------------|--------|
| Source doesn't build | Error with compiler output; make the smallest fix and retry once |
| Changing a resource you don't own | Error |
| `planKey` wrong format or not your plan | Error; must match `(team\|organization)::<numeric-id>` |
| `kind` doesn't match existing shader | Error |
| Update before create | Error |
| No `commitMessage` | Error (required) |
| File path other than `main.ts` (shaders) or `code.ts` / `ui.html` (plugins) | Rejected |
| A file uses more than 100 shaders / a shader has more than 10,000 files | `truncated: true` |
| `includeSource` over 100 files or 1,000,000 bytes | Response cut off, states the limit |

## Notes

- Load a skill before creating or updating: `figma-shaders` for shaders, `figma-generative-plugins` for plugins (via `get_figma_skill`). They hold the file structure, writing rules, and PropsKit reference.
- `list_shaders` and `get_shader` cover both fills and effects. They replace `list_shader_effects`, `list_shader_fills`, `get_shader_effect`, `get_shader_fill`, which are deprecated.
- Reading is two steps: list/read tools return files with URIs, then the agent reads each from its URI as an MCP resource. Files for a shader: `main.ts` (source), `.build/main.js` (compiled), `features.json`. If the client can't read MCP resources, set `includeSource: true` on `get_shader` / `get_generative_plugin` (up to 100 files and 1,000,000 bytes total). Optional `version` is a 40-character commit SHA.
- Creating requires a `planKey` copied exactly from `whoami`'s plan list (e.g. `organization::1234567890`); ask which plan if several. `create_*` returns an already-running starter; then replace source. Each file must include complete contents, so read the current source first. Figma builds, versions, and deploys on update; there is no publish step. A response without an error means success even without a version number. For shaders, `kind` can't change between fill and effect.
- If a build fails twice, show the error to the user instead of rewriting repeatedly.
- Shader source is a single `main.ts`; shader controls are defined in `main.ts`. Add controls only for values likely to change per layer, keep ranges limited with good defaults, and never include API keys, tokens, or signed URLs (anyone with access can read source).
- Generative plugins: `code.ts` is the only file that can use the Figma Plugin API and opens the panel with `figma.showUI(__html__, …)`; `ui.html` is the only file that can use browser DOM APIs; they communicate only through messages. The panel uses PropsKit `fig-*` elements (`<fig-content>`, `<fig-field>`, `<fig-footer>`, `<fig-slider>`, `<fig-input-number>`, `<fig-button>`, etc.). PropsKit colors are hex and gradient stops 0 to 100, while the Plugin API uses 0 to 1. PropsKit is only for generative plugins.
- Through the MCP server you also can't create new files, add imports / dependencies / build settings the tools can't deploy, or send only the changed part of a file.
- Export to code: when a selection includes shader fills or effects, `get_design_context` includes a lightweight shader runtime written as React components. Tell the agent to use the runtime and shader source rather than a CSS approximation, that HTML-in-Canvas is required, and to translate the runtime for non-React frameworks.

PropsKit panel example:

```html
<fig-content>
  <fig-field>
    <label>Count</label>
    <fig-input-number id="count" value="3" min="1" max="100"></fig-input-number>
  </fig-field>
</fig-content>
<fig-footer>
  <label id="status">Ready</label>
  <fig-button id="run" type="submit">Create layers</fig-button>
</fig-footer>
```

## Related

- [Tools and Prompts](./tools-and-prompts.md)
- [Write to Canvas](./write-to-canvas.md)
- [Create Skills for the Figma MCP Server](./create-skills.md)
