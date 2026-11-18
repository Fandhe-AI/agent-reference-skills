---
source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/proposal
---

# gcloud kms single-tenant-hsm proposal

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud kms single-tenant-hsm proposal approve

```text
NAME
    gcloud kms single-tenant-hsm proposal approve - approve a single tenant HSM
        instance proposal

SYNOPSIS
    gcloud kms single-tenant-hsm proposal approve
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        (--quorum-challenge-replies=QUORUM_CHALLENGE_REPLIES
          --required-challenge-replies=REQUIRED_CHALLENGE_REPLIES)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command approves a single tenant HSM instance proposal with
    quorum challenge replies:

        $ gcloud kms single-tenant-hsm proposal approve \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/ my_sthi/proposals/my_proposal \
            --quorum-challenge-replies="[('signed_challenge_1.txt','public_k\
        ey_1.pem'),
    ('signed_challenge_2.txt','public_key_2.pem'),
    ('signed_challenge_3.txt','public_key_3.pem')]"

    To approve a proposal with required challenges and quorum challenges:

        $ gcloud kms single-tenant-hsm proposal approve \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/ my_sthi/proposals/my_proposal \
            --required-challenge-replies="[('required_challenge.txt','public\
        _key_1.pem')]" \
            --quorum-challenge-replies="[('quorum_challenge_1.txt','public_k\
        ey_2.pem'),
    ('quorum_challenge_2.txt','public_key_3.pem')]"

POSITIONAL ARGUMENTS
     SingleTenantHsmInstanceProposal resource - The KMS single tenant HSM
     instance proposal resource. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance_proposal on the
        command line with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE_PROPOSAL
          ID of the singleTenantHsmInstanceProposal or fully qualified
          identifier for the singleTenantHsmInstanceProposal.

          To set the proposal attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstanceProposal.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE
          The KMS single tenant HSM instance of the
          singleTenantHsmInstanceProposal.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --single_tenant_hsm_instance on the command
            line.

REQUIRED FLAGS
     Approval payload for the proposal.

     At least one of these must be specified:

       --quorum-challenge-replies=QUORUM_CHALLENGE_REPLIES
          The challenge replies to approve the proposal. Challenge replies can
          be sent across multiple requests. Each tuple should be
          ("signed_challenge_file", "public_key_file").

       --required-challenge-replies=REQUIRED_CHALLENGE_REPLIES
          A list of tuples, each containing the file paths for a required
          challenge reply. Each tuple should be ("signed_challenge_file",
          "public_key_file").

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm proposal approve

        $ gcloud beta kms single-tenant-hsm proposal approve
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms single-tenant-hsm proposal approve projects/my-project/locations/us-east1/singleTenantHsmInstances/my_sthi/proposals/my_proposal \
    --quorum-challenge-replies="[('signed_challenge_1.txt','public_key_1.pem'), ('signed_challenge_2.txt','public_key_2.pem'), ('signed_challenge_3.txt','public_key_3.pem')]"

gcloud kms single-tenant-hsm proposal approve projects/my-project/locations/us-east1/singleTenantHsmInstances/my_sthi/proposals/my_proposal \
    --required-challenge-replies="[('required_challenge.txt','public_key_1.pem')]" \
    --quorum-challenge-replies="[('quorum_challenge_1.txt','public_key_2.pem'), ('quorum_challenge_2.txt','public_key_3.pem')]"
```

### gcloud kms single-tenant-hsm proposal create

