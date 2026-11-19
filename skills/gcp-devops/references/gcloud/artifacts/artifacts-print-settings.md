---
source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/print-settings
---

# gcloud artifacts print-settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud artifacts print-settings gradle

```text
NAME
    gcloud artifacts print-settings gradle - print a snippet to add a
        repository to the Gradle build.gradle file

SYNOPSIS
    gcloud artifacts print-settings gradle [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print a snippet to add a repository to the Gradle build.gradle file.

EXAMPLES
    To print a snippet for the repository set in the artifacts/repository
    property in the default location:

        $ gcloud artifacts print-settings gradle

    To print a snippet for repository my-repository in the default location:

        $ gcloud artifacts print-settings gradle --repository="my-repository"

    To print a snippet using service account key:

        $ gcloud artifacts print-settings gradle --json-key=path/to/key.json

FLAGS
     --json-key=JSON_KEY
        Path to service account JSON key. If not specified, current active
        service account credentials or a placeholder for gcloud credentials is
        used.

     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts print-settings gradle

        $ gcloud beta artifacts print-settings gradle
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts print-settings gradle \
    --repository=my-repository \
    --location=us

gcloud artifacts print-settings gradle \
    --repository="my-repository" \
    --location=us

gcloud artifacts print-settings gradle \
    --repository=my-repository \
    --location=us \
    --json-key=path/to/key.json
```

### gcloud artifacts print-settings mvn

```text
NAME
    gcloud artifacts print-settings mvn - print a snippet to add a Maven
        repository to the pom.xml file

SYNOPSIS
    gcloud artifacts print-settings mvn [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print a snippet to add a Maven repository to the pom.xml file.

EXAMPLES
    To print a snippet for the repository set in the artifacts/repository
    property in the default location:

        $ gcloud artifacts print-settings mvn

    To print a snippet for repository my-repository in the default location:

        $ gcloud artifacts print-settings mvn --repository="my-repository"

    To print a snippet using service account key:

        $ gcloud artifacts print-settings mvn --json-key=path/to/key.json

FLAGS
     --json-key=JSON_KEY
        Path to service account JSON key. If not specified, current active
        service account credentials or a placeholder for gcloud credentials is
        used.

     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts print-settings mvn

        $ gcloud beta artifacts print-settings mvn
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts print-settings mvn \
    --repository=my-repository \
    --location=us

gcloud artifacts print-settings mvn \
    --repository="my-repository" \
    --location=us

gcloud artifacts print-settings mvn \
    --repository=my-repository \
    --location=us \
    --json-key=path/to/key.json
```

### gcloud artifacts print-settings npm

```text
NAME
    gcloud artifacts print-settings npm - print credential settings to add to
        the .npmrc file

SYNOPSIS
    gcloud artifacts print-settings npm [--json-key=JSON_KEY] [--scope=SCOPE]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print credential settings to add to the .npmrc file for connecting to an
    npm repository.

EXAMPLES
    To print a snippet for the repository set in the artifacts/repository
    property in the default location:

        $ gcloud artifacts print-settings npm

    To print a snippet for repository my-repository in the default location:

        $ gcloud artifacts print-settings npm --repository="my-repository"

    To print a snippet using service account key:

        $ gcloud artifacts print-settings npm --json-key=path/to/key.json

    To print a snippet for the repository set in the artifacts/repository
    property with scope @my-company:

        $ gcloud artifacts print-settings npm --scope=@my-company

FLAGS
     --json-key=JSON_KEY
        Path to service account JSON key. If not specified, current active
        service account credentials or a placeholder for gcloud credentials is
        used.

     --scope=SCOPE
        The scope to associate with the Artifact Registry registry. If not
        specified, Artifact Registry is set as the default registry.

     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts print-settings npm

        $ gcloud beta artifacts print-settings npm
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts print-settings npm \
    --repository=my-repository \
    --location=us

gcloud artifacts print-settings npm \
    --repository="my-repository" \
    --location=us

gcloud artifacts print-settings npm \
    --repository=my-repository \
    --location=us \
    --json-key=path/to/key.json

gcloud artifacts print-settings npm \
    --repository=my-repository \
    --location=us \
    --scope=@my-company
```

### gcloud artifacts print-settings python

