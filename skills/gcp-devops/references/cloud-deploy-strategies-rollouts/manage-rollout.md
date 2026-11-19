---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/manage-rollout
---

# Manage Cloud Deploy rollouts

A rollout associates a release with a target and consists of phases (ordered groups of jobs). Each job (for example `deploy` or `verify`) can have zero or more job runs; a job run is an instance of a job. This page covers phase, job and job run states and how to advance, cancel, terminate, ignore and retry.

## Signature / Usage

### Advance a rollout

For targets with a strategy other than standard, advance the rollout from phase to phase. For a simple canary with 50% and `stable` phases, advance once, from `canary-50` to `stable`.

```bash
gcloud deploy rollouts advance ROLLOUT_NAME \
                               --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --region=REGION
```

### Cancel a rollout

You can cancel any rollout that has not finished, and a failed rollout to prevent further actions such as ignore or retry. After cancelling, the rollout is `CANCELLING` until all outstanding job runs complete (terminate the ones you do not want to wait for); once `CANCELLED` it can no longer be advanced or modified.

```bash
gcloud deploy rollouts cancel ROLLOUT_NAME \
                               --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --region=REGION
```

### Terminate a job run

The job run must be `IN_PROGRESS`. After you terminate it the job is considered failed: leave it, retry the job, or ignore the job and continue. Find the job run ID (a UUID) in the console rollout page or with `gcloud deploy rollouts describe`.

```bash
gcloud deploy job-runs terminate JOB_RUN_ID \
                               --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --rollout=ROLLOUT_NAME \
                               --region=REGION
```

### Ignore a job

You can ignore a failed job (for any reason, including a terminated job run) and move to the next job in the phase. A failed job means a failed phase and rollout; ignoring the failure lets both progress to `SUCCEEDED`.

```bash
gcloud deploy rollouts ignore-job ROLLOUT_NAME \
                               --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --job-id=JOB_ID \
                               --phase-id=PHASE_ID \
                               --region=REGION
```

### Retry a failed job

Adapted (not in the official docs): the source passes `JOB_NAME` as the positional argument with `--rollout` and `--phase`; in gcloud 593.0.0 the positional argument is the rollout and the flags are `--job-id` and `--phase-id`.

```bash
gcloud deploy rollouts retry-job ROLLOUT_NAME \
                       --release=RELEASE_NAME \
                       --delivery-pipeline=PIPELINE_NAME \
                       --job-id=JOB_ID \
                       --phase-id=PHASE_ID \
                       --region=REGION
```

## Options / Props

### Phases

| Strategy | Phases |
|---|---|
| Standard | One phase: `stable` |
| Canary | `canary-[PERCENTAGE]` for each configured percentage, then `stable` (100%). Example 25%, 50%, 100%: `canary-25`, `canary-50`, `stable`. Custom-automated and custom canaries can set their own phase names |

With a canary, each phase has a `deploy` job, and a `verify` job if verification is enabled.

### Arguments

| Argument | Used by | Description |
|---|---|---|
| `ROLLOUT_NAME` | advance, cancel, ignore-job, retry-job | The rollout to act on |
| `JOB_RUN_ID` | job-runs terminate | UUID of the job run to terminate |
| `--release` | all | The release the rollout is part of |
| `--delivery-pipeline` | all | The delivery pipeline managing the release |
| `--rollout` | job-runs terminate | The rollout the job run is part of |
| `--job-id` | ignore-job, retry-job | The job, for example `DEPLOY`, or `verify` for a failed verification |
| `--phase-id` | ignore-job, retry-job | The phase containing the job, for example `canary-50` or `stable` |
| `--region` | all | Region where the release was created, for example `us-central1`; required |

### Reasons a job can fail (retryable)

| Reason | Example |
|---|---|
| A job run failed to complete | A permissions failure |
| A user terminated a job run | Terminating results in a failed job |
| A verification test failed | The verification job completed, but a test failed; retry while debugging the test |

### Rollout states

