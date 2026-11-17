---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/managed-zones
---

# gcloud dns managed-zones

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dns managed-zones create

```text
NAME
    gcloud dns managed-zones create - create a Cloud DNS managed-zone

SYNOPSIS
    gcloud dns managed-zones create ZONE_NAME --dns-name=DNS_NAME
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--labels=[KEY=VALUE,...]]
        [--location=LOCATION] [--[no-]log-dns-queries]
        [--managed-reverse-lookup] [--networks=[NETWORK,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--service-directory-namespace=SERVICE_DIRECTORY_NAMESPACE]
        [--visibility=VISIBILITY; default="public"]
        [--zsk-algorithm=ZSK_ALGORITHM] [--zsk-key-length=ZSK_KEY_LENGTH]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a Cloud DNS managed-zone.

EXAMPLES
    To create a managed-zone, run:

        $ gcloud dns managed-zones create my-zone --dns-name=my.zone.com. \
            --description="My zone!"

    To create a managed-zone with DNSSEC, run:

        $ gcloud dns managed-zones create my-zone-2 \
            --description="Signed Zone" --dns-name=myzone.example \
            --dnssec-state=on

        To create a zonal managed-zone scoped to a GKE Cluster in us-east1-a, run:

        $ gcloud dns managed-zones create my-zonal-zone \
            --description="Signed Zone" --dns-name=cluster.local \
            --visibility=private --gkeclusters=cluster1 \
            --location=us-east1-a

POSITIONAL ARGUMENTS
     ZONE_NAME
        The name of the managed-zone to be created.

REQUIRED FLAGS
     --dns-name=DNS_NAME
        The DNS name suffix that will be managed with the created zone.

OPTIONAL FLAGS
     --denial-of-existence=DENIAL_OF_EXISTENCE
        Requires DNSSEC enabled. DENIAL_OF_EXISTENCE must be one of: nsec,
        nsec3.

     --description=DESCRIPTION
        Short description for the managed zone.

     --dnssec-state=DNSSEC_STATE
        The DNSSEC state for this managed zone. DNSSEC_STATE must be one of:

         off
            Disable DNSSEC for the managed zone.
         on
            Enable DNSSEC for the managed zone.
         transfer
            Enable DNSSEC and allow transferring a signed zone in or out.

     --forwarding-targets=[IP_ADDRESSES,...]
        List of IPv4/IPv6 addresses or one domain name of the target name
        server that the zone will forward queries to. Ignored for public
        visibility. Non-RFC1918 addresses will forward to the target through
        the Internet. RFC1918 addresses will forward through the VPC.

     --gkeclusters=[GKECLUSTERS,...]
        List of GKE clusters that the zone should be visible in if the zone
        visibility is [private].

     --ksk-algorithm=KSK_ALGORITHM
        String mnemonic specifying the DNSSEC algorithm of the key-signing key.
        Requires DNSSEC enabled. KSK_ALGORITHM must be one of: ecdsap256sha256,
        ecdsap384sha384, rsasha1, rsasha256, rsasha512.

     --ksk-key-length=KSK_KEY_LENGTH
        Length of the key-signing key in bits. Requires DNSSEC enabled.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --[no-]log-dns-queries
        Specifies whether to enable query logging. Defaults to False. Use
        --log-dns-queries to enable and --no-log-dns-queries to disable.

     --managed-reverse-lookup
        Specifies whether this zone is a managed reverse lookup zone, required
        for Cloud DNS to correctly resolve Non-RFC1918 PTR records.

     --networks=[NETWORK,...]
        List of networks that the zone should be visible in if the zone
        visibility is [private].

     --private-forwarding-targets=[IP_ADDRESSES,...]
        List of IPv4/IPv6 addresses or one domain name of the target name
        server that the zone will forward queries to. Ignored for public
        visibility. All addresses specified for this parameter will be reached
        through the VPC.

     --service-directory-namespace=SERVICE_DIRECTORY_NAMESPACE
        The fully qualified URL of the service directory namespace that should
        be associated with the zone. Ignored for public visibility zones.

     --visibility=VISIBILITY; default="public"
        Visibility of the zone. Public zones are visible to the public
        internet. Private zones are only visible in your internal networks
        denoted by the --networks flag. VISIBILITY must be one of: public,
        private.

     --zsk-algorithm=ZSK_ALGORITHM
        String mnemonic specifying the DNSSEC algorithm of the key-signing key.
        Requires DNSSEC enabled. ZSK_ALGORITHM must be one of: ecdsap256sha256,
        ecdsap384sha384, rsasha1, rsasha256, rsasha512.

     --zsk-key-length=ZSK_KEY_LENGTH
        Length of the zone-signing key in bits. Requires DNSSEC enabled.

     --target-network=TARGET_NETWORK
        Network ID of the Google Compute Engine private network to forward
        queries to.

     --target-project=TARGET_PROJECT
        Project ID of the Google Compute Engine private network to forward
        queries to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns managed-zones create

        $ gcloud beta dns managed-zones create
```

