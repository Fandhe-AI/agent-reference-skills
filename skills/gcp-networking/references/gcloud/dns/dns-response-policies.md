---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/response-policies
---

# gcloud dns response-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns response-policies create

```text
NAME
    gcloud dns response-policies create - creates a new Cloud DNS response
        policy

SYNOPSIS
    gcloud dns response-policies create RESPONSE_POLICIES
        --description=DESCRIPTION [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a new Cloud DNS response policy.

EXAMPLES
    To create a new response policy with minimal arguments, run:

        $ gcloud dns response-policies create myresponsepolicy \
            --description='My new response policy.' --networks=''

    To create a new response policy with all optional arguments, run:

        $ gcloud dns response-policies create myresponsepolicy \
            --description='My new response policy.' \
            --networks=network1,network2

    To create a new zonal response policy scoped to a GKE cluster in        us-central1-a, run (alpha/beta):

        $ gcloud dns response-policies create beta myresponsepolicy \
            --description='My new response
        policy.' --gkeclusters=cluster1 --location=us-central1-a

POSITIONAL ARGUMENTS
     Response policy resource - The response policy to create. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument response_policies on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICIES
          ID of the response_policy or fully qualified identifier for the
          response_policy.

          To set the response-policy attribute:
          + provide the argument response_policies on the command line.

REQUIRED FLAGS
     --description=DESCRIPTION
        A description of the response policy.

OPTIONAL FLAGS
     --gkeclusters=[GKECLUSTERS,...]
        The comma-separated list of GKE cluster names to associate with the
        response policy.

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --networks=[NETWORKS,...]
        The comma-separated list of network names to associate with the
        response policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies create

        $ gcloud beta dns response-policies create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud dns response-policies create myresponsepolicy \
    --description='My new response policy.' \
    --gkeclusters=cluster1 \
    --location=us-central1-a
```

### gcloud dns response-policies delete

```text
NAME
    gcloud dns response-policies delete - deletes a Cloud DNS response policy

SYNOPSIS
    gcloud dns response-policies delete RESPONSE_POLICIES [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a new Cloud DNS response policy.

EXAMPLES
    To delete a global response policy (default), run:

        $ gcloud dns response-policies delete myresponsepolicy

POSITIONAL ARGUMENTS
     Response policy resource - The response policy to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument response_policies on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICIES
          ID of the response_policy or fully qualified identifier for the
          response_policy.

          To set the response-policy attribute:
          + provide the argument response_policies on the command line.

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies delete

        $ gcloud beta dns response-policies delete
```

### gcloud dns response-policies describe

```text
NAME
    gcloud dns response-policies describe - describes a Cloud DNS response
        policy

SYNOPSIS
    gcloud dns response-policies describe RESPONSE_POLICIES
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command describes details of a Cloud DNS response policy.

EXAMPLES
    To describe a global response policy (default), run:

        $ gcloud dns response-policies describe myresponsepolicy

POSITIONAL ARGUMENTS
     Response policy resource - The response policy to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument response_policies on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICIES
          ID of the response_policy or fully qualified identifier for the
          response_policy.

          To set the response-policy attribute:
          + provide the argument response_policies on the command line.

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies describe

        $ gcloud beta dns response-policies describe
```

### gcloud dns response-policies list

```text
NAME
    gcloud dns response-policies list - displays the list of all Cloud DNS
        response policies in a given project

SYNOPSIS
    gcloud dns response-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list response policies in Global Cloud DNS server (default), run:

        $ gcloud dns response-policies list

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies list

        $ gcloud beta dns response-policies list
```

### gcloud dns response-policies rules create

