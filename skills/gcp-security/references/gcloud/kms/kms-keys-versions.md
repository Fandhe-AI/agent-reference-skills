---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions
---

# gcloud kms keys versions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms keys versions create

```text
NAME
    gcloud kms keys versions create - create a new version

SYNOPSIS
    gcloud kms keys versions create
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--primary] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new version within the given key.

EXAMPLES
    The following command creates a new version within the frodo key,
    fellowship keyring, and global location and sets it as the primary version:

        $ gcloud kms keys versions create --location=global \
            --keyring=fellowship --key=frodo --primary

    The following command creates a new version within the legolas key,
    fellowship keyring, us-central1 location,
    https://example.kms/v0/some/key/path as the address for its external key,
    and sets it as the key's primary version:

        $ gcloud kms keys versions create --location=us-central1 \
            --keyring=fellowship --key=legolas \
            --external-key-uri=https://example.kms/v0/some/key/path \
            --primary

    The following command creates a new version within the bilbo key,
    fellowship keyring, us-central1 location, v0/some/key/path as the ekm
    connection key path for its external key, and sets it as the key's primary
    version:

        $ gcloud kms keys versions create --location=us-central1 \
            --keyring=fellowship --key=bilbo \
            --ekm-connection-key-path=v0/some/key/path --primary

FLAGS
     --ekm-connection-key-path=EKM_CONNECTION_KEY_PATH
        The path to the external key material on the EKM for keys with
        protection level external-vpc.

     --external-key-uri=EXTERNAL_KEY_URI
        The URI of the external key for keys with protection level external.

     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --primary
        If specified, immediately makes the new version primary. This should
        only be used with the encryption purpose.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions create

        $ gcloud beta kms keys versions create
```

### gcloud kms keys versions delete

```text
NAME
    gcloud kms keys versions delete - delete a key version

SYNOPSIS
    gcloud kms keys versions delete VERSION [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The following command deletes version 9 of key frodo within keyring
    fellowship and location us-east1 for destruction:

        $ gcloud kms keys versions delete 9 --location=us-east1 \
            --keyring=fellowship --key=frodo

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to delete.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions delete

        $ gcloud beta kms keys versions delete
```

### gcloud kms keys versions describe

```text
NAME
    gcloud kms keys versions describe - get metadata for a given version

SYNOPSIS
    gcloud kms keys versions describe VERSION
        [--attestation-file=ATTESTATION_FILE] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given version.

    The optional flag attestation-file specifies file to write the attestation
    object into. The attestation object enables the user to verify the
    integrity and provenance of the key. See
    https://cloud.google.com/kms/docs/attest-key for more information about
    attestations.

EXAMPLES
    The following command returns metadata for version 2 within key frodo
    within the keyring fellowship in the location us-east1:

        $ gcloud kms keys versions describe 2 --key=frodo \
            --keyring=fellowship --location=us-east1

    For key versions with protection level HSM, use the --attestation-file flag
    to save the attestation to a local file.

        $ gcloud kms keys versions describe 2 --key=frodo \
            --keyring=fellowship --location=us-east1 \
            --attestation-file=path/to/attestation.dat

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to describe.

FLAGS
     --attestation-file=ATTESTATION_FILE
        Path to the output attestation file.

     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions describe

        $ gcloud beta kms keys versions describe
```

### gcloud kms keys versions destroy

```text
NAME
    gcloud kms keys versions destroy - schedule a version to be destroyed

SYNOPSIS
    gcloud kms keys versions destroy VERSION [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Schedules the given version for destruction in 24 hours.

    After that time period passes it is automatically destroyed. Once
    destroyed, the key material is removed but the version number can not be
    reused.

    Only versions which are Enabled or Disabled can be Scheduled for
    destruction.

EXAMPLES
    The following command schedules version 9 of key frodo within keyring
    fellowship and location us-east1 for destruction:

        $ gcloud kms keys versions destroy 9 --location=us-east1 \
            --keyring=fellowship --key=frodo

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to destroy.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions destroy

        $ gcloud beta kms keys versions destroy
```