```text
NAME
    gcloud kms single-tenant-hsm proposal create - create a single tenant HSM
        instance proposal

SYNOPSIS
    gcloud kms single-tenant-hsm proposal create
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        --operation-type=OPERATION_TYPE
        [--crypto-key-version-name=CRYPTO_KEY_VERSION_NAME]
        [--member-public-key-pem=MEMBER_PUBLIC_KEY_PEM]
        [--required-approver-count=REQUIRED_APPROVER_COUNT]
        [--single-tenant-hsm-instance-proposal-id=SINGLE_TENANT_HSM_INSTANCE_PROPOSAL_ID]
        [--two-factor-public-key-pem=TWO_FACTOR_PUBLIC_KEY_PEM]
        [--two-factor-public-key-pems=[PEM_FILE_PATH,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
        $ gcloud kms single-tenant-hsm proposal create
          my_stchi
          --location=us-central1 \
          --required-approver-count=1  \
          --two-factor-public-key-pems=public_key_1.pem,public_key_2.pem

POSITIONAL ARGUMENTS
     SingleTenantHsmInstance resource - The KMS single tenant HSM instance
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance on the command line
        with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE
          ID of the singleTenantHsmInstance or fully qualified identifier for
          the singleTenantHsmInstance.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstance.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line with a fully specified name;
          + provide the argument --location on the command line.

REQUIRED FLAGS
     --operation-type=OPERATION_TYPE
        The type of operation for the single tenant HSM instance proposal.

OPTIONAL FLAGS
     --crypto-key-version-name=CRYPTO_KEY_VERSION_NAME
        ID to use for the crypto key version. This field is required for
        upgrade_key_trust operation type.

     --member-public-key-pem=MEMBER_PUBLIC_KEY_PEM
        The PEM file containing the public key of the quorum member to add or
        remove. This field is required for add_quorum_member and
        remove_quorum_member operation types.

     --required-approver-count=REQUIRED_APPROVER_COUNT
        The number of approvers required for the single tenant HSM instance.
        This is the M value used for M of N quorum. Must be greater than or
        equal to 1 and less than or equal to the total approver count of the
        single tenant HSM instance minus 1. This field is required for the
        register_2fa_keys operation type.

     --single-tenant-hsm-instance-proposal-id=SINGLE_TENANT_HSM_INSTANCE_PROPOSAL_ID
        The ID to use for the single tenant HSM instance proposal, which will
        become the final component of the single tenant HSM instance resource
        name.

     --two-factor-public-key-pem=TWO_FACTOR_PUBLIC_KEY_PEM
        PEM file containing the two-factor public key. This field is required
        for upgrade_key_trust operation type.

     --two-factor-public-key-pems=[PEM_FILE_PATH,...]
        The PEM files containing the two factor public keys 2FA keys for M of N
        quorum auth tenant HSM instance. This field is required for
        register_2fa_keys operation type.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm proposal create

        $ gcloud beta kms single-tenant-hsm proposal create
```

### gcloud kms single-tenant-hsm proposal delete

```text
NAME
    gcloud kms single-tenant-hsm proposal delete - delete a single tenant HSM
        instance proposal

SYNOPSIS
    gcloud kms single-tenant-hsm proposal delete
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command deletes a single tenant HSM instance proposal:

        $ gcloud kms single-tenant-hsm proposal delete \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/ my_sthi/proposals/my_proposal

POSITIONAL ARGUMENTS
     SingleTenantHsmInstanceProposal resource - The KMS single tenant HSM
     instance proposal resource. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance_proposal on the
        command line with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE_PROPOSAL
          ID of the singleTenantHsmInstanceProposal or fully qualified
          identifier for the singleTenantHsmInstanceProposal.

          To set the proposal attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstanceProposal.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE
          The KMS single tenant HSM instance of the
          singleTenantHsmInstanceProposal.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --single_tenant_hsm_instance on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm proposal delete

        $ gcloud beta kms single-tenant-hsm proposal delete
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms single-tenant-hsm proposal delete projects/my-project/locations/us-east1/singleTenantHsmInstances/my_sthi/proposals/my_proposal
```

### gcloud kms single-tenant-hsm proposal describe

```text
NAME
    gcloud kms single-tenant-hsm proposal describe - get metadata for a single
        tenant HSM instance proposal

SYNOPSIS
    gcloud kms single-tenant-hsm proposal describe
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    The following command returns the metadata for the single tenant HSM
    instance proposal with the name my_proposal, of the instance my_sthi, and
    in the location us-east1 using the fully specified resource name.

        $ gcloud kms single-tenant-hsm proposal describe \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/my_sthi/proposals/my_proposal

    The following command returns the metadata for the single tenant HSM
    instance proposal with the name my_proposal, of the instance my_sthi, and
    in the location us-east1 using the location, instance id, and proposal id.

        $ gcloud kms single-tenant-hsm proposal describe my_proposal \
            --single_tenant_hsm_instance=my_sthi --location=us-east1

POSITIONAL ARGUMENTS
     SingleTenantHsmInstanceProposal resource - The KMS single tenant HSM
     instance proposal resource. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance_proposal on the
        command line with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE_PROPOSAL
          ID of the singleTenantHsmInstanceProposal or fully qualified
          identifier for the singleTenantHsmInstanceProposal.

          To set the proposal attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstanceProposal.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE
          The KMS single tenant HSM instance of the
          singleTenantHsmInstanceProposal.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --single_tenant_hsm_instance on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm proposal describe

        $ gcloud beta kms single-tenant-hsm proposal describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms single-tenant-hsm proposal describe projects/my-project/locations/us-east1/singleTenantHsmInstances/my_sthi/proposals/my_proposal
```

