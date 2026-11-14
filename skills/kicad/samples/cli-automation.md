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
  --fields "Reference,Value,Footprint,QUANTITY" \
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

- `--exit-code-violations` returns exit code 5 when violations exist; other non-zero codes indicate a run failure. CI gate: `rc=0; kicad-cli pcb drc --exit-code-violations my-board.kicad_pcb || rc=$?; if [ "${rc}" -eq 5 ]; then echo 'DRC violations'; exit 1; elif [ "${rc}" -ne 0 ]; then echo "kicad-cli failed (exit ${rc})"; exit "${rc}"; fi`. In a multi-command script, add `set -e` or check each command this way so a failure stops the run.
- `--refill-zones` on `pcb drc` fills zones before checking — equivalent to pressing B in the GUI. The board is not saved unless `--save-board` is also given.
- In `sch export bom --fields`, the quantity column is the virtual field `QUANTITY` (default `Reference,Value,Footprint,QUANTITY,DNP`).
- On macOS the binary path is `/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli`; add it to `PATH` or use the full path.
- Use `kicad-cli <subcommand> --help` for the full option list of any command.
