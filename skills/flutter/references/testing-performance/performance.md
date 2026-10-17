---
source: https://docs.flutter.dev/perf
---

# Performance

Entry point for evaluating the performance of your Flutter app from several angles: what performance is, why it matters, and how to improve it.

## Signature / Usage

```plaintext
perf: speed
perf: memory
perf: app size
perf: energy
```

The four GitHub issue labels above are the categories used on this page. To improve performance, you first need metrics: some measurable numbers to verify the problems and improvements. The metrics page lists which metrics are currently used and which tools and APIs are available to get them. The page also points to a performance FAQ, and the Flutter GitHub issue database using the `performance` label.

Performance issues are divided into four categories that correspond to the four labels used in the Flutter GitHub issue database: "perf: speed", "perf: memory", "perf: app size", "perf: energy". The page content is organized by:

- **Speed**: Are your animations janky (not smooth)? Learn how to evaluate and fix rendering issues. See Improving rendering performance.
- **App size**: How to measure your app's size. The smaller the size, the quicker it is to download. See Measuring your app's size.

## Notes

- If your app has a performance issue and you are trying to debug it, check out the DevTools page on "Using the Performance view".
- The official page answers "What is performance? Why is performance important?" in a separate appendix (`/perf/appendix`), which is not reproduced here.
- The Memory ("Using memory wisely") and Energy ("Preserving your battery") sections are commented out in the source (TODO pending reintroduction), so they are not covered.

## Related

- [Performance metrics](./performance-metrics.md)
- [Improving rendering performance](./rendering-performance.md)
- [Measuring your app's size](./app-size.md)
- [Performance best practices](./performance-best-practices.md)
