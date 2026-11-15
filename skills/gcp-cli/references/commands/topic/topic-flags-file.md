---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/flags-file
---

# gcloud topic flags-file

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic flags-file

```text
NAME
    gcloud topic flags-file - --flags-file=YAML_FILE supplementary help

DESCRIPTION
    The --flags-file=YAML-FILE flag, available to all gcloud commands, supports
    complex flag values in any command interpreter.

    Complex flag values that contain command interpreter special characters may
    be difficult to specify on the command line. The combined list of special
    characters across commonly used command interpreters (shell, cmd.exe,
    PowerShell) is surprisingly large. Among them are ", ', `, *, ?, [, ], (,
    ), $, %, #, ^, &, |, {, }, ;, \, <, >, space, tab, newline. Add to that the
    separator characters for list and dict valued flags, and it becomes all but
    impossible to construct portable command lines.

    The --flags-file=YAML-FILE flag solves this problem by allowing command
    line flags to be specified in a YAML/JSON file. String, numeric, list and
    dict flag values are specified using YAML/JSON notation and quoting rules.

    Flag specification uses dictionary notation. Use a list of dictionaries for
    flags that must be specified multiple times.

    For example, this YAML file defines values for Boolean, integer, floating
    point, string, dictionary and list valued flags:

            --boolean:
            --integer: 123
            --float: 456.789
            --string: A string value.
            --dictionary:
              a=b: c,d
              e,f: g=h
              i: none
              j=k=l: m=$n,o=%p
              "y:": ":z"
              meta:
              - key: foo
                value: bar
              - key: abc
                value: xyz
            --list:
              - a,b,c
              - x,y,z

    If the file is named my-flags.yaml then the command line flag
    --flags-file=my-flags.yaml will set the specified flags on any system using
    any command interpreter. --flags-file may be specified in a YAML file, and
    its value can be a YAML list to reference multiple files.

    This example specifies the --metadata flag multiple times:

            - --metadata: abc
              --integer: 123
            - --metadata: xyz

    Each --flags-file arg is replaced by its contents, so normal flag
    precedence applies. For example, given flags-1.yaml:

            --zone: us-east2-a

    flags-2.yaml:

            --verbosity: info
            --zone: us-central1-a

    and command line:

            gcloud compute instances describe \
                --flags-file=flags-1.yaml my-instance --flags-file=flags-2.yaml

    the effective command line is:

            gcloud compute instances describe \
                --zone=us-east2-a my-instance --verbosity=info --zone=us-central1-a

    using zone us-central1-a (not us-east2-a, because flags-2.yaml, to the
    right of flags-1.yaml, has higher precedence).

NOTES
    These variants are also available:

        $ gcloud alpha topic flags-file

        $ gcloud beta topic flags-file
```

### gcloud beta topic flags-file

```text
NAME
    gcloud beta topic flags-file - --flags-file=YAML_FILE supplementary help
```

### gcloud alpha topic flags-file

```text
NAME
    gcloud alpha topic flags-file - --flags-file=YAML_FILE supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/flags-file (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
