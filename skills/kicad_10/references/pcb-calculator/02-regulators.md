# Regulators

Calculates resistor values for linear and low-dropout (LDO) voltage regulators, or computes the output voltage given the resistor values.

## Signature / Usage

1. Select the regulator **Type** (Standard or 3-Terminal).
2. Enter the regulator's **Vref** and, if applicable, **Iadj**.
3. Select the field you want to calculate (R1, R2, or Vout).
4. Enter the two remaining known values and read the result.

## Formulas

**Standard Type**

```
Vout = Vref × (1 + R2 / R1)
```

**3-Terminal Type** (accounts for quiescent current at the adjust pin)

```
Vout = Vref × (1 + R2 / R1) + Iadj × R2
```

## Parameters

| Name | Description |
|------|-------------|
| Type | Regulator topology: Standard or 3-Terminal |
| Vref | Internal reference voltage of the regulator (V) |
| Iadj | Quiescent current flowing from the adjust pin (A); 3-Terminal type only |
| R1 | Upper feedback resistor (Ω) |
| R2 | Lower feedback resistor connected to the adjust pin (Ω) |
| Vout | Desired or calculated output voltage (V) |

## Notes

- For the 3-Terminal type, Iadj is typically below 100 µA and can often be neglected, but including it improves accuracy.
- Any one of R1, R2, or Vout can be the unknown; the other two must be provided.

## Related

- [Introduction](./01-introduction.md)
