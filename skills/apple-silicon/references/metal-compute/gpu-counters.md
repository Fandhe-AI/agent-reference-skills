# GPU Counters

Discovering which hardware performance counters a GPU device exposes, before attempting to sample them into a counter sample buffer.

## Signature / Usage

```swift
// Check the device supports the counter set you need, then find the specific counter within it
guard let counterSets = device.counterSets else { /* no counter support at all */ return }

guard let timestampSet = counterSets.first(where: { $0.name == MTLCommonCounterSet.timestamp.rawValue }) else {
    return // device doesn't support this counter set
}

let hasTimestampCounter = timestampSet.counters.contains {
    $0.name == MTLCommonCounter.timestamp.rawValue
}
```

## Options / Props

| Type | Description |
| --- | --- |
| `MTLCounterSet` | A collection of related counters a device supports; exposes `name` and `counters` (array of `MTLCounter`) |
| `MTLCounter` | A single named counter within a counter set; exposes `name` |
| `MTLCommonCounterSet` | Well-known counter set names to compare against, e.g. `.timestamp`, `.statistic`, `.stageUtilization` |
| `MTLCommonCounter` | Well-known individual counter names to compare against, e.g. `.timestamp`, `.vertexInvocations`, `.fragmentUtilization` |
| `MTLDevice.counterSets` | The counter sets this device supports; check before requesting one |

## Notes

- Checking `counterSets` / `counters` at runtime before use is required — assuming a counter set's presence can crash or error on devices/OS versions that don't support it.
- A device can support a counter set (e.g. `.statistic`) while only supporting some of the individual counters within it; verify both levels.
- Once a device is confirmed to support a counter, create an `MTLCounterSampleBuffer` to actually capture its data during a pass — see `counter-sample-buffers.md`.
- This page covers the GPU-compute workflow on Apple silicon; the Metal rendering class references (MTLDevice, MTLComputeCommandEncoder, etc.) live in the apple-graphics skill.

## Related

- [Counter Sample Buffers](./counter-sample-buffers.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
