---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/import-jobs
---

# gcloud kms import-jobs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms import-jobs add-iam-policy-binding

```text
NAME
    gcloud kms import-jobs add-iam-policy-binding - add IAM policy binding to a
        KMS import job

SYNOPSIS
    gcloud kms import-jobs add-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Adds a policy binding to the IAM policy of a KMS import job. One binding
    consists of a member and a role.

EXAMPLES
    To add an IAM policy binding for the role of 'roles/viewer' for the user
    'test-user@gmail.com' on the import job frodo with the keyring fellowship
    and location global, run:

        $ gcloud kms import-jobs add-iam-policy-binding frodo \
            --keyring='fellowship' --location='global' \
            --member='user:test-user@gmail.com' --role='roles/viewer'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Import job resource - The import job to add the IAM policy binding to. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument import_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMPORT_JOB
          ID of the import job or fully qualified identifier for the import
          job.

          To set the import_job attribute:
          + provide the argument import_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The containing keyring.

          To set the keyring attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to add the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        Role name to assign to the principal. The role name is the complete
        path of a predefined role, such as roles/logging.viewer, or the role ID
        for a custom role, such as
        organizations/{ORGANIZATION_ID}/roles/logging.viewer.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs add-iam-policy-binding

        $ gcloud beta kms import-jobs add-iam-policy-binding
```

### gcloud kms import-jobs create

```text
NAME
    gcloud kms import-jobs create - create a new import job

SYNOPSIS
    gcloud kms import-jobs create IMPORT_JOB --import-method=IMPORT_METHOD
        --protection-level=PROTECTION_LEVEL [--keyring=KEYRING]
        [--location=LOCATION]
        [--single-tenant-hsm-instance=SINGLE_TENANT_HSM_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a new import job within the given keyring.

EXAMPLES
    The following command creates a new import job named strider within the
    fellowship keyring, and us-central1 location:

        $ gcloud kms import-jobs create strider --location=us-central1 \
            --keyring=fellowship \
            --import-method=rsa-oaep-3072-sha256-aes-256 \
            --protection-level=hsm

    The following command creates a new import job named strider within the
    fellowship keyring, and us-central1 location:

        $ gcloud kms import-jobs create strider --location=us-central1 \
            --keyring=fellowship \
            --import-method=rsa-oaep-3072-sha256-aes-256 \
            --protection-level=hsm-single-tenant \
            --single-tenant-hsm-instance=my_sthi

POSITIONAL ARGUMENTS
     IMPORT_JOB
        Name of the import job to create.

REQUIRED FLAGS
     --import-method=IMPORT_METHOD
        The wrapping method to be used for incoming key material. For more
        information about choosing an import method, see
        https://cloud.google.com/kms/docs/key-wrapping. IMPORT_METHOD must be
        one of: hpke-kem-ml-kem-1024-hkdf-sha256-aes-256-gcm,
        hpke-kem-ml-kem-768-hkdf-sha256-aes-256-gcm,
        hpke-kem-xwing-hkdf-sha256-aes-256-gcm, rsa-oaep-3072-sha1-aes-256,
        rsa-oaep-3072-sha256, rsa-oaep-3072-sha256-aes-256,
        rsa-oaep-4096-sha1-aes-256, rsa-oaep-4096-sha256,
        rsa-oaep-4096-sha256-aes-256.

     --protection-level=PROTECTION_LEVEL
        Protection level of the import job. PROTECTION_LEVEL must be one of:
        software, hsm, hsm-single-tenant.

OPTIONAL FLAGS
     --keyring=KEYRING
        Key ring of the import job.

     --location=LOCATION
        Location of the import job.

     --single-tenant-hsm-instance=SINGLE_TENANT_HSM_INSTANCE
        The single tenant HSM instance to use for the import job.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs create

        $ gcloud beta kms import-jobs create
```

### gcloud kms import-jobs describe

