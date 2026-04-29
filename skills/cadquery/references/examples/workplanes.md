# Workplanes

Examples for placing, offsetting, copying, and rotating workplanes on existing geometry.

## Creating Workplanes on Faces

Select a face on an existing solid and place a new workplane on it to add features without hard-coding absolute dimensions.

### Signature / Usage

```python
result = cq.Workplane("front").box(2, 3, 0.5)
result = result.faces(">Z").workplane().hole(0.5)
```

### Key APIs

- `.faces(selector)` — select faces; `">Z"` picks the face with the largest Z value
- `.workplane()` — create a new workplane centered on the selected face
- `.hole(diameter)` — drill a through-hole at the workplane center

---

## Locating a Workplane on a Vertex

After selecting a face, further select a vertex on that face and place the workplane origin there.

### Signature / Usage

```python
result = cq.Workplane("front").box(3, 2, 0.5)
result = (
    result.faces(">Z").vertices("<XY").workplane(centerOption="CenterOfMass")
)
result = result.circle(1.0).cutThruAll()
```

### Key APIs

- `.vertices(selector)` — select vertices; `"<XY"` picks the vertex closest to the origin in X and Y
- `.workplane(centerOption="CenterOfMass")` — place the workplane with its origin at the selected vertex

---

## Offset Workplanes

Create a workplane at a specified distance from an existing face to build features that float away from the solid.

### Signature / Usage

```python
result = cq.Workplane("front").box(3, 2, 0.5)
result = result.faces("<X").workplane(offset=0.75)
result = result.circle(1.0).extrude(0.5)
```

### Key APIs

- `.workplane(offset=distance)` — offset the workplane by `distance` along the face normal

---

## Copying Workplanes

Copy the workplane from one CQ object onto another to build perpendicular or non-standard features.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .circle(1)
    .extrude(10)
    .copyWorkplane(
        cq.Workplane("right", origin=(-5, 0, 0))
    )
    .circle(1)
    .extrude(10)
)
```

### Key APIs

- `.copyWorkplane(otherCQObject)` — replace the current workplane with the workplane from `otherCQObject`

---

## Rotated Workplanes

Create a workplane that is both offset and rotated relative to an existing face using `.transformed()`.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .box(4.0, 4.0, 0.25)
    .faces(">Z")
    .workplane()
    .transformed(offset=cq.Vector(0, -1.5, 1.0), rotate=cq.Vector(60, 0, 0))
    .rect(1.5, 1.5, forConstruction=True)
    .vertices()
    .hole(0.25)
)
```

### Key APIs

- `.transformed(offset, rotate)` — shift and rotate the current workplane; `offset` is a `Vector`, `rotate` is Euler angles in degrees as a `Vector`
- `cq.Vector(x, y, z)` — construct a 3D vector

## Notes

- `centerOption` for `.workplane()` can be `"CenterOfMass"`, `"CenterOfBoundBox"`, or `"ProjectedOrigin"`.
- `.faces("<X")` selects the face with the smallest X value (left face of a box).
- Chaining `.faces(...).workplane()` does **not** move the origin of the parent solid — it only sets the active plane.

## Related

- [construction-geometry.md](./construction-geometry.md)
- [advanced-techniques.md](./advanced-techniques.md)
