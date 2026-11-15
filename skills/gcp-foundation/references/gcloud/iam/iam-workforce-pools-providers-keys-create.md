---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/providers/keys/create
---

# gcloud iam workforce-pools providers keys create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workforce-pools providers keys create

```text
NAME
    gcloud iam workforce-pools providers keys create - create a new workforce
        pool provider key

SYNOPSIS
    gcloud iam workforce-pools providers keys create
        (KEY : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) --spec=SPEC
        --use=USE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new workforce pool provider key.

EXAMPLES
    The following command creates a workforce pool provider key with the ID
    my-key. Explicit values for all required and optional parameters are
    provided.

        $ gcloud iam workforce-pools providers keys create my-key \
            --location="global" --workforce-pool="my-workforce-pool" \
            --provider="my-provider" --use="ENCRYPTION" --spec="RSA_4096"

POSITIONAL ARGUMENTS
     Workforce pool provider key resource - The workforce pool provider key to
     create. The arguments in this group can be used to specify the attributes
     of this resource.

     This must be specified.

       KEY
          ID of the workforce pool provider key or fully qualified identifier
          for the workforce pool provider key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location for the workforce pool.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID to use for the workforce pool provider, which becomes the
          final component of the resource name. This value must be unique
          within the workforce pool, 4-32 characters in length, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workforce-pool=WORKFORCE_POOL
          The ID to use for the workforce pool, which becomes the final
          component of the resource name. This value must be a globally unique
          string of 6 to 63 lowercase letters, digits, or hyphens. It must
          start with a letter, and cannot have a trailing hyphen. The prefix
          gcp- is reserved for use by Google, and may not be specified.

          To set the workforce-pool attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --workforce-pool on the command line.

REQUIRED FLAGS
     --spec=SPEC
        The specifications for the key. SPEC must be one of:
        key-spec-unspecified, rsa-2048, rsa-3072, rsa-4096.

     --use=USE
        The purpose of the key. USE must be one of: encryption,
        key-use-unspecified, signing.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam workforce-pools providers keys create

        $ gcloud beta iam workforce-pools providers keys create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud iam workforce-pools providers keys create my-key \
    --location="global" \
    --workforce-pool="my-workforce-pool" \
    --provider="my-provider" \
    --use=encryption \
    --spec=rsa-4096
```

### gcloud beta iam workforce-pools providers keys create

```text
NAME
    gcloud beta iam workforce-pools providers keys create - create a new
        workforce pool provider key

SYNOPSIS
    gcloud beta iam workforce-pools providers keys create
        (KEY : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) --spec=SPEC
        --use=USE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam workforce-pools providers keys create

```text
NAME
    gcloud alpha iam workforce-pools providers keys create - create a new
        workforce pool provider key

SYNOPSIS
    gcloud alpha iam workforce-pools providers keys create
        (KEY : --location=LOCATION
          --provider=PROVIDER --workforce-pool=WORKFORCE_POOL) --spec=SPEC
        --use=USE [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--spec="RSA_4096"` is corrected to `--spec=rsa-4096` (the flag accepts lowercase, hyphenated values).
- Corrected from the official docs (runnable form only; the help text above is verbatim): `--use="ENCRYPTION"` is corrected to `--use=encryption` (the flag accepts lowercase values).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workforce-pools/providers/keys/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