```text
NAME
    gcloud kms import-jobs describe - get metadata for a given import job

SYNOPSIS
    gcloud kms import-jobs describe IMPORT_JOB
        [--attestation-file=ATTESTATION_FILE] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns metadata for the given import job.

    The optional flag --attestation-file specifies file to write the
    attestation into. The attestation enables the user to verify the integrity
    and provenance of the key. See https://cloud.google.com/kms/docs/attest-key
    for more information about attestations.

EXAMPLES
    The following command returns metadata for import job 'strider' within the
    keyring 'fellowship' in the location 'us-central1':

        $ gcloud kms import-jobs describe strider --keyring=fellowship \
            --location=us-central1

    For import jobs with protection level HSM, use the --attestation-file flag
    to save the attestation to a local file.

        $ gcloud kms import-jobs describe strider --keyring=fellowship \
            --location=us-central1 \
            --attestation-file=path/to/attestation.dat

POSITIONAL ARGUMENTS
     IMPORT_JOB
        Name of the import job to describe.

FLAGS
     --attestation-file=ATTESTATION_FILE
        Path to the output attestation file.

     --keyring=KEYRING
        Key ring of the import job.

     --location=LOCATION
        Location of the import job.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs describe

        $ gcloud beta kms import-jobs describe
```

### gcloud kms import-jobs get-iam-policy

```text
NAME
    gcloud kms import-jobs get-iam-policy - get the IAM policy for an import
        job

SYNOPSIS
    gcloud kms import-jobs get-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays the IAM policy associated with an import job. If formatted as
    JSON, the output can be edited and used as a policy file for
    set-iam-policy. The output includes an "etag" field identifying the version
    emitted and allowing detection of concurrent policy updates; see $ gcloud
    kms import-jobs set-iam-policy for additional details.

EXAMPLES
    To print the IAM policy for a given import job, run:

        $ gcloud kms import-jobs get-iam-policy --keyring=my-key-ring \
            --location=my-location my-importjob

POSITIONAL ARGUMENTS
     Import job resource - The import job for which to get the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument import_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMPORT_JOB
          ID of the import job or fully qualified identifier for the import
          job.

          To set the import_job attribute:
          + provide the argument import_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The containing keyring.

          To set the keyring attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

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

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs get-iam-policy

        $ gcloud beta kms import-jobs get-iam-policy
```

### gcloud kms import-jobs list

```text
NAME
    gcloud kms import-jobs list - lists import jobs within a keyring

SYNOPSIS
    gcloud kms import-jobs list [--keyring=KEYRING] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists all import jobs within the given keyring.

EXAMPLES
    The following command lists a maximum of five import jobs within the
    keyring 'fellowship' and location 'global':

        $ gcloud kms import-jobs list --keyring=fellowship --location=global

FLAGS
     --keyring=KEYRING
        Key ring of the import job.

     --location=LOCATION
        Location of the import job.

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

        $ gcloud alpha kms import-jobs list

        $ gcloud beta kms import-jobs list
```

### gcloud kms import-jobs remove-iam-policy-binding

```text
NAME
    gcloud kms import-jobs remove-iam-policy-binding - remove IAM policy
        binding for a KMS import job

SYNOPSIS
    gcloud kms import-jobs remove-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Removes a policy binding from the IAM policy of a KMS import job. One
    binding consists of a member and a role.

EXAMPLES
    To remove an IAM policy binding for the role of 'roles/viewer' for the user
    'test-user@gmail.com' on the import job frodo with the keyring fellowship
    and location global, run:

        $ gcloud kms import-jobs remove-iam-policy-binding frodo \
            --keyring='fellowship' --location='global' \
            --member='user:test-user@gmail.com' --role='roles/viewer'

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     Import job resource - The import job from which to remove the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument import_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMPORT_JOB
          ID of the import job or fully qualified identifier for the import
          job.

          To set the import_job attribute:
          + provide the argument import_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The containing keyring.

          To set the keyring attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs remove-iam-policy-binding

        $ gcloud beta kms import-jobs remove-iam-policy-binding
```

### gcloud kms import-jobs set-iam-policy

```text
NAME
    gcloud kms import-jobs set-iam-policy - set the IAM policy binding for a
        KMS import job

SYNOPSIS
    gcloud kms import-jobs set-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given import job as defined in a JSON or YAML
    file.

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the import job 'frodo' with the keyring
    'fellowship' and location 'global':

        $ gcloud kms import-jobs set-iam-policy frodo policy.json \
            --keyring=fellowship --location=global

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Import job resource - The import job for which to set the IAM policy
     binding. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument import_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMPORT_JOB
          ID of the import job or fully qualified identifier for the import
          job.

          To set the import_job attribute:
          + provide the argument import_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --keyring=KEYRING
          The containing keyring.

          To set the keyring attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --keyring on the command line.

       --location=LOCATION
          The location of the resource.

          To set the location attribute:
          + provide the argument import_job on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the cloudkms/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/kms/

NOTES
    These variants are also available:

        $ gcloud alpha kms import-jobs set-iam-policy

        $ gcloud beta kms import-jobs set-iam-policy
```

