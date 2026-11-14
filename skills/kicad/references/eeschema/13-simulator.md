# Simulator

KiCad integrates an ngspice-based SPICE circuit simulator. Simulations run directly from the schematic without exporting a separate netlist.

## Assigning SPICE Models

Open a symbol's properties (**E**) and click **Simulation Model…** to open the Simulation Model Editor. Each symbol has one model (assign it to the first unit of a multi-unit symbol). The **Exclude from simulation** checkbox in Symbol Properties omits the symbol.

### Model Types

| Type | Description |
|------|-------------|
| Built-in SPICE model | No file needed; pick **Device** (stored in `Sim.Device`) and **Device type** (`Sim.Type`): resistors incl. potentiometers, capacitors, inductors, transmission lines, switches, voltage/current sources, diodes, BJT/MOSFET/MESFET/JFET, XSPICE code models, raw SPICE elements. Changed parameters go to `Sim.Params` |
| SPICE model from file | Device model (`.model`) or subcircuit (`.subckt`, `params:` editable) from a plain-text unencrypted file (any extension; `.lib`, `.sub` typical). Path absolute, project-relative, or relative to `SPICE_LIB_DIR`; fields `Sim.Library`, `Sim.Name`; **Embed File** option |
| IBIS model | Load a `.ibs` file; choose Component (`Sim.Name`), Pin (`Sim.Ibis.Pin`), Model (`Sim.Ibis.Model`), Type (`Sim.Type`) |

**Inferred models:** a symbol with exactly two pins and a reference starting with R, L or C gets an ideal model from its **Value** field; no settings needed. Inferred models are ideal.

**Value field storage:** the "Save parameter ... in Value field" checkbox stores parameters in Value instead of `Sim.Params` (ideal R, L, C and DC sources only); `Sim.Params` takes priority if present.

### Simulation Model Editor

The editor has tabs for Parameters, Code (generated SPICE text), and **Pin Assignments** (map symbol pins to model pins; **Not Connected** may be assigned to several pins).

## Value Notation

KiCad notation (model parameters, analysis setup, directives) accepts plain (`10100`), scientific (`1.01e4`), prefix (`10.1k`) and RKM (`4k7`, `10R`) forms. Prefixes are case sensitive:

| Prefix | Multiplier |
|--------|------------|
| a | 10⁻¹⁸ |
| f | 10⁻¹⁵ |
| p | 10⁻¹² |
| n | 10⁻⁹ |
| u | 10⁻⁶ |
| m | 10⁻³ |
| k | 10³ |
| M | 10⁶ |
| G | 10⁹ |
| T | 10¹² |
| P | 10¹⁵ |
| E | 10¹⁸ (see Notes) |

Examples: `10k` = 10,000 Ω; `100n` = 100 nF; `2.2u` = 2.2 µF

Raw SPICE elements and directives are passed to ngspice unchanged, and ngspice uses its own case-insensitive notation: `1Meg` = 10⁶, `1M` = 10⁻³. Do not mix the two.

## SPICE Directives

SPICE directives can be placed in text fields on a schematic sheet. Supported: lines starting with a dot (e.g. `.tran 10n 1m`) and inductor coupling coefficients (e.g. `K1 L1 L2 0.89`). Components cannot be added this way. A simulation command in schematic text is used as the default command when the simulator opens; the Simulation Command dialog overrides it.

Common directives:
```spice
.tran 1n 1m        ; transient: step=1ns, stop=1ms
.ac dec 100 1 1g   ; AC: 100 pts/decade, 1Hz to 1GHz
.dc V1 0 5 0.01    ; DC sweep: V1 from 0V to 5V, step 0.01V
.op                ; operating point
.noise V(out) V1 dec 100 1k 1meg  ; noise analysis
```

## Running Simulations

Open the Simulator via **Inspect** → **Simulator** or the top-toolbar button. Create an analysis with **Simulation** → **New Analysis Tab…** (`Ctrl+N`); edit it with **Simulation** → **Edit Analysis Tab…**. Each analysis has its own tab (plot, signals, output log).

### Analysis Types

