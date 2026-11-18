---
source: https://docs.cloud.google.com/sdk/gcloud/reference/privateca/certificates
---

# gcloud privateca certificates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud privateca certificates create

```text
NAME
    gcloud privateca certificates create - create a new certificate

SYNOPSIS
    gcloud privateca certificates create
        [[CERTIFICATE]
          --issuer-location=ISSUER_LOCATION --issuer-pool=ISSUER_POOL]
        (--cert-output-file=CERT_OUTPUT_FILE | --validate-only)
        ([--csr=CSR : --rdn-sequence-subject] | [(--dns-san=[DNS_SAN,...]
          --email-san=[EMAIL_SAN,...] --ip-san=[IP_SAN,...]
          --subject=[SUBJECT,...] --uri-san=[URI_SAN,...])
          ([--generate-key --key-output-file=KEY_OUTPUT_FILE
          : --key-algorithm=KEY_ALGORITHM; default="rsa-2048"]
          | [--kms-key-version=KMS_KEY_VERSION : --kms-key=KMS_KEY
          --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT])
          : --use-preset-profile=USE_PRESET_PROFILE
          | --extended-key-usages=[EXTENDED_KEY_USAGES,...] --is-ca-cert
          --key-usages=[KEY_USAGES,...] --max-chain-length=MAX_CHAIN_LENGTH
          | --unconstrained-chain-length --no-name-constraints-critical
          --name-excluded-dns=[NAME_EXCLUDED_DNS,...]
          --name-excluded-email=[NAME_EXCLUDED_EMAIL,...]
          --name-excluded-ip=[NAME_EXCLUDED_IP,...]
          --name-excluded-uri=[NAME_EXCLUDED_URI,...]
          --name-permitted-dns=[NAME_PERMITTED_DNS,...]
          --name-permitted-email=[NAME_PERMITTED_EMAIL,...]
          --name-permitted-ip=[NAME_PERMITTED_IP,...]
          --name-permitted-uri=[NAME_PERMITTED_URI,...]]) [--ca=CA]
        [--labels=[KEY=VALUE,...]]
        [--requested-not-before-time=REQUESTED_NOT_BEFORE_TIME]
        [--subject-key-id=SUBJECT_KEY_ID] [--validity=VALIDITY; default="P30D"]
        [--template=TEMPLATE : --template-location=TEMPLATE_LOCATION]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a certificate using a CSR:

        $ gcloud privateca certificates create frontend-server-tls \
          --issuer-pool=my-pool --issuer-location=us-west1 \
          --csr=./csr.pem --cert-output-file=./cert.pem --validity=P30D

    To create a certificate using a client-generated key:

        $ gcloud privateca certificates create frontend-server-tls \
          --issuer-pool=my-pool --issuer-location=us-west1 \
          --generate-key --key-output-file=./key \
          --cert-output-file=./cert.pem --dns-san=www.example.com \
          --use-preset-profile=leaf_server_tls

POSITIONAL ARGUMENTS
     CERTIFICATE resource - The name of the certificate to issue. If the
     certificate ID is omitted, a random identifier will be generated according
     to the following format: {YYYYMMDD}-{3 random alphanumeric characters}-{3
     random alphanumeric characters}. The certificate ID is not required when
     the issuing CA pool is in the DevOps tier. The arguments in this group can
     be used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument CERTIFICATE on the command line with a fully
        specified name;
      * certificate id will default to an automatically generated id with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [CERTIFICATE]
        ID of the CERTIFICATE or fully qualified identifier for the
        CERTIFICATE.

        To set the certificate attribute:
        * provide the argument CERTIFICATE on the command line;
        * certificate id will default to an automatically generated id.

     --issuer-location=ISSUER_LOCATION
        The location of the CERTIFICATE.

        To set the issuer-location attribute:
        * provide the argument CERTIFICATE on the command line with a fully
          specified name;
        * certificate id will default to an automatically generated id with a
          fully specified name;
        * provide the argument --issuer-location on the command line;
        * set the property privateca/location.

     --issuer-pool=ISSUER_POOL
        The parent CA Pool of the CERTIFICATE.

        To set the issuer-pool attribute:
        * provide the argument CERTIFICATE on the command line with a fully
          specified name;
        * certificate id will default to an automatically generated id with a
          fully specified name;
        * provide the argument --issuer-pool on the command line.

REQUIRED FLAGS
     Certificate persistence options.

     Exactly one of these must be specified:

       --cert-output-file=CERT_OUTPUT_FILE
          The path where the resulting PEM-encoded certificate chain file
          should be written (ordered from leaf to root).

       --validate-only
          If this flag is set, the certificate resource will not be persisted
          and the returned certificate will not contain the pem_certificate
          field.

     Certificate generation method.

     Exactly one of these must be specified:

       To issue a certificate from a CSR use the following:

       --csr=CSR
          A PEM-encoded certificate signing request file path.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --rdn-sequence-subject
          If this value is set then the issued certificate will use the subject
          found in the CSR preserving the exact RDN sequence.

       Alternatively, you may describe the certificate and key to use.

       The subject names for the certificate.

       At least one of these must be specified:

         --dns-san=[DNS_SAN,...]
            One or more comma-separated DNS Subject Alternative Names.

         --email-san=[EMAIL_SAN,...]
            One or more comma-separated email Subject Alternative Names.

         --ip-san=[IP_SAN,...]
            One or more comma-separated IP Subject Alternative Names.

         --subject=[SUBJECT,...]
            X.501 name of the certificate subject. Example: --subject
            "C=US,ST=California,L=Mountain View,O=Google LLC,CN=google.com"

         --uri-san=[URI_SAN,...]
            One or more comma-separated URI Subject Alternative Names.

       To describe the key that will be used for this certificate, use one of
       the following options.

       Exactly one of these must be specified:

         To generate a new key pair, use the following:

         --generate-key
            Use this flag to have a new private key securely generated on your
            machine.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --key-output-file=KEY_OUTPUT_FILE
            The path where the generated private key file should be written (in
            PEM format).

            Note: possession of this key file could allow anybody to act as
            this certificate's subject. Please make sure that you store this
            key file in a secure location at all times, and ensure that only
            authorized users have access to it.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --key-algorithm=KEY_ALGORITHM; default="rsa-2048"
            The crypto algorithm to use for generating the client-side private
            key. KEY_ALGORITHM must be one of: rsa-2048, rsa-3072, rsa-4096,
            ec-p256, ec-p384.

         Key version resource - An existing KMS key version backing this
         certificate. The arguments in this group can be used to specify the
         attributes of this resource.

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

       The x509 configuration used for this certificate.

       At most one of these can be specified:

         --use-preset-profile=USE_PRESET_PROFILE
            The name of an existing preset profile used to encapsulate X.509
            parameter values. USE_PRESET_PROFILE must be one of:
            leaf_client_tls, leaf_code_signing, leaf_mtls, leaf_server_tls,
            leaf_smime, root_unconstrained, subordinate_client_tls_pathlen_0,
            subordinate_code_signing_pathlen_0, subordinate_mtls_pathlen_0,
            subordinate_server_tls_pathlen_0, subordinate_smime_pathlen_0,
            subordinate_unconstrained_pathlen_0.

            For more information, see
            https://cloud.google.com/certificate-authority-service/docs/certificate-profile.

         Or at least one of these can be specified:

           --extended-key-usages=[EXTENDED_KEY_USAGES,...]
              The list of extended key usages for this certificate. This can
              only be provided if --use-preset-profile is not provided.
              EXTENDED_KEY_USAGES must be one of: server_auth, client_auth,
              code_signing, email_protection, time_stamping, ocsp_signing.

           --is-ca-cert
              Whether this certificate is for a CertificateAuthority or not.
              Indicates the Certificate Authority field in the x509 basic
              constraints extension.

           --key-usages=[KEY_USAGES,...]
              The list of key usages for this certificate. This can only be
              provided if --use-preset-profile is not provided. KEY_USAGES must
              be one of: digital_signature, content_commitment,
              key_encipherment, data_encipherment, key_agreement, cert_sign,
              crl_sign, encipher_only, decipher_only.

           At most one of these can be specified:

             --max-chain-length=MAX_CHAIN_LENGTH
                Maximum depth of subordinate CAs allowed under this CA for a CA
                certificate. This can only be provided if neither
                --use-preset-profile nor --unconstrained-chain-length are
                provided.

             --unconstrained-chain-length
                If set, allows an unbounded number of subordinate CAs under
                this newly issued CA certificate. This can only be provided if
                neither --use-preset-profile nor --max-chain-length are
                provided.

           The x509 name constraints configurations

           --name-constraints-critical
              Indicates whether or not name constraints are marked as critical.
              Name constraints are considered critical unless explicitly set to
              false. Enabled by default, use --no-name-constraints-critical to
              disable.

           --name-excluded-dns=[NAME_EXCLUDED_DNS,...]
              One or more comma-separated DNS names which are excluded from
              being issued certificates. Any DNS name that can be constructed
              by simply adding zero or more labels to the left-hand side of the
              name satisfies the name constraint. For example, example.com,
              www.example.com, www.sub.example.com would satisfy example.com,
              while example1.com does not.

           --name-excluded-email=[NAME_EXCLUDED_EMAIL,...]
              One or more comma-separated emails which are excluded from being
              issued certificates. The value can be a particular email address,
              a hostname to indicate all email addresses on that host or a
              domain with a leading period (e.g. .example.com) to indicate all
              email addresses in that domain.

           --name-excluded-ip=[NAME_EXCLUDED_IP,...]
              One or more comma-separated IP ranges which are excluded from
              being issued certificates. For IPv4 addresses, the ranges are
              expressed using CIDR notation as specified in RFC 4632. For IPv6
              addresses, the ranges are expressed in similar encoding as IPv4

           --name-excluded-uri=[NAME_EXCLUDED_URI,...]
              One or more comma-separated URIs which are excluded from being
              issued certificates. The value can be a hostname or a domain with
              a leading period (like .example.com)

           --name-permitted-dns=[NAME_PERMITTED_DNS,...]
              One or more comma-separated DNS names which are permitted to be
              issued certificates. Any DNS name that can be constructed by
              simply adding zero or more labels to the left-hand side of the
              name satisfies the name constraint. For example, example.com,
              www.example.com, www.sub.example.com would satisfy example.com,
              while example1.com does not.

           --name-permitted-email=[NAME_PERMITTED_EMAIL,...]
              One or more comma-separated email addresses which are permitted
              to be issued certificates. The value can be a particular email
              address, a hostname to indicate all email addresses on that host
              or a domain with a leading period (e.g. .example.com) to indicate
              all email addresses in that domain.

           --name-permitted-ip=[NAME_PERMITTED_IP,...]
              One or more comma-separated IP ranges which are permitted to be
              issued certificates. For IPv4 addresses, the ranges are expressed
              using CIDR notation as specified in RFC 4632. For IPv6 addresses,
              the ranges are expressed in similar encoding as IPv4

           --name-permitted-uri=[NAME_PERMITTED_URI,...]
              One or more comma-separated URIs which are permitted to be issued
              certificates. The value can be a hostname or a domain with a
              leading period (like .example.com)

OPTIONAL FLAGS
     --ca=CA
        The name of an existing certificate authority to use for issuing the
        certificate. If omitted, a certificate authority will be will be chosen
        from the CA pool by the service on your behalf.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --requested-not-before-time=REQUESTED_NOT_BEFORE_TIME
        The requested not before time for the certificate, in ISO 8601 format
        (e.g., 2026-04-29T23:18:06Z).

     --subject-key-id=SUBJECT_KEY_ID
        Optional field to specify subject key ID for certificate. DO NOT USE
        except to maintain a previously established identifier for a public
        key, whose SKI was not generated using method (1) described in RFC 5280
        section 4.2.1.2.

     --validity=VALIDITY; default="P30D"
        The validity of this certificate, as an ISO8601 duration. Defaults to
        30 days.

     Certificate template resource - The name of a certificate template to use
     for issuing this certificate, if desired. A template may overwrite parts
     of the certificate request, and the use of certificate templates may be
     required and/or regulated by the issuing CA Pool's CA Manager. The
     specified template must be in the same location as the issuing CA Pool.
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --template on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --template=TEMPLATE
        ID of the certificate_template or fully qualified identifier for the
        certificate_template.

        To set the certificate template attribute:
        * provide the argument --template on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --template-location=TEMPLATE_LOCATION
        The location of the certificate_template.

        To set the location attribute:
        * provide the argument --template on the command line with a fully
          specified name;
        * provide the argument --template-location on the command line;
        * provide the argument --issuer-location on the command line;
        * set the property privateca/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca certificates describe

```text
NAME
    gcloud privateca certificates describe - get metadata for a certificate

