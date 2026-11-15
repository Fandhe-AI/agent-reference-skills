---
source: https://billingbudgets.googleapis.com/$discovery/rest?version=v1
---

# Cloud Billing Budget API message schemas (billingbudgets)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/billingbudgets/`.

### `GoogleCloudBillingBudgetsV1Budget`

- A budget is a plan that describes what you expect to spend on Cloud projects, plus the rules to execute as spend is tracked against that plan, (for example, send an alert when 90% of the target spend is met, or pause usage of the specified service when a spend cap budget is enforced). For alerts-only budgets, the budget time period is configurable, with options such as month (default), quarter, year, or custom time period. For spend cap budgets, the budget time period is limited to month.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `amount` | GoogleCloudBillingBudgetsV1BudgetAmount | Required. Budgeted amount. When `spend_cap` is set, `specified_amount` must be set to a non-negative amount (>= 0); `last_period_amount` is not supported. |
| `budgetFilter` | GoogleCloudBillingBudgetsV1Filter | Optional. Filters that define which resources are used to compute the actual spend against the budget amount, such as projects, services, and the budget's time period, as well as other filters. Must be set when `spend_cap` is set. See `Filter` fields for spend cap restrictions. |
| `displayName` | string | User data for display name in UI. The name must be less than or equal to 60 characters. |
| `etag` | string | Optional. Etag to validate that the object is unchanged for a read-modify-write operation. An empty etag causes an update to overwrite other changes. |
| `name` | string | Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. |
| `notificationsRule` | GoogleCloudBillingBudgetsV1NotificationsRule | Optional. Rules to apply to notifications sent based on budget spend and thresholds. Must be set when `spend_cap` is set. For spend caps, `enable_project_level_recipients` must be set to `true`, `disable_default_iam_recipients` must be `false` (or unset), and `pubsub_topic` and `monitoring_notification_channels` must be empty. |
| `ownershipScope` | string enum | Optional. When `spend_cap` is set, must be `OWNERSHIP_SCOPE_UNSPECIFIED` or `ALL_USERS`. `BILLING_ACCOUNT` is not supported for spend caps. |
| `spendCap` | GoogleCloudBillingBudgetsV1SpendCap | Optional. The spend cap configured for this budget. When `spend_cap` is set, strict field restrictions apply to the budget (see field-level comments on `ownership_scope`, `budget_filter`, `amount`, `threshold_rules`, and `notifications_rule`). When `spend_cap.output_state` is `ENFORCED`, only `spend_cap.input_state` can be modified in an `UpdateBudget` request (e.g., setting `input_state` to `AWAITING_NEXT_PERIOD` to lift the cap); modifying any other budget field while enforced will fail with `FAILED_PRECONDITION`. If the existing resource is a spend cap and an `update_mask` is supplied in an `UpdateBudget` request, `spend_cap` or `spend_cap.input_state` must be specified in the update mask. To convert a spend cap budget to a regular budget, specify `spend_cap` in the `update_mask` and omit `spend_cap` from the budget in the request. |
| `thresholdRules` | array<GoogleCloudBillingBudgetsV1ThresholdRule> | Optional. Rules that trigger alerts (notifications of thresholds being crossed) when spend exceeds the specified percentages of the budget. Optional for `pubsubTopic` notifications. Required if using email notifications. Must be set when `spend_cap` is set. Spend caps must have exactly three `CURRENT_SPEND` threshold rules with `threshold_percent` values of `0.5`, `0.8`, and `1.0` (50%, 80%, and 100%). `FORECASTED_SPEND` threshold rules are not supported for spend caps. |

### `GoogleCloudBillingBudgetsV1BudgetAmount`

