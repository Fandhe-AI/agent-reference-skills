---
source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/budgets
---

# gcloud billing budgets

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud billing budgets create

```text
NAME
    gcloud billing budgets create - create a budget

SYNOPSIS
    gcloud billing budgets create --billing-account=BILLING_ACCOUNT
        --display-name=DISPLAY_NAME
        (--budget-amount=BUDGET_AMOUNT | --last-period-amount)
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--notifications-rule-monitoring-notification-channels=[NOTIFICATIONS_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]]
        [--notifications-rule-pubsub-topic=NOTIFICATIONS_RULE_PUBSUB_TOPIC]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--threshold-rule=[basis=BASIS],[percent=PERCENT]]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a budget.

EXAMPLES
    To create a budget with the display name 'BUDGET1' in the amount of 100.75
    in the default currency ('USD'), to receive notifications when 50% of the
    current budget or 75% of the forecasted budget is spent in the account
    '123', run:

        $ gcloud billing budgets create --billing-account=123 \
            --display-name="BUDGET1" --budget-amount=100.75USD \
            --threshold-rule=percent=0.50 \
            --threshold-rule=percent=0.75,basis=forecasted-spend

REQUIRED FLAGS
     Billing account resource - Billing account under which to create the
     budget. This represents a Cloud resource.

     This must be specified.

       --billing-account=BILLING_ACCOUNT
          ID of the billing-account or fully qualified identifier for the
          billing-account.

          To set the billing-account attribute:
          + provide the argument --billing-account on the command line.

     --display-name=DISPLAY_NAME
        User data for display name in UI. Must be less than or equal to 60
        characters.

     Exactly one of these must be specified:

       --budget-amount=BUDGET_AMOUNT
          Specify the amount of the budget. If a currency type is included, it
          must be the currency associated with the billing account. If
          excluded, the currency used will be the currency associated with the
          billing account.

       --last-period-amount
          Use the amount of last period's budget.

OPTIONAL FLAGS
     --credit-types-treatment=CREDIT_TYPES_TREATMENT
        Whether to include all credit types when calculating the actual spend
        against the budget. If this is not specified, then all credit types are
        used in the calculation. If this is set to include-specified-credits,
        then --filter-credit-types must be specified with a nonempty list of
        credits. CREDIT_TYPES_TREATMENT must be one of:
        credit-types-treatment-unspecified, exclude-all-credits,
        include-all-credits, include-specified-credits.

     --disable-default-iam-recipients
        When set to true, disables default notifications sent when a threshold
        is exceeded. Default notifications are sent to those with Billing
        Account Administrator and Billing Account User IAM roles for the target
        account.

     --filter-credit-types=[FILTER_CREDIT_TYPES,...]
        Set of credit types, specifying that usage from only this set of
        credits should be included in the budget. If a nonempty list is
        specified, then --credit-types-treatment must be
        include-specified-credits.

     --filter-labels=[KEY=VALUE,...]
        Single label and value pair specifying that usage from only this set of
        labeled resources should be included in the budget. Currently, multiple
        entries or multiple values per entry are not allowed. If omitted, the
        report will include all labeled and unlabeled usage.

     --filter-projects=[FILTER_PROJECTS,...]
        Set of projects in the form projects/{project_id}, specifying that
        usage from only this set of projects should be included in the budget.
        If omitted, all projects will be included.

     --filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]
        A set of folder and organization names of the form folders/{folderId}
        or organizations/{organizationId}, specifying that usage from only this
        set of folders and organizations should be included in the budget. If
        omitted, the budget includes all usage that the billing account pays
        for. If the folder or organization contains projects that are paid for
        by a different Cloud Billing account, the budget doesn't apply to those
        projects.

     --filter-services=[FILTER_SERVICES,...]
        Set of services of the form services/{service_id}, specifying that
        usage from only this set of services should be included in the budget.
        If omitted, the report will include usage for all services. The service
        names are available through the Catalog API:
        https://cloud.google.com/billing/v1/how-tos/catalog-api.

     --filter-subaccounts=[FILTER_SUBACCOUNTS,...]
        Set of subaccounts of the form billingAccounts/{account_id}, specifying
        that usage from only this set of subaccounts should be included in the
        budget. If a subaccount is set to the name of the parent account, usage
        from the parent account will be included. If omitted, the report will
        include usage from the parent account and all subaccounts, if they
        exist.

     --notifications-rule-monitoring-notification-channels=[NOTIFICATIONS_RULE_MONITORING_NOTIFICATION_CHANNELS,...]
        Targets to send notifications to when a threshold is exceeded. This is
        in addition to default recipients who have billing account IAM roles.
        The value is the full REST resource name of a monitoring notification
        channel in the form
        projects/{project_id}/notificationChannels/{channel_id}. A maximum of 5
        channels is allowed. See
        https://cloud.google.com/billing/docs/how-to/budgets-notification-recipients
        for more details.

     --notifications-rule-pubsub-topic=NOTIFICATIONS_RULE_PUBSUB_TOPIC
        Name of the Cloud Pub/Sub topic where budget related messages will be
        published, in the form projects/{project_id}/topics/{topic_id}.

     --ownership-scope=OWNERSHIP_SCOPE
        Sets the ownership scope of the budget. The ownership scope and users'
        IAM permissions determine who has full access to the budget's data.

        Must be one of: 'ALL_USERS' or 'BILLING_ACCOUNT'. Use 'ALL_USERS' to
        allow billing account- level users and project-level users to have full
        access to the budget (if the users have the required IAM permissions).
        Use 'BILLING_ACCOUNT' to allow only billing account-level users to have
        full access to the budget. Project-level users will have read-only
        access, even if they have the required IAM permissions.

        OWNERSHIP_SCOPE must be one of: all-users, billing-account,
        ownership-scope-unspecified.

     --threshold-rule=[basis=BASIS],[percent=PERCENT]
        Rule that triggers alerts (notifications of thresholds being crossed)
        when spend exceeds the specified percentages of the budget. This flag
        can be repeated to provide multiple thresholds above which an alert is
        sent.

         percent
            Number between 0.0 and 1.0. This is a 1.0-based percentage; for
            example 0.5 equals 50 percent. An alert is sent for anything above
            the value set.

         basis
            Type of basis used to determine if spend has passed the threshold.
            Must be one of: 'current-spend' or 'forecasted-spend'. Behavior
            defaults to 'current-spend' if not set.

     Specify either the calendar-period or custom-period, not both.

     At most one of these can be specified:

       Calendar Period

       --calendar-period=CALENDAR_PERIOD
          Specified to track usage over recurring calendar period. If you're
          creating a budget with a custom time period, omit this flag.
          CALENDAR_PERIOD must be one of: calendar-period-unspecified, month,
          quarter, year.

       Custom Period

       --start-date=START_DATE
          Specified to track usage after any start date. This time period is
          static, it does not recur.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --end-date=END_DATE
          Specified to track usage before any end date. This time period is
          static, it does not recur. If specified, --start-date must also be
          specified.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the billingbudgets/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/billing/docs/how-to/budget-api-overview

NOTES
    These variants are also available:

        $ gcloud alpha billing budgets create

        $ gcloud beta billing budgets create
```

