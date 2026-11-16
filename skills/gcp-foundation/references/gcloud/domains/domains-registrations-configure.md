---
source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/configure
---

# gcloud domains registrations configure

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud domains registrations configure contacts

```text
NAME
    gcloud domains registrations configure contacts - configure contact
        settings of a Cloud Domains registration

SYNOPSIS
    gcloud domains registrations configure contacts REGISTRATION
        [--contact-data-from-file=CONTACT_DATA_FILE_NAME]
        [--contact-privacy=CONTACT_PRIVACY] [--validate-only] [--async]
        [--notices=[NOTICE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Configure registration's contact settings: email, phone number, postal
    address and also contact privacy.

    In some cases such changes have to be confirmed through an email sent to
    the registrant before they take effect. In order to resend the email,
    execute this command again.

    NOTE: Please consider carefully any changes to contact privacy settings
    when changing from "redacted-contact-data" to "public-contact-data." There
    may be a delay in reflecting updates you make to registrant contact
    information such that any changes you make to contact privacy (including
    from "redacted-contact-data" to "public-contact-data") will be applied
    without delay but changes to registrant contact information may take a
    limited time to be publicized. This means that changes to contact privacy
    from "redacted-contact-data" to "public-contact-data" may make the previous
    registrant contact data public until the modified registrant contact
    details are published.

EXAMPLES
    To start an interactive flow to configure contact settings for example.com,
    run:

        $ gcloud domains registrations configure contacts example.com

    To enable contact privacy for example.com, run:

        $ gcloud domains registrations configure contacts example.com \
            --contact-privacy=private-contact-data

    To change contact data for example.com according to information from a YAML
    file contacts.yaml, run:

        $ gcloud domains registrations configure contacts example.com \
            --contact-data-from-file=contacts.yaml

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to configure contact
     settings for. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

COMMONLY USED FLAGS
     --contact-data-from-file=CONTACT_DATA_FILE_NAME
        A YAML file containing the contact data for the domain's three
        contacts: registrant, admin, and technical.

        The file can either specify a single set of contact data with label
        'allContacts', or three separate sets of contact data with labels
        'adminContact' and 'technicalContact'.

        If 'registrantContact', 'adminContact' or 'technicalContact' labels are
        used then only the specified contacts are updated.

        Each contact data must contain values for all required fields: email,
        phoneNumber and postalAddress in google.type.PostalAddress format.

        For more guidance on how to specify postalAddress, please see:
        https://support.google.com/business/answer/6397478

        Examples of file contents:

            allContacts:
              email: 'example@example.com'
              phoneNumber: '+1.8005550123'
              postalAddress:
                regionCode: 'US'
                postalCode: '94043'
                administrativeArea: 'CA'
                locality: 'Mountain View'
                addressLines: ['1600 Amphitheatre Pkwy']
                recipients: ['Jane Doe']

            adminContact:
              email: 'admin@example.com'
              phoneNumber: '+1.8005550123'
              postalAddress:
                regionCode: 'US'
                postalCode: '94043'
                administrativeArea: 'CA'
                locality: 'Mountain View'
                addressLines: ['1600 Amphitheatre Pkwy']
                recipients: ['Admin Jane Doe']

            registrantContact:
              email: 'registrant@example.com'
              phoneNumber: '+1.8005550123'
              postalAddress:
                regionCode: 'US'
                postalCode: '94043'
                administrativeArea: 'CA'
                locality: 'Mountain View'
                addressLines: ['1600 Amphitheatre Pkwy']
                recipients: ['Registrant Jane Doe']
            adminContact:
              email: 'admin@example.com'
              phoneNumber: '+1.8005550123'
              postalAddress:
                regionCode: 'US'
                postalCode: '94043'
                administrativeArea: 'CA'
                locality: 'Mountain View'
                addressLines: ['1600 Amphitheatre Pkwy']
                recipients: ['Admin Jane Doe']
            technicalContact:
              email: 'technical@example.com'
              phoneNumber: '+1.8005550123'
              postalAddress:
                regionCode: 'US'
                postalCode: '94043'
                administrativeArea: 'CA'
                locality: 'Mountain View'
                addressLines: ['1600 Amphitheatre Pkwy']
                recipients: ['Technic Jane Doe']

     --contact-privacy=CONTACT_PRIVACY
        The contact privacy mode to use. Supported privacy modes depend on the
        domain. CONTACT_PRIVACY must be one of:

         private-contact-data
            (DEPRECATED) Your contact info won't be available to the public. To
            help protect your info and prevent spam, a third party provides
            alternate (proxy) contact info for your domain in the public
            directory at no extra cost. They will forward received messages to
            you. The private-contact-data option is deprecated; See
            https://cloud.google.com/domains/docs/deprecations/feature-deprecations.
         public-contact-data
            All the data from contact config is publicly available. To set this
            value, you must also pass the --notices flag with value
            public-contact-data-acknowledgement or agree to the notice
            interactively.
         redacted-contact-data
            Limited personal information will be available to the public. The
            actual information redacted depends on the domain. For more
            information see https://support.google.com/domains/answer/3251242.

     --validate-only
        Don't actually configure contact settings of the registration. Only
        validate arguments.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --notices=[NOTICE,...]
        Notices about special properties of contacts. NOTICE must be (only one
        value is supported):

         public-contact-data-acknowledgement
            By sending this notice you acknowledge that using
            public-contact-data contact privacy makes all the data from contact
            config publicly available.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations configure contacts

        $ gcloud beta domains registrations configure contacts
```

