---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/postures
---

# gcloud scc postures

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud scc postures create

```text
NAME
    gcloud scc postures create - create a Cloud Security Command Center posture

SYNOPSIS
    gcloud scc postures create
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --posture-from-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud Security Command Center (SCC) posture. First argument
    consists of the parent and name of the posture to be created. The posture
    details are provided in YAML file. The file path is mentioned in
    --posture-from-file flag.

    Created posture is returned as the response of the command. LRO operation
    ID is printed as the standard output.

EXAMPLES
    Create a posture named posture-foo-1 within parent
    organizations/123/locations/global(i.e. a posture in organization 123,
    location global, with ID posture-foo-1):

        $ gcloud scc postures create \
           organizations/123/locations/global/postures/posture-foo-1 \
           --posture-from-file=posture.yaml

POSITIONAL ARGUMENTS
     Posture resource - The name of the posture to be created. For example
     organizations/<organizationID>/locations/<location>/postures/<postureID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

REQUIRED FLAGS
     --posture-from-file=PATH_TO_FILE
        YAML file containing the body of the posture to be created. Use a full
        or relative path to a local file containing the value of posture.

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
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures create
```

### gcloud scc postures delete

```text
NAME
    gcloud scc postures delete - delete a Cloud Security Command Center posture

SYNOPSIS
    gcloud scc postures delete
        (POSTURE : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Cloud Security Command Center (SCC) posture.

    Posture with all its revisions is deleted. Deletion won't be allowed in
    case any of the versions of the posture is deployed on a workload. ETAG can
    be provided as an optional flag.

EXAMPLES
    Delete the posture named
    organizations/123/locations/global/postures/posture-foo-1 (i.e. a posture
    in organization 123, location global, with id posture-foo-1):

        $ gcloud scc postures delete \
            organizations/123/locations/global/postures/posture-foo-1

    Delete the posture named
    organizations/123/locations/global/postures/posture-foo-1 (i.e. a posture
    in organization 123, location global, with id posture-foo-1) for the ETAG
    ABcdO1Rf5clu7Yhlkwgelo7Vl4tiqd7Sy5iP5SdkSVU

        $ gcloud scc postures delete \
            organizations/123/locations/global/postures/posture-foo-1 \
            --etag=ABcdO1Rf5clu7Yhlkwgelo7Vl4tiqd7Sy5iI5SdkSVU

POSITIONAL ARGUMENTS
     Posture resource - The name of the posture to be deleted. For example
     organizations/<organizationID>/locations/<location>/postures/<postureID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        Etag is an optional flag. If the provided Etag doesn't match the server
        generated Etag, the delete operation won't proceed.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures delete
```

### gcloud scc postures describe

```text
NAME
    gcloud scc postures describe - describe a Cloud Security Command Center
        posture

SYNOPSIS
    gcloud scc postures describe
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        [--revision-id=REVISION_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud Security Command Center (SCC) posture.

    By default, the latest updated revision of the posture is described. Users
    must provide revision ID to describe a specific revision.

EXAMPLES
    Describe the latest updated revision of a posture named
    organizations/123/locations/global/postures/posture-foo-1 (i.e. a posture
    in organization 123, location global, with id posture-foo-1):

        $ gcloud scc postures describe \
            organizations/123/locations/global/postures/posture-foo-1

    Describe a specific revision abcdefg of posture named
    organizations/123/locations/global/postures/posture-foo-1:

        $ gcloud scc postures describe \
            organizations/123/locations/global/postures/posture-foo-1 \
            --revision-id=abcdefg

POSITIONAL ARGUMENTS
     Posture resource - The posture to be described. For example
     organizations/<organizationID>/locations/<location>/postures/<postureID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

FLAGS
     --revision-id=REVISION_ID
        ID of the specific posture revision to described. If not specified,
        latest revision is described.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures describe
```

### gcloud scc postures extract

