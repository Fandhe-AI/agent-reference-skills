---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/server-tls-policies
---

# gcloud network-security server-tls-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security server-tls-policies create

```text
NAME
    gcloud network-security server-tls-policies create - create a
        ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies create
        (SERVER_TLS_POLICY : --location=LOCATION)
        ([--client-validation-mode=CLIENT_VALIDATION_MODE
          : --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          --client-validation-trust-config=CLIENT_VALIDATION_TRUST_CONFIG]
          | --allow-open --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new ServerTlsPolicy.

EXAMPLES
    To create a ServerTlsPolicy configured for frontend mTLS on Application
    Load Balancers, run:

        $ gcloud network-security server-tls-policies create \
            my-server-tls-policy --location=global \
            --client-validation-mode=reject-invalid \
            --client-validation-trust-config=projects/my-project/locations/\
        global/trustConfigs/my-trust-config

    To create a ServerTlsPolicy configured for frontend mTLS on Application
    Load Balancers with validation relaxations, run:

        $ gcloud network-security server-tls-policies create \
            my-server-tls-policy --location=global \
            --client-validation-mode=allow-validation-relaxations \
            --client-validation-trust-config=projects/my-project/locations/\
        global/trustConfigs/my-trust-config \
            --client-validation-relaxations=allow-missing-eku,\
        allow-expired-leaf-certificate

    To create a ServerTlsPolicy configured for Traffic Director, run:

        $ gcloud network-security server-tls-policies create my-td-policy \
            --location=global --allow-open \
            --client-validation-ca-plugin-instance=google_cloud_private_spif\
        fe

POSITIONAL ARGUMENTS
     Server TLS policy resource - Name of the ServerTlsPolicy to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     Configuration for a ServerTlsPolicy configured for frontend mTLS on
     Application Load Balancers or for Traffic Director.

     Exactly one of these must be specified:

       ServerTlsPolicy configured for frontend mTLS on Application Load
       Balancers.

       --client-validation-mode=CLIENT_VALIDATION_MODE
          Specifies how the client connection is handled when the client
          presents an invalid certificate or no certificate to the load
          balancer. CLIENT_VALIDATION_MODE must be one of:

           allow-invalid-or-missing-client-cert
              Allow connection even if certificate chain validation of the
              client certificate failed or no client certificate was presented.

           allow-validation-relaxations
              Require a client certificate, but apply the specific validation
              relaxations requested in --client-validation-relaxations.

           reject-invalid
              Require a client certificate and allow connection to the backend
              only if validation of the client certificate passed.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          List of validation relaxations to apply when --client-validation-mode
          is set to allow-validation-relaxations. CLIENT_VALIDATION_RELAXATIONS
          must be one of:

           allow-expired-leaf-certificate
              Allows validation of an expired client leaf certificate. The
              certificate will be validated as if the current time was one
              second before the end of its validity period (the notAfter
              timestamp).

           allow-missing-eku
              Allows the client certificate to completely omit the Extended Key
              Usage (EKU) extension. If the EKU extension is present, it must
              permit the clientAuth key purpose (OID 1.3.6.1.5.5.7.3.2).

           allow-sha1-hashing
              Allows validation of client certificate chains signed using
              legacy SHA-1 message digests.

       --client-validation-trust-config=CLIENT_VALIDATION_TRUST_CONFIG
          Reference to the Certificate Manager TrustConfig resource
          (projects/*/locations/*/trustConfigs/* or TrustConfig ID in the same
          project and location) used to validate client certificates.

       ServerTlsPolicy configured for Traffic Director.

       --allow-open
          Determines if the server allows plaintext connections when configured
          for Traffic Director.

       Client validation CA configuration for Traffic Director.

       At most one of these can be specified:

         --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
            List of gRPC endpoint target URIs used to obtain the Certificate
            Authority certificates to validate peer certificates for Traffic
            Director.

         --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
            List of certificate provider plugin instance names used to obtain
            the Certificate Authority certificates to validate peer
            certificates for Traffic Director.

       Server certificate configuration for Traffic Director.

       At most one of these can be specified:

         --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
            Target URI of the gRPC endpoint that provides the server
            certificate and private key (must start with unix:).

         --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE
            Plugin instance name that will be passed to the data plane to load
            server identity credentials.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Free-text description of the resource.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies create

        $ gcloud beta network-security server-tls-policies create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security server-tls-policies create my-server-tls-policy \
    --location=global \
    --client-validation-mode=reject-invalid \
    --client-validation-trust-config=projects/my-project/locations/global/trustConfigs/my-trust-config

gcloud network-security server-tls-policies create my-server-tls-policy \
    --location=global \
    --client-validation-mode=allow-validation-relaxations \
    --client-validation-trust-config=projects/my-project/locations/global/trustConfigs/my-trust-config \
    --client-validation-relaxations=allow-missing-eku,allow-expired-leaf-certificate

gcloud network-security server-tls-policies create my-td-policy \
    --location=global \
    --allow-open \
    --client-validation-ca-plugin-instance=google_cloud_private_spiffe
```

