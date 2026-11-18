---
source: https://docs.cloud.google.com/build/docs/schedule-builds
---

# Schedule builds

Builds run on a predefined schedule by invoking a manual trigger from Cloud Scheduler. Only manual triggers can be scheduled. You can create several Cloud Scheduler jobs for one manual trigger.

## Signature / Usage

### Schedule a manual trigger (console)

1. Open the Triggers page, open the Actions menu on the manual trigger's row, and click Run on schedule.
2. Enable the Cloud Scheduler API (prompted only the first time).
3. Select the service account Cloud Scheduler uses to invoke the trigger. The default scheduling service account has this form:

   ```text
   cloud-build-trigger-scheduler@PROJECT_ID.iam.gserviceaccount.com
   ```

4. Choose a region if prompted, then enter the job Name, optional Description, Frequency (cron syntax or a drop-down value) and Time Zone, and click Create.

### Find the Cloud Scheduler job of a trigger

To update a job, get the trigger ID, then filter the Cloud Scheduler jobs list by that ID.

Adapted (not in the official docs): `--region=REGION` names the trigger's region; without it gcloud uses the `builds/region` property, or `global`.

```bash
gcloud builds triggers describe TRIGGER_NAME --region=REGION
```

## Options / Props

| Item | Description |
|------|-------------|
| Frequency | Drop-down value or cron syntax, for example `0 6 * * *` for every day at 6 AM |
| Time Zone | Time zone of the schedule |
| Default scheduling service account | `cloud-build-trigger-scheduler@PROJECT_ID.iam.gserviceaccount.com`, created automatically with the Cloud Build Editor IAM role |
| Extra role for user-specified service accounts | Service Account User (`roles/iam.serviceAccountUser`) granted to the scheduling service account on the trigger's user-specified service account; without it Cloud Scheduler cannot run the trigger |

## Notes

- Adapted from the official docs: the source's `gcloud builds triggers describe TRIGGER_NAME` has no region; a regional manual trigger needs `--region=REGION` (or the `builds/region` property).
- Do not delete the default scheduling service account: Cloud Scheduler uses it. If it was deleted or lost permissions, re-add it on the IAM page with the Cloud Build Editor role; existing Cloud Scheduler jobs can take up to an hour to resume.
- Selecting a Cloud Scheduler region creates an App Engine application in the project automatically, and the region cannot be changed later (see the Cloud Scheduler supported regions).
- If you change the Revision field (for example the branch name) of the manual trigger, update the Body field of the associated Cloud Scheduler job manually.
- Deleting or disabling the trigger does not delete or disable the Cloud Scheduler jobs created for it; the jobs persist and builds might continue to be invoked. Delete the Cloud Scheduler job to stop the schedule.
- Scheduler retries can duplicate requests; see "Prevent duplicate requests to Google Cloud API targets" in the Cloud Scheduler docs.
- Cloud Scheduler itself is covered by `gcp-run`. The source also shows Console steps only (no gcloud command to create the job).
- Source: https://docs.cloud.google.com/build/docs/schedule-builds (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [manually-build-code-source-repos.md](./manually-build-code-source-repos.md)
- [create-manage-triggers.md](./create-manage-triggers.md)
- [triggers.md](./triggers.md)
