---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/replace-all
---

# gcloud access-context-manager perimeters replace-all

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-context-manager perimeters replace-all

```text
NAME
    gcloud access-context-manager perimeters replace-all - replace all existing
        service perimeters

SYNOPSIS
    gcloud access-context-manager perimeters replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replace all existing service perimeter in specified access policy with
    service perimeters specified in a file.

EXAMPLES
    To replace all perimeters within a policy, using etag:

        $ gcloud access-context-manager perimeters replace-all \
            my-policy-number \
            --source-file=path-to-file-containing-all-replacement-service-pe\
        rimeters.yaml --etag=optional-latest-etag-of-policy

    To replace all perimeters within a policy, without using etag:

        $ gcloud access-context-manager perimeters replace-all \
            my-policy-number \
            --source-file=path-to-file-containing-all-replacement-service-pe\
        rimeters.yaml

POSITIONAL ARGUMENTS
     Policy resource - The access policy that contains the perimeters you want
     to replace. This represents a Cloud resource.

     [POLICY]
        ID of the policy or fully qualified identifier for the policy.

        To set the policy attribute:
        * provide the argument policy on the command line;
        * set the property access_context_manager/policy;
        * automatically, if the current account belongs to an organization
          with exactly one access policy..

REQUIRED FLAGS
     --source-file=SOURCE_FILE
        Path to a file containing a list of service perimeters.

        An service perimeter file is a YAML-formatted list of service
        perimeters, which are YAML objects representing a Condition as
        described in the API reference. For example:

            - name: my_perimeter
              title: My Perimeter
              description: Perimeter for foo.
              perimeterType: PERIMETER_TYPE_REGULAR
              status:
                resources:
                - projects/0123456789
                accessLevels:
                - accessPolicies/my_policy/accessLevels/my_level
                restrictedServices:
                - storage.googleapis.com

        For more information about the alpha version, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1alpha/accessPolicies.servicePerimeters
        For other versions, see:
        https://cloud.google.com/access-context-manager/docs/reference/rest/v1/accessPolicies.servicePerimeters

OPTIONAL FLAGS
     --etag=ETAG
        An etag which specifies the version of the Access Policy. Only etags
        that represent the latest version of the Access Policy will be
        accepted.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the accesscontextmanager/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/access-context-manager/docs/reference/rest/

NOTES
    These variants are also available:

        $ gcloud alpha access-context-manager perimeters replace-all

        $ gcloud beta access-context-manager perimeters replace-all
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud access-context-manager perimeters replace-all my-policy-number \
    --source-file=path-to-file-containing-all-replacement-service-perimeters.yaml \
    --etag=optional-latest-etag-of-policy

gcloud access-context-manager perimeters replace-all my-policy-number \
    --source-file=path-to-file-containing-all-replacement-service-perimeters.yaml
```

### gcloud beta access-context-manager perimeters replace-all

```text
NAME
    gcloud beta access-context-manager perimeters replace-all - replace all
        existing service perimeters

SYNOPSIS
    gcloud beta access-context-manager perimeters replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-context-manager perimeters replace-all

```text
NAME
    gcloud alpha access-context-manager perimeters replace-all - replace all
        existing service perimeters

SYNOPSIS
    gcloud alpha access-context-manager perimeters replace-all [POLICY]
        --source-file=SOURCE_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-context-manager/perimeters/replace-all (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
