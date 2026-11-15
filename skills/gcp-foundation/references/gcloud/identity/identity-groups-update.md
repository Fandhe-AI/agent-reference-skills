---
source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/update
---

# gcloud identity groups update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud identity groups update

```text
NAME
    gcloud identity groups update - update a group

SYNOPSIS
    gcloud identity groups update EMAIL
        [--dynamic-user-query=DYNAMIC_USER_QUERY] [--labels=LABELS]
        [--clear-description | --description=DESCRIPTION]
        [--clear-display-name | --display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a group.

EXAMPLES
    To update a group:

        $ gcloud identity groups update eng-discuss@foo.com \
            --display-name="New Engineer Discuss" \
            --description="Group for engineering discussions"

POSITIONAL ARGUMENTS
     EMAIL
        The email address of the group to be updated.

FLAGS
     --dynamic-user-query=DYNAMIC_USER_QUERY
        Query that determines the memberships of the dynamic group.

        Example of a query:
        --dynamic-user-query="user.organizations.exists(org,org.title=='SWE')"

     --labels=LABELS
        One or more label entries that apply to the group. Currently supported
        labels contain a key with an empty value.

        Google Groups are the default type of group and have a label with a key
        of 'cloudidentity.googleapis.com/groups.discussion_forum' and an empty
        value.

        Existing Google Groups can have an additional label with a key of
        'cloudidentity.googleapis.com/groups.security' and an empty value added
        to them. This is an immutable change and the security label cannot be
        removed once added.

        Dynamic groups have a label with a key of
        'cloudidentity.googleapis.com/groups.dynamic'.

        Identity-mapped groups for Cloud Search have a label with a key of
        'system/groups/external' and an empty value.

        Examples: {"cloudidentity.googleapis.com/groups.discussion_forum": ""}
        or {"system/groups/external": ""}.

     At most one of these can be specified:

       --clear-description
          Clear existing description on group being updated.

       --description=DESCRIPTION
          Replace existing description on group being updated.

     At most one of these can be specified:

       --clear-display-name
          Clear existing display name on group being updated.

       --display-name=DISPLAY_NAME
          Replace existing display name on group being updated.

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

        $ gcloud alpha identity groups update

        $ gcloud beta identity groups update
```

### gcloud beta identity groups update

```text
NAME
    gcloud beta identity groups update - update a group

SYNOPSIS
    gcloud beta identity groups update EMAIL
        [--dynamic-user-query=DYNAMIC_USER_QUERY] [--labels=LABELS]
        [--clear-posix-groups | --remove-posix-groups=[POSIX_GROUP,...]]
        [--clear-description | --description=DESCRIPTION]
        [--clear-display-name | --display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups update

```text
NAME
    gcloud alpha identity groups update - update a group

SYNOPSIS
    gcloud alpha identity groups update EMAIL
        [--dynamic-user-query=DYNAMIC_USER_QUERY]
        [--clear-posix-groups | --remove-posix-groups=[POSIX_GROUP,...]]
        [--clear-description | --description=DESCRIPTION]
        [--clear-display-name | --display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/identity/groups/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
