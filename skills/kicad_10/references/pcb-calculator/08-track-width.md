# Track Width

Calculates the minimum PCB trace width required to carry a given current without exceeding a specified temperature rise, using IPC-2221 (formerly IPC-D-275) formulas.

## Signature / Usage

1. Enter the **current** the trace must carry (A).
2. Enter the allowable **temperature rise** above ambient (°C).
3. Enter the copper **thickness** (oz/ft² or µm).
4. Read the minimum width for **external** and **internal** layers.

## Formula (IPC-2221)

```
I = k × ΔT^0.44 × A^0.725
```

Where:
- `I` = current (A)
- `ΔT` = temperature rise above ambient (°C)
- `A` = cross-sectional area of the trace (mil²) = width × copper thickness
- `k` = 0.048 for **external** layers (better heat dissipation)
- `k` = 0.024 for **internal** layers (surrounded by substrate)

Rearranged to solve for minimum width:

```
W = A / thickness
A = (I / (k × ΔT^0.44))^(1 / 0.725)
```

## Parameters

### Inputs

| Name | Description |
|------|-------------|
| Current | Current the trace must carry (A) |
| Temperature rise | Maximum allowable temperature increase above ambient (°C) |
| Copper thickness | Copper weight/thickness of the layer (oz/ft² or µm) |

### Outputs

| Name | Description |
|------|-------------|
| Min width (external) | Minimum trace width for a surface (outer) layer (mm or mil) |
| Min width (internal) | Minimum trace width for an inner layer (mm or mil) |

## Notes

- External layers can carry approximately twice the current of internal layers for the same width due to better convective heat transfer.
- IPC-2221 is an empirical standard; results are conservative estimates suitable for design guidelines.
- The standard applies to steady-state DC or low-frequency AC currents; it does not model pulsed or transient currents.

## Related

- [Introduction](./01-introduction.md)
- [Via Size](./07-via-size.md)
- [Electrical Spacing](./09-electrical-spacing.md)
