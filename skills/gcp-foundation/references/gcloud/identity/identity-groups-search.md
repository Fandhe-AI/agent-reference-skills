---
source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/search
---

# gcloud identity groups search

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud identity groups search

```text
NAME
    gcloud identity groups search - searches for Groups matching a specified
        query

SYNOPSIS
    gcloud identity groups search --labels=LABELS
        (--customer=CUSTOMER | --organization=ORGANIZATION)
        [--page-size=PAGE_SIZE] [--page-token=PAGE_TOKEN]
        [--view=VIEW; default="basic"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Searches for Groups matching a specified query.

EXAMPLES
    To Search groups:

        $ gcloud identity groups search --organization="5149234212" \
            --labels="cloudidentity.googleapis.com/groups.discussion_forum" \
        --page-size=3 --page-token="ala9glealanal908"

REQUIRED FLAGS
     --labels=LABELS
        One or more label entries that apply to the Group. Currently supported
        labels contain a key with an empty value.

        Google Groups are the default type of group and have a label with a key
        of 'cloudidentity.googleapis.com/groups.discussion_forum' and an empty
        value.

        Existing Google Groups can have an additional label with a key of
        'cloudidentity.googleapis.com/groups.security' and an empty value added
        to them. This is an immutable change and the security label cannot be
        removed once added.

        POSIX groups have a label with a key of
        'cloudidentity.googleapis.com/groups.posix'.

        Dynamic groups have a label with a key of
        'cloudidentity.googleapis.com/groups.dynamic'.

        Identity-mapped groups for Cloud Search have a label with a key of
        'system/groups/external' and an empty value.

        Examples: {"cloudidentity.googleapis.com/groups.discussion_forum": ""}
        or {"system/groups/external": ""}.

     Exactly one of these must be specified:

       --customer=CUSTOMER
          The customer ID for the customer's G Suite account. Example of
          customer: "C01k1e9nw"

       --organization=ORGANIZATION
          The organization ID for the groups being searched.

OPTIONAL FLAGS
     --page-size=PAGE_SIZE
        The maximum number of results to return.

        Note that the number of results returned may be less than this value
        even if there are more available results. To fetch all results, clients
        must continue calling this method repeatedly until the response no
        longer contains a nextPageToken.

        If unspecified, defaults to 200 'basic' view and to 50 for 'full' view.

        Must not be greater than 1000 for 'basic' view or 500 for 'full' view.

     --page-token=PAGE_TOKEN
        The nextPageToken value returned from a previous search request, if
        any.

     --view=VIEW; default="basic"
        The level of detail to be returned. There are two possible views:
        'basic' and 'full'. If unspecified, default to 'basic'. VIEW must be
        one of:

         basic
            Default. Only basic group information is returned.

         full
            All group information is returned.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudidentity/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/identity/

NOTES
    These variants are also available:

        $ gcloud alpha identity groups search

        $ gcloud beta identity groups search
```

### gcloud beta identity groups search

```text
NAME
    gcloud beta identity groups search - searches for Groups matching a
        specified query

SYNOPSIS
    gcloud beta identity groups search --labels=LABELS
        --organization=ORGANIZATION [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [--view=VIEW; default="basic"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups search

```text
NAME
    gcloud alpha identity groups search - searches for Groups matching a
        specified query

SYNOPSIS
    gcloud alpha identity groups search --labels=LABELS
        --organization=ORGANIZATION [--page-size=PAGE_SIZE]
        [--page-token=PAGE_TOKEN] [--view=VIEW; default="basic"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/search (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
