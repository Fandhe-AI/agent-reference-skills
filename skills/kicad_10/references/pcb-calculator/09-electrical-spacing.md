# Electrical Spacing

Provides a reference table of minimum recommended clearances between PCB conductors for a given voltage range (DC or AC peak).

## Signature / Usage

1. Browse the table to find the row matching your voltage (DC or AC peak).
2. Read the minimum recommended conductor clearance for that voltage.
3. For voltages above 500 V, enter the value in the input box and press **Update Values** to compute the clearance.

## Notes

- Clearance values are minimum recommendations; actual design clearances should also account for PCB material, coating, altitude, and applicable safety standards (e.g., IPC-2221, IEC 60950, UL 60950).
- The table covers DC and AC peak voltages; use the AC peak value (not RMS) for AC circuits.
- For voltages exceeding 500 V, the interactive field extrapolates clearance from the underlying formula.
- These are layout guidance values; creepage distances (along surfaces) are separate and typically larger than clearance (through air).

## Related

- [Introduction](./01-introduction.md)
- [Track Width](./08-track-width.md)
- [Board-Classes](./10-board-classes.md)