### gcloud dns managed-zones delete

```text
NAME
    gcloud dns managed-zones delete - delete an empty Cloud DNS managed-zone

SYNOPSIS
    gcloud dns managed-zones delete ZONE_NAME [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes an empty Cloud DNS managed-zone. An empty managed-zone
    has only SOA and NS record-sets.

EXAMPLES
    To delete an empty managed-zone, run:

        $ gcloud dns managed-zones delete my-zone

    To delete an empty zonal managed-zone in us-east1-c, run:

        $ gcloud dns managed-zones delete my-zone --location=us-east1-c

POSITIONAL ARGUMENTS
     ZONE_NAME
        The name of the empty managed-zone to be deleted.

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

        $ gcloud alpha dns managed-zones delete

        $ gcloud beta dns managed-zones delete
```

### gcloud dns managed-zones describe

```text
NAME
    gcloud dns managed-zones describe - view the details of a Cloud DNS
        managed-zone

SYNOPSIS
    gcloud dns managed-zones describe ZONE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the details of the specified managed-zone.

EXAMPLES
    To display the details of your managed-zone, run:

        $ gcloud dns managed-zones describe my-zone

    To display the details of a zonal managed-zone in Zonal Cloud DNS service
    in us-east1-c, run:

        $ gcloud dns managed-zones describe my-zone --location=us-east1-c

POSITIONAL ARGUMENTS
     Zone resource - The name of the managed-zone to be described. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

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

        $ gcloud alpha dns managed-zones describe

        $ gcloud beta dns managed-zones describe
```

### gcloud dns managed-zones get-iam-policy

```text
NAME
    gcloud dns managed-zones get-iam-policy - get the IAM policy for a Cloud
        DNS managed-zone

SYNOPSIS
    gcloud dns managed-zones get-iam-policy ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the IAM policy of the specified managed-zone.

EXAMPLES
    To view the details of your managed-zone IAM policy , run:

        $ gcloud dns managed-zones get-iam-policy my-zone

POSITIONAL ARGUMENTS
     Zone resource - The name of the managed-zone to get the IAM policy for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns managed-zones get-iam-policy

        $ gcloud beta dns managed-zones get-iam-policy
```

### gcloud dns managed-zones list

```text
NAME
    gcloud dns managed-zones list - view the list of all your managed-zones

SYNOPSIS
    gcloud dns managed-zones list [--location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command displays the list of your managed-zones.

EXAMPLES
    To see the list of all managed-zones, run:

        $ gcloud dns managed-zones list

    To see the list of first 10 managed-zones, run:

        $ gcloud dns managed-zones list --limit=10

    To see the list of all managed-zones in a Zonal Cloud DNS service in
    us-east1-c, run:

        $ gcloud dns managed-zones list --location=us-east1-c

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

        $ gcloud alpha dns managed-zones list

        $ gcloud beta dns managed-zones list
```

### gcloud dns managed-zones set-iam-policy

```text
NAME
    gcloud dns managed-zones set-iam-policy - set the IAM policy for a Cloud
        DNS managed-zone

SYNOPSIS
    gcloud dns managed-zones set-iam-policy ZONE --policy-file=POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command sets the IAM policy of the specified managed-zone.

EXAMPLES
    To set the IAM policy of your managed-zone , run:

        $ gcloud dns managed-zones set-iam-policy my-zone \
            --policy-file=policy.json

POSITIONAL ARGUMENTS
     Zone resource - The name of the managed-zone to set the IAM policy for.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

REQUIRED FLAGS
     --policy-file=POLICY_FILE
        JSON or YAML file with the IAM policy

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns managed-zones set-iam-policy

        $ gcloud beta dns managed-zones set-iam-policy
```

### gcloud dns managed-zones update

