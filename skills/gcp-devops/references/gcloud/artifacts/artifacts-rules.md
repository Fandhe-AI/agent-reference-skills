---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/rules
---

# gcloud artifacts rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts rules create

```text
NAME
    gcloud artifacts rules create - create an Artifact Registry rule

SYNOPSIS
    gcloud artifacts rules create
        (RULE : --location=LOCATION --repository=REPOSITORY) --action=ACTION
        [--condition=CONDITION] [--operation=OPERATION; default="DOWNLOAD"]
        [--package=PACKAGE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Artifact Registry rule.

    This command can fail for the following reasons:
      o A rule with the same name already exists.
      o The active account does not have permission to create repositories.
      o A rule with given package already exists.

EXAMPLES
    To create a rule with the name my-rule for package my-pkg with action deny
    under the current project, repository, run:

        $ gcloud artifacts rules create my-rule --package=my-pkg \
            --action=deny

POSITIONAL ARGUMENTS
     Rule resource - The Artifact Registry rule to create. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument rule on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RULE
          ID of the rule or fully qualified identifier for the rule.

          To set the rule attribute:
          + provide the argument rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the rule. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the rule. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

REQUIRED FLAGS
     --action=ACTION
        The action the rule would make, can only be DENY or ALLOW. ACTION must
        be one of: allow, deny.

OPTIONAL FLAGS
     --condition=CONDITION
        The CEL expression for the rule.

     --operation=OPERATION; default="DOWNLOAD"
        The operation the rule applies to. OPERATION must be (only one value is
        supported): download.

     --package=PACKAGE
        The package the rule applies to. Empty means the rule is set for the
        entire repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

### gcloud artifacts rules delete

```text
NAME
    gcloud artifacts rules delete - delete an Artifact Registry rule

SYNOPSIS
    gcloud artifacts rules delete
        (RULE : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Artifact Registry rule.

    This command can fail for the following reasons:
      o The specified rule does not exist.
      o The active account does not have permission to delete rules.

EXAMPLES
    To delete a rule named my-rule under the current project, repository, and
    location, run:

        $ gcloud artifacts rules delete my-repo

POSITIONAL ARGUMENTS
     Rule resource - The Artifact Registry rule to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument rule on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RULE
          ID of the rule or fully qualified identifier for the rule.

          To set the rule attribute:
          + provide the argument rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the rule. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the rule. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts rules delete my-rule \
    --repository=my-repo \
    --location=us
```

### gcloud artifacts rules describe

```text
NAME
    gcloud artifacts rules describe - describe an Artifact Registry rule

SYNOPSIS
    gcloud artifacts rules describe
        (RULE : --location=LOCATION --repository=REPOSITORY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Artifact Registry rule.

    This command can fail for the following reasons:
      o The specified rule does not exist.
      o The active account does not have permission to view rules.

EXAMPLES
    To describe a rule named my-rule under the current project, repository, and
    location, run:

        $ gcloud artifacts rules describe my-rule

POSITIONAL ARGUMENTS
     Rule resource - The Artifact Registry rule to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument rule on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RULE
          ID of the rule or fully qualified identifier for the rule.

          To set the rule attribute:
          + provide the argument rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the rule. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the rule. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

### gcloud artifacts rules list

```text
NAME
    gcloud artifacts rules list - list Artifact Registry rules

SYNOPSIS
    gcloud artifacts rules list [--location=LOCATION --repository=REPOSITORY]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Artifact Registry rules for the specified repository.

    This command can fail for the following reasons:
      o The specified repository does not exist.
      o The active account does not have permission to list rules.

    To specify the maximum number of rules to list, use the --limit flag.

EXAMPLES
    The following command lists a maximum of five rules for repository my-repo:

        $ gcloud artifacts rules list --limit=5

FLAGS
     Repository resource - The parent repository for the list of rules. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository. Overrides the default artifacts/location
        property value for this command invocation. To configure the default
        location, use the command: gcloud config set artifacts/location.

        To set the location attribute:
        * provide the argument --repository on the command line with a fully
          specified name;
        * set the property artifacts/repository with a fully specified name;
        * provide the argument --location on the command line;
        * set the property artifacts/location.

     --repository=REPOSITORY
        ID of the repository or fully qualified identifier for the repository.

        To set the repository attribute:
        * provide the argument --repository on the command line;
        * set the property artifacts/repository.

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
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts rules list \
    --repository=my-repo \
    --location=us \
    --limit=5
```

### gcloud artifacts rules update

```text
NAME
    gcloud artifacts rules update - update an Artifact Registry rule

SYNOPSIS
    gcloud artifacts rules update
        (RULE : --location=LOCATION --repository=REPOSITORY) [--action=ACTION]
        [--condition=CONDITION] [--operation=OPERATION] [--package=PACKAGE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Artifact Registry rule.

    This command can fail for the following reasons:
      o The rule does not exist.
      o A rule with the same name already exists.
      o The active account does not have permission to create repositories.
      o A rule with given package already exists.

EXAMPLES
    To create a rule with the name my-rule for package my-pkg with action deny
    under the current project, repository, run:

        $ gcloud artifacts rules update my-rule --package=my-pkg \
            --action=deny

POSITIONAL ARGUMENTS
     Rule resource - The Artifact Registry rule to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument rule on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       RULE
          ID of the rule or fully qualified identifier for the rule.

          To set the rule attribute:
          + provide the argument rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the rule. Overrides the default artifacts/location
          property value for this command invocation. To configure the default
          location, use the command: gcloud config set artifacts/location.

          To set the location attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property artifacts/location.

       --repository=REPOSITORY
          The repository associated with the rule. Overrides the default
          artifacts/repository property value for this command invocation. To
          configure the default repository, use the command: gcloud config set
          artifacts/repository.

          To set the repository attribute:
          + provide the argument rule on the command line with a fully
            specified name;
          + provide the argument --repository on the command line;
          + set the property artifacts/repository.

FLAGS
     --action=ACTION
        The action the rule would make, can only be DENY or ALLOW. ACTION must
        be one of: allow, deny.

     --condition=CONDITION
        The CEL expression for the rule.

     --operation=OPERATION
        The operation the rule applies to. OPERATION must be (only one value is
        supported): download.

     --package=PACKAGE
        The package the rule applies to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the artifactregistry/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/artifacts/docs/
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example relies on a repository (and location) that is set already ("under the current project, repository, and location"); without them gcloud 593.0.0 fails ("Error parsing [repository] ... Failed to find attribute [repository]"); the runnable form passes `--repository=my-repo --location=us`, the repository and location of the paths in the examples on this page.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example says it deletes "a rule named my-rule" but passes `my-repo` as the RULE argument, which would delete a rule named `my-repo`; the runnable form passes `my-rule`. It also relies on a repository (and location) that is set already ("under the current project, repository, and location"); without them gcloud 593.0.0 fails ("Failed to find attribute [repository]"), so the runnable form passes `--repository=my-repo --location=us`, the repository and location of the other examples on this page.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
