# Multichannel Layout

Design and duplicate identical circuit channels across a PCB, such as for audio amplifiers, multi-channel processors, or any repeating circuit block.

## Overview

Multichannel layout enables:
- Designing one channel's layout once
- Automatically duplicating placement and routing to all identical channel instances
- Maintaining consistent topology across all channels

## Schematic Preparation

The schematic must be structured to support channel identification:

1. Use KiCad's **hierarchical sheets** to define repeated channel circuits as sub-sheets
2. Instantiate the sub-sheet once per channel
3. Assign clear hierarchical references so each channel's components are uniquely identified
4. Ensure all channel instances are electrically identical (same topology)

## Board Procedure

After forward annotation from the schematic:

1. Layout and route the **first channel** completely (placement, routing, zones)
2. Select the first channel's footprints as a reference
3. Use **Tools → Multi-Channel Layout** to apply duplication to the remaining channels
4. KiCad matches topology and places/routes the other channels to match the reference

## Topology Matching

KiCad compares the netlist topology of each channel instance to the reference channel. Matching is based on:
- Connection graph structure
- Relative pad-to-pad relationships

Identical topology is required for successful duplication. Mismatches are reported for correction.

## Routing Duplication Details

- Track paths from the reference channel are replicated with the same relative geometry
- Via placement is duplicated
- Track widths and clearances follow the same rules
- Push-and-shove is used as needed to fit duplicated routes without DRC violations

## Other Item Duplication

In addition to routing, the following can be duplicated across channels:
- Filled zones
- Silkscreen graphics
- Rule areas (keepouts)
- Text annotations

## Step-by-Step Multichannel Workflow

1. In the schematic: create hierarchical sheets for the repeated circuit
2. Run **Update PCB from Schematic** (`F8`)
3. Layout and fully route channel 1
4. In the PCB editor: select channel 1 footprints
5. Run **Tools → Multi-Channel Layout**
6. Configure duplication options (which items to copy)
7. Apply — KiCad places and routes remaining channels
8. Run DRC to verify all channels pass

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| Topology mismatch warning | Verify schematic hierarchical sheets are identical; check for extra/missing connections |
| Routing fails to duplicate | Ensure sufficient board space for all channels; check clearance constraints |
| Wrong footprint matched | Verify reference designator prefixes are consistent across channels |
| DRC violations after duplication | Review clearances between channel instances; adjust placement spacing |

## Notes

- The reference channel layout must be DRC-clean before duplication
- After duplication, each channel's footprints are independent and can be fine-tuned manually
- Multichannel layout requires hierarchical schematic structure; flat schematics do not support automatic channel detection

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [14-design-blocks.md](./14-design-blocks.md)
