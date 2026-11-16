---
source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/create-token-auth-user
---

# gcloud redis clusters create-token-auth-user

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud redis clusters create-token-auth-user

```text
NAME
    gcloud redis clusters create-token-auth-user - create a token auth user for
        a Redis cluster

SYNOPSIS
    gcloud redis clusters create-token-auth-user (CLUSTER : --region=REGION)
        [--async] [--token-auth-user=TOKEN_AUTH_USER] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a token-auth user for a token-auth-enabled Redis cluster. An initial
    token will be generated for the user. The username and token can be used to
    authenticate a client connecting to the cluster.

EXAMPLES
    To create a new token auth user, run:

        $ gcloud redis clusters create-token-auth-user my-cluster \
            --token-auth-user=my-user --region=us-central1

POSITIONAL ARGUMENTS
     Cluster resource - Arguments and flags that specify the Memorystore Redis
     cluster to create a backup for. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CLUSTER
          ID of the cluster or fully qualified identifier for the cluster.

          To set the cluster attribute:
          + provide the argument cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Redis region of the cluster. Overrides the default
          redis/region property value for this command invocation.

          To set the region attribute:
          + provide the argument cluster on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property redis/region.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --token-auth-user=TOKEN_AUTH_USER
        The name of the token auth user to be created.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the redis/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/memorystore/docs/redis/

NOTES
    These variants are also available:

        $ gcloud alpha redis clusters create-token-auth-user

        $ gcloud beta redis clusters create-token-auth-user
```

### gcloud beta redis clusters create-token-auth-user

```text
NAME
    gcloud beta redis clusters create-token-auth-user - create a token auth
        user for a Redis cluster

SYNOPSIS
    gcloud beta redis clusters create-token-auth-user
        (CLUSTER : --region=REGION) [--async]
        [--token-auth-user=TOKEN_AUTH_USER] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha redis clusters create-token-auth-user

```text
NAME
    gcloud alpha redis clusters create-token-auth-user - create a token auth
        user for a Redis cluster

SYNOPSIS
    gcloud alpha redis clusters create-token-auth-user
        (CLUSTER : --region=REGION) [--async]
        [--token-auth-user=TOKEN_AUTH_USER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/redis/clusters/create-token-auth-user (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
