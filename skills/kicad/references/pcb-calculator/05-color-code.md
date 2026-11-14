# Color-Code

Translates resistor color bands to resistance values and tolerances, and performs the reverse lookup (resistance value to color bands).

## Signature / Usage

1. Select the **tolerance band** first: 10%, 5%, or ≤2%.
2. Click the color bands in order to read the resistance value and tolerance.
3. Alternatively, enter a resistance value to determine the corresponding color band sequence.

## Tolerance Bands

| Tolerance | Number of Bands | Notes |
|-----------|-----------------|-------|
| 10% | 4 | Silver tolerance band |
| 5% | 4 | Gold tolerance band |
| ≤2% | 5 | Brown (1%), Red (2%), etc. |

## Examples

| Color Sequence | Value |
|----------------|-------|
| Yellow – Violet – Red – Gold | 4700 Ω, ±5% |
| Brown – Black – Black – Brown – Brown | 1 kΩ, ±1% |

## Notes

- Select the tolerance category before reading the color bands; it determines how many significant-digit bands are shown.
- The 4-band code uses two significant digits; the 5-band code (≤2% tolerance) uses three significant digits.

## Related

- [Introduction](./01-introduction.md)
- [E-Series](./04-e-series.md)