| Analysis | Options (ngspice name) |
|----------|------------------------|
| OP — DC operating point | none; results in the log (and schematic annotations) |
| DC — DC sweep | Sweep type (voltage source, current source, resistor, temperature), Source (`srcnam`), Starting value (`vstart`), Final value (`vstop`), Increment step (`vincr`); optional Source 2 and Swap sources |
| AC — small-signal | Points per decade (`nd`), Start frequency (`fstart`), Stop frequency (`fstop`) |
| TRAN — transient | Time step (`tstep`), Final time (`tstop`), Initial time (`tstart`, default 0), Max time step (`tmax`; default smaller of step or duration/50), Use initial conditions (`uic`) |
| PZ — pole-zero | Transfer function (`vol` / `cur`), Input nodes (`node1`, `node2`), Output nodes (`node3`, `node4`), Find (`pz` / `pol` / `zer`) |
| NOISE | Measured node (`output`), Reference node (`ref`, default ground), Noise source (`src`, needs an `ac` parameter), Points per decade (`pts`), Start / Stop frequency, Save contributions from all noise generators |
| SP — S-parameter | Points per decade (`nd`), Start / Stop frequency, Compute noise current correlation matrix (`donoise`); needs at least two RF-port voltage sources |
| FFT | Input signals (Hanning window), Linearize inputs before performing FFT |
| Custom | Raw SPICE analysis commands, one analysis per line; **Load Directives from Schematic** copies schematic directives |

Additional settings for all types: Add full path for .include library directives, Save all voltages (`.save all`), Save all currents (`.probe alli`), Save all power dissipations, Save all digital event data (`.esave all`), and a Compatibility mode dropdown (User configuration refers to `.spiceinit`).

### Running

Click **Simulation** → **Run Simulation** (`R`) or the Run button; only the active analysis tab runs. A stop button halts a running simulation. ngspice messages appear in the output log window.

## Viewing Simulation Results

### Signal List

The Signals pane (right side) lists node voltages `V(<net>)`, device currents `I(<device>)` / `I(<device:terminal>)`, power dissipations `P(<device>)`, and user-defined signals (**Simulation** → **User-defined Signals…**, e.g. `V(/v1)-V(/v2)`; quote net names containing `-`). Check the plot checkbox to plot a signal. **Simulation** → **Probe Schematic…** (`P` in the simulator chapter; `Shift+P` in the actions reference) plots a clicked wire (voltage) or pin (current). OP and PZ analyses print to the log instead of plotting; ngspice `.plot` is not supported.

### Waveform Viewer

- Mouse wheel zooms (Shift/Ctrl/Alt modifiers set in the Schematic Editor Preferences Simulator panel); right-click opens the view menu; a selection rectangle zooms
- Plot Setup tab of the analysis setup: Fixed scale, Show grid, Show legend, Dotted current/phase, Margins; **View** → **Dark Mode Plots**

### Cursors

Check **Cursor 1** or **Cursor 2** for a signal; cursors track the signal and the cursor grid shows both values and their difference. Extra cursors: right-click a signal → **Create new cursor**.

### Measurements

Right-click a signal for: Measure Min, Max, RMS, Peak-to-peak, Time of Min, Time of Max, Integral, and Perform Fourier Analysis (transient only; results in the log). Measurements cover the whole data set. Custom ngspice measurement expressions can be typed into an empty row of the Measurement pane.

### Operating Point Annotations

**View** → **Show OP Voltages** and **Show OP Currents** annotate the schematic. Text variables `${OP}` (label field) and `${OP:<pin>}` / `${OP:power}` (symbol field) accept `.<precision><unit>` specifiers, e.g. `${OP.2mV}`.

## Tuning Components

**Simulation** → **Add Tuned Value…** (`T` in the simulator chapter; `Shift+T` in the actions reference) then click a resistor, inductor, capacitor, DC voltage source, or DC current source (plot-producing analyses only):