### gcloud kms keys versions disable

```text
NAME
    gcloud kms keys versions disable - disable a given version

SYNOPSIS
    gcloud kms keys versions disable VERSION [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disables the specified version within the given key.

    Only a version which is Enabled can be Disabled.

EXAMPLES
    The following command disables version 3 of key frodo within keyring
    fellowship and location us-east1:

        $ gcloud kms keys versions disable 3 --location=us-east1 \
            --keyring=fellowship --key=frodo

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to disable.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions disable

        $ gcloud beta kms keys versions disable
```

### gcloud kms keys versions enable

```text
NAME
    gcloud kms keys versions enable - enable a given version

SYNOPSIS
    gcloud kms keys versions enable VERSION [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables the specified version within the given key.

    Only a version which is Disabled can be Enabled.

EXAMPLES
    The following command enables version 3 of key frodo within keyring
    fellowship and location us-east1:

        $ gcloud kms keys versions enable 3 --location=us-east1 \
            --keyring=fellowship --key=frodo

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to enable.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions enable

        $ gcloud beta kms keys versions enable
```

### gcloud kms keys versions export-trusted-key-wrapped

```text
NAME
    gcloud kms keys versions export-trusted-key-wrapped - export a trusted key
        wrapped CryptoKeyVersion

SYNOPSIS
    gcloud kms keys versions export-trusted-key-wrapped VERSION
        --wrapping-key-version=WRAPPING_KEY_VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--wrapped-key-file=WRAPPED_KEY_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Exports a trusted key wrapped version.

EXAMPLES
    The following command exports the trusted key wrapped version 1 of the key
    frodo wrapped by the key version 1 of samwise:

        $ gcloud kms keys versions export-trusted-key-wrapped 1 \
            --key=frodo --keyring=fellowship --location=us-east1 \
            --wrapping-key-version=projects/my-project/locations/us-east1/\
        keyRings/fellowship/cryptoKeys/samwise/cryptoKeyVersions/1 \
            --wrapped-key-file=/tmp/my/public_key.file

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to export.

REQUIRED FLAGS
     --wrapping-key-version=WRAPPING_KEY_VERSION
        The resource name of the CryptoKeyVersion to use as a wrapping key.

OPTIONAL FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --wrapped-key-file=WRAPPED_KEY_FILE
        Path to the RSA/RSA+AES wrapped key file to store the wrapped key
        material.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions export-trusted-key-wrapped

        $ gcloud beta kms keys versions export-trusted-key-wrapped
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms keys versions export-trusted-key-wrapped 1 \
    --key=frodo \
    --keyring=fellowship \
    --location=us-east1 \
    --wrapping-key-version=projects/my-project/locations/us-east1/keyRings/fellowship/cryptoKeys/samwise/cryptoKeyVersions/1 \
    --wrapped-key-file=/tmp/my/public_key.file
```

### gcloud kms keys versions get-certificate-chain

```text
NAME
    gcloud kms keys versions get-certificate-chain - get a certificate chain
        for a given version

SYNOPSIS
    gcloud kms keys versions get-certificate-chain VERSION
        [--certificate-chain-type=CERTIFICATE_CHAIN_TYPE; default="all"]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns the PEM-format certificate chain for the specified key version. The
    optional flag output-file indicates the path to store the PEM. If not
    specified, the PEM will be printed to stdout.

EXAMPLES
    The following command saves the Cavium certificate chain for CryptoKey
    frodo Version 2 to /tmp/my/cavium.pem:

        $ gcloud kms keys versions get-certificate-chain 2 --key=frodo \
            --keyring=fellowship --location=us-east1 \
            --certificate-chain-type=cavium --output-file=/tmp/my/cavium.pem

POSITIONAL ARGUMENTS
     VERSION
        Name of the version from which to get the certificate chain.

FLAGS
     --certificate-chain-type=CERTIFICATE_CHAIN_TYPE; default="all"
        Certificate chain to retrieve. CERTIFICATE_CHAIN_TYPE must be one of:
        all, cavium, google-card, google-partition.

     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --output-file=OUTPUT_FILE
        Path to the output file to store PEM.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions get-certificate-chain

        $ gcloud beta kms keys versions get-certificate-chain
```

