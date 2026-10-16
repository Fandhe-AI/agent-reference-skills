# Tools and Prompts

Complete reference for the tools and example prompts exposed by the Figma MCP Server: 18 read tools, 14 write tools, plus Weave tools (separate page) and one MCP prompt.

## Options / Props

### Read tools

Tools marked Remote only are unavailable on the desktop server.

| Tool | What it does | Group | Remote only |
| --- | --- | --- | --- |
| `download_assets` | Downloads exports and original source images | Design to code | Yes |
| `get_code_connect_map` | Gets Code Connect mappings for selected instances | Design systems and Code Connect | No |
| `get_code_connect_suggestions` | Suggests Code Connect mappings (Figma-prompted) | Design systems and Code Connect | No |
| `get_context_for_code_connect` | Gets component metadata for Code Connect templates (Figma-prompted) | Design systems and Code Connect | Yes |
| `get_design_context` | Gets design context and code for a layer or selection | Design to code | No |
| `get_figjam` | Converts FigJam diagrams to XML | Design to code | No |
| `get_generative_plugin` | Reads a generative plugin's source | Generative plugins and shaders | Yes |
| `get_libraries` | Lists subscribed and available libraries | Design systems and Code Connect | Yes |
| `get_metadata` | Gets a lightweight XML outline of a selection | Design to code | No |
| `get_motion_context` | Gets keyframe animation data and code snippets | Design to code | No |
| `get_screenshot` | Takes a screenshot of a selection | Design to code | No |
| `get_shader` | Reads a shader's source | Generative plugins and shaders | No |
| `get_variable_defs` | Lists variables and styles used in a selection | Design to code | No |
| `list_file_shaders` | Lists shaders used in a specific file | Generative plugins and shaders | Yes |
| `list_generative_plugins` | Lists generative plugins in your library | Generative plugins and shaders | Yes |
| `list_shaders` | Lists shader effects and fills in your library | Generative plugins and shaders | No |
| `search_design_system` | Searches libraries for components, variables, and styles | Design systems and Code Connect | Yes |
| `whoami` | Gets your identity, plans, and seats | Account | Yes |

### Write tools

| Tool | What it does | Group | Remote only |
| --- | --- | --- | --- |
| `add_code_connect_map` | Maps a Figma component to a code component | Design systems and Code Connect | No |
| `create_generative_plugin` | Creates a generative plugin starter | Generative plugins and shaders | Yes |
| `create_new_file` | Creates a blank Figma Design, FigJam, or Figma Slides file | Code to design | Yes |
| `create_shader` | Creates a shader effect or fill starter | Generative plugins and shaders | Yes |
| `generate_diagram` | Generates a FigJam diagram from a description or Mermaid syntax | Code to design | Yes |
| `generate_figma_design` | Turns live web UI into design layers | Code to design | Yes |
| `generate_image` | Generates an image from a text prompt | Code to design | Yes |
| `html_to_figma` | Converts an HTML document into design layers | Code to design | Yes |
| `send_code_to_figma` | Imports a local project into Figma as a Make file or code layer | Figma Make and code layers | Yes |
| `send_code_connect_mappings` | Confirms suggested Code Connect mappings (Figma-prompted) | Design systems and Code Connect | No |
| `update_generative_plugin` | Updates a generative plugin's source | Generative plugins and shaders | Yes |
| `update_shader` | Updates a shader's source | Generative plugins and shaders | Yes |
| `upload_assets` | Uploads images and SVGs into a Figma file | Code to design | Yes |
| `use_figma` | Creates, edits, and inspects content in Figma files | Code to design | Yes |

Figma-prompted tools are used by Figma or by the `figma-code-connect` skill as part of a larger workflow; you don't need to call them directly. The server also provides one MCP prompt, `create_design_system_rules`.

### Supported file types and key behavior per tool

