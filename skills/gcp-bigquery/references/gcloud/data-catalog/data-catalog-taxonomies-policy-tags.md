---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/policy-tags
---

# gcloud data-catalog taxonomies policy-tags

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog taxonomies policy-tags add-iam-policy-binding

```text
NAME
    gcloud data-catalog taxonomies policy-tags add-iam-policy-binding - add an
        IAM policy binding to a Data Catalog policy tag

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags add-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an IAM policy binding to a Data Catalog policy tag.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with policy tag 'POLICY_TAG' in location 'LOCATION'
    and taxonomy 'TAXONOMY', run:

        $ gcloud data-catalog taxonomies policy-tags \
            add-iam-policy-binding POLICY_TAG --location='LOCATION' \
            --taxonomy='TAXONOMY' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Policy tag resource - Policy tag for which to add an IAM policy binding.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_tag on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_TAG
          ID of the policy tag or fully qualified identifier for the policy
          tag.

          To set the policy_tag attribute:
          + provide the argument policy_tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the policy tag.

          To set the location attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --taxonomy=TAXONOMY
          Taxonomy of the policy tag.

          To set the taxonomy attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --taxonomy on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags \
            add-iam-policy-binding

        $ gcloud beta data-catalog taxonomies policy-tags \
            add-iam-policy-binding
```

### gcloud data-catalog taxonomies policy-tags describe

```text
NAME
    gcloud data-catalog taxonomies policy-tags describe - describe a Policy Tag
        Manager Policy tag

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags describe
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Policy Tag Manager Policy tag.

EXAMPLES
    To describe the Policy Tag 'POLICY_TAG' in the taxonomy 'TAXONOMY', run:

        $ gcloud data-catalog taxonomies policy-tags describe POLICY_TAG \
            --taxonomy='TAXONOMY' --location='LOCATION'

POSITIONAL ARGUMENTS
     Policy tag resource - Policy tag to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument policy_tag on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_TAG
          ID of the policy tag or fully qualified identifier for the policy
          tag.

          To set the policy_tag attribute:
          + provide the argument policy_tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the policy tag.

          To set the location attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --taxonomy=TAXONOMY
          Taxonomy of the policy tag.

          To set the taxonomy attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --taxonomy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags describe

        $ gcloud beta data-catalog taxonomies policy-tags describe
```

### gcloud data-catalog taxonomies policy-tags get-iam-policy

```text
NAME
    gcloud data-catalog taxonomies policy-tags get-iam-policy - get the IAM
        policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags get-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud data-catalog taxonomies policy-tags get-iam-policy displays the IAM
    policy associated with a Data Catalog Policy Tag. If formatted as JSON, the
    output can be edited and used as a policy file for set-iam-policy. The
    output includes an "etag" field identifying the version emitted and
    allowing detection of concurrent policy updates; see $ gcloud data-catalog
    taxonomies policy-tags set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for 'POLICY_TAG' in 'LOCATION' and 'TAXONOMY', run:

        $ gcloud data-catalog taxonomies policy-tags get-iam-policy \
            POLICY_TAG --taxonomy='TAXONOMY' --location='LOCATION'

POSITIONAL ARGUMENTS
     Policy tag resource - Policy tag for which to display the IAM policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_tag on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_TAG
          ID of the policy tag or fully qualified identifier for the policy
          tag.

          To set the policy_tag attribute:
          + provide the argument policy_tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the policy tag.

          To set the location attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --taxonomy=TAXONOMY
          Taxonomy of the policy tag.

          To set the taxonomy attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --taxonomy on the command line.

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
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags get-iam-policy

        $ gcloud beta data-catalog taxonomies policy-tags get-iam-policy
```

### gcloud data-catalog taxonomies policy-tags list

```text
NAME
    gcloud data-catalog taxonomies policy-tags list - list Cloud Policy Tag
        Manager policy tags

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags list
        (--taxonomy=TAXONOMY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Cloud Policy Tag Manager policy tags.

EXAMPLES
    List the policy tags for a Cloud Policy Tag Manager taxonomy 'TAXONOMY':

        $ gcloud data-catalog taxonomies policy-tags list \
            --taxonomy='TAXONOMY' --location='LOCATION'

REQUIRED FLAGS
     Taxonomy resource - Policy Tag Manager Taxonomy in which to list policy
     tags. The arguments in this group can be used to specify the attributes of
     this resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --taxonomy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --taxonomy=TAXONOMY
          ID of the taxonomy or fully qualified identifier for the taxonomy.

          To set the taxonomy attribute:
          + provide the argument --taxonomy on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the taxonomy.

          To set the location attribute:
          + provide the argument --taxonomy on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags list

        $ gcloud beta data-catalog taxonomies policy-tags list
```

### gcloud data-catalog taxonomies policy-tags remove-iam-policy-binding

