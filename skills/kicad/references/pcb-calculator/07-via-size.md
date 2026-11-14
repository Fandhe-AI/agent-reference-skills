# Via Size

Calculates the electrical and thermal properties of a plated through-hole (PTH) pad or via.

## Signature / Usage

1. Enter the via geometry: **hole diameter**, **pad diameter**, and **via length** (board thickness).
2. Enter the copper **plating thickness** and copper **resistivity**.
3. Enter the **current** through the via.
4. Read the calculated electrical and thermal output values.

## Parameters

### Inputs

| Name | Description |
|------|-------------|
| Hole diameter | Inner drill diameter of the via (mm or mil) |
| Pad diameter | Outer copper annular ring diameter (mm or mil) |
| Via length | Length of the via, typically equal to board thickness (mm or mil) |
| Plating thickness | Thickness of copper deposited inside the barrel (mm or mil) |
| Current | Current flowing through the via (A) |

### Outputs

| Name | Description |
|------|-------------|
| Resistance | DC resistance of the via barrel (Ω) |
| Inductance | Parasitic inductance of the via (nH) |
| Capacitance | Parasitic capacitance between via pad and ground (pF) |
| Temperature rise | Estimated temperature rise above ambient for the given current (°C) |

## Notes

- The tool models a plated through-hole via; blind and buried vias use the same formulas with the appropriate via length.
- Parasitic inductance and capacitance become significant at high frequencies (GHz range).
- Resistance is derived from the copper cylinder geometry: `R = ρ × L / A`, where A is the cross-sectional area of the plated barrel.

## Related

- [Introduction](./01-introduction.md)
- [Track Width](./08-track-width.md)