| Tool | Supported file types | Notes |
| --- | --- | --- |
| `get_design_context` | Figma Design, Figma Make | Default output is React + Tailwind; ask for another framework in the prompt. Shader fills/effects add a lightweight Figma shader runtime (needs HTML-in-Canvas) |
| `get_metadata` | Figma Design | Without a node ID, returns the list of top-level pages (an invalid node ID also returns the page list) |
| `get_screenshot` | Figma Design, FigJam, Figma Slides | PNG only; 1 node per call; URL or inline base64 with `enableBase64Response` |
| `download_assets` | Figma Design, FigJam, Figma Slides | Up to 20 nodes per call. Returns export renders (PNG / JPG / SVG / PDF; node export settings, else `defaultFormat` / `defaultScale` 0.01x to 4x; 1x capped at about 4,096 px on the longest edge) and raw source images (JPEG / PNG / GIF / WebP, up to 20 per call; `rawImagesTruncated: true` when more exist) |
| `get_variable_defs` | Figma Design | Variables and styles (colors, spacing, typography) used in the selection |
| `get_motion_context` | Figma Design | Animated nodes, keyframe tracks with easing, CSS `@keyframes` and Motion snippets. Use after `get_design_context` with the same node ID; `recursive: true` returns every animated layer in the selection |
| `get_figjam` | FigJam | XML outline plus node screenshots |
| `use_figma` | Figma Design, FigJam, Figma Slides, Figma Specs | Figma Specs (open beta, plans with Specs turned on) requires the `figma-spec` skill. Cannot add new images: use `upload_assets` (or `generate_image` first) |
| `generate_figma_design` | Figma Design | Select MCP clients only; does not count toward standard rate limits. Targets: new file, existing file, clipboard |
| `create_new_file` | None | Creates in your drafts; asks which team/organization if you belong to more than one |
| `upload_assets` | Figma Design, FigJam, Figma Slides | PNG, JPG, GIF, WebP, SVG; up to 10 MB each, up to 60 files per call. Image with layer link becomes that layer's fill, otherwise new frames. SVG is added as editable vector layers |
| `generate_diagram` | None | Flowcharts, Gantt, state, sequence, architecture, ERD; from description or Mermaid |
| `html_to_figma` | Figma Design | Self-contained HTML (CSS and images inline; external links not loaded), up to 50 MB; chosen elements become frames, up to 20 per call. Plain layers: does not use components, libraries, or variables (use `use_figma` for that). Does not run an app (use `generate_figma_design`) or capture external sites (use the Figma Chrome extension). Without a target, layers go to a new page |
| `generate_image` | None | Uses Figma AI credits; returns a PNG or JPEG link that expires after 7 days; requested width/height set only the aspect ratio. Add to a file with `upload_assets` |
| `get_libraries` | Figma Design | Libraries already added and libraries you can add (name, key, description, source) |
| `search_design_system` | Figma Design | Components, variables, styles; several searches in one call |
| `get_code_connect_map` | Figma Design | See below |
| `add_code_connect_map` | Figma Design | Maps a Figma component to a code component |
| `get_code_connect_suggestions` / `get_context_for_code_connect` / `send_code_connect_mappings` | Figma Design | Figma-prompted |
| `send_code_to_figma` | Figma Make, Figma Design | Needs edit access. Imports a project (.zip / .tar.gz / .tgz) as a Make file's code or a new code layer (no design layers). First import does not use Figma AI credits; prompting and later changes do |
| `whoami` | None | Email, all plans, seat type per plan; the source of `planKey` |

### get_code_connect_map response

For each selected instance (each listed separately; nested mapped components may also appear):

| Field | Meaning |
| --- | --- |
| `componentName` | Component name in the codebase |
| `source` | File path or URL of the component |
| `snippet`, `snippetImports`, `snippetNestedFunctions` | Code snippet data, when available |
| `version` | Where the mapping came from (Code Connect UI or CLI) |
| `label` | Framework label such as `React`, when available |

With the remote server, `clientFrameworks` and `clientLanguages` choose which mappings are returned; the desktop server uses the mapping selected in Dev Mode. On Professional plans only one framework is active, so only that framework's connections are returned; Organization and Enterprise can have several.

### Generative plugins and shaders

