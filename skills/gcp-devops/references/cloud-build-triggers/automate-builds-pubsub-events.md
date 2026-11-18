---
source: https://docs.cloud.google.com/build/docs/automate-builds-pubsub-events
---

# Automate builds in response to Pub/Sub events

A Cloud Build Pub/Sub trigger runs a build when a message is published to a Pub/Sub topic, for example an Artifact Registry image event or a Cloud Storage object event. Message data can parameterize the build through payload bindings, and CEL filters decide whether a build runs. The source's tabs cover 1st gen and 2nd gen; the page text shown is the 2nd gen tab (repository generation: 2nd gen).

## Signature / Usage

### Prerequisites

- Cloud Build API enabled (`serviceusage.services.enable`, for example via `roles/owner` or `roles/serviceusage.serviceUsageAdmin`).
- A build config file or `Dockerfile` in the repository.
- gcloud installed and up to date (`gcloud components update`).

### Artifact Registry event: new tag pushed to an image

Use the `gcr` topic (or create it as described in "Configuring Pub/Sub notifications" for Artifact Registry). Payload bindings used in this example:

| Variable name | Variable value |
|---------------|----------------|
| `_IMAGE_TAG` | `$(body.message.data.tag)` |
| `_ACTION` | `$(body.message.data.action)` |

Filters: `_IMAGE_TAG` != `""` and `_ACTION` == `INSERT`.

Adapted (not in the official docs): the source's `\ # or --inline-config=...` and `# or --branch=...` comments break the line continuation; `--substitutions=\` followed by separately quoted fragments splits into stray arguments, so the values are joined into one single-quoted argument; the source's `_IMAGE_TAG_` (trailing underscore) does not match the filter's `_IMAGE_TAG`; and `--service-account` is added because the source omits it (a trigger without one uses the default Cloud Build service account).

```bash
gcloud builds triggers create pubsub \
  --region=REGION \
  --name=TRIGGER_NAME \
  --repository=projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME \
  --topic=projects/PROJECT_ID/topics/TOPIC_NAME \
  --build-config=BUILD_CONFIG \
  --substitutions='_IMAGE_TAG=$(body.message.data.tag),_ACTION=$(body.message.data.action)' \
  --subscription-filter='_IMAGE_TAG != "" && _ACTION == "INSERT"' \
  --service-account=projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL \
  --branch=BRANCH_NAME
```

### Cloud Storage event: new object uploaded

Use the `gcs` topic (or create it as described in "Configuring Pub/Sub notifications for Cloud Storage"). Payload bindings:

| Variable name | Variable value |
|---------------|----------------|
| `_EVENT_TYPE` | `$(body.message.attributes.eventType)` |
| `_BUCKET_ID` | `$(body.message.attributes.bucketId)` |
| `_OBJECT_ID` | `$(body.message.attributes.objectId)` |

Console filters: `_EVENT_TYPE` == `OBJECT_FINALIZE`, `_OBJECT_ID` matches `^<object-id>$`, `_BUCKET_ID` matches `^<bucket-id>$`.

Adapted (not in the official docs): same continuation, substitution quoting and `--service-account` fixes as above; the `<object-id>` and `<bucket-id>` placeholders become `OBJECT_ID_REGEX` and `BUCKET_ID_REGEX`.

```bash
gcloud builds triggers create pubsub \
  --region=REGION \
  --name=TRIGGER_NAME \
  --repository=projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME \
  --topic=projects/PROJECT_ID/topics/TOPIC_NAME \
  --build-config=BUILD_CONFIG \
  --substitutions='_EVENT_TYPE=$(body.message.attributes.eventType),_BUCKET_ID=$(body.message.attributes.bucketId),_OBJECT_ID=$(body.message.attributes.objectId)' \
  --subscription-filter='_EVENT_TYPE == "OBJECT_FINALIZE" && _OBJECT_ID.matches("OBJECT_ID_REGEX") && _BUCKET_ID.matches("BUCKET_ID_REGEX")' \
  --service-account=projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL \
  --branch=BRANCH_NAME
```

