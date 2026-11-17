---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-ssl-proxies
---

# gcloud compute target-ssl-proxies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-ssl-proxies create

```text
NAME
    gcloud compute target-ssl-proxies create - create a target SSL proxy

SYNOPSIS
    gcloud compute target-ssl-proxies create NAME
        --backend-service=BACKEND_SERVICE
        (--certificate-map=CERTIFICATE_MAP
          --ssl-certificates=SSL_CERTIFICATE,[...]) [--description=DESCRIPTION]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--ssl-policy=SSL_POLICY]
        [--global-ssl-policy | --ssl-policy-region=SSL_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-ssl-proxies create is used to create target SSL
    proxies. A target SSL proxy is referenced by one or more forwarding rules
    which define which packets the proxy is responsible for routing. The target
    SSL proxy points to a backend service which handle the actual requests. The
    target SSL proxy also points to at most 15 SSL certificates used for
    server-side authentication or one certificate map. The target SSL proxy can
    be associated with at most one SSL policy.

POSITIONAL ARGUMENTS
     NAME
        Name of the target SSL proxy to create.

REQUIRED FLAGS
     --backend-service=BACKEND_SERVICE
        A backend service that will be used for connections to the target SSL
        proxy.

     At least one of these must be specified:

       Certificate map resource - The certificate map to attach. This
       represents a Cloud resource. (NOTE) Some attributes are not given
       arguments in this group but can be set in other ways.

       To set the project attribute:
        + provide the argument --certificate-map on the command line with a
          fully specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       To set the location attribute:
        + provide the argument --certificate-map on the command line with a
          fully specified name;
        + default value of location is [global].

       --certificate-map=CERTIFICATE_MAP
          ID of the certificate map or fully qualified identifier for the
          certificate map.

          To set the map attribute:
          + provide the argument --certificate-map on the command line.

       --ssl-certificates=SSL_CERTIFICATE,[...]
          References to at most 15 SSL certificate resources that are used for
          server-side authentication. The first SSL certificate in this list is
          considered the primary SSL certificate associated with the load
          balancer. The SSL certificates must exist and cannot be deleted while
          referenced by a target SSL proxy.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the target SSL proxy.

     --proxy-header=PROXY_HEADER; default="NONE"
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Enables PROXY protocol (version 1) for passing client connection
            information.

     --ssl-policy=SSL_POLICY
        A reference to an SSL policy resource that defines the server-side
        support for SSL features and affects the connections between clients
        and load balancers that are using the SSL proxy. The SSL policy must
        exist and cannot be deleted while referenced by a target SSL proxy.

     At most one of these can be specified:

       --global-ssl-policy
          If set, the SSL policy is global.

       --ssl-policy-region=SSL_POLICY_REGION
          Region of the SSL policy to operate on. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-ssl-proxies create

        $ gcloud beta compute target-ssl-proxies create
```

### gcloud compute target-ssl-proxies delete

```text
NAME
    gcloud compute target-ssl-proxies delete - delete target SSL proxies

SYNOPSIS
    gcloud compute target-ssl-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-ssl-proxies delete deletes one or more target SSL
    proxies.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the target SSL proxies to delete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-ssl-proxies delete

        $ gcloud beta compute target-ssl-proxies delete
```

### gcloud compute target-ssl-proxies describe

```text
NAME
    gcloud compute target-ssl-proxies describe - display detailed information
        about a target SSL proxy

SYNOPSIS
    gcloud compute target-ssl-proxies describe NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-ssl-proxies describe displays all data associated
    with a target SSL proxy in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the target SSL proxy to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-ssl-proxies describe

        $ gcloud beta compute target-ssl-proxies describe
```

### gcloud compute target-ssl-proxies list

```text
NAME
    gcloud compute target-ssl-proxies list - list Google Compute Engine target
        SSL proxies

SYNOPSIS
    gcloud compute target-ssl-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-ssl-proxies list displays all Google Compute Engine
    target SSL proxies in a project.

EXAMPLES
    To list all target SSL proxies in a project in table form, run:

        $ gcloud compute target-ssl-proxies list

    To list the URIs of all target SSL proxies in a project, run:

        $ gcloud compute target-ssl-proxies list --uri

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

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

        $ gcloud alpha compute target-ssl-proxies list

        $ gcloud beta compute target-ssl-proxies list
```

### gcloud compute target-ssl-proxies test-iam-permissions

