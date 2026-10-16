# Telemetry

BullMQ provides a Telemetry interface that can be used to integrate it with any external telemetry backend. Currently the OpenTelemetry specification is supported, the de-facto standard for telemetry; the interface is flexible enough to support other backends in the future.

Telemetry is very useful for large applications where you want a detailed and general overview of the system. For BullMQ it helps to gain insight into the different statuses a job may be in during its complete lifecycle, and to track the source of jobs and all the interactions jobs or messages may perform with other parts of the system.

## Signature / Usage

Use the `bullmq-otel` package for OpenTelemetry integration:

```typescript
import { Queue } from 'bullmq';
import { BullMQOtel } from 'bullmq-otel';

const queue = new Queue('myQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
  telemetry: new BullMQOtel('simple-guide'),
});
```

## Notes

- Since v6, `bullmq-otel` is an optional peer dependency of BullMQ; install it explicitly.

## Related

- [Getting started](./getting-started.md)
- [Traces](./traces.md)
- [Metrics](./metrics.md)
- [Running Jaeger](./running-jaeger.md)
- [Running a simple example](./running-a-simple-example.md)
- [How to monitor and manage BullMQ queues](https://bullmq.io/articles/guides/monitoring-bullmq-queues/) (external guide)