### gcloud network-security server-tls-policies delete

```text
NAME
    gcloud network-security server-tls-policies delete - delete ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies delete
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified ServerTlsPolicy.

EXAMPLES
    To delete a ServerTlsPolicy called 'my-server-tls-policy', run:

        $ gcloud network-security server-tls-policies delete \
            my-server-tls-policy --location=global

POSITIONAL ARGUMENTS
     Server TLS policy resource - Name of the ServerTlsPolicy you want to
     delete. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies delete

        $ gcloud beta network-security server-tls-policies delete
```

### gcloud network-security server-tls-policies describe

```text
NAME
    gcloud network-security server-tls-policies describe - describe
        ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies describe
        (SERVER_TLS_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe the specified ServerTlsPolicy.

EXAMPLES
    To describe a ServerTlsPolicy called 'my-server-tls-policy', run:

        $ gcloud network-security server-tls-policies describe \
            my-server-tls-policy --location=global

POSITIONAL ARGUMENTS
     Server TLS policy resource - The ServerTlsPolicy you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies describe

        $ gcloud beta network-security server-tls-policies describe
```

### gcloud network-security server-tls-policies export

```text
NAME
    gcloud network-security server-tls-policies export - export ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies export
        (SERVER_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a ServerTlsPolicy.

EXAMPLES
    To export a ServerTlsPolicy, run:

        $ gcloud network-security server-tls-policies export \
            my-server-tls-policy --destination=my-server-tls-policy.yaml \
            --location=global

POSITIONAL ARGUMENTS
     Server TLS policy resource - Name of the ServerTlsPolicy to export. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies export

        $ gcloud beta network-security server-tls-policies export
```

### gcloud network-security server-tls-policies import

```text
NAME
    gcloud network-security server-tls-policies import - import ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies import
        (SERVER_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Import a ServerTlsPolicy.

EXAMPLES
    To import a ServerTlsPolicy from a YAML file, run:

        $ gcloud network-security server-tls-policies import \
            my-server-tls-policy --source=my-server-tls-policy.yaml \
            --location=global

POSITIONAL ARGUMENTS
     Server TLS policy resource - Name of the ServerTlsPolicy to import. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --source=SOURCE
        Path to a YAML file containing the configuration export data. The YAML
        file must not contain any output-only fields. Alternatively, you may
        omit this flag to read from standard input. For a schema describing the
        export/import format, see: $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

        $CLOUDSDKROOT is can be obtained with the following command:

            $ gcloud info --format='value(installation.sdk_root)'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies import

        $ gcloud beta network-security server-tls-policies import
```

### gcloud network-security server-tls-policies list

```text
NAME
    gcloud network-security server-tls-policies list - list ServerTlsPolicies

SYNOPSIS
    gcloud network-security server-tls-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all ServerTlsPolicies in the current project.

EXAMPLES
    To list ServerTlsPolicies in the current project, run:

        $ gcloud network-security server-tls-policies list

FLAGS
     Location resource - The location of the ServerTlsPolicies to display. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * if left empty, will use the wildcard '-' to list all locations with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * if left empty, will use the wildcard '-' to list all locations.

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

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies list

        $ gcloud beta network-security server-tls-policies list
```