```text
NAME
    gcloud data-catalog taxonomies policy-tags remove-iam-policy-binding -
        remove an IAM policy binding from a Data Catalog policy tag

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags remove-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove an IAM policy binding from a Data Catalog policy tag.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' on policy tag 'POLICY_TAG' in location 'LOCATION' and
    taxonomy 'TAXONOMY', run:

        $ gcloud data-catalog taxonomies policy-tags \
            remove-iam-policy-binding POLICY_TAG --location='LOCATION' \
            --taxonomy='TAXONOMY' --member='user:test-user@gmail.com' \
            --role='roles/editor'

    To remove an IAM policy binding for the role of 'roles/editor' from all
    authenticated users on policy tag 'POLICY_TAG' in location 'LOCATION' and
    taxonomy 'TAXONOMY', run:

        $ gcloud data-catalog taxonomies policy-tags \
            remove-iam-policy-binding POLICY_TAG --location='LOCATION' \
            --taxonomy='TAXONOMY' --member='allAuthenticatedUsers' \
            --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Policy tag resource - Policy tag from which to remove the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument policy_tag on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_TAG
          ID of the policy tag or fully qualified identifier for the policy
          tag.

          To set the policy_tag attribute:
          + provide the argument policy_tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the policy tag.

          To set the location attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --taxonomy=TAXONOMY
          Taxonomy of the policy tag.

          To set the taxonomy attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --taxonomy on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags \
            remove-iam-policy-binding

        $ gcloud beta data-catalog taxonomies policy-tags \
            remove-iam-policy-binding
```

### gcloud data-catalog taxonomies policy-tags set-iam-policy

```text
NAME
    gcloud data-catalog taxonomies policy-tags set-iam-policy - set the IAM
        policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud data-catalog taxonomies policy-tags set-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Set the IAM policy for the given Data Catalog Policy Tag as defined in a
    JSON or YAML file.

EXAMPLES
    The following command will read am IAM policy defined in a JSON file
    'policy.json' and set it for the Policy Tag 'POLICY_TAG' with location
    'LOCATION' in the taxonomy 'TAXONOMY':

        $ gcloud data-catalog taxonomies policy-tags set-iam-policy \
            POLICY_TAG --location=LOCATION --taxonomy=TAXONOMY policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Policy tag resource - Policy tag for which to set the IAM policy. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy_tag on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY_TAG
          ID of the policy tag or fully qualified identifier for the policy
          tag.

          To set the policy_tag attribute:
          + provide the argument policy_tag on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the policy tag.

          To set the location attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --taxonomy=TAXONOMY
          Taxonomy of the policy tag.

          To set the taxonomy attribute:
          + provide the argument policy_tag on the command line with a fully
            specified name;
          + provide the argument --taxonomy on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the datacatalog/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/data-catalog/docs/

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies policy-tags set-iam-policy

        $ gcloud beta data-catalog taxonomies policy-tags set-iam-policy
```

### gcloud beta data-catalog taxonomies policy-tags add-iam-policy-binding

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags add-iam-policy-binding -
        add an IAM policy binding to a Data Catalog policy tag

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags add-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog taxonomies policy-tags describe

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags describe - describe a
        Policy Tag Manager Policy tag

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags describe
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog taxonomies policy-tags get-iam-policy

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags get-iam-policy - get the
        IAM policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags get-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog taxonomies policy-tags list

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags list - list Cloud Policy
        Tag Manager policy tags

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags list
        (--taxonomy=TAXONOMY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog taxonomies policy-tags remove-iam-policy-binding

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags remove-iam-policy-binding -
        remove an IAM policy binding from a Data Catalog policy tag

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags remove-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta data-catalog taxonomies policy-tags set-iam-policy

```text
NAME
    gcloud beta data-catalog taxonomies policy-tags set-iam-policy - set the
        IAM policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud beta data-catalog taxonomies policy-tags set-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags add-iam-policy-binding

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags add-iam-policy-binding -
        add an IAM policy binding to a Data Catalog policy tag

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags add-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags describe

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags describe - describe a
        Policy Tag Manager Policy tag

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags describe
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags get-iam-policy

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags get-iam-policy - get the
        IAM policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags get-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags list

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags list - list Cloud Policy
        Tag Manager policy tags

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags list
        (--taxonomy=TAXONOMY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags remove-iam-policy-binding

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags remove-iam-policy-binding
        - remove an IAM policy binding from a Data Catalog policy tag

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags remove-iam-policy-binding
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY)
        --member=PRINCIPAL --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies policy-tags set-iam-policy

```text
NAME
    gcloud alpha data-catalog taxonomies policy-tags set-iam-policy - set the
        IAM policy for a Data Catalog Policy Tag

SYNOPSIS
    gcloud alpha data-catalog taxonomies policy-tags set-iam-policy
        (POLICY_TAG : --location=LOCATION --taxonomy=TAXONOMY) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Not deprecated: the commands on this page manage Policy Tag Manager taxonomies and policy tags; the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/policy-tags (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
