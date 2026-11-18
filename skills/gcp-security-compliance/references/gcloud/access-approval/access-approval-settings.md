---
source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/settings
---

# gcloud access-approval settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud access-approval settings delete

```text
NAME
    gcloud access-approval settings delete - delete Access Approval settings

SYNOPSIS
    gcloud access-approval settings delete
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the Access Approval settings associated with a project, a folder, or
    organization.

EXAMPLES
    To delete the settings for the current project use

        $ gcloud access-approval settings delete

    To delete the settings for folder f1 use

        $ gcloud access-approval settings delete --folder=f1

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder number. Only one of --project, --folder, or --organization can
          be provided. If none are provided then it uses config property
          [core/project].

       --organization=ORGANIZATION
          Organization number. Either --project, --folder, or --organization
          must be provided. If none are provided then it uses config property
          [core/project].

       --project=PROJECT
          Project number or id. Only one of --project, --folder, or
          --organization can be provided. If none are provided then it uses
          config property [core/project].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval settings delete

        $ gcloud beta access-approval settings delete
```

### gcloud access-approval settings get

```text
NAME
    gcloud access-approval settings get - get Access Approval settings

SYNOPSIS
    gcloud access-approval settings get
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the Access Approval settings associated with a project, a folder, or
    organization.

EXAMPLES
    To get the settings for the current project use

        $ gcloud access-approval settings get

    To get the settings for folder f1 use

        $ gcloud access-approval settings get --folder=f1

FLAGS
     At most one of these can be specified:

       --folder=FOLDER
          Folder number. Only one of --project, --folder, or --organization can
          be provided. If none are provided then it uses config property
          [core/project].

       --organization=ORGANIZATION
          Organization number. Either --project, --folder, or --organization
          must be provided. If none are provided then it uses config property
          [core/project].

       --project=PROJECT
          Project number or id. Only one of --project, --folder, or
          --organization can be provided. If none are provided then it uses
          config property [core/project].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval settings get

        $ gcloud beta access-approval settings get
```

### gcloud access-approval settings update

```text
NAME
    gcloud access-approval settings update - update Access Approval settings

SYNOPSIS
    gcloud access-approval settings update
        [--active_key_version=ACTIVE_KEY_VERSION]
        [--approval_policy=APPROVAL_POLICY]
        [--enrolled_services=ENROLLED_SERVICES]
        [--notification_emails=NOTIFICATION_EMAILS]
        [--notification_pubsub_topic=NOTIFICATION_PUBSUB_TOPIC]
        [--prefer_no_broad_approval_requests=PREFER_NO_BROAD_APPROVAL_REQUESTS]
        [--preferred_request_expiration_days=PREFERRED_REQUEST_EXPIRATION_DAYS]
        [--request_scope_max_width_preference=REQUEST_SCOPE_MAX_WIDTH_PREFERENCE]
        [--require_customer_visible_justification=REQUIRE_CUSTOMER_VISIBLE_JUSTIFICATION]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the Access Approval settings associated with a project, a folder, or
    organization. Partial updates are supported (for example, you can update
    the notification emails without modifying the enrolled services).

EXAMPLES
    Update notification emails associated with project p1, run:

        $ gcloud access-approval settings update --project=p1 \
          --notification_emails='foo@example.com, bar@example.com'

    Enable Access Approval enforcement for folder f1:

        $ gcloud access-approval settings update --folder=f1 \
          --enrolled_services=all

    Enable Access Approval enforcement for organization org1 for only Cloud
    Storage and Compute products and set the notification emails at the same
    time:

        $ gcloud access-approval settings update --organization=org1 \
          --enrolled_services='storage.googleapis.com,compute.googleapis.c\
        om' --notification_emails='security_team@example.com'

    Update active key version for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --active_key_version='projects/p1/locations/global/keyRings/sign\
        ing-keys/cryptoKeys/signing-key/cryptoKeyVersions/1'

    Update preferred request expiration days for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --preferred_request_expiration_days=5

    Enable prefer no broad approval requests for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --prefer_no_broad_approval_requests=true

    Update notification pubsub topic for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --notification_pubsub_topic='exampleTopic'

    Update request scope max width preference for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --request_scope_max_width_preference=PROJECT

    Update approval policy for project p1:

        $ gcloud access-approval settings update --project=p1 \
          --approval_policy=transparency

FLAGS
     --active_key_version=ACTIVE_KEY_VERSION
        The asymmetric crypto key version to use for signing approval requests.
        Use '' to remove the custom signing key.

     --approval_policy=APPROVAL_POLICY
        The preference to configure the approval policy for access requests.
        APPROVAL_POLICY must be one of: transparency, streamlined-support,
        access-approval, inherit-policy-from-parent.

     --enrolled_services=ENROLLED_SERVICES
        Comma-separated list of services to enroll for Access Approval or 'all'
        for all supported services. Note for project and folder enrollments,
        only 'all' is supported. Use '' to clear all enrolled services.

     --notification_emails=NOTIFICATION_EMAILS
        Comma-separated list of email addresses to which notifications relating
        to approval requests should be sent or '' to clear all saved
        notification emails.

     --notification_pubsub_topic=NOTIFICATION_PUBSUB_TOPIC
        The pubsub topic to publish notifications to when approval requests are
        made.

     --prefer_no_broad_approval_requests=PREFER_NO_BROAD_APPROVAL_REQUESTS
        If set to true it will communicate the preference to Google personnel
        to request access with as targeted a resource scope as possible.

     --preferred_request_expiration_days=PREFERRED_REQUEST_EXPIRATION_DAYS
        The default expiration time for approval requests. This value must be
        between 1 and 30. Note that this can be overridden at time of Approval
        Request creation and modified by the customer at approval time.

     --request_scope_max_width_preference=REQUEST_SCOPE_MAX_WIDTH_PREFERENCE
        The preference for the broadest scope of access for access requests
        without a specific method. REQUEST_SCOPE_MAX_WIDTH_PREFERENCE must be
        one of: ORGANIZATION, FOLDER, PROJECT.

     --require_customer_visible_justification=REQUIRE_CUSTOMER_VISIBLE_JUSTIFICATION
        The preference to configure if a customer visible justification (i.e.
        Vector Case) is required for a Googler to create an Access Ticket to
        send to the customer when attempting to access customer resources.

     At most one of these can be specified:

       --folder=FOLDER
          Folder number. Only one of --project, --folder, or --organization can
          be provided. If none are provided then it uses config property
          [core/project].

       --organization=ORGANIZATION
          Organization number. Either --project, --folder, or --organization
          must be provided. If none are provided then it uses config property
          [core/project].

       --project=PROJECT
          Project number or id. Only one of --project, --folder, or
          --organization can be provided. If none are provided then it uses
          config property [core/project].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha access-approval settings update

        $ gcloud beta access-approval settings update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud access-approval settings update \
    --organization=org1 \
    --enrolled_services='storage.googleapis.com,compute.googleapis.com' \
    --notification_emails='security_team@example.com'

gcloud access-approval settings update \
    --project=p1 \
    --active_key_version='projects/p1/locations/global/keyRings/signing-keys/cryptoKeys/signing-key/cryptoKeyVersions/1'
```

