# GCP Project ID

`GOOGLE_WORKSPACE_PROJECT_ID` sets the Google Cloud Platform project ID used by gws for quota attribution and as a fallback in certain helper commands.

## Configuration

```sh
export GOOGLE_WORKSPACE_PROJECT_ID=my-gcp-project-id
```

## Purpose

| Use Case | Description |
|----------|-------------|
| Quota & billing | Routes API usage to the specified GCP project for quota tracking and billing attribution. |
| Helper command fallback | Used as a fallback project context by helper commands such as Gmail watch and events subscriptions when no project is otherwise determined. |

## Notes

- This variable overrides the project ID that would otherwise be inferred from the credentials file.
- Required for features that need an explicit GCP project (e.g. setting up Gmail push notifications via Pub/Sub).

## Related

- [env-vars.md](./env-vars.md)