### gcloud kms keys versions get-public-key

```text
NAME
    gcloud kms keys versions get-public-key - get the public key for a given
        version

SYNOPSIS
    gcloud kms keys versions get-public-key VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [--output-file=OUTPUT_FILE]
        [--public-key-format=PUBLIC_KEY_FORMAT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns the public key of the given asymmetric key version in the specified
    format.

    The optional flag output-file indicates the path to store the public key.
    If not specified, the public key will be printed to stdout.

    The optional flag public-key-format indicates the format in which the
    public key will be returned. For the NIST PQC algorithms, this must be
    specified and set to nist-pqc. For kem-xwing this must be specified and set
    to xwing-raw-bytes. For all other algorithms, this flag is optional and can
    be either pem or der; the default value is pem. See "Retrieve a public key"
    in the Cloud KMS documentation
    (https://cloud.google.com/kms/help/get-public-key) for more information
    about the supported formats.

EXAMPLES
    The following command saves the public key for CryptoKey frodo Version 2 to
    '/tmp/my/public_key.file':

        $ gcloud kms keys versions get-public-key 2 --key=frodo \
            --keyring=fellowship --location=us-east1 \
            --public-key-format=pem --output-file=/tmp/my/public_key.file

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to get public key.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --output-file=OUTPUT_FILE
        Path to the output file to store public key.

     --public-key-format=PUBLIC_KEY_FORMAT
        The format in which the public key will be returned.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions get-public-key

        $ gcloud beta kms keys versions get-public-key
```

### gcloud kms keys versions import

```text
NAME
    gcloud kms keys versions import - import a version into an existing crypto
        key

SYNOPSIS
    gcloud kms keys versions import --algorithm=ALGORITHM
        --import-job=IMPORT_JOB [--hsm-trusted-wrapping] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--public-key-file=PUBLIC_KEY_FILE] [--target-key-file=TARGET_KEY_FILE]
        [--version=VERSION] [--wrapped-key-file=WRAPPED_KEY_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports wrapped key material into a new version within an existing crypto
    key following the import procedure documented at
    https://cloud.google.com/kms/docs/importing-a-key.

EXAMPLES
    The following command will read the files 'path/to/ephemeral/key' and
    'path/to/target/key' and use them to create a new version with algorithm
    'google-symmetric-encryption' within the 'frodo' crypto key, 'fellowship'
    keyring, and 'us-central1' location using import job 'strider' to unwrap
    the provided key material.

        $ gcloud kms keys versions import --location=global \
            --keyring=fellowship --key=frodo --import-job=strider \
            --wrapped-key-file=path/to/target/key \
            --algorithm=google-symmetric-encryption

REQUIRED FLAGS
     --algorithm=ALGORITHM
        The algorithm to assign to the new key version. For more information
        about supported algorithms, see
        https://cloud.google.com/kms/docs/algorithms. ALGORITHM must be one of:
        aes-128-cbc, aes-128-ctr, aes-128-gcm, aes-256-cbc, aes-256-ctr,
        aes-256-gcm, aes-256-kwp, ec-sign-ed25519, ec-sign-p256-sha256,
        ec-sign-p384-sha384, ec-sign-secp256k1-sha256,
        google-symmetric-encryption, hmac-sha1, hmac-sha224, hmac-sha256,
        hmac-sha384, hmac-sha512, kem-ecdh-p256, kem-ecdh-p384, kem-xwing,
        ml-kem-1024, ml-kem-768, pq-sign-hash-slh-dsa-sha2-128s-sha256,
        pq-sign-ml-dsa-44, pq-sign-ml-dsa-44-external-mu, pq-sign-ml-dsa-65,
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

     --import-job=IMPORT_JOB
        Name of the import job to import from.

OPTIONAL FLAGS
     --hsm-trusted-wrapping
        Enable HSM trusted wrapping capabilities for the key.

     --key=KEY
        The containing key to import into.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --public-key-file=PUBLIC_KEY_FILE
        Path to the public key of the ImportJob, used to wrap the key for
        import. If missing, the public key will be fetched on your behalf.

     --target-key-file=TARGET_KEY_FILE
        Path to the unwrapped target key to import into a Cloud KMS key
        version. If specified, the key will be securely wrapped before
        transmission to Google.

     --version=VERSION
        Version to re-import into. Omit this field for first-time import.

     --wrapped-key-file=WRAPPED_KEY_FILE
        Path to the RSA/RSA+AES wrapped key file to import.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions import

        $ gcloud beta kms keys versions import
```

