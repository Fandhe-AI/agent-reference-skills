---
source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2
---

# Google Cloud Support API REST API (cloudsupport)

## Signature / Usage

Base URL: `https://cloudsupport.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudsupport.caseClassifications.search`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/caseClassifications:search`
- Retrieve valid classifications to use when creating a support case. Classifications are hierarchical. Each classification is a string containing all levels of the hierarchy separated by `" > "`. For example, `"Technical Issue > Compute > Compute Engine"`. Classification IDs returned by this endpoint are valid for at least six months. When a classification is deactivated, this endpoint immediately stops returning it. After six months, `case.create` requests using the classification will fail. EXAMPLES: cURL: curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ 'https://cloudsupport.googleapis.com/v2/caseClassifications:search?query=display_name:"\*Compute%20Engine\*"' Python: import googleapiclient.discovery supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version="v2", discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version=v2", ) request = supportApiService.caseClassifications().search( query='display_name:"\*Compute Engine\*"' ) print(request.execute())
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
- Retrieve an attachment associated with a support case. EXAMPLES: cURL: attachment="projects/some-project/cases/23598314/attachments/0684M00000P3h1fQAB" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$attachment" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .attachments() .get(name="projects/some-project/cases/43595344/attachments/0684M00000P3h1fQAB") ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Attachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the attachment to get. |

### `cloudsupport.cases.attachments.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/attachments`
- List all the attachments associated with a support case. EXAMPLES: cURL: case="projects/some-project/cases/23598314" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/attachments" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .attachments() .list(parent="projects/some-project/cases/43595344") ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case for which attachments should be listed. |
| `pageSize` | query | integer (int32) | no | The maximum number of attachments fetched with each request. If not provided, the default is 10. The maximum page size that will be returned is 100. The size of each page can be smaller than the requested page size and can include zero. For example, you could request 100 attachments on one page, receive 0, and then on the next page, receive 90. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |

### `cloudsupport.cases.close`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:close`
- Close a case. EXAMPLES: cURL: case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case:close" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().close( name="projects/some-project/cases/43595344" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloseCaseRequest`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the case to close. |

### `cloudsupport.cases.comments.create`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/comments`
- Add a new comment to a case. The comment must have the following fields set: `body`. EXAMPLES: cURL: case="projects/some-project/cases/43591344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "body": "This is a test comment." }' \ "https://cloudsupport.googleapis.com/v2/$case/comments" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .comments() .create( parent="projects/some-project/cases/43595344", body={"body": "This is a test comment."}, ) ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Comment`; Response: `Comment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case to which the comment should be added. |

### `cloudsupport.cases.comments.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Retrieve a comment. EXAMPLES: cURL: comment="projects/some-project/cases/43595344/comments/234567890" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$comment" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().comments().get( name="projects/some-project/cases/43595344/comments/234567890", ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Comment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the comment to retrieve. |

### `cloudsupport.cases.comments.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/comments`
- List all the comments associated with a case. EXAMPLES: cURL: case="projects/some-project/cases/43595344" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case/comments" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = ( supportApiService.cases() .comments() .list(parent="projects/some-project/cases/43595344") ) print(request.execute())
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
- Create a new case and associate it with a parent. It must have the following fields set: `display_name`, `description`, `classification`, and `priority`. If you're just testing the API and don't want to route your case to an agent, set `testCase=true`. EXAMPLES: cURL: parent="projects/some-project" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "display_name": "Test case created by me.", "description": "a random test case, feel free to close", "classification": { "id": "100IK2AKCLHMGRJ9CDGMOCGP8DM6UTB4BT262T31BT1M2T31DHNMENPO6KS36CPJ786L2TBFEHGN6NPI64R3CDHN8880G08I1H3MURR7DHII0GRCDTQM8" }, "time_zone": "-07:00", "subscriber_email_addresses": \[ "foo@domain.com", "bar@domain.com" \], "testCase": true, "priority": "P3" }' \ "https://cloudsupport.googleapis.com/v2/$parent/cases" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().create( parent="projects/some-project", body={ "displayName": "A Test Case", "description": "This is a test case.", "testCase": True, "priority": "P2", "classification": { "id": "100IK2AKCLHMGRJ9CDGMOCGP8DM6UTB4BT262T31BT1M2T31DHNMENPO6KS36CPJ786L2TBFEHGN6NPI64R3CDHN8880G08I1H3MURR7DHII0GRCDTQM8" }, }, ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Case`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent under which the case should be created. |