SYNOPSIS
    gcloud privateca certificates describe
        (CERTIFICATE
          : --issuer-location=ISSUER_LOCATION --issuer-pool=ISSUER_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given certificate.

EXAMPLES
    To get metadata for the 'frontend-server-tls' certificate:

        $ gcloud privateca certificates describe frontend-server-tls \
            --issuer-pool=my-pool --issuer-location=us-west1

    To download the PEM-encoded certificate for the 'frontend-server-tls'
    certificate to a file called 'frontend-server-tls.crt':

        $ gcloud privateca certificates describe frontend-server-tls \
            --issuer-pool=my-pool --issuer-location=us-west1 \
            --format="value(pemCertificate)" > ./frontend-server-tls.crt

POSITIONAL ARGUMENTS
     CERTIFICATE resource - The certificate for which to obtain metadata. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument certificate on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the CERTIFICATE or fully qualified identifier for the
          CERTIFICATE.

          To set the certificate attribute:
          + provide the argument certificate on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --issuer-location=ISSUER_LOCATION
          The location of the CERTIFICATE.

          To set the issuer-location attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
          + provide the argument --issuer-location on the command line;
          + set the property privateca/location.

       --issuer-pool=ISSUER_POOL
          The ID of the issuing CA Pool.

          To set the issuer-pool attribute:
          + provide the argument certificate on the command line with a fully
            specified name;
          + provide the argument --issuer-pool on the command line.

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

### gcloud privateca certificates export

```text
NAME
    gcloud privateca certificates export - export a pem-encoded certificate to
        a file

SYNOPSIS
    gcloud privateca certificates export
        (CERTIFICATE
          : --issuer-location=ISSUER_LOCATION --issuer-pool=ISSUER_POOL)
        --output-file=OUTPUT_FILE [--include-chain] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To export a single pem-encoded certificate to a file, run the following:

        $ gcloud privateca certificates export my-cert \
            --issuer-pool=my-pool --issuer-location=us-west1 \
            --output-file=cert.pem

    To export a pem-encoded certificate along with its issuing chain in the
    same file, run the following:

        $ gcloud privateca certificates export my-cert \
            --issuer-pool=my-pool --issuer-location=us-west1 \
            --include-chain --output-file=chain.pem

    You can omit the --issuer-location flag in both of the above examples if
    you've already set the privateca/location property. For example:

    $ gcloud config set privateca/location us-west1

The following is equivalent to the first example above.

        $ gcloud privateca certificates export my-cert \
            --issuer-pool=my-pool --output-file=cert.pem

The following is equivalent to the second example above.

        $ gcloud privateca certificates export my-cert \
            --issuer-pool=my-pool --include-chain --output-file=chain.pem

POSITIONAL ARGUMENTS
     CERTIFICATE resource - The certificate to export. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument CERTIFICATE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the CERTIFICATE or fully qualified identifier for the
          CERTIFICATE.

          To set the certificate attribute:
          + provide the argument CERTIFICATE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --issuer-location=ISSUER_LOCATION
          The location of the CERTIFICATE.

          To set the issuer-location attribute:
          + provide the argument CERTIFICATE on the command line with a fully
            specified name;
          + provide the argument --issuer-location on the command line;
          + set the property privateca/location.

       --issuer-pool=ISSUER_POOL
          The parent CA Pool of the CERTIFICATE.

          To set the issuer-pool attribute:
          + provide the argument CERTIFICATE on the command line with a fully
            specified name;
          + provide the argument --issuer-pool on the command line.

REQUIRED FLAGS
     --output-file=OUTPUT_FILE
        The path where the resulting PEM-encoded certificate will be written.

OPTIONAL FLAGS
     --include-chain
        Whether to include the certificate's issuer chain in the exported file.
        If this is set, the resulting file will contain the pem-encoded
        certificate and its issuing chain, ordered from leaf to root.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca certificates list

```text
NAME
    gcloud privateca certificates list - list certificates within a project

SYNOPSIS
    gcloud privateca certificates list
        [--issuer-pool=ISSUER_POOL --location=LOCATION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE; default=100]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List certificates within a project. Note that listing certificates accross
    locations is not supported.

EXAMPLES
    To list all Certificates issued by a given CA pool, run:

        $ gcloud privateca certificates list --issuer-pool=my-pool \
            --location=us-west1

    To list all Certificates issued by all CA pools in a location, run:

        $ gcloud privateca certificates list --location=us-west1

    To list all Certificates issued directly under a CA, run:

        $ gcloud privateca certificates list --issuer-pool=my-pool \
            --location=us-west1 \
            --filter="issuer_certificate_authority='projects/1234567890/loca\
        tions/us-west1/caPools/my-pool/certificateAuthorities/my-ca'"

    You can omit the --location flag in both of the above examples if you've
    already set the privateca/location property. For example:

        $ gcloud config set privateca/location us-west1

        # The following is equivalent to the first example above.
        $ gcloud privateca certificates list --issuer-pool=my-pool

        # The following is equivalent to the second example above.
        $ gcloud privateca certificates list

FLAGS
     CA POOL resource - The issuing CA pool. If this is omitted, Certificates
     issued by all CA pools in the given location will be listed. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --issuer-pool on the command line with a fully
        specified name;
      * defaults to all CA pools in the given location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --issuer-pool=ISSUER_POOL
        ID of the CA_POOL or fully qualified identifier for the CA_POOL.

        To set the pool attribute:
        * provide the argument --issuer-pool on the command line;
        * defaults to all CA pools in the given location.

     --location=LOCATION
        The location of the CA_POOL.

        To set the location attribute:
        * provide the argument --issuer-pool on the command line with a fully
          specified name;
        * defaults to all CA pools in the given location with a fully
          specified name;
        * provide the argument --location on the command line;
        * set the property privateca/location.

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

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud privateca certificates list \
    --issuer-pool=my-pool \
    --location=us-west1 \
    --filter="issuer_certificate_authority='projects/1234567890/locations/us-west1/caPools/my-pool/certificateAuthorities/my-ca'"
```

### gcloud privateca certificates revoke

```text
NAME
    gcloud privateca certificates revoke - revoke a certificate

SYNOPSIS
    gcloud privateca certificates revoke
        (--certificate=CERTIFICATE | --serial-number=SERIAL_NUMBER)
        [--reason=REASON; default="unspecified"]
        [--issuer-pool=ISSUER_POOL : --issuer-location=ISSUER_LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Revokes the given certificate for the given reason.

EXAMPLES
    To revoke the 'frontend-server-tls' certificate due to key compromise:

        $ gcloud privateca certificates revoke \
            --certificate=frontend-server-tls --issuer-pool=my-pool \
            --issuer-location=us-west1 --reason=key_compromise

    To revoke the a certificate with the serial number
    '7dc1d9186372de2e1f4824abb1c4c9e5e43cbb40' due to a newer one being issued:

        $ gcloud privateca certificates revoke \
            --serial-number=7dc1d9186372de2e1f4824abb1c4c9e5e43cbb40 \
            --issuer-pool=my-pool --issuer-location=us-west1 \
            --reason=superseded

REQUIRED FLAGS
     The certificate identifier.

     Exactly one of these must be specified:

         Certificate resource - The certificate to revoke. This represents a
         Cloud resource. (NOTE) Some attributes are not given arguments in this
         group but can be set in other ways.

         To set the project attribute:
         + provide the argument --certificate on the command line with a
           fully specified name;
         + provide the argument --project on the command line;
         + set the property core/project.

       To set the issuer-location attribute:
        + provide the argument --certificate on the command line with a fully
          specified name;
        + set the property privateca/location.

       To set the issuer-pool attribute:
        + provide the argument --certificate on the command line with a fully
          specified name.

         --certificate=CERTIFICATE
            ID of the certificate or fully qualified identifier for the
            certificate.

            To set the certificate attribute:
         + provide the argument --certificate on the command line.

       --serial-number=SERIAL_NUMBER
          The serial number of the certificate.

OPTIONAL FLAGS
     --reason=REASON; default="unspecified"
        Revocation reason to include in the CRL. REASON must be one of:
        affiliation-changed, attribute-authority-compromise,
        certificate-authority-compromise, certificate-hold,
        cessation-of-operation, key-compromise, privilege-withdrawn,
        unspecified, superseded.

     Issuing CA pool resource - The issuing CA pool of the certificate to
     revoke. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --issuer-pool on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --issuer-pool=ISSUER_POOL
        ID of the Issuing CA pool or fully qualified identifier for the Issuing
        CA pool.

        To set the pool attribute:
        * provide the argument --issuer-pool on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --issuer-location=ISSUER_LOCATION
        The location of the Issuing CA pool.

        To set the issuer-location attribute:
        * provide the argument --issuer-pool on the command line with a fully
          specified name;
        * provide the argument --issuer-location on the command line;
        * set the property privateca/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

### gcloud privateca certificates update

```text
NAME
    gcloud privateca certificates update - update an existing certificate

SYNOPSIS
    gcloud privateca certificates update
        (CERTIFICATE
          : --issuer-location=ISSUER_LOCATION --issuer-pool=ISSUER_POOL)
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update labels on a certificate:

        $ gcloud privateca certificates update frontend-server-tls \
           --issuer-pool=my-pool --issuer-location=us-west1 \
           --update-labels=in_use=true

POSITIONAL ARGUMENTS
     CERTIFICATE resource - The certificate to update. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument CERTIFICATE on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CERTIFICATE
          ID of the CERTIFICATE or fully qualified identifier for the
          CERTIFICATE.

          To set the certificate attribute:
          + provide the argument CERTIFICATE on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --issuer-location=ISSUER_LOCATION
          The location of the CERTIFICATE.

          To set the issuer-location attribute:
          + provide the argument CERTIFICATE on the command line with a fully
            specified name;
          + provide the argument --issuer-location on the command line;
          + set the property privateca/location.

       --issuer-pool=ISSUER_POOL
          The parent CA Pool of the CERTIFICATE.

          To set the issuer-pool attribute:
          + provide the argument CERTIFICATE on the command line with a fully
            specified name;
          + provide the argument --issuer-pool on the command line.

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

              $ gcloud privateca certificates update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud privateca certificates update --clear-labels \
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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/privateca/certificates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