### gcloud kms single-tenant-hsm proposal execute

```text
NAME
    gcloud kms single-tenant-hsm proposal execute - executes a single tenant
        HSM proposal

SYNOPSIS
    gcloud kms single-tenant-hsm proposal execute
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Executes a single tenant HSM proposal. The proposal must be in an approved
    state.

EXAMPLES
    The following command executes a single tenant HSM proposal named
    my_proposal associated with the single tenant HSM instance my_sthi within
    the location us-central1 with the fully specified name.

        $ gcloud kms single-tenant-hsm proposal execute \
            projects/my-project/locations/us-central1/\
        singleTenantHsmInstances/ my_sthi/proposals/my_proposal

    The following command executes a single tenant HSM proposal named
    my_proposal associated with the single tenant HSM instance my_sthi within
    the location us-central1 using the location, single-tenant-hsm-instance,
    and proposal id.

        $ gcloud kms single-tenant-hsm proposal execute my_proposal \
            --location=us-central1 --single_tenant_hsm_instance=my_sthi \
            proposal_id=my_proposal

POSITIONAL ARGUMENTS
     SingleTenantHsmInstanceProposal resource - The KMS single tenant HSM
     instance proposal resource. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance_proposal on the
        command line with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE_PROPOSAL
          ID of the singleTenantHsmInstanceProposal or fully qualified
          identifier for the singleTenantHsmInstanceProposal.

          To set the proposal attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstanceProposal.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --location on the command line.

       --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE
          The KMS single tenant HSM instance of the
          singleTenantHsmInstanceProposal.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance_proposal on the
            command line with a fully specified name;
          + provide the argument --single_tenant_hsm_instance on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha kms single-tenant-hsm proposal execute

        $ gcloud beta kms single-tenant-hsm proposal execute
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud kms single-tenant-hsm proposal execute projects/my-project/locations/us-central1/singleTenantHsmInstances/my_sthi/proposals/my_proposal

gcloud kms single-tenant-hsm proposal execute my_proposal \
    --location=us-central1 \
    --single_tenant_hsm_instance=my_sthi
```

### gcloud kms single-tenant-hsm proposal list

```text
NAME
    gcloud kms single-tenant-hsm proposal list - list single tenant HSM
        instance proposals within a single tenant HSM instance

SYNOPSIS
    gcloud kms single-tenant-hsm proposal list
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To list all single tenant HSM instance proposals in a single tenant
    instance using the single tenant HSM instance name my_sthi and the location
    us-east1:

        $ gcloud kms single-tenant-hsm proposal list my_sthi \
            --location=us-east1

    To list all single tenant HSM instance proposals in a single tenant
    instance using the single tenant HSM instance name my_sthi and the location
    us-east1 with the full single tenant HSM instance resource name:

        $ gcloud kms single-tenant-hsm proposal list \
            projects/my-project/locations/us-east1/\
        singleTenantHsmInstances/my_sthi

POSITIONAL ARGUMENTS
     SingleTenantHsmInstance resource - The KMS single tenant HSM instance
     resource. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument single_tenant_hsm_instance on the command line
        with a fully specified name;
      * set the property core/project.

     This must be specified.

       SINGLE_TENANT_HSM_INSTANCE
          ID of the singleTenantHsmInstance or fully qualified identifier for
          the singleTenantHsmInstance.

          To set the single_tenant_hsm_instance attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Google Cloud location for the singleTenantHsmInstance.

          To set the location attribute:
          + provide the argument single_tenant_hsm_instance on the command
            line with a fully specified name;
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

        $ gcloud alpha kms single-tenant-hsm proposal list

        $ gcloud beta kms single-tenant-hsm proposal list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud kms single-tenant-hsm proposal list projects/my-project/locations/us-east1/singleTenantHsmInstances/my_sthi
```

