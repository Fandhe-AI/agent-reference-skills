---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/add-iam-policy-binding
---

# gcloud data-catalog tag-templates add-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog tag-templates add-iam-policy-binding

```text
NAME
    gcloud data-catalog tag-templates add-iam-policy-binding - add IAM policy
        binding to a Data Catalog tag template

SYNOPSIS
    gcloud data-catalog tag-templates add-iam-policy-binding
        (TAG_TEMPLATE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    (DEPRECATED) This command is deprecated. Please use gcloud dataplex
    aspect-types instead.

    Add IAM policy binding to a Data Catalog tag template.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/editor' for the user
    'test-user@gmail.com' with tag template 'my-tag-template' and location
    'us-central1', run:

        $ gcloud data-catalog tag-templates add-iam-policy-binding \
            my-tag-template --location='us-central1' \
            --member='user:test-user@gmail.com' --role='roles/editor'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Tag template resource - Tag template for which to add IAM policy binding
     to. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument tag_template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TAG_TEMPLATE
          ID of the tag template or fully qualified identifier for the tag
          template.

          To set the tag_template attribute:
          + provide the argument tag_template on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the tag template.

          To set the location attribute:
          + provide the argument tag_template on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

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

        $ gcloud alpha data-catalog tag-templates add-iam-policy-binding

        $ gcloud beta data-catalog tag-templates add-iam-policy-binding
```

### gcloud beta data-catalog tag-templates add-iam-policy-binding

```text
NAME
    gcloud beta data-catalog tag-templates add-iam-policy-binding - add IAM
        policy binding to a Data Catalog tag template

SYNOPSIS
    gcloud beta data-catalog tag-templates add-iam-policy-binding
        (TAG_TEMPLATE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog tag-templates add-iam-policy-binding

```text
NAME
    gcloud alpha data-catalog tag-templates add-iam-policy-binding - add IAM
        policy binding to a Data Catalog tag template

SYNOPSIS
    gcloud alpha data-catalog tag-templates add-iam-policy-binding
        (TAG_TEMPLATE : --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud data-catalog tag-templates add-iam-policy-binding`: "This command is deprecated. Please use gcloud dataplex aspect-types instead.".
- Deprecated: the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19). The commands on this page belong to the deprecated metadata search and cataloging features; they are still in the gcloud 593.0.0 help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/tag-templates/add-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