### `cloudsupport.cases.escalate`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:escalate`
- Escalate a case, starting the Google Cloud Support escalation management process. This operation is only available for some support services. Go to https://cloud.google.com/support and look for 'Technical support escalations' in the feature list to find out which ones let you do that. EXAMPLES: cURL: case="projects/some-project/cases/43595344" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "escalation": { "reason": "BUSINESS_IMPACT", "justification": "This is a test escalation." } }' \ "https://cloudsupport.googleapis.com/v2/$case:escalate" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().escalate( name="projects/some-project/cases/43595344", body={ "escalation": { "reason": "BUSINESS_IMPACT", "justification": "This is a test escalation.", }, }, ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EscalateCaseRequest`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the case to be escalated. |

### `cloudsupport.cases.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Retrieve a case. EXAMPLES: cURL: case="projects/some-project/cases/16033687" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$case" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().get( name="projects/some-project/cases/43595344", ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of a case to be retrieved. |

### `cloudsupport.cases.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/cases`
- Retrieve all cases under a parent, but not its children. For example, listing cases under an organization only returns the cases that are directly parented by that organization. To retrieve cases under an organization and its projects, use `cases.search`. EXAMPLES: cURL: parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().list(parent="projects/some-project") print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of a parent to list cases under. |
| `filter` | query | string | no | An expression used to filter cases. If it's an empty string, then no filtering happens. Otherwise, the endpoint returns the cases that match the filter. Expressions use the following fields separated by `AND` and specified with `=`: - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `P1`, `P2`, `P3`, or `P4`. You can specify multiple values for priority using the `OR` operator. For example, `priority=P1 OR priority=P2`. - `creator.email`: The email address of the case creator. EXAMPLES: - `state=CLOSED` - `state=OPEN AND creator.email="tester@example.com"` - `state=OPEN AND (priority=P0 OR priority=P1)` |
| `pageSize` | query | integer (int32) | no | The maximum number of cases fetched with each request. Defaults to 10. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |

### `cloudsupport.cases.patch`

- Versions: v2, v2beta
- `PATCH https://cloudsupport.googleapis.com/v2/{+name}`
- Update a case. Only some fields can be updated. EXAMPLES: cURL: case="projects/some-project/cases/43595344" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "priority": "P1" }' \ "https://cloudsupport.googleapis.com/v2/$case?updateMask=priority" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().patch( name="projects/some-project/cases/43112854", body={ "displayName": "This is Now a New Title", "priority": "P2", }, ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Case`; Response: `Case`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name for the case. |
| `updateMask` | query | string (google-fieldmask) | no | A list of attributes of the case that should be updated. Supported values are `priority`, `display_name`, and `subscriber_email_addresses`. If no fields are specified, all supported fields are updated. Be careful - if you do not provide a field mask, then you might accidentally clear some fields. For example, if you leave the field mask empty and do not provide a value for `subscriber_email_addresses`, then `subscriber_email_addresses` is updated to empty. |