```text
NAME
    gcloud compute target-ssl-proxies test-iam-permissions - test IAM
        permissions for a Compute Engine target SSL proxy

SYNOPSIS
    gcloud compute target-ssl-proxies test-iam-permissions TARGET_SSL_PROXY
        --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified target SSL proxy.

EXAMPLES
    To test if the caller has the 'compute.targetSslProxies.get' permission on
    a target SSL proxy my-target-ssl-proxy, run:

        $ gcloud compute target-ssl-proxies test-iam-permissions \
            my-target-ssl-proxy --permissions=compute.targetSslProxies.get

POSITIONAL ARGUMENTS
     Target SSL proxy resource - The target SSL proxy for which to test
     permissions. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument target_ssl_proxy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TARGET_SSL_PROXY
          ID of the target SSL proxy or fully qualified identifier for the
          target SSL proxy.

          To set the target_ssl_proxy attribute:
          + provide the argument target_ssl_proxy on the command line.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to test.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute target-ssl-proxies test-iam-permissions

        $ gcloud beta compute target-ssl-proxies test-iam-permissions
```

### gcloud compute target-ssl-proxies update

```text
NAME
    gcloud compute target-ssl-proxies update - update a target SSL proxy

SYNOPSIS
    gcloud compute target-ssl-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [--clear-ssl-policy | --ssl-policy=SSL_POLICY --global-ssl-policy
          | --ssl-policy-region=SSL_POLICY_REGION]
        [--ssl-certificates=SSL_CERTIFICATE,[...] | --clear-ssl-certificates
          | --certificate-map=CERTIFICATE_MAP | --clear-certificate-map]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-ssl-proxies update is used to replace the SSL
    certificate, backend service, proxy header or SSL policy of existing target
    SSL proxies. A target SSL proxy is referenced by one or more forwarding
    rules which define which packets the proxy is responsible for routing. The
    target SSL proxy in turn points to a backend service which will handle the
    requests. The target SSL proxy also points to at most 15 SSL certificates
    used for server-side authentication or one certificate map. The target SSL
    proxy can be associated with at most one SSL policy.

POSITIONAL ARGUMENTS
     NAME
        Name of the target SSL proxy to update.

FLAGS
     --backend-service=BACKEND_SERVICE
        A backend service that will be used for connections to the target SSL
        proxy.

     --proxy-header=PROXY_HEADER
        The type of proxy protocol header to be sent to the backend.
        PROXY_HEADER must be one of:

         NONE
            No proxy header is added.
         PROXY_V1
            Enables PROXY protocol (version 1) for passing client connection
            information.

     At most one of these can be specified:

       --clear-ssl-policy
          Removes any attached SSL policy from the SSL proxy.

       Or at least one of these can be specified:

         --ssl-policy=SSL_POLICY
            A reference to an SSL policy resource that defines the server-side
            support for SSL features and affects the connections between
            clients and load balancers that are using the SSL proxy. The SSL
            policy must exist and cannot be deleted while referenced by a
            target SSL proxy.

         At most one of these can be specified:

           --global-ssl-policy
              If set, the SSL policy is global.

           --ssl-policy-region=SSL_POLICY_REGION
              Region of the SSL policy to operate on. Overrides the default
              compute/region property value for this command invocation.

     At most one of these can be specified:

       --ssl-certificates=SSL_CERTIFICATE,[...]
          References to at most 15 SSL certificate resources that are used for
          server-side authentication. The first SSL certificate in this list is
          considered the primary SSL certificate associated with the load
          balancer. The SSL certificates must exist and cannot be deleted while
          referenced by a target SSL proxy.

       --clear-ssl-certificates
          Remove any attached SSL certificates from the SSL proxy.

       Or at least one of these can be specified:

         Certificate map resource - The certificate map to attach. This
         represents a Cloud resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --certificate-map on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         To set the location attribute:
          - provide the argument --certificate-map on the command line with a
            fully specified name;
          - default value of location is [global].

         --certificate-map=CERTIFICATE_MAP
            ID of the certificate map or fully qualified identifier for the
            certificate map.

            To set the map attribute:
            - provide the argument --certificate-map on the command line.

       --clear-certificate-map
          Removes any attached certificate map from the SSL proxy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-ssl-proxies update

        $ gcloud beta compute target-ssl-proxies update
```

### gcloud beta compute target-ssl-proxies create

