---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/datetimes
---

# gcloud topic datetimes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic datetimes

```text
NAME
    gcloud topic datetimes - date/time input format supplementary help

DESCRIPTION
    gcloud command line flags and filter expressions that expect date/time
    string values support common input formats. These formats fall into two
    main categories: absolute date/times and relative durations.

  Absolute date/time formats
    Absolute date/time input formats minimally support ISO 8601
    (https://en.wikipedia.org/wiki/ISO_8601) and RFC 822
    (https://www.rfc-editor.org/rfc/rfc0822.txt) date/times. When omitted the
    date/time value defaults are:

      o year, month, day - current value
      o hour, minute, second, fractional second - 0

    The supported absolute date/time input formats are listed here.

    ISO 8601 / RFC 3339 zulu:

        2003-09-25T10:49:41.519Z
        2003-09-25T10:49:41Z

    ISO 8601 numeric timezone offset:

        2003-09-25T10:49:41.5-0000
        2003-09-25T10:49:41.5-03:00
        2003-09-25T10:49:41.5+0300

    ISO with omitted parts:

        2003-09-25T10:49:41
        2003-09-25T10:49
        2003-09-25T10
        2003-09-25

    RFC 822:

        Thu, 25 Sep 2003 10:49:41 -0300

    UNIX date command, explicit timezone:

        Thu Sep 25 10:36:28 EDT 2003
        2003 10:36:28 EDT 25 Sep Thu

    local timezone:

        Thu Sep 25 10:36:28 2003

    omitted parts (date parts default to the current date, time parts default
    to 0):

        Thu Sep 25 10:36:28
        Thu Sep 10:36:28
        Thu 10:36:28
        Thu 10:36
        10:36

    omitted parts with different order:

        Thu Sep 25 2003
        Sep 25 2003
        Sep 2003
        Sep
        2003

    ISO no separators:

        20030925T104941.5-0300
        20030925T104941-0300
        20030925T104941
        20030925T1049
        20030925T10
        20030925

    no T separator:

        20030925104941
        200309251049

    other date orderings:

        2003-09-25
        2003-Sep-25
        25-Sep-2003
        Sep-25-2003
        09-25-2003

    other date separators:

        2003.Sep.25
        2003/09/25
        2003 Sep 25
        2003 09 25

  Relative duration date/time formats
    A relative duration specifies a date/time relative to the current time.
    Relative durations are based on ISO 8601 durations
    (https://en.wikipedia.org/wiki/ISO_8601#Durations). They are
    case-insensitive and must be prefixed with +P or -P.

    A fully qualified duration string contains year, month, day, hour, minute,
    second, and fractional second parts. Each part is a number followed by a
    single character suffix:

      o P - period (the duration designator)
      o Y - year
      o M - minute if after T or H, month otherwise
      o D - day
      o T - separates date parts from time parts
      o H - hour
      o M - minute if after T or H, month otherwise
      o S - second (for fractional seconds, use decimal value for seconds)

    At least one part must be specified. Omitted parts default to 0.

        -P1Y2M3DT4H5M6.7S
        +p1y2m3dT4h5m6.7s

    A relative duration may be used in any context that expects a date/time
    string.

    For example:

      o 1 month ago: -p1m
      o 30 minutes from now: +pt30m
      o 2 hours and 30 minutes ago: -p2h30m

  Absolute duration formats
    An absolute duration specifies a period of time. It has the same syntax as
    a relative duration except that there is no leading + or -, and the leading
    P is optional. If P is omitted, T is implied and M always represents
    minutes. To specify months, the leading P must be included.

    For example:

      o 1 month: p1m
      o 1 hour 30 minutes: 1h30m
      o 30 minutes: 30m

NOTES
    These variants are also available:

        $ gcloud alpha topic datetimes

        $ gcloud beta topic datetimes
```

### gcloud beta topic datetimes

```text
NAME
    gcloud beta topic datetimes - date/time input format supplementary help
```

### gcloud alpha topic datetimes

```text
NAME
    gcloud alpha topic datetimes - date/time input format supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/datetimes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
