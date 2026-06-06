# PCB Footprints

Place switch footprints and controller components to generate an un-routed KiCad PCB.

```yaml
pcbs:
  main:
    outlines:
      edge:
        outline: board
        layer: Edge.Cuts
    footprints:
      switches:
        what: choc
        where: true
        params:
          from: "{{colrow}}"
          to: COL_GND
      diodes:
        what: diode
        where: true
        adjust:
          shift: [0, -5]
        params:
          from: "{{colrow}}"
          to: ROW_GND
      controller:
        what: promicro
        where:
          ref: matrix_inner_top
        adjust:
          shift: [0, 15]
        params:
          orientation: up
      trrs_jack:
        what: trrs
        where:
          ref: matrix_pinky_top
        adjust:
          shift: [-10, 5]
        params:
          reverse: false
          symmetric: false
          A: VCC
          B: GND
          C: DATA
    references: true
    template: default
```

## Notes

- `what` refers to built-in footprint names: `mx`, `choc`, `chocmini`, `diode`, `promicro`, `trrs`, `oled`, `rgb`, `rotary`, `via`, etc.
- `params.from` / `params.to` assign net names; `{{colrow}}` and `{{name}}` expand to per-point attributes
- `adjust.shift` offsets the footprint from the key center (useful for diodes placed between switches)
- `references: true` includes silkscreen reference designators in output
- Generated `.kicad_pcb` is un-routed; use KiCad's router or FreeRouting afterward
