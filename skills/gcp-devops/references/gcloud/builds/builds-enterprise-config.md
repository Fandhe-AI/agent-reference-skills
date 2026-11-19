---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/builds/enterprise-config
---

# gcloud builds enterprise-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha builds enterprise-config bitbucketserver create

```text
NAME
    gcloud alpha builds enterprise-config bitbucketserver create - create a
        Bitbucket Server config for use by Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config bitbucketserver create
        --admin-access-token-secret-version=ADMIN_ACCESS_TOKEN_SECRET_VERSION
        --api-key=API_KEY --host-uri=HOST_URI --name=NAME
        --read-access-token-secret-version=READ_ACCESS_TOKEN_SECRET_VERSION
        --user-name=USER_NAME
        --webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION
        [--region=REGION] [--ssl-ca-file=PATH_TO_FILE]
        [--peered-network=PEERED_NETWORK
          --peered-network-ip-range=PEERED_NETWORK_IP_RANGE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config bitbucketserver delete

```text
NAME
    gcloud alpha builds enterprise-config bitbucketserver delete - delete a
        Bitbucket Server config from Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config bitbucketserver delete CONFIG
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config bitbucketserver describe

```text
NAME
    gcloud alpha builds enterprise-config bitbucketserver describe - describe a
        Bitbucket Server config in a Google Cloud project

SYNOPSIS
    gcloud alpha builds enterprise-config bitbucketserver describe CONFIG
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config bitbucketserver list

```text
NAME
    gcloud alpha builds enterprise-config bitbucketserver list - list all
        Bitbucket Server configs in a Google Cloud project

SYNOPSIS
    gcloud alpha builds enterprise-config bitbucketserver list
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config bitbucketserver update

```text
NAME
    gcloud alpha builds enterprise-config bitbucketserver update - update a
        Bitbucket Server config for use by Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config bitbucketserver update CONFIG
        [--admin-access-token-secret-version=ADMIN_ACCESS_TOKEN_SECRET_VERSION]
        [--api-key=API_KEY] [--host-uri=HOST_URI]
        [--read-access-token-secret-version=READ_ACCESS_TOKEN_SECRET_VERSION]
        [--region=REGION] [--ssl-ca-file=PATH_TO_FILE] [--user-name=USER_NAME]
        [--webhook-secret-secret-version=WEBHOOK_SECRET_SECRET_VERSION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config github create

```text
NAME
    gcloud alpha builds enterprise-config github create - create a GitHub
        Enterprise Config for use by Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config github create --app-id=APP_ID
        --host-uri=HOST_URI
        ([--gcs-bucket=GCS_BUCKET --gcs-object=GCS_OBJECT
          : --generation=GENERATION]
          | [--oauth-client-id-name=OAUTH_CLIENT_ID_NAME
          --oauth-secret-name=OAUTH_SECRET_NAME
          --private-key-name=PRIVATE_KEY_NAME
          --webhook-secret-name=WEBHOOK_SECRET_NAME
          : --oauth-client-id-version-name=OAUTH_CLIENT_ID_VERSION_NAME
          --oauth-secret-version-name=OAUTH_SECRET_VERSION_NAME
          --private-key-version-name=PRIVATE_KEY_VERSION_NAME
          --webhook-secret-version-name=WEBHOOK_SECRET_VERSION_NAME])
        [--peered-network=PEERED_NETWORK] [--webhook-key=WEBHOOK_KEY]
        [--name=NAME --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config github delete

```text
NAME
    gcloud alpha builds enterprise-config github delete - delete a github
        enterprise config from Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config github delete CONFIG
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config github describe

```text
NAME
    gcloud alpha builds enterprise-config github describe - describe a github
        enterprise config used by Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config github describe CONFIG
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config github list

```text
NAME
    gcloud alpha builds enterprise-config github list - list all github
        enterprise configs in a Google Cloud project

SYNOPSIS
    gcloud alpha builds enterprise-config github list [--region=REGION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds enterprise-config github update

```text
NAME
    gcloud alpha builds enterprise-config github update - update github
        enterprise config used by Cloud Build

SYNOPSIS
    gcloud alpha builds enterprise-config github update CONFIG
        [--app-id=APP_ID] [--host-uri=HOST_URI] [--region=REGION]
        [--webhook-key=WEBHOOK_KEY]
        [[--gcs-bucket=GCS_BUCKET --gcs-object=GCS_OBJECT
          : --generation=GENERATION]
          | [--oauth-client-id-name=OAUTH_CLIENT_ID_NAME
          --oauth-secret-name=OAUTH_SECRET_NAME
          --private-key-name=PRIVATE_KEY_NAME
          --webhook-secret-name=WEBHOOK_SECRET_NAME
          : --oauth-client-id-version-name=OAUTH_CLIENT_ID_VERSION_NAME
          --oauth-secret-version-name=OAUTH_SECRET_VERSION_NAME
          --private-key-version-name=PRIVATE_KEY_VERSION_NAME
          --webhook-secret-version-name=WEBHOOK_SECRET_VERSION_NAME]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/builds/enterprise-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
