---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters
---

# gcloud topic filters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic filters

```text
NAME
    gcloud topic filters - resource filters supplementary help

DESCRIPTION
    Most gcloud commands return a list of resources on success. By default they
    are pretty-printed on the standard output. The
    --format=NAME[ATTRIBUTES](PROJECTION) and --filter=EXPRESSION flags along
    with projections can be used to format and change the default output to a
    more meaningful result.

    Use the --format flag to change the default output format of a command. For
    details run $ gcloud topic formats.

    Use the --filter flag to select resources to be listed. Resource filters
    are described in detail below.

    Use resource-keys to reach resource items through a unique path of names
    from the root. For details run $ gcloud topic resource-keys.

    Use projections to list a subset of resource keys in a resource. For
    details run $ gcloud topic projections.

    Note: To refer to a list of fields you can sort, filter, and format by for
    each resource, you can run a list command with the format set to text or
    json. For example, $ gcloud compute instances list --limit=1 --format=text.

    To work through an interactive tutorial about using the filter and format
    flags instead, see:
    https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/GoogleCloudPlatform/cloud-shell-tutorials&page=editor&tutorial=cloudsdk/tutorial.md

    Note: Depending on the specific server API, filtering may be done entirely
    by the client, entirely by the server, or by a combination of both.

  Filter Expressions
    A filter expression is a Boolean function that selects the resources to
    print from a list of resources. Expressions are composed of terms connected
    by logic operators.

     LogicOperator
        Logic operators must be in uppercase: AND, OR, NOT. Additionally,
        expressions containing both AND and OR must be parenthesized to
        disambiguate precedence.

         NOT term-1
            True if term-1 is False, otherwise False.

         term-1 AND term-2
            True if both term-1 and term-2 are true.

         term-1 OR term-2
            True if at least one of term-1 or term-2 is true.

         term-1 term-2
            Term conjunction (implicit AND) is True if both term-1 and term-2
            are true. Conjunction has lower precedence than OR.

     Terms
        A term is a key operator value tuple, where key is a dotted name that
        evaluates to the value of a resource attribute, and value may be:

         number
            integer or floating point numeric constant

         unquoted literal
            character sequence terminated by space, ( or )

         quoted literal
            "..." or '...'

            Most filter expressions need to be quoted in shell commands. If you
            use '...' shell quotes then use "..." filter string literal quotes
            and vice versa.

        Quoted literals will be interpreted as string values, even when the
        value could also be a valid number. For example, 'key:1e9' will be
        interpreted as a key named 'key' with the string value '1e9', rather
        than with the float value of one billion expressed in scientific
        notation.

     Operator Terms
         key : simple-pattern
            : operator evaluation is changing for consistency across Google
            APIs. The current default is deprecated and will be dropped
            shortly. A warning will be displayed when a --filter expression
            would return different matches using both the deprecated and new
            implementations.

            The current deprecated default is True if key contains
            simple-pattern. The match is case insensitive. It allows one * that
            matches any sequence of 0 or more characters. If * is specified
            then the match is anchored, meaning all characters from the
            beginning and end of the value must match.

            The new implementation is True if simple-pattern matches any word
            in key. Words are locale specific but typically consist of
            alpha-numeric characters. Non-word characters that do not appear in
            simple-pattern are ignored. The matching is anchored and case
            insensitive. An optional trailing * does a word prefix match.

            Use key:* to test if key is defined and -key:* to test if key is
            undefined.

         key :( simple-pattern ... )
            True if key matches any simple-pattern in the (space, tab, newline,
            comma) separated list.

         key = value
            True if key is equal to value, or [deprecated] equivalent to : with
            the exception that the trailing * prefix match is not supported.

            For historical reasons, this operation currently behaves
            differently for different Google APIs. For many APIs, this is True
            if key is equal to value. For a few APIs, this is currently
            equivalent to :, with the exception that the trailing * prefix
            match is not supported. However, this behaviour is being phased
            out, and use of = for those APIs is deprecated; for those APIs, if
            you want matching, you should use : instead of =, and if you want
            to test for equality, you can use key <= value AND key >= value.

         key =( value ... )
            True if key is equal to any value in the (space, tab, newline, ,)
            separated list.

         key != value
            True if key is not value. Equivalent to -key=value and NOT
            key=value.

         key < value
            True if key is less than value. If both key and value are numeric
            then numeric comparison is used, otherwise lexicographic string
            comparison is used.

         key <= value
            True if key is less than or equal to value. If both key and value
            are numeric then numeric comparison is used, otherwise
            lexicographic string comparison is used.

         key >= value
            True if key is greater than or equal to value. If both key and
            value are numeric then numeric comparison is used, otherwise
            lexicographic string comparison is used.

         key > value
            True if key is greater than value. If both key and value are
            numeric then numeric comparison is used, otherwise lexicographic
            string comparison is used.

         key ~ value
            True if key contains a match for the RE (regular expression)
            pattern value. Depending on your shell, you might have to escape or
            quote ~ to ensure it isn't consumed as HOME.

         key !~ value
            True if key does not contain a match for the RE (regular
            expression) pattern value. Depending on your shell, you might have
            to escape or quote ~ to ensure it isn't consumed as HOME.

        Regular expressions are evaluated using Python's standard library:
        https://docs.python.org/3/library/re.html#re-syntax.

  Determine which fields are available for filtering
    In order to build filters, it is often helpful to review some
    representative fields returned from commands. One simple way to do this is
    to add --format=yaml --limit=1 to a command. With these flags, a single
    record is returned and its full contents are displayed as a YAML document.
    For example, a list of project fields could be generated by running:

        $ gcloud projects list --format=yaml --limit=1

    This might display the following data:

        createTime: '2021-02-10T19:19:49.242Z'
        lifecycleState: ACTIVE
        name: MyProject
        parent:
          id: '123'
          type: folder
        projectId: my-project
        projectNumber: '456'

    Using this data, one way of filtering projects is by their parent's ID by
    specifying parent.id as the key.

  Filter on a custom or nested list in response
    By default the filter expression operates on root level resources. In order
    to filter on a nested list(not at the root level of the json) , one can use
    the --flatten flag to provide a the resource-key to list. For example, To
    list members under my-project that have an editor role, one can run:

        $ gcloud projects get-iam-policy cloudsdktest --flatten=bindings \
            --filter=bindings.role:roles/editor \
            --format='value(bindings.members)'

EXAMPLES
    List all Google Compute Engine instance resources:

        $ gcloud compute instances list

    List Compute Engine instance resources that have machineType f1-micro:

        $ gcloud compute instances list --filter="machineType:f1-micro"

    List Compute Engine instance resources using a regular expression for zone
    us and not MachineType f1-micro:

        $ gcloud compute instances list \
            --filter="zone ~ us AND -machineType:f1-micro"

    List Compute Engine instance resources with tag my-tag:

        $ gcloud compute instances list --filter="tags.items=my-tag"

    List Compute Engine instance resources with tag my-tag or my-other-tag:

        $ gcloud compute instances list \
            --filter="tags.items=(my-tag,my-other-tag)"

    List Compute Engine instance resources with tag my-tag and my-other-tag:

        $ gcloud compute instances list \
            --filter="tags.items=my-tag AND tags.items=my-other-tag"

    List Compute Engine instance resources which either have tag my-tag but not
    my-other-tag or have tag alternative-tag:

        $ gcloud compute instances list \
            --filter="(tags.items=my-tag AND -tags.items=my-other-tag) OR \
        tags.items=alternative-tag"

    List Compute Engine instance resources which contain the key fingerprint in
    the metadata object:

        $ gcloud compute instances list --limit=1 \
            --filter="metadata.list(show="keys"):fingerprint"

    List Compute Engine instance resources with label my-label with any value:

        $ gcloud compute instances list --filter="labels.my-label:*"

    List Container Registry images that have a tag with the value '30e5504145':

        $ gcloud container images list-tags --filter="'tags:30e5504145'"

    The last example encloses the filter expression in single quotes because
    the value '30e5504145' could be interpreted as a number in scientific
    notation.

    List in JSON format those projects where the labels match specific values
    (e.g. label.env is 'test' and label.version is alpha):

        $ gcloud projects list --format="json" \
            --filter="labels.env=test AND labels.version=alpha"

    List projects that were created on and after a specific date:

        $ gcloud projects list \
            --format="table(projectNumber,projectId,createTime)" \
            --filter="createTime>=2018-01-15"

    List projects that were created on and after a specific date and time and
    sort from oldest to newest (with dates and times listed according to the
    local timezone):

        $ gcloud projects list \
            --format="table(projectNumber,projectId,createTime.date(tz=LOCAL\
        ))" --filter="createTime>=2018-01-15T12:00:00" --sort-by=createTime

    List projects that were created within the last two weeks, using ISO8601
    durations:

        $ gcloud projects list \
            --format="table(projectNumber,projectId,createTime)" \
            --filter="createTime>-P2W"

    For more about ISO8601 durations, see:
    https://en.wikipedia.org/wiki/ISO_8601

    The table below shows examples of pattern matching if used with the :
    operator:

      PATTERN  VALUE        MATCHES  DEPRECATED_MATCHES
      abc*     abcpdqxyz    True     True
      abc      abcpdqxyz    False    True
      pdq*     abcpdqxyz    False    False
      pdq      abcpdqxyz    False    True
      xyz*     abcpdqxyz    False    False
      xyz      abcpdqxyz    False    True
      *        abcpdqxyz    True     True
      *        (None)       False    False
      *        ('')         False    False
      *        (otherwise)  True     True
      abc*     abc.pdq.xyz  True     True
      abc      abc.pdq.xyz  True     True
      abc.pdq  abc.pdq.xyz  True     True
      pdq*     abc.pdq.xyz  True     False
      pdq      abc.pdq.xyz  True     True
      pdq.xyz  abc.pdq.xyz  True     True
      xyz*     abc.pdq.xyz  True     False
      xyz      abc.pdq.xyz  True     True

NOTES
    These variants are also available:

        $ gcloud alpha topic filters

        $ gcloud beta topic filters
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud compute instances list \
    --limit=1 \
    --filter="metadata.list(show='keys'):fingerprint"

gcloud projects list \
    --format="table(projectNumber,projectId,createTime.date(tz=LOCAL))" \
    --filter="createTime>=2018-01-15T12:00:00" \
    --sort-by=createTime
```

### gcloud beta topic filters

```text
NAME
    gcloud beta topic filters - resource filters supplementary help
```

### gcloud alpha topic filters

```text
NAME
    gcloud alpha topic filters - resource filters supplementary help
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): a double-quoted argument inside the double-quoted `--format` / `--filter` value (for example `date("%Y-%m-%d")`) ends the shell quoting early, so the runnable form uses single quotes inside.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/filters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
