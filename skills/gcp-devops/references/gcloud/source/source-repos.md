---
source: https://docs.cloud.google.com/sdk/gcloud/reference/source/repos
---

# gcloud source repos

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud source repos clone

```text
NAME
    gcloud source repos clone - clone a cloud source repository

SYNOPSIS
    gcloud source repos clone REPOSITORY_NAME [DIRECTORY_NAME] [--dry-run]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command clones a git repository from the currently active Google Cloud
    project into the specified directory or into the current directory if no
    target directory is specified.

    Each Google Cloud project can have zero or more git repositories associated
    with it. To see the available repositories, run:

        $ gcloud source repos list

    The clone operation configures the local clone to use your gcloud
    credentials to authenticate future git operations. This command emits a
    warning if the cloud source repository is a mirror.

EXAMPLES
    The example commands below show a sample workflow.

        $ gcloud init

        $ gcloud source repos clone REPOSITORY_NAME DIRECTORY_NAME

        $ cd DIRECTORY_NAME ... create/edit files and create one or more \
            commits ...

        $ git push origin main

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository.

     [DIRECTORY_NAME]
        Directory name for the cloned repo. Defaults to the repository name.

FLAGS
     --dry-run
        If provided, prints the command that would be run to standard out
        instead of executing it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos clone

        $ gcloud beta source repos clone
```

### gcloud source repos create

```text
NAME
    gcloud source repos create - create a cloud source repository

SYNOPSIS
    gcloud source repos create REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a named git repository for the currently active Google
    Cloud Platform project.

EXAMPLES
    To create a named repository in the current project issue the following
    commands:

        $ gcloud init

        $ gcloud source repos create REPOSITORY_NAME

    Once you push contents to it, they can be browsed in the Developers
    Console.

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository. May contain between 3 and 63 (inclusive)
        lowercase letters, digits, and hyphens. Must start with a letter, and
        may not end with a hyphen.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos create

        $ gcloud beta source repos create
```

### gcloud source repos delete

```text
NAME
    gcloud source repos delete - delete a cloud source repository

SYNOPSIS
    gcloud source repos delete REPOSITORY_NAME [--force] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a named git repository from the currently active
    Google Cloud Platform project.

EXAMPLES
    To delete a named repository in the current project issue the following
    commands:

        $ gcloud init

        $ gcloud source repos delete REPOSITORY_NAME

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository.

FLAGS
     --force
        (REMOVED) If provided, skip the delete confirmation prompt.

        The --force option has been removed; use --quiet to suppress prompting.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos delete

        $ gcloud beta source repos delete
```

### gcloud source repos describe

```text
NAME
    gcloud source repos describe - describe a cloud source repository

SYNOPSIS
    gcloud source repos describe REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command describes a repository from the currently active Google Cloud
    Platform project. The description includes the full repository name
    (projects/<projectid>/repos/<reponame>), the size (if non-zero), and the
    url.

EXAMPLES
    To describe a repository named example-repo in the current project issue
    the following command:

        $ gcloud source repos describe REPOSITORY_NAME

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos describe

        $ gcloud beta source repos describe
```

### gcloud source repos get-iam-policy

```text
NAME
    gcloud source repos get-iam-policy - get the IAM policy for the named cloud
        source repository

SYNOPSIS
    gcloud source repos get-iam-policy REPOSITORY_NAME [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command gets the IAM policy for the given repository.

EXAMPLES
    To get the IAM policy, issue the following command:

        $ gcloud source repos get-iam-policy REPOSITORY_NAME

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository.

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

NOTES
    These variants are also available:

        $ gcloud alpha source repos get-iam-policy

        $ gcloud beta source repos get-iam-policy
```

### gcloud source repos list

```text
NAME
    gcloud source repos list - list the repositories the currently active
        project

SYNOPSIS
    gcloud source repos list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    By default, repos in the current project are listed; this can be overridden
    with the gcloud --project flag. The repository size is not returned, but
    can be retrieved for a particular repository with the describe command.

EXAMPLES
    To list all repositories in the current project, run:

        $ gcloud source repos list

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

NOTES
    These variants are also available:

        $ gcloud alpha source repos list

        $ gcloud beta source repos list
```

