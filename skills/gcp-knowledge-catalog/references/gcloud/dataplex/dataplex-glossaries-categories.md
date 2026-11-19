---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/categories
---

# gcloud dataplex glossaries categories

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex glossaries categories create

```text
NAME
    gcloud dataplex glossaries categories create - creates a glossary category

SYNOPSIS
    gcloud dataplex glossaries categories create
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        --parent=PARENT [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    A glossary category represents a collection of glossary categories and
    glossary terms within a glossary that are related to each other.

EXAMPLES
    To create a glossary category test-category in glossary test-glossary in
    project test-project in location us-central1, with description test
    description, displayName displayName and parent
    projects/test-project/locations/us-central1/glossaries/test-glossary , run:

        $ gcloud dataplex glossaries categories create test-category \
            --glossary=test-glossary --location=us-central1 \
            --project=test-project \
            --parent='projects/test-project/locations/us-central1/glossaries\
        /test-glossary' --description='test description' \
            --display-name='displayName'

POSITIONAL ARGUMENTS
     Glossary category resource - Arguments and flags that define the Dataplex
     Glossary Category you want to create. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument glossary_category on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GLOSSARY_CATEGORY
          ID of the glossary category or fully qualified identifier for the
          glossary category.

          To set the glossary_category attribute:
          + provide the argument glossary_category on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --glossary=GLOSSARY
          The name of glossary category to use.

          To set the glossary attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --glossary on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --parent=PARENT
        Immediate parent of the created glossary category.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Description of the glossary category.

     --display-name=DISPLAY_NAME
        Display name of the glossary category.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries categories create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex glossaries categories create test-category \
    --glossary=test-glossary \
    --location=us-central1 \
    --project=test-project \
    --parent='projects/test-project/locations/us-central1/glossaries/test-glossary' \
    --description='test description' \
    --display-name='displayName'
```

### gcloud dataplex glossaries categories delete

```text
NAME
    gcloud dataplex glossaries categories delete - deletes a glossary category

SYNOPSIS
    gcloud dataplex glossaries categories delete
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a glossary category.

EXAMPLES
    To delete glossary category test-category in glossary test-glossary in
    project test-project in location us-central1, run:        $ gcloud dataplex glossaries categories delete test-category \
          --glossary=test-glossary --location=us-central1 \
          --project=test-project

POSITIONAL ARGUMENTS
     Glossary category resource - Arguments and flags that define the glossary
     category you want to delete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument glossary_category on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GLOSSARY_CATEGORY
          ID of the glossary category or fully qualified identifier for the
          glossary category.

          To set the glossary_category attribute:
          + provide the argument glossary_category on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --glossary=GLOSSARY
          Identifier of the Dataplex Glossary resource.

          To set the glossary attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --glossary on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries categories delete
```

### gcloud dataplex glossaries categories describe

```text
NAME
    gcloud dataplex glossaries categories describe - describes a glossary
        category

SYNOPSIS
    gcloud dataplex glossaries categories describe
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a glossary category.

EXAMPLES
    To describe a glossary category test-category in glossary test-glossary in
    project test-project in loaction us-central1, run:        $ gcloud dataplex glossaries categories describe test-category \
            --glossary=test-glossary --location=us-central1 \
            --project=test-project

POSITIONAL ARGUMENTS
     Glossary category resource - Arguments and flags that define the glossary
     category you want to describe. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument glossary_category on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GLOSSARY_CATEGORY
          ID of the glossary category or fully qualified identifier for the
          glossary category.

          To set the glossary_category attribute:
          + provide the argument glossary_category on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --glossary=GLOSSARY
          Identifier of the Dataplex Glossary resource.

          To set the glossary attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --glossary on the command line.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries categories describe
```

### gcloud dataplex glossaries categories list

```text
NAME
    gcloud dataplex glossaries categories list - list glossary categories

SYNOPSIS
    gcloud dataplex glossaries categories list
        (--glossary=GLOSSARY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List glossary categories.

EXAMPLES
    To list glossary categories in glossary test-glossary in location
    us-central1 in project test-project, run :

        $ gcloud dataplex glossaries categories list \
             --glossary=test-glossary --location=us-central1 \
             --project=test-project

REQUIRED FLAGS
     Glossary resource - Arguments and flags that define the glossary in which
     to list glossary categories. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --glossary on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --glossary=GLOSSARY
          ID of the glossary or fully qualified identifier for the glossary.

          To set the glossary attribute:
          + provide the argument --glossary on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument --glossary on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

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
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries categories list
```

### gcloud dataplex glossaries categories update

```text
NAME
    gcloud dataplex glossaries categories update - updates a glossary category

SYNOPSIS
    gcloud dataplex glossaries categories update
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--parent=PARENT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a glossary category.

EXAMPLES
    To update display name, desciption and labels of glossary category
    test-category in glossary test-glossary in project test-project in location
    us-central1, run:

        $ gcloud dataplex glossaries categories update test-category \
            --location=us-central1 --project=test-project \
            --glossary=test-glossary --description='updated description' \
            --display-name='updated displayName' \
            --labels=key1=value1,key2=value2

    To update parent of glossary category test-category in glossary
    test-glossary in project test-project in location us-central1, run:

        $ gcloud dataplex glossaries categories update test-category \
            --location=us-central1 --project=test-project \
            --glossary=test-glossary \
            --parent='projects/test-project/locations/us-central1/glossaries\
        /updated-glossary'

POSITIONAL ARGUMENTS
     Glossary category resource - Arguments and flags that define the Dataplex
     Glossary Category you want to update. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument glossary_category on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GLOSSARY_CATEGORY
          ID of the glossary category or fully qualified identifier for the
          glossary category.

          To set the glossary_category attribute:
          + provide the argument glossary_category on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --glossary=GLOSSARY
          The name of glossary category to use.

          To set the glossary attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --glossary on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary_category on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the glossary category.

     --display-name=DISPLAY_NAME
        Display Name of the glossary category.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --parent=PARENT
        Immediate parent of the created glossary category.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries categories update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex glossaries categories update test-category \
    --location=us-central1 \
    --project=test-project \
    --glossary=test-glossary \
    --parent='projects/test-project/locations/us-central1/glossaries/updated-glossary'
```

### gcloud alpha dataplex glossaries categories create

```text
NAME
    gcloud alpha dataplex glossaries categories create - creates a glossary
        category

SYNOPSIS
    gcloud alpha dataplex glossaries categories create
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        --parent=PARENT [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex glossaries categories delete

```text
NAME
    gcloud alpha dataplex glossaries categories delete - deletes a glossary
        category

SYNOPSIS
    gcloud alpha dataplex glossaries categories delete
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex glossaries categories describe

```text
NAME
    gcloud alpha dataplex glossaries categories describe - describes a glossary
        category

SYNOPSIS
    gcloud alpha dataplex glossaries categories describe
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex glossaries categories list

```text
NAME
    gcloud alpha dataplex glossaries categories list - list glossary categories

SYNOPSIS
    gcloud alpha dataplex glossaries categories list
        (--glossary=GLOSSARY : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex glossaries categories update

```text
NAME
    gcloud alpha dataplex glossaries categories update - updates a glossary
        category

SYNOPSIS
    gcloud alpha dataplex glossaries categories update
        (GLOSSARY_CATEGORY : --glossary=GLOSSARY --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--parent=PARENT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/categories (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
