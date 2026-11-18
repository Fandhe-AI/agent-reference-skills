---
source: https://docs.cloud.google.com/sdk/gcloud/reference/privateca/roots
---

# gcloud privateca roots

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud privateca roots create

```text
NAME
    gcloud privateca roots create - create a new root certificate authority

SYNOPSIS
    gcloud privateca roots create
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [--auto-enable] [--bucket=BUCKET]
        [--custom-aia-urls=[CUSTOM_AIA_URLS,...]]
        [--custom-cdp-urls=[CUSTOM_CDP_URLS,...]] [--dns-san=[DNS_SAN,...]]
        [--email-san=[EMAIL_SAN,...]] [--from-ca=FROM_CA]
        [--ip-san=[IP_SAN,...]] [--labels=[KEY=VALUE,...]]
        [--subject=[SUBJECT,...]] [--subject-key-id=SUBJECT_KEY_ID]
        [--uri-san=[URI_SAN,...]] [--validity=VALIDITY; default="P10Y"]
        [--key-algorithm=KEY_ALGORITHM; default="rsa-pkcs1-4096-sha256"
          | [--kms-key-version=KMS_KEY_VERSION : --kms-key=KMS_KEY
          --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]]
        [--use-preset-profile=USE_PRESET_PROFILE
          | --extended-key-usages=[EXTENDED_KEY_USAGES,...]
          --key-usages=[KEY_USAGES,...] --max-chain-length=MAX_CHAIN_LENGTH
          | --unconstrained-chain-length --no-name-constraints-critical
          --name-excluded-dns=[NAME_EXCLUDED_DNS,...]
          --name-excluded-email=[NAME_EXCLUDED_EMAIL,...]
          --name-excluded-ip=[NAME_EXCLUDED_IP,...]
          --name-excluded-uri=[NAME_EXCLUDED_URI,...]
          --name-permitted-dns=[NAME_PERMITTED_DNS,...]
          --name-permitted-email=[NAME_PERMITTED_EMAIL,...]
          --name-permitted-ip=[NAME_PERMITTED_IP,...]
          --name-permitted-uri=[NAME_PERMITTED_URI,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    TIP: Consider setting a project lien
    (https://cloud.google.com/resource-manager/docs/project-liens) on the
    project to prevent it from accidental deletion.

EXAMPLES
    To create a root CA that supports one layer of subordinates:

        $ gcloud privateca roots create prod-root --location=us-west1 \
          --pool=my-pool \
          --kms-key-version="projects/my-project-pki/locations/us-west1/ke\
        yRings/kr1/cryptoKeys/k1/cryptoKeyVersions/1" \
            --subject="CN=Example Production Root CA, O=Google" \
            --max-chain-length=1

    To create a root CA that is based on an existing CA:

        $ gcloud privateca roots create prod-root --location=us-west1 \
          --pool=my-pool \
          --kms-key-version="projects/my-project-pki/locations/us-west1/ke\
        yRings/kr1/cryptoKeys/k1/cryptoKeyVersions/1" --from-ca=source-root

POSITIONAL ARGUMENTS
     Certificate Authority resource - The name of the root CA to create. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the Certificate Authority or fully qualified identifier for the
          Certificate Authority.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the Certificate Authority.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the Certificate Authority.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

FLAGS
     --auto-enable
        If this flag is set, the Certificate Authority will be automatically
        enabled upon creation.

     --bucket=BUCKET
        The name of an existing storage bucket to use for storing the CA
        certificates and CRLs for CAs in this pool. If omitted, a new bucket
        will be created and managed by the service on your behalf.

     --custom-aia-urls=[CUSTOM_AIA_URLS,...]
        One or more comma-separated URLs that will be added to the Authority
        Information Access extension in the issued certificate. These URLs are
        where the issuer CA certificate is located.

     --custom-cdp-urls=[CUSTOM_CDP_URLS,...]
        One or more comma-separated URLs that will be added to the CRL
        Distribution Points (CDP) extension in the issued certificate. These
        URLs are where CRL information is located.

     --dns-san=[DNS_SAN,...]
        One or more comma-separated DNS Subject Alternative Names.

     --email-san=[EMAIL_SAN,...]
        One or more comma-separated email Subject Alternative Names.

     Source CA resource - An existing CA from which to copy configuration
     values for the new CA. You can still override any of those values by
     explicitly providing the appropriate flags. The specified existing CA must
     be part of the same pool as the one being created. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --from-ca on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --from-ca on the command line with a fully
        specified name;
      * provide the argument --location on the command line;
      * set the property privateca/location.

     To set the pool attribute:
      * provide the argument --from-ca on the command line with a fully
        specified name;
      * provide the argument --pool on the command line.

     --from-ca=FROM_CA
        ID of the source CA or fully qualified identifier for the source CA.

        To set the certificate_authority attribute:
        * provide the argument --from-ca on the command line.

     --ip-san=[IP_SAN,...]
        One or more comma-separated IP Subject Alternative Names.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --subject=[SUBJECT,...]
        X.501 name of the certificate subject. Example: --subject
        "C=US,ST=California,L=Mountain View,O=Google LLC,CN=google.com"

     --subject-key-id=SUBJECT_KEY_ID
        Optional field to specify subject key ID for certificate. DO NOT USE
        except to maintain a previously established identifier for a public
        key, whose SKI was not generated using method (1) described in RFC 5280
        section 4.2.1.2.

     --uri-san=[URI_SAN,...]
        One or more comma-separated URI Subject Alternative Names.

     --validity=VALIDITY; default="P10Y"
        The validity of this CA, as an ISO8601 duration. Defaults to 10 years.

     The key configuration used for the CA certificate. Defaults to a managed
     key if not specified.

     At most one of these can be specified:

       --key-algorithm=KEY_ALGORITHM; default="rsa-pkcs1-4096-sha256"
          The crypto algorithm to use for creating a managed KMS key for the
          Certificate Authority. The default is rsa-pkcs1-4096-sha256.
          KEY_ALGORITHM must be one of: ec-p256-sha256, ec-p384-sha384,
          rsa-pkcs1-2048-sha256, rsa-pkcs1-3072-sha256, rsa-pkcs1-4096-sha256,
          rsa-pss-2048-sha256, rsa-pss-3072-sha256, rsa-pss-4096-sha256.

       Or at least one of these can be specified:

         Key version resource - An existing KMS key version to back this CA.
         The arguments in this group can be used to specify the attributes of
         this resource.

         --kms-key-version=KMS_KEY_VERSION
            ID of the key version or fully qualified identifier for the key
            version.

            To set the kms-key-version attribute:
            - provide the argument --kms-key-version on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --kms-key=KMS_KEY
            The KMS key of the key version.

            To set the kms-key attribute:
            - provide the argument --kms-key-version on the command line with
              a fully specified name;
            - provide the argument --kms-key on the command line.

         --kms-keyring=KMS_KEYRING
            The KMS keyring of the key version.

            To set the kms-keyring attribute:
            - provide the argument --kms-key-version on the command line with
              a fully specified name;
            - provide the argument --kms-keyring on the command line.

         --kms-location=KMS_LOCATION
            The location of the key version.

            To set the kms-location attribute:
            - provide the argument --kms-key-version on the command line with
              a fully specified name;
            - provide the argument --kms-location on the command line;
            - provide the argument location on the command line;
            - set the property privateca/location.

         --kms-project=KMS_PROJECT
            The project containing the key version.

            To set the kms-project attribute:
            - provide the argument --kms-key-version on the command line with
              a fully specified name;
            - provide the argument --kms-project on the command line;
            - provide the argument project on the command line;
            - set the property core/project.

     The X.509 configuration used for the CA certificate.

     At most one of these can be specified:

       --use-preset-profile=USE_PRESET_PROFILE
          The name of an existing preset profile used to encapsulate X.509
          parameter values. USE_PRESET_PROFILE must be one of: leaf_client_tls,
          leaf_code_signing, leaf_mtls, leaf_server_tls, leaf_smime,
          root_unconstrained, subordinate_client_tls_pathlen_0,
          subordinate_code_signing_pathlen_0, subordinate_mtls_pathlen_0,
          subordinate_server_tls_pathlen_0, subordinate_smime_pathlen_0,
          subordinate_unconstrained_pathlen_0.

          For more information, see
          https://cloud.google.com/certificate-authority-service/docs/certificate-profile.

       Or at least one of these can be specified:

         --extended-key-usages=[EXTENDED_KEY_USAGES,...]
            The list of extended key usages for this CA. This can only be
            provided if --use-preset-profile is not provided.
            EXTENDED_KEY_USAGES must be one of: server_auth, client_auth,
            code_signing, email_protection, time_stamping, ocsp_signing.

         --key-usages=[KEY_USAGES,...]
            The list of key usages for this CA. This can only be provided if
            --use-preset-profile is not provided. KEY_USAGES must be one of:
            digital_signature, content_commitment, key_encipherment,
            data_encipherment, key_agreement, cert_sign, crl_sign,
            encipher_only, decipher_only.

         At most one of these can be specified:

           --max-chain-length=MAX_CHAIN_LENGTH
              Maximum depth of subordinate CAs allowed under this CA for a CA
              certificate. This can only be provided if neither
              --use-preset-profile nor --unconstrained-chain-length are
              provided.

           --unconstrained-chain-length
              If set, allows an unbounded number of subordinate CAs under this
              newly issued CA certificate. This can only be provided if neither
              --use-preset-profile nor --max-chain-length are provided.

         The x509 name constraints configurations

         --name-constraints-critical
            Indicates whether or not name constraints are marked as critical.
            Name constraints are considered critical unless explicitly set to
            false. Enabled by default, use --no-name-constraints-critical to
            disable.

         --name-excluded-dns=[NAME_EXCLUDED_DNS,...]
            One or more comma-separated DNS names which are excluded from being
            issued certificates. Any DNS name that can be constructed by simply
            adding zero or more labels to the left-hand side of the name
            satisfies the name constraint. For example, example.com,
            www.example.com, www.sub.example.com would satisfy example.com,
            while example1.com does not.

         --name-excluded-email=[NAME_EXCLUDED_EMAIL,...]
            One or more comma-separated emails which are excluded from being
            issued certificates. The value can be a particular email address, a
            hostname to indicate all email addresses on that host or a domain
            with a leading period (e.g. .example.com) to indicate all email
            addresses in that domain.

         --name-excluded-ip=[NAME_EXCLUDED_IP,...]
            One or more comma-separated IP ranges which are excluded from being
            issued certificates. For IPv4 addresses, the ranges are expressed
            using CIDR notation as specified in RFC 4632. For IPv6 addresses,
            the ranges are expressed in similar encoding as IPv4

         --name-excluded-uri=[NAME_EXCLUDED_URI,...]
            One or more comma-separated URIs which are excluded from being
            issued certificates. The value can be a hostname or a domain with a
            leading period (like .example.com)

         --name-permitted-dns=[NAME_PERMITTED_DNS,...]
            One or more comma-separated DNS names which are permitted to be
            issued certificates. Any DNS name that can be constructed by simply
            adding zero or more labels to the left-hand side of the name
            satisfies the name constraint. For example, example.com,
            www.example.com, www.sub.example.com would satisfy example.com,
            while example1.com does not.

         --name-permitted-email=[NAME_PERMITTED_EMAIL,...]
            One or more comma-separated email addresses which are permitted to
            be issued certificates. The value can be a particular email
            address, a hostname to indicate all email addresses on that host or
            a domain with a leading period (e.g. .example.com) to indicate all
            email addresses in that domain.

         --name-permitted-ip=[NAME_PERMITTED_IP,...]
            One or more comma-separated IP ranges which are permitted to be
            issued certificates. For IPv4 addresses, the ranges are expressed
            using CIDR notation as specified in RFC 4632. For IPv6 addresses,
            the ranges are expressed in similar encoding as IPv4

         --name-permitted-uri=[NAME_PERMITTED_URI,...]
            One or more comma-separated URIs which are permitted to be issued
            certificates. The value can be a hostname or a domain with a
            leading period (like .example.com)

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud privateca roots create prod-root \
    --location=us-west1 \
    --pool=my-pool \
    --kms-key-version="projects/my-project-pki/locations/us-west1/keyRings/kr1/cryptoKeys/k1/cryptoKeyVersions/1" \
    --subject="CN=Example Production Root CA, O=Google" \
    --max-chain-length=1

gcloud privateca roots create prod-root \
    --location=us-west1 \
    --pool=my-pool \
    --kms-key-version="projects/my-project-pki/locations/us-west1/keyRings/kr1/cryptoKeys/k1/cryptoKeyVersions/1" \
    --from-ca=source-root
```

