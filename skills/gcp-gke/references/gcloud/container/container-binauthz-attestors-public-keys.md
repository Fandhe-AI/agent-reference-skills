---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/attestors/public-keys
---

# gcloud container binauthz attestors public-keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container binauthz attestors public-keys add

```text
NAME
    gcloud container binauthz attestors public-keys add - add a public key to
        an Attestor

SYNOPSIS
    gcloud container binauthz attestors public-keys add --attestor=ATTESTOR
        (--pgp-public-key-file=PATH_TO_FILE | (--keyversion=KEYVERSION
          : --keyversion-key=KEYVERSION_KEY
          --keyversion-keyring=KEYVERSION_KEYRING
          --keyversion-location=KEYVERSION_LOCATION
          --keyversion-project=KEYVERSION_PROJECT)
          | --pkix-public-key-algorithm=PKIX_PUBLIC_KEY_ALGORITHM
          --pkix-public-key-file=PATH_TO_FILE) [--comment=COMMENT]
        [--public-key-id-override=PUBLIC_KEY_ID_OVERRIDE]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To add a new KMS public key to an existing Attestor my_attestor:

        $ gcloud container binauthz attestors public-keys add \
            --attestor=my_attestor --keyversion-project=foo \
            --keyversion-location=us-west1 --keyversion-keyring=aring \
            --keyversion-key=akey --keyversion=1

    To add a new PGP public key to an existing Attestor my_attestor:

        $ gcloud container binauthz attestors public-keys add \
            --attestor=my_attestor --pgp-public-key-file=my_key.pub

REQUIRED FLAGS
     Attestor resource - The attestor to which the public key should be added.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --attestor on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --attestor=ATTESTOR
          ID of the attestor or fully qualified identifier for the attestor.

          To set the name attribute:
          + provide the argument --attestor on the command line.

     Exactly one of these must be specified:

       PGP key definition

       --pgp-public-key-file=PATH_TO_FILE
          The path to the file containing the ASCII-armored PGP public key to
          add. Use a full or relative path to a local file containing the value
          of pgp_public_key_file.

       Cloud KMS key definition

       CryptoKeyVersion resource - The Cloud KMS (Key Management Service)
       CryptoKeyVersion whose public key will be added to the attestor. The
       arguments in this group can be used to specify the attributes of this
       resource.

       This must be specified.

         --keyversion=KEYVERSION
            ID of the CryptoKeyVersion or fully qualified identifier for the
            CryptoKeyVersion.

            To set the version attribute:
            - provide the argument --keyversion on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --keyversion-key=KEYVERSION_KEY
            The key of the CryptoKeyVersion.

            To set the key attribute:
            - provide the argument --keyversion on the command line with a
              fully specified name;
            - provide the argument --keyversion-key on the command line.

         --keyversion-keyring=KEYVERSION_KEYRING
            The keyring of the CryptoKeyVersion.

            To set the keyring attribute:
            - provide the argument --keyversion on the command line with a
              fully specified name;
            - provide the argument --keyversion-keyring on the command line.

         --keyversion-location=KEYVERSION_LOCATION
            The location of the CryptoKeyVersion.

            To set the location attribute:
            - provide the argument --keyversion on the command line with a
              fully specified name;
            - provide the argument --keyversion-location on the command line.

         --keyversion-project=KEYVERSION_PROJECT
            Project ID of the Google Cloud project for the CryptoKeyVersion.

            To set the project attribute:
            - provide the argument --keyversion on the command line with a
              fully specified name;
            - provide the argument --keyversion-project on the command line;
            - provide the argument --project on the command line;
            - set the property core/project.

       PKIX key definition

       --pkix-public-key-algorithm=PKIX_PUBLIC_KEY_ALGORITHM
          The signing algorithm of the associated key. This will be used to
          verify the signatures associated with this key.
          PKIX_PUBLIC_KEY_ALGORITHM must be one of: ec-sign-p256-sha256,
          ec-sign-p384-sha384, ec-sign-p521-sha512, ecdsa-p256-sha256,
          ecdsa-p384-sha384, ecdsa-p521-sha512, ml-dsa-65, rsa-pss-2048-sha256,
          rsa-pss-3072-sha256, rsa-pss-4096-sha256, rsa-pss-4096-sha512,
          rsa-sign-pkcs1-2048-sha256, rsa-sign-pkcs1-3072-sha256,
          rsa-sign-pkcs1-4096-sha256, rsa-sign-pkcs1-4096-sha512,
          rsa-sign-pss-2048-sha256, rsa-sign-pss-3072-sha256,
          rsa-sign-pss-4096-sha256, rsa-sign-pss-4096-sha512.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --pkix-public-key-file=PATH_TO_FILE
          The path to the file containing the PKIX public key to add. Use a
          full or relative path to a local file containing the value of
          pkix_public_key_file.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

OPTIONAL FLAGS
     --comment=COMMENT
        The comment describing the public key.

     --public-key-id-override=PUBLIC_KEY_ID_OVERRIDE
        If provided, the ID to replace the default API-generated one. All IDs
        must be valid URIs as defined by RFC 3986
        (https://tools.ietf.org/html/rfc3986).

        When creating Attestations to be verified by this key, one must always
        provide this custom ID as the public key ID.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz attestors public-keys add

        $ gcloud beta container binauthz attestors public-keys add
```