```text
NAME
    gcloud dns response-policies rules create - creates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud dns response-policies rules create
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        --dns-name=DNS_NAME [--behavior=BEHAVIOR]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a new response policy rule with local data rrsets, run:

        $ gcloud dns response-policies rules create myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --dns-name="www.zone.com." \
            --local-data=name=www.zone.com.,type=CNAME,ttl=21600,\
        rrdatas=zone.com.

    To create a new response policy rule with behavior, run:

        $ gcloud dns response-policies rules create myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --dns-name="www.zone.com." --behavior=bypassResponsePolicy

    To create a new response policy rule with behavior in a zonal response
    policy in us-east1-a, run:

        $ gcloud dns response-policies rules create myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --dns-name="www.zone.com." --behavior=bypassResponsePolicy \
            --location=us-east1-a

POSITIONAL ARGUMENTS
     Response policy rule resource - The response policy rule to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument response_policy_rule on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICY_RULE
          ID of the response_policy_rule or fully qualified identifier for the
          response_policy_rule.

          To set the response-policy-rule attribute:
          + provide the argument response_policy_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --response-policy=RESPONSE_POLICY
          The Cloud DNS response policy name response_policy_rule.

          To set the response-policy attribute:
          + provide the argument response_policy_rule on the command line
            with a fully specified name;
          + provide the argument --response-policy on the command line.

REQUIRED FLAGS
     --dns-name=DNS_NAME
        DNS name (wildcard or exact) to apply this rule to.

OPTIONAL FLAGS
     --behavior=BEHAVIOR
        The response policy rule query behavior. BEHAVIOR must be one of:
        behaviorUnspecified, bypassResponsePolicy.

     --local-data=[LOCAL_DATA,...]
        All resource record sets for this selector, one per resource record
        type. The name must match the dns_name.

        This is a repeated argument that can be specified multiple times to
        specify multiple local data rrsets. (e.g.
        --local-data=name="zone.com.",type="A",ttl=21600,rrdata="1.2.3.4 "
        --local-data=name="www.zone.com.",type="CNAME",ttl=21600,rrdata="1.2.3.4|5.6.7.8")

         name
            The DnsName of a resource record set.

         type
            Type of all resource records in this set. For example, A, AAAA,
            SOA, MX, NS, TXT ...

         ttl
            Number of seconds that this ResourceRecordSet can be cached by
            resolvers.

         rrdatas
            The list of datas for this record, split by "|".

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies rules create

        $ gcloud beta dns response-policies rules create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dns response-policies rules create myresponsepolicyrule \
    --response-policy="myresponsepolicy" \
    --dns-name="www.zone.com." \
    --local-data=name=www.zone.com.,type=CNAME,ttl=21600,rrdatas=zone.com.
```

### gcloud dns response-policies rules delete

```text
NAME
    gcloud dns response-policies rules delete - deletes a Cloud DNS response
        policy rule

SYNOPSIS
    gcloud dns response-policies rules delete
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a response policy rule, run:

        $ gcloud dns response-policies rules delete \
            --response-policy=myresponsepolicy rulename

POSITIONAL ARGUMENTS
     Response policy rule resource - The response policy rule to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument response_policy_rule on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICY_RULE
          ID of the response_policy_rule or fully qualified identifier for the
          response_policy_rule.

          To set the response-policy-rule attribute:
          + provide the argument response_policy_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --response-policy=RESPONSE_POLICY
          The Cloud DNS response policy name response_policy_rule.

          To set the response-policy attribute:
          + provide the argument response_policy_rule on the command line
            with a fully specified name;
          + provide the argument --response-policy on the command line.

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies rules delete

        $ gcloud beta dns response-policies rules delete
```

### gcloud dns response-policies rules describe

```text
NAME
    gcloud dns response-policies rules describe - shows details about a Cloud
        DNS response policy rule

SYNOPSIS
    gcloud dns response-policies rules describe
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To show details about a response policy rule, run:

        $ gcloud dns response-policies rules describe \
            --response-policy=myresponsepolicy rulename

POSITIONAL ARGUMENTS
     Response policy rule resource - The response policy rule to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument response_policy_rule on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICY_RULE
          ID of the response_policy_rule or fully qualified identifier for the
          response_policy_rule.

          To set the response-policy-rule attribute:
          + provide the argument response_policy_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --response-policy=RESPONSE_POLICY
          The Cloud DNS response policy name response_policy_rule.

          To set the response-policy attribute:
          + provide the argument response_policy_rule on the command line
            with a fully specified name;
          + provide the argument --response-policy on the command line.

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies rules describe

        $ gcloud beta dns response-policies rules describe
```

### gcloud dns response-policies rules list

```text
NAME
    gcloud dns response-policies rules list - displays the list of all a Cloud
        DNS response policy rules

SYNOPSIS
    gcloud dns response-policies rules list RESPONSE_POLICIES
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list response policie rules in Global Cloud DNS server (default), run:

        $ gcloud dns response-policies rules list myresponsepolicy

POSITIONAL ARGUMENTS
     Response policy resource - The response policy to list. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument response_policies on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICIES
          ID of the response_policy or fully qualified identifier for the
          response_policy.

          To set the response-policy attribute:
          + provide the argument response_policies on the command line.

FLAGS
     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies rules list

        $ gcloud beta dns response-policies rules list
```

### gcloud dns response-policies rules update

