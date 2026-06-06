# CLI Automation

Use `kicad-cli` to run ERC, DRC, and generate fabrication outputs non-interactively.

```bash
# Run Electrical Rules Check on a schematic
kicad-cli sch erc \
  --output erc-report.json \
  --format json \
  --severity-error \
  --exit-code-violations \
  my-board.kicad_sch

# Export schematic PDF (all sheets)
kicad-cli sch export pdf \
  --output my-board-schematic.pdf \
  my-board.kicad_sch

# Export Bill of Materials (CSV, grouped by value)
kicad-cli sch export bom \
  --output bom.csv \
  --fields "Reference,Value,Footprint,Quantity" \
  --group-by Value \
  --exclude-dnp \
  my-board.kicad_sch

# Run Design Rule Check on a board
kicad-cli pcb drc \
  --output drc-report.json \
  --format json \
  --schematic-parity \
  --refill-zones \
  --exit-code-violations \
  my-board.kicad_pcb

# Export Gerber files (all layers) to fabrication/ directory
kicad-cli pcb export gerbers \
  --output fabrication/ \
  my-board.kicad_pcb

# Export Excellon drill files
kicad-cli pcb export drill \
  --output fabrication/ \
  --format excellon \
  my-board.kicad_pcb

# Render a top-view board image
kicad-cli pcb render \
  --output board-top.png \
  --side top \
  --quality high \
  --width 2400 \
  my-board.kicad_pcb
```

## Notes

- `--exit-code-violations` returns exit code 5 when violations exist, enabling CI pipeline gates (`if [ $? -ne 0 ]; then ...`).
- `--refill-zones` on `pcb drc` fills zones before checking — equivalent to pressing B in the GUI.
- On macOS the binary path is `/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli`; add it to `PATH` or use the full path.
- Use `kicad-cli <subcommand> --help` for the full option list of any command.
