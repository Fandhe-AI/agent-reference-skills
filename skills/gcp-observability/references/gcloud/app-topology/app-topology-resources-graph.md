---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app-topology/resources-graph
---

# gcloud app-topology resources-graph

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app-topology resources-graph generate

```text
NAME
    gcloud app-topology resources-graph generate - generate a resource topology
        graph

SYNOPSIS
    gcloud app-topology resources-graph generate --domains=[DOMAINS,...]
        [--location=LOCATION] [--pattern=PATTERN | --pattern-file=PATTERN_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Queries the App Topology service to construct and return a directed graph
    of discovered cloud resources and their relationships across the specified
    domains.

EXAMPLES
    To generate a resource topology graph for the SRE domain:

        $ gcloud app-topology resources-graph generate --domains=SRE

    To generate a topology graph with an inline pattern filter:

        $ gcloud app-topology resources-graph generate \
            --domains=SRE,DEVOPS \
            --pattern='{"starting_node": {"label_matcher_expr": "AppHub"}'

    To generate a topology graph using a pattern filter from a file:

        $ gcloud app-topology resources-graph generate --domains=SRE \
            --pattern-file=path/to/pattern.yaml

REQUIRED FLAGS
     --domains=[DOMAINS,...]
        List of App Topology domains to include in the topology query (e.g.,
        SRE, DEVOPS, SECURITY).

OPTIONAL FLAGS
     Location resource - The location to query topology in. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * App Topology currently supports global location by default with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * App Topology currently supports global location by default.

     Graph pattern filter options.

     At most one of these can be specified:

       --pattern=PATTERN
          A GraphPattern query filter definition in proto3 YAML/JSON string
          format.

       --pattern-file=PATTERN_FILE
          Path to a YAML or JSON file (or "-" for standard input) containing
          the GraphPattern query filter definition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha app-topology resources-graph generate

        $ gcloud beta app-topology resources-graph generate
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud app-topology resources-graph generate \
    --domains=SRE,DEVOPS \
    --pattern='{"starting_node": {"label_matcher_expr": "AppHub"}}'
```

### gcloud beta app-topology resources-graph generate

```text
NAME
    gcloud beta app-topology resources-graph generate - generate a resource
        topology graph

SYNOPSIS
    gcloud beta app-topology resources-graph generate --domains=[DOMAINS,...]
        [--location=LOCATION] [--pattern=PATTERN | --pattern-file=PATTERN_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha app-topology resources-graph generate

```text
NAME
    gcloud alpha app-topology resources-graph generate - generate a resource
        topology graph

SYNOPSIS
    gcloud alpha app-topology resources-graph generate --domains=[DOMAINS,...]
        [--location=LOCATION] [--pattern=PATTERN | --pattern-file=PATTERN_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the inline `--pattern` value `{"starting_node": {"label_matcher_expr": "AppHub"}` opens two JSON objects and closes one, so it is not valid JSON; the runnable form adds the closing `}`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app-topology/resources-graph (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