```text
NAME
    gcloud dns managed-zones update - update an existing Cloud DNS managed-zone

SYNOPSIS
    gcloud dns managed-zones update ZONE [--async]
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--location=LOCATION]
        [--[no-]log-dns-queries] [--managed-reverse-lookup]
        [--networks=[NETWORK,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--update-labels=[KEY=VALUE,...]] [--zsk-algorithm=ZSK_ALGORITHM]
        [--zsk-key-length=ZSK_KEY_LENGTH]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an existing Cloud DNS managed-zone.

EXAMPLES
    To change the description of a managed-zone, run:

        $ gcloud dns managed-zones update my-zone \
            --description="Hello, world!"

    To change the description of a zonal managed-zone in us-east1-a, run:

        $ gcloud dns managed-zones update my-zone \
            --description="Hello, world!" --location=us-east1-a

POSITIONAL ARGUMENTS
     Zone resource - The name of the managed-zone to be updated. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --denial-of-existence=DENIAL_OF_EXISTENCE
        Requires DNSSEC enabled. DENIAL_OF_EXISTENCE must be one of: nsec,
        nsec3.

     --description=DESCRIPTION
        Short description for the managed zone.

     --dnssec-state=DNSSEC_STATE
        The DNSSEC state for this managed zone. DNSSEC_STATE must be one of:

         off
            Disable DNSSEC for the managed zone.
         on
            Enable DNSSEC for the managed zone.
         transfer
            Enable DNSSEC and allow transferring a signed zone in or out.

     --forwarding-targets=[IP_ADDRESSES,...]
        List of IPv4/IPv6 addresses or one domain name of the target name
        server that the zone will forward queries to. Ignored for public
        visibility. Non-RFC1918 addresses will forward to the target through
        the Internet. RFC1918 addresses will forward through the VPC.

     --gkeclusters=[GKECLUSTERS,...]
        List of GKE clusters that the zone should be visible in if the zone
        visibility is [private].

     --ksk-algorithm=KSK_ALGORITHM
        String mnemonic specifying the DNSSEC algorithm of the key-signing key.
        Requires DNSSEC enabled. KSK_ALGORITHM must be one of: ecdsap256sha256,
        ecdsap384sha384, rsasha1, rsasha256, rsasha512.

     --ksk-key-length=KSK_KEY_LENGTH
        Length of the key-signing key in bits. Requires DNSSEC enabled.

     --location=LOCATION
        Specifies the desired service location the request is sent to. Defaults
        to Cloud DNS global service. Use --location=global if you want to
        target the global service.

     --[no-]log-dns-queries
        Specifies whether to enable query logging. Defaults to False. Use
        --log-dns-queries to enable and --no-log-dns-queries to disable.

     --managed-reverse-lookup
        Specifies whether this zone is a managed reverse lookup zone, required
        for Cloud DNS to correctly resolve Non-RFC1918 PTR records.

     --networks=[NETWORK,...]
        List of networks that the zone should be visible in if the zone
        visibility is [private].

     --private-forwarding-targets=[IP_ADDRESSES,...]
        List of IPv4/IPv6 addresses or one domain name of the target name
        server that the zone will forward queries to. Ignored for public
        visibility. All addresses specified for this parameter will be reached
        through the VPC.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --zsk-algorithm=ZSK_ALGORITHM
        String mnemonic specifying the DNSSEC algorithm of the key-signing key.
        Requires DNSSEC enabled. ZSK_ALGORITHM must be one of: ecdsap256sha256,
        ecdsap384sha384, rsasha1, rsasha256, rsasha512.

     --zsk-key-length=ZSK_KEY_LENGTH
        Length of the zone-signing key in bits. Requires DNSSEC enabled.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud dns managed-zones update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud dns managed-zones update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     --target-network=TARGET_NETWORK
        Network ID of the Google Compute Engine private network to forward
        queries to.

     --target-project=TARGET_PROJECT
        Project ID of the Google Compute Engine private network to forward
        queries to.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha dns managed-zones update

        $ gcloud beta dns managed-zones update
```

### gcloud beta dns managed-zones create

```text
NAME
    gcloud beta dns managed-zones create - create a Cloud DNS managed-zone

SYNOPSIS
    gcloud beta dns managed-zones create ZONE_NAME --dns-name=DNS_NAME
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--labels=[KEY=VALUE,...]]
        [--location=LOCATION] [--[no-]log-dns-queries]
        [--managed-reverse-lookup] [--networks=[NETWORK,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--service-directory-namespace=SERVICE_DIRECTORY_NAMESPACE]
        [--visibility=VISIBILITY; default="public"]
        [--zsk-algorithm=ZSK_ALGORITHM] [--zsk-key-length=ZSK_KEY_LENGTH]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones delete

```text
NAME
    gcloud beta dns managed-zones delete - delete an empty Cloud DNS
        managed-zone