### gcloud network-security server-tls-policies update

```text
NAME
    gcloud network-security server-tls-policies update - update a
        ServerTlsPolicy

SYNOPSIS
    gcloud network-security server-tls-policies update
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--client-validation-mode=CLIENT_VALIDATION_MODE
          --clear-client-validation-relaxations
          | --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          | --[no-]allow-open
          --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the details of a ServerTlsPolicy.

EXAMPLES
    To update the client validation mode of a ServerTlsPolicy named
    my-tls-policy to reject-invalid, run:

        $ gcloud network-security server-tls-policies update my-tls-policy \
            --location=global --client-validation-mode=reject-invalid

    To update the client validation mode and relaxations of a ServerTlsPolicy
    named my-tls-policy, run:

        $ gcloud network-security server-tls-policies update my-tls-policy \
            --location=global \
            --client-validation-mode=allow-validation-relaxations \
            --client-validation-relaxations=allow-missing-eku,\
        allow-expired-leaf-certificate

    To clear all client validation relaxations on a ServerTlsPolicy named
    my-tls-policy, run:

        $ gcloud network-security server-tls-policies update my-tls-policy \
            --location=global --clear-client-validation-relaxations

POSITIONAL ARGUMENTS
     Server TLS policy resource - Name of the ServerTlsPolicy to be updated.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument server_tls_policy on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SERVER_TLS_POLICY
          ID of the server TLS policy or fully qualified identifier for the
          server TLS policy.

          To set the server_tls_policy attribute:
          + provide the argument server_tls_policy on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location Id.

          To set the location attribute:
          + provide the argument server_tls_policy on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Free-text description of the resource.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-security server-tls-policies update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security server-tls-policies update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     Configuration for a ServerTlsPolicy configured for frontend mTLS on
     Application Load Balancers or a ServerTlsPolicy configured for Traffic
     Director.

     At most one of these can be specified:

       Options for a ServerTlsPolicy configured for frontend mTLS on
       Application Load Balancers.

       --client-validation-mode=CLIENT_VALIDATION_MODE
          Determines how the server handles connections when the client
          presents an invalid certificate or no certificate at all.
          CLIENT_VALIDATION_MODE must be one of:

           allow-invalid-or-missing-client-cert
              Allow connection to the backend even if client certificate is
              missing or failed validation.

           allow-validation-relaxations
              Require a client certificate that chains to the TrustConfig,
              while allowing configured validation relaxations.

           reject-invalid
              Require a valid client certificate that chains to the TrustConfig
              and passes all validation checks.

       Modify or clear X.509 client certificate validation relaxations.

       At most one of these can be specified:

         --clear-client-validation-relaxations
            Clear all configured client validation relaxations.

         --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
            List of X.509 certificate validation relaxations to apply when
            --client-validation-mode=allow-validation-relaxations.

       Options for a ServerTlsPolicy configured for Traffic Director.

       --[no-]allow-open
          Determines if server allows plaintext connections. If set to true,
          server allows plain text connections. Default is false. Use
          --allow-open to enable and --no-allow-open to disable.

       Client validation CA configuration for a ServerTlsPolicy configured for
       Traffic Director.

       At most one of these can be specified:

         --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
            List of gRPC endpoint target URIs used to obtain the Certificate
            Authority certificates to validate peer certificates for a
            ServerTlsPolicy configured for Traffic Director.

         --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
            List of certificate provider plugin instance names used to obtain
            the Certificate Authority certificates to validate peer
            certificates for a ServerTlsPolicy configured for Traffic Director.

       Server certificate configuration for a ServerTlsPolicy configured for
       Traffic Director.

       At most one of these can be specified:

         --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
            Target URI of the gRPC endpoint that provides the server
            certificate and private key (must start with unix:).

         --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE
            Plugin instance name, used to locate and load CertificateProvider
            instance configuration to obtain the server certificate and private
            key.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networksecurity/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/networking

NOTES
    These variants are also available:

        $ gcloud alpha network-security server-tls-policies update

        $ gcloud beta network-security server-tls-policies update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security server-tls-policies update my-tls-policy \
    --location=global \
    --client-validation-mode=allow-validation-relaxations \
    --client-validation-relaxations=allow-missing-eku,allow-expired-leaf-certificate
```