### gcloud billing budgets delete

```text
NAME
    gcloud billing budgets delete - delete a budget

SYNOPSIS
    gcloud billing budgets delete (BUDGET : --billing-account=BILLING_ACCOUNT)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a budget.

EXAMPLES
    To delete the budget 'abc' in account '123', run:

        $ gcloud billing budgets delete "billingAccounts/123/budgets/abc"

    Alternatively, you can run:

        $ gcloud billing budgets delete abc --billing-account=123

POSITIONAL ARGUMENTS
     Budget resource - Billing budget to delete. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       BUDGET
          ID of the budget or fully qualified identifier for the budget.

          To set the budget attribute:
          + provide the argument budget on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --billing-account=BILLING_ACCOUNT
          The billing account.

          To set the billing-account attribute:
          + provide the argument budget on the command line with a fully
            specified name;
          + provide the argument --billing-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the billingbudgets/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/billing/docs/how-to/budget-api-overview

NOTES
    These variants are also available:

        $ gcloud alpha billing budgets delete

        $ gcloud beta billing budgets delete
```

### gcloud billing budgets describe

```text
NAME
    gcloud billing budgets describe - describe a budget

SYNOPSIS
    gcloud billing budgets describe
        (BUDGET : --billing-account=BILLING_ACCOUNT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a budget.

EXAMPLES
    To describe the budget 'abc' in account '123', run:

        $ gcloud billing budgets describe "billingAccounts/123/budgets/abc"

    Alternatively, you can run:

        $ gcloud billing budgets describe abc --billing-account=123

POSITIONAL ARGUMENTS
     Budget resource - Billing budget to describe. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       BUDGET
          ID of the budget or fully qualified identifier for the budget.

          To set the budget attribute:
          + provide the argument budget on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --billing-account=BILLING_ACCOUNT
          The billing account.

          To set the billing-account attribute:
          + provide the argument budget on the command line with a fully
            specified name;
          + provide the argument --billing-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the billingbudgets/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/billing/docs/how-to/budget-api-overview

NOTES
    These variants are also available:

        $ gcloud alpha billing budgets describe

        $ gcloud beta billing budgets describe
```

