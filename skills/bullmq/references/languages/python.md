# Python

BullMQ is also available as an experimental Python package. It is delivered as a pip package and uses asyncio to implement concurrency and provide efficient processing of jobs.

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
    return doSomethingAsync(job)

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
- If Redis responses are in binary format, pass the `decode_responses` option as `True`.
- In the official Python section, the Flow Producer, Job Scheduler, Lock Manager, Global Concurrency and Rate Limit, Job Cancellation and Queue Events pages are stubs that point to the language tabs of the shared guides (`guide/flows`, `guide/job-schedulers`, `guide/workers/cancelling-jobs` and `stalled-jobs`, `guide/queues/global-concurrency` and `global-rate-limit`, `guide/events`). For Python-specific implementation see the official repository's `python/bullmq/*.py` (`flow_producer.py`, `job_scheduler.py`, `lock_manager.py`, `queue.py`, `abort_controller.py`, `worker.py`, `queue_events.py`, `queue_events_producer.py`).

## Related

- [Introduction](../guide/introduction.md)
- [Guide](../guide/README.md)
