# Jupyter / JupyterLab

CadQuery objects can be displayed inline in Jupyter and JupyterLab notebooks. Support is more limited compared to the pure Python VTK viewer and is implemented using VTK.js.

## Signature / Usage

No special import is required. Evaluating a CadQuery object as the last expression in a cell triggers inline display automatically.

```python
from cadquery import *

Workplane().sphere(1).split(keepTop=True)
```

## Notes

- Supported object types: `Workplane`, `Sketch`, `Assembly`, `Shape`.
- Display is implemented via **VTK.js** — an in-browser VTK renderer.
- Functionality is more limited than the standalone `show()` viewer (no `style()`, `ctrlPts()`, screenshot parameters, etc.).
- The VTK.js backend must be available in the Jupyter environment.

## Related

- [Pure Python](./pure-python.md)
- [Styling](./styling.md)