### gcloud container binauthz attestors public-keys remove

```text
NAME
    gcloud container binauthz attestors public-keys remove - remove a public
        key from an Attestor

SYNOPSIS
    gcloud container binauthz attestors public-keys remove PUBLIC_KEY_ID
        --attestor=ATTESTOR [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To remove a public key from the Attestor my_attestor:

        $ gcloud container binauthz attestors public-keys remove \
            0638AADD940361EA2D7F14C58C124F0E663DA097 --attestor=my_attestor

POSITIONAL ARGUMENTS
     PUBLIC_KEY_ID
        The ID of the public key to remove.

REQUIRED FLAGS
     Attestor resource - The attestor from which the public key should be
     removed. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --attestor on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --attestor=ATTESTOR
          ID of the attestor or fully qualified identifier for the attestor.

          To set the name attribute:
          + provide the argument --attestor on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz attestors public-keys remove

        $ gcloud beta container binauthz attestors public-keys remove
```

### gcloud container binauthz attestors public-keys update

```text
NAME
    gcloud container binauthz attestors public-keys update - update a public
        key on an Attestor

SYNOPSIS
    gcloud container binauthz attestors public-keys update PUBLIC_KEY_ID
        --attestor=ATTESTOR [--comment=COMMENT]
        [--pgp-public-key-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update a PGP public key on an existing Attestor my_attestor:

        $ gcloud container binauthz attestors public-keys update \
            0638AADD940361EA2D7F14C58C124F0E663DA097 \
            --attestor=my_attestor --pgp-public-key-file=my_key.pub

POSITIONAL ARGUMENTS
     PUBLIC_KEY_ID
        The ID of the public key to update.

REQUIRED FLAGS
     Attestor resource - The attestor on which the public key should be
     updated. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --attestor on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --attestor=ATTESTOR
          ID of the attestor or fully qualified identifier for the attestor.

          To set the name attribute:
          + provide the argument --attestor on the command line.

OPTIONAL FLAGS
     --comment=COMMENT
        The comment describing the public key.

     --pgp-public-key-file=PATH_TO_FILE
        The path to a file containing the updated ASCII-armored PGP public key.
        Use a full or relative path to a local file containing the value of
        pgp_public_key_file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container binauthz attestors public-keys update

        $ gcloud beta container binauthz attestors public-keys update
```

### gcloud beta container binauthz attestors public-keys add

```text
NAME
    gcloud beta container binauthz attestors public-keys add - add a public key
        to an Attestor

SYNOPSIS
    gcloud beta container binauthz attestors public-keys add
        --attestor=ATTESTOR
        (--pgp-public-key-file=PATH_TO_FILE | (--keyversion=KEYVERSION
          : --keyversion-key=KEYVERSION_KEY
          --keyversion-keyring=KEYVERSION_KEYRING
          --keyversion-location=KEYVERSION_LOCATION
          --keyversion-project=KEYVERSION_PROJECT)
          | --pkix-public-key-algorithm=PKIX_PUBLIC_KEY_ALGORITHM
          --pkix-public-key-file=PATH_TO_FILE) [--comment=COMMENT]
        [--public-key-id-override=PUBLIC_KEY_ID_OVERRIDE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container binauthz attestors public-keys remove

```text
NAME
    gcloud beta container binauthz attestors public-keys remove - remove a
        public key from an Attestor

SYNOPSIS
    gcloud beta container binauthz attestors public-keys remove PUBLIC_KEY_ID
        --attestor=ATTESTOR [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container binauthz attestors public-keys update

```text
NAME
    gcloud beta container binauthz attestors public-keys update - update a
        public key on an Attestor

SYNOPSIS
    gcloud beta container binauthz attestors public-keys update PUBLIC_KEY_ID
        --attestor=ATTESTOR [--comment=COMMENT]
        [--pgp-public-key-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz attestors public-keys add

```text
NAME
    gcloud alpha container binauthz attestors public-keys add - add a public
        key to an Attestor

SYNOPSIS
    gcloud alpha container binauthz attestors public-keys add
        --attestor=ATTESTOR
        (--pgp-public-key-file=PATH_TO_FILE | (--keyversion=KEYVERSION
          : --keyversion-key=KEYVERSION_KEY
          --keyversion-keyring=KEYVERSION_KEYRING
          --keyversion-location=KEYVERSION_LOCATION
          --keyversion-project=KEYVERSION_PROJECT)
          | --pkix-public-key-algorithm=PKIX_PUBLIC_KEY_ALGORITHM
          --pkix-public-key-file=PATH_TO_FILE) [--comment=COMMENT]
        [--public-key-id-override=PUBLIC_KEY_ID_OVERRIDE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz attestors public-keys remove

```text
NAME
    gcloud alpha container binauthz attestors public-keys remove - remove a
        public key from an Attestor

SYNOPSIS
    gcloud alpha container binauthz attestors public-keys remove PUBLIC_KEY_ID
        --attestor=ATTESTOR [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container binauthz attestors public-keys update

```text
NAME
    gcloud alpha container binauthz attestors public-keys update - update a
        public key on an Attestor

SYNOPSIS
    gcloud alpha container binauthz attestors public-keys update PUBLIC_KEY_ID
        --attestor=ATTESTOR [--comment=COMMENT]
        [--pgp-public-key-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/attestors/public-keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