### gcloud billing budgets list

```text
NAME
    gcloud billing budgets list - list budgets

SYNOPSIS
    gcloud billing budgets list --billing-account=BILLING_ACCOUNT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List budgets for the account.

EXAMPLES
    To list all budgets under the account '123', run:

        $ gcloud billing budgets list --billing-account=123

REQUIRED FLAGS
     Billing account resource - List billing budgets associated with parent
     account. This represents a Cloud resource.

     This must be specified.

       --billing-account=BILLING_ACCOUNT
          ID of the billing-account or fully qualified identifier for the
          billing-account.

          To set the billing-account attribute:
          + provide the argument --billing-account on the command line.

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
    This command uses the billingbudgets/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/billing/docs/how-to/budget-api-overview

NOTES
    These variants are also available:

        $ gcloud alpha billing budgets list

        $ gcloud beta billing budgets list
```

### gcloud billing budgets update

```text
NAME
    gcloud billing budgets update - update a budget

SYNOPSIS
    gcloud billing budgets update (BUDGET : --billing-account=BILLING_ACCOUNT)
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients] [--display-name=DISPLAY_NAME]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--notifications-rule-monitoring-notification-channels=[NOTIFICATIONS_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]]
        [--notifications-rule-pubsub-topic=NOTIFICATIONS_RULE_PUBSUB_TOPIC]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--budget-amount=BUDGET_AMOUNT | --last-period-amount]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [--threshold-rules-from-file=PATH_TO_FILE
          | --add-threshold-rule=[basis=BASIS],[percent=PERCENT]
          --clear-threshold-rules] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a budget.

EXAMPLES
    To update the amount in the budget called 'abc' in account '123' to
    '987.65', run:

        $ gcloud billing budgets update billingAccounts/123/budgets/abc \
            --budget-amount=987.65

    Alternatively, you can run:

        $ gcloud billing budgets update abc --billing-account=123 \
            --budget-amount=987.65

POSITIONAL ARGUMENTS
     Budget resource - Billing budget to update. The arguments in this group
     can be used to specify the attributes of this resource.

     This must be specified.

       BUDGET
          ID of the budget or fully qualified identifier for the budget.

          To set the budget attribute:
          + provide the argument budget on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --billing-account=BILLING_ACCOUNT
          The billing account.

          To set the billing-account attribute:
          + provide the argument budget on the command line with a fully
            specified name;
          + provide the argument --billing-account on the command line.

FLAGS
     --credit-types-treatment=CREDIT_TYPES_TREATMENT
        Whether to include all credit types when calculating the actual spend
        against the budget. If this is not specified, then all credit types are
        used in the calculation. If this is set to include-specified-credits,
        then --filter-credit-types must be specified with a nonempty list of
        credits. CREDIT_TYPES_TREATMENT must be one of:
        credit-types-treatment-unspecified, exclude-all-credits,
        include-all-credits, include-specified-credits.

     --disable-default-iam-recipients
        When set to true, disables default notifications sent when a threshold
        is exceeded. Default notifications are sent to those with Billing
        Account Administrator and Billing Account User IAM roles for the target
        account.

     --display-name=DISPLAY_NAME
        User data for display name in UI. Must be less than or equal to 60
        characters.

     --filter-credit-types=[FILTER_CREDIT_TYPES,...]
        Set of credit types, specifying that usage from only this set of
        credits should be included in the budget. If a nonempty list is
        specified, then --credit-types-treatment must be
        include-specified-credits.

     --filter-labels=[KEY=VALUE,...]
        Single label and value pair specifying that usage from only this set of
        labeled resources should be included in the budget. Currently, multiple
        entries or multiple values per entry are not allowed. If omitted, the
        report will include all labeled and unlabeled usage.

     --filter-projects=[FILTER_PROJECTS,...]
        Set of projects in the form projects/{project_id}, specifying that
        usage from only this set of projects should be included in the budget.
        If omitted, all projects will be included.

     --filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]
        A set of folder and organization names of the form folders/{folderId}
        or organizations/{organizationId}, specifying that usage from only this
        set of folders and organizations should be included in the budget. If
        omitted, the budget includes all usage that the billing account pays
        for. If the folder or organization contains projects that are paid for
        by a different Cloud Billing account, the budget doesn't apply to those
        projects.

     --filter-services=[FILTER_SERVICES,...]
        Set of services of the form services/{service_id}, specifying that
        usage from only this set of services should be included in the budget.
        If omitted, the report will include usage for all services. The service
        names are available through the Catalog API:
        https://cloud.google.com/billing/v1/how-tos/catalog-api.

     --filter-subaccounts=[FILTER_SUBACCOUNTS,...]
        Set of subaccounts of the form billingAccounts/{account_id}, specifying
        that usage from only this set of subaccounts should be included in the
        budget. If a subaccount is set to the name of the parent account, usage
        from the parent account will be included. If omitted, the report will
        include usage from the parent account and all subaccounts, if they
        exist.

     --notifications-rule-monitoring-notification-channels=[NOTIFICATIONS_RULE_MONITORING_NOTIFICATION_CHANNELS,...]
        Targets to send notifications to when a threshold is exceeded. This is
        in addition to default recipients who have billing account roles. The
        value is the full REST resource name of a monitoring notification
        channel in the form
        projects/{project_id}/notificationChannels/{channel_id}. A maximum of 5
        channels is allowed. See
        https://cloud.google.com/billing/docs/how-to/budgets-notification-recipients
        for more details.

     --notifications-rule-pubsub-topic=NOTIFICATIONS_RULE_PUBSUB_TOPIC
        Name of the Cloud Pub/Sub topic where budget related messages will be
        published, in the form projects/{project_id}/topics/{topic_id}.

     --ownership-scope=OWNERSHIP_SCOPE
        Sets the ownership scope of the budget. The ownership scope and users'
        IAM permissions determine who has full access to the budget's data.

        Must be one of: 'ALL_USERS' or 'BILLING_ACCOUNT'. Use 'ALL_USERS' to
        allow billing account- level users and project-level users to have full
        access to the budget (if the users have the required IAM permissions).
        Use 'BILLING_ACCOUNT' to allow only billing account-level users to have
        full access to the budget. Project-level users will have read-only
        access, even if they have the required IAM permissions.

        OWNERSHIP_SCOPE must be one of: all-users, billing-account,
        ownership-scope-unspecified.

     At most one of these can be specified:

       --budget-amount=BUDGET_AMOUNT
          Specify the amount of the budget. If a currency type is included, it
          must be the existing currency associated with the budget.

       --last-period-amount
          Use the amount of last period's budget.

     Specify either the calendar-period or custom-period, not both.

     At most one of these can be specified:

       Calendar Period

       --calendar-period=CALENDAR_PERIOD
          Specified to track usage over recurring calendar period. If you're
          creating a budget with a custom time period, omit this flag.
          CALENDAR_PERIOD must be one of: calendar-period-unspecified, month,
          quarter, year.

       Custom Period

       --start-date=START_DATE
          Specified to track usage after any start date. This time period is
          static, it does not recur.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --end-date=END_DATE
          Specified to track usage before any end date. This time period is
          static, it does not recur. If specified, --start-date must also be
          specified.

     At most one of these can be specified:

       --threshold-rules-from-file=PATH_TO_FILE
          Import a file with the updated threshold rules. The threshold rules
          in the file will replace the rules in the budget. This can be used to
          add or remove specific threshold rules. Use a full or relative path
          to a local file containing the value of threshold_rules.

       --add-threshold-rule=[basis=BASIS],[percent=PERCENT]
          Rule that triggers alerts (notifications of thresholds being crossed)
          when spend exceeds the specified percentages of the budget. This flag
          can be repeated to provide multiple thresholds above which an alert
          is sent.

           percent
              Integer between 0 and 100 above which an alert is sent.

           basis
              Type of basis used to determine if spend has passed the
              threshold. Must be one of: 'current-spend' or 'forecasted-spend'.
              Behavior defaults to 'current-spend' if not set.

       --clear-threshold-rules
          Removes all threshold rules from the budget.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the billingbudgets/v1 API. The full documentation for
    this API can be found at:
    https://cloud.google.com/billing/docs/how-to/budget-api-overview

NOTES
    These variants are also available:

        $ gcloud alpha billing budgets update

        $ gcloud beta billing budgets update
```

