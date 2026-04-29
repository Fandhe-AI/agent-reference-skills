# Workplane Class Overview

Defines a coordinate system in space (a plane with a center point and local axes) from which 2D geometry can be sketched and then used to create or modify 3D solids. All CadQuery modelling operations begin from a `Workplane` instance.

## Signature / Usage

```python
cadquery.Workplane(plane: str | Plane = 'XY', obj: Shape | Workplane | None = None) -> None
```

### Constructor Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `plane` | `str \| Plane` | `'XY'` | Named plane (`'XY'`, `'XZ'`, `'YZ'`) or a `Plane` object defining origin and orientation |
| `obj` | `Shape \| Workplane \| None` | `None` | Optional initial solid or `Workplane` to start from |

### Named Plane Strings

| String | Normal axis | Use |
|--------|-------------|-----|
| `'XY'` | Z | Default flat plane at origin |
| `'XZ'` | Y | Front face plane |
| `'YZ'` | X | Side face plane |

## Examples

```python
import cadquery as cq

# Start with the default XY plane
result = cq.Workplane("XY").box(1, 2, 3)

# Start from an existing solid
result = cq.Workplane("XY", obj=some_shape).faces(">Z").circle(0.25).extrude(1)
```

## Notes

- Every Workplane holds a list of current objects (`objects`), a reference to a `Plane`, and a shared `CQContext` (modelling context) that tracks pending wires/edges and named tags.
- Each method call returns a **new** `Workplane` instance; the previous one is accessible via the `parent` attribute.
- The `CQContext` object is shared across the entire chain — all Workplane nodes in a chain share one modelling context.
- `tag()` and `toPending()` are among the few methods that return the **same** Workplane object rather than a new one.

## Related

- [2D Construction](./2d-construction.md)
- [3D Construction](./3d-construction.md)
- [The Stack](./stack.md)
- [Chaining](./chaining.md)
- [The Context Solid](./context-solid.md)