```text
NAME
    gcloud dns response-policies rules update - updates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud dns response-policies rules update
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--behavior=BEHAVIOR] [--dns-name=DNS_NAME]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates a new Cloud DNS response policy rule.

EXAMPLES
    To update a new response policy rule with DNS name, run:

        $ gcloud dns response-policies rules update myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --dns-name="www.newzone.com." # pylint: disable=line-too-long

    To update a new response policy rule with local data rrsets, run:

        $ gcloud dns response-policies rules update myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --local-data=name=www.zone.com.,type=A,ttl=21600,rrdatas=1.2.3.4

    To update a new response policy rule with behavior, run:

        $ gcloud dns response-policies rules update myresponsepolicyrule \
            --response-policy="myresponsepolicy" \
            --behavior=bypassResponsePolicy

POSITIONAL ARGUMENTS
     Response policy rule resource - The response policy rule to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument response_policy_rule on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICY_RULE
          ID of the response_policy_rule or fully qualified identifier for the
          response_policy_rule.

          To set the response-policy-rule attribute:
          + provide the argument response_policy_rule on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --response-policy=RESPONSE_POLICY
          The Cloud DNS response policy name response_policy_rule.

          To set the response-policy attribute:
          + provide the argument response_policy_rule on the command line
            with a fully specified name;
          + provide the argument --response-policy on the command line.

FLAGS
     --behavior=BEHAVIOR
        The response policy rule query behavior. BEHAVIOR must be one of:
        behaviorUnspecified, bypassResponsePolicy.

     --dns-name=DNS_NAME
        DNS name (wildcard or exact) to apply this rule to.

     --local-data=[LOCAL_DATA,...]
        All resource record sets for this selector, one per resource record
        type. The name must match the dns_name.

        This is a repeated argument that can be specified multiple times to
        specify multiple local data rrsets. (e.g.
        --local-data=name="zone.com.",type="A",ttl=21600,rrdata="1.2.3.4 "
        --local-data=name="www.zone.com.",type="CNAME",ttl=21600,rrdata="1.2.3.4|5.6.7.8")

         name
            The DnsName of a resource record set.

         type
            Type of all resource records in this set. For example, A, AAAA,
            SOA, MX, NS, TXT ...

         ttl
            Number of seconds that this ResourceRecordSet can be cached by
            resolvers.

         rrdatas
            The list of datas for this record, split by "|".

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies rules update

        $ gcloud beta dns response-policies rules update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud dns response-policies rules update myresponsepolicyrule \
    --response-policy="myresponsepolicy" \
    --dns-name="www.newzone.com."
```

### gcloud dns response-policies update

```text
NAME
    gcloud dns response-policies update - updates a Cloud DNS response policy

SYNOPSIS
    gcloud dns response-policies update RESPONSE_POLICIES
        [--description=DESCRIPTION] [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates a Cloud DNS response policy.

EXAMPLES
    To update a response policy with minimal arguments, run:

        $ gcloud dns response-policies update myresponsepolicy \
            --description='My updated response policy.' --networks=''

    To update a response policy with all optional arguments, run:

        $ gcloud dns response-policies update myresponsepolicy \
            --description='My updated response policy.' \
            --networks=network1,network2

    To update a new zonal response policy scoped to a GKE cluster in
    us-central1-a, run:

        $ gcloud dns response-policies update myresponsepolicy \
            --description='My new response policy.' --gkeclusters=cluster1 \
            --location=us-central1-a

POSITIONAL ARGUMENTS
     Response policy resource - The response policy to update. This represents
     a Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument response_policies on the command line with a
        fully specified name;
      * set the property core/project.

     This must be specified.

       RESPONSE_POLICIES
          ID of the response_policy or fully qualified identifier for the
          response_policy.

          To set the response-policy attribute:
          + provide the argument response_policies on the command line.

FLAGS
     --description=DESCRIPTION
        A description of the response policy.

     --gkeclusters=[GKECLUSTERS,...]
        The comma-separated list of GKE cluster names to associate with the
        response policy.

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --networks=[NETWORKS,...]
        The comma-separated list of network names to associate with the
        response policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns response-policies update

        $ gcloud beta dns response-policies update
```

### gcloud beta dns response-policies create

```text
NAME
    gcloud beta dns response-policies create - creates a new Cloud DNS response
        policy

SYNOPSIS
    gcloud beta dns response-policies create RESPONSE_POLICIES
        --description=DESCRIPTION [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies delete

```text
NAME
    gcloud beta dns response-policies delete - deletes a Cloud DNS response
        policy

SYNOPSIS
    gcloud beta dns response-policies delete RESPONSE_POLICIES
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies describe