```text
NAME
    gcloud scc postures extract - extract a Cloud Security Command Center
        posture from a workload

SYNOPSIS
    gcloud scc postures extract
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --workload=WORKLOAD [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Extract a Cloud Security Command Center (SCC) posture from a workload.
    First argument is the parent and name of the posture to be created. The
    workload from where the organization policies need to be extracted is
    provided via '--workload' flag.

    Extracted posture is returned as the response of the command. LRO operation
    ID is printed as the standard output.

EXAMPLES
    Extract a posture named posture-foo-1 within parent
    organizations/123/locations/global(i.e. a posture in organization 123,
    location global, with id posture-foo-1) from workload projects/456:

        $ gcloud scc postures extract \
           organizations/123/locations/global/postures/posture-foo-1 \
           --workload=projects/456

POSITIONAL ARGUMENTS
     Posture resource - The name of the posture to be created. For example
     organizations/<organizationID>/locations/<location>/postures/<postureID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

REQUIRED FLAGS
     --workload=WORKLOAD
        Workload from where policies has to be extracted into a posture. It can
        be in one of the following formats: projects/projectNumber,
        folders/folderNumber, organizations/organizationNumber.

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
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures extract
```

### gcloud scc postures list

```text
NAME
    gcloud scc postures list - lists all the Cloud Security Command Center
        postures for an organization

SYNOPSIS
    gcloud scc postures list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all the Cloud Security Command Center postures for an organization.

EXAMPLES
    To list all the Cloud Security Command Center postures for an organization
    123 and in the global location, run:

        $ gcloud scc postures list organizations/123/locations/global

        $ gcloud scc postures list --organization=123 --location=global

POSITIONAL ARGUMENTS
     Exactly one of these must be specified:

       [PARENT]
          Parent the Cloud Security Command Center postures belongs to.
          Formatted as organizations/<organizationID>/locations/<location>.

       Or at least one of these can be specified:

         Specify organization and location using flags.

         --location=LOCATION
            When data residency controls are enabled, this attribute specifies
            the location in which the resource is located and applicable.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --organization=ORGANIZATION
            The organization ID (e.g., 123) that contains the resource.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures list
```

### gcloud scc postures list-revisions

```text
NAME
    gcloud scc postures list-revisions - list the revisions of a Cloud Security
        Command Center posture

SYNOPSIS
    gcloud scc postures list-revisions
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the revisions of a Cloud Security Command Center (SCC) posture.

EXAMPLES
    To list Cloud Security Command Center posture revisions for posture
    organizations/123/locations/global/postures/posture123 , run:

        $ gcloud scc postures list-revisions \
            organizations/123/locations/global/postures/posture123

POSITIONAL ARGUMENTS
     Posture resource - The posture whose revisions are to be listed. For
     example
     organizations/<organizationID>/locations/<location>/postures/<postureID>.
     The arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures list-revisions
```

### gcloud scc postures update

