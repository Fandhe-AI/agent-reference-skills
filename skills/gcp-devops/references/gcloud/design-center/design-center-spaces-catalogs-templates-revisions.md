---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/revisions
---

# gcloud design-center spaces catalogs templates revisions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs templates revisions create

```text
NAME
    gcloud design-center spaces catalogs templates revisions create - create a
        new catalog template revision

SYNOPSIS
    gcloud design-center spaces catalogs templates revisions create
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE)
        (--application-template-revision-source=APPLICATION_TEMPLATE_REVISION_SOURCE | --gcs-source-uri=GCS_SOURCE_URI | --developer-connect-repo=DEVELOPER_CONNECT_REPO --developer-connect-repo-dir=DEVELOPER_CONNECT_REPO_DIR --developer-connect-repo-ref=DEVELOPER_CONNECT_REPO_REF | [--git-source-ref-tag=GIT_SOURCE_REF_TAG --git-source-repo=GIT_SOURCE_REPO : --git-source-dir=GIT_SOURCE_DIR] | [--oci-repo-uri=OCI_REPO_URI : --oci-repo-version=OCI_REPO_VERSION])
        [--async] [--description=DESCRIPTION] [--metadata=METADATA]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new catalog template revision.

EXAMPLES
    To create a new catalog template revision named my-revision for the
    template my-template, within the catalog my-catalog and space my-space, in
    location us-central1 and project my-project, using a Developer Connect
    repository as the source, run:

        $ gcloud design-center spaces catalogs templates revisions create \
             my-revision --project=my-project --location=us-central1 \
             --space=my-space --catalog=my-catalog --template=my-template \
             --description="My test revision description" \
             --developer-connect-repo=projects/my-project/locations/\
         us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
             --developer-connect-repo-ref=refs/tags/v1.0.0 \
             --developer-connect-repo-dir=modules/my-product

        Or run using the full resource name:

        $ gcloud design-center spaces catalogs templates revisions create \
           projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/templates/my-template/revisions/my-revision \
            --description="My test revision description" \
            --developer-connect-repo=projects/my-project/locations/\
        us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
            --developer-connect-repo-ref=refs/tags/v1.0.0 \
            --developer-connect-repo-dir=modules/my-product

        To create a revision using a metadata file from a local path, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --developer-connect-repo=projects/my-project/locations/\
        us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
            --developer-connect-repo-ref=refs/tags/v1.0.0 \
            --developer-connect-repo-dir=modules/my-product \
            --metadata=/path/to/metadata.yaml

        To create a revision using a Git repository as the source, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --git-source-repo=GoogleCloudPlatform/\
        terraform-google-cloud-run --git-source-ref-tag=v1.0.0 \
            --git-source-dir=modules/my-product

        To create a revision using a Google Cloud Storage URI as the source, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --gcs-source-uri=gs://my-bucket/my-template

        To create a revision using an OCI repository as the source, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --oci-repo-uri=oci://us-west1-docker.pkg.dev/my-project/\
        my-repo/my-chart --oci-repo-version=1.0.0

        To create a revision using an Application Template Revision as the source, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --application-template-revision-source=projects/my-project/\
        locations/us-central1/spaces/my-space/applicationTemplates/\
        my-app-template/revisions/a1

        To create a revision using Git source and a metadata file from a local path, run:

        $ gcloud design-center spaces catalogs templates revisions create \
           my-revision --project=my-project --location=us-central1 \
           --space=my-space --catalog=my-catalog --template=my-template \
           --git-source-repo=GoogleCloudPlatform/\
        terraform-google-cloud-run --git-source-ref-tag=v1.0.0 \
            --git-source-dir=modules/my-product \
            --metadata=/path/to/metadata.yaml

POSITIONAL ARGUMENTS
     Revision resource - The revision to create. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument revision on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The ID of the catalog.

          To set the catalog attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The Cloud location for the revision.

          To set the location attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The ID of the space.

          To set the space attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

       --template=TEMPLATE
          The ID of the template.

          To set the template attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --template on the command line.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --application-template-revision-source=APPLICATION_TEMPLATE_REVISION_SOURCE
          Application template revision to use as source. Example:
          projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/templates/my-template/revisions/r1

       --gcs-source-uri=GCS_SOURCE_URI
          Google Cloud Storage URI for source. Example:
          gs://my-bucket/my-template.

       Or at least one of these can be specified:

         Flags for Developer Connect source.

         --developer-connect-repo=DEVELOPER_CONNECT_REPO
            The Developer Connect repository to use as a source. Example:
            projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-repo

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --developer-connect-repo-dir=DEVELOPER_CONNECT_REPO_DIR
            The directory within the repository to use. Example:
            "modules/my-product"

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --developer-connect-repo-ref=DEVELOPER_CONNECT_REPO_REF
            The Git ref (branch or tag) within the repository to use. Example:
            "refs/tags/v1.0.0" or "refs/heads/main" or
            "refs/commits/269b518b99d06b31ff938a2d182e75f5e41941c7".

            This flag argument must be specified if any of the other arguments
            in this group are specified.

       Or at least one of these can be specified:

         Flags for Git source.

         --git-source-ref-tag=GIT_SOURCE_REF_TAG
            Git reference tag for Git source. Example: "v1.0.0"

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --git-source-repo=GIT_SOURCE_REPO
            Git repository for Git source. Example:
            GoogleCloudPlatform/terraform-google-cloud-run

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --git-source-dir=GIT_SOURCE_DIR
            Git directory for Git source. Example: "modules/my-product". This
            field is optional.

       Or at least one of these can be specified:

         Flags for OCI Repo source.

         --oci-repo-uri=OCI_REPO_URI
            OCI Repo URI for OCI Repo source. Example:
            oci://us-west1-docker.pkg.dev/my-project/my-repo/my-chart

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --oci-repo-version=OCI_REPO_VERSION
            OCI Repo version for OCI Repo source. Example: "1.0.0". This field
            is optional.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        A description for the revision.

     --metadata=METADATA
        Path to a local YAML file containing the template metadata. Example:
        "path/to/metadata.yaml".

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1alpha API. The full documentation for
    this API can be found at:
    http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs templates revisions \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --description="My test revision description" \
    --developer-connect-repo=projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
    --developer-connect-repo-ref=refs/tags/v1.0.0 \
    --developer-connect-repo-dir=modules/my-product

gcloud design-center spaces catalogs templates revisions create projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/templates/my-template/revisions/my-revision \
    --description="My test revision description" \
    --developer-connect-repo=projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
    --developer-connect-repo-ref=refs/tags/v1.0.0 \
    --developer-connect-repo-dir=modules/my-product

gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --developer-connect-repo=projects/my-project/locations/us-central1/connections/my-connection/gitRepositoryLinks/my-repo \
    --developer-connect-repo-ref=refs/tags/v1.0.0 \
    --developer-connect-repo-dir=modules/my-product \
    --metadata=/path/to/metadata.yaml

gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --git-source-repo=GoogleCloudPlatform/terraform-google-cloud-run \
    --git-source-ref-tag=v1.0.0 \
    --git-source-dir=modules/my-product

gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --oci-repo-uri=oci://us-west1-docker.pkg.dev/my-project/my-repo/my-chart \
    --oci-repo-version=1.0.0

gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --application-template-revision-source=projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/revisions/a1

gcloud design-center spaces catalogs templates revisions create my-revision \
    --project=my-project \
    --location=us-central1 \
    --space=my-space \
    --catalog=my-catalog \
    --template=my-template \
    --git-source-repo=GoogleCloudPlatform/terraform-google-cloud-run \
    --git-source-ref-tag=v1.0.0 \
    --git-source-dir=modules/my-product \
    --metadata=/path/to/metadata.yaml
```

