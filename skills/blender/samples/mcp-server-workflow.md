---
name: MCP Server Workflow
description: Connect an LLM to a running Blender instance via the Blender MCP server — setup, client registration, and representative query examples.
---

# MCP Server Workflow

## Overview

The Blender MCP server exposes a natural-language interface to a live Blender session over a two-component architecture:

```
MCP Client  ⇐ MCP/stdio ⇒  blender-mcp  ⇐ TCP socket ⇒  Blender Add-on
```

The **add-on** runs inside Blender and executes requests; the **MCP server** (`blender-mcp`) is a separate process launched by the MCP client over stdio. Tools such as `execute_blender_code`, `get_objects_summary`, and `get_object_detail_summary` give the LLM full introspection and scripting access to the running scene.

## Setup

### 1. Install the Blender add-on

In Blender's Preferences → Extensions, add the Blender Lab repository and install the MCP add-on:

```
Repository URL: https://lab.blender.org/
```

Enable the add-on. An optional *Auto-start* setting is available in the add-on preferences.

### 2. Install the MCP server

```bash
pip install git+https://projects.blender.org/lab/blender_mcp.git#subdirectory=mcp
```

### 3. Register blender-mcp with your MCP client

Add the following to your MCP client configuration (e.g. `mcp.json` or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "blender": {
      "command": "uv",
      "args": ["run", "blender-mcp"]
    }
  }
}
```

The server communicates with the add-on over a TCP socket (default `localhost:8766`). Override with environment variables if needed:

```bash
BLENDER_MCP_HOST=127.0.0.1 BLENDER_MCP_PORT=8766 uv run blender-mcp
```

## Representative Examples

All three examples use the official demo files referenced in the Blender MCP documentation.

### Example 1: Data-block renaming — fix typos

**Demo file**: [Pebble Scattering](https://www.blender.org/download/demo/geometry-nodes/fields/pebble_scattering.blend)

**User prompt**:

```
With the current open Blender file fix the name of all the data-blocks to remove typos.
Report back which data-blocks got fixed.
```

**Expected behaviour** — the LLM calls `get_blendfile_summary_datablocks` to enumerate data-blocks, identifies candidates, then uses `execute_blender_code` to rename them:

| Old name | Corrected name |
| --- | --- |
| `LGT-Lights` | `LGT-lights` |
| `Compositing Nodetree` | `Compositing Node Tree` |
| `GRP-rocks` *(optional)* | `GRP-pebble` |

Typical `execute_blender_code` payload:

```python
import bpy

renames = {
    "LGT-Lights":          "LGT-lights",
    "Compositing Nodetree": "Compositing Node Tree",
}
fixed = []
for src, dst in renames.items():
    for collection in (bpy.data.objects, bpy.data.collections,
                       bpy.data.node_groups, bpy.data.lights):
        if src in collection:
            collection[src].name = dst
            fixed.append(f"{src!r} → {dst!r}")

print("Fixed:", fixed)
```

**Tools involved**: `get_blendfile_summary_datablocks`, `execute_blender_code`

---

### Example 2: Natural-language data-relation query

**Demo file**: [Pebble Scattering](https://www.blender.org/download/demo/geometry-nodes/fields/pebble_scattering.blend)

**User prompt**:

```
Which objects are using the following material: pebbles
```

**Expected behaviour** — the LLM calls `get_objects_summary` (or `execute_blender_code`) to inspect material slots across all objects and returns the 7 objects that reference the `pebbles` material:

```
GEO-pebble
GEO-pebble.001
GEO-pebble.002
GEO-pebble.003
GEO-pebble.004
GEO-pebble.005
GEO-pebble.006
```

Typical `execute_blender_code` payload the LLM might generate:

```python
import bpy

target = "pebbles"
users = [
    obj.name
    for obj in bpy.data.objects
    if any(slot.material and slot.material.name == target
           for slot in obj.material_slots)
]
print(users)
```

**Tools involved**: `get_objects_summary`, `execute_blender_code`

---

### Example 3: Scene analysis — polygon count outliers

**Demo file**: [Classroom](https://download.blender.org/demo/test/classroom.zip)

**User prompt**:

```
Analyze the scene and list the outliers: objects with highest polygon count but smaller size
from the camera point of view.
```

**Expected behaviour** — the LLM retrieves modifier-applied polygon counts via the dependency graph (`RENDER` context) and correlates them with on-screen projected size. The biggest outliers are `coat 1` and `alphabet`.

Key detail: `coat 1` has a render-only modifier, so it reports ~37 k polygons in VIEWPORT context but ~74 k in RENDER context. All other objects report the same count in both contexts.

Typical `execute_blender_code` payload:

```python
import bpy

scene = bpy.context.scene
depsgraph = bpy.context.evaluated_depsgraph_get()

results = []
for obj in scene.objects:
    if obj.type != 'MESH':
        continue
    obj_eval = obj.evaluated_get(depsgraph)
    mesh_eval = obj_eval.to_mesh()
    poly_count = len(mesh_eval.polygons)
    obj_eval.to_mesh_clear()
    results.append((obj.name, poly_count))

results.sort(key=lambda x: x[1], reverse=True)
for name, count in results[:10]:
    print(f"{name}: {count} polygons")
```

**Tools involved**: `get_objects_summary`, `get_object_detail_summary`, `execute_blender_code`

## Local Verification with chat_client.py

The repository ships a CLI chat client (`chat_client/chat_client.py`) that connects an LLM directly to the MCP server without a full MCP host application. It requires only the `mcp` package.

### With llama.cpp (OpenAI-compatible API)

```bash
# Start llama.cpp server first, then:
python chat_client.py openai --api-url http://localhost:8080
```

### With Claude

```bash
ANTHROPIC_API_KEY=sk-... python chat_client.py claude --model claude-sonnet-4-20250514
```

### Single-prompt (non-interactive) mode

```bash
# Run one query and exit — useful for scripted testing
ANTHROPIC_API_KEY=sk-... python chat_client.py \
  --prompt "List all mesh objects in the scene" \
  --non-interactive \
  claude --model claude-sonnet-4-20250514
```

The client launches `blender-mcp` as a subprocess over stdio, negotiates MCP tool discovery, and enters a tool-calling loop until the LLM produces a plain-text reply. Pass `BLENDER_MCP_HOST` / `BLENDER_MCP_PORT` as environment variables if the add-on uses non-default settings.

## Key Points

- The add-on must be running inside Blender before any MCP tool call is made; the TCP socket is the only communication channel.
- `execute_blender_code` runs arbitrary Python inside Blender's main thread via a deferred callback — background mode (`-b`) requires responses to complete synchronously.
- For polygon counts that reflect render-time modifiers, use `bpy.context.evaluated_depsgraph_get()` with the `RENDER` context rather than accessing `obj.data.polygons` directly.
- `get_blendfile_summary_datablocks` returns counts and workspace info without executing code; prefer it for read-only scene introspection before deciding whether to call `execute_blender_code`.
- The `_for_cli` tool variants (e.g. `execute_blender_code_for_cli`) open a `.blend` file in a background Blender process and are suitable for batch analysis without a running interactive session.

## Related

- [Blender MCP Server](../references/scripting/mcp-server.md) — Tool listing and API reference for Blender MCP
- [Headless Rendering](./headless-render.md) — Background-mode Blender scripting without a GUI
- [Add-on Template](./addon-template.md) — Building the add-on side of a Blender extension