```text
NAME
    gcloud scc postures update - update the given Cloud Security Command Center
        posture

SYNOPSIS
    gcloud scc postures update
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --posture-from-file=PATH_TO_FILE --revision-id=REVISION_ID [--async]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Cloud Security Command Center (SCC) posture.

    Fields specified in update-mask flag are updated. Updatable fields are
    state, description and policy_sets. State of the posture can't be updated
    along with update of other fields. An empty or "" as field mask will result
    in update of policy_sets and description. In case of the update of
    policy_sets, the value mentioned in the update posture request overwrites
    the exisiting value of policy_sets.

    Valid state transitions are: a) ACTIVE to DRAFT b) ACTIVE to DEPRECATED c)
    DRAFT to ACTIVE d) DEPRECATED to ACTIVE

    The update operation will result in the update of the revision-id specified
    in the request, unless the posture revision is currently deployed on a
    workload. A new revision is created for an already deployed posture
    revision.

EXAMPLES
    Update the revision-id abcdefgh of the posture named foo-posture in the
    organization organizations/123/locations/global: Change State to ACTIVE.        $ gcloud scc postures update \
            organizations/123/locations/global/postures/foo-posture \
            --posture-from-file=update_posture.yaml --revision-id=abcdefgh \
            update_mask=state

        Contents of update_posture.yaml are |
            name: organizations/123/locations/global/postures/foo-posture
            state: ACTIVE

    Update the revision-id abcdefgh of the posture named foo-posture in the
    organization organizations/123/locations/global: Change description and
    policy_sets to the values mentioned in update_posture.yaml        $ gcloud scc postures update \
            organizations/123/locations/global/postures/foo-posture \
            --posture-from-file=update_posture.yaml --revision-id=abcdefgh \
            update_mask=description,policy_sets

        Contents of update_posture.yaml are |
            name: organizations/123/locations/global/postures/foo-posture
            description: updated description
            policy_sets:
            - policy_set_id: newPolicySet1
              policies:
                - policy_id: newPolicy
                  constraint:
                    org_policy_canned_constraint:
                      canned_constraint_id: storage.uniformBucketLevelAccess
                      policy_rules:
                        enforce: false
            - policy_set_id: PolicySet2
              policies:
                - policy_id: Policy3
                  constraint:
                    org_policy_custom_constraint:
                      custom_constraint:
                        name: organizations/9454078371/customConstraints/custom.newConstraint
                        resource_types: container.$$UNIVERSE_DOMAIN$$/NodePool
                        method_types: UPDATE
                        condition: resource.management.autoUpgrade == false
                        action_type: ALLOW
                      policy_rules:
                        enforce: true

POSITIONAL ARGUMENTS
     Posture resource - Arguments and flags that specify the Posture instance
     to be updated. The arguments in this group can be used to specify the
     attributes of this resource.

     This must be specified.

       POSTURE
          ID of the posture or fully qualified identifier for the posture.

          To set the posture attribute:
          + provide the argument posture on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          ID of the location where the resource exists (for example, global).

          To set the location attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          ID of the organization which is the parent of the resource.

          To set the organization attribute:
          + provide the argument posture on the command line with a fully
            specified name;
          + provide the argument --organization on the command line.

REQUIRED FLAGS
     --posture-from-file=PATH_TO_FILE
        Path of the file containing the details of the field to be updated.
        Contents include the name of the posture to be updated and value of the
        fields to be updated. Use a full or relative path to a local file
        containing the value of posture.

     --revision-id=REVISION_ID
        Revision ID of the posture to be updated. The same revision ID will be
        updated in case the posture revision is not deployed on any workload. A
        new revision will be created for a deployed posture.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --update-mask=UPDATE_MASK
        Comma separated string containing list of fields to be updated.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the securityposture/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/security-command-center

NOTES
    This variant is also available:

        $ gcloud alpha scc postures update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud scc postures update organizations/123/locations/global/postures/foo-posture \
    --posture-from-file=update_posture.yaml \
    --revision-id=abcdefgh \
    --update-mask=state

gcloud scc postures update organizations/123/locations/global/postures/foo-posture \
    --posture-from-file=update_posture.yaml \
    --revision-id=abcdefgh \
    --update-mask=description,policy_sets
```

### gcloud alpha scc postures create

```text
NAME
    gcloud alpha scc postures create - create a Cloud Security Command Center
        posture

SYNOPSIS
    gcloud alpha scc postures create
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --posture-from-file=PATH_TO_FILE [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures delete

```text
NAME
    gcloud alpha scc postures delete - delete a Cloud Security Command Center
        posture

SYNOPSIS
    gcloud alpha scc postures delete
        (POSTURE : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures describe

```text
NAME
    gcloud alpha scc postures describe - describe a Cloud Security Command
        Center posture

SYNOPSIS
    gcloud alpha scc postures describe
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        [--revision-id=REVISION_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures extract

```text
NAME
    gcloud alpha scc postures extract - extract a Cloud Security Command Center
        posture from a workload

SYNOPSIS
    gcloud alpha scc postures extract
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --workload=WORKLOAD [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures list

```text
NAME
    gcloud alpha scc postures list - lists all the Cloud Security Command
        Center postures for an organization

SYNOPSIS
    gcloud alpha scc postures list
        ([PARENT] --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures list-revisions

```text
NAME
    gcloud alpha scc postures list-revisions - list the revisions of a Cloud
        Security Command Center posture

SYNOPSIS
    gcloud alpha scc postures list-revisions
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc postures update

```text
NAME
    gcloud alpha scc postures update - update the given Cloud Security Command
        Center posture

SYNOPSIS
    gcloud alpha scc postures update
        (POSTURE : --location=LOCATION --organization=ORGANIZATION)
        --posture-from-file=PATH_TO_FILE --revision-id=REVISION_ID [--async]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `update` examples end with `update_mask=state` and `update_mask=description,policy_sets` as positional arguments (gcloud 593.0.0: "unrecognized arguments: update_mask=state (did you mean '--update-mask'?)"); the SYNOPSIS lists `[--update-mask=UPDATE_MASK]`, so the runnable form passes `--update-mask=...`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the two `update` examples put `$ gcloud` on the same line as the preceding sentence; the runnable form starts each command on its own line.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/postures (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