### gcloud privateca roots delete

```text
NAME
    gcloud privateca roots delete - delete a Root Certificate Authority

SYNOPSIS
    gcloud privateca roots delete
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [--ignore-active-certificates] [--ignore-dependent-resources]
        [--skip-grace-period] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Root Certificate Authority. Deleted Root Certificate Authorities
    may be recovered with the gcloud privateca roots undelete command within a
    grace period of 30 days.

    Use the --skip-grace-period flag to delete as soon as possible without the
    30-day grace period to undelete.

    Note that any user-managed KMS keys or Google Cloud Storage buckets will
    not be affected by this operation. You will need to delete the user-
    managed resources separately once the CA is deleted. Any Google-managed
    resources will be cleaned up.

    The CA specified in this command MUST:

        1) be in the DISABLED or STAGED state.
        2) have no un-revoked or un-expired certificates. Use the revoke command
           to revoke any active certificates.

    Use the --ignore-active-certificates flag to remove 2) as a requirement.

EXAMPLES
    To delete a root CA:

        $ gcloud privateca roots delete prod-root --pool=my-pool \
            --location=us-west1

    To delete a CA while skipping the confirmation input:

        $ gcloud privateca roots delete prod-root --pool=my-pool \
            --location=us-west1 --quiet

    To undo the deletion for a root CA:

        $ gcloud privateca roots undelete prod-root --pool=my-pool \
            --location=us-west1

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority to delete. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the CERTIFICATE_AUTHORITY.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

FLAGS
     --ignore-active-certificates
        If this flag is set, the Certificate Authority will be deleted even if
        the Certificate Authority has un-revoked or un-expired certificates
        after the grace period.

     --ignore-dependent-resources
        This field skips the integrity check that would normally prevent
        breaking a CA Pool if it is used by another cloud resource and allows
        the CA Pool to be in a state where it is not able to issue
        certificates. Doing so may result in unintended and unrecoverable
        effects on any dependent resource(s) since the CA Pool would not be
        able to issue certificates.

     --skip-grace-period
        If this flag is set, the Certificate Authority will be deleted as soon
        as possible without a 30-day grace period where undeletion would have
        been allowed. If you proceed, there will be no way to recover this CA.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca roots describe

```text
NAME
    gcloud privateca roots describe - get metadata for a root Certificate
        Authority

