---
source: https://www.electronjs.org/docs/latest/api/content-tracing
---

# contentTracing

Collect tracing data from Chromium to find performance bottlenecks and slow operations. Process: Main.

## Signature / Usage

```js
const { app, contentTracing } = require('electron')

app.whenReady().then(async () => {
  await contentTracing.startRecording({
    included_categories: ['*']
  })
  console.log('Tracing started')
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const path = await contentTracing.stopRecording()
  console.log('Tracing data recorded to ' + path)
})
```

## Methods

| Method | Returns | Description |
| --- | --- | --- |
| `contentTracing.getCategories()` | `Promise<string[]>` | Category groups, resolved once all child processes acknowledge. Groups can change as new code paths are reached. |
| `contentTracing.startRecording(options)` | `Promise<void>` | `options`: `TraceConfig` or `TraceCategoriesAndOptions`. Starts recording on all processes; if already running resolves immediately (one trace at a time). |
| `contentTracing.stopRecording([resultFilePath])` | `Promise<string>` | Stops recording on all processes; resolves with the path of the file containing the trace. If `resultFilePath` is empty or omitted, a temporary file is used. |
| `contentTracing.getTraceBufferUsage()` | `Promise<Object>` | Resolves with `{ value: number, percentage: number }`: maximum usage across processes of the trace buffer. |
| `contentTracing.enableHeapProfiling([options])` _Experimental_ | `Promise<void>` | Enables heap profiling for MemoryInfra traces (equivalent to `--memlog` in Chrome). `options`: `EnableHeapProfilingOptions`. Only effective if the `disabled-by-default-memory-infra` category is included; call before `startRecording()`. |

## TraceConfig

| Name | Type | Description |
| --- | --- | --- |
| `recording_mode` | string (optional) | `record-until-full`, `record-continuously`, `record-as-much-as-possible` or `trace-to-console`. Default `record-until-full`. |
| `trace_buffer_size_in_kb` | number (optional) | Maximum buffer size in kilobytes. Defaults to 100MB. |
| `trace_buffer_size_in_events` | number (optional) | Maximum buffer size in events. |
| `enable_argument_filter` | boolean (optional) | If true, filter event data per a vetted list of events with no PII. |
| `included_categories` | string[] (optional) | Categories to include; `*` glob allowed at the end of a name. |
| `excluded_categories` | string[] (optional) | Categories to exclude; `*` glob allowed at the end of a name. |
| `included_process_ids` | number[] (optional) | Process IDs to include; all processes if unspecified. |
| `histogram_names` | string[] (optional) | Histogram names to report with the trace. |
| `memory_dump_config` | Record\<string, any\> (optional) | Additional configuration when `disabled-by-default-memory-infra` is enabled. |

Example TraceConfig roughly matching what Chrome DevTools records:

```json5
{
  recording_mode: 'record-until-full',
  included_categories: [
    'devtools.timeline',
    'disabled-by-default-devtools.timeline',
    'disabled-by-default-devtools.timeline.frame',
    'disabled-by-default-devtools.timeline.stack',
    'v8.execute',
    'blink.console',
    'blink.user_timing',
    'latencyInfo',
    'disabled-by-default-v8.cpu_profiler',
    'disabled-by-default-v8.cpu_profiler.hires'
  ],
  excluded_categories: ['*']
}
```

## TraceCategoriesAndOptions

| Name | Type | Description |
| --- | --- | --- |
| `categoryFilter` | string | Filter for category groups to trace; optional `-` prefix excludes. Mixing included and excluded patterns in one list is not supported. Examples: `test_MyTest*`, `test_MyTest*,test_OtherStuff`, `-excluded_category1,-excluded_category2`. |
| `traceOptions` | string | Comma-delimited: `record-until-full`, `record-continuously`, `trace-to-console`, `enable-sampling`, `enable-systrace`, e.g. `'record-until-full,enable-sampling'`. The first 3 are mutually exclusive recording modes (last one wins; default `record-until-full`). |

## EnableHeapProfilingOptions

| Name | Type | Description |
| --- | --- | --- |
| `mode` | string (optional) | Which processes are profiled (equivalent to `--memlog`). Default `all`. Values: `all`, `browser`, `gpu`, `minimal` (browser and GPU), `renderer-sampling` (at most 1 renderer), `all-renderers`, `utility-sampling`, `all-utilities`, `utility-and-browser`. |
| `samplingRate` | number (optional) | Sampling interval in bytes (equivalent to `--memlog-sampling-rate`). Default `100000` (100KB). Integer between `1000` and `10000000`. |
| `stackMode` | string (optional) | Metadata per allocation (equivalent to `--memlog-stack-mode`). Default `native`. Values: `native`, `native-with-thread-names`. |

## Notes

- No web interface is included; view recorded traces with the trace viewer at `chrome://tracing` in Chrome.
- Do not use this module until the `ready` event of `app` is emitted.
- Electron adds a non-default tracing category `"electron"` for Electron-specific events.
- Heap dumps need symbolication using the release's breakpad symbols and Electron source checkout (`symbolize_trace`); open the result in `chrome://tracing` (the Perfetto UI does not support memory dumps yet).
- Distance: Chromium trace recording for Electron processes, not an application-level tracing/observability SDK.

## Related

- [Process metric structures](./metrics-structures.md)
- [Application Debugging](./application-debugging.md)
