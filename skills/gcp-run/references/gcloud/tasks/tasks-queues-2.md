---
source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues
---

# gcloud tasks queues (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha tasks queues update

```text
NAME
    gcloud alpha tasks queues update - update a Cloud Tasks queue

SYNOPSIS
    gcloud alpha tasks queues update QUEUE [--location=LOCATION]
        [--clear-http-header-override
          | --http-header-override=HEADER_FIELD: HEADER_VALUE]
        [--clear-http-method-override
          | --http-method-override=HTTP_METHOD_OVERRIDE]
        [--clear-http-oauth-service-account-email-override
          | --http-oauth-service-account-email-override=HTTP_OAUTH_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oauth-token-scope-override
          | --http-oauth-token-scope-override=HTTP_OAUTH_TOKEN_SCOPE_OVERRIDE]
        [--clear-http-oidc-service-account-email-override
          | --http-oidc-service-account-email-override=HTTP_OIDC_SERVICE_ACCOUNT_EMAIL_OVERRIDE]
        [--clear-http-oidc-token-audience-override
          | --http-oidc-token-audience-override=HTTP_OIDC_TOKEN_AUDIENCE_OVERRIDE]
        [--clear-http-uri-override
          | --http-uri-override=KEY:VALUE,[KEY:VALUE,...]]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-backoff | --max-backoff=MAX_BACKOFF]
        [--clear-max-concurrent-tasks
          | --max-concurrent-tasks=MAX_CONCURRENT_TASKS]
        [--clear-max-doublings | --max-doublings=MAX_DOUBLINGS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [--clear-max-tasks-dispatched-per-second
          | --max-tasks-dispatched-per-second=MAX_TASKS_DISPATCHED_PER_SECOND]
        [--clear-min-backoff | --min-backoff=MIN_BACKOFF]
        [--clear-routing-override | --routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues update-app-engine-queue

```text
NAME
    gcloud alpha tasks queues update-app-engine-queue - update a Cloud Tasks
        queue

SYNOPSIS
    gcloud alpha tasks queues update-app-engine-queue QUEUE
        [--location=LOCATION]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-backoff | --max-backoff=MAX_BACKOFF]
        [--clear-max-concurrent-tasks
          | --max-concurrent-tasks=MAX_CONCURRENT_TASKS]
        [--clear-max-doublings | --max-doublings=MAX_DOUBLINGS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [--clear-max-tasks-dispatched-per-second
          | --max-tasks-dispatched-per-second=MAX_TASKS_DISPATCHED_PER_SECOND]
        [--clear-min-backoff | --min-backoff=MIN_BACKOFF]
        [--clear-routing-override | --routing-override=KEY:VALUE,[...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha tasks queues update-pull-queue

```text
NAME
    gcloud alpha tasks queues update-pull-queue - update a pull queue

SYNOPSIS
    gcloud alpha tasks queues update-pull-queue QUEUE [--location=LOCATION]
        [--clear-max-attempts | --max-attempts=MAX_ATTEMPTS]
        [--clear-max-retry-duration | --max-retry-duration=MAX_RETRY_DURATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/tasks/queues (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
