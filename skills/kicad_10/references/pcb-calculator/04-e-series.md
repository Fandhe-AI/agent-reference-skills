# E-Series

Identifies combinations of standard E-series resistors that together meet a required resistance value, with support for excluding unavailable component values.

## Signature / Usage

1. Enter the **target resistance** value.
2. Optionally, mark specific resistor values as **excluded** (e.g., values not in your inventory).
3. The tool returns standard E-series combinations (single value, series pair, or parallel pair) that satisfy the target.

## Notes

- E-series values follow IEC 60063 preferred number series: E6, E12, E24, E48, E96, E192.
- Higher E-series numbers provide finer resistance steps and tighter tolerances.
- The calculator is useful when a precise non-standard resistance is needed and must be approximated from available stock.
- Results may include single-resistor matches or two-resistor series/parallel combinations.

## Related

- [Introduction](./01-introduction.md)
- [Color-Code](./05-color-code.md)