| State | Meaning |
|---|---|
| `APPROVAL_REJECTED` | Approval was required but rejected |
| `CANCELLED` | Terminal state for rollouts canceled by a user |
| `CANCELLING` | Canceled by a user, cancellation not yet finished processing |
| `HALTED` | Parallel deployment: one or more child rollouts failed, at least one succeeded, and more phases follow. Resume by canceling the controller rollout, or retrying or ignoring failed jobs on child rollouts |
| `IN_PROGRESS` | A job run is processing |
| `FAILED` | A job failed and the failure was not ignored |
| `PENDING` | Not yet begun; transitions to `IN_PROGRESS` or `CANCELED` |
| `PENDING_APPROVAL` | Requires approval, not yet approved |
| `PENDING_RELEASE` | Waiting for the release to be rendered |
| `SUCCEEDED` | Finished with no failures |

A rollout can be canceled only in one of these states: `FAILED`, `HALTED`, `IN_PROGRESS`, `PENDING`, `PENDING_APPROVAL`, `PENDING_RELEASE`.

### Phase states

| State | Meaning |
|---|---|
| `PENDING` | Waiting for another phase in the rollout to finish |
| `IN_PROGRESS` | The phase has started |
| `SUCCEEDED` | Completed successfully |
| `FAILED` | A job failed and the failure was not ignored |
| `ABORTED` | A previous phase failed |
| `SKIPPED` | Canary skipped to `stable` because no running version exists to split traffic with |

### Job states

| State | Meaning |
|---|---|
| `ABORTED` | A phase failed so later phases abort; or a job failed (not ignored) so later jobs abort (for example verify after a failed deploy) |
| `DISABLED` | For example the verify job when verification is not enabled (phases always include verify jobs) |
| `FAILED` | A job run failed and the failure was not ignored, or the user terminated the job run |
| `IGNORED` | A job run failed and the user ignored the failure |
| `IN_PROGRESS` | A job run is running |
| `PENDING` | Waiting for another phase or job to finish |
| `SKIPPED` | Canary skipped to `stable`; set on jobs in the skipped phases |
| `SUCCEEDED` | The job run finished successfully |

### Job run states

| State | Meaning |
|---|---|
| `FAILED` | The job run failed during execution |
| `IN_PROGRESS` | Begun but not finished |
| `TERMINATED` | The user terminated the job run |
| `TERMINATING` | The user terminated the job run, not finished terminating yet |
| `SUCCEEDED` | Finished successfully, without failing or being terminated (the source sentence is cut off after this) |

## Notes

- Cancelling is irreversible: a `CANCELLED` rollout can no longer be advanced or modified. Ignoring a failed job (for example a failed verification) lets the rollout continue as if the job had succeeded. Try these operations on a disposable project first.
- Parallel deployment: you can advance and cancel the controller rollout (advancing it advances the child rollouts), but you can retry jobs, ignore jobs and terminate job runs on child rollouts only.
- First-time canary: when the application is not yet deployed to the target there is no old version to apportion traffic with, so the canary phases are skipped and the `stable` phase runs; later canaries include the canary phases.
- Corrected from the official docs: the source writes `gcloud deploy rollouts retry-job JOB_NAME ... --rollout=ROLLOUT_NAME --phase=PHASE_ID`; gcloud 593.0.0 help takes the rollout as the positional argument and `--job-id` / `--phase-id` as flags.
- The cancel section of the source describes `ROLLOUT_NAME` as the rollout "which you're advancing to the next phase" (copy-paste from advance); it is the rollout being canceled.
- The canary pages list these permissions as the additional IAM permissions needed for canary rollout actions: `clouddeploy.rollouts.advance`, `clouddeploy.rollouts.cancel`, `clouddeploy.rollouts.ignoreJob`, `clouddeploy.rollouts.retryJob`, `clouddeploy.jobRuns.get`, `clouddeploy.jobRuns.list`, `clouddeploy.jobRuns.terminate`.
- The source also shows Console steps for each action.
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/manage-rollout (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deployment-strategies.md](./deployment-strategies.md)
- [canary.md](./canary.md)
- [roll-back.md](./roll-back.md)