### gcloud design-center spaces catalogs templates revisions delete

```text
NAME
    gcloud design-center spaces catalogs templates revisions delete - delete a
        catalog template revision

SYNOPSIS
    gcloud design-center spaces catalogs templates revisions delete
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a catalog template revision.

EXAMPLES
    To delete the catalog template revision my-revision in template
    my-template, catalog my-catalog, space my-space, project my-project and
    location us-central1, run:

        $ gcloud design-center spaces catalogs templates revisions delete \
            my-revision --template=my-template --catalog=my-catalog \
            --space=my-space --project=my-project --location=us-central1

    Or run:

        $ gcloud design-center spaces catalogs templates revisions delete \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/templates/my-template/revisions/my-revision

    To delete the catalog template revision my-revision in template
    my-template, catalog my-catalog, space my-space, project my-project and
    location us-central1 asynchronously, run:

        $ gcloud design-center spaces catalogs templates revisions delete \
            my-revision --template=my-template --catalog=my-catalog \
            --space=my-space --location=us-central1 --async

POSITIONAL ARGUMENTS
     Revision resource - The template revision name. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument revision on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The catalog id of the revision resource.

          To set the catalog attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The location id of the revision resource.

          To set the location attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the revision resource.

          To set the space attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

       --template=TEMPLATE
          The template id of the revision resource.

          To set the template attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --template on the command line.

FLAGS
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
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs templates revisions \
            delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces catalogs templates revisions delete projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/templates/my-template/revisions/my-revision
```

### gcloud design-center spaces catalogs templates revisions describe

