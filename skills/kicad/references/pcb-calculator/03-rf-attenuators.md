# RF-Attenuators

Calculates resistor values for common RF attenuator topologies given a desired attenuation and impedance.

## Signature / Usage

1. Select the attenuator **Type**.
2. Enter the desired **Attenuation** in dB.
3. Enter the **Input Impedance** and **Output Impedance** in Ohms.
4. Read the computed resistor values.

## Attenuator Types

| Type | Description |
|------|-------------|
| PI | Shunt-series-shunt resistor network (π topology) |
| Tee | Series-shunt-series resistor network (T topology) |
| Bridged Tee | Four-resistor bridged T network |
| Resistive Splitter | Two-way resistive power divider |

## Parameters

| Name | Unit | Description |
|------|------|-------------|
| Type | — | Attenuator topology (PI, Tee, Bridged Tee, Resistive Splitter) |
| Attenuation | dB | Desired signal attenuation |
| Input Impedance (Zin) | Ω | Source impedance |
| Output Impedance (Zout) | Ω | Load impedance |

## Notes

- For PI and Tee attenuators the tool supports both matched (Zin = Zout) and mismatched impedances.
- The tool outputs the individual resistor values required to build the selected topology.

## Related

- [Introduction](./01-introduction.md)
