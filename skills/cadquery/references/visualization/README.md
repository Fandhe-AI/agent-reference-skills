# Visualization

| Name | Description | Path |
|------|-------------|------|
| Control Points | Visualize the control points of spline surfaces and curves using `ctrlPts()`. Pass the result alongside geometry objects to `show()` for overlay display. | [control-points.md](./control-points.md) |
| Jupyter / JupyterLab | CadQuery objects can be displayed inline in Jupyter and JupyterLab notebooks. Support is more limited compared to the pure Python VTK viewer and is implemented using VTK.js. | [jupyter.md](./jupyter.md) |
| Pure Python Visualization | Render CadQuery objects interactively using VTK — no external tools required (CadQuery 2.4+). Import `show` from `cadquery.vis` to display any supported object type. | [pure-python.md](./pure-python.md) |
| Screenshots | Capture a PNG screenshot of the rendered scene by passing screenshot-related parameters to `show()`. The window renders, saves the file, and (optionally) closes without interaction. | [screenshots.md](./screenshots.md) |
| Styling | Apply appearance overrides to CadQuery objects before passing them to `show()` using the `style()` function. Controls color, transparency, wireframe/mesh overlay, line widths, and mesh resolution. | [styling.md](./styling.md) |