### gcloud kms keys versions import-trusted-key-wrapped

```text
NAME
    gcloud kms keys versions import-trusted-key-wrapped - import a trusted key
        wrapped CryptoKeyVersion

SYNOPSIS
    gcloud kms keys versions import-trusted-key-wrapped --algorithm=ALGORITHM
        --importing-key-version=IMPORTING_KEY_VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [--version=VERSION]
        [--wrapped-key-file=WRAPPED_KEY_FILE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports a trusted key wrapped version.

EXAMPLES
    The following command imports a key into version 1 of frodo:

        $ gcloud kms keys versions import-trusted-key-wrapped --version=1 \
            --key=frodo --keyring=fellowship --location=us-east1 \
            --importing-key-version=projects/my-project/locations/us-east1/\
        keyRings/fellowship/cryptoKeys/samwise/cryptoKeyVersions/1 \
            --algorithm=aes-256-gcm \
            --wrapped-key-file=/tmp/my/wrapped_key.file

REQUIRED FLAGS
     --algorithm=ALGORITHM
        The algorithm to assign to the new key version. For more information
        about supported algorithms, see
        https://cloud.google.com/kms/docs/algorithms. ALGORITHM must be one of:
        aes-128-cbc, aes-128-ctr, aes-128-gcm, aes-256-cbc, aes-256-ctr,
        aes-256-gcm, aes-256-kwp, ec-sign-ed25519, ec-sign-p256-sha256,
        ec-sign-p384-sha384, ec-sign-secp256k1-sha256,
        google-symmetric-encryption, hmac-sha1, hmac-sha224, hmac-sha256,
        hmac-sha384, hmac-sha512, kem-ecdh-p256, kem-ecdh-p384, kem-xwing,
        ml-kem-1024, ml-kem-768, pq-sign-hash-slh-dsa-sha2-128s-sha256,
        pq-sign-ml-dsa-44, pq-sign-ml-dsa-44-external-mu, pq-sign-ml-dsa-65,
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

     --importing-key-version=IMPORTING_KEY_VERSION
        The resource name of the CryptoKeyVersion to use as an importing key.

OPTIONAL FLAGS
     --key=KEY
        The containing key to import into.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --version=VERSION
        Version to re-import into. Omit this field for first-time import.

     --wrapped-key-file=WRAPPED_KEY_FILE
        Path to the RSA/RSA+AES wrapped key file to import.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions import-trusted-key-wrapped

        $ gcloud beta kms keys versions import-trusted-key-wrapped
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms keys versions import-trusted-key-wrapped \
    --version=1 \
    --key=frodo \
    --keyring=fellowship \
    --location=us-east1 \
    --importing-key-version=projects/my-project/locations/us-east1/keyRings/fellowship/cryptoKeys/samwise/cryptoKeyVersions/1 \
    --algorithm=aes-256-gcm \
    --wrapped-key-file=/tmp/my/wrapped_key.file
```

### gcloud kms keys versions list

```text
NAME
    gcloud kms keys versions list - list the versions within a key

SYNOPSIS
    gcloud kms keys versions list [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all of the versions within the given key.

EXAMPLES
    The following command lists all versions within the key frodo, keyring
    fellowship, and location global:

        $ gcloud kms keys versions list --location=global \
            --keyring=fellowship --key=frodo

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

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

        $ gcloud alpha kms keys versions list

        $ gcloud beta kms keys versions list
```

### gcloud kms keys versions restore

