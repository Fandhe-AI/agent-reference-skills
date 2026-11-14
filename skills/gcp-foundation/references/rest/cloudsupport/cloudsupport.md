---
source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2
---

# Google Cloud Support API REST API (cloudsupport)

## Signature / Usage

Base URL: `https://cloudsupport.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudsupport.caseClassifications.search`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/caseClassifications:search`
- Retrieve valid classifications to use when creating a support case. Classifications are hierarchical. Each classification is a string containing all levels of the hierarchy separated by `" > "`. For example, `"Technical Issue > Compute > Compute Engine"`. Classification IDs returned by this endpoint are valid for at least six months. When a classification is deactivated, this endpoint immediately…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchCaseClassificationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | The maximum number of classifications fetched with each request. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |
| `query` | query | string | no | An expression used to filter case classifications. If it's an empty string, then no filtering happens. Otherwise, case classifications will be returned that match the filter. |

### `cloudsupport.cases.attachments.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Retrieve an attachment associated with a support case. EXAMPLES: cURL: ```shell attachment="projects/some-project/cases/23598314/attachments/0684M00000P3h1fQAB" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$attachment" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Attachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attachment to get. |

### `cloudsupport.cases.attachments.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/attachments`
- List all the attachments associated with a support case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/23598314" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/attachments" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case for which attachments should be listed. |
| `pageSize` | query | integer (int32) | no | The maximum number of attachments fetched with each request. If not provided, the default is 10. The maximum page size that will be returned is 100. The size of each page can be smaller than the requested page size and can include zero. For example, you could request 100 attachments on one page, re… |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |

### `cloudsupport.cases.close`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:close`
- Close a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case:close" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_ver…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloseCaseRequest`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the case to close. |

### `cloudsupport.cases.comments.create`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/comments`
- Add a new comment to a case. The comment must have the following fields set: `body`. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43591344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "body": "This is a test comment." }' \ "https://cloudsupport.googleapis.com/v2/$case/comments" ```…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Comment`; Response: `Comment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case to which the comment should be added. |

### `cloudsupport.cases.comments.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Retrieve a comment. EXAMPLES: cURL: ```shell comment="projects/some-project/cases/43595344/comments/234567890" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$comment" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Comment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the comment to retrieve. |

### `cloudsupport.cases.comments.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/comments`
- List all the comments associated with a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/comments" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCommentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case for which to list comments. |
| `pageSize` | query | integer (int32) | no | The maximum number of comments to fetch. Defaults to 10. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is returned. |

### `cloudsupport.cases.create`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/cases`
- Create a new case and associate it with a parent. It must have the following fields set: `display_name`, `description`, `classification`, and `priority`. If you're just testing the API and don't want to route your case to an agent, set `testCase=true`. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)"…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Case`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent under which the case should be created. |

### `cloudsupport.cases.escalate`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:escalate`
- Escalate a case, starting the Google Cloud Support escalation management process. This operation is only available for some support services. Go to https://cloud.google.com/support and look for 'Technical support escalations' in the feature list to find out which ones let you do that. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorizat…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EscalateCaseRequest`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the case to be escalated. |

### `cloudsupport.cases.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Retrieve a case. EXAMPLES: cURL: ```shell case="projects/some-project/cases/16033687" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServi…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of a case to be retrieved. |

### `cloudsupport.cases.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/cases`
- Retrieve all cases under a parent, but not its children. For example, listing cases under an organization only returns the cases that are directly parented by that organization. To retrieve cases under an organization and its projects, use `cases.search`. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cl…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of a parent to list cases under. |
| `filter` | query | string | no | An expression used to filter cases. If it's an empty string, then no filtering happens. Otherwise, the endpoint returns the cases that match the filter. Expressions use the following fields separated by `AND` and specified with `=`: - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `… |
| `pageSize` | query | integer (int32) | no | The maximum number of cases fetched with each request. Defaults to 10. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |

### `cloudsupport.cases.patch`

- Versions: v2, v2beta
- `PATCH https://cloudsupport.googleapis.com/v2/{+name}`
- Update a case. Only some fields can be updated. EXAMPLES: cURL: ```shell case="projects/some-project/cases/43595344" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "priority": "P1" }' \ "https://cloudsupport.googleapis.com/v2/$case?updateMask=priority" ``` Python: ```python import googleapiclient.…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Case`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the case. |
| `updateMask` | query | string (google-fieldmask) | no | A list of attributes of the case that should be updated. Supported values are `priority`, `display_name`, and `subscriber_email_addresses`. If no fields are specified, all supported fields are updated. Be careful - if you do not provide a field mask, then you might accidentally clear some fields. F… |

### `cloudsupport.cases.search`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/cases:search`
- Search for cases using a query. EXAMPLES: cURL: ```shell parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases:search" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_versio…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource to search for cases under. |
| `pageSize` | query | integer (int32) | no | The maximum number of cases fetched with each request. The default page size is 10. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |
| `query` | query | string | no | An expression used to filter cases. Expressions use the following fields separated by `AND` and specified with `=`: - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `P1`, `P2`, `P3`, or `P4`. You can specify multiple values for priority using the `OR` operator. For example, `priorit… |

