---
name: Geometry Nodes
description: Blender Geometry Nodes procedural modeling system — workflow, key nodes, and Python API.
---

# Geometry Nodes

Geometry Nodes is Blender's node-based procedural modeling system. A Geometry Nodes modifier holds a node tree that takes geometry as input, transforms it through connected nodes, and outputs the result.

## Overview

The workflow is:
1. Add a **Geometry Nodes** modifier to a mesh object
2. A new node tree is created automatically with a **Group Input** and **Group Output** node
3. Connect nodes between them to build the procedural operation
4. Expose parameters via Group Input sockets to control from the modifier panel

## Key Nodes

### Geometry

| Node | Description |
|------|-------------|
| Join Geometry | Combines multiple geometry streams into one |
| Transform Geometry | Translates, rotates, or scales geometry as a whole |
| Set Position | Moves vertices/points using a vector or offset field |
| Bounding Box | Outputs the axis-aligned bounding box of geometry |

### Mesh Primitives

| Node | Description |
|------|-------------|
| Mesh Line | Creates a line of vertices |
| Mesh Circle | Creates a circular ring of vertices |
| Mesh Grid | Creates a flat grid mesh |
| Mesh Cube | Creates a cube mesh |
| UV Sphere | Creates a sphere using UV topology |
| Ico Sphere | Creates an icosphere mesh |
| Cylinder | Creates a cylinder mesh |

### Instances

| Node | Description |
|------|-------------|
| Instance on Points | Places instances of geometry on each point |
| Realize Instances | Converts instances to actual geometry |
| Geometry to Instance | Wraps geometry as a single instance |

### Fields & Attributes

| Node | Description |
|------|-------------|
| Position | Outputs the position of each element |
| Index | Outputs the integer index of each element |
| Set Material | Assigns a material to geometry |
| Capture Attribute | Stores a field value as an attribute |
| Named Attribute | Reads a named attribute from geometry |

### Utilities

| Node | Description |
|------|-------------|
| Group Input | Receives parameters from the modifier panel |
| Group Output | Sends the final geometry out of the node tree |
| Math | Performs math operations on float values |
| Vector Math | Performs vector operations |
| Switch | Selects between two values based on a boolean |

## Python API Mapping

### Creating a Geometry Nodes Modifier and Node Tree

```python
import bpy

obj = bpy.context.active_object

# Add the modifier
mod = obj.modifiers.new(name="GeometryNodes", type='NODES')

# Create a new node tree (or assign an existing one)
node_tree = bpy.data.node_groups.new(name="MyGeoNodes", type='GeometryNodeTree')
mod.node_group = node_tree
```

### Adding Nodes and Linking Them

```python
import bpy

node_tree = bpy.data.node_groups["MyGeoNodes"]
nodes = node_tree.nodes
links = node_tree.links

# Clear default nodes if any
nodes.clear()

# Blender 4.0+: Group Input/Output nodes expose NO sockets until the tree
# interface declares them. Create the interface sockets BEFORE linking —
# otherwise input_node.outputs["Geometry"] raises KeyError on a fresh tree.
node_tree.interface.new_socket(
    name="Geometry", in_out='INPUT', socket_type='NodeSocketGeometry'
)
node_tree.interface.new_socket(
    name="Geometry", in_out='OUTPUT', socket_type='NodeSocketGeometry'
)

# Add Group Input and Output
input_node  = nodes.new("NodeGroupInput")
output_node = nodes.new("NodeGroupOutput")
input_node.location  = (-300, 0)
output_node.location = (300, 0)

# Add a Set Position node
set_pos = nodes.new("GeometryNodeSetPosition")
set_pos.location = (0, 0)

# Link: Group Input → Set Position → Group Output
links.new(input_node.outputs["Geometry"], set_pos.inputs["Geometry"])
links.new(set_pos.outputs["Geometry"], output_node.inputs["Geometry"])
```

### Defining Group Interface Sockets (Blender 4.0+)

The full interface for a tree (run on a fresh tree; the linking example above
created only the minimal Geometry sockets it needed before linking).

```python
import bpy

node_tree = bpy.data.node_groups["MyGeoNodes"]

# Add a Geometry input socket
node_tree.interface.new_socket(
    name="Geometry",
    in_out='INPUT',
    socket_type='NodeSocketGeometry'
)

# Add a Float input for offset amount
node_tree.interface.new_socket(
    name="Offset",
    in_out='INPUT',
    socket_type='NodeSocketFloat'
)

# Add a Geometry output socket
node_tree.interface.new_socket(
    name="Geometry",
    in_out='OUTPUT',
    socket_type='NodeSocketGeometry'
)
```

### Adding a Mesh Primitive Node

```python
import bpy

node_tree = bpy.data.node_groups["MyGeoNodes"]
nodes = node_tree.nodes
links = node_tree.links

# Add a UV Sphere primitive
sphere = nodes.new("GeometryNodeMeshUVSphere")
sphere.inputs["Segments"].default_value = 32
sphere.inputs["Rings"].default_value = 16

# Add Join Geometry
join = nodes.new("GeometryNodeJoinGeometry")

# Connect sphere → join
links.new(sphere.outputs["Mesh"], join.inputs["Geometry"])
```

### Setting Modifier Inputs and Output Attributes (5.2+)

Starting in 5.2, the modifier has real RNA properties instead of custom properties (1561c1ea4a). Release-notes Before/After:

```python
# Before
modifier["identifier"] = 5.0
modifier["identifier_use_attribute"] = True
modifier["identifier_attribute_name"] = "some_input_attribute"
modifier["identifier_attribute_name"] = "some_output_attribute"
# After
modifier.properties.inputs.identifier.value = 5.0
modifier.properties.inputs.identifier.type = "ATTRIBUTE"
modifier.properties.inputs.identifier.attribute_name = "some_input_attribute"
modifier.properties.outputs.identifier.attribute_name = "some_output_attribute"
```

`NodesModifier.is_input_used(identifier)` and `NodesModifier.is_input_visible(identifier)` (5.2) report whether an input is currently used / visible given the modifier settings.

## Notes

- Changed (5.2): the Geometry Nodes modifier property API (`modifier['identifier']` style access no longer applies; see above). Asset files with Geometry Nodes tools must be re-saved to be used properly in 5.2 (1561c1ea4a)
- Changed (5.2): socket identifiers of the Compare and Random Value nodes (3a5cd7862b)
- Added (5.0): tree interface items can be looked up by identifier (6f2988f0af)
- In Blender 4.0+, group input/output sockets are managed via `node_tree.interface.new_socket()` rather than the older `node_tree.inputs.new()` / `node_tree.outputs.new()` API
- Node type identifiers (e.g., `"GeometryNodeSetPosition"`) can be found in the Blender Python API reference or by hovering over nodes in the Info editor when adding them via the UI
- Fields (Position, Index, etc.) are evaluated lazily per-element; they are not scalar values
- The `NODES` modifier type (`obj.modifiers.new(..., type='NODES')`) is the entry point; the actual node graph lives in `modifier.node_group`
- Use the **NodeToPython** add-on to auto-generate Python code from an existing Geometry Nodes tree

## Related

- [Modifiers](./modifiers.md)
- [Mesh Basics](./mesh-basics.md)