- The budgeted amount for each usage period.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastPeriodAmount` | GoogleCloudBillingBudgetsV1LastPeriodAmount | Use the last period's actual spend as the budget for the present period. LastPeriodAmount can only be set when the budget's time period is a Filter.calendar_period. It cannot be set in combination with Filter.custom_period. Not supported when `spend_cap` is set. |
| `specifiedAmount` | GoogleTypeMoney | A specified amount to use as the budget. `currency_code` is optional. If specified when creating a budget, it must match the currency of the billing account. If specified when updating a budget, it must match the currency_code of the existing budget. The `currency_code` is provided on output. Must be set when `spend_cap` is set; must be non-negative (>= 0). |

### `GoogleCloudBillingBudgetsV1CustomPeriod`

- All date times begin at 12 AM US and Canadian Pacific Time (UTC-8).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | GoogleTypeDate | Optional. The end date of the time period. Budgets with elapsed end date won't be processed. If unset, specifies to track all usage incurred since the start_date. |
| `startDate` | GoogleTypeDate | Required. The start date must be after January 1, 2017. |

### `GoogleCloudBillingBudgetsV1Filter`

- A filter for a budget, limiting the scope of the cost to calculate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `calendarPeriod` | string enum | Optional. Specifies to track usage for recurring calendar period. For example, assume that CalendarPeriod.QUARTER is set. The budget tracks usage from April 1 to June 30, when the current calendar month is April, May, June. After that, it tracks usage from July 1 to September 30 when the current calendar month is July, August, September, so on. When `spend_cap` is set, must be `MONTH` (or `usage_period` left unset, which defaults to `MONTH`). `QUARTER` and `YEAR` are not supported for spend caps. |
| `creditTypes` | array<string> | Optional. If Filter.credit_types_treatment is INCLUDE_SPECIFIED_CREDITS, this is a list of credit types to be subtracted from gross cost to determine the spend for threshold calculations. See a list of acceptable credit type values (https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage#credits-type). If Filter.credit_types_treatment is \*\*not\*\* INCLUDE_SPECIFIED_CREDITS, this field must be empty. Not supported when `spend_cap` is set; must be empty. |
| `creditTypesTreatment` | string enum | Optional. If not set, default behavior is `INCLUDE_ALL_CREDITS`. Must be set to `EXCLUDE_ALL_CREDITS` when `spend_cap` is set. |
| `customPeriod` | GoogleCloudBillingBudgetsV1CustomPeriod | Optional. Specifies to track usage from any start date (required) to any end date (optional). This time period is static, it does not recur. Not supported when `spend_cap` is set. |
| `labels` | object | Optional. A single label and value pair specifying that usage from only this set of labeled resources should be included in the budget. If omitted, the report includes all labeled and unlabeled usage. An object containing a single `"key": value` pair. Example: `{ "name": "wrench" }`. \_Currently, multiple entries or multiple values per entry are not allowed.\_ Not supported when `spend_cap` is set; must be empty. |
| `projects` | array<string> | Optional. A set of projects of the form `projects/{project}`, specifying that usage from only this set of projects should be included in the budget. If omitted, the report includes all usage for the billing account, regardless of which project the usage occurred on. Must be set when `spend_cap` is set; must contain exactly one project. |
| `resourceAncestors` | array<string> | Optional. A set of folder and organization names of the form `folders/{folderId}` or `organizations/{organizationId}`, specifying that usage from only this set of folders and organizations should be included in the budget. If omitted, the budget includes all usage that the billing account pays for. If the folder or organization contains projects that are paid for by a different Cloud Billing account, the budget \*doesn't\* apply to those projects. Not supported when `spend_cap` is set; must be empty. |
| `services` | array<string> | Optional. A set of services of the form `services/{service_id}`, specifying that usage from only this set of services should be included in the budget. If omitted, the report includes usage for all the services. The service names are available through the Catalog API: https://docs.cloud.google.com/billing/v1/how-tos/catalog-api. When `spend_cap` is set, the services filter must be set and must contain exactly one service from this list of eligible services: https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps#eligible-services. |
| `subaccounts` | array<string> | Optional. A set of subaccounts of the form `billingAccounts/{account_id}`, specifying that usage from only this set of subaccounts should be included in the budget. If a subaccount is set to the name of the parent account, usage from the parent account is included. If the field is omitted, the report includes usage from the parent account and all subaccounts, if they exist. Not supported when `spend_cap` is set; must be empty. |

### `GoogleCloudBillingBudgetsV1LastPeriodAmount`

- Describes a budget amount targeted to the last Filter.calendar_period spend. At this time, the amount is automatically 100% of the last calendar period's spend; that is, there are no other options yet. LastPeriodAmount cannot be set for a budget configured with a Filter.custom_period.
- Version: v1

### `GoogleCloudBillingBudgetsV1ListBudgetsResponse`

- Response for ListBudgets
- Version: v1

| Field | Type | Description |
|---|---|---|
| `budgets` | array<GoogleCloudBillingBudgetsV1Budget> | List of the budgets owned by the requested billing account. |
| `nextPageToken` | string | If not empty, indicates that there may be more budgets that match the request; this value should be passed in a new `ListBudgetsRequest`. |

### `GoogleCloudBillingBudgetsV1NotificationsRule`

- NotificationsRule defines notifications that are sent based on budget spend and thresholds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableDefaultIamRecipients` | boolean | Optional. When set to true, disables default notifications sent when a threshold is exceeded. Default notifications are sent to those with Billing Account Administrator and Billing Account User IAM roles for the target account. Must be `false` (or unset) when `spend_cap` is set; default notifications cannot be disabled for spend caps. |
| `enableProjectLevelRecipients` | boolean | Optional. When set to true, and when the budget has a single project configured, notifications will be sent to project level recipients of that project. This field will be ignored if the budget has multiple or no project configured. Currently, project level recipients are the users with `Owner` role on a cloud project. Must be set to `true` when `spend_cap` is set. |
| `monitoringNotificationChannels` | array<string> | Optional. Email targets to send notifications to when a threshold is exceeded. This is in addition to the `DefaultIamRecipients` who receive alert emails based on their billing account IAM role. The value is the full REST resource name of a Cloud Monitoring email notification channel with the form `projects/{project_id}/notificationChannels/{channel_id}`. A maximum of 5 email notifications are allowed. To customize budget alert email recipients with monitoring notification channels, you \_must create the monitoring notification channels before you link them to a budget\_. For guidance on setting up notification channels to use with budgets, see Customize budget alert email recipients (https://docs.cloud.google.com/billing/docs/how-to/budgets-notification-recipients). For Cloud Billing budget alerts, you \_must use email notification channels\_. The other types of notification channels are \_not\_ supported, such as Slack, SMS, or PagerDuty. If you want to send budget notifications to Slack (https://docs.cloud.google.com/billing/docs/how-to/send-notifications-to-slack), use a pubsubTopic and configure programmatic notifications (https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications). Not supported when `spend_cap` is set; must be empty. |
| `pubsubTopic` | string | Optional. The name of the Pub/Sub topic where budget-related messages are published, in the form `projects/{project_id}/topics/{topic_id}`. Updates are sent to the topic at regular intervals; the timing of the updates is not dependent on the threshold rules you've set. Note that if you want your Pub/Sub JSON object (https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification-format) to contain data for `alertThresholdExceeded`, you need at least one alert threshold rule. When you set threshold rules, you must also enable at least one of the email notification options, either using the default IAM recipients or Cloud Monitoring email notification channels. To use Pub/Sub topics with budgets, you must do the following: 1. Create the Pub/Sub topic before connecting it to your budget. For guidance, see Manage programmatic budget alert notifications (https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications). 2. Grant the API caller the `pubsub.topics.setIamPolicy` permission on the Pub/Sub topic. If not set, the API call fails with PERMISSION_DENIED. For additional details on Pub/Sub roles and permissions, see Permissions required for this task (https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#permissions). Not supported when `spend_cap` is set; must be empty. |
| `schemaVersion` | string | Optional. Required when NotificationsRule.pubsub_topic is set. The schema version of the notification sent to NotificationsRule.pubsub_topic. Only "1.0" is accepted. It represents the JSON schema as defined in https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification-format. |

### `GoogleCloudBillingBudgetsV1SpendCap`

- SpendCap defines the spend cap configuration and state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inputState` | string enum | Required. The desired state specified by the user. Valid values for mutation: - `CONFIGURED`: Must be set when creating a spend cap (`CreateBudget`). Also valid when updating (`UpdateBudget`) to activate the spend cap. If the spend cap is in state `AWAITING_NEXT_PERIOD`, `input_state` must be set to `CONFIGURED`. - `AWAITING_NEXT_PERIOD`: Valid only when updating (`UpdateBudget`) to explicitly lift an enforced cap. Not allowed if the spend cap is in state `AWAITING_NEXT_PERIOD`. Supplying any other value will result in an INVALID_ARGUMENT error. |
| `outputState` | string enum | Output only. The actual resting state of the spend cap. |
| `reconciling` | boolean | Output only. Indicates whether the server is actively processing a state transition or async workflow. |

### `GoogleCloudBillingBudgetsV1ThresholdRule`

- ThresholdRule contains the definition of a threshold. Threshold rules define the triggering events used to generate a budget notification email. When a threshold is crossed (spend exceeds the specified percentages of the budget), budget alert emails are sent to the email recipients you specify in the NotificationsRule. Threshold rules also affect the fields included in the JSON data object (https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification-format) sent to a Pub/Sub topic. Threshold rules are \_required\_ if using email notifications. Threshold rules are \_optional\_ if only setting a \[`pubsubTopic` NotificationsRule\](#NotificationsRule), unless you want your JSON data object to include data about the thresholds you set. For more information, see set budget threshold rules and actions (https://docs.cloud.google.com/billing/docs/how-to/budgets#budget-actions).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `spendBasis` | string enum | Optional. The type of basis used to determine if spend has passed the threshold. Behavior defaults to CURRENT_SPEND if not set. When `spend_cap` is set on the budget, must be `CURRENT_SPEND` or `BASIS_UNSPECIFIED`. `FORECASTED_SPEND` is not supported. |
| `thresholdPercent` | number (double) | Required. Send an alert when this threshold is exceeded. This is a 1.0-based percentage, so 0.5 = 50%. Validation: non-negative number. When `spend_cap` is set on the budget, `threshold_rules` must contain exactly three rules with `threshold_percent` values of `0.5`, `0.8`, and `1.0` (50%, 80%, and 100%). |

### `GoogleCloudBillingBudgetsV1beta1AllUpdatesRule`

- AllUpdatesRule defines notifications that are sent based on budget spend and thresholds.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `disableDefaultIamRecipients` | boolean | Optional. When set to true, disables default notifications sent when a threshold is exceeded. Default notifications are sent to those with Billing Account Administrator and Billing Account User IAM roles for the target account. |
| `enableProjectLevelRecipients` | boolean | Optional. When set to true, and when the budget has a single project configured, notifications will be sent to project level recipients of that project. This field will be ignored if the budget has multiple or no project configured. Currently, project level recipients are the users with `Owner` role on a cloud project. |
| `monitoringNotificationChannels` | array<string> | Optional. Targets to send notifications to when a threshold is exceeded. This is in addition to default recipients who have billing account IAM roles. The value is the full REST resource name of a monitoring notification channel with the form `projects/{project_id}/notificationChannels/{channel_id}`. A maximum of 5 channels are allowed. See https://cloud.google.com/billing/docs/how-to/budgets-notification-recipients for more details. |
| `pubsubTopic` | string | Optional. The name of the Pub/Sub topic where budget related messages will be published, in the form `projects/{project_id}/topics/{topic_id}`. Updates are sent at regular intervals to the topic. The topic needs to be created before the budget is created; see https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications for more details. Caller is expected to have `pubsub.topics.setIamPolicy` permission on the topic when it's set for a budget, otherwise, the API call will fail with PERMISSION_DENIED. See https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#permissions_required_for_this_task for more details on Pub/Sub roles and permissions. |
| `schemaVersion` | string | Optional. Required when AllUpdatesRule.pubsub_topic is set. The schema version of the notification sent to AllUpdatesRule.pubsub_topic. Only "1.0" is accepted. It represents the JSON schema as defined in https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format. |

### `GoogleCloudBillingBudgetsV1beta1Budget`

- A budget is a plan that describes what you expect to spend on Cloud projects, plus the rules to execute as spend is tracked against that plan, (for example, send an alert when 90% of the target spend is met). The budget time period is configurable, with options such as month (default), quarter, year, or custom time period.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `allUpdatesRule` | GoogleCloudBillingBudgetsV1beta1AllUpdatesRule | Optional. Rules to apply to notifications sent based on budget spend and thresholds. |
| `amount` | GoogleCloudBillingBudgetsV1beta1BudgetAmount | Required. Budgeted amount. |
| `budgetFilter` | GoogleCloudBillingBudgetsV1beta1Filter | Optional. Filters that define which resources are used to compute the actual spend against the budget amount, such as projects, services, and the budget's time period, as well as other filters. |
| `displayName` | string | User data for display name in UI. Validation: <= 60 chars. |
| `etag` | string | Optional. Etag to validate that the object is unchanged for a read-modify-write operation. An empty etag will cause an update to overwrite other changes. |
| `name` | string | Output only. Resource name of the budget. The resource name implies the scope of a budget. Values are of the form `billingAccounts/{billingAccountId}/budgets/{budgetId}`. |
| `ownershipScope` | string enum | — |
| `thresholdRules` | array<GoogleCloudBillingBudgetsV1beta1ThresholdRule> | Optional. Rules that trigger alerts (notifications of thresholds being crossed) when spend exceeds the specified percentages of the budget. Optional for `pubsubTopic` notifications. Required if using email notifications. |

### `GoogleCloudBillingBudgetsV1beta1BudgetAmount`

- The budgeted amount for each usage period.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `lastPeriodAmount` | GoogleCloudBillingBudgetsV1beta1LastPeriodAmount | Use the last period's actual spend as the budget for the present period. LastPeriodAmount can only be set when the budget's time period is a Filter.calendar_period. It cannot be set in combination with Filter.custom_period. |
| `specifiedAmount` | GoogleTypeMoney | A specified amount to use as the budget. `currency_code` is optional. If specified when creating a budget, it must match the currency of the billing account. If specified when updating a budget, it must match the currency_code of the existing budget. The `currency_code` is provided on output. |

### `GoogleCloudBillingBudgetsV1beta1CreateBudgetRequest`

- Request for CreateBudget
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `budget` | GoogleCloudBillingBudgetsV1beta1Budget | Required. Budget to create. |

### `GoogleCloudBillingBudgetsV1beta1CustomPeriod`

- All date times begin at 12 AM US and Canadian Pacific Time (UTC-8).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `endDate` | GoogleTypeDate | Optional. The end date of the time period. Budgets with elapsed end date won't be processed. If unset, specifies to track all usage incurred since the start_date. |
| `startDate` | GoogleTypeDate | Required. The start date must be after January 1, 2017. |

### `GoogleCloudBillingBudgetsV1beta1Filter`

- A filter for a budget, limiting the scope of the cost to calculate.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `calendarPeriod` | string enum | Optional. Specifies to track usage for recurring calendar period. For example, assume that CalendarPeriod.QUARTER is set. The budget will track usage from April 1 to June 30, when the current calendar month is April, May, June. After that, it will track usage from July 1 to September 30 when the current calendar month is July, August, September, so on. |
| `creditTypes` | array<string> | Optional. If Filter.credit_types_treatment is INCLUDE_SPECIFIED_CREDITS, this is a list of credit types to be subtracted from gross cost to determine the spend for threshold calculations. See a list of acceptable credit type values (https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables#credits-type). If Filter.credit_types_treatment is \*\*not\*\* INCLUDE_SPECIFIED_CREDITS, this field must be empty. |
| `creditTypesTreatment` | string enum | Optional. If not set, default behavior is `INCLUDE_ALL_CREDITS`. |
| `customPeriod` | GoogleCloudBillingBudgetsV1beta1CustomPeriod | Optional. Specifies to track usage from any start date (required) to any end date (optional). This time period is static, it does not recur. |
| `labels` | object | Optional. A single label and value pair specifying that usage from only this set of labeled resources should be included in the budget. If omitted, the report will include all labeled and unlabeled usage. An object containing a single `"key": value` pair. Example: `{ "name": "wrench" }`. \_Currently, multiple entries or multiple values per entry are not allowed.\_ |
| `projects` | array<string> | Optional. A set of projects of the form `projects/{project}`, specifying that usage from only this set of projects should be included in the budget. If omitted, the report will include all usage for the billing account, regardless of which project the usage occurred on. |
| `resourceAncestors` | array<string> | Optional. A set of folder and organization names of the form `folders/{folderId}` or `organizations/{organizationId}`, specifying that usage from only this set of folders and organizations should be included in the budget. If omitted, the budget includes all usage that the billing account pays for. If the folder or organization contains projects that are paid for by a different Cloud Billing account, the budget \*doesn't\* apply to those projects. |
| `services` | array<string> | Optional. A set of services of the form `services/{service_id}`, specifying that usage from only this set of services should be included in the budget. If omitted, the report will include usage for all the services. The service names are available through the Catalog API: https://cloud.google.com/billing/v1/how-tos/catalog-api. |
| `subaccounts` | array<string> | Optional. A set of subaccounts of the form `billingAccounts/{account_id}`, specifying that usage from only this set of subaccounts should be included in the budget. If a subaccount is set to the name of the parent account, usage from the parent account will be included. If omitted, the report will include usage from the parent account and all subaccounts, if they exist. |

### `GoogleCloudBillingBudgetsV1beta1LastPeriodAmount`

- Describes a budget amount targeted to the last Filter.calendar_period spend. At this time, the amount is automatically 100% of the last calendar period's spend; that is, there are no other options yet. Future configuration options will be described here (for example, configuring a percentage of last period's spend). LastPeriodAmount cannot be set for a budget configured with a Filter.custom_period.
- Version: v1beta1

### `GoogleCloudBillingBudgetsV1beta1ListBudgetsResponse`

- Response for ListBudgets
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `budgets` | array<GoogleCloudBillingBudgetsV1beta1Budget> | List of the budgets owned by the requested billing account. |
| `nextPageToken` | string | If not empty, indicates that there may be more budgets that match the request; this value should be passed in a new `ListBudgetsRequest`. |

### `GoogleCloudBillingBudgetsV1beta1ThresholdRule`

- ThresholdRule contains the definition of a threshold. Threshold rules define the triggering events used to generate a budget notification email. When a threshold is crossed (spend exceeds the specified percentages of the budget), budget alert emails are sent to the email recipients you specify in the NotificationsRule. Threshold rules also affect the fields included in the JSON data object (https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications#notification_format) sent to a Pub/Sub topic. Threshold rules are \_required\_ if using email notifications. Threshold rules are \_optional\_ if only setting a \[`pubsubTopic` NotificationsRule\](#NotificationsRule), unless you want your JSON data object to include data about the thresholds you set. For more information, see set budget threshold rules and actions (https://cloud.google.com/billing/docs/how-to/budgets#budget-actions).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `spendBasis` | string enum | Optional. The type of basis used to determine if spend has passed the threshold. Behavior defaults to CURRENT_SPEND if not set. |
| `thresholdPercent` | number (double) | Required. Send an alert when this threshold is exceeded. This is a 1.0-based percentage, so 0.5 = 50%. Validation: non-negative number. |

### `GoogleCloudBillingBudgetsV1beta1UpdateBudgetRequest`

- Request for UpdateBudget
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `budget` | GoogleCloudBillingBudgetsV1beta1Budget | Required. The updated budget object. The budget to update is specified by the budget name in the budget. |
| `updateMask` | string (google-fieldmask) | Optional. Indicates which fields in the provided budget to update. Read-only fields (such as `name`) cannot be changed. If this is not provided, then only fields with non-default values from the request are updated. See https://developers.google.com/protocol-buffers/docs/proto3#default for more details about default values. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleTypeDate`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `GoogleTypeMoney`

- Represents an amount of money with its currency type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currencyCode` | string | The three-letter currency code defined in ISO 4217. |
| `nanos` | integer (int32) | Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. |
| `units` | string (int64) | The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. |

### Shape of `GoogleCloudBillingBudgetsV1Budget`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "amount": "GoogleCloudBillingBudgetsV1BudgetAmount",
  "budgetFilter": "GoogleCloudBillingBudgetsV1Filter",
  "displayName": "string",
  "etag": "string",
  "name": "string",
  "notificationsRule": "GoogleCloudBillingBudgetsV1NotificationsRule",
  "ownershipScope": "string enum",
  "spendCap": "GoogleCloudBillingBudgetsV1SpendCap",
  "thresholdRules": "array<GoogleCloudBillingBudgetsV1ThresholdRule>"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `billingbudgets` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://billingbudgets.googleapis.com/$discovery/rest?version=v1, https://billingbudgets.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
