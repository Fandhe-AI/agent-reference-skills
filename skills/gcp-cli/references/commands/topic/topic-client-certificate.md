---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/client-certificate
---

# gcloud topic client-certificate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic client-certificate

```text
NAME
    gcloud topic client-certificate - client certificate authorization
        supplementary help

DESCRIPTION
    Client certificate authorization supplementary help.

    Device Certificate Authorization (DCA) enables Context-aware access to
    identify devices by their X.509 certificates. DCA for Google Cloud APIs is
    the second in a series of releases that provides administrators the
    capability to protect access to their Google Cloud resources with device
    certificates. This feature builds on top of the existing Context-aware
    access suite (Endpoint Verification, Access Context Manager, and VPC
    Service Controls) and ensures that only users on trusted devices with a
    Google-generated certificate are able to access Google Cloud APIs. This
    provides a stronger signal of device identity (device certificate
    verification), and protects users from credential theft to accidental loss
    by only granting access when credentials and the original device
    certificate are presented.

    To use this feature, organizations can follow the instructions below to
    install an endpoint verification agent to devices:

      o Automatically deploy endpoint verification
        (https://support.google.com/a/answer/9007320#)
        * Via Chrome Policy for the extension
        * 3rd party image/software distribution tools for the Native Helper
          on macOS and Windows
      o Let users install endpoint verification themselves from the Chrome
        Webstore (https://support.google.com/a/users/answer/9018161#install)
        * Users would also be prompted to install the Native Helper as well

    For a greater level of security, operating system key stores can be used to
    store client certificate objects. This feature is enabled by using
    enterprise-certificate-proxy
    (https://github.com/googleapis/enterprise-certificate-proxy).

    enterprise-certificate-proxy can be installed by running $ gcloud
    components install enterprise-certificate-proxy.

    In order to use enterprise-certificate-proxy it must first be configured.
    By default the configuration should be written to
    ~/.config/gcloud/certificate_config.json.

    The enterprise-certificate-proxy schema is documented on the GitHub project
    page
    (https://github.com/googleapis/enterprise-certificate-proxy#certificate-configuration).
    Each operating system that gcloud supports uses a different key store. The
    certificate_config may contain multiple OS configurations.

    Provisioning the key stores is not in scope for this document.

    Run $ gcloud config set context_aware/use_client_certificate True so that
    the gcloud CLI will load the certificate and send it to services.

    See https://cloud.google.com/sdk/gcloud/reference/topic/client-certificate
    for the support list for the latest version of the gcloud CLI. Please
    upgrade the gcloud command-line tool if necessary.

    Note: iap_tunnel is a special service gcloud CLI uses to create the IAP
    tunnel. For example, gcloud compute start-iap-tunnel can start a tunnel to
    Cloud Identity-Aware Proxy through which another process can create a
    connection (e.g. SSH, RDP) to a Google Compute Engine instance. Client
    certificate authorization is supported in tunnel creation.

NOTES
    These variants are also available:

        $ gcloud alpha topic client-certificate

        $ gcloud beta topic client-certificate
```

### gcloud beta topic client-certificate

```text
NAME
    gcloud beta topic client-certificate - client certificate authorization
        supplementary help
```

### gcloud alpha topic client-certificate

```text
NAME
    gcloud alpha topic client-certificate - client certificate authorization
        supplementary help
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/client-certificate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