### gcloud beta kms single-tenant-hsm proposal approve

```text
NAME
    gcloud beta kms single-tenant-hsm proposal approve - approve a single
        tenant HSM instance proposal

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal approve
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        (--quorum-challenge-replies=QUORUM_CHALLENGE_REPLIES
          --required-challenge-replies=REQUIRED_CHALLENGE_REPLIES)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms single-tenant-hsm proposal create

```text
NAME
    gcloud beta kms single-tenant-hsm proposal create - create a single tenant
        HSM instance proposal

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal create
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        --operation-type=OPERATION_TYPE
        [--crypto-key-version-name=CRYPTO_KEY_VERSION_NAME]
        [--member-public-key-pem=MEMBER_PUBLIC_KEY_PEM]
        [--required-approver-count=REQUIRED_APPROVER_COUNT]
        [--single-tenant-hsm-instance-proposal-id=SINGLE_TENANT_HSM_INSTANCE_PROPOSAL_ID]
        [--two-factor-public-key-pem=TWO_FACTOR_PUBLIC_KEY_PEM]
        [--two-factor-public-key-pems=[PEM_FILE_PATH,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms single-tenant-hsm proposal delete

```text
NAME
    gcloud beta kms single-tenant-hsm proposal delete - delete a single tenant
        HSM instance proposal

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal delete
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms single-tenant-hsm proposal describe

```text
NAME
    gcloud beta kms single-tenant-hsm proposal describe - get metadata for a
        single tenant HSM instance proposal

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal describe
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms single-tenant-hsm proposal execute

```text
NAME
    gcloud beta kms single-tenant-hsm proposal execute - executes a single
        tenant HSM proposal

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal execute
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms single-tenant-hsm proposal list

```text
NAME
    gcloud beta kms single-tenant-hsm proposal list - list single tenant HSM
        instance proposals within a single tenant HSM instance

SYNOPSIS
    gcloud beta kms single-tenant-hsm proposal list
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal approve

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal approve - approve a single
        tenant HSM instance proposal

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal approve
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        (--quorum-challenge-replies=QUORUM_CHALLENGE_REPLIES
          --required-challenge-replies=REQUIRED_CHALLENGE_REPLIES)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal create

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal create - create a single tenant
        HSM instance proposal

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal create
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        --operation-type=OPERATION_TYPE
        [--crypto-key-version-name=CRYPTO_KEY_VERSION_NAME]
        [--member-public-key-pem=MEMBER_PUBLIC_KEY_PEM]
        [--required-approver-count=REQUIRED_APPROVER_COUNT]
        [--single-tenant-hsm-instance-proposal-id=SINGLE_TENANT_HSM_INSTANCE_PROPOSAL_ID]
        [--two-factor-public-key-pem=TWO_FACTOR_PUBLIC_KEY_PEM]
        [--two-factor-public-key-pems=[PEM_FILE_PATH,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal delete

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal delete - delete a single tenant
        HSM instance proposal

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal delete
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal describe

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal describe - get metadata for a
        single tenant HSM instance proposal

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal describe
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal execute

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal execute - executes a single
        tenant HSM proposal

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal execute
        (SINGLE_TENANT_HSM_INSTANCE_PROPOSAL : --location=LOCATION
          --single_tenant_hsm_instance=SINGLE_TENANT_HSM_INSTANCE)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms single-tenant-hsm proposal list

```text
NAME
    gcloud alpha kms single-tenant-hsm proposal list - list single tenant HSM
        instance proposals within a single tenant HSM instance

SYNOPSIS
    gcloud alpha kms single-tenant-hsm proposal list
        (SINGLE_TENANT_HSM_INSTANCE : --location=LOCATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `approve`, `delete` and `execute` examples write the proposal name as `projects/my-project/locations/.../singleTenantHsmInstances/ my_sthi/proposals/my_proposal`, with a space that splits it into two arguments (gcloud 593.0.0: "unrecognized arguments: my_sthi/proposals/my_proposal"); the runnable form removes the space.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `execute` example that gives the proposal ID with `--location` and `--single_tenant_hsm_instance` ends with `proposal_id=my_proposal`, an extra positional argument (gcloud 593.0.0: "unrecognized arguments: proposal_id=my_proposal"); the proposal is already given as `my_proposal`, so the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/proposal (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