### gcloud beta network-security server-tls-policies create

```text
NAME
    gcloud beta network-security server-tls-policies create - create a
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies create
        (SERVER_TLS_POLICY : --location=LOCATION)
        ([--client-validation-mode=CLIENT_VALIDATION_MODE
          : --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          --client-validation-trust-config=CLIENT_VALIDATION_TRUST_CONFIG]
          | --allow-open --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies delete

```text
NAME
    gcloud beta network-security server-tls-policies delete - delete
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies delete
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies describe

```text
NAME
    gcloud beta network-security server-tls-policies describe - describe
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies describe
        (SERVER_TLS_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies export

```text
NAME
    gcloud beta network-security server-tls-policies export - export
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies export
        (SERVER_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies import

```text
NAME
    gcloud beta network-security server-tls-policies import - import
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies import
        (SERVER_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies list

```text
NAME
    gcloud beta network-security server-tls-policies list - list
        ServerTlsPolicies

SYNOPSIS
    gcloud beta network-security server-tls-policies list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security server-tls-policies update

```text
NAME
    gcloud beta network-security server-tls-policies update - update a
        ServerTlsPolicy

SYNOPSIS
    gcloud beta network-security server-tls-policies update
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--client-validation-mode=CLIENT_VALIDATION_MODE
          --clear-client-validation-relaxations
          | --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          | --[no-]allow-open
          --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies create

```text
NAME
    gcloud alpha network-security server-tls-policies create - create a
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies create
        (SERVER_TLS_POLICY : --location=LOCATION)
        ([--client-validation-mode=CLIENT_VALIDATION_MODE
          : --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          --client-validation-trust-config=CLIENT_VALIDATION_TRUST_CONFIG]
          | --allow-open --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies delete

```text
NAME
    gcloud alpha network-security server-tls-policies delete - delete
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies delete
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies describe

```text
NAME
    gcloud alpha network-security server-tls-policies describe - describe
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies describe
        (SERVER_TLS_POLICY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies export

```text
NAME
    gcloud alpha network-security server-tls-policies export - export
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies export
        (SERVER_TLS_POLICY : --location=LOCATION) [--destination=DESTINATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies import

```text
NAME
    gcloud alpha network-security server-tls-policies import - import
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies import
        (SERVER_TLS_POLICY : --location=LOCATION) [--async] [--source=SOURCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies list

```text
NAME
    gcloud alpha network-security server-tls-policies list - list
        ServerTlsPolicies

SYNOPSIS
    gcloud alpha network-security server-tls-policies list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security server-tls-policies update

```text
NAME
    gcloud alpha network-security server-tls-policies update - update a
        ServerTlsPolicy

SYNOPSIS
    gcloud alpha network-security server-tls-policies update
        (SERVER_TLS_POLICY : --location=LOCATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--client-validation-mode=CLIENT_VALIDATION_MODE
          --clear-client-validation-relaxations
          | --client-validation-relaxations=[CLIENT_VALIDATION_RELAXATIONS,...]
          | --[no-]allow-open
          --client-validation-ca-grpc-endpoint=[TARGET_URI,...]
          | --client-validation-ca-plugin-instance=[PLUGIN_INSTANCE,...]
          --server-certificate-grpc-endpoint=SERVER_CERTIFICATE_GRPC_ENDPOINT
          | --server-certificate-plugin-instance=SERVER_CERTIFICATE_PLUGIN_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/server-tls-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
