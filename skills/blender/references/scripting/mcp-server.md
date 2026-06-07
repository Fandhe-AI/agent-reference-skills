---
name: Blender MCP Server
description: Official MCP server exposing Blender's Python API to LLM assistants via a Blender add-on and TCP socket
---

# Blender MCP Server

A lightweight MCP (Model Context Protocol) server that provides a natural language interface to Blender's Python API. Allows LLM assistants to inspect scenes, execute code, render, and navigate the Blender interface.

## Architecture

```
MCP Client  ⇐ MCP/stdio ⇒  blender-mcp  ⇐ TCP socket ⇒  Blender Add-on
```

Two components communicate over a TCP socket:

- **Blender Add-on** (`addon/blender_mcp_addon/`) — runs inside Blender, executes tool requests. Requires Blender 5.1.0+.
- **MCP Server** (`blender-mcp` entry point) — launched by the MCP client, relays requests to the add-on via TCP.

## Installation

```bash
# Install the MCP server package
pip install git+https://projects.blender.org/lab/blender_mcp.git#subdirectory=mcp
```

Add the Blender Lab Extensions repository and install the MCP add-on:

1. In Blender, go to **Preferences → Get Extensions → Repositories**.
2. Add repository: `https://lab.blender.org/`
3. Find the **MCP** add-on, install and enable it.
4. Enable **Online Access** in System Preferences (required for the TCP socket).

## Add-on Preferences

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `host` | `str` | `"localhost"` | TCP socket host the add-on listens on |
| `port` | `int` | *(server default)* | TCP socket port (range 1024–65535) |
| `use_autostart` | `bool` | `True` | Start the bridge server automatically when Blender starts (ignored in background mode) |
| `autostart_delay` | `float` | `1.0` s | Seconds to wait before auto-starting, to avoid slowing Blender's startup |
| `timer_interval_active` | `float` | `0.25` s | Queue polling interval in interactive mode |
| `timer_interval_idle` | `float` | `1.0` s | Queue polling interval while idle (no pending work) |
| `timer_interval_idle_delay` | `float` | `5.0` s | Inactivity duration before switching to the idle polling interval |
| `use_log` | `bool` | `False` | Print every tool request and response status to the terminal |

## Tools

Tools are auto-discovered from `mcp/blmcp/tools/`. Modules ending in `_toolcode` contain code that runs inside Blender and are not directly exposed.

### Code Execution

| Tool | `destructive` | Description |
|------|:---:|-------------|
| `execute_blender_code(code)` | Yes | Execute Python code in the connected Blender instance. Full `bpy` access. Assign a JSON-serialisable dict to `result` to return data. |
| `execute_blender_code_for_cli(blend_file, code)` | Yes | Execute Python code in a background Blender process opened from `blend_file`. |

### Blend-File Summary (Interactive)

| Tool | Description |
|------|-------------|
| `get_blendfile_summary_datablocks()` | Data-block counts, active workspace, and render engine. |
| `get_blendfile_summary_missing_files()` | External file references missing from disk (images, libraries, fonts, sounds, movie clips, caches, sequences). |
| `get_blendfile_summary_of_linked_libraries()` | Tree of directly and indirectly linked library files. |
| `get_blendfile_summary_path_info()` | Blend file path, save status, age, and backups. |
| `get_blendfile_summary_usage_guess()` | Guesses the primary use-cases of the blend file (scored 0–100). |

### Blend-File Summary (CLI / Background)

Each interactive summary tool has a `_for_cli` counterpart that opens an arbitrary `blend_file` in background Blender. Parameters: `blend_file: str`.

| Tool |
|------|
| `get_blendfile_summary_datablocks_for_cli(blend_file)` |
| `get_blendfile_summary_missing_files_for_cli(blend_file)` |
| `get_blendfile_summary_of_linked_libraries_for_cli(blend_file)` |
| `get_blendfile_summary_path_info_for_cli(blend_file)` |
| `get_blendfile_summary_usage_guess_for_cli(blend_file)` |

### Scene Inspection

| Tool | Description |
|------|-------------|
| `get_objects_summary()` | Scene collection hierarchy and all objects (name, type, parent, data name, selection, visibility). |
| `get_object_detail_summary(name)` | Structured summary of one object: type, transforms, parent, children, modifiers, constraints, materials, visibility, collections. |

### Screenshots & Window State

| Tool | Description |
|------|-------------|
| `get_screenshot_of_area_as_image(area_ui_type, size_limit_in_bytes=0)` | Screenshot of a single area matched by `ui_type`. Returns PNG. |
| `get_screenshot_of_window_as_image(size_limit_in_bytes=0)` | Screenshot of the entire Blender window. Returns PNG. |
| `get_screenshot_of_window_as_json()` | JSON description of window layout, areas, active object, and selection. |

### Navigation

| Tool | Description |
|------|-------------|
| `jump_to_tab_by_name(name)` | Switch the active workspace tab to `name`. |
| `jump_to_tab_by_space_type(space_type, allow_edits=False)` | Switch to a workspace whose main area matches `space_type`. Creates one if `allow_edits=True` and none exists. |
| `jump_to_view3d_object_by_name(name, allow_edits=False)` | Focus the 3D viewport on object `name`. Un-hides if `allow_edits=True`. |
| `jump_to_view3d_object_data_by_name(name, allow_edits=False)` | Focus the 3D viewport on the object whose data block matches `name`. |

### Rendering

| Tool | Description |
|------|-------------|
| `render_thumbnail_to_path(output_path)` | Render a small, low-quality thumbnail to `output_path` (temporarily overrides render settings). |
| `render_viewport_to_path(output_path)` | Render the current scene to `output_path` using current render settings. |

### Documentation

| Tool | Description |
|------|-------------|
| `get_python_api_docs(identifier)` | Return bundled Blender Python API docs for `identifier` (e.g. `bpy.app`, `bpy.types.Scene`). Supports `*` and `X.*` discovery patterns. Files >32 KB return a dot-point summary of definitions instead of the full content. |
| `search_api_docs(query, max_results=20, context=0, index=None)` | Full-text search over bundled Python API reference (RST). |
| `search_manual_docs(query, max_results=20, context=0, index=None)` | Full-text search over bundled Blender user manual (RST). |

## Notes

- **Security warning**: the server executes LLM-generated Python code directly in Blender without sandboxing. Use in a virtual machine or an environment without sensitive data.
- **Deferred responses**: only the interactive add-on server supports `check_is_finished` deferred completion. Background mode (`--background`) requires all requests to complete synchronously and rejects deferred results.
- **Background mode CLI**: use `blender --background file.blend --command blender_mcp` to start the bridge server headlessly. The `blmcp.server_start` operator is rejected in background mode.
- **Bundled documentation resources**: `data/api/` (Blender Python API RST) and `data/manual/` (Blender user manual RST) are shipped with the package and exposed via `get_python_api_docs`, `search_api_docs`, and `search_manual_docs`.
- **LLM instructions**: `data/prompts.yml` provides `initial_instructions` sent to the LLM at connection time (scene structure, coordinate spaces, bpy usage conventions, etc.).
- **Online access**: Blender's **Online Access** permission must be enabled in System Preferences; the add-on uses a localhost TCP socket which counts as network access.

## Related

- [Headless CLI](./headless-cli.md)
- [Add-on Development](./addon-development.md)
- [Text Editor](./text-editor.md)
