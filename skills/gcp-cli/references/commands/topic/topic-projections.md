---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/projections
---

# gcloud topic projections

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic projections

```text
NAME
    gcloud topic projections - resource projections supplementary help

DESCRIPTION
    Most gcloud commands return a list of resources on success. By default they
    are pretty-printed on the standard output. The
    --format=NAME[ATTRIBUTES](PROJECTION) and --filter=EXPRESSION flags along
    with projections can be used to format and change the default output to a
    more meaningful result.

    Use the --format flag to change the default output format of a command. For
    details run $ gcloud topic formats.

    Use the --filter flag to select resources to be listed. For details run $
    gcloud topic filters.

    Use resource-keys to reach resource items through a unique path of names
    from the root. For details run $ gcloud topic resource-keys.

    Use projections to list a subset of resource keys in a resource. Resource
    projections are described in detail below.

    Note: To refer to a list of fields you can sort, filter, and format by for
    each resource, you can run a list command with the format set to text or
    json. For example, $ gcloud compute instances list --limit=1 --format=text.

    To work through an interactive tutorial about using the filter and format
    flags instead, see:
    https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/GoogleCloudPlatform/cloud-shell-tutorials&page=editor&tutorial=cloudsdk/tutorial.md

  Projections
    A projection is a list of keys that selects resource data values.
    Projections are used in --format flag expressions. For example, the table
    format requires a projection that describes the table columns:

        table(name, network.ip.internal, network.ip.external, uri())

  Transforms
    A transform formats resource data values. Each projection key may have zero
    or more transform calls:

        _key_._transform_([arg...])...

    This example applies the foo() and then the bar() transform to the
    status.time resource value:

        (name, status.time.foo().bar())

    The builtin transform functions are:

     always()
        Marks a transform sequence to always be applied.

        In some cases transforms are disabled. Prepending always() to a
        transform sequence causes the sequence to always be evaluated.

        For example:

         some_field.always().foo().bar()
            Always applies foo() and then bar().

     basename(undefined="")
        Returns the last path component.

        The arguments are:

         undefined
            Returns this value if the resource or basename is empty.

     collection(undefined="")
        Returns the current resource collection.

        The arguments are:

         undefined
            This value is returned if r or the collection is empty.

     color(red, yellow, green, blue)
        Colorizes the resource string value.

        The red, yellow, green and blue args are RE patterns, matched against
        the resource in order. The first pattern that matches colorizes the
        matched substring with that color, and the other patterns are skipped.

        The arguments are:

         red
            The substring pattern for the color red.
         yellow
            The substring pattern for the color yellow.
         green
            The substring pattern for the color green.
         blue
            The substring pattern for the color blue.

        For example:

         color(red=STOP,yellow=CAUTION,green=GO)
            For the resource string "CAUTION means GO FASTER" displays the
            substring "CAUTION" in yellow.

     count()
        Counts the number of each item in the list.

        A string resource is treated as a list of characters.

        For example:

        "b/a/b/c".split("/").count() returns {a: 1, b: 2, c: 1}.

     date(format="%Y-%m-%dT%H:%M:%S", unit=1, undefined="", tz, tz_default)
        Formats the resource as a strftime() format.

        The arguments are:

         format
            The strftime(3) format.
         unit
            If the resource is a Timestamp then divide by unit to yield
            seconds.
         undefined
            Returns this value if the resource is not a valid time.
         tz
            Return the time relative to the tz timezone if specified, the
            explicit timezone in the resource if it has one, otherwise the
            local timezone. For example: date(tz=EST5EDT, tz_default=UTC).
         tz_default
            The default timezone if the resource does not have a timezone
            suffix.

     decode(encoding, undefined="")
        Returns the decoded value of the resource that was encoded by encoding.

        The arguments are:

         encoding
            The encoding name. base64 and utf-8 are supported.
         undefined
            Returns this value if the decoding fails.

     duration(start="", end="", parts=3, precision=3, calendar=true, unit=1, undefined="")
        Formats the resource as an ISO 8601 duration string.

        The ISO 8601 Duration
        (https://en.wikipedia.org/wiki/ISO_8601#Durations) format is:
        "[-]P[nY][nM][nD][T[nH][nM][n[.m]S]]". The 0 duration is "P0".
        Otherwise at least one part will always be displayed. Negative
        durations are prefixed by "-". "T" disambiguates months "P2M" to the
        left of "T" and minutes "PT5M" to the right.

        If the resource is a datetime then the duration of resource -
        current_time is returned.

        The arguments are:

         start
            The name of a start time attribute in the resource. The duration of
            the end - start time attributes in resource is returned. If end is
            not specified then the current time is used.
         end
            The name of an end time attribute in the resource. Defaults to the
            current time if omitted. Ignored if start is not specified.
         parts
            Format at most this many duration parts starting with largest
            non-zero part.
         precision
            Format the last duration part with precision digits after the
            decimal point. Trailing "0" and "." are always stripped.
         calendar
            Allow time units larger than hours in formatted durations if true.
            Durations specifying hours or smaller units are exact across
            daylight savings time boundaries. On by default. Use calendar=false
            to disable. For example, if calendar=true then at the daylight
            savings boundary 2016-03-13T01:00:00 + P1D => 2016-03-14T01:00:00
            but 2016-03-13T01:00:00 + PT24H => 2016-03-14T03:00:00. Similarly,
            a +P1Y duration will be inexact but "calendar correct", yielding
            the same month and day number next year, even in leap years.
         unit
            Divide the resource numeric value by unit to yield seconds.
         undefined
            Returns this value if the resource is not a valid timestamp.

        For example:

         duration(start=createTime,end=updateTime)
            The duration from resource creation to the most recent update.
         updateTime.duration()
            The duration since the most recent resource update.

     encode(encoding, undefined="")
        Returns the encoded value of the resource using encoding.

        The arguments are:

         encoding
            The encoding name. base64 and utf-8 are supported.
         undefined
            Returns this value if the encoding fails.

     enum(enums, inverse=false, undefined="")
        Returns the enums dictionary description for the resource.

        The arguments are:

         enums
            The name of a message enum dictionary.
         inverse
            Do inverse lookup if true.
         undefined
            Returns this value if there is no matching enum description.

     error(message)
        Raises an Error exception that does not generate a stack trace.

        The arguments are:

         message
            An error message. If not specified then the resource is formatted
            as the error message.

     extract(keys)
        Extract a list of non-empty values for the specified resource keys.

        The arguments are:

         keys
            The list of keys in the resource whose non-empty values will be
            included in the result.

     fatal(message)
        Raises an InternalError exception that generates a stack trace.

        The arguments are:

         message
            An error message. If not specified then the resource is formatted
            as the error message.

     filter(expression)
        Selects elements of x that match the filter expression.

        The arguments are:

         expression
            The filter expression to apply to r.

        For example:

        x.filter("key:val") selects elements of x that have 'key' fields
        containing 'val'.

     firstof(keys)
        Returns the first non-empty attribute value for key in keys.

        The arguments are:

         keys
            Keys to check for resource attribute values,

        For example:

         x.firstof(bar_foo, barFoo, BarFoo, BAR_FOO)
            Checks x.bar_foo, x.barFoo, x.BarFoo, and x.BAR_FOO in order for
            the first non-empty value.

     flatten(show="", undefined="", separator=",")
        Formats nested dicts and/or lists into a compact comma separated list.

        The arguments are:

         show
            If show=keys then list dict keys; if show=values then list dict
            values; otherwise list dict key=value pairs.
         undefined
            Return this if the resource is empty.
         separator
            The list item separator string.

        For example:

         --format="table(field.map(2).list().map().list().list()"
            Expression with explicit flattening.
         --format="table(field.flatten()"
            Equivalent expression using .flatten().

     float(precision=6, spec, undefined="")
        Returns the string representation of a floating point number.

        One of these formats is used (1) ". precision spec" if spec is
        specified (2) ". precision" unless 1e-04 <= abs(number) < 1e+09 (3)
        ".1f" otherwise.

        The arguments are:

         precision
            The maximum number of digits before and after the decimal point.
         spec
            The printf(3) floating point format "e", "f" or "g" spec character.
         undefined
            Returns this value if the resource is not a float.

     format(fmt, args)
        Formats resource key values.

        The arguments are:

         fmt
            The format string with {0} ... {nargs-1} references to the resource
            attribute name arg values.
         args
            The resource attribute key expression to format. The printer
            projection symbols and aliases may be used in key expressions. If
            no args are specified then the resource is used as the arg list if
            it is a list, otherwise the resource is used as the only arg.

        For example:

         --format='value(format("{0:f.1}/{1:f.1}", q.CPU.default, q.CPU.limit))'
            Formats q.CPU.default and q.CPU.limit as floating point numbers.

     group(keys)
        Formats a [...] grouped list.

        Each group is enclosed in [...]. The first item separator is ':',
        subsequent separators are ','. [item1] [item1] ... [item1: item2] ...
        [item1: item2] [item1: item2, item3] ... [item1: item2, item3]

        The arguments are:

         keys
            Optional attribute keys to select from the list. Otherwise the
            string value of each list item is selected.

     if(expr)
        Disables the projection key if the flag name filter expr is false.

        The arguments are:

         expr
            A command flag filter name expression. See gcloud topic filters for
            details on filter expressions. The expression variables are flag
            names without the leading -- prefix and dashes replaced by
            underscores.

        For example:

         table(name, value.if(NOT short_format))
            Lists a value column if the --short-format command line flag is not
            specified.

     iso(undefined="T")
        Formats the resource to numeric ISO time format.

        The arguments are:

         undefined
            Returns this value if the resource does not have an isoformat()
            attribute.

     join(sep="/", undefined="")
        Joins the elements of the resource list by the value of sep.

        A string resource is treated as a list of characters.

        The arguments are:

         sep
            The separator value to use when joining.
         undefined
            Returns this value if the result after joining is empty.

        For example:

        "a/b/c/d".split("/").join("!") returns "a!b!c!d".

     len()
     Returns the length of the resource if it is non-empty, 0 otherwise.
     list(show="", undefined="", separator=",")
        Formats a dict or list into a compact comma separated list.

        The arguments are:

         show
            If show=keys then list dict keys; if show=values then list dict
            values; otherwise list dict key=value pairs.
         undefined
            Return this if the resource is empty.
         separator
            The list item separator string.

     lower()
     Returns r in lowercase.
     map(depth=1)
        Applies the next transform in the sequence to each resource list item.

        The arguments are:

         depth
            The list nesting depth.

        For example:

         list_field.map().foo().list()
            Applies foo() to each item in list_field and then list() to the
            resulting value to return a compact comma-separated list.
         list_field.*foo().list()
            * is shorthand for map().
         list_field.map().foo().map().bar()
            Applies foo() to each item in list_field and then bar() to each
            item in the resulting list.
         abc.xyz.map(2).foo()
            Applies foo() to each item in xyz[] for all items in abc[].
         abc.xyz.**foo()
            ** is shorthand for map(2).

     notnull()
     Remove null values from the resource list.
     regex(expression, does_match, nomatch="")
        Returns does_match or r itself if r matches expression, nomatch
        otherwise.

        The arguments are:

         expression
            expression to apply to r.
         does_match
            If the string matches expression then return does_match otherwise
            return the string itself if does_match is not defined.
         nomatch
            Returns this value if the string does not match expression.

     resolution(undefined="", transpose=false)
        Formats a human readable XY resolution.

        The arguments are:

         undefined
            Returns this value if a recognizable resolution was not found.
         transpose
            Returns the y/x resolution if true.

     scope(args)
        Gets the /args/ suffix from a URI.

        The arguments are:

         args
            Optional URI segment names. If not specified then 'regions',
            'zones' is assumed.

        For example:

        "http://abc/foo/projects/bar/xyz".scope("projects") returns "bar/xyz".

        "http://xyz/foo/regions/abc".scope() returns "abc".

     segment(index=-1, undefined="")
        Returns the index-th URI path segment.

        The arguments are:

         index
            The path segment index to return counting from 0.
         undefined
            Returns this value if the resource or segment index is empty.

     size(zero="0", precision=1, units_in, units_out, min=0)
        Formats a human readable size in bytes.

        The arguments are:

         zero
            Returns this if size==0. Ignored if None.
         precision
            The number of digits displayed after the decimal point.
         units_in
            A unit suffix (only the first character is checked) or unit size.
            The size is multiplied by this. The default is 1.0.
         units_out
            A unit suffix (only the first character is checked) or unit size.
            The size is divided by this. The default is 1.0.
         min
            Sizes < min will be listed as "< min".

     slice(op=":", undefined="")
        Returns a list slice specified by op.

        The op parameter consists of up to three colon-delimeted integers:
        start, end, and step. The parameter supports half-open ranges: start
        and end values can be omitted, representing the first and last
        positions of the resource respectively.

        The step value represents the increment between items in the resource
        included in the slice. A step of 2 results in a slice that contains
        every other item in the resource.

        Negative values for start and end indicate that the positons should
        start from the last position of the resource. A negative value for step
        indicates that the slice should contain items in reverse order.

        If op contains no colons, the slice consists of the single item at the
        specified position in the resource.

        The arguments are:

         op
            The slice operation.
         undefined
            Returns this value if the slice cannot be created, or the resulting
            slice is empty.

        For example:

        [1,2,3].slice(1:) returns [2,3].

        [1,2,3].slice(:2) returns [1,2].

        [1,2,3].slice(-1:) returns [3].

        [1,2,3].slice(: :-1) returns [3,2,1].

        [1,2,3].slice(1) returns [2].

     sort(attr="")
        Sorts the elements of the resource list by a given attribute (or
        itself).

        A string resource is treated as a list of characters.

        The arguments are:

         attr
            The optional field of an object or dict by which to sort.

        For example:

        "b/a/d/c".split("/").sort() returns [a, b, c, d].

     split(sep="/", undefined="")
        Splits a string by the value of sep.

        The arguments are:

         sep
            The separator value to use when splitting.
         undefined
            Returns this value if the result after splitting is empty.

        For example:

        "a/b/c/d".split() returns ["a", "b", "c", "d"].

     sub(pattern, replacement, count=0, ignorecase=true)
        Replaces a pattern matched in a string with the given replacement.

        Return the string obtained by replacing the leftmost non-overlapping
        occurrences of pattern in the string by replacement. If the pattern
        isn't found, then the original string is returned unchanged.

        The arguments are:

         pattern
            The regular expression pattern to match in r that we want to
            replace with something.
         replacement
            The value to substitute into whatever pattern is matched.
         count
            The max number of pattern occurrences to be replaced. Must be
            non-negative. If omitted or zero, all occurrences will be replaces.
         ignorecase
            Whether to perform case-insensitive matching.

        For example:

         table(field.sub(" there", ""))
            If the field string is "hey there" it will be displayed as "hey".

     synthesize(args)
        Synthesizes a new resource from the schema arguments.

        A list of tuple arguments controls the resource synthesis. Each tuple
        is a schema that defines the synthesis of one resource list item. Each
        schema item defines the synthesis of one synthesized_resource attribute
        from an original_resource attribute.

        There are three kinds of schema items:

         name:literal
            The value for the name attribute in the synthesized resource is the
            literal value.
         name=key
            The value for the name attribute in the synthesized_resource is the
            value of key in the original_resource.
         key
            All the attributes of the value of key in the original_resource are
            added to the attributes in the synthesized_resource.

        The arguments are:

         args
            The list of schema tuples.

        For example:

         This returns a list of two resource items
            synthesize((name:up, upInfo), (name:down, downInfo))
         If upInfo and downInfo serialize to
            {"foo": 1, "bar": "yes"}
         and
            {"foo": 0, "bar": "no"}
         then the synthesized resource list is
            [{"name": "up", "foo": 1, "bar": "yes"}, {"name": "down", "foo": 0,
            "bar": "no"}]
         This could then be displayed by a nested table using
            synthesize(...):format="table(name, foo, bar)"

     trailoff(character_limit, undefined="")
        Returns r if less than limit, else abbreviated r followed by ellipsis.

        The arguments are:

         character_limit
            An int. Max length of return string. Must be greater than 3 because
            ellipsis (3 chars) is appended to abridged strings.
         undefined
            A string. Return if r or character_limit is invalid.

     upper()
     Returns r in uppercase.
     uri(undefined=".")
        Gets the resource URI.

        The arguments are:

         undefined
            Returns this if a the URI for r cannot be determined.

     yesno(yes, no="No")
        Returns no if the resource is empty, yes or the resource itself
        otherwise.

        The arguments are:

         yes
            If the resource is not empty then returns yes or the resource
            itself if yes is not defined.
         no
            Returns this value if the resource is empty.

    The cloudbuild transform functions are:

     build_images(undefined="")
        Returns the formatted build results images.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     build_source(undefined="")
        Returns the formatted build source.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     result_duration(resource, undefined="")
        Returns the formatted result duration.

        The arguments are:

         resource
            JSON-serializable object.
         undefined
            Returns this value if the resource cannot be formatted.

     result_status(resource, undefined="")
        Returns the formatted result status.

        The arguments are:

         resource
            JSON-serializable object.
         undefined
            Returns this value if the resource cannot be formatted.

    The compute transform functions are:

     firewall_rule(undefined="")
        Returns a compact string describing a firewall rule.

        The compact string is a comma-separated list of PROTOCOL:PORT_RANGE
        items. If a particular protocol has no port ranges then only the
        protocol is listed.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     image_alias(undefined="")
        Returns a comma-separated list of alias names for an image.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     location(undefined="")
        Return the region or zone name.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     location_scope(undefined="")
        Return the location scope name, either region or zone.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     machine_type(undefined="")
        Return the formatted name for a machine type.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     name(undefined="")
        Returns a resource name from an URI.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     next_maintenance(undefined="")
        Returns the timestamps of the next scheduled maintenance.

        All timestamps are assumed to be ISO strings in the same timezone.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     operation_http_status(undefined="")
        Returns the HTTP response code of an operation.

        The arguments are:

         undefined
            Returns this value if there is no response code.

     org_firewall_rule(rule, undefined="")
        Returns a compact string describing an organization firewall rule.

        The compact string is a comma-separated list of PROTOCOL:PORT_RANGE
        items. If a particular protocol has no port ranges then only the
        protocol is listed.

        The arguments are:

         rule
            JSON-serializable object.
         undefined
            Returns this value if the resource cannot be formatted.

     project(undefined="")
        Returns a project name from a selfLink.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     quota(undefined="")
        Formats a quota as usage/limit.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     scoped_suffixes(uris, undefined="")
     Get just the scoped part of the object the uri refers to.
     status(undefined="")
        Returns the machine status with deprecation information if applicable.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

     type_suffix(uri, undefined="")
     Get the type and the name of the object the uri refers to.
     vpn_tunnel_gateway(vpn_tunnel, undefined="")
        Returns the gateway for the specified VPN tunnel resource if
        applicable.

        The arguments are:

         vpn_tunnel
            JSON-serializable object of a VPN tunnel.
         undefined
            Returns this value if the resource cannot be formatted.

     zone(undefined="")
        Returns a zone name from a selfLink.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

    The container transform functions are:

     master_version(undefined="")
        Returns the formatted master version.

        The arguments are:

         undefined
            Returns this value if the resource cannot be formatted.

    The functions transform functions are:

     environments(data)
        Returns the supported environments for a runtime.

        The arguments are:

         data
            JSON-serializable Runtimes object.

     generation(data, undefined="-")
        Returns Cloud Functions product version.

        The arguments are:

         data
            JSON-serializable 1st and 2nd gen Functions objects.
         undefined
            Returns this value if the resource cannot be formatted.

     state(data, undefined="")
        Returns textual information about functions state.

        The arguments are:

         data
            JSON-serializable object.
         undefined
            Returns this value if the resource cannot be formatted.

     trigger(data, undefined="")
        Returns textual information about functions trigger.

        The arguments are:

         data
            JSON-serializable 1st and 2nd gen Functions objects.
         undefined
            Returns this value if the resource cannot be formatted.

    The runtime_config transform functions are:

     waiter_status(undefined="")
        Returns a short description of the status of a waiter or waiter
        operation.

        Status will be one of WAITING, SUCCESS, FAILURE, or TIMEOUT.

        The arguments are:

         undefined
            Returns this value if the resource status cannot be determined.

        For example:

         --format="table(name, status())"
            Displays the status in table column two.

  Key Attributes
    Key attributes control formatted output. Each projection key may have zero
    or more attributes:

        _key_:_attribute_=_value_...

    where =value is omitted for Boolean attributes and no-attribute sets the
    attribute to false. Attribute values may appear in any order, but must be
    specified after any transform calls. The attributes are:

     alias=ALIAS-NAME
        Sets ALIAS-NAME as an alias for the projection key.

     align=ALIGNMENT
        Specifies the output column data alignment. Used by the table format.
        The alignment values are:

         left
            Left (default).

         center
            Center.

         right
            Right.

     label=LABEL
        A string value used to label output. Use :label="" or :label='' for no
        label. The table format uses LABEL values as column headings. Also sets
        LABEL as an alias for the projection key. The default label is the
        disambiguated right hand parts of the column key name in
        ANGRY_SNAKE_CASE.

     [no-]reverse
        Sets the key sort order to descending. no-reverse resets to the default
        ascending order.

     sort=SORT-ORDER
        An integer counting from 1. Keys with lower sort-order are sorted
        first. Keys with same sort order are sorted left to right. Columns are
        sorted based on displayed value alone, irrespective of the type of
        value(date, time, etc.).

     wrap[=MIN-WIDTH]
        Enables the column text to be wrapped if the table would otherwise be
        too wide for the display. The column will be wrapped in the available
        space with a minimum width of either the default or of MIN-WIDTH if
        specified. The default is 10 characters.

     width=COLUMN-WIDTH
        An integer denoting the width for the column. The default fits the
        table to the terminal width or 80 if the output is not a terminal.

EXAMPLES
    List a table of instance zone (sorted in descending order) and name (sorted
    by name and centered with column heading INSTANCE) and creationTimestamp
    (listed using the strftime(3) year-month-day format with column heading
    START):

        $ gcloud compute instances list \
            --format="table(name:sort=2:align=center:label=INSTANCE, \
        zone:sort=1:reverse, creationTimestamp.date("%Y-%m-%d"):label=START)\
        "

    List only the name, status and zone instance resource keys in YAML format:

        $ gcloud compute instances list --format="yaml(name, status, zone)"

    List only the config.account key value(s) in the info resource:

        $ gcloud info --format="value(config.account)"

    List the name, id, and description of an imaginary foo resource, fixing the
    name column width to 16 characters, wrapping the id column with the default
    minimum width and the description column with a minimum width of 20
    characters:

        $ gcloud example foo list \
            --format="table(name:width=16, id:wrap, description:wrap=20)"

NOTES
    These variants are also available:

        $ gcloud alpha topic projections

        $ gcloud beta topic projections
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud compute instances list \
    --format="table(name:sort=2:align=center:label=INSTANCE, zone:sort=1:reverse, creationTimestamp.date('%Y-%m-%d'):label=START)"
```

### gcloud beta topic projections

```text
NAME
    gcloud beta topic projections - resource projections supplementary help
```

### gcloud alpha topic projections

```text
NAME
    gcloud alpha topic projections - resource projections supplementary help
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): a double-quoted argument inside the double-quoted `--format` / `--filter` value (for example `date("%Y-%m-%d")`) ends the shell quoting early, so the runnable form uses single quotes inside.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/projections (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
