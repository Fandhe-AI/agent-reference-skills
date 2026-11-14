---
source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/trusts
---

# gcloud active-directory domains trusts

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud active-directory domains trusts create

```text
NAME
    gcloud active-directory domains trusts create - create a Microsoft Active
        Directory Trust between a Managed Microsoft AD domain and another
        domain

SYNOPSIS
    gcloud active-directory domains trusts create DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [--direction=DIRECTION; default="BIDIRECTIONAL"]
        [--handshake-secret=HANDSHAKE_SECRET] [--selective-authentication]
        [--type=TYPE; default="FOREST"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Microsoft Active Directory Trust between a Managed Microsoft AD
    domain and another domain.

    This command can fail for the following reasons:
      o The domain specified does not exist.
      o The active account does not have permission to access the given
        domain.
      o A trust already exists with the same target domain name.
      o The active account does not have permission to create AD trusts.

EXAMPLES
    The following command creates an external, bidirectional AD trust between
    my-domain.com and target-domain.com.

        $ gcloud active-directory domains trusts create my-domain.com \
            --target-domain-name=target-domain.com \
            --target-dns-ip-addresses=10.177.0.2 --type=EXTERNAL \
            --direction=BIDIRECTIONAL --selective-authentication=false \
            --async

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain you want to
     create an AD trust from. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

REQUIRED FLAGS
     --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        Target DNS server IP addresses that can resolve the target domain.

        Only IPv4 is supported.

     --target-domain-name=TARGET_DOMAIN_NAME
        Target domain name for the Managed Microsoft AD Trust.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --direction=DIRECTION; default="BIDIRECTIONAL"
        Direction of the trust.

        Must be one of: INBOUND, OUTBOUND, BIDIRECTIONAL. Default is
        BIDIRECTIONAL.

        DIRECTION must be one of: bidirectional, inbound, outbound,
        trust-direction-unspecified.

     --handshake-secret=HANDSHAKE_SECRET
        Trust handshake secret with target domain. The secret will not be
        stored. If not specified, command will prompt user for secret.

     --selective-authentication
        If specified, trusted side will only have selective access to approved
        set of resources.

        Otherwise, the trusted side has forest/domain wide access. Default is
        false.

     --type=TYPE; default="FOREST"
        Type of the trust. Must be FOREST or EXTERNAL. Default is FOREST. TYPE
        must be one of: external, forest, trust-type-unspecified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains trusts create

        $ gcloud beta active-directory domains trusts create
```

### gcloud active-directory domains trusts delete

```text
NAME
    gcloud active-directory domains trusts delete - delete an Active Directory
        Trust between a Managed Microsoft AD domain and a target domain

SYNOPSIS
    gcloud active-directory domains trusts delete DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an Active Directory trust between a Managed Microsoft AD domain and
    a target domain.

    This command can fail for the following reasons:
      o The domain specified does not exist.
      o The active account does not have permission to access the given
        domain.
      o The AD trust specified does not exist.
      o The active account does not have permission to access the given AD
        trust.

EXAMPLES
    The following command deletes an AD trust between my-ad-domain.com and
    my-target-domain.com.

        $ gcloud active-directory domains trusts delete my-ad-domain.com \
            --target-domain-name=my-target-domain.com

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD domain you want to
     delete a trust from. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

REQUIRED FLAGS
     --target-domain-name=TARGET_DOMAIN_NAME
        Target domain name for the Managed Microsoft AD trust you want to
        delete.

OPTIONAL FLAGS
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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains trusts delete

        $ gcloud beta active-directory domains trusts delete
```

### gcloud active-directory domains trusts update

```text
NAME
    gcloud active-directory domains trusts update - update target DNS IP
        addresses for a Managed Microsoft AD trust

SYNOPSIS
    gcloud active-directory domains trusts update DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update target DNS IP addresses for a Managed Microsoft AD trust between the
    managed domain and the target domain.

        This command can fail for the following reasons:
          * The domain specified does not exist.
          * The active account does not have permission to access the given
            domain.
          * The AD trust specified does not exist.
          * The active account does not have permission to access the given
            AD trust.

EXAMPLES
    The following command updates the target DNS IP address for the AD trust
    between my-domain.com and my-target-domain.com to 10.177.0.3.

        $ gcloud active-directory domains trusts update my-domain.com \
            --target-domain-name=my-target-domain.com \
            --target-dns-ip-addresses=10.177.0.3

POSITIONAL ARGUMENTS
     Domain resource - Name of the Managed Microsoft AD trust for which you
     want to update target DNS IP Addresses. This represents a Cloud resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

REQUIRED FLAGS
     --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        DNS server IP addresses that can resolve the target domain.

        Only IPv4 is supported.

     --target-domain-name=TARGET_DOMAIN_NAME
        Target domain name for the Managed Microsoft AD trust you want to
        update.

OPTIONAL FLAGS
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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains trusts update

        $ gcloud beta active-directory domains trusts update
```