### `cloudsupport.cases.showFeed`

- Versions: v2beta
- `GET https://cloudsupport.googleapis.com/v2beta/{+parent}:showFeed`
- Show items in the feed of this case, including case emails, attachments, and comments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ShowFeedResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the case for which feed items should be listed. |
| `orderBy` | query | string | no | Optional. Field to order feed items by, followed by `asc` or `desc` postfix. The only valid field is `creation_time`. This list is case-insensitive, default sorting order is ascending, and the redundant space characters are insignificant. Example: `creation_time desc` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of feed items fetched with each request. |
| `pageToken` | query | string | no | Optional. A token identifying the page of results to return. If unspecified, it retrieves the first page. |

### `cloudsupport.media.download`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}:download`
- Download a file attached to a case. When this endpoint is called, no "response body" will be returned. Instead, the attachment's blob will be returned. Note: HTTP requests must append "?alt=media" to the URL. EXAMPLES: cURL: ```shell name="projects/some-project/cases/43594844/attachments/0674M00000WijAnZAJ" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloud…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Media`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the file attachment to download. |

### `cloudsupport.media.upload`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/attachments`
- Create a file attachment on a case or Cloud resource. The attachment must have the following fields set: `filename`. EXAMPLES: cURL: ```shell echo "This text is in a file I'm uploading using CSAPI." \ > "./example_file.txt" case="projects/some-project/cases/43594844" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --data-binary @"./example_file.txt" \ "https://cloudsup…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateAttachmentRequest`; Response: `Attachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case or Cloud resource to which the attachment should be attached. |

### `cloudsupport.organizations.supportEventSubscriptions.create`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/supportEventSubscriptions`
- Creates a support event subscription for an organization. EXAMPLES: cURL: ```shell parent="organizations/123456789" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "pub_sub_topic": "projects/my-project/topics/my-topic" }' \ "https://cloudsupport.googleapis.com/v2/$parent/supportEventSubscriptions" `…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SupportEventSubscription`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the support event subscription will be created. Format: organizations/{organization_id} |

### `cloudsupport.organizations.supportEventSubscriptions.delete`

- Versions: v2, v2beta
- `DELETE https://cloudsupport.googleapis.com/v2/{+name}`
- Soft deletes a support event subscription. EXAMPLES: cURL: ```shell support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request DELETE \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription" ``` Python: ```python import googleapiclient.discovery api_version = "v2" s…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to delete. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.expunge`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:expunge`
- Expunges a support event subscription. EXAMPLES: cURL: ```shell support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription:expunge" ``` Python: ```python import googleapiclient.discovery api_version = "v2"…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExpungeSupportEventSubscriptionRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to expunge. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Gets a support event subscription. EXAMPLES: cURL: ```shell support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleap…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to retrieve. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/supportEventSubscriptions`
- Lists support event subscriptions. EXAMPLES: cURL: ```shell parent="organizations/123456789" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/supportEventSubscriptions" ``` Python: ```python import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", …
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSupportEventSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The fully qualified name of the Cloud resource to list support event subscriptions under. Format: organizations/{organization_id} |
| `filter` | query | string | no | Optional. Filter expression based on AIP-160. Supported fields: - pub_sub_topic - state Examples: - `pub_sub_topic="projects/example-project/topics/example-topic"` - `state=WORKING` - `pub_sub_topic="projects/example-project/topics/example-topic" AND state=WORKING` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of support event subscriptions to return. |
| `pageToken` | query | string | no | Optional. A token identifying the page of results to return. If unspecified, the first page is retrieved. When paginating, all other parameters provided to `ListSupportEventSubscriptions` must match the call that provided the page token. |
| `showDeleted` | query | boolean | no | Optional. Whether to show deleted subscriptions. By default, deleted subscriptions are not returned. |

### `cloudsupport.organizations.supportEventSubscriptions.patch`

- Versions: v2, v2beta
- `PATCH https://cloudsupport.googleapis.com/v2/{+name}`
- Updates a support event subscription. EXAMPLES: cURL: ```shell support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "pub_sub_topic": "projects/my-project/topics/new-topic" }' \ "https://cloudsupport.googleapis.co…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SupportEventSubscription`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the support event subscription. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. The only supported value is pub_sub_topic. |

### `cloudsupport.organizations.supportEventSubscriptions.undelete`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:undelete`
- Undeletes a support event subscription. EXAMPLES: cURL: ```shell support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription:undelete" ``` Python: ```python import googleapiclient.discovery api_version = "v…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteSupportEventSubscriptionRequest`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to undelete. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

## Notes

- Generated from the Discovery document(s) v2, v2beta of `cloudsupport` (retrieved 2026-11-14). Resources on this page: caseClassifications, cases, media, organizations.
- Message schemas are listed under `references/rest-schemas/cloudsupport/`.
- Source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