```text
NAME
    gcloud design-center spaces catalogs templates revisions describe -
        describe a catalog template revision

SYNOPSIS
    gcloud design-center spaces catalogs templates revisions describe
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a catalog template revision.

EXAMPLES
    To describe the catalog template revision my-revision in template
    my-template, catalog my-catalog, space my-space, project my-project and
    location us-central1, run:

        $ gcloud design-center spaces catalogs templates revisions \
            describe my-revision --template=my-template \
            --catalog=my-catalog --space=my-space --project=my-project \
            --location=us-central1

    Or run:

        $ gcloud design-center spaces catalogs templates revisions \
            describe \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/templates/my-template/revisions/my-revision

POSITIONAL ARGUMENTS
     Revision resource - The catalog template revisions name. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument revision on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       REVISION
          ID of the revision or fully qualified identifier for the revision.

          To set the revision attribute:
          + provide the argument revision on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The catalog id of the revision resource.

          To set the catalog attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The location id of the revision resource.

          To set the location attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the revision resource.

          To set the space attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

       --template=TEMPLATE
          The template id of the revision resource.

          To set the template attribute:
          + provide the argument revision on the command line with a fully
            specified name;
          + provide the argument --template on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs templates revisions \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud design-center spaces catalogs templates revisions describe projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/templates/my-template/revisions/my-revision
```

### gcloud design-center spaces catalogs templates revisions list

```text
NAME
    gcloud design-center spaces catalogs templates revisions list - list
        catalog template revisions

SYNOPSIS
    gcloud design-center spaces catalogs templates revisions list
        (--template=TEMPLATE
          : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List catalog template revisions in a given template.

EXAMPLES
    To list all catalog template revisions in template my-template, catalog
    my-catalog, space my-space, project my-project and location us-central1,
    run:

        $ gcloud design-center spaces catalogs templates revisions list \
            --template=my-template --catalog=my-catalog --space=my-space \
            --project=my-project --location=us-central1

    To list up to 10 catalog template revisions in template my-template,
    catalog my-catalog, space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces catalogs templates revisions list \
            --template=my-template --catalog=my-catalog --space=my-space \
            --project=my-project --location=us-central1 --limit=10

REQUIRED FLAGS
     Template resource - The parent resource from which a list of catalog
     template revisions is requested. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --template=TEMPLATE
          ID of the template or fully qualified identifier for the template.

          To set the template attribute:
          + provide the argument --template on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --catalog=CATALOG
          The catalog id of the template resource.

          To set the catalog attribute:
          + provide the argument --template on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The location id of the template resource.

          To set the location attribute:
          + provide the argument --template on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the template resource.

          To set the space attribute:
          + provide the argument --template on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

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
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs templates revisions list
```

### gcloud alpha design-center spaces catalogs templates revisions create

```text
NAME
    gcloud alpha design-center spaces catalogs templates revisions create -
        create a new catalog template revision

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates revisions create
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE)
        (--application-template-revision-source=APPLICATION_TEMPLATE_REVISION_SOURCE | --gcs-source-uri=GCS_SOURCE_URI | --developer-connect-repo=DEVELOPER_CONNECT_REPO --developer-connect-repo-dir=DEVELOPER_CONNECT_REPO_DIR --developer-connect-repo-ref=DEVELOPER_CONNECT_REPO_REF | [--git-source-ref-tag=GIT_SOURCE_REF_TAG --git-source-repo=GIT_SOURCE_REPO : --git-source-dir=GIT_SOURCE_DIR] | [--oci-repo-uri=OCI_REPO_URI : --oci-repo-version=OCI_REPO_VERSION])
        [--async] [--description=DESCRIPTION] [--metadata=METADATA]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces catalogs templates revisions delete

```text
NAME
    gcloud alpha design-center spaces catalogs templates revisions delete -
        delete a catalog template revision

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates revisions delete
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces catalogs templates revisions describe

```text
NAME
    gcloud alpha design-center spaces catalogs templates revisions describe -
        describe a catalog template revision

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates revisions describe
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces catalogs templates revisions fetch-assessment-report

```text
NAME
    gcloud alpha design-center spaces catalogs templates revisions
        fetch-assessment-report - fetch the assessment report of a catalog
        template revision

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates revisions
        fetch-assessment-report
        (REVISION : --catalog=CATALOG
          --location=LOCATION --space=SPACE --template=TEMPLATE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha design-center spaces catalogs templates revisions list

```text
NAME
    gcloud alpha design-center spaces catalogs templates revisions list - list
        catalog template revisions

SYNOPSIS
    gcloud alpha design-center spaces catalogs templates revisions list
        (--template=TEMPLATE
          : --catalog=CATALOG --location=LOCATION --space=SPACE)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/templates/revisions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