1. Click the tuning toolbar button (or press `T`; `Shift+T` per the actions reference).
2. Click a component on the schematic to add a tuning control.
3. Choose Single Run (slider / middle field) or Multi Run (top and bottom range, Steps, at least 2).
4. The simulation re-runs; **Save** writes the tuned value to the symbol (disabled in Multi Run). Values can be restricted to E24 / E48 / E96 / E192 series.

## Saving Simulation Setups

Simulation setups (analyses, plotted signals, user-defined signals, measurements, cursors, display settings) are saved as a workbook with **File** → **Save Workbook** and loaded with **File** → **Open Workbook**; the last workbook opens automatically. Workbooks do not store results; rerun with `R`.

## Exporting Simulation Results

Only plotted analyses export (not OP or PZ):

- **File** → **Export Current Plot as PNG…**, **Export Current Plot as CSV…** (semicolon-delimited, only plot-checked signals), **Export Current Plot to Clipboard**, **Export Current Plot to Schematic**

## Troubleshooting Simulations

| Issue | Likely cause and fix |
|-------|---------------------|
| Simulation fails to converge | Cautiously try `.options gmin=1e-10`, `abstol=1e-10`, `reltol=0.003`, `cshunt=1e-15` (defaults gmin 1e-12, abstol 1e-12, reltol 0.001); inspect the netlist via **Simulation** → **Show SPICE netlist…**; "timestep too small" often means wrong pin assignments or a missing supply |
| No waveforms | Verify model assignment on all active components; check SPICE directives |
| Incorrect results | Verify pin-to-SPICE-node mapping in the Simulation Model Editor |
| Passive component not simulating | Confirm the Value field uses valid KiCad value notation (e.g. `10k`, `4k7`; see Value Notation) |

## Helpful Hints

- Add a `.op` directive to verify DC bias before running transient analysis.
- Use `PWL` (piecewise linear) sources for custom stimulus waveforms.
- The ngspice manual is the authoritative reference for advanced SPICE syntax.
- Large schematics with many components may run slowly; use subcircuits (`.subckt`) to simplify.

## Notes

- The simulator uses the embedded ngspice engine; the ngspice version is shown in **Help** → **About KiCad** → Version tab.
- SPICE models from manufacturer websites (`.lib`, `.sub` files) can be loaded directly; encrypted models are not supported.
- Components marked **Exclude from simulation** in symbol properties are drawn with a grey outline and omitted from simulation.
- Not found in the 10.0 manual: an "Add SPICE Directive" tool (directives are ordinary text items), the `F9` run shortcut (Run Simulation is `R`), **Tools** → **Simulator** (only **Inspect** → **Simulator**), the `.wbk` workbook extension, and a "Simulation Settings" dialog (the manual says Simulation Command / Analysis Setup).
- Corrected from the official docs: the prefix table in the manual prints 10¹⁵ for `E` (exa); exa is 10¹⁸, so the table above uses 10¹⁸.
- Removed as not supported by the manual's measurement list: "frequency, rise time, overshoot" example measurements (the manual lists Min, Max, RMS, Peak-to-peak, Time of Min / Max, Integral, Fourier; custom ngspice measurement expressions are allowed).
- Hotkeys differ within the 10.0 manual: the simulator chapter gives `P` / `T` for Probe Schematic / Add Tuned Value, while the actions reference lists `Shift+P` / `Shift+T`; both are shown.
- The directive examples under Common directives are illustrative and not from the 10.0 manual (the manual shows `.tran 10n 1m`, `.ac dec 10 1 1Meg`, `K1 L1 L2 0.89`); they use ngspice case-insensitive notation (`1g`, `1meg`). `.noise` requires the source (V1) to have an `ac` value.
- The manual is inconsistent on notation: the Value Notation section lists SPICE directives as accepting KiCad notation, while the following paragraph says directives are passed to ngspice unchanged; KiCad notation in directives may not be accepted depending on the compatibility mode.
- Not found in the 10.0 manual: the "No waveforms", "Incorrect results", and "Passive component not simulating" troubleshooting rows and the Helpful Hints list (the manual's troubleshooting covers "timestep too small" and convergence options).
- The Simulation_SPICE symbol library (including IBIS_DEVICE / IBIS_DRIVER) provides sources and generic devices.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
