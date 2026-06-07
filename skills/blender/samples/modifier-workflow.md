---
name: Modifier Workflow
description: Add, configure, and apply Subdivision Surface, Boolean, and Array modifiers from Python.
---

# Modifier Workflow

## Overview

Modifiers in Blender are non-destructive by default. From Python you add them via `obj.modifiers.new()`, set properties directly on the returned modifier object, then optionally apply them with `bpy.ops.object.modifier_apply()` (which requires the object to be active and in Object Mode).

## Complete Example

```python
import bpy

# ── Helpers ───────────────────────────────────────────────────────────────────
def set_active(obj):
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj


def apply_modifier(obj, name):
    set_active(obj)
    bpy.ops.object.modifier_apply(modifier=name)


# ── 1. Subdivision Surface ────────────────────────────────────────────────────
bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
cube = bpy.context.active_object
cube.name = "SubdivCube"

subsurf = cube.modifiers.new(name="Subdivision", type='SUBSURF')
subsurf.levels = 2           # viewport level
subsurf.render_levels = 3    # render level
subsurf.subdivision_type = 'CATMULL_CLARK'

apply_modifier(cube, "Subdivision")


# ── 2. Boolean (Difference) ───────────────────────────────────────────────────
# Create the main object
bpy.ops.mesh.primitive_cube_add(size=2.0, location=(4, 0, 0))
main = bpy.context.active_object
main.name = "BoolMain"

# Create the cutter object (will be hidden after boolean)
bpy.ops.mesh.primitive_uv_sphere_add(radius=1.2, location=(4, 0, 0))
cutter = bpy.context.active_object
cutter.name = "Cutter"
cutter.display_type = 'WIRE'  # show as wireframe while setting up

bool_mod = main.modifiers.new(name="Boolean", type='BOOLEAN')
bool_mod.operation = 'DIFFERENCE'   # 'UNION' | 'DIFFERENCE' | 'INTERSECT'
bool_mod.object = cutter
bool_mod.solver = 'FAST'            # 'FAST' | 'EXACT'

apply_modifier(main, "Boolean")

# Hide cutter after applying
cutter.hide_set(True)


# ── 3. Array (pattern along X) ───────────────────────────────────────────────
bpy.ops.mesh.primitive_cylinder_add(radius=0.2, depth=1.0, location=(0, 4, 0))
pipe = bpy.context.active_object
pipe.name = "Pipe"

arr = pipe.modifiers.new(name="Array", type='ARRAY')
arr.fit_type = 'FIXED_COUNT'
arr.count = 6
arr.use_relative_offset = True
arr.relative_offset_displace = (1.5, 0.0, 0.0)   # 1.5× object width along X

apply_modifier(pipe, "Array")


# ── 4. Stack multiple modifiers and apply in order ────────────────────────────
bpy.ops.mesh.primitive_plane_add(size=2.0, location=(0, 8, 0))
plane = bpy.context.active_object
plane.name = "StackPlane"

# Order matters: subdivision first, then displace
sub2 = plane.modifiers.new("Subdiv2", 'SUBSURF')
sub2.levels = 3

disp = plane.modifiers.new("Displace", 'DISPLACE')
tex = bpy.data.textures.new("CloudTex", type='CLOUDS')
disp.texture = tex
disp.strength = 0.4
disp.mid_level = 0.5

# Apply all modifiers in stack order
for mod in list(plane.modifiers):
    apply_modifier(plane, mod.name)

print("Modifier workflow complete.")
```

## Key Points

- `obj.modifiers.new(name, type)` adds the modifier and returns it; assign all properties before applying.
- Applying a modifier requires the object to be selected and active **in Object Mode**. `bpy.ops.object.modifier_apply()` will raise a `RuntimeError` from Edit Mode.
- Boolean operations in 'EXACT' solver mode are more robust for complex geometry but slower than 'FAST'.
- When applying a stack, iterate over `list(plane.modifiers)` (a snapshot) because applying changes the live collection length.
- Array's `relative_offset_displace` is a multiplier of the object's bounding-box dimensions, not world units.

## Variations

```python
# Mirror modifier
mirror = obj.modifiers.new("Mirror", 'MIRROR')
mirror.use_axis = (True, False, False)   # mirror on X
mirror.use_clip = True                   # merge vertices at mirror plane

# Solidify
solidify = obj.modifiers.new("Solidify", 'SOLIDIFY')
solidify.thickness = 0.05
solidify.offset = -1.0    # grow inward
```

## Related

- `bmesh-editing.md` — Destructive low-level alternative to modifiers
- `object-creation.md` — Primitive creation before applying modifiers