### `cloudsupport.cases.search`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/cases:search`
- Search for cases using a query. EXAMPLES: cURL: parent="projects/some-project" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/cases:search" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.cases().search( parent="projects/some-project", query="state=OPEN" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SearchCasesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | The name of the parent resource to search for cases under. |
| `pageSize` | query | integer (int32) | no | The maximum number of cases fetched with each request. The default page size is 10. |
| `pageToken` | query | string | no | A token identifying the page of results to return. If unspecified, the first page is retrieved. |
| `query` | query | string | no | An expression used to filter cases. Expressions use the following fields separated by `AND` and specified with `=`: - `state`: Can be `OPEN` or `CLOSED`. - `priority`: Can be `P0`, `P1`, `P2`, `P3`, or `P4`. You can specify multiple values for priority using the `OR` operator. For example, `priority=P1 OR priority=P2`. - `creator.email`: The email address of the case creator. To search across `displayName`, `description`, and comments, use a global restriction with no keyword or operator. For example, `"my search"`. To search only cases updated after a certain date, use `update_time` restricted with that particular date, time, and timezone in ISO datetime format. For example, `update_time>"2020-01-01T00:00:00-05:00"`. `update_time` only supports the greater than operator (`>`). If you are using the `v2` version of the API, you must specify the case parent in the `parent` field. If you provide an empty `query`, all cases under the parent resource will be returned. If you are using the `v2beta` version of the API, you must specify the case parent in the `query` field using one of the two fields below, which are only available for `v2beta`. The `parent` field will be ignored. - `organization`: An organization name in the form `organizations/`. - `project`: A project name in the form `projects/`. Examples: For `v2`: - `state=CLOSED` - `state=OPEN AND creator.email="tester@example.com"` - `state=OPEN AND (priority=P0 OR priority=P1)` - `update_time>"2020-01-01T00:00:00-05:00"` For `v2beta`: - `organization="organizations/123456789"` - `project="projects/my-project-id"` - `project="projects/123456789"` - `organization="organizations/123456789" AND state=CLOSED` - `project="projects/my-project-id" AND creator.email="tester@example.com"` - `project="projects/my-project-id" AND (priority=P0 OR priority=P1)` |

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
- Download a file attached to a case. When this endpoint is called, no "response body" will be returned. Instead, the attachment's blob will be returned. Note: HTTP requests must append "?alt=media" to the URL. EXAMPLES: cURL: name="projects/some-project/cases/43594844/attachments/0674M00000WijAnZAJ" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$name:download?alt=media" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.media().download( name="projects/some-project/cases/43595344/attachments/0684M00000Pw6pHQAR" ) request.uri = request.uri.split("?")\[0\] + "?alt=media" print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Media`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the file attachment to download. |

### `cloudsupport.media.upload`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/attachments`
- Create a file attachment on a case or Cloud resource. The attachment must have the following fields set: `filename`. EXAMPLES: cURL: echo "This text is in a file I'm uploading using CSAPI." \ > "./example_file.txt" case="projects/some-project/cases/43594844" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --data-binary @"./example_file.txt" \ "https://cloudsupport.googleapis.com/upload/v2/$case/attachments?attachment.filename=uploaded_via_curl.txt" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) file_path = "./example_file.txt" with open(file_path, "w") as file: file.write( "This text is inside a file I'm going to upload using the Cloud Support API.", ) request = supportApiService.media().upload( parent="projects/some-project/cases/43595344", media_body=file_path ) request.uri = request.uri.split("?")\[0\] + "?attachment.filename=uploaded_via_python.txt" print(request.execute())
- Media upload (simple): `POST https://cloudsupport.googleapis.com/upload/v2/{+parent}/attachments` with `uploadType=media` (the body is the file content only) or `uploadType=multipart` (a `multipart/related` body with the JSON metadata part followed by the content part)
- Media upload limits: accepted media types: `*/*`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateAttachmentRequest`; Response: `Attachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the case or Cloud resource to which the attachment should be attached. |