SYNOPSIS
    gcloud privateca roots describe
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given Certificate Authority.

EXAMPLES
    To get metadata for the root CA 'prod-root' in location 'us-west1' and CA
    Pool 'my-pool':

        $ gcloud privateca roots describe server-tls-1 --location=us-west1 \
            --pool=my-pool

    To download the PEM-encoded CA certificate chain for the 'prod-root' CA in
    location 'us-west1' and CA Pool 'my-pool' to a file called 'prod-root.crt':

        $ gcloud privateca roots describe prod-root --location=us-west1 \
            --pool=my-pool --format="value(pemCaCertificates)" > \
            ./prod-root.crt

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority for which to
     obtain metadata. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument certificate_authority on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument certificate_authority on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument certificate_authority on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The ID of the CA Pool.

          To set the pool attribute:
          + provide the argument certificate_authority on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the privateca/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/
```

### gcloud privateca roots disable

```text
NAME
    gcloud privateca roots disable - disable a root certificate authority

SYNOPSIS
    gcloud privateca roots disable
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [--ignore-dependent-resources] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disables a root certificate authority. The root certificate authority will
    not be allowed to issue certificates once disabled. It may still revoke
    certificates and/or generate CRLs. The CA certfificate will still be
    included in the FetchCaCertificates response for the parent CA Pool.