## Options / Props

### Trigger settings (console)

| Setting | Description |
|---------|-------------|
| Region | Trigger region. If the build config names a private pool, the trigger region must match the pool's region; otherwise the default pool in the trigger's region is used |
| Event | Pub/Sub message |
| Subscription / topic | Existing topics in the project; a subscription for the trigger is created automatically |
| Source | Repository generation 2nd gen; the repository region must match the trigger region |
| Branch or Tag | RE2 regular expression |
| Configuration | Cloud Build config file (yaml or json), Dockerfile, or Buildpacks; inline config is not available for Dockerfile or buildpacks |
| Substitutions | Optional, but required for custom filtering on messages |
| Filters | Optional CEL expressions over substitution variables; must evaluate to `true` for a build to run. Nest conditions with `&&` and `\|\|`; `!` is not supported. Use `==` for exact match and `matches` for regular expressions |

### Comment control (pull request events, GitHub App)

| Option | Behaviour |
|--------|-----------|
| Required except for owners and collaborators | Owner or collaborator pull requests build automatically; an external contributor's build runs only after an owner or collaborator comments `/gcbrun` |
| Required | Every pull request build runs only after an owner or collaborator comments `/gcbrun`; builds run on each change to the pull request |
| Not required | Builds run automatically for any contributor |

### gcloud flags

| Flag | Description |
|------|-------------|
| `--topic` | `projects/PROJECT_ID/topics/TOPIC_NAME` to subscribe to |
| `--repository` | `projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME` (2nd gen) |
| `--build-config` / `--inline-config` | Path to the build config in the repository, or a local inline config file |
| `--substitutions` | `KEY=VALUE` pairs with payload bindings |
| `--subscription-filter` | CEL filter |
| `--branch` / `--tag` | Branch or tag to build (mutually exclusive) |

## Notes

- Limitation: Cloud Build Pub/Sub triggers are not supported when VPC Service Controls is used.
- Pub/Sub triggers cannot build GitHub Enterprise, Bitbucket Data Center or Bitbucket Server repositories through the built-in integration; specify the build configuration inline to clone and build them through your external source code management system.
- Risk of unfiltered triggers: without filters a trigger can start an unbounded number of builds if the build modifies an artifact or object that publishes a new message to its own topic, for example a trigger on a `gcr` topic that creates any image or tag, or a trigger on a `gcs` topic for a specific object that modifies that object. Delete the trigger or point it at a separate topic to stop the loop; each build is charged. Filters are recommended on topics with many messages.
- The prose says the Artifact Registry example responds to a tag matching `prod`, but the filter shown only checks that `_IMAGE_TAG` is not empty and `_ACTION` is `INSERT`; add a `_IMAGE_TAG == "prod"` condition for that behaviour.
- Pull request comment control: any user with read access to the repository can submit a pull request, which may run a build that includes the pull request's source changes with the trigger's service account. Use manual approvals to gate pull request builds on public repositories, and see the Build triggers and Cloud Build service account page for build-time privileges.
- Corrected from the official docs: `--substitutions=\ '_IMAGE_TAG_="$(body.message.data.tag)",' \ '_ACTION="$(body.message.data.action)"'` became one single-quoted `--substitutions` value without the stray `_` and embedded double quotes.
- Substitution values start with `_` and are upper case for user-defined variables. A trigger without `--service-account` uses the default Cloud Build service account, which is not recommended; a user-specified service account needs a logs bucket (see the trigger creation page).
- Pub/Sub itself is covered by `gcp-messaging-workflows`, Artifact Registry notifications by this skill's Artifact Registry references.
- The source also shows Console steps for both events and the 1st gen tab.
- Source: https://docs.cloud.google.com/build/docs/automate-builds-pubsub-events (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [create-manage-triggers.md](./create-manage-triggers.md)
- [gate-builds-on-approval.md](./gate-builds-on-approval.md)
