# Prometheus

BullMQ provides a simple API to export metrics to Prometheus. Create an endpoint in your web server that calls `exportPrometheusMetrics()`, and configure Prometheus to scrape metrics from this endpoint.

## Signature / Usage

Vanilla Node.js:

```typescript
import http from 'http';
import { Queue } from 'bullmq';

const queue = new Queue('my-queue');

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      if (req.url === '/metrics' && req.method === 'GET') {
        const metrics = await queue.exportPrometheusMetrics();

        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'Content-Length': Buffer.byteLength(metrics),
        });
        res.end(metrics);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    } catch (err: unknown) {
      res.writeHead(500);
      res.end(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  },
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});
```

Test the endpoint:

```bash
curl http://localhost:3000/metrics
```

Output:

```
HELP bullmq_job_count Number of jobs in the queue by state
TYPE bullmq_job_count gauge
bullmq_job_count{queue="my-queue", state="waiting"} 5
bullmq_job_count{queue="my-queue", state="active"} 3
bullmq_job_count{queue="my-queue", state="completed"} 12
bullmq_job_count{queue="my-queue", state="failed"} 2
```

With Express.js:

```typescript
import express from 'express';
import { Queue } from 'bullmq';

const app = express();
const queue = new Queue('my-queue');

app.get('/metrics', async (req, res) => {
  try {
    const metrics = await queue.exportPrometheusMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT || 3000);
```

### Adding global variables as labels

`exportPrometheusMetrics` also supports an optional `globalVariables` parameter, a record of key-value pairs added as labels to each metric. Useful when aggregating metrics from multiple environments (production, staging) in tools like Grafana.

```typescript
const globalVariables = { env: 'Production', server: '1' };
const metrics = await queue.exportPrometheusMetrics(globalVariables);
```

With `globalVariables = { env: 'Production', server: '1' }` the output becomes:

```plaintext
# HELP bullmq_job_count Number of jobs in the queue by state
# TYPE bullmq_job_count gauge
bullmq_job_count{queue="my-queue", state="waiting", env="Production", server="1"} 5
bullmq_job_count{queue="my-queue", state="active", env="Production", server="1"} 3
bullmq_job_count{queue="my-queue", state="completed", env="Production", server="1"} 12
bullmq_job_count{queue="my-queue", state="failed", env="Production", server="1"} 2
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `globalVariables` | `Record<string, string>` | Key-value pairs added as labels to every metric |

## Notes

- The additional labels let you filter and group metrics in Prometheus or Grafana to distinguish environments or servers.

## Related

- [Metrics](./metrics.md)
- [How to monitor and manage BullMQ queues](https://bullmq.io/articles/guides/monitoring-bullmq-queues/) (external guide)