EXAMPLES
    To disable a root CA:

        $ gcloud privateca roots disable prod-root --pool=prod-root-pool \
          --location=us-west1

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority to disable. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the CERTIFICATE_AUTHORITY.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

FLAGS
     --ignore-dependent-resources
        This field skips the integrity check that would normally prevent
        breaking a CA Pool if it is used by another cloud resource and allows
        the CA Pool to be in a state where it is not able to issue
        certificates. Doing so may result in unintended and unrecoverable
        effects on any dependent resource(s) since the CA Pool would not be
        able to issue certificates.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca roots enable

```text
NAME
    gcloud privateca roots enable - enable a root certificate authority

SYNOPSIS
    gcloud privateca roots enable
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables a root certificate authority. The root certificate authority will
    be allowed to issue certificates once enabled.

EXAMPLES
    To enable a root CA:

        $ gcloud privateca roots enable prod-root --location=us-west1 \
          --pool=my-pool

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority to enable. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the CERTIFICATE_AUTHORITY.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca roots list

```text
NAME
    gcloud privateca roots list - list root certificate authorities

SYNOPSIS
    gcloud privateca roots list [--location=LOCATION] [--pool=POOL]
        [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE; default=100] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the root certificate authorities within a project.

EXAMPLES
    To list all root certificate authorities in a projects:

        $ gcloud privateca roots list

    To list all root certificate authorities within a project and location
    'us-central1':

        $ gcloud privateca roots list --location=us-central1

    To list all root certificate authorities within a CA Pool in location
    'us-central1':

        $ gcloud privateca roots list --pool=my-pool --location=us-central1

