# Board-Classes

References IPC performance classes and PCB construction types to help identify the appropriate manufacturing specification for a design.

## IPC Performance Classes (IPC-6011)

| Class | Name | Description |
|-------|------|-------------|
| Class 1 | General Electronic Products | Consumer items where cosmetic imperfections are acceptable and function is the primary requirement |
| Class 2 | Dedicated Service Electronic Products | Communications equipment and instruments requiring high performance and extended life; some cosmetic variation permitted |
| Class 3 | High Reliability Electronic Products | Equipment where continued or on-demand performance is critical (e.g., life support, flight control); no service interruption acceptable |

## PCB Types (IPC-6012B)

| Type | Description |
|------|-------------|
| Type 1 | Single-sided board (no plated through holes) |
| Type 2 | Double-sided board (with plated through holes) |
| Type 3 | Multilayer board without blind or buried vias |
| Type 4 | Multilayer board with blind and/or buried vias |
| Type 5 | Multilayer metal core board without blind or buried vias |
| Type 6 | Multilayer metal core board with blind and/or buried vias |

## Notes

- Performance class and PCB type together define the acceptance criteria applied during manufacturing inspection.
- Higher classes impose stricter dimensional, electrical, and cosmetic requirements, typically increasing fabrication cost.
- Metal core boards (Types 5 and 6) are used where enhanced thermal management is required.

## Related

- [Introduction](./01-introduction.md)
- [Electrical Spacing](./09-electrical-spacing.md)