### gcloud source repos set-iam-policy

```text
NAME
    gcloud source repos set-iam-policy - set the IAM policy for the named
        repository

SYNOPSIS
    gcloud source repos set-iam-policy REPOSITORY_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command sets the IAM policy for the given repository from the policy
    in the provided file.

EXAMPLES
    To set the IAM policy, issue the following command:

        $ gcloud source repos set-iam-policy REPOSITORY_NAME POLICY_FILE

POSITIONAL ARGUMENTS
     REPOSITORY_NAME
        Name of the repository.

     POLICY_FILE
        JSON or YAML file with IAM policy. See
        https://cloud.google.com/resource-manager/reference/rest/Shared.Types/Policy

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos set-iam-policy

        $ gcloud beta source repos set-iam-policy
```

### gcloud source repos update

```text
NAME
    gcloud source repos update - update the configuration of a Cloud Source
        Repository

SYNOPSIS
    gcloud source repos update REPO
        ((--add-topic=ADD_TOPIC | --remove-topic=REMOVE_TOPIC
          | --update-topic=UPDATE_TOPIC) : --message-format=MESSAGE_FORMAT
          --service-account=SERVICE_ACCOUNT --topic-project=TOPIC_PROJECT)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To associate a Cloud Pub/Sub topic to receive repository update
    notifications, run:

        $ gcloud source repos update REPO_NAME --add-topic=TOPIC_NAME \
            --service-account=SERVICE_ACCOUNT_EMAIL --message-format=json

POSITIONAL ARGUMENTS
     Repo resource - Name of the Cloud Source repository to update. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument repo on the command line with a fully specified
        name;
      * set the property core/project.

     This must be specified.

       REPO
          ID of the repo or fully qualified identifier for the repo.

          To set the repo attribute:
          + provide the argument repo on the command line.

REQUIRED FLAGS
     Manages Cloud Pub/Sub topics associated with the repository.

     At least one of these must be specified:

       --message-format=MESSAGE_FORMAT
          The format of the message to publish to the topic. MESSAGE_FORMAT
          must be one of: json, protobuf.

       --service-account=SERVICE_ACCOUNT
          Email address of the service account used for publishing Cloud
          Pub/Sub messages. This service account needs to be in the same
          project as the repo. When added, the caller needs to have
          iam.serviceAccounts.actAs permission on this service account. If
          unspecified, it defaults to the Compute Engine default service
          account.

       --topic-project=TOPIC_PROJECT
          Cloud project for the topic. If not set, the currently set project
          will be used.

       Exactly one of these must be specified:

         Topic resource - The Cloud Pub/Sub topic to add to the repository.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --add-topic on the command line with a fully
            specified name;
          - provide the argument --topic-project on the command line;
          - set the property core/project.

         --add-topic=ADD_TOPIC
            ID of the topic or fully qualified identifier for the topic.

            To set the topic attribute:
            - provide the argument --add-topic on the command line.

         Topic resource - The Cloud Pub/Sub topic to remove from the
         repository. This represents a Cloud resource. (NOTE) Some attributes
         are not given arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --remove-topic on the command line with a
            fully specified name;
          - provide the argument --topic-project on the command line;
          - set the property core/project.

         --remove-topic=REMOVE_TOPIC
            ID of the topic or fully qualified identifier for the topic.

            To set the topic attribute:
            - provide the argument --remove-topic on the command line.

         Topic resource - The Cloud Pub/Sub topic to update in the project.
         This represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --update-topic on the command line with a
            fully specified name;
          - provide the argument --topic-project on the command line;
          - set the property core/project.

         --update-topic=UPDATE_TOPIC
            ID of the topic or fully qualified identifier for the topic.

            To set the topic attribute:
            - provide the argument --update-topic on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha source repos update

        $ gcloud beta source repos update
```

### gcloud beta source repos clone

```text
NAME
    gcloud beta source repos clone - clone a cloud source repository

SYNOPSIS
    gcloud beta source repos clone REPOSITORY_NAME [DIRECTORY_NAME] [--dry-run]
        [--use-full-gcloud-path] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos create

```text
NAME
    gcloud beta source repos create - create a cloud source repository

