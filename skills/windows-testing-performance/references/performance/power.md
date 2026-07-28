# Power consumption improvements

Principles and trace-based methodology for reducing background CPU wakes and vsync waits to improve battery life.

## Signature / Usage

```text
wpr -start power -filemode
# leave device idle for 5 minutes while app is minimized
wpr -stop idletrace.etl
wpa.exe idletrace.etl
# Computation > CPU Usage (Precise) graph: check Cswitch count per process, look for "New Thread Stack" wakes
```

## Options / Props

| Principle | Description |
|-----------|--------------|
| No background resource use | While in the background (not visible/audible), avoid using system resources |
| No timer wakes | Don't wake the CPU through timers while backgrounded |
| No vsync waits | Don't wake the CPU by waiting for vsync events (e.g. `IDXGIOutput::WaitForVBlank`) while backgrounded |

## Notes

- Measure with the device idle (CPU utilization under 5% in Task Manager) before capturing a trace, to minimize measurement interference.
- Test both fully occluded (window covered by other windows) and minimized states, since unnecessary work can be triggered differently in each.
- `wpr -start gpu -filemode` + WPA's **System Activity > Generic events** (filtered to `Microsoft-Windows-Dxgkrnl`) reveals vsync-wait calls.
- See also `PowerManager` / `EnergySaverStatus` usage in background-activity guidance for adapting app behavior at runtime rather than just measuring it.

## Related

- [Optimize background activity](./optimize-background-activity.md)
- [Disk use and memory improvements](./disk-memory.md)
