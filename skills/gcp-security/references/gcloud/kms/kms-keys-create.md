---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create
---

# gcloud kms keys create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keys create

```text
NAME
    gcloud kms keys create - create a new key

SYNOPSIS
    gcloud kms keys create (KEY : --keyring=KEYRING --location=LOCATION)
        --purpose=PURPOSE
        [--allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]]
        [--crypto-key-backend=CRYPTO_KEY_BACKEND]
        [--default-algorithm=DEFAULT_ALGORITHM]
        [--destroy-scheduled-duration=DESTROY_SCHEDULED_DURATION]
        [--hsm-trusted-wrapping] [--import-only] [--labels=[KEY=VALUE,...]]
        [--next-rotation-time=NEXT_ROTATION_TIME]
        [--protection-level=PROTECTION_LEVEL; default="software"]
        [--rotation-period=ROTATION_PERIOD] [--skip-initial-version-creation]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new key within the given keyring.

    The flag --purpose is always required when creating a key. The flag
    --default-algorithm is required when creating a symmetric signing key, an
    asymmetric key, or an external key. Algorithm and purpose should be
    compatible.

    The optional flags --rotation-period and --next-rotation-time define a
    rotation schedule for the key. A schedule can also be defined by the
    --create-rotation-schedule command.

    The flag --next-rotation-time must be in ISO 8601 or RFC3339 format, and
    rotation-period must be in the form INTEGER[UNIT], where units can be one
    of seconds (s), minutes (m), hours (h) or days (d).

    The optional flag --protection-level specifies the physical environment
    where crypto operations with the key happen. The default is software; use
    hsm to create a hardware-backed key, external to create an externally
    backed key, or external-vpc to create an external key over vpc.

    The optional flag --labels defines a user specified key/value pair for the
    given key.

    The flag --skip-initial-version-creation creates a CryptoKey with no
    versions. If you import into the CryptoKey, or create a new version in that
    CryptoKey, there will be no primary version until one is set using the
    --set-primary-version command. You must include
    --skip-initial-version-creation when creating a CryptoKey with protection
    level external or external-vpc.

    The optional flag --import-only restricts the key to imported key versions
    only. To do so, the flag --skip-initial-version-creation must also be set.

    The optional flag --destroy-scheduled-duration defines the destroy schedule
    for the key, and must be in the form INTEGER[UNIT], where units can be one
    of seconds (s), minutes (m), hours (h) or days (d).

    The flag --crypto-key-backend defines the resource name for the backend
    where the key resides. Required for external-vpc keys.

    The optional flag --allowed-access-reasons defines the Key Access
    Justifications Policy for the key, and is specified as a comma separated
    list of zero or more justification codes defined in
    https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes.
    The key must be enrolled in Key Access Justifications to use this flag.

EXAMPLES
    The following command creates a key named frodo with protection level
    software within the keyring fellowship and location us-east1:

        $ gcloud kms keys create frodo --location=us-east1 \
            --keyring=fellowship --purpose=encryption

    The following command creates a key named strider with protection level
    software within the keyring rangers and location global with a specified
    rotation schedule:

        $ gcloud kms keys create strider --location=global \
            --keyring=rangers --purpose=encryption --rotation-period=30d \
            --next-rotation-time=2017-10-12T12:34:56.1234Z

    The following command creates a raw encryption key named foo with
    protection level software within the keyring fellowship and location
    us-east1 with two specified labels:

        $ gcloud kms keys create foo --location=us-east1 \
            --keyring=fellowship --purpose=raw-encryption \
            --default-algorithm=aes-128-cbc --labels=env=prod,team=kms

    The following command creates an asymmetric key named samwise with
    protection level software and default algorithm ec-sign-p256-sha256 within
    the keyring fellowship and location us-east1:

        $ gcloud kms keys create samwise --location=us-east1 \
            --keyring=fellowship --purpose=asymmetric-signing \
            --default-algorithm=ec-sign-p256-sha256

    The following command creates a key named gimli with protection level hsm
    and default algorithm google-symmetric-encryption within the keyring
    fellowship and location us-east1:

        $ gcloud kms keys create gimli --location=us-east1 \
            --keyring=fellowship --purpose=encryption --protection-level=hsm

    The following command creates a key named legolas with protection level
    external and default algorithm external-symmetric-encryption within the
    keyring fellowship and location us-central1:

        $ gcloud kms keys create legolas --location=us-central1 \
            --keyring=fellowship --purpose=encryption \
            --default-algorithm=external-symmetric-encryption \
            --protection-level=external --skip-initial-version-creation

    The following command creates a key named bilbo with protection level
    external-vpc and default algorithm external-symmetric-encryption and an
    EkmConnection of eagles within the keyring fellowship and location
    us-central1:

        $ gcloud kms keys create bilbo --location=us-central1 \
            --keyring=fellowship --purpose=encryption \
            --default-algorithm=external-symmetric-encryption \
            --protection-level=external-vpc \
            --skip-initial-version-creation \
            --crypto-key-backend="projects/$(gcloud config get project)/
            locations/us-central1/ekmConnections/eagles"

    The following command creates a key named arwen with protection level
    software within the keyring fellowship and location us-east1 with a Key
    Access Justifications policy that allows access reasons
    customer-initiated-access and google-initiated-system-operation:

        $ gcloud kms keys create arwen --location=us-east1 \
            --keyring=fellowship --purpose=encryption \
            --allowed-access-reasons=customer-initiated-access,\
        google-initiated-system-operation

POSITIONAL ARGUMENTS
     Key resource - The KMS key resource. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the key or fully qualified identifier for the key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The KMS keyring of the key.

          To set the keyring attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The Google Cloud location for the key.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --purpose=PURPOSE
        The "purpose" of the key. PURPOSE must be one of: aes-wrapping,
        asymmetric-encryption, asymmetric-signing, encryption,
        key-encapsulation, mac, raw-encryption.

OPTIONAL FLAGS
     --allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]
        The list of allowed Key Access Justifications access reasons on the
        key. The key must be enrolled in Key Access Justifications to configure
        this field. By default, this field is absent, and all justification
        codes are allowed. For more information about justification codes, see
        https://cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes.
        ALLOWED_ACCESS_REASONS must be one of:
        customer-authorized-workflow-servicing, customer-initiated-access,
        customer-initiated-support, google-initiated-review,
        google-initiated-service, google-initiated-system-operation,
        google-response-to-production-alert,
        modified-customer-initiated-access,
        modified-google-initiated-system-operation, reason-not-expected,
        reason-unspecified, third-party-data-request.

     --crypto-key-backend=CRYPTO_KEY_BACKEND
        For keys with the external-vpc protection level, the name of the
        EkmConnection that is used to access the key material in your EKM.

     --default-algorithm=DEFAULT_ALGORITHM
        The default algorithm for the crypto key. For more information about
        choosing an algorithm, see
        https://cloud.google.com/kms/docs/algorithms. DEFAULT_ALGORITHM must be
        one of: aes-128-cbc, aes-128-ctr, aes-128-gcm, aes-256-cbc,
        aes-256-ctr, aes-256-gcm, aes-256-kwp, ec-sign-ed25519,
        ec-sign-p256-sha256, ec-sign-p384-sha384, ec-sign-secp256k1-sha256,
        external-symmetric-encryption, google-symmetric-encryption, hmac-sha1,
        hmac-sha224, hmac-sha256, hmac-sha384, hmac-sha512, kem-ecdh-p256,
        kem-ecdh-p384, kem-xwing, ml-kem-1024, ml-kem-768,
        pq-sign-hash-slh-dsa-sha2-128s-sha256, pq-sign-ml-dsa-44,
        pq-sign-ml-dsa-44-external-mu, pq-sign-ml-dsa-65,
        pq-sign-ml-dsa-65-external-mu, pq-sign-ml-dsa-87,
        pq-sign-ml-dsa-87-external-mu, pq-sign-slh-dsa-sha2-128s,
        rsa-decrypt-oaep-2048-sha1, rsa-decrypt-oaep-2048-sha256,
        rsa-decrypt-oaep-3072-sha1, rsa-decrypt-oaep-3072-sha256,
        rsa-decrypt-oaep-4096-sha1, rsa-decrypt-oaep-4096-sha256,
        rsa-decrypt-oaep-4096-sha512, rsa-sign-pkcs1-2048-sha256,
        rsa-sign-pkcs1-3072-sha256, rsa-sign-pkcs1-4096-sha256,
        rsa-sign-pkcs1-4096-sha512, rsa-sign-pss-2048-sha256,
        rsa-sign-pss-3072-sha256, rsa-sign-pss-4096-sha256,
        rsa-sign-pss-4096-sha512, rsa-sign-raw-pkcs1-2048,
        rsa-sign-raw-pkcs1-3072, rsa-sign-raw-pkcs1-4096.

     --destroy-scheduled-duration=DESTROY_SCHEDULED_DURATION
        The amount of time that versions of the key should spend in the
        DESTROY_SCHEDULED state before transitioning to DESTROYED. See $ gcloud
        topic datetimes for information on duration formats.

     --hsm-trusted-wrapping
        Enable HSM trusted wrapping capabilities for the key.

     --import-only
        Restrict this key to imported versions only.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --next-rotation-time=NEXT_ROTATION_TIME
        Next automatic rotation time of the key. See $ gcloud topic datetimes
        for information on time formats.

     --protection-level=PROTECTION_LEVEL; default="software"
        Protection level of the key. PROTECTION_LEVEL must be one of: software,
        hsm, hsm-single-tenant, external, external-vpc.

     --rotation-period=ROTATION_PERIOD
        Automatic rotation period of the key. See $ gcloud topic datetimes for
        information on duration formats.

     --skip-initial-version-creation
        Skip creating the first version in a key and setting it as primary
        during creation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys create

        $ gcloud beta kms keys create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms keys create bilbo \
    --location=us-central1 \
    --keyring=fellowship \
    --purpose=encryption \
    --default-algorithm=external-symmetric-encryption \
    --protection-level=external-vpc \
    --skip-initial-version-creation \
    --crypto-key-backend="projects/$(gcloud config get project)/locations/us-central1/ekmConnections/eagles"

gcloud kms keys create arwen \
    --location=us-east1 \
    --keyring=fellowship \
    --purpose=encryption \
    --allowed-access-reasons=customer-initiated-access,google-initiated-system-operation
```