SYNOPSIS
    gcloud beta source repos create REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos delete

```text
NAME
    gcloud beta source repos delete - delete a cloud source repository

SYNOPSIS
    gcloud beta source repos delete REPOSITORY_NAME [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos describe

```text
NAME
    gcloud beta source repos describe - describe a cloud source repository

SYNOPSIS
    gcloud beta source repos describe REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos get-iam-policy

```text
NAME
    gcloud beta source repos get-iam-policy - get the IAM policy for the named
        cloud source repository

SYNOPSIS
    gcloud beta source repos get-iam-policy REPOSITORY_NAME
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos list

```text
NAME
    gcloud beta source repos list - list the repositories the currently active
        project

SYNOPSIS
    gcloud beta source repos list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos set-iam-policy

```text
NAME
    gcloud beta source repos set-iam-policy - set the IAM policy for the named
        repository

SYNOPSIS
    gcloud beta source repos set-iam-policy REPOSITORY_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta source repos update

```text
NAME
    gcloud beta source repos update - update the configuration of a Cloud
        Source Repository

SYNOPSIS
    gcloud beta source repos update REPO
        ((--add-topic=ADD_TOPIC | --remove-topic=REMOVE_TOPIC
          | --update-topic=UPDATE_TOPIC) : --message-format=MESSAGE_FORMAT
          --service-account=SERVICE_ACCOUNT --topic-project=TOPIC_PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos clone

```text
NAME
    gcloud alpha source repos clone - clone a cloud source repository

SYNOPSIS
    gcloud alpha source repos clone REPOSITORY_NAME [DIRECTORY_NAME]
        [--dry-run] [--use-full-gcloud-path] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos config export

```text
NAME
    gcloud alpha source repos config export - export the configuration for a
        Cloud Source repo

SYNOPSIS
    gcloud alpha source repos config export ([REPOSITORY_NAME]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos create

```text
NAME
    gcloud alpha source repos create - create a cloud source repository

SYNOPSIS
    gcloud alpha source repos create REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos delete

```text
NAME
    gcloud alpha source repos delete - delete a cloud source repository

SYNOPSIS
    gcloud alpha source repos delete REPOSITORY_NAME [--force]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos describe

```text
NAME
    gcloud alpha source repos describe - describe a cloud source repository

SYNOPSIS
    gcloud alpha source repos describe REPOSITORY_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos get-iam-policy

```text
NAME
    gcloud alpha source repos get-iam-policy - get the IAM policy for the named
        cloud source repository

SYNOPSIS
    gcloud alpha source repos get-iam-policy REPOSITORY_NAME
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos list

```text
NAME
    gcloud alpha source repos list - list the repositories the currently active
        project

SYNOPSIS
    gcloud alpha source repos list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos set-iam-policy

```text
NAME
    gcloud alpha source repos set-iam-policy - set the IAM policy for the named
        repository

SYNOPSIS
    gcloud alpha source repos set-iam-policy REPOSITORY_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha source repos update

```text
NAME
    gcloud alpha source repos update - update the configuration of a Cloud
        Source Repository

SYNOPSIS
    gcloud alpha source repos update REPO
        ((--add-topic=ADD_TOPIC | --remove-topic=REMOVE_TOPIC
          | --update-topic=UPDATE_TOPIC) : --message-format=MESSAGE_FORMAT
          --service-account=SERVICE_ACCOUNT --topic-project=TOPIC_PROJECT)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (End of Sale): the Cloud Source Repositories documentation says "Effective June 17, 2024, Cloud Source Repositories isn't available to new customers. If your organization hasn't previously used Cloud Source Repositories, you can't enable the API or use Cloud Source Repositories." and "Cloud Source Repositories is End of Sale. In preparation for the deprecation of this service, this page outlines migration options for multiple use cases. A shutdown date will be communicated at least one year before the shutdown occurs to provide time for you to successfully migrate to an alternative product." (https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories, https://docs.cloud.google.com/source-repositories/docs/migration-guides, retrieved 2026-11-19). Migration to Secure Source Manager is covered in the `secure-source-manager` category.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/source/repos (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