### gcloud domains registrations configure dns

```text
NAME
    gcloud domains registrations configure dns - configure DNS settings of a
        Cloud Domains registration

SYNOPSIS
    gcloud domains registrations configure dns REGISTRATION [--validate-only]
        [--cloud-dns-zone=CLOUD_DNS_ZONE
          | --dns-settings-from-file=DNS_SETTINGS_FILE_NAME
          | --name-servers=NAME_SERVER,...,[...] | --use-google-domains-dns]
        [--async] [--disable-dnssec] [--unsafe-dns-update]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Configure DNS settings of a Cloud Domains registration.

    In most cases, this command is used for changing the authoritative name
    servers and DNSSEC options for the given domain. However, advanced options
    like glue records are available.

EXAMPLES
    To start an interactive flow to configure DNS settings for example.com,
    run:

        $ gcloud domains registrations configure dns example.com

    To use Cloud DNS managed-zone example-zone for example.com, run:

        $ gcloud domains registrations configure dns example.com \
            --cloud-dns-zone=example-zone

    DNSSEC will not be enabled as it may not be safe to enable it (e.g. when
    the Cloud DNS managed-zone was signed less than 24h ago).

    To use a signed Cloud DNS managed-zone example-zone for example.com and
    enable DNSSEC, run:

        $ gcloud domains registrations configure dns example.com \
            --cloud-dns-zone=example-zone --no-disable-dnssec

    To change DNS settings for example.com according to information from a YAML
    file dns_settings.yaml, run:

        $ gcloud domains registrations configure dns example.com \
            --dns-settings-from-file=dns_settings.yaml

    To disable DNSSEC, run:

        $ gcloud domains registrations configure dns example.com \
            --disable-dnssec

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to configure DNS settings
     for. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

COMMONLY USED FLAGS
     --validate-only
        Don't actually configure DNS settings of the registration. Only
        validate arguments.

     Set the authoritative name servers for the given domain.

         Warning: Do not change name servers if ds_records is non-empty.
         Clear ds_records first by calling this command with the
         --disable-dnssec flag, and wait 24 hours before changing
         name servers. Otherwise your domain may stop serving.

    At most one of these can be specified:

         --cloud-dns-zone=CLOUD_DNS_ZONE
            The name of the Cloud DNS managed-zone to set as the name server
            for the domain. If it's in the same project, you can use short
            name. If not, use the full resource name, e.g.:
            --cloud-dns-zone=projects/example-project/managedZones/example-zone.

         --dns-settings-from-file=DNS_SETTINGS_FILE_NAME
            A YAML file containing the required DNS settings. If specified, its
            content will replace the values currently used in the registration
            resource. If the file is missing some of the dns_settings fields,
            those fields will be cleared.

            Examples of file contents:

                googleDomainsDns:
                  dsState: DS_RECORDS_PUBLISHED
                glueRecords:
                - hostName: ns1.example.com
                  ipv4Addresses:
                  - 8.8.8.8
                - hostName: ns2.example.com
                  ipv4Addresses:
                  - 8.8.8.8

                customDns:
                  nameServers:
                  - new.ns1.com
                  - new.ns2.com
                  dsRecords:
                  - keyTag: 24
                    algorithm: RSASHA1
                    digestType: SHA256
                    digest: 2e1cfa82b035c26cbbbdae632cea070514eb8b773f616aaeaf668e2f0be8f10d
                  - keyTag: 42
                    algorithm: RSASHA1
                    digestType: SHA256
                    digest: 2e1cfa82bf35c26cbbbdae632cea070514eb8b773f616aaeaf668e2f0be8f10d

         --name-servers=NAME_SERVER,...,[...]
            List of DNS name servers for the domain.

         --use-google-domains-dns
            (DEPRECATED) Use free name servers provided by Google Domains.

            The --use-google-domains-dns option is deprecated; See
            https://cloud.google.com/domains/docs/deprecations/feature-deprecations.

OTHER FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --disable-dnssec
        Use this flag to disable DNSSEC, or to skip enabling it when switching
        to a Cloud DNS Zone or Google Domains nameservers.

     --unsafe-dns-update
        (DEPRECATED) Use this flag to allow DNS changes that may make your
        domain stop serving.

        The --unsafe-dns-update option is deprecated. To complete an unsafe DNS
        operation first disable DNSSEC, then change name servers, then
        (optionally) enable DNSSEC.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations configure dns

        $ gcloud beta domains registrations configure dns
```

### gcloud domains registrations configure management

