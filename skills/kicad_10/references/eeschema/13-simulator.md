# Simulator

KiCad integrates an ngspice-based SPICE circuit simulator. Simulations run directly from the schematic without exporting a separate netlist.

## Assigning SPICE Models

Open a symbol's properties (**E**) and click the **Simulation Model** button.

### Model Types

| Type | Description |
|------|-------------|
| SPICE model from file | Load a `.lib` or `.mod` SPICE model file |
| SPICE directive | Inline SPICE model definition |
| Ideal passive (R, L, C) | Uses symbol Value field directly |
| SPICE primitive | Voltage/current source, diode, BJT, MOSFET, etc. |

**Passive components (R, L, C):** The symbol **Value** field is used directly if it contains a valid SPICE value. No separate model file is required.

**Active components:** Assign a model from a manufacturer `.lib` file or define an inline model using the Simulation Model Editor.

### Simulation Model Editor

The editor allows:
- Selecting the model type (NMOS, PMOS, NPN, PNP, diode, etc.)
- Specifying the model file path and model name within the file
- Mapping symbol pins to SPICE node order

## Value Notation

SPICE uses letter suffixes for numeric values (case-insensitive):

| Suffix | Multiplier |
|--------|------------|
| t | 10¹² |
| g | 10⁹ |
| meg | 10⁶ |
| k | 10³ |
| m | 10⁻³ |
| u | 10⁻⁶ |
| n | 10⁻⁹ |
| p | 10⁻¹² |
| f | 10⁻¹⁵ |

Examples: `10k` = 10,000 Ω; `100n` = 100 nF; `2.2u` = 2.2 µF

Note: `m` = milli (10⁻³), NOT mega. Use `meg` for 10⁶.

## SPICE Directives

SPICE directives can be added directly to the schematic as text items.

Use the **Add SPICE Directive** tool or place a text element with the content starting with a `.` (SPICE directive syntax).

Common directives:
```spice
.tran 1n 1m        ; transient: step=1ns, stop=1ms
.ac dec 100 1 1g   ; AC: 100 pts/decade, 1Hz to 1GHz
.dc V1 0 5 0.01    ; DC sweep: V1 from 0V to 5V, step 0.01V
.op                ; operating point
.noise V(out) V1 dec 100 1k 1meg  ; noise analysis
```

## Running Simulations

Open the Simulator via **Inspect** → **Simulator** or **Tools** → **Simulator**.

### Analysis Types

| Analysis | Description |
|----------|-------------|
| Transient | Time-domain waveform simulation |
| AC | Frequency-domain small-signal analysis |
| DC Sweep | DC operating point vs. swept parameter |
| Noise | Noise spectral density analysis |
| Operating Point | Single-point DC bias calculation |

Configure analysis parameters in the **Simulation Settings** dialog (accessible from the Simulator window toolbar).

### Running

Click **Run** (or press F9). The simulation executes via the embedded ngspice engine. Progress and any ngspice output messages appear in the log panel.

## Viewing Simulation Results

### Signal List

The left panel lists all available signals (nets and internal node voltages). Check signals to add them to the waveform display.

### Waveform Viewer

Displays selected signals as plots:
- Multiple signals can be shown on the same or separate axes
- Zoom, pan, and rescale axes interactively
- Right-click a trace for display options

### Cursors

Place up to two cursors on a waveform to measure:
- Absolute values at cursor positions
- Time difference (ΔT) and value difference (ΔY)

### Measurements

The Measurements panel allows defining automatic measurements (frequency, rise time, overshoot, etc.) that are recalculated each simulation run.

## Tuning Components

The **Tuner** tool allows interactive adjustment of component values during or after a simulation:

1. Click the Tuner toolbar button.
2. Click a component on the schematic to add it to the tuner list.
3. Drag the slider to change the component value.
4. The simulation re-runs and waveforms update in real time.

## Saving Simulation Setups

Simulation configurations (analysis type, parameters, selected signals, cursors) can be saved as a **Workbook** (`.wbk` file). Load workbooks to restore previous simulation setups.

## Exporting Simulation Results

- **Export** → **CSV** exports waveform data for external analysis
- Copy waveform images from the viewer for documentation

## Troubleshooting Simulations

| Issue | Likely cause and fix |
|-------|---------------------|
| Simulation fails to converge | Check for floating nodes; add `.ic` initial conditions; adjust tolerances |
| No waveforms | Verify model assignment on all active components; check SPICE directives |
| Incorrect results | Verify pin-to-SPICE-node mapping in the Simulation Model Editor |
| Passive component not simulating | Confirm Value field uses valid SPICE notation (e.g., `10k`, not `10 kΩ`) |

## Helpful Hints

- Add a `.op` directive to verify DC bias before running transient analysis.
- Use `PWL` (piecewise linear) sources for custom stimulus waveforms.
- The ngspice manual is the authoritative reference for advanced SPICE syntax.
- Large schematics with many components may run slowly; use subcircuits (`.subckt`) to simplify.

## Notes

- The simulator uses the embedded ngspice engine; no external installation required.
- SPICE models from manufacturer websites (`.lib`, `.sub` files) can be loaded directly.
- Components marked **Exclude from simulation** in symbol properties are omitted from the netlist sent to ngspice.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