FLAGS
     --location=LOCATION
        Location of the certificate authorities. If omitted, root CAs across
        all regions will be listed.

     --pool=POOL
        ID of the CA Pool where the certificate authorities reside. If omitted,
        root CAs across all CA pools will be listed.

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

     --page-size=PAGE_SIZE; default=100
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is 100.
        Paging may be applied before or after --filter and --limit depending on
        the service.

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
```

### gcloud privateca roots undelete

```text
NAME
    gcloud privateca roots undelete - undelete a root Certificate Authority

SYNOPSIS
    gcloud privateca roots undelete
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restores a root Certificate Authority that has been deleted. A Certificate
    Authority can be undeleted within 30 days of being deleted. Use this
    command to halt the deletion process. An undeleted CA will move to DISABLED
    state.

EXAMPLES
    To undelete a root CA:

        $ gcloud privateca roots undelete prod-root --location=us-west1 \
          --pool=my-pool

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority to undelete.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the CERTIFICATE_AUTHORITY.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca roots update

```text
NAME
    gcloud privateca roots update - update an existing root certificate
        authority

SYNOPSIS
    gcloud privateca roots update
        (CERTIFICATE_AUTHORITY : --location=LOCATION --pool=POOL)
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update labels on a root CA:

        $ gcloud privateca roots update prod-root --location=us-west1 \
            --pool=my-pool --update-labels=foo=bar

POSITIONAL ARGUMENTS
     CERTIFICATE AUTHORITY resource - The certificate authority to update. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE_AUTHORITY on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE_AUTHORITY
          ID of the CERTIFICATE_AUTHORITY or fully qualified identifier for the
          CERTIFICATE_AUTHORITY.

          To set the certificate_authority attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the CERTIFICATE_AUTHORITY.

          To set the location attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --location on the command line;
          + set the property privateca/location.

       --pool=POOL
          The parent CA Pool of the CERTIFICATE_AUTHORITY.

          To set the pool attribute:
          + provide the argument CERTIFICATE_AUTHORITY on the command line
            with a fully specified name;
          + provide the argument --pool on the command line.

FLAGS
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

              $ gcloud privateca roots update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud privateca roots update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/privateca/roots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
