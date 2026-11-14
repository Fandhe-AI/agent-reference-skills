# Custom Symbol and Footprint

Create a project-local symbol and matching footprint, then link them together.

```
Symbol Editor workflow:

1. Create project library
   Symbol Editor → File → New Library
   → Add new library to project library table
   → Save as getting-started.kicad_sym (inside project folder)

2. New symbol
   File → New Symbol…  (Ctrl+N)
   Name: SW_MySwitch   Reference prefix: SW

3. Add pins  (must be on 50 mil grid)
   Pin tool (right toolbar) → Pin Properties dialog, then place
   Pin 1: name=A, type=Passive, position=(-100 mil, 0)
   Pin 2: name=B, type=Passive, position=(100 mil, 0)
   Press Insert to repeat the last item (auto-increment pin numbers)

4. Draw body (graphic lines/circles on Symbol layer)

5. Set properties
   File → Symbol Properties (or the Symbol Properties toolbar button / double-click empty canvas) → Keywords, Datasheet field

---

Footprint Editor workflow:

1. Create footprint library
   Footprint Editor → File → New Library
   → Save as getting-started.pretty (inside project folder)

2. New footprint
   File → New Footprint → name: SW_MySwitch_TH

3. Add pads
   Add a pad tool
   Pad size = hole_diameter + 2 × annular_ring
   Example: 1.62 mm hole → pad diameter = 1.62 + 2×0.15 = 1.92 mm
   Place pad 1 at (0, 0), pad 2 at (2.54, 0)

4. Add outline layers
   F.Fab:       exact component boundary
   F.Silkscreen: slightly enlarged outline
   F.Courtyard: keep-out boundary (largest envelope)

---

Linking:
   Symbol Editor → Symbol Properties → Footprint field
   → set to getting-started:SW_MySwitch_TH
```

## Notes

- Adapted from the Getting Started tutorial (pin at -200 mil): the manual strongly recommends mils for symbol pins in the Symbol Editor; mixing metric and imperial units makes pins unconnectable.
- Pins must always be placed on a 50 mil grid; off-grid pins cause connection failures in the schematic.
- Use `${KIPRJMOD}` as the library path variable to keep project libraries portable.
- Setting the `Footprint` field in the symbol eliminates manual assignment during schematic entry.
- STEP, VRML, or IDF 3D models can be attached via Footprint Properties → 3D Models tab (use Embed File in the file browser to embed one); recommended tool is FreeCAD with StepUp Workbench.
