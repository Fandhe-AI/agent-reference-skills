# Introduction

CadQuery is a Python library for creating parametric 3D CAD models programmatically. It is built on OCP (Python bindings for the open-source OpenCascade modeling kernel), providing access to advanced CAD capabilities without a GUI.

## Overview

CadQuery aims to make model creation "as close as possible to how you'd describe the object to a human." A simple parametric bearing holder can be built in roughly 10 lines of code.

**Key features:**

- Minimal code for complex models (fluent/chained API)
- NURBS, splines, surface operations, and STL repair
- Exports to STEP, AMF, 3MF, STL, DXF
- No proprietary binary format — models are plain Python source files
- Optional GUI via CQ-editor or Jupyter extension; runs headless by default

## Signature / Usage

```python
import cadquery as cq

result = cq.Workplane("XY").box(80, 60, 10)
```

## Comparison with OpenSCAD

| Feature | CadQuery | OpenSCAD |
|---------|----------|----------|
| Language | Python (full IDE support) | Custom DSL |
| Kernel | OpenCascade (NURBS, STEP) | CGAL (CSG only) |
| File formats | STEP, DXF, STL (non-lossy) | STL only |
| Code verbosity | Less code for equivalent designs | More verbose |
| Generation speed | Faster | Slower |

## Notes

- CadQuery is intentionally GUI-less so it can be embedded in scientific and engineering workflows.
- Supported interfaces: CQ-editor (standalone Qt-based GUI) and jupyter-cadquery (Jupyter/JupyterLab extension via `display(<object>)`).
- Pure Python interactive visualization (CadQuery 2.4+) is available via `from cadquery.vis import show`.

## Related

- [Installation](./installation.md)
- [QuickStart](./quickstart.md)
- [Design Principles](./design-principles.md)
- [Concepts](./concepts.md)