SYNOPSIS
    gcloud beta dns managed-zones delete ZONE_NAME [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones describe

```text
NAME
    gcloud beta dns managed-zones describe - view the details of a Cloud DNS
        managed-zone

SYNOPSIS
    gcloud beta dns managed-zones describe ZONE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones get-iam-policy

```text
NAME
    gcloud beta dns managed-zones get-iam-policy - get the IAM policy for a
        Cloud DNS managed-zone

SYNOPSIS
    gcloud beta dns managed-zones get-iam-policy ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones list

```text
NAME
    gcloud beta dns managed-zones list - view the list of all your
        managed-zones

SYNOPSIS
    gcloud beta dns managed-zones list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones set-iam-policy

```text
NAME
    gcloud beta dns managed-zones set-iam-policy - set the IAM policy for a
        Cloud DNS managed-zone

SYNOPSIS
    gcloud beta dns managed-zones set-iam-policy ZONE --policy-file=POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta dns managed-zones update

```text
NAME
    gcloud beta dns managed-zones update - update an existing Cloud DNS
        managed-zone

SYNOPSIS
    gcloud beta dns managed-zones update ZONE [--async]
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--location=LOCATION]
        [--[no-]log-dns-queries] [--managed-reverse-lookup]
        [--networks=[NETWORK,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--update-labels=[KEY=VALUE,...]] [--zsk-algorithm=ZSK_ALGORITHM]
        [--zsk-key-length=ZSK_KEY_LENGTH]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones config export

```text
NAME
    gcloud alpha dns managed-zones config export - export the configuration for
        a Dns managed zone

SYNOPSIS
    gcloud alpha dns managed-zones config export ([MANAGED_ZONE]] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones create

```text
NAME
    gcloud alpha dns managed-zones create - create a Cloud DNS managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones create ZONE_NAME --dns-name=DNS_NAME
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--labels=[KEY=VALUE,...]]
        [--location=LOCATION] [--[no-]log-dns-queries]
        [--managed-reverse-lookup] [--networks=[NETWORK,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--service-directory-namespace=SERVICE_DIRECTORY_NAMESPACE]
        [--visibility=VISIBILITY; default="public"]
        [--zsk-algorithm=ZSK_ALGORITHM] [--zsk-key-length=ZSK_KEY_LENGTH]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones delete

```text
NAME
    gcloud alpha dns managed-zones delete - delete an empty Cloud DNS
        managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones delete ZONE_NAME [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones describe

```text
NAME
    gcloud alpha dns managed-zones describe - view the details of a Cloud DNS
        managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones describe ZONE [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones get-iam-policy

```text
NAME
    gcloud alpha dns managed-zones get-iam-policy - get the IAM policy for a
        Cloud DNS managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones get-iam-policy ZONE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones list

```text
NAME
    gcloud alpha dns managed-zones list - view the list of all your
        managed-zones

SYNOPSIS
    gcloud alpha dns managed-zones list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones set-iam-policy

```text
NAME
    gcloud alpha dns managed-zones set-iam-policy - set the IAM policy for a
        Cloud DNS managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones set-iam-policy ZONE
        --policy-file=POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dns managed-zones update

```text
NAME
    gcloud alpha dns managed-zones update - update an existing Cloud DNS
        managed-zone

SYNOPSIS
    gcloud alpha dns managed-zones update ZONE [--async]
        [--denial-of-existence=DENIAL_OF_EXISTENCE] [--description=DESCRIPTION]
        [--dnssec-state=DNSSEC_STATE] [--forwarding-targets=[IP_ADDRESSES,...]]
        [--gkeclusters=[GKECLUSTERS,...]] [--ksk-algorithm=KSK_ALGORITHM]
        [--ksk-key-length=KSK_KEY_LENGTH] [--location=LOCATION]
        [--[no-]log-dns-queries] [--managed-reverse-lookup]
        [--networks=[NETWORK,...]]
        [--outbound-endpoints=[OUTBOUND_ENDPOINTS,...]]
        [--private-forwarding-targets=[IP_ADDRESSES,...]]
        [--update-labels=[KEY=VALUE,...]] [--zsk-algorithm=ZSK_ALGORITHM]
        [--zsk-key-length=ZSK_KEY_LENGTH]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--target-network=TARGET_NETWORK --target-project=TARGET_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dns/managed-zones (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