```text
NAME
    gcloud artifacts print-settings python - print credential settings to add
        to the .pypirc and pip.conf files

SYNOPSIS
    gcloud artifacts print-settings python [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Print credential settings to add to the .pypirc and pip.conf files for
    connecting to a Python package repository.

EXAMPLES
    To print a snippet for the repository set in the artifacts/repository
    property in the default location:

        $ gcloud artifacts print-settings python

    To print a snippet for repository my-repository in the default location:

        $ gcloud artifacts print-settings python --repository="my-repository"

    To print a snippet using service account key:

        $ gcloud artifacts print-settings python --json-key=path/to/key.json

FLAGS
     --json-key=JSON_KEY
        Path to service account JSON key. If not specified, output returns
        either credentials for an active service account or a placeholder for
        the current user account.

     Repository resource - The Artifact Registry repository. If not specified,
     the current artifacts/repository is used. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --repository on the command line with a fully
        specified name;
      * set the property artifacts/repository with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        Location of the repository.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha artifacts print-settings python

        $ gcloud beta artifacts print-settings python
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud artifacts print-settings python \
    --repository=my-repository \
    --location=us

gcloud artifacts print-settings python \
    --repository="my-repository" \
    --location=us

gcloud artifacts print-settings python \
    --repository=my-repository \
    --location=us \
    --json-key=path/to/key.json
```

### gcloud beta artifacts print-settings apt

```text
NAME
    gcloud beta artifacts print-settings apt - print settings to add to the
        sources.list.d directory

SYNOPSIS
    gcloud beta artifacts print-settings apt
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts print-settings gradle

```text
NAME
    gcloud beta artifacts print-settings gradle - print a snippet to add a
        repository to the Gradle build.gradle file

SYNOPSIS
    gcloud beta artifacts print-settings gradle [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts print-settings mvn

```text
NAME
    gcloud beta artifacts print-settings mvn - print a snippet to add a Maven
        repository to the pom.xml file

SYNOPSIS
    gcloud beta artifacts print-settings mvn [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts print-settings npm

```text
NAME
    gcloud beta artifacts print-settings npm - print credential settings to add
        to the .npmrc file

SYNOPSIS
    gcloud beta artifacts print-settings npm [--json-key=JSON_KEY]
        [--scope=SCOPE] [--location=LOCATION --repository=REPOSITORY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts print-settings python

```text
NAME
    gcloud beta artifacts print-settings python - print credential settings to
        add to the .pypirc and pip.conf files

SYNOPSIS
    gcloud beta artifacts print-settings python [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta artifacts print-settings yum

```text
NAME
    gcloud beta artifacts print-settings yum - print settings to add to the
        yum.repos.d directory

SYNOPSIS
    gcloud beta artifacts print-settings yum
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings apt

```text
NAME
    gcloud alpha artifacts print-settings apt - print settings to add to the
        sources.list.d directory

SYNOPSIS
    gcloud alpha artifacts print-settings apt
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings gradle

```text
NAME
    gcloud alpha artifacts print-settings gradle - print a snippet to add a
        repository to the Gradle build.gradle file

SYNOPSIS
    gcloud alpha artifacts print-settings gradle [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings mvn

```text
NAME
    gcloud alpha artifacts print-settings mvn - print a snippet to add a Maven
        repository to the pom.xml file

SYNOPSIS
    gcloud alpha artifacts print-settings mvn [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings npm

```text
NAME
    gcloud alpha artifacts print-settings npm - print credential settings to
        add to the .npmrc file

SYNOPSIS
    gcloud alpha artifacts print-settings npm [--json-key=JSON_KEY]
        [--scope=SCOPE] [--location=LOCATION --repository=REPOSITORY]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings python

```text
NAME
    gcloud alpha artifacts print-settings python - print credential settings to
        add to the .pypirc and pip.conf files

SYNOPSIS
    gcloud alpha artifacts print-settings python [--json-key=JSON_KEY]
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha artifacts print-settings yum

```text
NAME
    gcloud alpha artifacts print-settings yum - print settings to add to the
        yum.repos.d directory

SYNOPSIS
    gcloud alpha artifacts print-settings yum
        [--location=LOCATION --repository=REPOSITORY] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example relies on the `artifacts/repository` and `artifacts/location` properties, which `gcloud help` describes as set already ("the repository set in the artifacts/repository property in the default location"); without them gcloud 593.0.0 fails ("Failed to find attribute [repository]" and "Failed to find attribute [location]"); the runnable form passes `--repository=my-repository --location=us`, using the repository name of the other examples on this page and the `us` location used elsewhere in the Artifact Registry help.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/print-settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