```text
NAME
    gcloud domains registrations configure management - configure management
        settings of a Cloud Domains registration

SYNOPSIS
    gcloud domains registrations configure management REGISTRATION [--async]
        [--preferred-renewal-method=PREFERRED_RENEWAL_METHOD]
        [--transfer-lock-state=TRANSFER_LOCK_STATE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Configure management settings of a registration. This includes settings
    related to transfers, billing and renewals of a registration.

EXAMPLES
    To start an interactive flow to configure management settings for
    example.com, run:

        $ gcloud domains registrations configure management example.com

    To unlock a transfer lock of a registration for example.com, run:

        $ gcloud domains registrations configure management example.com \
            --transfer-lock-state=unlocked

    To disable automatic renewals for example.com, run:

        $ gcloud domains registrations configure management example.com \
            --preferred-renewal-method=renewal-disabled

POSITIONAL ARGUMENTS
     Registration resource - The domain registration to configure management
     settings for. This represents a Cloud resource. (NOTE) Some attributes are
     not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument registration on the command line with a fully
        specified name;
      * location is always global.

     This must be specified.

       REGISTRATION
          ID of the registration or fully qualified identifier for the
          registration.

          To set the registration attribute:
          + provide the argument registration on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --preferred-renewal-method=PREFERRED_RENEWAL_METHOD
        Preferred Renewal Method of a registration. It defines how the
        registration should be renewed. The actual Renewal Method can be set to
        renewal-disabled in case of e.g. problems with the Billing Account or
        reporeted domain abuse. PREFERRED_RENEWAL_METHOD must be one of:

         automatic-renewal
            The domain is automatically renewed each year.
         renewal-disabled
            The domain won't be renewed and will expire at its expiration time.

     --transfer-lock-state=TRANSFER_LOCK_STATE
        Transfer Lock of a registration. It needs to be unlocked in order to
        transfer the domain to another registrar. TRANSFER_LOCK_STATE must be
        one of:

         locked
            The transfer lock is locked.
         unlocked
            The transfer lock is unlocked.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha domains registrations configure management

        $ gcloud beta domains registrations configure management
```

### gcloud beta domains registrations configure contacts

```text
NAME
    gcloud beta domains registrations configure contacts - configure contact
        settings of a Cloud Domains registration

SYNOPSIS
    gcloud beta domains registrations configure contacts REGISTRATION
        [--contact-data-from-file=CONTACT_DATA_FILE_NAME]
        [--contact-privacy=CONTACT_PRIVACY] [--validate-only] [--async]
        [--notices=[NOTICE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta domains registrations configure dns

```text
NAME
    gcloud beta domains registrations configure dns - configure DNS settings of
        a Cloud Domains registration

SYNOPSIS
    gcloud beta domains registrations configure dns REGISTRATION
        [--validate-only]
        [--cloud-dns-zone=CLOUD_DNS_ZONE
          | --dns-settings-from-file=DNS_SETTINGS_FILE_NAME
          | --name-servers=NAME_SERVER,...,[...] | --use-google-domains-dns]
        [--async] [--disable-dnssec] [--unsafe-dns-update]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta domains registrations configure management

```text
NAME
    gcloud beta domains registrations configure management - configure
        management settings of a Cloud Domains registration

SYNOPSIS
    gcloud beta domains registrations configure management REGISTRATION
        [--async] [--preferred-renewal-method=PREFERRED_RENEWAL_METHOD]
        [--transfer-lock-state=TRANSFER_LOCK_STATE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations configure contacts

```text
NAME
    gcloud alpha domains registrations configure contacts - configure contact
        settings of a Cloud Domains registration

SYNOPSIS
    gcloud alpha domains registrations configure contacts REGISTRATION
        [--contact-data-from-file=CONTACT_DATA_FILE_NAME]
        [--contact-privacy=CONTACT_PRIVACY] [--validate-only] [--async]
        [--notices=[NOTICE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations configure dns

```text
NAME
    gcloud alpha domains registrations configure dns - configure DNS settings
        of a Cloud Domains registration

SYNOPSIS
    gcloud alpha domains registrations configure dns REGISTRATION
        [--validate-only]
        [--cloud-dns-zone=CLOUD_DNS_ZONE
          | --dns-settings-from-file=DNS_SETTINGS_FILE_NAME
          | --name-servers=NAME_SERVER,...,[...] | --use-google-domains-dns]
        [--async] [--disable-dnssec] [--unsafe-dns-update]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha domains registrations configure management

```text
NAME
    gcloud alpha domains registrations configure management - configure
        management settings of a Cloud Domains registration

SYNOPSIS
    gcloud alpha domains registrations configure management REGISTRATION
        [--async] [--preferred-renewal-method=PREFERRED_RENEWAL_METHOD]
        [--transfer-lock-state=TRANSFER_LOCK_STATE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud domains registrations configure dns --use-google-domains-dns`: "The --use-google-domains-dns option is deprecated; See https://cloud.google.com/domains/docs/deprecations/feature-deprecations."; `gcloud domains registrations configure dns --unsafe-dns-update`: "The --unsafe-dns-update option is deprecated. To complete an unsafe DNS operation first disable DNSSEC, then change name servers, then (optionally) enable DNSSEC.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/domains/registrations/configure (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
