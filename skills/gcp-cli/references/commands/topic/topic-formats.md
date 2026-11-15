---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats
---

# gcloud topic formats

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic formats

```text
NAME
    gcloud topic formats - resource formats supplementary help

DESCRIPTION
    Most gcloud commands return a list of resources on success. By default they
    are pretty-printed on the standard output. The
    --format=NAME[ATTRIBUTES](PROJECTION) and --filter=EXPRESSION flags along
    with projections can be used to format and change the default output to a
    more meaningful result.

    Use the --format flag to change the default output format of a command.
    Resource formats are described in detail below.

    Use the --filter flag to select resources to be listed. For details run $
    gcloud topic filters.

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

  Formats
    A format expression is used to change the default output format of a
    command. Many output formats are available; some for pretty printing
    human-readable output and others for returning machine-readable output.

    A format expression has 3 parts:

     NAME
        name
     ATTRIBUTES
        [ [no-]attribute-name[=value] [, ... ] ]
     PROJECTION
        ( resource-key [, ...] )

    NAME is required, ATTRIBUTES are optional, and PROJECTIONS may be required
    for some formats. Unknown attribute names are silently ignored.

    Each gcloud list command has a default format expression. The --format flag
    can alter or replace the default. For example,

        --format="[box]"

    adds box decorations to a default table, and

        --format=json

    lists the resource in json format.

    The formats and format specific attributes are:

     config
        A dictionary of dictionaries in config style.

        The format attributes are:

         export
            Display the dictionary as a list of system specific environment
            export commands.
         unset
            Display the dictionary as a list of system specific environment
            unset commands.

     csv
        Comma Separated Values (http://www.rfc-editor.org/rfc/rfc4180.txt) with
        no keys. This format requires a projection to define the values to be
        printed.

        To use \n or \t as an attribute value please escape the \ with your
        shell's escape sequence, example separator="\\n" for bash.

        The format attributes are:

         delimiter="string"
            The string printed between list value items, default ";".
         no-heading
            Disables the initial key name heading record.
         separator="string"
            The string printed between values, default ",".
         terminator="string"
            The string printed after each record, default "\n" (newline).

     default
        An alias for the yaml format. To override use gcloud config set
        core/default_format property.

     diff
        A unified diff of the first two projection columns.

        The format attributes are:

         format
            The format of the diffed resources. Each resource is converted to
            this format and the diff of the converted resources is displayed.
            The default is 'flattened'.

     disable
        Disables formatted output and does not consume the resources.
        Equivalent to the none format, but also short-circuits early for
        commands that return pageable lists.

     flattened
        A flattened tree. Each output line contains one key:value pair.

        The format attributes are:

         no-pad
            Don't print space after the separator. The default adjusts the
            space to align the values into the same output column. Use no-pad
            for comparing resource outputs.
         separator=SEPARATOR
            Print SEPARATOR between the key and value. The default is ": ".

     get
        Equivalent to the value[no-transforms] format. Default transforms are
        not applied to the displayed values.

     json
        JSON (http://www.json.org), JavaScript Object Notation.

        The format attributes are:

         no-undefined
            Does not display resource data items with null values.

     list
        An ordered list of items.

        The format attributes are:

         always-display-title
            Display the title even if there are no records.
         compact
            Display all items in a record on one line.

     multi
        Each projection key must have a subformat defined by the
        :format=FORMAT-STRING attribute. For example,

            `--format="multi(data:format=json, info:format='table[box](a, b, c)')"`

        formats the data field as JSON and the info field as a boxed table.

        The format attributes are:

         separator
            Separator string to print between each format. If multiple
            resources are provided, the separator is also printed between each
            resource.

     none
        Disables formatted output and consumes the resources.

     object
        Bypasses JSON-serialization and prints the object representation of
        each resource.

        The format attributes are:

         separator
            The line printed between resources.
         terminator
            The line printed after each resource.

     table
        Aligned left-adjusted columns with optional title, column headings and
        sorting. This format requires a projection to define the table columns.
        The default column headings are the disambiguated right hand components
        of the column keys in ANGRY_SNAKE_CASE. For example, the projection
        keys (first.name, last.name) produce the default column heading
        ('NAME', 'LAST_NAME').

        If --page-size=N is specified then output is grouped into tables with
        at most N rows. Headings, alignment and sorting are done per-page. The
        title, if any, is printed before the first table.

        If screen reader option is True, you may observe flattened list output
        instead of a table with columns. Please refer to $ gcloud topic
        accessibility to turn it off.

        The format attributes are:

         all-box
            Prints a box around the entire table and each cell, including the
            title if any.
         box
            Prints a box around the entire table and the title cells if any.
         format=FORMAT-STRING
            Prints the key data indented by 4 spaces using FORMAT-STRING which
            can reference any of the supported formats.
         no-heading
            Disables the column headings.
         margin=N
            Right hand side padding when one or more columns are wrapped.
         pad=N
            Sets the column horizontal pad to N spaces. The default is 1 for
            box, 2 otherwise.
         title=TITLE
            Prints a centered TITLE at the top of the table, within the table
            box if box is enabled.

     text
        An alias for the flattened format.

     value
        CSV with no heading and <TAB> separator instead of <COMMA>. Used to
        retrieve individual resource values. This format requires a projection
        to define the value(s) to be printed.

        To use \n or \t as an attribute value please escape the \ with your
        shell's escape sequence, example separator="\\n" for bash.

        The format attributes are:

         delimiter="string"
            The string printed between list value items, default ";".
         quote
            "..." quote values that contain delimiter, separator or terminator
            strings.
         separator="string"
            The string printed between values, default "\t" (tab).
         terminator="string"
            The string printed after each record, default "\n" (newline).

     yaml
        YAML (http://www.yaml.org), YAML ain't markup language.

        The format attributes are:

         null="string"
            Display string instead of null for null/None values.
         no-undefined
            Does not display resource data items with null values.
         version=VERSION
            Prints using the specified YAML version, default 1.2.

    All formats have these attributes:

     disable
        Disables formatted output and does not consume the resources.
     json-decode
        Decodes string values that are JSON compact encodings of list and
        dictionary objects. This may become the default.
     pager
        If True, sends output to a pager.
     private
        Disables log file output. Use this for sensitive resource data that
        should not be displayed in log files. Explicit command line IO
        redirection overrides this attribute.
     transforms
        Apply projection transforms to the resource values. The default is
        format specific; table-like formats may define default transforms to
        certain columns. Use no-transforms to disable.

EXAMPLES
    List a table of compute instance resources sorted by name with box
    decorations and title Instances:

        $ gcloud compute instances list \
            --format="table[box,title=Instances](name:sort=1, \
        zone:label=zone, status)"

    List a nested table of the quotas of a region:

        $ gcloud compute regions describe us-central1 \
            --format="table(quotas:format='table(metric,limit,usage)')"

    Print a flattened list of global quotas in CSV format:

        $ gcloud compute project-info describe --flatten="quotas[]" \
            --format="csv(quotas.metric,quotas.limit,quotas.usage)"

    List the disk interfaces for all compute instances as a compact comma
    separated list:

        $ gcloud compute instances list \
            --format="value(disks[].interface.list())"

    List the URIs for all compute instances:

        $ gcloud compute instances list --format="value(uri())"

    List all compute instances with their creation timestamps displayed
    according to the local timezone:

        $ gcloud compute instances list \
            --format="table(name,creationTimestamp.date(tz=LOCAL))"

    List the project authenticated user email address:

        $ gcloud info --format="value(config.account)"

    Return the scope of the current instance:

        $ gcloud compute zones list --format="value(selfLink.scope())"

    selfLink is a fully qualified name. (e.g.
    'https://www.googleapis.com/compute/v1/projects/my-project/zones/us-central1-a')
    The previous example returns a list of just the names of each zone (e.g.
    'us-central1-a'). This is because selfLink.scope() grabs the last part of
    the URL segment. To extract selfLink starting from /projects and return the
    scope of the current instance:

        $ gcloud compute zones list \
            --format="value(selfLink.scope(projects))"

    List all scopes enabled for a Compute Engine instance and flatten the
    multi-valued resource:

        $ gcloud compute instances list \
            --format="flattened(name,serviceAccounts[].email,serviceAccounts\
        [].scopes[].basename())"

    Display a multi-valued resource's service account keys with the
    corresponding service account, extracting just the first '/' delimited part
    with segment(0):

        $ gcloud iam service-accounts keys list \
            --iam-account=svc-2-123@test-minutia-123.iam.gserviceaccount.com\
         --project=test-minutia-123 \
            --format="table(name.scope(serviceAccounts).segment(0):label='se\
        rvice Account',name.scope(keys):label='keyID',validAfterTime)"

    The last example returns a table with service account names without their
    full paths, keyID and validity.

NOTES
    These variants are also available:

        $ gcloud alpha topic formats

        $ gcloud beta topic formats
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud compute instances list \
    --format="flattened(name,serviceAccounts[].email,serviceAccounts[].scopes[].basename())"

gcloud iam service-accounts keys list \
    --iam-account=svc-2-123@test-minutia-123.iam.gserviceaccount.com \
    --project=test-minutia-123 \
    --format="table(name.scope(serviceAccounts).segment(0):label='service Account',name.scope(keys):label='keyID',validAfterTime)"
```

### gcloud beta topic formats

```text
NAME
    gcloud beta topic formats - resource formats supplementary help
```

### gcloud alpha topic formats

```text
NAME
    gcloud alpha topic formats - resource formats supplementary help
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the help wraps a line between a flag value and the next flag with a bare backslash, which drops the space; the runnable form restores the space before the next flag.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/formats (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