### `cloudsupport.organizations.supportEventSubscriptions.create`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+parent}/supportEventSubscriptions`
- Creates a support event subscription for an organization. EXAMPLES: cURL: parent="organizations/123456789" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header 'Content-Type: application/json' \ --data '{ "pub_sub_topic": "projects/my-project/topics/my-topic" }' \ "https://cloudsupport.googleapis.com/v2/$parent/supportEventSubscriptions" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().create( parent="organizations/123456789", body={ "pub_sub_topic": "projects/my-project/topics/my-topic" }, ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SupportEventSubscription`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the support event subscription will be created. Format: organizations/{organization_id} |

### `cloudsupport.organizations.supportEventSubscriptions.delete`

- Versions: v2, v2beta
- `DELETE https://cloudsupport.googleapis.com/v2/{+name}`
- Soft deletes a support event subscription. EXAMPLES: cURL: support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request DELETE \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService).supportEventSubscriptions().delete( name="organizations/123456789/supportEventSubscriptions/abcdef123456" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to delete. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.expunge`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:expunge`
- Expunges a support event subscription. EXAMPLES: cURL: support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription:expunge" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().expunge( name="organizations/123456789/supportEventSubscriptions/abcdef123456" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExpungeSupportEventSubscriptionRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to expunge. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.get`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+name}`
- Gets a support event subscription. EXAMPLES: cURL: support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().get( name="organizations/123456789/supportEventSubscriptions/abcdef123456" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to retrieve. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### `cloudsupport.organizations.supportEventSubscriptions.list`

- Versions: v2, v2beta
- `GET https://cloudsupport.googleapis.com/v2/{+parent}/supportEventSubscriptions`
- Lists support event subscriptions. EXAMPLES: cURL: parent="organizations/123456789" curl \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$parent/supportEventSubscriptions" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().list( parent="organizations/123456789" ) print(request.execute())
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
- Updates a support event subscription. EXAMPLES: cURL: support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request PATCH \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ --header "Content-Type: application/json" \ --data '{ "pub_sub_topic": "projects/my-project/topics/new-topic" }' \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription?updateMask=pub_sub_topic" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().patch( name="organizations/123456789/supportEventSubscriptions/abcdef123456", body={ "pub_sub_topic": "projects/my-project/topics/new-topic" }, ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SupportEventSubscription`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the support event subscription. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. The only supported value is pub_sub_topic. |

### `cloudsupport.organizations.supportEventSubscriptions.undelete`

- Versions: v2, v2beta
- `POST https://cloudsupport.googleapis.com/v2/{+name}:undelete`
- Undeletes a support event subscription. EXAMPLES: cURL: support_event_subscription="organizations/123456789/supportEventSubscriptions/abcdef123456" curl \ --request POST \ --header "Authorization: Bearer $(gcloud auth print-access-token)" \ "https://cloudsupport.googleapis.com/v2/$support_event_subscription:undelete" Python: import googleapiclient.discovery api_version = "v2" supportApiService = googleapiclient.discovery.build( serviceName="cloudsupport", version=api_version, discoveryServiceUrl=f"https://cloudsupport.googleapis.com/$discovery/rest?version={api_version}", ) request = supportApiService.supportEventSubscriptions().undelete( name="organizations/123456789/supportEventSubscriptions/abcdef123456" ) print(request.execute())
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteSupportEventSubscriptionRequest`; Response: `SupportEventSubscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the support event subscription to undelete. Format: organizations/{organization_id}/supportEventSubscriptions/{subscription_id} |

### Example request skeleton

Generated from the Discovery entry of `cloudsupport.caseClassifications.search` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudsupport.googleapis.com/v2/caseClassifications:search"
```

## Notes

- Generated from the Discovery document(s) v2, v2beta of `cloudsupport` (retrieved 2026-11-14). Resources on this page: caseClassifications, cases, media, organizations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudsupport/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): the Python snippets in the `organizations.supportEventSubscriptions.*` descriptions call `supportApiService.supportEventSubscriptions()` (and the `delete` snippet has a stray `)` after `supportApiService`); with the Discovery client the resource chain is `supportApiService.organizations().supportEventSubscriptions()`.
- Source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2, https://cloudsupport.googleapis.com/$discovery/rest?version=v2beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
