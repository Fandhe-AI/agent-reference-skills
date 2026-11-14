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
| `contentTracing.startRecording(options)` | `Promise<void>` | `options`: `TraceConfig` or `TraceCategoriesAndOptions`. Starts recording on all processes; if already running resolves immediately (one trace at a time). If `options.nativeHeapProfiling` is set while a recording is already running, the promise is rejected instead, since the already-running recording's options can't be changed to turn on heap profiling. |
| `contentTracing.stopRecording([resultFilePath])` | `Promise<string>` | Stops recording on all processes; resolves with the path of the file containing the trace. If `resultFilePath` is empty or omitted, a temporary file is used. Trace data is written in the Perfetto protobuf format. |
| `contentTracing.getTraceBufferUsage()` | `Promise<Object>` | Resolves with `{ value: number, percentage: number }`: maximum usage across processes of the trace buffer. |

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
| `nativeHeapProfiling` | NativeHeapProfilerOptions (optional) _Experimental_ | Electron extension; not part of Chromium's TraceConfig schema. Enables native (C/C++) heap allocation profiling for this recording. Distinct from JavaScript heap profiling (`process.takeHeapSnapshot()` / `contents.takeHeapSnapshot()`); it samples allocations made by Chromium and native modules. `included_process_ids` also limits which processes are profiled when this is enabled. |

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
| `nativeHeapProfiling` | NativeHeapProfilerOptions (optional) _Experimental_ | Electron extension; not part of Chromium's TraceCategoriesAndOptions schema. Enables native (C/C++) heap allocation profiling for this recording. Unlike `TraceConfig`, this object has no `included_process_ids` field, so every traced process is profiled. |

## NativeHeapProfilerOptions

| Name | Type | Description |
| --- | --- | --- |
| `dumpInterval` | number (optional) | The interval in milliseconds at which samples are written to the trace. Each write is a full snapshot of every sampled allocation that is still live, so short intervals can fill the trace buffer quickly in long recordings. Defaults to `0`, which writes a single snapshot when tracing stops. |
| `samplingInterval` | number (optional) | The average number of bytes allocated between samples. Lower values give a more precise profile at a higher performance cost. Must be greater than `0`. Defaults to Chromium's default, currently `131072` (128 KiB). |

## Notes

- v45 (Removed): `contentTracing.enableHeapProfiling([options])` and the `EnableHeapProfilingOptions` structure (`mode`, `samplingRate`, `stackMode`) were removed because Chromium removed the memlog implementation. Pass `nativeHeapProfiling` to `startRecording()` instead: `samplingRate` is now `nativeHeapProfiling.samplingInterval`; `mode` has no direct equivalent (every traced process is profiled; use `included_process_ids` in a `TraceConfig` to limit which are traced); `stackMode` has no equivalent. In v44 the method was `Promise<void>`, Experimental, equivalent to `--memlog`.
- v45 (Behavior Changed): `stopRecording()` always writes the Perfetto protobuf format (https://perfetto.dev/docs/reference/trace-packet-proto); the legacy JSON format is no longer available. Open recordings in the Perfetto UI (https://ui.perfetto.dev) or query them with Perfetto's Trace Processor. Perfetto's `traceconv` tool can convert a recording to the legacy JSON format.
- Heap profiling samples record instruction addresses and module build IDs rather than function names. To symbolize them, use the symbols published for the matching Electron release with Chromium's `symbolize_trace` tool.
- Do not use this module until the `ready` event of `app` is emitted.
- Electron adds a non-default tracing category `"electron"` for Electron-specific events.
- Distance: Chromium trace recording for Electron processes, not an application-level tracing/observability SDK.

Replacement for the removed `enableHeapProfiling()` (from the v45 breaking-changes entry):

```js
await contentTracing.startRecording({
  nativeHeapProfiling: {
    samplingInterval: 128 * 1024
  }
})
```

## Related

- [Process metric structures](./metrics-structures.md)
- [Application Debugging](./application-debugging.md)