### gcloud beta kms import-jobs add-iam-policy-binding

```text
NAME
    gcloud beta kms import-jobs add-iam-policy-binding - add IAM policy binding
        to a KMS import job

SYNOPSIS
    gcloud beta kms import-jobs add-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs create

```text
NAME
    gcloud beta kms import-jobs create - create a new import job

SYNOPSIS
    gcloud beta kms import-jobs create IMPORT_JOB --import-method=IMPORT_METHOD
        --protection-level=PROTECTION_LEVEL [--keyring=KEYRING]
        [--location=LOCATION]
        [--single-tenant-hsm-instance=SINGLE_TENANT_HSM_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs describe

```text
NAME
    gcloud beta kms import-jobs describe - get metadata for a given import job

SYNOPSIS
    gcloud beta kms import-jobs describe IMPORT_JOB
        [--attestation-file=ATTESTATION_FILE] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs get-iam-policy

```text
NAME
    gcloud beta kms import-jobs get-iam-policy - get the IAM policy for an
        import job

SYNOPSIS
    gcloud beta kms import-jobs get-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs list

```text
NAME
    gcloud beta kms import-jobs list - lists import jobs within a keyring

SYNOPSIS
    gcloud beta kms import-jobs list [--keyring=KEYRING] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs remove-iam-policy-binding

```text
NAME
    gcloud beta kms import-jobs remove-iam-policy-binding - remove IAM policy
        binding for a KMS import job

SYNOPSIS
    gcloud beta kms import-jobs remove-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms import-jobs set-iam-policy

```text
NAME
    gcloud beta kms import-jobs set-iam-policy - set the IAM policy binding for
        a KMS import job

SYNOPSIS
    gcloud beta kms import-jobs set-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs add-iam-policy-binding

```text
NAME
    gcloud alpha kms import-jobs add-iam-policy-binding - add IAM policy
        binding to a KMS import job

SYNOPSIS
    gcloud alpha kms import-jobs add-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs create

```text
NAME
    gcloud alpha kms import-jobs create - create a new import job

SYNOPSIS
    gcloud alpha kms import-jobs create IMPORT_JOB
        --import-method=IMPORT_METHOD --protection-level=PROTECTION_LEVEL
        [--keyring=KEYRING] [--location=LOCATION]
        [--single-tenant-hsm-instance=SINGLE_TENANT_HSM_INSTANCE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs describe

```text
NAME
    gcloud alpha kms import-jobs describe - get metadata for a given import job

SYNOPSIS
    gcloud alpha kms import-jobs describe IMPORT_JOB
        [--attestation-file=ATTESTATION_FILE] [--keyring=KEYRING]
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs get-iam-policy

```text
NAME
    gcloud alpha kms import-jobs get-iam-policy - get the IAM policy for an
        import job

SYNOPSIS
    gcloud alpha kms import-jobs get-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs list

```text
NAME
    gcloud alpha kms import-jobs list - lists import jobs within a keyring

SYNOPSIS
    gcloud alpha kms import-jobs list [--keyring=KEYRING] [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs remove-iam-policy-binding

```text
NAME
    gcloud alpha kms import-jobs remove-iam-policy-binding - remove IAM policy
        binding for a KMS import job

SYNOPSIS
    gcloud alpha kms import-jobs remove-iam-policy-binding
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) --member=PRINCIPAL
        --role=ROLE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms import-jobs set-iam-policy

```text
NAME
    gcloud alpha kms import-jobs set-iam-policy - set the IAM policy binding
        for a KMS import job

SYNOPSIS
    gcloud alpha kms import-jobs set-iam-policy
        (IMPORT_JOB : --keyring=KEYRING --location=LOCATION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the `list` example is introduced as listing "a maximum of five import jobs" but passes no `--limit`, whose default on this page is unlimited, so it lists every import job. Adapted (not in the official docs): `gcloud kms import-jobs list --keyring=fellowship --location=global --limit=5`, as in the `list` examples of `gcloud kms keyrings` and `gcloud kms ekm-connections`. The `hsm-single-tenant` `create` example passes `--single-tenant-hsm-instance=my_sthi`, but the `--single-tenant-hsm-instance-id` description of `gcloud kms single-tenant-hsm create` says the instance ID must "match the regular expression [a-zA-Z0-9-]{1,63}", which does not allow `_`, so no instance can have that ID; use an ID such as `my-sthi`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/import-jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