```text
NAME
    gcloud kms keys versions restore - restore a version scheduled for
        destruction

SYNOPSIS
    gcloud kms keys versions restore VERSION [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Restores the given version that was scheduled to be destroyed.

    This moves the version from Scheduled for destruction to Disabled. Only
    versions which are Scheduled for destruction can be Restored.

EXAMPLES
    The following command restores version 9 of key frodo within keyring
    fellowship and location us-east1 which was previously scheduled for
    destruction:

        $ gcloud kms keys versions restore 9 --location=us-east1 \
            --keyring=fellowship --key=frodo

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to restore.

FLAGS
     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions restore

        $ gcloud beta kms keys versions restore
```

### gcloud kms keys versions update

```text
NAME
    gcloud kms keys versions update - update a key version

SYNOPSIS
    gcloud kms keys versions update VERSION
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--state=STATE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud kms keys versions update can be used to update the key versions. For
    keys of any protection level, you can update the key version's state to
    enable or disable it.

    For external keys, you can update the protection level to transition
    between the external and external-vpc protection levels. For key versions
    with the external protection level, you can also update the external key
    URI. For key versions with the external-vpc protection level, you can also
    update the ekm connection key path or the crypto key backend.

EXAMPLES
    The following command enables the key version 8 of key frodo within keyring
    fellowship and location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=frodo --state=enabled

    The following command disables the key version 8 of key frodo within
    keyring fellowship and location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=frodo --state=disabled

    The following command updates the external key URI of version 8 of key
    frodo within keyring fellowship and location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=frodo \
            --external-key-uri=https://example.kms/v0/some/key/path

    The following command updates the ekm connection key path of version 8 of
    key bilbo within keyring fellowship and location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=bilbo \
            --ekm-connection-key-path=v0/some/key/path

    The following command updates the protection level to external and the
    external key URI of version 8 of key frodo within keyring fellowship and
    location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=frodo --protection-level=external \
            --external-key-uri=https://example.kms/v0/some/key/path

    The following command updates the protection level to external-vpc, sets
    the crypto key backend, and sets the ekm connection key path of version 8
    of key bilbo within keyring fellowship and location us-east1:

        $ gcloud kms keys versions update 8 --location=us-east1 \
            --keyring=fellowship --key=bilbo \
            --protection-level=external-vpc \
            --crypto-key-backend="projects/$(gcloud config get \
        project)/locations/us-east1/ekmConnections/eagles" \
            --ekm-connection-key-path=v0/some/key/path

POSITIONAL ARGUMENTS
     VERSION
        Name of the version to describe.

FLAGS
     --ekm-connection-key-path=EKM_CONNECTION_KEY_PATH
        The path to the external key material on the EKM for keys with
        protection level external-vpc. Required with the --crypto-key-backend
        flag when a key version is updated to the external-vpc protection
        level.

     --external-key-uri=EXTERNAL_KEY_URI
        The URI of the external key for keys with protection level external.

     --key=KEY
        The containing key.

     --keyring=KEYRING
        Key ring of the key.

     --location=LOCATION
        Location of the keyring.

     --state=STATE
        State of the key version.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms keys versions update

        $ gcloud beta kms keys versions update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud beta kms keys versions update 8 \
    --location=us-east1 \
    --keyring=fellowship \
    --key=frodo \
    --protection-level=external \
    --external-key-uri=https://example.kms/v0/some/key/path

gcloud beta kms keys versions update 8 \
    --location=us-east1 \
    --keyring=fellowship \
    --key=bilbo \
    --protection-level=external-vpc \
    --crypto-key-backend="projects/$(gcloud config get project)/locations/us-east1/ekmConnections/eagles" \
    --ekm-connection-key-path=v0/some/key/path
```

### gcloud beta kms keys versions create

```text
NAME
    gcloud beta kms keys versions create - create a new version

SYNOPSIS
    gcloud beta kms keys versions create
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--primary] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions delete

```text
NAME
    gcloud beta kms keys versions delete - delete a key version

SYNOPSIS
    gcloud beta kms keys versions delete VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions describe