### gcloud active-directory domains trusts validate-state

```text
NAME
    gcloud active-directory domains trusts validate-state - validate the state
        of a Managed Microsoft AD trust

SYNOPSIS
    gcloud active-directory domains trusts validate-state DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Validate the state of a Managed Microsoft AD trust.

    Verify that the trust has been properly created and that the
    domains/forests can communicate with each other.

    This command can fail for the following reasons:
      o The AD domain specified does not exist.
      o The active account does not have permission to access the given AD
        domain.
      o The AD trust specified does not exist.
      o The active account does not have permission to access the given AD
        trust.

EXAMPLES
    The following command validates state for an AD trust with the given target
    domain name my-target-domain.com.

        $ gcloud active-directory domains trusts validate-state \
            my-domain.com --target-domain-name=my-target-domain.com

POSITIONAL ARGUMENTS
     Domain resource - Name of the the Managed Microsoft AD trust for which you
     want to validate state. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument domain on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DOMAIN
          ID of the domain or fully qualified identifier for the domain.

          To set the domain attribute:
          + provide the argument domain on the command line.

REQUIRED FLAGS
     --target-domain-name=TARGET_DOMAIN_NAME
        Target domain name of the Managed Microsoft AD Active Directory trust
        you want to validate.

OPTIONAL FLAGS
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
    This command uses the managedidentities/v1 API. The full documentation for
    this API can be found at: https://cloud.google.com/managed-microsoft-ad/

NOTES
    These variants are also available:

        $ gcloud alpha active-directory domains trusts validate-state

        $ gcloud beta active-directory domains trusts validate-state
```

### gcloud beta active-directory domains trusts create

```text
NAME
    gcloud beta active-directory domains trusts create - create a Microsoft
        Active Directory Trust between a Managed Microsoft AD domain and
        another domain

SYNOPSIS
    gcloud beta active-directory domains trusts create DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [--direction=DIRECTION; default="BIDIRECTIONAL"]
        [--handshake-secret=HANDSHAKE_SECRET] [--selective-authentication]
        [--type=TYPE; default="FOREST"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains trusts delete

```text
NAME
    gcloud beta active-directory domains trusts delete - delete an Active
        Directory Trust between a Managed Microsoft AD domain and a target
        domain

SYNOPSIS
    gcloud beta active-directory domains trusts delete DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains trusts update

```text
NAME
    gcloud beta active-directory domains trusts update - update target DNS IP
        addresses for a Managed Microsoft AD trust

SYNOPSIS
    gcloud beta active-directory domains trusts update DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta active-directory domains trusts validate-state

```text
NAME
    gcloud beta active-directory domains trusts validate-state - validate the
        state of a Managed Microsoft AD trust

SYNOPSIS
    gcloud beta active-directory domains trusts validate-state DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains trusts create

```text
NAME
    gcloud alpha active-directory domains trusts create - create a Microsoft
        Active Directory Trust between a Managed Microsoft AD domain and
        another domain

SYNOPSIS
    gcloud alpha active-directory domains trusts create DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [--direction=DIRECTION; default="BIDIRECTIONAL"]
        [--handshake-secret=HANDSHAKE_SECRET] [--selective-authentication]
        [--type=TYPE; default="FOREST"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains trusts delete

```text
NAME
    gcloud alpha active-directory domains trusts delete - delete an Active
        Directory Trust between a Managed Microsoft AD domain and a target
        domain

SYNOPSIS
    gcloud alpha active-directory domains trusts delete DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains trusts update

```text
NAME
    gcloud alpha active-directory domains trusts update - update target DNS IP
        addresses for a Managed Microsoft AD trust

SYNOPSIS
    gcloud alpha active-directory domains trusts update DOMAIN
        --target-dns-ip-addresses=[TARGET_DNS_IP_ADDRESSES,...]
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha active-directory domains trusts validate-state

```text
NAME
    gcloud alpha active-directory domains trusts validate-state - validate the
        state of a Managed Microsoft AD trust

SYNOPSIS
    gcloud alpha active-directory domains trusts validate-state DOMAIN
        --target-domain-name=TARGET_DOMAIN_NAME [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/active-directory/domains/trusts (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
