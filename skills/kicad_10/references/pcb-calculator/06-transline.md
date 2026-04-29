# TransLine

Models frequency-dependent electrical characteristics of transmission line structures used in RF and microwave PCB design.

## Signature / Usage

1. Select the transmission line **type** from the list.
2. Enter the physical dimensions and material properties for the chosen geometry.
3. Enter the operating **frequency**.
4. Choose whether to synthesize dimensions from electrical goals or analyze existing geometry.

## Supported Transmission Line Types

| Type | Description |
|------|-------------|
| Microstrip line | Trace over a ground plane, most common PCB transmission line |
| Coplanar waveguide (CPW) | Trace with ground planes on each side, no bottom ground |
| Coplanar waveguide with ground | CPW with an additional bottom ground plane |
| Rectangular waveguide | Hollow metallic rectangular tube |
| Coaxial line | Inner conductor surrounded by a concentric outer conductor |
| Coupled microstrip line | Two parallel microstrip lines; models differential pairs |
| Stripline | Trace embedded between two ground planes |
| Twisted pair | Two insulated wires twisted together |

## Notes

- Models are frequency-dependent and will diverge from simpler lumped-element models at sufficiently high frequencies.
- The tool is heavily based on [Transcalc](http://transcalc.sourceforge.net/), an open-source transmission line calculator.
- Academic references used in the implementation include:
  - Atwater, "Simplified Design Equations for Microstrip Line Parameters," *Microwave Journal*, Nov 1989 (microstrip)
  - Ramo, Whinnery, van Duzer, *Fields and Waves in Communication Electronics*, 2008 (rectangular waveguide)
  - Kirschning & Jansen, *IEEE Trans. Microwave Theory Tech.*, 1984 (coupled microstrip)
  - March, *Microwaves*, Dec 1981 (stripline)

## Related

- [Introduction](./01-introduction.md)