```text
NAME
    gcloud beta kms keys versions describe - get metadata for a given version

SYNOPSIS
    gcloud beta kms keys versions describe VERSION
        [--attestation-file=ATTESTATION_FILE] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions destroy

```text
NAME
    gcloud beta kms keys versions destroy - schedule a version to be destroyed

SYNOPSIS
    gcloud beta kms keys versions destroy VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions disable

```text
NAME
    gcloud beta kms keys versions disable - disable a given version

SYNOPSIS
    gcloud beta kms keys versions disable VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions enable

```text
NAME
    gcloud beta kms keys versions enable - enable a given version

SYNOPSIS
    gcloud beta kms keys versions enable VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions export-trusted-key-wrapped

```text
NAME
    gcloud beta kms keys versions export-trusted-key-wrapped - export a trusted
        key wrapped CryptoKeyVersion

SYNOPSIS
    gcloud beta kms keys versions export-trusted-key-wrapped VERSION
        --wrapping-key-version=WRAPPING_KEY_VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--wrapped-key-file=WRAPPED_KEY_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions get-certificate-chain

```text
NAME
    gcloud beta kms keys versions get-certificate-chain - get a certificate
        chain for a given version

SYNOPSIS
    gcloud beta kms keys versions get-certificate-chain VERSION
        [--certificate-chain-type=CERTIFICATE_CHAIN_TYPE; default="all"]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions get-public-key

```text
NAME
    gcloud beta kms keys versions get-public-key - get the public key for a
        given version

SYNOPSIS
    gcloud beta kms keys versions get-public-key VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [--output-file=OUTPUT_FILE]
        [--public-key-format=PUBLIC_KEY_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions import

```text
NAME
    gcloud beta kms keys versions import - import a version into an existing
        crypto key

