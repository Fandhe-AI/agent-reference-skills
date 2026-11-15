---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/cli-trees
---

# gcloud topic cli-trees

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic cli-trees

```text
NAME
    gcloud topic cli-trees - CLI trees supplementary help

DESCRIPTION
    CLI trees are static nested dictionaries that describe all of the groups,
    commands, flags, positionals, help text, and completer module paths for a
    CLI. A CLI tree is often much faster to load and access than one generated
    at runtime from an active CLI. It is also a more compact representation. A
    properly formed CLI tree can be used to reproduce the help documentation
    for an entire CLI.

  CLI Tree Data Files
    A CLI tree is a dictionary in a JSON file. By convention, the file base
    name is the corresponding CLI name. For example, the CLI tree file name for
    gcloud is gcloud.json.

    CLI trees associated with Google Cloud CLI modules are installed in the
    data/cli subdirectory of the Google Cloud CLI installation root:

        $(gcloud info --format="value(installation.sdk_root)")/data/cli

    This includes tree data for gcloud (core component), bq, gsutil, and
    kubectl. Note that the tree data is installed with the component. If the
    component is not installed then neither is its CLI tree. An installed
    component does not require its CLI tree to run. Only the gcloud CLI tree is
    required by $ gcloud alpha interactive.

    By default, CLI trees for other commands are JSON files generated on demand
    from their man(1) or man7.org man pages. They are cached in the cli
    subdirectory of the global config directory:

        $(gcloud info --format="value(config.paths.global_config_dir)")/cli

  The gcloud CLI Tree
    The gcloud CLI tree is used for static TAB completion, the corpus for $
    gcloud alpha help-search, and the data source for $ gcloud alpha
    interactive completions and help text generation.

  Other CLI Trees
    $ gcloud alpha interactive uses CLI tree data files for typeahead, command
    line completion and active help. A few CLI trees are installed with their
    respective Google Cloud CLI components: gcloud (core component), bq,
    gsutil, and kubectl.

    The generated trees are a close approximation. You can construct your own,
    especially for hierarchical CLIs like git(1) that are hard to extract from
    man pages.

  CLI Tree Schema
    TBD (gcloud interactive is still in ALPHA).

NOTES
    These variants are also available:

        $ gcloud alpha topic cli-trees

        $ gcloud beta topic cli-trees
```

### gcloud beta topic cli-trees

```text
NAME
    gcloud beta topic cli-trees - CLI trees supplementary help
```

### gcloud alpha topic cli-trees

```text
NAME
    gcloud alpha topic cli-trees - CLI trees supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/cli-trees (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