### gcloud beta billing budgets create

```text
NAME
    gcloud beta billing budgets create - create a budget

SYNOPSIS
    gcloud beta billing budgets create --billing-account=BILLING_ACCOUNT
        --display-name=DISPLAY_NAME
        (--budget-amount=BUDGET_AMOUNT | --last-period-amount)
        [--all-updates-rule-monitoring-notification-channels=[ALL_UPDATES_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]] [--all-updates-rule-pubsub-topic=ALL_UPDATES_RULE_PUBSUB_TOPIC]
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--threshold-rule=[basis=BASIS],[percent=PERCENT]]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing budgets delete

```text
NAME
    gcloud beta billing budgets delete - delete a budget

SYNOPSIS
    gcloud beta billing budgets delete
        (BUDGET : --billing-account=BILLING_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing budgets describe

```text
NAME
    gcloud beta billing budgets describe - describe a budget

SYNOPSIS
    gcloud beta billing budgets describe
        (BUDGET : --billing-account=BILLING_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing budgets list

```text
NAME
    gcloud beta billing budgets list - list budgets

SYNOPSIS
    gcloud beta billing budgets list --billing-account=BILLING_ACCOUNT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta billing budgets update

```text
NAME
    gcloud beta billing budgets update - update a budget

SYNOPSIS
    gcloud beta billing budgets update
        (BUDGET : --billing-account=BILLING_ACCOUNT)
        [--all-updates-rule-monitoring-notification-channels=[ALL_UPDATES_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]] [--all-updates-rule-pubsub-topic=ALL_UPDATES_RULE_PUBSUB_TOPIC]
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients] [--display-name=DISPLAY_NAME]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--budget-amount=BUDGET_AMOUNT | --last-period-amount]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [--threshold-rules-from-file=PATH_TO_FILE
          | --add-threshold-rule=[basis=BASIS],[percent=PERCENT]
          --clear-threshold-rules] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing budgets create

```text
NAME
    gcloud alpha billing budgets create - create a budget

SYNOPSIS
    gcloud alpha billing budgets create --billing-account=BILLING_ACCOUNT
        --display-name=DISPLAY_NAME
        (--budget-amount=BUDGET_AMOUNT | --last-period-amount)
        [--all-updates-rule-monitoring-notification-channels=[ALL_UPDATES_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]] [--all-updates-rule-pubsub-topic=ALL_UPDATES_RULE_PUBSUB_TOPIC]
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--threshold-rule=[basis=BASIS],[percent=PERCENT]]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing budgets delete