SYNOPSIS
    gcloud beta kms keys versions import --algorithm=ALGORITHM
        --import-job=IMPORT_JOB [--hsm-trusted-wrapping] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--public-key-file=PUBLIC_KEY_FILE] [--target-key-file=TARGET_KEY_FILE]
        [--version=VERSION] [--wrapped-key-file=WRAPPED_KEY_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions import-trusted-key-wrapped

```text
NAME
    gcloud beta kms keys versions import-trusted-key-wrapped - import a trusted
        key wrapped CryptoKeyVersion

SYNOPSIS
    gcloud beta kms keys versions import-trusted-key-wrapped
        --algorithm=ALGORITHM --importing-key-version=IMPORTING_KEY_VERSION
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--version=VERSION] [--wrapped-key-file=WRAPPED_KEY_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions list

```text
NAME
    gcloud beta kms keys versions list - list the versions within a key

SYNOPSIS
    gcloud beta kms keys versions list [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions restore

```text
NAME
    gcloud beta kms keys versions restore - restore a version scheduled for
        destruction

SYNOPSIS
    gcloud beta kms keys versions restore VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms keys versions update

```text
NAME
    gcloud beta kms keys versions update - update a key version

SYNOPSIS
    gcloud beta kms keys versions update VERSION
        [--crypto-key-backend=CRYPTO_KEY_BACKEND]
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--protection-level=PROTECTION_LEVEL]
        [--state=STATE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions create

```text
NAME
    gcloud alpha kms keys versions create - create a new version

SYNOPSIS
    gcloud alpha kms keys versions create
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--primary] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions delete

```text
NAME
    gcloud alpha kms keys versions delete - delete a key version

SYNOPSIS
    gcloud alpha kms keys versions delete VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions describe

```text
NAME
    gcloud alpha kms keys versions describe - get metadata for a given version

SYNOPSIS
    gcloud alpha kms keys versions describe VERSION
        [--attestation-file=ATTESTATION_FILE] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions destroy

```text
NAME
    gcloud alpha kms keys versions destroy - schedule a version to be destroyed

SYNOPSIS
    gcloud alpha kms keys versions destroy VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions disable

```text
NAME
    gcloud alpha kms keys versions disable - disable a given version

SYNOPSIS
    gcloud alpha kms keys versions disable VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions enable

```text
NAME
    gcloud alpha kms keys versions enable - enable a given version

SYNOPSIS
    gcloud alpha kms keys versions enable VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions export-trusted-key-wrapped

```text
NAME
    gcloud alpha kms keys versions export-trusted-key-wrapped - export a
        trusted key wrapped CryptoKeyVersion

SYNOPSIS
    gcloud alpha kms keys versions export-trusted-key-wrapped VERSION
        --wrapping-key-version=WRAPPING_KEY_VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--wrapped-key-file=WRAPPED_KEY_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions get-certificate-chain

```text
NAME
    gcloud alpha kms keys versions get-certificate-chain - get a certificate
        chain for a given version

SYNOPSIS
    gcloud alpha kms keys versions get-certificate-chain VERSION
        [--certificate-chain-type=CERTIFICATE_CHAIN_TYPE; default="all"]
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--output-file=OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions get-public-key

```text
NAME
    gcloud alpha kms keys versions get-public-key - get the public key for a
        given version

SYNOPSIS
    gcloud alpha kms keys versions get-public-key VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [--output-file=OUTPUT_FILE]
        [--public-key-format=PUBLIC_KEY_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions import

```text
NAME
    gcloud alpha kms keys versions import - import a version into an existing
        crypto key

SYNOPSIS
    gcloud alpha kms keys versions import --algorithm=ALGORITHM
        --import-job=IMPORT_JOB [--hsm-trusted-wrapping] [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION]
        [--public-key-file=PUBLIC_KEY_FILE] [--target-key-file=TARGET_KEY_FILE]
        [--version=VERSION] [--wrapped-key-file=WRAPPED_KEY_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions import-trusted-key-wrapped

```text
NAME
    gcloud alpha kms keys versions import-trusted-key-wrapped - import a
        trusted key wrapped CryptoKeyVersion

SYNOPSIS
    gcloud alpha kms keys versions import-trusted-key-wrapped
        --algorithm=ALGORITHM --importing-key-version=IMPORTING_KEY_VERSION
        [--key=KEY] [--keyring=KEYRING] [--location=LOCATION]
        [--version=VERSION] [--wrapped-key-file=WRAPPED_KEY_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions list

```text
NAME
    gcloud alpha kms keys versions list - list the versions within a key

SYNOPSIS
    gcloud alpha kms keys versions list [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions restore

```text
NAME
    gcloud alpha kms keys versions restore - restore a version scheduled for
        destruction

SYNOPSIS
    gcloud alpha kms keys versions restore VERSION [--key=KEY]
        [--keyring=KEYRING] [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms keys versions update

```text
NAME
    gcloud alpha kms keys versions update - update a key version

SYNOPSIS
    gcloud alpha kms keys versions update VERSION
        [--crypto-key-backend=CRYPTO_KEY_BACKEND]
        [--ekm-connection-key-path=EKM_CONNECTION_KEY_PATH]
        [--external-key-uri=EXTERNAL_KEY_URI] [--key=KEY] [--keyring=KEYRING]
        [--location=LOCATION] [--protection-level=PROTECTION_LEVEL]
        [--state=STATE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (the help text above is verbatim): the `destroy` DESCRIPTION says "Schedules the given version for destruction in 24 hours."; the version stays in the scheduled for destruction state for the scheduled for destruction duration of its key, not a fixed 24 hours. "The default scheduled for destruction duration is 30 days", and a custom duration can be set at key creation (`--destroy-scheduled-duration` of `gcloud kms keys create`); the version can be restored with `gcloud kms keys versions restore` until then (https://docs.cloud.google.com/kms/docs/destroy-restore).
- Corrected from the official docs (runnable form only; the help text above is verbatim): the external-key `update` examples pass `--protection-level` (and `--crypto-key-backend`), which the GA SYNOPSIS does not list (gcloud 593.0.0: "--protection-level flag is available in one or more alternate release tracks. Try: gcloud alpha kms keys versions update --protection-level gcloud beta kms keys versions update --protection-level"); the `gcloud beta kms keys versions update` SYNOPSIS on this page lists both flags, so the runnable form runs the beta command.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
