---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/command-conventions
---

# gcloud topic command-conventions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic command-conventions

```text
NAME
    gcloud topic command-conventions - gcloud command conventions supplementary
        help

DESCRIPTION
    gcloud command design follows a common set of principles and conventions.
    This document describes them in detail.

    Conventions are goals more than rules. Refer to individual command --help
    for any exceptions.

  Command Hierarchy
    gcloud commands are organized as a tree with gcloud at the root, command
    groups in the inner nodes, and commands at the leaf nodes. Each command
    group typically contains a set of CRUD commands (create, describe, list,
    update, delete) that operate on a resource for a single API. Group commands
    are executable, but only for displaying help.

    All groups and commands have a --help flag that displays a man(1) style
    document on the standard output. The display is run through the default
    pager if the calling environment specifies one. Help documents are derived
    from the running executable, so they are always up to date, even when
    switching between multiple release installations.

  Command Line
    Every gcloud command line follows the same form:

        gcloud GROUP GROUP ... COMMAND POSITIONAL ... FLAG ...

    Flag and positional arguments can be intermixed but for consistency are
    usually displayed positionals first in order, followed by flags in any
    order.

  Command Usage Notation
    Command usage is a shorthand notation that contains the full command name,
    the positional arguments, and the flag arguments in group sorted order.
    Optional arguments are enclosed in [ ... ]. For example:

        gcloud foo bar NAME [EXTRA] [--format=FORMAT]

    is the usage for the gcloud foo bar command with a required NAME positional
    argument, an optional EXTRA positional argument, and an optional --format
    flag argument.

    Mutually exclusive arguments are separated by |; at most one arg in the
    list of mutually exclusive args may be specified:

        [ --foo | --bar ]

    This means that either --foo or --bar may be specified, but not both.

    Mutually exclusive args may also be required, meaning exactly one arg in
    the list must be specified. This is denoted by enclosing the args in ( ...
    ):

        ( --foo | --bar )

    Modal argument groups are also supported. If any arg in the group is
    specified, then the modal arguments must also be specified. This is denoted
    by using : to separate the modal args on the left from the other args on
    the right:

        [ --must-a --must-b : --maybe-c --maybe-d ]

    This means that if --maybe-c and/or --maybe-d are specified then both
    --must-a and --must-b must be specified.

  Positional Arguments
    Positional arguments are ordered and must be specified in the order listed
    in the command usage and help document argument definition list.

    File input arguments usually accept the special name - to mean read from
    the standard input. This can be used only once per command line.

  Flag Arguments
    Flag names are lower case with a -- prefix. Multi-word flags use - (dash)
    as a word separator. Single character flags are deprecated, rare and may
    not be documented at all.

    Following UNIX convention, if a flag is repeated on the command line, then
    only the rightmost occurrence takes effect, no diagnostic is emitted. This
    makes it easy to set up command aliases and wrapper scripts that provide
    default flag values; values that can easily be overridden by specifying
    them on the alias or wrapper script command line.

  Boolean Flags
    Boolean flags have an implied value of false or true. The presence of --foo
    sets the flag to true. All Boolean flags have a --no- prefix variant. For
    example, --no-foo sets the Boolean --foo flag to false. Boolean flags are
    documented using the positive form. This keeps the style consistent across
    all commands, and also makes the meaning of the --no- variant clear. In the
    case a Boolean flag has a default value of true, the --no- variant will
    appear in the command usage and help text and like all other --no- flags,
    will set the value of the flag to false.

  Valued Flags
    Non-Boolean flags have an explicit value. The value can be specified using
    =:

        --flag=value

    or by placing the value as the next arg after the flag:

        --flag value

    The = form must be used if value starts with -.

    The second form requires extra context to determine if --flag is Boolean
    and value is a positional, or if --flag is valued and value is its value.
    Because of the visual ambiguity, usage notation and most command examples
    use the first form to make intentions clear. The = form also has a
    diagnostic bonus: it is an error to specify a value for a Boolean flag.

  Complex Flag Values
    Complex flag values that contain command interpreter special characters may
    be difficult to specify on the command line. The --flags-file=YAML-FILE
    flag solves this problem by allowing command line flags to be specified in
    a YAML/JSON file. String, numeric, list and dict flag values are specified
    using YAML/JSON notation and quoting rules. See $ gcloud topic flags-file
    for more information.

  Output
    The standard output is for explicit information requested by the command.

    Depending on the context, there may be guarantees on the output format to
    support deterministic parsing. Certain commands do return resources and
    these resources are listed on standard output usually using either a
    command-specific table format or the default YAML format. Moreover, the
    --format flag can be used to change or configure these default output
    formats. yaml, json, and csv output --format values guarantee that
    successful command completion results in standard output data that can be
    parsed using the respective format. A detailed explanation of the
    capabilities of the --format flag can be found with $ gcloud topic formats.
    In the case of async commands, or commands run with --async, the resource
    returned on standard output is an operations resource. For commands that do
    not return resources, the output is defined in the command's --help.

    The standard error is reserved for diagnostics. In general, the format of
    standard error data may change from release to release. Users should not
    script against specific content, or even the existence of output to the
    standard error at all. The only reliable error indicator is the exit status
    described below.

    Most standard error messaging is also logged to a file that can be accessed
    by $ gcloud info --show-log.

    No gcloud command should crash with an uncaught exception. However, if
    gcloud does crash the stack trace is intercepted and written to the log
    file, and a crash diagnostic is written to the standard error.

  Exit Status
    Exit status 0 indicates success. For async commands it indicates that the
    operation started successfully but may not have completed yet.

    Any other exit status indicates an error. Command-specific diagnostics
    should explain the nature of the error and how to correct it.

NOTES
    These variants are also available:

        $ gcloud alpha topic command-conventions

        $ gcloud beta topic command-conventions
```

### gcloud beta topic command-conventions

```text
NAME
    gcloud beta topic command-conventions - gcloud command conventions
        supplementary help
```

### gcloud alpha topic command-conventions

```text
NAME
    gcloud alpha topic command-conventions - gcloud command conventions
        supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/command-conventions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
