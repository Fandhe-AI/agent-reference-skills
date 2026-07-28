# Responsive interactions and latency measurement

Methodology for optimizing and measuring interaction latency (launch, navigation, menu open, etc.) using interaction-class goals and ETW tracing.

## Signature / Usage

```text
wpr -start GeneralProfile -filemode
# perform the interaction scenario
wpr -stop Trace.etl
wpa.exe Trace.etl
# System Activity > Generic Events; find Process/Task Name/Event; read Duration column
```

## Options / Props

| Interaction class | Range of delay | Examples |
|--------------------|-----------------|----------|
| Fast | 100 - 200 ms | Open app bar, right-click menu |
| Interactive | 300 - 500 ms | Exit an app, display cached search results |
| Pause | 500 ms - 1 sec | Navigate to a different page, resume from suspend |
| Wait | 1 - 3 sec | Launching the app |
| Long wait | 2 - 5 sec | Large app launches (extended splash screen), starting HD video |
| Captive | 5 - 10 sec | System login |
| Long-running | 10 - 30+ sec | Installing features/updates, large downloads |

## Notes

- Add TraceLogging start/stop events around key interactions to measure and analyze them precisely.
- Get the test device idle (CPU under 5%) before capturing a trace to isolate the measured interaction.
- If duration exceeds the interaction-class goal, inspect the key thread (usually the UI thread) top stacks for CPU usage and waits.

## Related

- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
- [Best practices for startup performance](./app-startup-performance.md)