### gcloud beta access-approval settings delete

```text
NAME
    gcloud beta access-approval settings delete - delete Access Approval
        settings

SYNOPSIS
    gcloud beta access-approval settings delete
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval settings get

```text
NAME
    gcloud beta access-approval settings get - get Access Approval settings

SYNOPSIS
    gcloud beta access-approval settings get
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta access-approval settings update

```text
NAME
    gcloud beta access-approval settings update - update Access Approval
        settings

SYNOPSIS
    gcloud beta access-approval settings update
        [--active_key_version=ACTIVE_KEY_VERSION]
        [--approval_policy=APPROVAL_POLICY]
        [--enrolled_services=ENROLLED_SERVICES]
        [--notification_emails=NOTIFICATION_EMAILS]
        [--notification_pubsub_topic=NOTIFICATION_PUBSUB_TOPIC]
        [--prefer_no_broad_approval_requests=PREFER_NO_BROAD_APPROVAL_REQUESTS]
        [--preferred_request_expiration_days=PREFERRED_REQUEST_EXPIRATION_DAYS]
        [--request_scope_max_width_preference=REQUEST_SCOPE_MAX_WIDTH_PREFERENCE]
        [--require_customer_visible_justification=REQUIRE_CUSTOMER_VISIBLE_JUSTIFICATION]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval settings delete

```text
NAME
    gcloud alpha access-approval settings delete - delete Access Approval
        settings

SYNOPSIS
    gcloud alpha access-approval settings delete
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval settings get

```text
NAME
    gcloud alpha access-approval settings get - get Access Approval settings

SYNOPSIS
    gcloud alpha access-approval settings get
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha access-approval settings update

```text
NAME
    gcloud alpha access-approval settings update - update Access Approval
        settings

SYNOPSIS
    gcloud alpha access-approval settings update
        [--active_key_version=ACTIVE_KEY_VERSION]
        [--approval_policy=APPROVAL_POLICY]
        [--enrolled_services=ENROLLED_SERVICES]
        [--notification_emails=NOTIFICATION_EMAILS]
        [--notification_pubsub_topic=NOTIFICATION_PUBSUB_TOPIC]
        [--prefer_no_broad_approval_requests=PREFER_NO_BROAD_APPROVAL_REQUESTS]
        [--preferred_request_expiration_days=PREFERRED_REQUEST_EXPIRATION_DAYS]
        [--request_scope_max_width_preference=REQUEST_SCOPE_MAX_WIDTH_PREFERENCE]
        [--require_customer_visible_justification=REQUIRE_CUSTOMER_VISIBLE_JUSTIFICATION]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Example error: the `--folder=f1` and `--organization=org1` examples of `delete`, `get` and `update` pass values that gcloud 593.0.0 rejects ("Invalid value for [folder]: f1", "Invalid value for [organization]: org1"); the FLAGS describe `--folder` as "Folder number." and `--organization` as "Organization number.", so pass the numbers.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/access-approval/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
