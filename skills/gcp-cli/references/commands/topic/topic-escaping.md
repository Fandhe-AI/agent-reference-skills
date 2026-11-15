---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/escaping
---

# gcloud topic escaping

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic escaping

```text
NAME
    gcloud topic escaping - list/dictionary-type argument escaping
        supplementary help

DESCRIPTION
    List/dictionary-type argument escaping supplementary help.

    gcloud supports list-type and dictionary-type flags that take one argument
    which is a list of one or more comma-separated items:

        --list-flag=value1,value2,value3

        --dict-flag=key1=value1,key2=value2

    In the case of a dict-type flag, each item is a key-value pair separated by
    '='. If more than one '=' is present, the first is used.

    In order to include commas in your arguments, specify an alternate
    delimiter using the following syntax:

        ^DELIM^flag value, with comma

    where DELIM is a sequence of one or more characters that may not appear in
    any value in the list.

    NOTE: In cmd.exe and PowerShell on Windows, ^ is a special character and
    you must escape it by repeating it. In the following examples, every time
    you see ^, replace it with ^^^^.

EXAMPLES
    In these examples, a list-type or dictionary-type flag is given, along with
    a shell comment explaining how it is parsed. The parsed flags are shown
    here using Python-style list or dict formats (in other languages, what
    Python calls "dicts" are often called "associative arrays," "maps," or
    "hashes").

    Basic example:

        --list-flag=^:^a,b:c,d # => ['a,b', 'c,d']

    Multi-character delimiters are allowed:

        --list-flag=^--^a-,b--c # => ['a-,b', 'c']

    Just one '^' has no special meaning:

        --list-flag=^a,b,c # => ['^a', 'b', 'c']

    This is an alternative way of starting with '^':

        --list-flag=^,^^a,b,c # => ['^a', 'b', 'c']

    A '^' anywhere but the start has no special meaning:

        --list-flag=a^:^,b,c # => ['a^:^', 'b', 'c']

    Dictionary-type arguments work exactly the same as list-type arguments:

        --dict-flag=^:^a=b,c:d=f,g # => {'a': 'b,c', 'd': 'f,g'}

    To reserve ephemeral IP addresses, passed in as a list, which are being
    used by virtual machine instances in the us-central1 region, run:

        $ gcloud compute addresses create \
          --addresses ^:^123.456.789.198:22.333.146.189:789.312.645 \
          --region us-central1

    To create a Google Compute Engine virtual machine instance with metadata as
    a list ({'key1': '"value1"', 'key2': 'value2', 'key3':
    'value3Index1,value3Index2', 'key4': 'value4'), run:

        $ gcloud compute instances create example-instance1 \
          --metadata \
          ^:^key1="value1":key2=value2:key3=value3Index1,value3Index2,\
        valueIndex3:key4=value4

NOTES
    These variants are also available:

        $ gcloud alpha topic escaping

        $ gcloud beta topic escaping
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud compute instances create example-instance1 \
    --metadata '^:^key1="value1":key2=value2:key3=value3Index1,value3Index2,valueIndex3:key4=value4'
```

### gcloud beta topic escaping

```text
NAME
    gcloud beta topic escaping - list/dictionary-type argument escaping
        supplementary help
```

### gcloud alpha topic escaping

```text
NAME
    gcloud alpha topic escaping - list/dictionary-type argument escaping
        supplementary help
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the text says the value of `key1` is `"value1"` including the double quotes, but the shell removes unprotected double quotes; the runnable form single-quotes the whole `--metadata` argument so the quotes reach gcloud.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/escaping (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
