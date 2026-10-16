# Process Step jobs

Break processor functions into small pieces that are processed depending on the previously executed step. One way to handle this is with switch statements. By saving the next step value every time a step completes (here, in the job's data), a job that errors and retries starts from the correct step.

## Signature / Usage

```typescript
enum Step {
  Initial,
  Second,
  Finish,
}

const worker = new Worker(
  'queueName',
  async job => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Finish,
          });
          step = Step.Finish;
          return Step.Finish;
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

### Delaying

To delay a job while it is being processed, use `moveToDelayed`. While a worker processes a job it keeps a lock on it with a token value; for the TypeScript `moveToDelayed` to work, pass the token so it can unlock without error. Then exit the processor by throwing `DelayedError` (`DelayedException` in .NET) to signal the worker that the job has been delayed, so it does not try to complete or fail it.

```typescript
import { DelayedError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Finish,
}

const worker = new Worker(
  'queueName',
  async (job: Job, token?: string) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await job.moveToDelayed(Date.now() + 200, token);
          await job.updateData({
            step: Step.Second,
          });
          throw new DelayedError();
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Finish,
          });
          step = Step.Finish;
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

### Waiting Children

A common use case is to add children at runtime and then wait for them to complete. Use `moveToWaitingChildren`, passing the lock token, and exit the processor by throwing `WaitingChildrenError` so the worker knows the job moved to waiting-children and does not complete or fail it.

```typescript
import { WaitingChildrenError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Third,
  Finish,
}

const worker = new Worker(
  'parentQueueName',
  async (job: Job, token?: string) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await childrenQueue.add(
            'child-1',
            { foo: 'bar' },
            {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          );
          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await childrenQueue.add(
            'child-2',
            { foo: 'bar' },
            {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          );
          await job.updateData({
            step: Step.Third,
          });
          step = Step.Third;
          break;
        }
        case Step.Third: {
          const shouldWait = await job.moveToWaitingChildren(token);
          if (!shouldWait) {
            await job.updateData({
              step: Step.Finish,
            });
            step = Step.Finish;
            return Step.Finish;
          } else {
            throw new WaitingChildrenError();
          }
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

### Chaining Flows

Add flows at runtime inside the processor and then wait for the children to complete:

```typescript
import { FlowProducer, WaitingChildrenError, Worker } from 'bullmq';

enum Step {
  Initial,
  Second,
  Third,
  Finish,
}

const flow = new FlowProducer({ connection });
const worker = new Worker(
  'parentQueueName',
  async (job, token) => {
    let step = job.data.step;
    while (step !== Step.Finish) {
      switch (step) {
        case Step.Initial: {
          await doInitialStepStuff();
          await flow.add({
            name: 'child-job',
            queueName: 'childrenQueueName',
            data: {},
            children: [
              {
                name,
                data: { idx: 0, foo: 'bar' },
                queueName: 'grandchildrenQueueName',
              },
              {
                name,
                data: { idx: 1, foo: 'baz' },
                queueName: 'grandchildrenQueueName',
              },
            ],
            opts: {
              parent: {
                id: job.id,
                queue: job.queueQualifiedName,
              },
            },
          });

          await job.updateData({
            step: Step.Second,
          });
          step = Step.Second;
          break;
        }
        case Step.Second: {
          await doSecondStepStuff();
          await job.updateData({
            step: Step.Third,
          });
          step = Step.Third;
          break;
        }
        case Step.Third: {
          const shouldWait = await job.moveToWaitingChildren(token);
          if (!shouldWait) {
            await job.updateData({
              step: Step.Finish,
            });
            step = Step.Finish;
            return Step.Finish;
          } else {
            throw new WaitingChildrenError();
          }
        }
        default: {
          throw new Error('invalid step');
        }
      }
    }
  },
  { connection },
);
```

## Notes

- Manually moving jobs using special errors does not increment `attemptsMade`. That property is incremented on regular job completion or failure (including retries using a backoff strategy). This applies to `DelayedError`, `RateLimitError`, `WaitingChildrenError` and `WaitingError`. To control how many times a job is allowed to start processing, use the `maxStartedAttempts` option.
- The official page also has .NET, Python and Rust tabs. In .NET, use `job.UpdateDataAsync`; `job.MoveToDelayedAsync(ts)` uses the job's own token automatically when none is given, and `DelayedException` (the counterpart of TypeScript's `DelayedError`) is thrown to signal the delay. The TypeScript `moveToDelayed` still needs the token to unlock.
- Save the step with `job.updateData` after each step completes; otherwise a retry re-executes from the beginning.
- BullMQ Pro: this pattern can be handled with observables, in which case the next step does not need to be saved.

## Related

- [Move To Delayed API Reference](https://docs.bullmq.io/api/classes/v6.Job.html#movetodelayed)
- [Move To Waiting Children API Reference](https://docs.bullmq.io/api/classes/v6.Job.html#movetowaitingchildren)
- [Flows](./flows.md)
- [Manual retrying](./manual-retrying.md)