### gcloud beta kms keys create

```text
NAME
    gcloud beta kms keys create - create a new key

SYNOPSIS
    gcloud beta kms keys create (KEY : --keyring=KEYRING --location=LOCATION)
        --purpose=PURPOSE
        [--allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]]
        [--crypto-key-backend=CRYPTO_KEY_BACKEND]
        [--default-algorithm=DEFAULT_ALGORITHM]
        [--destroy-scheduled-duration=DESTROY_SCHEDULED_DURATION]
        [--hsm-trusted-wrapping] [--import-only] [--labels=[KEY=VALUE,...]]
        [--next-rotation-time=NEXT_ROTATION_TIME]
        [--protection-level=PROTECTION_LEVEL; default="software"]
        [--rotation-period=ROTATION_PERIOD] [--skip-initial-version-creation]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys create

```text
NAME
    gcloud alpha kms keys create - create a new key

SYNOPSIS
    gcloud alpha kms keys create (KEY : --keyring=KEYRING --location=LOCATION)
        --purpose=PURPOSE
        [--allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]]
        [--crypto-key-backend=CRYPTO_KEY_BACKEND]
        [--default-algorithm=DEFAULT_ALGORITHM]
        [--destroy-scheduled-duration=DESTROY_SCHEDULED_DURATION]
        [--hsm-trusted-wrapping] [--import-only] [--labels=[KEY=VALUE,...]]
        [--next-rotation-time=NEXT_ROTATION_TIME]
        [--protection-level=PROTECTION_LEVEL; default="software"]
        [--rotation-period=ROTATION_PERIOD] [--skip-initial-version-creation]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `external-vpc` example wraps the `--crypto-key-backend` value after `projects/$(gcloud config get project)/`, so joining the lines puts a space before `locations/` inside the quoted value, which is not a valid EkmConnection resource name; the runnable form removes the space (`projects/$(gcloud config get project)/locations/us-central1/ekmConnections/eagles`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
