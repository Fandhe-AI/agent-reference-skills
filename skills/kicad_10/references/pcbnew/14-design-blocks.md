# Design Blocks

Reusable circuit layout modules that encapsulate footprints, routing, zones, and other board elements for use across multiple projects.

## Overview

Design blocks enable **modular PCB design**:
- Capture a validated layout subsystem (e.g., a power supply, RF front-end, memory interface) once
- Reuse it across different board designs without re-layout
- Maintain a library of proven circuit blocks

Unlike multichannel layout (which duplicates within one board), design blocks are intended for cross-project reuse.

## Creating and Managing Design Blocks

**Creating a design block:**
1. Select the footprints, tracks, zones, and other elements to capture
2. Right-click → **Save as Design Block** (or via the Design Blocks panel)
3. Assign a name and optional description
4. The block is saved to the design block library

**Management:**
- Design blocks are stored separately from board files, enabling sharing across projects
- The Design Blocks panel (accessible from the PCB editor) provides library browsing
- Operations: rename, update contents, delete, organize into categories

## Using Design Blocks in a Board

**Placing a design block:**
1. Open the Design Blocks panel
2. Browse or search for the desired block
3. Drag-and-drop or double-click to instantiate it on the board
4. The block's contents (footprints, copper, graphics) are placed at the cursor location

Placed instances can be customized via property dialogs while preserving the underlying block structure.

## Grouped Design Blocks

Multiple design block instances can be organized into groups:
- Enables simultaneous movement of related blocks
- Supports hierarchical layout organization
- Coordinated edits across interconnected modules

Groups containing design blocks behave like standard KiCad groups (see grouping in [05-editing-a-board.md](./05-editing-a-board.md)).

## Notes

- Design blocks store layout geometry, not schematic connectivity; nets must still be correctly assigned via forward annotation
- Updating a design block definition does not automatically update already-placed instances; instances must be manually refreshed
- Design blocks complement multichannel layout: use design blocks for cross-project reuse, multichannel layout for same-board channel duplication

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [13-multichannel-layout.md](./13-multichannel-layout.md)
- [11-footprints-and-footprint-libraries.md](./11-footprints-and-footprint-libraries.md)