| Resource | List | Read | Create | Update |
| --- | --- | --- | --- | --- |
| Generative plugin | `list_generative_plugins` | `get_generative_plugin` | `create_generative_plugin` | `update_generative_plugin` |
| Shader (effect or fill) | `list_shaders`, `list_file_shaders` | `get_shader` | `create_shader` | `update_shader` |

- Creating/updating requires a skill: `figma-generative-plugins` for plugins, `figma-shaders` for shaders.
- Access: any shader's code can be read, but only your own plugins; responses include `owner` (your email, `figma`, or a publisher handle).
- Create returns a working starter (plugin starter draws a square); follow up with the update tool.
- Updates replace whole files (complete contents; omitted files stay; new files can't be added). Shaders have `main.ts`; plugins have `code.ts` (the only file that can call `figma.*`) and `ui.html` (panel with DOM access, PropsKit `fig-*` elements). `manifest.json` can't be replaced.
- `create_*` requires `planKey` in the format `(team|organization)::<numeric-id>`, copied exactly from `whoami`. `create_shader` also takes `kind` (`"effect"` or `"fill"`; `update_shader` requires the same kind).
- `update_*` requires `commitMessage`; `files` is a list of `{ path, content }`; `metadata` is `{ name, description }`. A response without an error means the update worked even if no version is returned; on build failure, make the smallest fix and retry once.
- `get_*` take `id`, optional 40-character commit SHA `version`, and `includeSource` (default `false`; limited to 100 files and 1,000,000 bytes total).
- `list_file_shaders` takes `fileKey` (view access is enough) and returns up to 100 shaders with `id`, `name`, `description`, `type`, `version`, `published`, `truncated`, `files`.

### Example Prompts

**Code generation from design:**

```
"Generate my Figma selection in Vue"
"Implement the selected frame using Chakra UI components"
"Generate iOS SwiftUI code from the selected Figma frame"
"Export these icons from my Figma file as SVGs"
```

**File operations:**

```
"Create a new Figma file called 'Homepage Redesign'"
"Add a new frame to my Figma file"
```

**Diagram creation (FigJam):**

```
"Create a flowchart for the user authentication flow using the Figma MCP generate_diagram tool"
"Generate a Gantt chart for the project timeline using the Figma MCP generate_diagram tool"
```

**Design system & tokens:**

```
"Search for a button component in my design system"
"Get the variable names and values used in this frame"
"Create a color variable collection from design tokens"
```

### MCP prompt

| Prompt | Purpose |
| --- | --- |
| `create_design_system_rules` | Creates a rules file giving the agent context to generate code that fits your codebase, design system, and tech stack. Save the result to your project's `rules/` or `instructions/` folder. Not all clients support MCP prompts |

## Notes

- Tools marked **Remote only** are unavailable when using the desktop server (`http://127.0.0.1:3845/mcp`)
- `list_shaders` and `get_shader` are not Remote only
- `list_shader_effects`, `list_shader_fills`, `get_shader_effect`, and `get_shader_fill` are deprecated; replaced by `list_shaders` and `get_shader`
- The 9 Weave tools are documented on a separate page (see [Weave Tools](./weave-tools.md))
- `send_prompt` (mentioned in rate-limits-access) and `get_figma_skill` (mentioned in generative-plugins-and-shaders) were not in the official tool index as of 2026-10-17, so they are not listed in the tool tables
- `get_design_context` prompting with your current selection only works with the desktop server; with the remote server, include a link to a frame or layer
- `use_figma` is the general write tool; prefer explicit prompt phrasing over relying on automatic tool selection (see [Trigger Specific Tools](./trigger-specific-tools.md)). Skills work best: `figma-use` (Design), `figma-use-figjam` (FigJam), `figma-use-slides` (Slides)
- `get_screenshot` vs `download_assets`: screenshot to see a design (1 node, PNG only, always re-renders); `download_assets` to save, deliver, or transfer assets (up to 20 nodes, URLs only, exact original files)

## Related

- [Remote Server Installation](./remote-server-installation.md)
- [Trigger Specific Tools](./trigger-specific-tools.md)
- [Code Connect Integration](./code-connect-integration.md)