```text
NAME
    gcloud beta dns response-policies describe - describes a Cloud DNS response
        policy

SYNOPSIS
    gcloud beta dns response-policies describe RESPONSE_POLICIES
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies list

```text
NAME
    gcloud beta dns response-policies list - displays the list of all Cloud DNS
        response policies in a given project

SYNOPSIS
    gcloud beta dns response-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies rules create

```text
NAME
    gcloud beta dns response-policies rules create - creates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud beta dns response-policies rules create
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        --dns-name=DNS_NAME [--behavior=BEHAVIOR]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies rules delete

```text
NAME
    gcloud beta dns response-policies rules delete - deletes a Cloud DNS
        response policy rule

SYNOPSIS
    gcloud beta dns response-policies rules delete
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies rules describe

```text
NAME
    gcloud beta dns response-policies rules describe - shows details about a
        Cloud DNS response policy rule

SYNOPSIS
    gcloud beta dns response-policies rules describe
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies rules list

```text
NAME
    gcloud beta dns response-policies rules list - displays the list of all a
        Cloud DNS response policy rules

SYNOPSIS
    gcloud beta dns response-policies rules list RESPONSE_POLICIES
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies rules update

```text
NAME
    gcloud beta dns response-policies rules update - updates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud beta dns response-policies rules update
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--behavior=BEHAVIOR] [--dns-name=DNS_NAME]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns response-policies update

```text
NAME
    gcloud beta dns response-policies update - updates a Cloud DNS response
        policy

SYNOPSIS
    gcloud beta dns response-policies update RESPONSE_POLICIES
        [--description=DESCRIPTION] [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies create

```text
NAME
    gcloud alpha dns response-policies create - creates a new Cloud DNS
        response policy

SYNOPSIS
    gcloud alpha dns response-policies create RESPONSE_POLICIES
        --description=DESCRIPTION [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies delete

```text
NAME
    gcloud alpha dns response-policies delete - deletes a Cloud DNS response
        policy

SYNOPSIS
    gcloud alpha dns response-policies delete RESPONSE_POLICIES
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies describe

```text
NAME
    gcloud alpha dns response-policies describe - describes a Cloud DNS
        response policy

SYNOPSIS
    gcloud alpha dns response-policies describe RESPONSE_POLICIES
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies list

```text
NAME
    gcloud alpha dns response-policies list - displays the list of all Cloud
        DNS response policies in a given project

SYNOPSIS
    gcloud alpha dns response-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies rules create

```text
NAME
    gcloud alpha dns response-policies rules create - creates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud alpha dns response-policies rules create
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        --dns-name=DNS_NAME [--behavior=BEHAVIOR]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies rules delete

```text
NAME
    gcloud alpha dns response-policies rules delete - deletes a Cloud DNS
        response policy rule

SYNOPSIS
    gcloud alpha dns response-policies rules delete
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies rules describe

```text
NAME
    gcloud alpha dns response-policies rules describe - shows details about a
        Cloud DNS response policy rule

SYNOPSIS
    gcloud alpha dns response-policies rules describe
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies rules list

```text
NAME
    gcloud alpha dns response-policies rules list - displays the list of all a
        Cloud DNS response policy rules

SYNOPSIS
    gcloud alpha dns response-policies rules list RESPONSE_POLICIES
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies rules update

```text
NAME
    gcloud alpha dns response-policies rules update - updates a new Cloud DNS
        response policy rule

SYNOPSIS
    gcloud alpha dns response-policies rules update
        (RESPONSE_POLICY_RULE : --response-policy=RESPONSE_POLICY)
        [--behavior=BEHAVIOR] [--dns-name=DNS_NAME]
        [--local-data=[LOCAL_DATA,...]] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns response-policies update

```text
NAME
    gcloud alpha dns response-policies update - updates a Cloud DNS response
        policy

SYNOPSIS
    gcloud alpha dns response-policies update RESPONSE_POLICIES
        [--description=DESCRIPTION] [--gkeclusters=[GKECLUSTERS,...]]
        [--location=LOCATION] [--networks=[NETWORKS,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the GKE-scoped `create` example, introduced with "run (alpha/beta)", is written `gcloud dns response-policies create beta myresponsepolicy`; gcloud 593.0.0 rejects it ("unrecognized arguments: myresponsepolicy"). The GA SYNOPSIS lists `--gkeclusters` and `--location`, and the GA command parses without `beta`, so the runnable form drops `beta`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the first `rules update` example ends with `# pylint: disable=line-too-long`, which is not part of the command; the runnable form omits it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/response-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