```text
NAME
    gcloud alpha billing budgets delete - delete a budget

SYNOPSIS
    gcloud alpha billing budgets delete
        (BUDGET : --billing-account=BILLING_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing budgets describe

```text
NAME
    gcloud alpha billing budgets describe - describe a budget

SYNOPSIS
    gcloud alpha billing budgets describe
        (BUDGET : --billing-account=BILLING_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing budgets list

```text
NAME
    gcloud alpha billing budgets list - list budgets

SYNOPSIS
    gcloud alpha billing budgets list --billing-account=BILLING_ACCOUNT
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha billing budgets update

```text
NAME
    gcloud alpha billing budgets update - update a budget

SYNOPSIS
    gcloud alpha billing budgets update
        (BUDGET : --billing-account=BILLING_ACCOUNT)
        [--all-updates-rule-monitoring-notification-channels=[ALL_UPDATES_RULE_MONITORING_NOTIFICATION_CHANNELS,
          ...]] [--all-updates-rule-pubsub-topic=ALL_UPDATES_RULE_PUBSUB_TOPIC]
        [--credit-types-treatment=CREDIT_TYPES_TREATMENT]
        [--disable-default-iam-recipients] [--display-name=DISPLAY_NAME]
        [--filter-credit-types=[FILTER_CREDIT_TYPES,...]]
        [--filter-labels=[KEY=VALUE,...]]
        [--filter-projects=[FILTER_PROJECTS,...]]
        [--filter-resource-ancestors=[FILTER_RESOURCE_ANCESTORS,...]]
        [--filter-services=[FILTER_SERVICES,...]]
        [--filter-subaccounts=[FILTER_SUBACCOUNTS,...]]
        [--ownership-scope=OWNERSHIP_SCOPE]
        [--budget-amount=BUDGET_AMOUNT | --last-period-amount]
        [--calendar-period=CALENDAR_PERIOD
          | [--start-date=START_DATE : --end-date=END_DATE]]
        [--threshold-rules-from-file=PATH_TO_FILE
          | --add-threshold-rule=[basis=BASIS],[percent=PERCENT]
          --clear-threshold-rules] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/billing/budgets (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
