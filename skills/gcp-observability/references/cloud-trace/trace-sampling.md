---
source: https://docs.cloud.google.com/trace/docs/trace-sampling
---

# Trace sampling

Sampling determines which requests and spans Cloud Trace ingests, to control storage cost and quotas. Each component decides for itself; Cloud Trace has no role in the decision.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/trace/docs/trace-context: the sampling decision of the parent travels in the `TRACE_FLAGS` field.

```text
traceparent: VERSION-TRACE_ID-PARENT_SPAN_ID-TRACE_FLAGS
```

## Options / Props

| Strategy | Behavior |
|---|---|
| Head-based, always sample | Components sample every span; traces are ideally complete but may exceed quotas or storage cost limits. |
| Head-based, probabilistic | Not all spans are sampled; some implementations use one probability, others let the parent's decision influence the result. |
| Tail-based | Decision delayed until the whole trace is available. Cloud Trace does not support it; decide in the components that send data. |

## Notes

- Incomplete traces are expected with probabilistic sampling, exceeded quota, or components that process but do not sample spans.
- For tail-based sampling you can place an intermediary such as an OpenTelemetry Collector with the Tail Sampling Processor in front of Trace. It must store all spans of a trace before deciding (large temporary storage), and all components generating spans for a trace need to coordinate; typically all spans of a trace ID are routed to the same collector.
- If every component samples when the parent was sampled and otherwise 50%, the root span determines the whole trace: when it is sampled, all spans are sampled and the trace is complete. The `sampled` flag of `traceparent` passes the parent's decision.
- Google Cloud services each make their own decisions and not all sample. A service that supports sampling typically has a default sample rate, a way to use the parent's decision as a hint, and a maximum sampling rate.
- Source: https://docs.cloud.google.com/trace/docs/trace-sampling (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/trace/docs/trace-context (retrieved 2026-11-18).

## Related

- [trace-context.md](./trace-context.md)
- [setup.md](./setup.md)
