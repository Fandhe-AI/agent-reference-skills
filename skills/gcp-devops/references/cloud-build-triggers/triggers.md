---
source: https://docs.cloud.google.com/build/docs/triggers
---

# Cloud Build triggers overview

A Cloud Build trigger starts a build automatically when an event arrives, such as a commit push, a pull request, a Pub/Sub message, a webhook call or a manual or scheduled invocation. This page lists the trigger types and the capabilities that apply to all of them.

## Signature / Usage

### Trigger types

| Type | Starts a build on | Notes |
|------|-------------------|-------|
| GitHub | Pushes and pull requests | Status is visible on GitHub and in the console; the Cloud Build GitHub app is also supported |
| GitHub Enterprise | Pushes and pull requests | Includes on-premises instances not reachable over the public internet |
| GitLab Enterprise Edition | Commit pushes and pull requests | Includes instances in a private network |
| Bitbucket Server | Pushes and pull requests | Can be connected several times with multiple host connections |
| Bitbucket Data Center | Commit pushes and pull requests | Includes on-premises instances |
| Bitbucket Cloud | Commit pushes and pull requests | |
| Secure Source Manager | Commit pushes and pull requests | Configured with a triggers file in Secure Source Manager |
| Manual | Invocation by a user (or Cloud Scheduler) | Substitution values can be overridden at invocation time |
| Pub/Sub | Any message on a topic | Filters can restrict which messages start a build |
| Webhook | An authenticated HTTP request to a custom URL | Build config can be inline instead of a repository |

Repositories connected through Developer Connect can also be built for Bitbucket Cloud, Bitbucket Data Center, Bitbucket Server, GitHub, GitHub Enterprise, GitLab and GitLab Enterprise Edition.

### Event filtering with CEL

Filters use Common Expression Language (CEL) with the variable `build` on fields of the `Build` resource (trigger ID, image list, substitution values). Pub/Sub triggers use a `--subscription-filter` expression; see the Pub/Sub page.

### Example: create a manual trigger

```bash
gcloud builds triggers create manual \
  --region=REGION \
  --name=TRIGGER_NAME \
  --repository=projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME \
  --branch=BRANCH_NAME \
  --build-config=BUILD_CONFIG_FILE \
  --service-account=SERVICE_ACCOUNT
```

## Options / Props

| Capability | Description |
|------------|-------------|
| Scheduled manual triggers | A manual trigger invoked by Cloud Scheduler, for example every Saturday at 6:00 AM |
| Filtering events | CEL expression over the `build` variable |
| Substitution variables | Default substitutions for triggered builds plus user-defined ones |
| Bash parameter expansions | Manipulate substitution values, for example capitalize or replace a substring |
| Payload bindings | Store part of the trigger's event payload as a substitution variable; available for push and pull events |
| Approvals | A build stays pending until a user with permission approves it; a denied approval means the build never starts |
| Build status notifications | Notifiers (BigQuery, HTTP, Slack, SMTP, or your own) read build events from Pub/Sub, on the default `cloud-builds` topic or a user-defined topic |

## Notes

- Cloud Source Repositories: effective June 17, 2024 it is not available to new customers. If your organization had not used it before that date you cannot enable the API or use it, and new projects not connected to an organization cannot enable the API. Organizations that used it before June 17, 2024 are not affected.
- Cloud Build Pub/Sub triggers are not supported when VPC Service Controls is used.
- Webhook triggers can define the build configuration inline, which controls which repositories the trigger clones at build time instead of naming a source.
- Cloud Build is Google Cloud's managed build service; GitHub Actions workflows are covered by the `github-docs` skill. Pub/Sub topics are covered by `gcp-messaging-workflows`.
- Snippet taken from https://docs.cloud.google.com/build/docs/manually-build-code-source-repos (same category); the overview page itself has no code. See that page for the service account and Preview conditions.
- Source: https://docs.cloud.google.com/build/docs/triggers (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-manage-triggers.md](./create-manage-triggers.md)
- [automate-builds-pubsub-events.md](./automate-builds-pubsub-events.md)
- [automate-builds-webhook-events.md](./automate-builds-webhook-events.md)
- [manually-build-code-source-repos.md](./manually-build-code-source-repos.md)
- [gate-builds-on-approval.md](./gate-builds-on-approval.md)
- [schedule-builds.md](./schedule-builds.md)
