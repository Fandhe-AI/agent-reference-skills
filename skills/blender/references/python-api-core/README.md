# Python API Core

| Name | Description | Path |
|------|-------------|------|
| bpy.app | Application-level constants (version/build info), event handlers, timers, and translation support. | [bpy-app.md](./bpy-app.md) |
| bpy.context | Read-only access to the current window-manager and editor context (bpy.types.Context): active object, selection, scene, area. | [bpy-context.md](./bpy-context.md) |
| bpy.data | Access to Blender's internal data-block database (BlendData): all ID data-blocks in the .blend file such as meshes, objects, materials, and scenes. | [bpy-data.md](./bpy-data.md) |
| bpy.info | Quickstart, API overview, best practices, and common gotchas for Blender Python scripting. | [bpy-info.md](./bpy-info.md) |
| bpy.msgbus | Message bus for receiving notifications when RNA properties of data-blocks change. | [bpy-msgbus.md](./bpy-msgbus.md) |
| bpy.ops | Operator execution interface — call Blender's built-in and registered operators from Python. | [bpy-ops.md](./bpy-ops.md) |
| bpy.path | Path utility functions for dealing with paths in Blender, similar in scope to os.path. | [bpy-path.md](./bpy-path.md) |
| bpy.props | Property type definitions for extending Blender data via RNA — used in PropertyGroup and Operator classes. | [bpy-props.md](./bpy-props.md) |
| bpy.types | All RNA-registered Blender types — data-blocks, UI base classes (Panel/Operator/Menu), nodes, and base structs. | [bpy-types.md](./bpy-types.md) |
| bpy.utils | Utility functions for class registration, resource paths, icon preview management, and name helpers. | [bpy-utils.md](./bpy-utils.md) |
