# Python

BullMQ is available as a native Python package (running on Redis or PostgreSQL). It is delivered as a pip package and uses asyncio to implement concurrency and provide efficient processing of jobs. Requires Python 3.10 or newer, and Redis 6.2 or newer (or a compatible server such as Valkey or Dragonfly), or PostgreSQL 13 or newer when using the PostgreSQL backend. Queues are fully interoperable with the other BullMQ SDKs (Node.js, Elixir, .NET, Rust and PHP).

## Signature / Usage

Installation:

```bash
pip install bullmq
```

Add jobs to a queue (assuming a Redis host running locally):

```python
import asyncio
from bullmq import Queue

async def main():
    queue = Queue("myQueue")

    # Add a job with data { "foo": "bar" } to the queue
    await queue.add("myJob", {"foo": "bar"})

    # Close when done adding jobs
    await queue.close()

if __name__ == "__main__":
    asyncio.run(main())
```

Consume jobs with the `Worker` class, providing a processor function. As soon as the worker is instantiated it starts consuming jobs:

```python
from bullmq import Worker
import asyncio
import signal

async def process(job, job_token):
    # job.data will include the data added to the queue
    return await doSomethingAsync(job)

async def main():
    # Create an event that will be triggered for shutdown
    shutdown_event = asyncio.Event()

    def signal_handler(signal, frame):
        print("Signal received, shutting down.")
        shutdown_event.set()

    # Assign signal handlers to SIGTERM and SIGINT
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)

    # Feel free to remove the connection parameter, if your redis runs on localhost
    worker = Worker("myQueue", process, {"connection": "rediss://<user>:<password>@<host>:<port>"})

    # Wait until the shutdown event is set
    await shutdown_event.wait()

    # close the worker
    print("Cleaning up worker...")
    await worker.close()
    print("Worker shut down successfully.")

if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- The API is asyncio-based, so `async` / `await` (running inside an event loop such as `asyncio.run`) is required; `await` cannot be used at module top level in a plain script.
- The official v6.3.15 and v6.7.6 Python introductions write `return doSomethingAsync(job)` without `await`; when the helper is a coroutine function it must be awaited, otherwise the processor returns an un-awaited coroutine instead of the result.
- If Redis responses are in binary format, pass the `decode_responses` option as `True`.
- In the official Python section, the Flow Producer, Job Scheduler, Lock Manager, Global Concurrency and Rate Limit, Job Cancellation and Queue Events pages are stubs that point to the language tabs of the shared guides (`guide/flows`, `guide/job-schedulers`, `guide/workers/cancelling-jobs` and `stalled-jobs`, `guide/queues/global-concurrency` and `global-rate-limit`, `guide/events`). For Python-specific implementation see the official repository's `python/bullmq/*.py` (`flow_producer.py`, `job_scheduler.py`, `lock_manager.py`, `queue.py`, `abort_controller.py`, `worker.py`, `queue_events.py`, `queue_events_producer.py`).

- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/python/introduction.md (tag v6.7.6, fetched 2026-11-14). The v6.3.15 page described Python as "an experimental python package"; v6.7.6 describes it as native, with the sections below added.

### Redis Cluster

Pass a `redis.asyncio.cluster.RedisCluster` client as the `connection`, and put a hash tag in the prefix so every key of a queue lands in one slot (see the Redis Cluster pattern in this skill):

```python
from bullmq import Queue, Worker
from redis.asyncio.cluster import RedisCluster

connection = RedisCluster(host="<host>", port=6379, decode_responses=True)
queue = Queue("myQueue", {"connection": connection, "prefix": "{myprefix}"})
worker = Worker("myQueue", process, {"connection": connection, "prefix": "{myprefix}"})
```

### PostgreSQL backend

The `Queue`, `Worker` and `FlowProducer` APIs can run on PostgreSQL instead of Redis. Python `QueueEvents` remains Redis-only and cannot consume PostgreSQL events. Install the package with the `postgres` extra, which adds the [psycopg](https://www.psycopg.org) driver:

```
$ pip install "bullmq[postgres]"
```

Then set `backend` to `"postgres"` and pass a PostgreSQL connection string (or a dict with `host`, `port`, `dbname`, `user` and `password`) as the `connection`:

```python
from bullmq import Queue, Worker

opts = {
    "backend": "postgres",
    "connection": "postgresql://postgres:postgres@localhost:5432/mydb",
    # "schema": "bullmq",  # optional, this is the default
}

queue = Queue("myQueue", opts)
await queue.add("myJob", {"foo": "bar"})

worker = Worker("myQueue", process, opts)
```

All BullMQ objects live in a dedicated schema (`bullmq` by default), and the required tables and functions are migrated automatically on first use. Note that the `prefix` option is not supported on PostgreSQL, use `schema` to namespace your queues instead. Read more about this backend in the PostgreSQL backend category of this skill's guide.

## Related

- [Introduction](../guide/introduction.md)
- [Guide](../guide/README.md)