```text
NAME
    gcloud beta compute target-ssl-proxies create - create a target SSL proxy

SYNOPSIS
    gcloud beta compute target-ssl-proxies create NAME
        --backend-service=BACKEND_SERVICE
        (--certificate-map=CERTIFICATE_MAP
          --ssl-certificates=SSL_CERTIFICATE,[...]) [--description=DESCRIPTION]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--ssl-policy=SSL_POLICY]
        [--global-ssl-policy | --ssl-policy-region=SSL_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-ssl-proxies delete

```text
NAME
    gcloud beta compute target-ssl-proxies delete - delete target SSL proxies

SYNOPSIS
    gcloud beta compute target-ssl-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-ssl-proxies describe

```text
NAME
    gcloud beta compute target-ssl-proxies describe - display detailed
        information about a target SSL proxy

SYNOPSIS
    gcloud beta compute target-ssl-proxies describe NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-ssl-proxies list

```text
NAME
    gcloud beta compute target-ssl-proxies list - list Google Compute Engine
        target SSL proxies

SYNOPSIS
    gcloud beta compute target-ssl-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-ssl-proxies test-iam-permissions

```text
NAME
    gcloud beta compute target-ssl-proxies test-iam-permissions - test IAM
        permissions for a Compute Engine target SSL proxy

SYNOPSIS
    gcloud beta compute target-ssl-proxies test-iam-permissions
        TARGET_SSL_PROXY --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-ssl-proxies update

```text
NAME
    gcloud beta compute target-ssl-proxies update - update a target SSL proxy

SYNOPSIS
    gcloud beta compute target-ssl-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [--clear-ssl-policy | --ssl-policy=SSL_POLICY --global-ssl-policy
          | --ssl-policy-region=SSL_POLICY_REGION]
        [--ssl-certificates=SSL_CERTIFICATE,[...] | --clear-ssl-certificates
          | --certificate-map=CERTIFICATE_MAP | --clear-certificate-map]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies config export

```text
NAME
    gcloud alpha compute target-ssl-proxies config export - export the
        configuration for a Compute Engine target ssl proxy

SYNOPSIS
    gcloud alpha compute target-ssl-proxies config export ([TARGET_SSL_PROXY]]
        --all) [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies create

```text
NAME
    gcloud alpha compute target-ssl-proxies create - create a target SSL proxy

SYNOPSIS
    gcloud alpha compute target-ssl-proxies create NAME
        --backend-service=BACKEND_SERVICE
        (--certificate-map=CERTIFICATE_MAP
          --ssl-certificates=SSL_CERTIFICATE,[...]) [--description=DESCRIPTION]
        [--proxy-header=PROXY_HEADER; default="NONE"] [--ssl-policy=SSL_POLICY]
        [--global-ssl-policy | --ssl-policy-region=SSL_POLICY_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies delete

```text
NAME
    gcloud alpha compute target-ssl-proxies delete - delete target SSL proxies

SYNOPSIS
    gcloud alpha compute target-ssl-proxies delete NAME [NAME ...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies describe

```text
NAME
    gcloud alpha compute target-ssl-proxies describe - display detailed
        information about a target SSL proxy

SYNOPSIS
    gcloud alpha compute target-ssl-proxies describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies list

```text
NAME
    gcloud alpha compute target-ssl-proxies list - list Google Compute Engine
        target SSL proxies

SYNOPSIS
    gcloud alpha compute target-ssl-proxies list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies test-iam-permissions

```text
NAME
    gcloud alpha compute target-ssl-proxies test-iam-permissions - test IAM
        permissions for a Compute Engine target SSL proxy

SYNOPSIS
    gcloud alpha compute target-ssl-proxies test-iam-permissions
        TARGET_SSL_PROXY --permissions=[PERMISSIONS,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-ssl-proxies update

```text
NAME
    gcloud alpha compute target-ssl-proxies update - update a target SSL proxy

SYNOPSIS
    gcloud alpha compute target-ssl-proxies update NAME
        [--backend-service=BACKEND_SERVICE] [--proxy-header=PROXY_HEADER]
        [--clear-ssl-policy | --ssl-policy=SSL_POLICY --global-ssl-policy
          | --ssl-policy-region=SSL_POLICY_REGION]
        [--ssl-certificates=SSL_CERTIFICATE,[...] | --clear-ssl-certificates
          | --certificate-map=CERTIFICATE_MAP | --clear-certificate-map]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-ssl-proxies list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-ssl-proxies list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-ssl-proxies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
