# Disk use and memory improvements

Guidance for minimizing an app's memory usage (working set, dynamic memory, leaks) and reducing its on-disk footprint.

## Signature / Usage

```text
wpr -start VirtualAllocation -filemode
# ... run the scenario (e.g. app launch) ...
wpr -stop Trace.etl
wpa.exe Trace.etl
```

## Options / Props

| Concept | Description |
|---------|-------------|
| Working set | The set of pages in an app's virtual address space currently resident in memory; a primary measure of memory usage |
| Dynamic memory | Virtual memory allocated via memory allocation routines (`VirtualAlloc`); lifetime tied to the app process; where leaks typically manifest |
| File-backed memory | Memory backed by binaries/data files; usually a small, constant portion of total usage |
| Disk footprint | Size of the app when stored inactively; large footprint causes fragmentation, longer SSD write latency, slower updates |

## Notes

- Use Windows Performance Analyzer's **Memory > Total Commit** graph with the **Process / Commit Type / Commit Stack / Size** columns (sorted descending by Size) to find large allocations; load symbols via **Trace > Load symbols**.
- Establish a steady-state memory benchmark first; continuous growth over a long-running trace indicates a leak.
- Areas to reduce: foreground memory usage, background work (see power/background-activity guidance), and cached resources released after a period of inactivity.
- Disk footprint reduction techniques: pay-for-play downloadable feature/language packs, efficient cache sizing with upper limits, optimized image assets (size/format/compression), and binary-size analysis with SizeBench.

## Related

- [Improve garbage collection performance](./improve-garbage-collection-performance.md)
- [Optimize background activity](./optimize-background-activity.md)
- [Power consumption improvements](./power.md)
